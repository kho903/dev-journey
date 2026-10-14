# 08. Axios

## 1. Axios

- JavaScript에서 HTTP Request와 Response를 처리하기 위한 Promise 기반 HTTP Client Library
- Fetch API와 달리 별도 설치 필요
- Browser 및 Node.js 환경에서 사용 가능
- HTTP Method별 함수, 자동 JSON 처리, Interceptor, 공통 설정 등의 기능 제공
- React와 Spring Boot 간 REST API 통신에도 사용 가능

### Installation

```bash
npm install axios
```

### Import

```js
import axios from "axios";
```

### Basic Syntax

```js
const response = await axios.get(url);
```

- `axios.get()`은 Promise 반환
- `await`를 통해 HTTP Response 획득
- 응답 데이터는 일반적으로 `response.data`에서 확인

## 2. GET Request

### Basic Example

```js
import axios from "axios";

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );

  console.log(response.data);
}
```

### Execution Flow

```text
getUsers() 호출
↓
axios.get() 실행
↓
HTTP GET Request
↓
Server Response 수신
↓
Axios의 Response 처리
↓
response.data 확인
↓
JavaScript Array 또는 Object 사용
```

- Axios는 기본 설정에서 JSON Response를 자동 파싱
- Fetch의 `response.json()`과 같은 별도 파싱 호출이 일반적으로 불필요
- `response.data`에 서버가 반환한 응답 데이터 저장
- 응답 데이터의 실제 형태는 서버의 Response에 따라 달라짐

## 3. Axios Response

Axios Response Object에는 여러 정보가 포함

### Example

```js
const response = await axios.get("/api/users");

console.log(response.data);
console.log(response.status);
console.log(response.headers);
```

### Response Properties

| Property     | Meaning                     |
| ------------ | --------------------------- |
| `data`       | 서버 응답 데이터            |
| `status`     | HTTP Status Code            |
| `statusText` | HTTP Status Message         |
| `headers`    | HTTP Response Headers       |
| `config`     | Axios Request Configuration |
| `request`    | 실제 요청 관련 객체         |

- `statusText`는 HTTP Version 및 실행 환경에 따라 비어 있을 수 있음
- 요청 결과 판단에는 `response.status` 활용

### Important

```js
const response = await axios.get("/api/users");

const users = response.data;
```

- `response`는 Axios Response Object
- `response.data`는 서버에서 전달된 데이터
- Axios의 Response Object와 Fetch의 Response Object는 서로 다른 구조
- Axios에서는 JSON 응답에 대해 `response.json()`을 호출하지 않음

## 4. HTTP Error Handling

- Axios는 기본적으로 HTTP Status가 2xx 범위를 벗어나면 Promise Reject
- Fetch API는 HTTP 404, 500만으로 자동 Reject되지 않음
- Axios에서는 `try/catch`를 이용한 HTTP 오류 처리 가능
- Axios의 `validateStatus` 설정을 변경하면 Reject 조건도 달라질 수 있음

### Basic Example

```js
import axios from "axios";

async function getUsers() {
  try {
    const response = await axios.get("/api/users");

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
```

### Axios Error Structure

- `error.response` : 서버에서 HTTP Response를 받은 경우
- `error.request` : 요청을 보냈지만 Response를 받지 못한 경우 등
- `error.message` : 오류 메시지
- `error.code` : Axios가 제공하는 오류 코드

### Recommended Example

```js
import axios from "axios";

async function getUsers() {
  try {
    const response = await axios.get("/api/users");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("HTTP Error:", error.response.status);
      } else if (error.request) {
        console.error("No response received");
      } else {
        console.error("Axios Error:", error.message);
      }
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
}
```

### Important

- `error.response`가 존재하면 서버의 HTTP Status 확인 가능
- `error.response.data`에 서버가 반환한 Error Response가 들어 있을 수 있음
- CORS 오류, Network Error, Timeout 등의 상황에서는 HTTP Response에 접근하지 못할 수 있음
- `axios.isAxiosError()`를 통해 Axios Error인지 확인 가능
- Error를 `catch`에서 처리한 뒤 호출자에게 다시 전달하려면 `throw` 사용

## 5. POST, PUT, PATCH, DELETE

