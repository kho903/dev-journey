import { useEffect, useState } from "react";
import axios from "axios";

import api from "../../api/api";
import { getApiErrorMessage } from "../../api/getApiErrorMessage";

/**
 * PostList Component
 *
 * 부모 Mission02에서 전달받는 Props:
 *
 * userId
 * - 현재 선택한 사용자 ID
 * - GET /posts?userId=... 요청에 사용
 *
 * 이 컴포넌트의 책임:
 * - 게시글 목록 조회
 * - Loading / Success / Error 상태 관리
 * - Empty 상태 판단
 * - Retry / Refetch
 * - 이전 요청 Cleanup
 *
 * 게시글 작성(POST)은 여기서 처리하지 않음
 */
function PostList({ userId }) {
  // 서버에서 조회한 게시글 배열
  const [posts, setPosts] = useState([]);

  // 목록 API의 현재 요청 상태
  // loading | success | error
  const [listStatus, setListStatus] = useState("loading");

  // 목록 API에서 발생한 오류 메시지
  const [listError, setListError] = useState(null);

  // 현재 조건으로 목록을 다시 요청하기 위한 State
  const [refetchCount, setRefetchCount] = useState(0);

  /**
   * 게시글 목록 조회 Effect
   *
   * 실행 시점:
   * 1. PostList가 처음 Mount될 때
   * 2. userId가 변경될 때
   * 3. refetchCount가 변경될 때
   *
   * 다른 컴포넌트에서 POST 요청을 실행해도
   * 이 Effect가 자동으로 다시 실행되지는 않음
   */
  useEffect(() => {
    // 이전 Effect의 응답을 무시하기 위한 변수
    //
    // 각각의 Effect Setup은 독립적인 ignore를 가짐
    let ignore = false;

    // 이번 요청만을 위한 AbortController 생성
    const controller = new AbortController();

    async function loadPosts() {
      // 1. 새로운 요청이 시작됐으므로 Loading으로 전환
      setListStatus("loading");

      // 이전 요청의 오류 메시지 제거
      setListError(null);

      // 이전 사용자의 게시글이 남지 않도록 초기화
      setPosts([]);

      try {
        // 2. Axios GET 요청
        //
        // api.js에서 설정한 baseURL 사용
        //
        // userId = 1
        // → GET /posts?userId=1
        //
        // userId = 9999
        // → GET /posts?userId=9999
        //
        // params는 Axios가 Query String으로 변환
        //
        // signal은 Cleanup 시 요청을 취소하기 위해 사용
        const response = await api.get("/posts", {
          params: {
            userId,
          },
          signal: controller.signal,
        });

        // 3. 이미 Cleanup된 요청이라면 결과 무시
        //
        // 예:
        // User 1 요청 진행
        // → User 2 선택
        // → User 1 요청 Cleanup
        // → User 1 응답이 늦게 도착
        //
        // 이때 User 1 데이터를 State에 저장하지 않음
        if (ignore || controller.signal.aborted) {
          return;
        }

        // 4. Axios는 응답 데이터를 response.data로 제공
        const data = response.data;

        // 5. API 응답이 배열인지 검사
        //
        // JSONPlaceholder의 게시글 목록 API는
        // 배열을 반환하는 것이 정상
        if (!Array.isArray(data)) {
          throw new Error("Invalid posts response");
        }

        // 6. 게시글 목록 State 저장
        setPosts(data);

        // 7. API 요청 성공 상태로 변경
        //
        // 빈 배열이어도 HTTP 요청 자체는 성공한 것
        setListStatus("success");
      } catch (err) {
        // 8. 이미 정리된 요청 또는 취소된 요청은 무시
        //
        // 사용자 ID를 변경하며 발생한 요청 취소는
        // 일반적인 HTTP 오류로 취급하지 않음
        if (ignore || controller.signal.aborted || axios.isCancel(err)) {
          return;
        }

        // 9. 실제 오류인 경우 메시지 변환
        const message = getApiErrorMessage(err);

        // 10. Error State 업데이트
        setListError(message);
        setListStatus("error");
      }
    }

    // 비동기 API 조회 실행
    loadPosts();

    /**
     * Effect Cleanup
     *
     * 다음 상황에서 실행:
     * - userId 변경
     * - refetchCount 변경
     * - Component Unmount
     * - 개발 StrictMode의 추가 Effect 검사
     */
    return () => {
      // 이전 요청의 결과 사용 금지
      ignore = true;

      // 이전 HTTP 요청에 취소 신호 전달
      controller.abort();

      console.log("[PostList] Cleanup:", userId, refetchCount);
    };
  }, [userId, refetchCount]);

  /**
   * Retry / Refetch Handler
   *
   * refetchCount가 변경되면 Effect가 재실행됨
   *
   * Error UI의 Retry 버튼과
   * Success UI의 Refetch 버튼에서 공통으로 사용
   */
  function handleRefetch() {
    setRefetchCount((prev) => prev + 1);
  }

  /**
   * Empty 상태
   *
   * 데이터가 비어 있다는 이유만으로
   * Empty 상태라고 판단하면 안 됨
   *
   * 반드시 API 요청이 성공했는지 확인
   */
  const isEmpty = listStatus === "success" && posts.length === 0;

  return (
    <section>
      <h2>Post List</h2>

      <p>Selected User ID: {userId}</p>

      <hr />

      {/* API 요청 진행 중 */}
      {listStatus === "loading" && <p>Loading posts...</p>}

      {/* API 요청 실패 */}
      {listStatus === "error" && (
        <div>
          <p>Error: {listError}</p>

          {/* 실패한 조건 그대로 다시 요청 */}
          <button type="button" onClick={handleRefetch}>
            Retry
          </button>
        </div>
      )}

      {/* 요청 성공 + 빈 배열 */}
      {isEmpty && (
        <div>
          <p>No posts found</p>

          {/* 빈 결과도 다시 조회할 수 있도록 구성 */}
          <button type="button" onClick={handleRefetch}>
            Refetch
          </button>
        </div>
      )}

      {/* 요청 성공 + 게시글 존재 */}
      {listStatus === "success" && posts.length > 0 && (
        <div>
          <p>Total Posts: {posts.length}</p>

          {/* 같은 userId로 다시 조회 */}
          <button type="button" onClick={handleRefetch}>
            Refetch Posts
          </button>

          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default PostList;
