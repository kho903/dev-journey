import { useEffect, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

function Practice03() {
  const [userId, setUserId] = useState(1);
  const [safeMode, setSafeMode] = useState(false);

  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const controller = new AbortController();

    async function loadUser() {
      setStatus("loading");
      setError(null);
      setUser(null);

      try {
        // TODO 1
        // BASE_URL과 userId를 이용하여 사용자 조회
        // Safe Mode에서는 controller.signal 전달
        // Unsafe Mode에서는 취소 신호 없이 요청
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
          signal: safeMode ? controller.signal : undefined,
        });

        // TODO 2
        // response.ok 확인
        // HTTP Error 발생 시 throw
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // TODO 3
        // Response JSON 파싱
        const data = await response.json();

        // 사용자별 인위적인 처리 지연
        const delayMs = userId === 1 ? 2000 : userId === 2 ? 300 : 800;

        await new Promise((resolve) => {
          setTimeout(resolve, delayMs);
        });

        console.log("Request Completed:", userId);

        // TODO 4
        // Safe Mode에서는 ignore 또는
        // controller.signal.aborted 확인
        // 이전 요청의 결과라면 State Update 생략
        //
        // Unsafe Mode에서는 일부러
        // 오래된 응답도 State에 반영하여 문제 관찰
        //
        // 정상 처리 시:
        // setUser(data)
        // setStatus("success")
        if (safeMode && (ignore || controller.signal.aborted)) {
          return;
        }

        setUser(data);
        setStatus("success");
      } catch (err) {
        // TODO 5
        // Safe Mode에서 Cleanup된 요청이면 무시
        // 그 외 오류는 Error State에 반영
        if (safeMode && (ignore || controller.signal.aborted)) {
          return;
        }

        setError(err instanceof Error ? err.message : "Unknown error");
        setStatus("error");
      }
    }

    loadUser();

    return () => {
      console.log("Request Cleanup:", userId);

      // TODO 6
      // ignore를 true로 변경
      // Safe Mode에서만 controller.abort() 호출
      ignore = true;
      if (safeMode) {
        controller.abort();
      }
    };
  }, [userId, safeMode]);

  function handleUserChange(event) {
    setUserId(Number(event.target.value));
  }

  function handleModeChange(event) {
    setSafeMode(event.target.value === "safe");
  }

  return (
    <main>
      <h1>User Race Condition Lab</h1>

      <label>
        User ID:
        <select value={userId} onChange={handleUserChange}>
          <option value={1}>User 1</option>
          <option value={2}>User 2</option>
          <option value={3}>User 3</option>
        </select>
      </label>

      <br />

      <label>
        Request Mode:
        <select
          value={safeMode ? "safe" : "unsafe"}
          onChange={handleModeChange}
        >
          <option value="unsafe">Unsafe</option>
          <option value="safe">Safe</option>
        </select>
      </label>

      <hr />

      <p>Selected User ID: {userId}</p>

      {status === "loading" && <p>Loading...</p>}

      {status === "error" && <p>Error: {error}</p>}

      {status === "success" && user && (
        <section>
          <h2>{user.name}</h2>
          <p>Displayed User ID: {user.id}</p>
          <p>Email: {user.email}</p>

          {user.id !== userId && <p>Warning: Stale Response!</p>}
        </section>
      )}
    </main>
  );
}

export default Practice03;
