# 09. API State & Request Lifecycle

## 1. Request Lifecycle

- API Request가 시작되어 완료될 때까지 거치는 전체 과정
- 요청 시작, 응답 대기, 성공, 실패, 취소 등의 단계로 구성
- React에서는 각 단계에 따라 State와 UI를 관리할 필요가 있음
- Fetch API와 Axios 모두 비동기 Request Lifecycle을 고려해야 함

### Basic Flow

```text
Request Start
↓
Loading
↓
HTTP Request
↓
Response 수신
↓
HTTP Status 및 Data 처리
↓
Success 또는 Error
↓
State Update
↓
Re-render
↓
UI Update
```

### Important

- HTTP Request는 네트워크 상황에 따라 완료 시간이 달라짐
- 요청이 시작된 순서와 응답이 완료되는 순서는 다를 수 있음
- Component Unmount 또는 Dependency 변경 시 요청이 취소될 수 있음
- 요청의 전체 흐름을 고려하지 않으면 잘못된 UI 상태 발생 가능

## 2. API Request States

API Request의 상태는 일반적으로 Idle, Loading, Success, Error 등으로 구분 가능

### Request States

| State   | Meaning                                   |
| ------- | ----------------------------------------- |
| Idle    | 아직 요청하지 않은 상태                   |
| Loading | 요청 진행 중                              |
| Success | 요청 성공                                 |
| Error   | 요청 실패                                 |
| Empty   | 요청은 성공했지만 결과 데이터가 없는 상태 |

### State Design

```jsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

- `users` : API Response Data
- `loading` : 요청 진행 여부
- `error` : 요청 실패 정보
- 각 State를 조합하여 요청 상태 표현 가능

### Important

- 빈 배열이 반드시 Loading을 의미하지는 않음
- Error가 없다는 사실만으로 요청 성공을 판단할 수는 없음
- 초기 Idle과 요청 완료 후 Empty는 서로 다른 상태
- Request State를 명확하게 구분해야 잘못된 UI 표시 방지 가능

## 3. Status-Based State Management

여러 Boolean State 대신 요청 상태를 하나의 Status로 표현 가능

### Example

```jsx
const [status, setStatus] = useState("idle");
const [users, setUsers] = useState([]);
const [error, setError] = useState(null);
```

### Status Values

```text
idle
loading
success
error
```

### Request Flow

```text
idle
↓
loading
├── success
│
└── error
```

### State Updates

```jsx
setStatus("loading");
setError(null);
```

요청 성공 시:

```jsx
setUsers(data);
setStatus("success");
```

요청 실패 시:

```jsx
setError(error.message);
setStatus("error");
```

### Advantages

- 현재 요청 단계의 의미를 명확하게 표현
- `loading`, `success`, `error` 등이 동시에 `true`인 모순된 상태 방지
- Conditional Rendering의 조건을 단순하게 구성 가능

### Important

- Status 하나만 사용해도 Data와 Error 정보는 별도로 관리 가능
- Status는 요청 흐름을 표현하고 Data는 실제 Response 값을 표현
- 요청 규모에 따라 별도 Boolean State 방식도 사용 가능

## 4. Empty State

- Empty는 일반적으로 요청 성공 이후 데이터가 없는 상태
- HTTP 오류가 발생했다는 의미가 아님
- API Response 구조에 따라 빈 배열, 빈 결과 객체 등으로 판단 가능

### Example

```jsx
if (status === "success" && users.length === 0) {
  return <p>No users found</p>;
}
```

### Important

- `users.length === 0`만으로 Empty 상태를 판단하면 안 됨
- 요청이 완료되었는지 함께 확인 필요
- Success이면서 결과가 없을 때 Empty UI 출력

### Derived Empty State

```jsx
const isEmpty = status === "success" && users.length === 0;
```

- Empty 여부를 기존 Status와 Data로 계산
- 별도 `isEmpty` State 없이 Derived Value로 표현 가능
- 중복 State 관리 방지

## 5. API Request with useEffect()

Component Mount 시 서버 데이터를 조회하는 기본 예제

### Example

```jsx
import { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setUsers(data);
          setStatus("success");
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
          setStatus("error");
        }
      }
    }
    loadUsers();

    return () => controller.abort();
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error: {error}</p>;
  }

  if (users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;
```

### Explanation

- 초기 요청 상태를 `loading`으로 설정
- Effect Setup에서 HTTP Request 시작
- Success 시 Response Data와 Status 변경
- Error 시 오류 정보와 Status 변경
- Cleanup에서 `AbortController`를 이용하여 요청 취소
- 요청 결과에 따라 UI 조건부 렌더링

### Important

- 위 예제는 Component Mount 시 조회하는 기본 패턴
- 재요청 기능은 아직 포함하지 않음
- API 요청 대상이 Props에 따라 변경된다면 Dependency 관리 필요
- 실제 서비스에서는 사용자에게 노출할 Error 메시지를 별도로 설계하는 것이 적절함

## 6. Dependency-Based Refetching

- Effect의 Dependency가 변경되면 기존 Effect Cleanup 이후 새로운 Setup 실행
- 검색 조건, 사용자 ID, 페이지 번호 등의 변경에 따라 API 재조회 가능
- 요청에 사용하는 Reactive Value를 Dependency에 포함해야 함

### Example

```jsx
useEffect(() => {
  const controller = new AbortController();
  async function loadUser() {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (!controller.signal.aborted) {
        setUser(data);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        console.error(err);
      }
    }
  }

  loadUser();

  return () => controller.abort();
}, [userId]);
```

### Execution Flow

```text
userId = 1
↓
Request A 시작
↓
userId = 2
↓
Previous Effect Cleanup
↓
Request A 취소 신호 전달
↓
New Effect Setup
↓
Request B 시작
↓
Request B Response
↓
User 2 Data 저장
```

### Important

- `userId`가 변경되면 새로운 요청 필요
- 이전 요청은 더 이상 현재 화면에 필요하지 않을 수 있음
- Cleanup에서 이전 요청을 취소하도록 구성 가능
- 최신 요청과 이전 요청을 구분할 필요가 있음

## 7. Race Condition

- 여러 비동기 작업의 완료 순서에 따라 결과가 달라지는 문제
- API Request가 시작 순서와 다르게 완료될 때 발생 가능
- 이전 요청의 결과가 최신 요청의 데이터를 덮어쓸 수 있음

### Example

사용자가 검색어를 빠르게 변경하는 상황

```text
Search Keyword = "java"
↓
Request A 시작
↓
Search Keyword = "spring"
↓
Request B 시작
↓
Request B 완료
↓
Spring 검색 결과 표시
↓
Request A 완료
↓
Java 검색 결과로 덮어쓰기
```

### Problem

- 가장 최근에 시작된 요청이 항상 가장 마지막에 완료되지는 않음
- 네트워크 지연과 서버 처리 시간에 따라 응답 순서 변경 가능
- 요청 결과를 무조건 State에 저장하면 Stale Response 문제 발생 가능

### Important

- Race Condition은 반드시 여러 Thread에서만 발생하는 문제가 아님
- JavaScript의 비동기 처리에서도 발생 가능
- 특히 검색, 자동완성, Pagination, 필터 변경 등에서도 주의 필요

## 8. Stale Response

- 더 이상 현재 요청 조건과 일치하지 않는 이전 API 응답
- Stale Closure와는 구분되는 개념
- Stale Closure는 과거 렌더링의 값 참조 문제
- Stale Response는 오래된 비동기 요청의 결과가 최신 UI에 반영되는 문제

### Example

```jsx
useEffect(() => {
  async function loadUser() {
    const response = await fetch(`/api/users/${userId}`);

    const data = await response.json();

    setUser(data);
  }

  loadUser();
}, [userId]);
```

### Problem

- `userId`가 빠르게 변경되면 여러 요청이 동시에 진행될 수 있음
- 이전 요청이 최신 요청보다 늦게 완료될 수 있음
- 오래된 응답이 `setUser()`를 호출하여 최신 데이터를 덮어쓸 수 있음

### Solutions

- `AbortController`를 통한 이전 요청 취소
- Cleanup에서 Ignore Flag를 변경하여 이전 응답 무시
- Request ID 등을 이용하여 최신 요청만 반영
- 전문 데이터 조회 도구의 요청 관리 기능 활용

## 9. AbortController

- Fetch API에 취소 신호를 전달할 수 있는 Web API
- Axios에서도 `signal`을 통해 사용 가능
- Effect Cleanup 시 이전 요청에 취소 신호 전달
- 불필요한 요청 처리와 Stale Response 문제 감소에 도움

### Example

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadUser() {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (!controller.signal.aborted) {
        setUser(data);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        console.error(err);
      }
    }
  }

  loadUser();

  return () => controller.abort();
}, [userId]);
```

