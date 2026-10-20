import { useState } from "react";

import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";

/**
 * Mission01
 *
 * User Directory의 최상위 컴포넌트
 *
 * 담당 책임:
 * - 화면 전체 구성
 * - 선택한 사용자 ID 관리
 * - UserList와 UserDetail 연결
 *
 * API 요청은 이 컴포넌트에서 직접 수행하지 않음
 */
function Mission01() {
  // 최초에는 선택된 사용자가 없음
  //
  // null로 초기화하여
  // 사용자 상세 조회가 자동으로 시작되지 않도록 구성
  const [selectedUserId, setSelectedUserId] = useState(null);

  /**
   * 사용자 선택 Handler
   *
   * UserList에서 사용자를 클릭하면 실행
   *
   * 선택한 userId를 부모 State에 저장
   * 이후 React Re-render 발생
   */
  function handleSelectUser(userId) {
    setSelectedUserId(userId);
  }

  return (
    <main>
      <h1>User Directory</h1>

      <p>Select a user to view detailed information.</p>

      {/* 목록과 상세 영역을 나란히 배치 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {/*
          UserList

          selectedUserId:
          - 현재 선택된 ID를 전달

          onSelectUser:
          - 자식이 사용자 선택 이벤트를 부모에게 전달

          검색이나 목록 Refetch는 이 컴포넌트 내부에서 관리
        */}
        <UserList
          selectedUserId={selectedUserId}
          onSelectUser={handleSelectUser}
        />

        {/*
          UserDetail

          사용자를 선택하지 않았다면 안내 메시지 표시

          selectedUserId가 존재하면
          해당 사용자에 대한 UserDetail Mount

          key를 userId로 지정하여
          선택한 사용자가 바뀌면
          기존 상세 컴포넌트를 Unmount하고
          새로운 상세 컴포넌트를 Mount하도록 구성

          따라서 이전 사용자의 상세 State가
          새로운 사용자의 화면에 남는 문제를 줄일 수 있음
        */}
        {selectedUserId === null ? (
          <section>
            <h2>User Details</h2>

            <p>No user selected</p>
          </section>
        ) : (
          <UserDetail key={selectedUserId} userId={selectedUserId} />
        )}
      </div>
    </main>
  );
}

export default Mission01;
