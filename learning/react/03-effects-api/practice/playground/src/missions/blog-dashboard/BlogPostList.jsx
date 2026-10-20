import { useEffect, useState } from "react";
import axios from "axios";

import api from "../../api/api";
import { getApiErrorMessage } from "../../api/getApiErrorMessage";

/**
 * BlogPostList
 *
 * 부모(Mission03)에게 전달받는 Props
 *
 * userId:
 * - 현재 선택한 사용자 ID
 * - GET /posts?userId=... 요청에 사용
 *
 * selectedPostId:
 * - 현재 선택된 게시글 ID
 * - 선택된 게시글을 UI에서 구분하는 데 사용
 *
 * onSelectPost:
 * - 게시글 클릭 시 부모에게 ID를 전달할 함수
 *
 * 이 컴포넌트는 게시글 목록만 담당
 * 상세 조회 및 댓글 조회는 담당하지 않음
 */
function BlogPostList({ userId, selectedPostId, onSelectPost }) {
  // 1. 서버에서 조회한 게시글 목록
  const [posts, setPosts] = useState([]);

  // 2. 게시글 목록 API의 요청 상태
  // loading | success | error
  const [listStatus, setListStatus] = useState("loading");

  // 3. 목록 요청 중 발생한 오류 메시지
  const [listError, setListError] = useState(null);

  // 4. 사용자가 입력한 검색어
  //
  // 검색어는 서버에 전달하지 않고
  // 이미 조회한 게시글 목록을 필터링하는 데 사용
  const [search, setSearch] = useState("");

  // 5. 목록을 다시 조회하기 위한 State
  //
  // 사용자 ID가 바뀌지 않아도
  // 이 값이 바뀌면 Effect가 재실행됨
  const [refetchCount, setRefetchCount] = useState(0);

  /**
   * 게시글 목록 조회 Effect
   *
   * 실행 조건:
   * - 최초 Mount
   * - userId 변경
   * - refetchCount 변경
   *
   * 검색어 변경은 API 요청을 발생시키지 않음
   */
  useEffect(() => {
    // 현재 Effect의 결과가 유효한지 표시
    //
    // Cleanup에서 true로 변경
    // 이전 비동기 응답이 State를 변경하는 것을 방지
    let ignore = false;

    // 이번 목록 요청 전용 AbortController
    const controller = new AbortController();

    async function loadPosts() {
      // 새로운 요청 시작
      setListStatus("loading");

      // 이전 오류 초기화
      setListError(null);

      // 이전 사용자 게시글 초기화
      setPosts([]);

      try {
        /**
         * Axios GET 요청
         *
         * userId = 1일 때:
         * GET /posts?userId=1
         *
         * userId = 9999일 때:
         * GET /posts?userId=9999
         *
         * params:
         * - Axios가 Query String으로 변환
         *
         * signal:
         * - Cleanup에서 abort() 시
         *   진행 중인 요청을 취소하도록 연결
         */
        const response = await api.get("/posts", {
          params: {
            userId,
          },
          signal: controller.signal,
        });

        /**
         * 이전 요청인지 확인
         *
         * 사용자 변경이나 Unmount로 Cleanup되었다면
         * 이 요청의 응답을 사용해서는 안 됨
         */
        if (ignore || controller.signal.aborted) {
          return;
        }

        // Axios의 서버 응답 데이터
        const data = response.data;

        /**
         * API 응답 형식 검사
         *
         * 게시글 목록 API는 배열을 반환해야 함
         *
         * 정상적인 HTTP 200을 받았더라도
         * 예상과 다른 데이터 구조일 수 있으므로 확인
         */
        if (!Array.isArray(data)) {
          throw new Error("Invalid posts response");
        }

        // 성공한 목록 데이터 저장
        setPosts(data);

        // 비어 있는 배열도 정상적인 성공 응답
        setListStatus("success");
      } catch (err) {
        /**
         * 취소된 요청은 무시
         *
         * ignore:
         * - 이전 Effect의 결과인지 확인
         *
         * controller.signal.aborted:
         * - 현재 요청에 취소 신호가 전달됐는지 확인
         *
         * axios.isCancel:
         * - Axios가 요청 취소 오류로 분류하는지 확인
         */
        if (ignore || controller.signal.aborted || axios.isCancel(err)) {
          return;
        }

        // 실제 오류일 때만 화면에 반영
        setListError(getApiErrorMessage(err));
        setListStatus("error");
      }
    }

    // API 요청 시작
    loadPosts();

    /**
     * Cleanup
     *
     * 기존 Effect가 종료될 때 실행
     *
     * - 새로운 userId로 변경
     * - Refetch 실행
     * - 컴포넌트 Unmount
     * - 개발 StrictMode의 추가 검사
     */
    return () => {
      // 이전 응답이 더 이상 State를 변경하지 못하도록 설정
      ignore = true;

      // 진행 중인 요청에 취소 신호 전달
      controller.abort();

      console.log("[BlogPostList] Cleanup:", userId);
    };
  }, [userId, refetchCount]);

  /**
   * Refetch / Retry
   *
   * refetchCount를 증가시켜
   * 현재 userId에 대한 GET 요청을 다시 실행
   */
  function handleRefetch() {
    setRefetchCount((prev) => prev + 1);
  }

  /**
   * 검색어 처리
   *
   * trim():
   * - 검색어 앞뒤 공백 제거
   *
   * toLowerCase():
   * - 대소문자를 구분하지 않는 검색
   */
  const keyword = search.trim().toLowerCase();

  /**
   * Derived Value
   *
   * posts와 search로 계산할 수 있는 값이므로
   * filteredPosts를 별도의 useState로 만들지 않음
   *
   * 검색어가 변경되면 컴포넌트가 Re-render되면서
   * 새로운 filteredPosts가 계산됨
   *
   * API 재요청은 발생하지 않음
   */
  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(keyword);
  });

  /**
   * Empty 상태
   *
   * 요청 성공 이후 원본 목록이 비어 있는 경우
   */
  const isEmpty = listStatus === "success" && posts.length === 0;

  return (
    <section>
      <h2>Post List</h2>

      <p>Selected User: {userId}</p>

      {/* 게시글 제목 검색 */}
      <div>
        <label htmlFor="blog-post-search">Search by Title</label>

        <input
          id="blog-post-search"
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="Search post title..."
        />
      </div>

      <hr />

      {/* API 요청 진행 중 */}
      {listStatus === "loading" && <p>Loading posts...</p>}

      {/* API 요청 실패 */}
      {listStatus === "error" && (
        <div>
          <p role="alert">Error: {listError}</p>

          <button type="button" onClick={handleRefetch}>
            Retry Posts
          </button>
        </div>
      )}

      {/* 정상 응답이지만 게시글이 없는 경우 */}
      {isEmpty && (
        <div>
          <p>No posts found</p>

          <button type="button" onClick={handleRefetch}>
            Refetch Posts
          </button>
        </div>
      )}

      {/* 정상 응답이며 게시글이 있는 경우 */}
      {listStatus === "success" && posts.length > 0 && (
        <div>
          <button type="button" onClick={handleRefetch}>
            Refetch Posts
          </button>

          <p>Search Results: {filteredPosts.length}</p>

          {/* 검색 결과가 없는 경우 */}
          {filteredPosts.length === 0 && <p>No matching posts</p>}

          {/* 검색 결과가 있는 경우 */}
          {filteredPosts.length > 0 && (
            <ul>
              {filteredPosts.map((post) => (
                <li key={post.id}>
                  {/*
                    게시글 클릭

                    onSelectPost는 부모가 전달한 함수

                    여기서는 상세 API를 호출하지 않고
                    선택한 post.id만 부모에게 전달
                  */}
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPost(post.id);
                    }}
                    aria-pressed={selectedPostId === post.id}
                  >
                    {post.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export default BlogPostList;
