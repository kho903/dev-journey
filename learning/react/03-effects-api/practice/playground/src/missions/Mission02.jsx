import { useState } from "react";

import PostList from "./post-management/PostList";
import PostCreateForm from "./post-management/PostCreateForm";

/**
 * Mission02 Component
 *
 * Post Management의 최상위 컴포넌트
 *
 * 담당 책임:
 * 1. 사용자 ID 선택
 * 2. 선택한 사용자 ID를 자식에게 전달
 * 3. 목록과 작성 폼의 화면 배치
 *
 * API 통신은 자식 컴포넌트가 담당
 */
function Mission02() {
  /**
   * 현재 선택한 사용자 ID
   *
   * 초기값은 1
   *
   * 이 State는 PostList와 PostCreateForm이 공유
   *
   * PostList:
   * - 어떤 사용자의 게시글을 조회할지 결정
   *
   * PostCreateForm:
   * - 어떤 사용자 ID로 게시글을 작성할지 결정
   */
  const [userId, setUserId] = useState(1);

  /**
   * 사용자 선택 변경 Handler
   *
   * select의 value는 문자열로 전달되므로
   * Number()로 숫자로 변환
   */
  function handleUserChange(event) {
    setUserId(Number(event.target.value));
  }

  return (
    <main>
      <h1>Post Management</h1>

      <p>Manage posts with Axios GET and POST requests.</p>

      {/* 현재 조회 및 작성에 사용할 User ID 선택 */}
      <div>
        <label htmlFor="post-user-id">User Filter</label>

        <select id="post-user-id" value={userId} onChange={handleUserChange}>
          <option value={1}>User 1</option>
          <option value={2}>User 2</option>
          <option value={3}>User 3</option>
          <option value={9999}>Empty Test (9999)</option>
        </select>
      </div>

      <hr />

      {/*
        두 컴포넌트를 나란히 배치

        각 컴포넌트는 별도의 State와
        API 요청 생명주기를 가짐
      */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {/*
          PostList

          userId 변경 시:
          - 이전 GET Request Cleanup
          - 새 userId로 GET Request 실행

          POST 요청이 성공 또는 실패하더라도
          이 컴포넌트의 요청은 영향을 받지 않음
        */}
        <PostList userId={userId} />

        {/*
          PostCreateForm

          userId는 POST Request Body에 사용

          userId가 변경되어도
          자동으로 POST 요청하지 않음

          사용자가 Submit해야만 POST 실행
        */}
        <PostCreateForm userId={userId} />
      </div>
    </main>
  );
}

export default Mission02;
