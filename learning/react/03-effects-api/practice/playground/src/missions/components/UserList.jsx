import { useEffect, useState } from "react";
import axios from "axios";

import api from "../../api/api";
import { getApiErrorMessage } from "../../api/getApiErrorMessage";

/**
 * UserList Component
 *
 * 부모에게 전달받는 Props
 *
 * selectedUserId
 * - 현재 부모 컴포넌트에서 선택한 사용자 ID
 * - 선택된 사용자를 화면에서 구분하는 데 사용
 *
 * onSelectUser
 * - 사용자를 클릭했을 때 실행할 부모의 함수
 * - 선택한 ID를 부모에게 전달
 */
function UserList({ selectedUserId, onSelectUser }) {
  // API Response로 받은 사용자 목록
  const [users, setUsers] = useState([]);

  // 사용자 목록 조회 상태
  // loading | success | error
  const [listStatus, setListStatus] = useState("loading");

  // 사용자 목록 조회 중 발생한 오류 메시지
  const [listError, setListError] = useState(null);

  // 검색 Input의 현재 입력값
  // 검색은 별도의 서버 요청 없이 수행
  const [search, setSearch] = useState("");

  // 목록 데이터를 다시 가져오기 위한 State
  // 값이 변경되면 useEffect가 재실행됨
  const [listRetryCount, setListRetryCount] = useState(0);

  /**
   * 사용자 목록 조회 Effect
   *
   * 최초 Mount 시 실행
   * listRetryCount 변경 시 재실행
   *
   * 검색어가 변경되어도 API를 다시 호출하지 않도록
   * search는 Dependency에 포함하지 않음
   *
   * selectedUserId 변경 역시 목록을 다시 조회할 이유가 없으므로
   * Dependency에 포함하지 않음
   */
  useEffect(() => {
    // 이 Effect Setup의 결과를 더 이상 사용하면 안 되는지 표시
    let ignore = false;

    // 현재 목록 요청 전용 AbortController
    const controller = new AbortController();

    async function loadUsers() {
      // 1. 새로운 요청을 시작하므로 Loading 상태로 전환
      setListStatus("loading");

      // 이전 요청의 오류 메시지 초기화
      setListError(null);

      // 이전 목록 데이터를 초기화
      setUsers([]);

      try {
        // 2. 공통 Axios Instance를 이용하여 GET 요청
        //
        // 실제 요청 URL:
        // https://jsonplaceholder.typicode.com/users
        //
        // signal을 전달해 Cleanup 시 요청 취소 가능
        const response = await api.get("/users", {
          signal: controller.signal,
        });

        // 3. 이전 Effect에서 시작된 요청이라면 결과 무시
        //
        // ignore === true
        // → Effect Cleanup이 이미 실행됨
        //
        // controller.signal.aborted === true
        // → 현재 요청에 취소 신호가 전달됨
        if (ignore || controller.signal.aborted) {
          return;
        }

        // 4. Axios 응답 데이터 추출
        // Fetch와 달리 response.json()을 호출하지 않음
        const data = response.data;

        // 5. 서버가 배열을 반환했는지 확인
        //
        // 이번 API는 사용자 배열을 반환해야 하므로
        // 예상하지 못한 Response 형식은 오류로 처리
        if (!Array.isArray(data)) {
          throw new Error("Invalid user list response");
        }

        // 6. 사용자 목록 State 업데이트
        setUsers(data);

        // 7. 요청 성공 상태로 변경
        setListStatus("success");
      } catch (err) {
        // 8. Cleanup이 실행된 이전 요청이라면 무시
        //
        // 취소된 요청은 일반적인 API 오류로 표시하지 않음
        if (ignore || controller.signal.aborted || axios.isCancel(err)) {
          return;
        }

        // 9. 공통 Error 변환 함수를 통해 메시지 생성
        const message = getApiErrorMessage(err);

        // 10. 오류 정보와 상태 저장
        setListError(message);
        setListStatus("error");
      }
    }

    // 비동기 사용자 목록 조회 함수 실행
    loadUsers();

    /**
     * Effect Cleanup
     *
     * 다음 경우에 실행됨
     * - 컴포넌트 Unmount
     * - listRetryCount 변경으로 Effect 재실행
     * - 개발 StrictMode의 추가 Effect 검사
     */
    return () => {
      // Cleanup된 Effect의 결과는 더 이상 사용하지 않음
      ignore = true;

      // 진행 중인 HTTP 요청에 취소 신호 전달
      controller.abort();

      console.log("[UserList] Cleanup");
    };
  }, [listRetryCount]);

  /**
   * Refetch / Retry
   *
   * listRetryCount를 증가시키면
   * Dependency 변경으로 Effect가 다시 실행됨
   *
   * Functional State Update 사용
   */
  function handleRefetch() {
    setListRetryCount((prev) => prev + 1);
  }

  /**
   * 검색 처리
   *
   * 검색은 이미 받아온 users 배열을 기준으로 수행
   * 별도의 API Request는 발생하지 않음
   *
   * trim()
   * - 앞뒤 공백 제거
   *
   * toLowerCase()
   * - 대소문자를 구분하지 않는 검색을 위한 변환
   */
  const keyword = search.trim().toLowerCase();

  /**
   * 검색 결과는 기존 State로부터 계산하는 Derived Value
   *
   * 검색 결과를 별도의 useState로 저장하지 않음
   *
   * 검색 대상:
   * - name
   * - email
   */
  const filteredUsers = users.filter((user) => {
    const name = user.name.toLowerCase();
    const email = user.email.toLowerCase();

    return name.includes(keyword) || email.includes(keyword);
  });

  return (
    <section>
      <h2>User List</h2>

      {/* 검색 Input */}
      <div>
        <label htmlFor="user-search">Search users</label>

        <input
          id="user-search"
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="Search by name or email"
        />
      </div>

      <hr />

      {/* Loading 상태 */}
      {listStatus === "loading" && <p>Loading users...</p>}

      {/* Error 상태 */}
      {listStatus === "error" && (
        <div>
          <p>Error: {listError}</p>

          {/* 실패한 목록 요청을 다시 실행 */}
          <button type="button" onClick={handleRefetch}>
            Retry
          </button>
        </div>
      )}

      {/* Success 상태이면서 원본 데이터가 없는 경우 */}
      {listStatus === "success" && users.length === 0 && (
        <div>
          <p>No users found</p>

          <button type="button" onClick={handleRefetch}>
            Refetch
          </button>
        </div>
      )}

      {/* Success 상태이면서 사용자 목록이 존재하는 경우 */}
      {listStatus === "success" && users.length > 0 && (
        <div>
          {/* 현재 조건으로 목록을 다시 조회 */}
          <button type="button" onClick={handleRefetch}>
            Refetch User List
          </button>

          <p>Search Results: {filteredUsers.length}</p>

          {/* 검색 결과가 없는 경우 */}
          {filteredUsers.length === 0 && <p>No matching users</p>}

          {/* 검색 결과가 존재하는 경우 */}
          {filteredUsers.length > 0 && (
            <ul>
              {filteredUsers.map((user) => (
                <li key={user.id}>
                  {/*
                    사용자 선택 Button

                    클릭 시 onSelectUser(user.id) 호출

                    실제 상세 API 요청은 여기서 직접 하지 않음
                    부모에게 선택 ID만 전달
                  */}
                  <button
                    type="button"
                    onClick={() => onSelectUser(user.id)}
                    aria-pressed={selectedUserId === user.id}
                  >
                    <strong>{user.name}</strong>
                    {" — "}
                    {user.email}
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

export default UserList;
