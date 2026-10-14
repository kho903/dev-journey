# 07. Fetch API

## 1. Fetch API

- JavaScript에서 HTTP Request를 보내고 Response를 처리하기 위한 Web API
- Browser에 기본 제공되므로 별도 Library 설치 불필요
- `fetch()`는 Promise를 반환
- `async/await` 또는 `.then()`을 이용하여 비동기 처리 가능
- React와 Spring Boot 간 REST API 통신에도 사용 가능

### Syntax

```js
const response = await fetch(url, options);
```

- `url` : 요청 대상 URL
- `options` : HTTP Method, Headers, Body, Signal 등 요청 설정
- `options` 생략 시 기본적으로 GET 요청
- Response를 받은 뒤 Status 확인 및 Body 처리 필요

## 2. GET Request

### Basic Example

```js
async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const users = await response.json();

  console.log(users);
}
```

### Execution Flow

```text
getUsers() 호출
↓
fetch() 실행
↓
HTTP GET Request
↓
Server Response 수신
↓
response.json()
↓
JSON Parsing
↓
JavaScript Array 또는 Object
```

- `fetch()`는 Response를 담은 Promise 반환
- `await fetch()`는 응답을 기다린 뒤 Response 객체 획득
- `response.json()`은 Response Body를 읽고 JSON 파싱
- `response.json()`도 Promise를 반환하므로 `await` 필요

### Important

```js
const response = await fetch(url);
const data = await response.json();
```

- `response`는 HTTP 응답 정보를 담은 Response 객체
- `data`는 JSON을 파싱하여 얻은 JavaScript 데이터
- `response`와 `data`는 서로 다른 개념
- `response.json()`은 Response Body를 JSON으로 파싱하여 JavaScript Value 반환
- 파싱 결과는 Object, Array, String, Number, Boolean, null 등이 될 수 있음

## 3. HTTP Error Handling

Fetch API는 HTTP 오류 응답과 Network Error를 구분하여 처리해야 함

### Important Behavior

- 서버에서 `404 Not Found`를 반환해도 일반적으로 Fetch Promise는 Reject되지 않음
- 서버에서 `500 Internal Server Error`를 반환해도 일반적으로 Fetch Promise는 Reject되지 않음
- Network Error 또는 요청 중단 등의 상황에서는 Promise가 Reject될 수 있음
- HTTP 오류 여부는 `response.ok` 또는 `response.status`로 확인

### response.ok

```js
const response = await fetch("/api/users");

if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`);
}
```

- `response.ok`는 HTTP Status가 200~299 범위일 때 `true`
- 그 외 Status에서는 `false`

### response.status

```js
console.log(response.status);
```

- HTTP Status Code 확인
- 예시 : 200, 201, 400, 404, 500

### Recommended Example

```js
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const users = await response.json();

    console.log(users);
  } catch (error) {
    console.error(error);
  }
}
```

- `try` : 정상 처리
- `throw` : HTTP 오류를 명시적으로 Error로 변환
- `catch` : HTTP Error, Network Error, JSON Parsing Error 등 처리

## 4. Fetch API with React

- React Component에서 외부 API 데이터를 State로 관리 가능
- Component Mount 또는 특정 Dependency 변경에 따라 요청할 때 `useEffect()` 사용 가능
- API Response를 State Setter로 저장하면 Re-render 발생
- Loading, Error, Data를 별도로 관리하는 패턴 사용 가능

### Basic Example

```jsx
import { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      setUsers(data);
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h1>User List</h1>

      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </section>
  );
}
export default UserList;
```

### Explanation

- `users` : 서버에서 받아온 사용자 목록 State
- `useEffect()` : Component Mount 시 API Request 실행
- `fetch()` : HTTP GET 요청
- `response.ok` : HTTP Status 확인
- `response.json()` : JSON Response 파싱
- `setUsers(data)` : 데이터 State 저장
- Re-render 이후 사용자 목록 출력

### Limitation

- 위 코드는 기본 흐름을 설명하기 위한 예제
- Error를 화면에 표시하지 않음
- Loading 상태를 관리하지 않음
- Unmount 및 요청 중단에 대한 처리가 없음
- 실제 사용 시 Error Handling과 Cleanup 보완 필요
- 비동기 함수에서 Error가 발생하면 처리되지 않은 Promise Rejection이 발생할 수 있음
- 실제 구현에서는 try/catch 등을 통한 Error Handling 필요

## 5. Loading / Error / Empty State

API 요청에는 여러 상태가 존재

### Request States

| State   | Meaning                     |
| ------- | --------------------------- |
| Loading | 요청 진행 중                |
| Success | 요청 성공                   |
| Error   | 요청 실패                   |
| Empty   | 요청 성공했지만 데이터 없음 |

### State Design

```jsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

