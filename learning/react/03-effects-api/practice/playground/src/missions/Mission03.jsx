import { useState } from "react";

import BlogPostList from "./blog-dashboard/BlogPostList";
import PostDetail from "./blog-dashboard/PostDetail";
import CommentList from "./blog-dashboard/CommentList";

// Mission 02에서 만든 작성 컴포넌트 재사용
import PostCreateForm from "./post-management/PostCreateForm";

/**
 * Mission03 Component
 *
 * Mini Blog Dashboard의 최상위 컴포넌트
 *
 * 주요 책임:
 * 1. 현재 선택한 사용자 ID 관리
 * 2. 현재 선택한 게시글 ID 관리
 * 3. 자식 컴포넌트 간 데이터 전달
 * 4. 전체 화면 구성
 *
 * API 요청은 각 자식 컴포넌트가 담당
 *
 * 이 컴포넌트에서는 직접
 * axios.get() 또는 axios.post()를 호출하지 않음
 */
function Mission03() {
  /**
   * 현재 선택한 사용자 ID
   *
   * 초기값 = 1
   *
   * 사용할 곳:
   * - BlogPostList: 해당 사용자의 게시글 조회
   * - PostCreateForm: 작성할 게시글의 userId
   */
  const [userId, setUserId] = useState(1);

  /**
   * 현재 선택한 게시글 ID
   *
   * 초기값 = null
   *
   * 아직 게시글을 선택하지 않았다는 의미
   *
   * 사용할 곳:
   * - BlogPostList: 선택된 게시글 표시
   * - PostDetail: 게시글 상세 조회
   * - CommentList: 댓글 조회
   */
  const [selectedPostId, setSelectedPostId] = useState(null);

  /**
   * 사용자 선택 변경 Handler
   *
   * 사용자가 User 1에서 User 2로 변경하면:
   *
   * 1. userId State 변경
   * 2. 기존에 선택된 게시글 ID 초기화
   *
   * 사용자 변경 시 selectedPostId를 초기화하는 이유:
   *
   * User 1 게시글을 선택한 상태에서
   * User 2로 변경했는데
   * User 1 게시글 상세가 계속 표시되면 안 되기 때문
   *
   * React는 이벤트 안에서 발생한 State Update를
   * 일반적으로 Batching하여 처리
   */
  function handleUserChange(event) {
    // select에서 전달한 문자열을 숫자로 변환
    const nextUserId = Number(event.target.value);

    // 현재 사용자 변경
    setUserId(nextUserId);

    // 이전 사용자의 게시글 선택 해제
    setSelectedPostId(null);
  }

  /**
   * 게시글 선택 Handler
   *
   * BlogPostList에서 게시글을 클릭하면 실행
   *
   * 예:
   * onSelectPost(3)
   *
   * → selectedPostId = 3
   * → PostDetail, CommentList Mount
   * → 각 컴포넌트가 독립적으로 API 요청
   */
  function handleSelectPost(postId) {
    setSelectedPostId(postId);
  }

  return (
    <main>
      <h1>Mini Blog Dashboard</h1>

      <p>Learn React Effects, Axios, Cleanup, and API Request Lifecycle.</p>

      {/* 사용자 필터 */}
      <div>
        <label htmlFor="blog-user-filter">User Filter</label>

        <select
          id="blog-user-filter"
          value={userId}
          onChange={handleUserChange}
        >
          <option value={1}>User 1</option>
          <option value={2}>User 2</option>
          <option value={3}>User 3</option>
          <option value={9999}>Empty Test (9999)</option>
        </select>
      </div>

      <hr />

      {/*
        메인 대시보드

        왼쪽:
        - 게시글 목록
        - 제목 검색
        - 게시글 선택

        오른쪽:
        - 게시글 상세
        - 댓글 목록

        각 영역의 Loading / Error는 서로 독립적
      */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {/*
          BlogPostList

          userId:
          - 어떤 사용자의 게시글을 조회할지 결정

          selectedPostId:
          - 현재 선택한 게시글을 구분

          onSelectPost:
          - 게시글 선택을 부모에게 전달

          key={userId}:
          - 사용자가 변경되면
            기존 BlogPostList를 Unmount하고
            새로운 인스턴스를 Mount

          - 이전 목록 State가 즉시 초기화됨
          - 검색어와 Refetch Count도 초기화됨

          이번 미션에서는 사용자별 목록을
          독립적인 화면 상태로 취급하기 위한 선택
        */}
        <BlogPostList
          key={userId}
          userId={userId}
          selectedPostId={selectedPostId}
          onSelectPost={handleSelectPost}
        />

        {/* 게시글 상세 및 댓글 영역 */}
        <div>
          {/*
            아직 게시글을 선택하지 않았다면
            상세 컴포넌트와 댓글 컴포넌트를 Mount하지 않음

            따라서 최초 화면에서는
            상세와 댓글 API 요청이 실행되지 않음
          */}
          {selectedPostId === null ? (
            <section>
              <h2>Post Details</h2>
              <p>No post selected</p>
            </section>
          ) : (
            <>
              {/*
                게시글 상세 컴포넌트

                key={selectedPostId}:
                - 다른 게시글을 선택하면
                  이전 상세 컴포넌트 Unmount
                - 새로운 상세 컴포넌트 Mount
                - 기존 상세 State가 초기화됨
              */}
              <PostDetail key={selectedPostId} postId={selectedPostId} />

              <hr />

              {/*
                댓글 컴포넌트

                PostDetail과 형제 컴포넌트

                상세 API가 성공할 때까지
                기다리지 않고 별도로 댓글 요청 가능

                게시글이 변경되면
                이전 댓글 요청도 Cleanup됨
              */}
              <CommentList key={selectedPostId} postId={selectedPostId} />
            </>
          )}
        </div>
      </div>

      <hr />

      {/*
        Mission 02의 PostCreateForm 재사용

        새로 POST Form을 작성하지 않음

        현재 선택한 userId만 Props로 전달

        Submit 이벤트에서만 POST 요청 실행

        POST가 성공하더라도
        BlogPostList를 자동 Refetch하지 않음

        JSONPlaceholder는 작성 데이터를
        영구 저장하지 않기 때문
      */}
      <PostCreateForm userId={userId} />
    </main>
  );
}

export default Mission03;
