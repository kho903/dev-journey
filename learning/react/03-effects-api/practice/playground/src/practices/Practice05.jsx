import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/api";

function Practice05() {
  const [userId, setUserId] = useState(1);
  const [mode, setMode] = useState("success");

  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      setStatus("loading");
      setError(null);
      setPosts([]);

      try {
        let endpoint;
        let params = {};

        if (mode === "success") {
          endpoint = "/posts";
          params = { userId };
        } else if (mode === "empty") {
          endpoint = "/posts";
          params = { userId: 9999 };
        } else {
          endpoint = "/does-not-exist";
        }

        // TODO 1
        // api.get()으로 HTTP GET 요청
        // endpoint, params 전달
        // controller.signal 전달
        const response = await api.get(endpoint, {
          params: params,
          signal: controller.signal,
        });

        // TODO 2
        // Axios Response에서 data 추출
        // 요청이 취소되지 않았다면
        // posts State 저장
        // status를 success로 변경
        if (!controller.signal.aborted) {
          setPosts(response.data);
          setStatus("success");
        }
      } catch (err) {
        // TODO 3
        // 취소된 요청인지 확인
        // axios.isCancel() 활용 가능
        //
        // Axios Error일 경우 HTTP Status 확인
        // 그 외 오류도 처리
        //
        // error State 저장
        // status를 error로 변경
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

    loadPosts();

    return () => {
      console.log("Request Cleanup:", userId, mode);

      // TODO 4
      // controller.abort() 호출
      controller.abort();
    };
  }, [userId, mode, retryCount]);

  function handleUserChange(event) {
    setUserId(Number(event.target.value));
  }

  function handleModeChange(event) {
    setMode(event.target.value);
  }

  function handleRetry() {
    // TODO 5
    // retryCount 증가
    // Functional State Update 사용
    setRetryCount((prev) => prev + 1);
  }

  const isEmpty = status === "success" && posts.length === 0;

  return (
    <main>
      <h1>API Lifecycle Lab</h1>

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
        Scenario:
        <select value={mode} onChange={handleModeChange}>
          <option value="success">Success</option>
          <option value="empty">Empty</option>
          <option value="error">Error</option>
        </select>
      </label>

      <hr />

      {status === "loading" && <p>Loading...</p>}

      {status === "error" && (
        <section>
          <p>Error: {error}</p>

          <button onClick={handleRetry}>Retry</button>
        </section>
      )}

      {isEmpty && (
        <section>
          <p>No posts found</p>

          <button onClick={handleRetry}>Refetch</button>
        </section>
      )}

      {status === "success" && posts.length > 0 && (
        <section>
          <h2>User {userId} Posts</h2>

          <button onClick={handleRetry}>Refetch</button>

          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default Practice05;