- `users` : Response Data
- `loading` : 요청 진행 여부
- `error` : 요청 실패 정보
- Error가 없다면 `null` 사용

### Conditional Rendering

```jsx
if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>Error: {error}</p>;
}

if (users.length === 0) {
  return <p>No users found</p>;
}
```

- Loading 중에는 로딩 메시지 출력
- Error 발생 시 오류 메시지 출력
- 요청 성공 후 결과가 비어 있다면 Empty UI 출력
- 정상 데이터가 있다면 목록 출력

### Important

- 빈 배열이 반드시 Loading을 의미하는 것은 아님
- 요청 중인 상태와 데이터가 없는 상태를 구분해야 함
- Error와 Empty는 서로 다른 상태

## 6. Complete React GET Example

Loading, Error, Empty, Cleanup을 함께 구현한 예제

```jsx
import { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      setLoading(true);
      setError(null);

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
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <section>
      <h1>User List</h1>

      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </section>
  );
}

export default UserList;
```

### Execution Flow

```text
Component Mount
↓
useEffect Setup
↓
AbortController 생성
↓
loading = true
error = null
↓
fetch() 실행
↓
HTTP Response 수신
↓
response.ok 확인
↓
response.json()
↓
users State 업데이트
↓
loading = false
↓
Re-render
↓
User List 출력
```

### Error Flow

```text
Request 시작
↓
HTTP Error 또는 Network Error
↓
catch
↓
error State 업데이트
↓
finally
↓
loading = false
↓
Error UI 출력
```

- 요청 취소가 발생한 경우 State 업데이트를 생략
- `finally`는 요청 성공 및 실패 시 모두 실행됨
- `controller.signal.aborted`를 통해 취소 여부 확인
- UI에는 요청 완료 결과에 따라 적절한 상태 표시

## 7. AbortController and Cleanup

- `AbortController`는 비동기 작업에 취소 신호를 전달하기 위한 Web API
- Fetch API에서 `signal`을 전달하여 요청 취소 가능
- Component Unmount 또는 Effect Cleanup 시 이전 요청 중단 가능
- 오래된 요청 결과가 최신 UI에 반영되는 문제를 방지하는 데 도움

### Syntax

```js
const controller = new AbortController();

fetch("/api/users", {
  signal: controller.signal,
});

controller.abort();
```

### useEffect Cleanup

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadUsers() {
    try {
      const response = await fetch("/api/users", {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (!controller.signal.aborted) {
        setUsers(data);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        console.error(error);
      }
    }
  }

  loadUsers();

  return () => controller.abort();
}, []);
```

### Important

- 요청이 취소되면 Fetch Promise가 `AbortError` 등으로 Reject될 수 있음
- 요청 취소를 일반적인 API 실패와 구분하여 처리
- Cleanup에서 이전 요청을 중단하여 불필요한 작업 방지
- 요청 취소가 서버 측 처리까지 반드시 되돌린다는 의미는 아님

## 8. POST Request

- 서버에 데이터를 전송하는 HTTP 요청
- 일반적으로 Create 작업 등에 사용
- React에서는 사용자 Form 제출 등의 Event Handler에서 실행 가능

### Basic Example

```js
async function createUser() {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "JIHUN",
      role: "backend",
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
```

### Request Options

| Option      | Meaning                              |
| ----------- | ------------------------------------ |
| method      | HTTP Method 설정                     |
| headers     | HTTP Header 설정                     |
| body        | Request Body 전달                    |
| signal      | 요청 취소 신호 연결                  |
| credentials | Cookie 등의 인증 정보 전송 정책 설정 |

### JSON.stringify()

```js
const body = JSON.stringify({
  name: "JIHUN",
  role: "backend",
});
```

- JavaScript Object를 JSON 문자열로 직렬화
- `Content-Type: application/json`과 함께 사용

### Event Handler Example

```jsx
async function handleSubmit(event) {
  event.preventDefault();

  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    console.log("User created");
  } catch (error) {
    console.error(error);
  }
}
```

- 사용자 Form 제출 시 API Request 실행
- 특정 사용자 행동이 원인이므로 Event Handler에서 처리
- 단순 POST 요청을 위해 Effect를 추가할 필요 없음

## 9. Query Parameters

GET 요청에서 검색이나 필터링 조건을 Query Parameter로 전달 가능

### Example

```js
const params = new URLSearchParams({
  userId: "1",
});

