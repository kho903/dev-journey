import { useEffect, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

function Practice02() {
  const [mode, setMode] = useState("success");

  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      setStatus("loading");
      setError(null);
      setUsers([]);

      try {
        let endpoint;

        if (mode === "success") {
          endpoint = "/users";
        } else if (mode === "empty") {
          endpoint = "/users?username=__no_such_user__";
        } else {
          endpoint = "/does-not-exist";
        }

        // TODO 1
        // fetch()를 사용하여 GET 요청
        // BASE_URL과 endpoint 결합
        // controller.signal 전달
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          signal: controller.signal,
        });

        // TODO 2
        // response.ok 확인
        // HTTP 오류일 경우 Error 발생
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        // TODO 3
        // response.json()으로 응답 파싱
        const data = await response.json();

        // TODO 4
        // 요청이 취소되지 않았다면
        // users State에 데이터 저장
        // status를 success로 변경
        if (!controller.signal.aborted) {
          setUsers(data);
          setStatus("success");
        }
      } catch (err) {
        // TODO 5
        // 요청 취소 여부 확인
        // 실제 오류라면 error State에 메시지 저장
        // status를 error로 변경

        if (controller.signal.aborted) {
          return;
        }
        setError(err instanceof Error ? err.message : "Unknown error");
        setStatus("error");
      }
    }

    loadUsers();

    return () => {
      console.log("Request Cleanup:", mode);

      // TODO 6
      // controller.abort() 호출
      controller.abort();
    };
  }, [mode]);

  function handleModeChange(event) {
    setMode(event.target.value);
  }

  return (
    <main>
      <h1>User Fetch Lab</h1>

      <label>
        API Response Scenario:
        <select value={mode} onChange={handleModeChange}>
          <option value="success">Success</option>
          <option value="empty">Empty</option>
          <option value="error">Error</option>
        </select>
      </label>

      <hr />

      {status === "loading" && <p>Loading...</p>}

      {status === "error" && <p>Error: {error}</p>}

      {status === "success" && users.length === 0 && <p>No users found</p>}

      {status === "success" && users.length > 0 && (
        <section>
          <h2>User List</h2>

          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default Practice02;