### Execution

```text
Effect Setup
↓
AbortController 생성
↓
HTTP Request 시작
↓
Dependency 변경
↓
Effect Cleanup
↓
controller.abort()
↓
이전 요청 취소 신호 전달
↓
새 Effect Setup
↓
새 HTTP Request 시작
```

### Important

- `abort()`는 요청에 취소 신호를 전달
- 이미 완료된 요청의 결과를 되돌리는 기능은 아님
- 서버가 이미 처리한 작업을 반드시 취소하거나 롤백하지는 않음
- 취소 발생 시 일반적인 Network Error와 구분하여 처리 필요
- State Update 직전에 취소 여부를 확인하는 방어적 처리 가능

## 10. Ignore Flag

요청을 취소할 수 없거나 이전 비동기 결과를 무시해야 하는 경우 사용 가능

### Example

```jsx
useEffect(() => {
  let ignore = false;

  async function loadUser() {
    try {
      const response = await fetch(`/api/users/${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (!ignore) {
        setUser(data);
      }
    } catch (err) {
      if (!ignore) {
        console.error(err);
      }
    }
  }

  loadUser();

  return () => {
    ignore = true;
  };
}, [userId]);
```

### Explanation

- 각 Effect Setup에서 `ignore = false` 생성
- Cleanup 시 해당 Setup의 `ignore`를 `true`로 변경
- 이후 이전 요청 결과가 도착하더라도 State Update 생략
- 새 Effect Setup은 별도의 `ignore` 변수 사용

### AbortController vs Ignore Flag

| Feature             | AbortController       | Ignore Flag                 |
| ------------------- | --------------------- | --------------------------- |
| 주요 목적           | 비동기 작업 취소 요청 | 이전 결과 반영 방지         |
| HTTP 요청 중단 시도 | 가능                  | 불가능                      |
| 오래된 결과 무시    | 취소 확인과 함께 처리 | 직접 처리                   |
| Fetch 지원          | O                     | 일반 비동기 코드에서도 가능 |
| 서버 처리 롤백      | 보장하지 않음         | 보장하지 않음               |

### Important

- Ignore Flag는 실제 HTTP Request 자체를 취소하지 않음
- 요청 결과를 React State에 반영할지 제어
- AbortController와 Ignore Flag는 목적이 일부 겹치지만 동작 방식은 다름

## 11. Retry and Refetch

- Retry는 실패한 Request를 다시 시도하는 동작
- Refetch는 기존 Request 조건으로 데이터를 다시 조회하는 동작
- 요청 상태에 따라 사용자에게 다시 시도할 수 있는 UI 제공 기능

### Retry Button

```jsx
const [retryCount, setRetryCount] = useState(0);

function handleRetry() {
  setRetryCount((prev) => prev + 1);
}
```

### Dependency

```jsx
useEffect(() => {
  // API Request
}, [retryCount]);
```

- `retryCount`가 변경되면 Effect 재실행
- 사용자 클릭을 통해 API Request 재시도 가능
- Effect 내부에 별도 Request 조건이 있다면 해당 Dependency도 포함 필요

### Important

- 모든 HTTP 오류에 대해 자동 Retry가 적절한 것은 아님
- 일시적인 Network Error, 503 등에서는 Retry가 유용할 수 있음
- 잘못된 요청 형식인 400 등은 요청을 수정해야 해결되는 경우가 많음
- POST 등 서버 상태를 변경하는 요청은 무조건 재시도하면 중복 처리 위험 존재
- 필요에 따라 Idempotency Key 등 중복 처리 방지 전략 검토

## 12. Complete React Example

Status, Loading, Error, Empty, Retry, Cleanup을 결합한 예제

### UserPosts.jsx

```jsx
import { useEffect, useState } from "react";

