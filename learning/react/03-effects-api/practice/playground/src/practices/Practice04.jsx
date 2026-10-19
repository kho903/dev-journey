import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/api";

function Practice04() {
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

        // TODO 3
        // api.get()을 사용한 HTTP GET 요청
        // endpoint 전달
        // controller.signal 전달
        const response = await api.get(endpoint, {
          signal: controller.signal,
        });

        // TODO 4
        // Axios Response의 data 추출
        // 취소되지 않았다면 users State 업데이트
        // status를 "success"로 변경
        if (!controller.signal.aborted) {
          setUsers(response.data);
          setStatus("success");
        }
      } catch (err) {
        // TODO 5
        // 취소된 요청은 무시
        //
        // axios.isCancel() 또는
        // controller.signal.aborted 활용
        //
        // Axios Error 여부 확인
        // error.response가 있으면 HTTP Status 사용
        // 그 외 오류도 적절히 처리
        //
        // error State 업데이트
        // status를 "error"로 변경
        if (controller.signal.aborted || axios.isCancel(err)) {
          return;
        }

        let errorMessage;

        if (axios.isAxiosError(err)) {
          if (err.response) {
            errorMessage = `HTTP Error: ${err.response.status}`;
          } else if (err.request) {
            errorMessage = "No response received";
          } else {
            errorMessage = `Axios Error: ${err.message}`;
          }
        } else {
          errorMessage =
            err instanceof Error ? err.message : "Unexpected Error";
        }

        console.error(errorMessage);

        setError(errorMessage);
        setStatus("error");
      }
    }

    loadUsers();

    return () => {
      console.log("Effect Cleanup:", mode);

      // TODO 6
      // 진행 중인 요청 취소
      controller.abort();
    };
  }, [mode]);

  function handleModeChange(event) {
    setMode(event.target.value);
  }

  return (
    <main>
      <h1>Axios API Lab</h1>

      <label>
        Response Scenario:
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

export default Practice04;