const response = await fetch(
  `https://jsonplaceholder.typicode.com/posts?${params}`,
);

if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`);
}

const posts = await response.json();
```

- `URLSearchParams`를 사용하면 Query Parameter를 안전하게 구성 가능
- 문자열을 직접 이어 붙이는 방식보다 인코딩 오류 방지에 유리
- React State에 따른 검색 조건 변경과 결합 가능

## 10. Common Mistakes

### Missing await

```js
const response = fetch("/api/users");
```

- `response`는 Response가 아닌 Promise
- Response를 얻으려면 `await` 또는 `.then()` 필요

### Incorrect HTTP Error Handling

```js
try {
  const response = await fetch("/api/users");
  const users = await response.json();
} catch (error) {
  console.log(error);
}
```

- HTTP 404, 500을 자동으로 Error로 처리하지 않음
- `response.ok` 확인 필요

### Incorrect useEffect

```jsx
useEffect(async () => {
  const response = await fetch("/api/users");
}, []);
```

- Effect Setup 함수를 `async`로 직접 선언한 패턴
- async 함수는 Promise를 반환하지만 Effect Setup은 Cleanup Function 또는 undefined를 반환해야 함
- Effect 내부에 별도의 async 함수 선언 필요

### Correct useEffect

```jsx
useEffect(() => {
  async function loadUsers() {
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    setUsers(data);
  }

  loadUsers();
}, []);
```

- Effect Setup은 일반 함수로 유지
- 비동기 작업은 내부 async 함수에서 수행
- 이 코드는 문법 예시로 실제 사용 시 Error Handling 및 Cleanup 보완 필요

### Empty Response Body

```js
const response = await fetch("/api/users/1", {
  method: "DELETE",
});

if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`);
}

if (response.status !== 204) {
  const data = await response.json();
}
```

- `204 No Content`는 Response Body가 없음
- Body가 없는 응답에 무조건 `response.json()`을 호출하면 Parsing Error 발생 가능
- 다른 Status에서도 Body가 없을 수 있으므로 API 응답 계약 확인 필요

## 11. Design Principles

| Situation                      | Recommended Approach                 |
| ------------------------------ | ------------------------------------ |
| Component Mount 시 데이터 조회 | useEffect 또는 전용 데이터 조회 도구 |
| 사용자 클릭 후 POST 요청       | Event Handler                        |
| HTTP 오류 확인                 | response.ok / response.status        |
| JSON 응답 처리                 | await response.json()                |
| Loading 상태                   | loading State                        |
| 요청 실패 표시                 | error State                          |
| 데이터 없음                    | Empty UI                             |
| Fetch 요청 취소                | AbortController                      |
| 검색 Parameter 구성            | URLSearchParams                      |
| 여러 API 상태 관리             | State 설계 및 요청 흐름 관리         |

### Checklist

- HTTP Request의 목적과 Method 확인
- `fetch()`의 Promise 처리
- HTTP Status 확인
- JSON Parsing 처리
- Loading, Error, Empty 상태 구분
- Component Unmount 시 요청 취소 필요성 검토
- Effect Dependency가 올바른지 확인
- 사용자 행동으로 발생한 요청은 Event Handler 사용 검토
- 서버가 반환하는 Response 형태 확인

## Summary

- Fetch API는 JavaScript에서 HTTP 요청과 응답을 처리하는 Web API
- `fetch()`는 Promise를 반환
- `response.json()`도 Promise를 반환
- HTTP 404, 500은 자동 Reject되지 않으므로 Status 확인 필요
- `try/catch`를 이용하여 비동기 오류 처리
- React에서는 응답 데이터를 State에 저장하여 UI 갱신 가능
- Loading, Error, Empty 상태를 구분해야 함
- `useEffect()` 내부에서는 별도 async 함수 사용
- `AbortController`로 요청 취소 가능
- GET은 데이터 조회, POST는 데이터 생성 등에 활용
- API 요청 위치를 Event Handler와 Effect의 역할에 맞게 선택해야 함