Axios는 HTTP Method별 함수를 제공

### POST Request

```js
const response = await axios.post("/api/users", {
  name: "JIHUN",
  role: "backend",
});

console.log(response.data);
```

- POST 요청의 두 번째 인자에 Request Body 전달
- 일반 JavaScript Object를 전달하면 Axios가 기본 설정에서 JSON으로 직렬화
- 일반적인 JSON 요청에서는 직접 `JSON.stringify()`를 호출할 필요 없음

### PUT Request

```js
await axios.put("/api/users/1`", {
  name: "MINJI",
  role: "frontend",
});
```

- Resource 전체 교체 요청 등에 사용

### PATCH Request

```js
await axios.patch("/api/users/1", {
  name: "YUNA",
});
```

- Resource 일부 변경 요청 등에 사용

### DELETE Request

```js
await axios.delete("/api/users/1");
```

- Resource 삭제 요청 등에 사용
- `204 No Content` 응답에서도 Fetch처럼 `response.json()` 호출이 필요하지 않음

### Axios Method Signatures

```js
axios.get(url, config);

axios.post(url, data, config);

axios.put(url, data, config);

axios.patch(url, data, config);

axios.delete(url, config);
```

- GET, DELETE는 일반적으로 두 번째 인자에 Configuration 전달
- POST, PUT, PATCH는 두 번째 인자에 Data, 세 번째 인자에 Configuration 전달

## 6. Query Parameters

- Axios는 `params` 옵션을 통해 Query Parameter 전달 가능
- URL 문자열을 직접 이어 붙이지 않고 객체로 구성 가능
- 일반적인 값은 Axios가 URL Query String으로 직렬화

### Example

```js
const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
  params: {
    userId: 1,
  },
});

console.log(response.data);
```

### Request URL

```text
https://jsonplaceholder.typicode.com/posts?userId=1
```

### Spring Boot Integration Example

```js
const response = await axios.get("/api/boards", {
  params: {
    page: 0,
    size: 10,
    keyword: "Spring",
  },
});
```

### Request

```http
GET /api/boards?page=0&size=10&keyword=Spring
```

- 게시글 목록 조회 요청
- `page`, `size`, `keyword`를 Query Parameter로 전달
- 실제 Parameter 이름은 Backend API 명세에 맞춰야 함

## 7. Fetch API vs Axios

| Feature         | Fetch API             | Axios                      |
| --------------- | --------------------- | -------------------------- |
| 설치            | 불필요                | 필요                       |
| HTTP 요청       | `fetch()`             | `axios.get()` 등           |
| JSON 응답       | `response.json()`     | 일반적으로 `response.data` |
| HTTP 4xx / 5xx  | 자동 Reject하지 않음  | 기본적으로 Reject          |
| JSON 요청 Body  | 직접 직렬화           | 일반 객체 자동 직렬화      |
| Query Parameter | URLSearchParams 등    | `params` 제공              |
| 공통 설정       | 별도 함수 등으로 구현 | Axios Instance 제공        |
| Interceptor     | 직접 구현 필요        | 기본 제공                  |
| 요청 취소       | AbortController       | AbortController 지원       |

### Important

- Axios가 Fetch보다 항상 더 좋은 것은 아님
- 단순한 HTTP 요청에는 Fetch API도 충분
- 여러 API에 공통 설정과 요청 처리 규칙이 필요하면 Axios가 편리할 수 있음
- 두 방식 모두 Browser 환경에서는 CORS 제약을 받음

## 8. Axios Instance

- 여러 Axios Request에서 공통 설정을 재사용하기 위한 Axios 객체
- `axios.create()`를 이용하여 생성
- `baseURL`, `timeout`, `headers` 등을 공통 설정으로 지정 가능
- 각 API 호출에서 반복되는 설정 감소

### Problem

```js
await axios.get("http://localhost:8080/api/users");

await axios.get("http://localhost:8080/api/boards");

await axios.post("http://localhost:8080/api/users", userData);
```

- 모든 API 호출에 서버 주소 반복
- 서버 주소 변경 시 여러 파일 수정 가능성
- 공통 설정의 유지보수 어려움

### Solution

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
});

export default api;
```

### Usage