function UserPosts({ userId }) {
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
        const params = new URLSearchParams({
          userId: String(userId),
        });

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?${params}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setPosts(data);
          setStatus("success");
        }
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        setError(err instanceof Error ? err.message : "Unknown error");
        setStatus("error");
      }
    }

    loadPosts();

    return () => {
      controller.abort();
    };
  }, [userId, retryCount]);

  function handleRetry() {
    setRetryCount((prev) => prev + 1);
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return (
      <section>
        <p>Error: {error}</p>
        <button onClick={handleRetry}>Retry</button>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section>
        <p>No posts found</p>
        <button onClick={handleRetry}>Refresh</button>
      </section>
    );
  }

  return (
    <section>
      <h1>User Posts</h1>
      <button onClick={handleRetry}>Refresh</button>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </section>
  );
}

export default UserPosts;
```

### Explanation

- `posts` : 서버에서 조회한 게시글 목록
- `status` : 현재 Request Lifecycle 상태
- `error` : 요청 실패 정보
- `retryCount` : 수동 재요청을 위한 State
- `userId` : 조회 대상 사용자 ID
- Dependency가 변경되면 기존 Request Cleanup 이후 새로운 Request 시작
- 이전 Request는 `AbortController`로 취소 시도
- 취소된 Request의 결과는 State에 반영하지 않음
- 성공했지만 게시글이 없다면 Empty UI 출력
- Error 발생 시 Retry Button 제공
- Refresh Button 클릭 시 동일 조건으로 Refetch

### Important

- 이 예제는 직접 API 상태를 관리하는 학습용으로 구현
- `userId` 변경 직후 Effect가 실행되기 전의 짧은 구간에는 이전 UI가 남아 있을 수 있음
- 실전에서는 요청 조건과 결과를 함께 식별하여 오래된 데이터 표시까지 방지하는 방식 검토 가능
- 다수의 Request, Cache, Pagination 등을 처리하려면 더 체계적인 데이터 관리 방법이 유리할 수 있음

## 13. Duplicate Requests

- 같은 조건의 API Request가 여러 번 발생하는 상황
- StrictMode 개발 환경의 추가 Effect 검사, 중복 Event, 반복 Mount 등으로 발생 가능
- 동일한 데이터 조회 요청이라도 불필요한 중복 실행을 줄일 필요가 있음

### StrictMode

```text
Development StrictMode

Effect Setup
↓
Request A 시작
↓
Cleanup
↓
Request A 취소 시도
↓
Effect Setup
↓
Request B 시작
```

- Root StrictMode 개발 환경에서 초기 Effect의 추가 Setup 및 Cleanup 검사 가능
- 첫 번째 Request가 실제로 서버에 도달했을 수도 있음
- StrictMode를 제거하는 방식으로 문제를 숨기기보다 Cleanup과 요청 관리를 올바르게 구성
- Production에서는 StrictMode의 추가 검사로 인한 동일한 실행 흐름이 발생하지 않음

### Other Causes

- 버튼 중복 클릭
- 같은 API를 여러 Component에서 각각 호출
- Effect Dependency의 불필요한 변경
- Component 반복 Mount
- 요청 완료 전 새로운 요청 시작

### Solutions

- 올바른 Dependency 관리
- Event Handler에서 중복 실행 방지
- 이전 요청 취소 및 오래된 결과 무시
- Cache 및 Request Deduplication 기능 검토
- TanStack Query, SWR 등의 서버 상태 관리 도구 검토

## 14. Error Handling Strategy

API Error는 원인에 따라 구분하여 처리하는 것이 적절함

### Error Categories

| Error         | Example        | Approach                    |
| ------------- | -------------- | --------------------------- |
| HTTP Error    | 400, 404, 500  | Status에 따른 처리          |
| Network Error | 연결 실패      | Error UI 및 재시도 검토     |
| Timeout       | 제한 시간 초과 | Timeout 정책 및 재시도 검토 |
| Parsing Error | 잘못된 JSON    | Response 형식 확인          |
| Cancellation  | 요청 취소      | 일반적인 실패와 구분        |

### Fetch API

```js
const response = await fetch("/api/users");

if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`);
}
```

- Fetch는 HTTP 4xx, 5xx만으로 Promise가 자동 Reject되지 않음
- HTTP Status 확인 필요

### Axios

```js
try {
  const response = await api.get("/users");

  console.log(response.data);
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error(error.response?.status);
  }
}
```

- Axios는 기본적으로 2xx 이외 Status에서 Promise Reject
- `validateStatus` 설정에 따라 동작 변경 가능
- `error.response`가 없는 경우 HTTP Status를 확인할 수 없을 수 있음

### Important

