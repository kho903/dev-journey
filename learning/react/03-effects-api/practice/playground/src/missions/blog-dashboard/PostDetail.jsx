import { useEffect, useState } from "react";
import axios from "axios";

import api from "../../api/api";
import { getApiErrorMessage } from "../../api/getApiErrorMessage";

/**
 * PostDetail Component
 *
 * Props:
 * postId - 부모에서 전달한 선택된 게시글 ID
 *
 * 담당 책임:
 * - 선택한 게시글 상세 조회
 * - Loading / Success / Error
 * - 상세 조회 Retry / Refetch
 * - 이전 요청 Cleanup
 *
 * 댓글 조회는 담당하지 않음
 */
function PostDetail({ postId }) {
  // 서버가 반환한 게시글 상세 객체
  const [post, setPost] = useState(null);

  // 상세 요청 상태
  const [detailStatus, setDetailStatus] = useState("loading");

  // 상세 조회 오류 메시지
  const [detailError, setDetailError] = useState(null);

  // 상세 정보를 다시 조회하기 위한 State
  const [retryCount, setRetryCount] = useState(0);

  /**
   * 게시글 상세 조회 Effect
   *
   * 실행 조건:
   * - 최초 Mount
   * - postId 변경
   * - retryCount 변경
   *
   * PostList의 Refetch와는 독립적으로 동작
   */
  useEffect(() => {
    // 이전 Effect의 응답 무시 여부
    let ignore = false;

    // 상세 요청 전용 AbortController
    const controller = new AbortController();

    async function loadPostDetail() {
      // 새 요청이 시작되므로 Loading 상태로 변경
      setDetailStatus("loading");

      // 이전 오류 정보 초기화
      setDetailError(null);

      // 이전 게시글의 상세 데이터 초기화
      setPost(null);

      try {
        /**
         * 게시글 상세 API 요청
         *
         * postId = 1:
         * GET /posts/1
         *
         * postId = 2:
         * GET /posts/2
         */
        const response = await api.get(`/posts/${postId}`, {
          signal: controller.signal,
        });

        /**
         * 이전 요청의 결과라면 State 업데이트 생략
         *
         * Post 1 요청 중 Post 2를 선택했다면
         * Post 1 응답이 나중에 도착하더라도
         * Post 2 상세 화면을 덮어쓰지 않도록 처리
         */
        if (ignore || controller.signal.aborted) {
          return;
        }

        // Axios 응답 데이터
        const data = response.data;

        /**
         * 응답 형식 검증
         *
         * 게시글 상세 API는 객체를 반환해야 함
         *
         * 배열이나 null이면 예상하지 못한 응답
         *
         * id가 현재 요청한 postId와 일치하는지도 확인
         */
        if (
          data === null ||
          typeof data !== "object" ||
          Array.isArray(data) ||
          data.id !== postId
        ) {
          throw new Error("Invalid post detail response");
        }

        // 게시글 데이터 저장
        setPost(data);

        // 요청 성공 상태로 변경
        setDetailStatus("success");
      } catch (err) {
        /**
         * Cleanup된 요청은 무시
         *
         * 요청 취소는 일반적인 API 오류가 아님
         */
        if (ignore || controller.signal.aborted || axios.isCancel(err)) {
          return;
        }

        // 실제 오류 메시지 저장
        setDetailError(getApiErrorMessage(err));
        setDetailStatus("error");
      }
    }

    // 상세 조회 시작
    loadPostDetail();

    /**
     * Cleanup
     *
     * - 다른 게시글 선택
     * - Retry / Refetch
     * - Component Unmount
     */
    return () => {
      // 이전 결과 무시
      ignore = true;

      // 이전 HTTP 요청 취소
      controller.abort();

      console.log("[PostDetail] Cleanup:", postId);
    };
  }, [postId, retryCount]);

  /**
   * Retry / Refetch
   *
   * 상세 API 요청만 다시 실행
   *
   * 게시글 목록이나 댓글 요청은
   * 이 버튼의 영향을 받지 않음
   */
  function handleRefetch() {
    setRetryCount((prev) => prev + 1);
  }

  return (
    <section>
      <h2>Post Details</h2>

      {/* 상세 조회 진행 중 */}
      {detailStatus === "loading" && <p>Loading post details...</p>}

      {/* 상세 조회 실패 */}
      {detailStatus === "error" && (
        <div>
          <p role="alert">Error: {detailError}</p>

          <button type="button" onClick={handleRefetch}>
            Retry Detail
          </button>
        </div>
      )}

      {/* 게시글 상세 조회 성공 */}
      {detailStatus === "success" && post && (
        <article>
          <h3>{post.title}</h3>

          <p>Post ID: {post.id}</p>
          <p>Author User ID: {post.userId}</p>

          <hr />

          <p>{post.body}</p>

          <button type="button" onClick={handleRefetch}>
            Refetch Detail
          </button>
        </article>
      )}
    </section>
  );
}

export default PostDetail;