```js
import api from "./api";

const usersResponse = await api.get("/users");

const boardsResponse = await api.get("/boards");

const createdUserResponse = await api.post("/users", {
  name: "JIHUN",
});
```

### Explanation

- `baseURL` : 상대 URL 요청에 적용할 기본 서버 주소
- `timeout` : 요청의 제한 시간 설정
- `headers` : 공통 HTTP Header 설정
- `api.get("/users")`는 설정한 `baseURL`과 결합하여 요청
- 절대 URL을 사용하면 일반적으로 해당 절대 URL이 우선이 됨

### Important

- 공통 설정은 한 곳에서 관리하는 것이 유지보수에 유리
- 환경별 서버 주소는 Vite Environment Variable 등으로 분리 가능
- `timeout` 발생이 서버에서 이미 진행한 작업을 자동으로 롤백한다는 의미는 아님

## 9. Axios Interceptor

- HTTP Request 또는 Response가 처리되는 과정에 공통 로직을 등록하는 기능
- Request Interceptor와 Response Interceptor로 구분
- 인증 Header 추가, 공통 Error Handling, Response 가공 등에 활용

### Request Interceptor

```js
api.interceptors.request.use(
  (config) => {
    console.log("Request:", config.method, config.url);

    return config;
  },
  (error) => Promise.reject(error),
);
```

- Request가 전송되기 전 Configuration 확인 및 수정 가능
- Request Configuration을 반환하여 다음 단계로 전달
- 인증 정보 추가 등 공통 Request 처리에 활용 가능

### Response Interceptor

```js
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Authentication required");
    }

    return Promise.reject(error);
  },
);
```

- Response 성공 및 오류 처리 과정에 공통 로직 등록
- `401 Unauthorized` 등 특정 HTTP Error 처리 가능
- Error를 다시 전달하려면 `Promise.reject(error)` 사용

### Execution Flow

```text
React Component
↓
api.get("/users")
↓
Request Interceptor
↓
HTTP Request
↓
Spring Boot API
↓
HTTP Response
↓
Response Interceptor
↓
React Component
```

### Important

- Interceptor는 여러 Request에 공통 로직 적용 가능
- 모든 Component에서 같은 Interceptor를 반복 등록하지 않도록 주의
- 일반적으로 공통 Axios Instance를 정의하는 Module에서 한 번 등록
- 필요하지 않은 Interceptor는 `eject()`로 해제 가능
- 요청이나 응답에서 민감한 인증 정보를 로그에 남기지 않도록 주의

### Interceptor Ejection

```js
const interceptorId = api.interceptors.response.use((response) => response);

api.interceptors.response.eject(interceptorId);
```

- `use()`의 반환 ID를 사용해 Interceptor 제거 가능
- 동적으로 Interceptor를 등록하는 구조에서 Cleanup 고려

## 10. React Integration

- Axios Response를 React State에 저장 가능
- Component Mount 또는 Dependency 변경 시 데이터를 가져오는 데 Effect 사용 가능
- Loading, Error, Empty 상태 분리
- 요청 취소 및 오래된 응답 처리 고려

### File Structure

```text
src/
├── api/
│   └── api.js
└── components/
    └── UserList.jsx
```

### api.js

```js
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

export default api;
```

### UserList.jsx

```jsx
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/api";

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
        const response = await api.get("/users", {
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setUsers(response.data);
        }
      } catch (err) {
        if (!controller.signal.aborted && !axios.isCancel(err)) {
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
Effect Setup
↓
AbortController 생성
↓
loading = true
error = null
↓
Axios GET Request
↓
Server Response
↓
Axios Response 처리
↓
response.data
↓
setUsers()
↓
loading = false
↓
Re-render
↓
User List 출력
```

### Cleanup

```jsx
return () => {
  controller.abort();
};
```

- Component Unmount 또는 Effect Cleanup 시 요청 취소 신호 전달
- Axios에서도 `AbortController`의 `signal` 지원
- 취소된 요청 결과는 State에 반영하지 않도록 처리
- 개발 StrictMode에서는 추가 Setup과 Cleanup이 발생할 수 있음

## 11. Axios and Authentication

- 인증된 API 요청에서는 Authorization Header 등을 사용 가능
- JWT 기반 인증에서는 Access Token을 Bearer Token 형태로 전달하는 방식 사용 가능
- 토큰 보관 및 전달 방식은 서비스 보안 요구사항에 따라 설계 필요