- 모든 오류에 같은 메시지를 제공하는 것은 적절하지 않을 수 있음
- 내부 서버 오류 정보와 민감한 내용을 그대로 사용자에게 노출하지 않도록 주의
- 인증 오류, 권한 오류, 서버 오류 등을 구분하여 처리 가능
- Cancellation은 일반적인 오류 메시지 표시 대상에서 제외하는 경우가 많음

## 15. Client State vs Server State

### Client State

- 프론트엔드 UI 자체에서 관리하는 상태
- 예시 : Modal Open, Input Value, Selected Tab

### Server State

- 서버에서 관리하며 API를 통해 조회하는 데이터
- 예시 : 사용자 목록, 게시글, 주문 정보
- 여러 Client에 의해 변경될 수 있음
- 데이터의 최신성, Cache, Refresh, 중복 요청 등을 고려할 필요가 있음

### Comparison

| Feature         | Client State      | Server State    |
| --------------- | ----------------- | --------------- |
| 대표 데이터     | Modal, Tab        | User,Post       |
| 주요 관리 위치  | React Component   | Backend Server  |
| 네트워크 요청   | 일반적으로 불필요 | 일반적으로 필요 |
| Cache / Refetch | 보통 불필요       | 필요할 수 있음  |
| Loading / Error | 보통 불필요       | 중요            |

### Important

- `useState()`에 API 응답을 저장하더라도 원본 데이터의 관리 주체는 Server
- Server State는 로컬 UI State와 다른 관리 요구사항을 가짐
- 복잡한 프로젝트에서는 서버 상태 관리 Library 활용 가능
- 모든 프로젝트에 별도 서버 상태 관리 Library가 반드시 필요한 것은 아님

## 16. Design Principles

| Situation                           | Recommended Approach                  |
| ----------------------------------- | ------------------------------------- |
| API 요청 상태 관리                  | 명확한 Status 설계                    |
| 데이터가 없는 경우                  | Success 이후 Empty 판단               |
| Props 변경에 따른 조회              | Effect Dependency 관리                |
| 이전 요청 결과가 최신 결과를 덮어씀 | Cancellation 또는 Stale Response 방지 |
| 요청 취소                           | AbortController                       |
| 취소 불가능한 비동기 결과           | Ignore Flag 검토                      |
| 실패한 요청 재시도                  | Retry 처리                            |
| 동일 조건 재조회                    | Refetch 처리                          |
| 반복 API 호출                       | 중복 Request 관리                     |
| 대규모 서버 상태 관리               | 전문 데이터 조회 도구 검토            |

### Checklist

- API Request의 시작과 완료 시점 확인
- Loading, Success, Error, Empty 상태 구분
- 데이터가 비어 있다는 사실과 요청 실패를 구분
- HTTP Status 및 Network Error 확인
- Reactive Value를 Effect Dependency에 포함
- 여러 요청의 완료 순서가 달라질 수 있음을 고려
- 이전 Request의 결과가 최신 State를 덮어쓰지 않도록 처리
- Unmount 및 Dependency 변경 시 Cleanup 구성
- Retry와 Refetch의 동작 구분
- 동일한 Request가 중복 실행되는 원인 확인
- Client State와 Server State의 차이 이해

## Summary

- Request Lifecycle은 API 요청 시작부터 완료까지의 전체 흐름
- API 상태는 Idle, Loading, Success, Error 등으로 구분 가능
- Empty는 일반적으로 Success 이후 데이터가 없는 상태
- 단일 Status를 사용하면 모순된 상태 조합 방지에 유리
- Race Condition은 비동기 요청의 완료 순서에 따라 잘못된 결과가 발생하는 문제
- Stale Response는 오래된 요청의 결과가 최신 UI에 반영되는 문제
- Race Condition으로 인해 Stale Response가 최신 State를 덮어쓸 수 있음
- AbortController로 이전 요청에 취소 신호 전달 가능
- Ingnore Flag를 통해 이전 비동기 결과를 무시하는 방식도 가능
- Retry는 실패한 요청 재시도, Refetch는 데이터 재조회
- StrictMode 및 여러 사용자 이벤트로 중복 요청 발생 가능
- Client State와 Server State는 서로 다른 관리 요구사항을 가짐
- API 요청 상태와 생명주기를 고려해야 안정적인 React Application 구현 가능
