import { useEffect, useState } from "react";
import axios from "axios";

import api from "../../api/api";
import { getApiErrorMessage } from "../../api/getApiErrorMessage";

/**
 * CommentList Component
 *
 * Props:
 * postId - 현재 선택한 게시글 ID
 *
 * 담당 기능:
 * - GET /posts/{postId}/comments
 * - 댓글 Loading / Success / Error / Empty
 * - 댓글 Retry / Refetch
 * - 이전 댓글 요청 Cleanup
 *
 * 게시글 목록과 상세 조회의 State에는 접근하지 않음
 */
function CommentList({ postId }) {
  // 서버에서 조회한 댓글 배열
  const [comments, setComments] = useState([]);

  // 댓글 요청 상태
  const [commentStatus, setCommentStatus] = useState("loading");

  // 댓글 조회 오류 메시지
  const [commentError, setCommentError] = useState(null);

  // 댓글을 다시 요청하기 위한 State
  const [refetchCount, setRefetchCount] = useState(0);

  /**
   * 댓글 조회 Effect
   *
   * 실행 조건:
   * - 최초 Mount
   * - postId 변경
   * - refetchCount 변경
   *
   * PostDetail과 별도의 Effect로 동작
   */
  useEffect(() => {
    // Cleanup된 이전 요청 결과를 무시하기 위한 변수
    let ignore = false;

    // 댓글 요청 전용 AbortController
    const controller = new AbortController();

    async function loadComments() {
      // 새로운 댓글 조회 시작
      setCommentStatus("loading");

      // 이전 오류 메시지 제거
      setCommentError(null);

      // 이전 게시글의 댓글 초기화
      setComments([]);

      try {
        /**
         * 댓글 API 요청
         *
         * postId = 1:
         * GET /posts/1/comments
         *
         * postId = 2:
         * GET /posts/2/comments
         *
         * 게시글 상세 API 요청과는 별도로 실행
         */
        const response = await api.get(`/posts/${postId}/comments`, {
          signal: controller.signal,
        });

        /**
         * 오래된 댓글 요청의 응답인지 확인
         *
         * Post 1 댓글 요청 중 Post 2를 선택했다면
         * 이전 Post 1 댓글을 화면에 반영하면 안 됨
         */
        if (ignore || controller.signal.aborted) {
          return;
        }

        // 서버 응답 데이터
        const data = response.data;

        /**
         * 댓글 목록은 배열이어야 함
         *
         * HTTP 200이더라도
         * 잘못된 형식의 응답일 수 있으므로 검사
         */
        if (!Array.isArray(data)) {
          throw new Error("Invalid comments response");
        }

        // 댓글 목록 저장
        setComments(data);

        // 댓글 요청 성공
        setCommentStatus("success");
      } catch (err) {
        /**
         * Cleanup 또는 취소된 요청은 무시
         *
         * 취소된 요청으로 인해
         * 현재 댓글 UI가 Error로 변경되지 않도록 처리
         */
        if (ignore || controller.signal.aborted || axios.isCancel(err)) {
          return;
        }

        // 실제 요청 오류 처리
        setCommentError(getApiErrorMessage(err));
        setCommentStatus("error");
      }
    }

    // 댓글 API 요청 실행
    loadComments();

    /**
     * Cleanup
     *
     * - 다른 게시글을 선택한 경우
     * - 댓글 Refetch를 실행한 경우
     * - 컴포넌트가 Unmount된 경우
     */
    return () => {
      // 이전 비동기 결과 무시
      ignore = true;

      // 이전 HTTP 요청 취소
      controller.abort();

      console.log("[CommentList] Cleanup:", postId);
    };
  }, [postId, refetchCount]);

  /**
   * 댓글 Retry / Refetch
   *
   * 현재 postId의 댓글 API만 다시 요청
   *
   * 상세 정보 GET 요청이나 게시글 목록 GET 요청은
   * 다시 실행하지 않음
   */
  function handleRefetch() {
    setRefetchCount((prev) => prev + 1);
  }

  /**
   * Empty 상태
   *
   * 성공 후 댓글 배열이 비어 있을 때만 true
   *
   * Loading 상태에서 comments가 []인 것은
   * Empty 상태로 판단하지 않음
   */
  const isEmpty = commentStatus === "success" && comments.length === 0;

  return (
    <section>
      <h2>Comments</h2>

      {/* 댓글 요청 진행 중 */}
      {commentStatus === "loading" && <p>Loading comments...</p>}

      {/* 댓글 API 오류 */}
      {commentStatus === "error" && (
        <div>
          <p role="alert">Error: {commentError}</p>

          <button type="button" onClick={handleRefetch}>
            Retry Comments
          </button>
        </div>
      )}

      {/* 요청 성공했으나 댓글이 없는 경우 */}
      {isEmpty && (
        <div>
          <p>No comments found</p>

          <button type="button" onClick={handleRefetch}>
            Refetch Comments
          </button>
        </div>
      )}

      {/* 댓글 조회 성공 */}
      {commentStatus === "success" && comments.length > 0 && (
        <div>
          <p>Total Comments: {comments.length}</p>

          <button type="button" onClick={handleRefetch}>
            Refetch Comments
          </button>

          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <h3>{comment.name}</h3>

                <p>Email: {comment.email}</p>

                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default CommentList;