### Example

```js
const response = await api.get("/users/me", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

### HTTP Request

```http
GET /api/users/me
Authorization: Bearer <access-token>
```

- 인증이 필요한 API에 Access Token 전달
- Spring Security 등의 Backend 인증 처리와 연결 가능
- 공통 인증 Header 처리는 Request Interceptor로 구성할 수도 있음
- JWT 사용 여부와 무관하게 HTTPS 및 토큰 노출 방지 필요

### CORS

- React와 Spring Boot의 Origin이 다르면 CORS 설정이 필요할 수 있음
- Axios 사용 자체가 CORS 문제를 해결하지는 않음
- Browser는 Fetch와 Axios 모두에 대해 Cross-Origin 접근 제약 적용

## 12. Common Mistakes

### Fetch Response 방식 사용

```js
const response = await axios.get("/api/users");

const users = await response.json();
```

- Axios Response에 Fetch의 `response.json()`을 적용한 잘못된 코드

### Correct

```js
const response = await axios.get("/api/users");

const users = response.data;
```

### Request Body 전달 위치 오류

```js
await axios.post("/api/users", {
  params: {
    name: "JIHUN",
  },
});
```

- `params`가 Request Configuration이 아닌 Data 인자에 포함됨
- 서버에 전달되는 JSON Body가 의도와 달라질 수 있음

### Correct POST Body

```js
await axios.post("/api/users", {
  name: "JIHUN",
});
```

### Correct Query Parameters

```js
await axios.get("/api/users", {
  params: {
    role: "backend",
  },
});
```

### Duplicate Interceptor Registration

```jsx
function UserList() {
  api.interceptors.response.use((response) => response);

  return <div>User List</div>;
}
```

- Component가 Re-render될 때마다 Interceptor 추가 등록
- 불필요한 중복 처리 및 유지보수 문제 가능

### Recommended

```js
// api.js

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
```

- 공통 API Module에서 한 번 등록

## 13. Design Principles

| Situation               | Recommended Approach            |
| ----------------------- | ------------------------------- |
| 간단한 HTTP 통신        | Fetch 또는 Axios                |
| JSON 응답 데이터 사용   | `response.data`                 |
| HTTP 오류 처리          | `try/catch`                     |
| Query Parameter 전달    | `params`                        |
| JSON Request Body       | Data 인자에 객체 전달           |
| 공통 Base URL 설정      | Axios Instance                  |
| 공통 Header 설정        | Axios Instance 또는 Interceptor |
| 공통 인증 처리          | Request Interceptor 검토        |
| 공통 오류 처리          | Response Interceptor 검토       |
| 요청 취소               | AbortController                 |
| Loading / Error / Empty | React State 관리                |
| 사용자 이벤트 기반 요청 | Event Handler                   |

### Checklist

- Axios 설치 및 Import 확인
- HTTP Method에 맞는 Axios 함수 사용
- Axios Response와 Fetch Response 구분
- `response.data`를 통해 데이터 확인
- HTTP 오류 처리 방식 확인
- Query Parameter와 Request Body 구분
- Axios Instance의 공통 설정 검토
- Interceptor의 중복 등록 방지
- Component Unmount 시 요청 취소 필요성 검토
- 인증 Header 및 CORS 정책 확인

## Summary

- Axios는 Promise 기반 HTTP Client Library
- Fetch와 달리 별도 설치 필요
- Axios는 JSON Response를 일반적으로 자동 파싱
- 응답 데이터는 `response.data`로 접근
- HTTP 4xx 및 5xx는 기본적으로 Promise Reject
- HTTP Method별 함수를 이용하여 요청 가능
- `params` 옵션으로 Query Parameter 전달
- POST 등의 Data 인자에 JavaScript Object 전달 가능
- Axios Instance를 이용하여 공통 설정 관리 가능
- Interceptor를 이용하여 Request 및 Response 공통 처리 가능
- React에서는 Axios Response를 State에 반영 가능
- Axios도 AbortController를 이용한 요청 취소 지원
- Fetch와 Axios는 목적과 프로젝트 구조에 따라 선택해야 함
