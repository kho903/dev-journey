# Review 02. HTTP, Fetch API & Axios

## 1. HTTP & REST API

다음 API를 사용하는 React 애플리케이션을 개발한다고 가정

```http
GET /users
GET /users/1
GET /posts?userId=1
POST /posts
```

### Questions

1. HTTP Request와 HTTP Response는 각각 무엇인가?

HTTP Request(요청)는 클라이언트가 서버에 특정 작업을 수행하도록 보내는 메시지
HTTP REquest에는 일반적으로 다음 정보가 포함됨

- HTTP Method: GET, POST, PUT, PATCH, DELETE 등
- URL: 요청 대상 리소스의 주소
- Headers: 인증, 콘텐츠 형식 등의 부가 정보
- Body: 서버에 전달할 데이터. 모든 요청에 Body가 필요한 것은 아님

HTTP Response(응답)는 서버가 요청을 처리한 후 클라이언트에 반환하는 메시지
Response에는 일반적으로 HTTP Status Code, Headers, Body가 포함됨

예를 들어

```http
GET /users/1
```

요청에 대한 반환은

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "Leanne Graham"
}
```

2. GET과 POST의 주요 차이점은 무엇인가?

| 구분                 | GET                            | POST                                    |
| -------------------- | ------------------------------ | --------------------------------------- |
| 주요 목적            | 리소스 조회                    | 데이터 제출, 리소스 생성 등의 처리 요청 |
| 데이터 전달          | 일반적으로 URL Query Parameter | 일반적으로 Request Body                 |
| 서버 상태 변경       | 원칙적으로 변경하지 않아야 함  | 변경할 수 있음                          |
| 멱등성               | 멱등적                         | 기본적으로 멱등성이 보장되지 않음       |
| 주요 React 실행 위치 | userEffect 또는 이벤트 핸들러  | 일반적으로 이벤트 핸들러                |

- GET은 서버의 리소스를 조회하기 위한 Method로, 동일한 요청을 여러 번 수행해도 요청 자체가 서버 상태를 변경해서는 안 됨
- POST는 데이터를 서버에 제출하거나 새로운 리소스를 생성하는 등의 작업에 사용함
- 주의 : GET이 반드시 `useEffect`에서 실행되어야 한다는 의미는 아님. 사용자가 버튼을 클릭했을 때 GET을 실행할 수도 있음. 반대로 게시글 작성과 같은 POST는 사용자의 명시적인 이벤트에서 실행하는 것이 적절함

3. URL Path Parameter와 Query Parameter의 차이를 설명하고, 위 API에서 각각의 예시를 찾아보자.

- 엄밀하게는 Path Parameter보다 Path Variable 또는 경로 변수라는 표현을 사용하는 경우도 많음
- Path Variable은 URL 경로에 포함되어 특정 리소스를 식별하는 역할을 함

```http
GET /users/1
```

- 여기서 1은 사용자 ID
- Query Parameter는 URL의 `?` 뒤에 `key=value` 형태로 전달되며, 필터링, 검색, 정렬, 페이지네이션 등에 주로 사용됨

```http
GET /posts?userId=1
```

- 여기에서 `userId=1`은 사용자 1의 게시글만 조회하기 위한 조건

| 요청                 | 구분                         |
| -------------------- | ---------------------------- |
| `GET /users`         | 별도 Path Variable 없음      |
| `GET /users/1`       | `1`이 Path Variable          |
| `GET /poss?userId=1` | `userId=1`이 Query Parameter |
| `POST /posts`        | 별도 Path Variable 없음      |

4. HTTP Status Code의 의미를 설명하자.

| 상태 코드                  | 의미                     | 설명                                      |
| -------------------------- | ------------------------ | ----------------------------------------- |
| `200 OK`                   | 요청 성공                | 일반적인 조회 성공 등                     |
| `201 Created`              | 리소스 생성              | 요청으로 새 리소스가 생성됨               |
| `204 No Content`           | 성공, 응답 본문 없음     | 성공했지만 Response Body를 반환하지 않음  |
| `400 Bad Request`          | 잘못된 요청              | 요청 형식이나 값 등에 문제가 있음         |
| `401 Unauthorized`         | 인증 필요 또는 인증 실패 | 유효한 인증 정보가 없거나 인증할 수 없음  |
| `404 Not Found`            | 리소스를 찾을 수 없음    | 요청한 리소스가 존재하지 않음             |
| `500 Internal Server Error | 서버 내부 오류           | 서버가 요청을 처리하는 과정에서 오류 발생 |

- `401 Unauthorized`는 이름 때문에 헷갈리기 쉽지만, 주로 인증(Authentication) 문제를 나타냄
- 인증된 사용자가 특정 작업을 수행할 권한이 없는 경우에는 일반적으로 `403 Forbidden`이 더 적잘함

5. HTTP 요청이 성공했다는 사실과, 애플리케이션이 원하는 데이터를 정상적으로 받았다는 사실은 항상 같은 의미인가?

- 항상 같지는 않음
- HTTP `200 OK`를 받았더라도 애플리케이션이 기대하는 데이터 구조가 아닐 수 있음
- 예를 들어 사용자 목록 API가 다음과 같이 응답했다고 가정

```json
{
  "message": "success"
}
```

- HTTP Status는 200이지만 React 코드가 배열을 기대한다면 문제가 발생할 수 있음

```js
users.map((user) => <p key={user.id}>{user.name}</p>);
```

- 또한 `204 No Content`는 정상적인 성공 응답이지만 Body가 없으므로 JSON 데이터를 받았다고 가정해서는 안 됨

## 2. Fetch API

다음은 사용자 목록을 조회하려는 React 코드

`users`, `status`, `error` State가 이미 선언되어 있다고 가정

```jsx
const BASE_URL = "https://jsonplaceholder.typicode.com";

useEffect(() => {
  async function loadUsers() {
    setStatus("loading");

    try {
      const response = await fetch(`${BASE_URL}/users`);

      const data = response.json();

      setUsers(data);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  loadUsers();
}, []);
```

이 코드에는 여러 가지 문제점이 있음

### Questions

1. `response.json()` 앞에 `await`가 필요한 이유는?

- `response.json()`은 응답 Body를 읽고 JSON으로 파싱하는 비동기 작업이며, Promise를 반환함

잘못된 코드

```js
const data = response.json();

setUsers(data);
```

여기서 `data`는 사용자 배열이 아니라 Promise 객체

올바른 코드

```js
const data = await response.json();

setUsers(data);
```

`await`를 사용해야 JSON 파싱이 완료된 결과를 받을 수 있음

2. Fetch에서 HTTP 404 또는 500 응답을 받으면 `catch`가 자동으로 실행되는가?

- Fetch API는 HTTP `404`, `500` 등의 오류 응답을 받더라도 일반적으로 Promise를 정상 이행(Resolve)함
- Fetch Promise가 Reject되는 대표적인 상황은 네트워크 오류, 요청 취소 등
- 따라서 HTTP 오류를 catch에서 처리하려면 직접 Status를 검사해야 함

```js
if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`);
}
```

3. `response.ok`는 무엇을 의미하며, 왜 검사해야 하는가?

- `response.ok`는 HTTP Status가 200~299 범위일 때 `true`가 되는 속성임

```js
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`);
}
```

- 이를 검사하면 HTTP 오류 응답을 성공 데이터처럼 처리하는 문제를 방지할 수 있음
- 다만 `response.ok === true`라도 응답 데이터가 애플리케이션 요구사항에 적합하다는 것까지 보장하지는 않음

4. 위 코드에서 Cleanup이 없다면 어떤 문제가 발생할 수 있는가?

- 컴포넌트가 Unmount 되었거나 Effect의 Dependency가 변경되었는데 이전 요청이 계속 진행될 수 있음
- 또한 늦게 도착한 이전 요청의 응답이 현재 데이터를 덮어쓰는 Stale Response/Race Condition 문제가 발생할 수 있음
- `AbortController`를 사용하면 Cleanup 시점에 진행 중인 요청을 취소할 수 있고, 취소 여부를 확인해 오래된 State Update를 방지할 수 있음

5. AbortController를 사용하여 안전하게 요청을 처리하려면 어떻게 수정해야 하는가?

### Requirements

- `AbortController` 사용
- `controller.signal`을 fetch에 전달
- HTTP Status 검사
- `response.json()` 비동기 처리
- Loading / Success / Error 상태 처리
- 취소된 요청의 State Update 방지
- Cleanup에서 요청 취소
- HTTP 오류와 요청 취소 구분

### Corrected Code

```jsx
const BASE_URL = "https://jsonplaceholder.typicode.com";

useEffect(() => {
  // 현재 Effect에서 실행할 HTTP 요청 전용 Controller
  const controller = new AbortController();

  // Effect가 Cleanup되었는지 확인하는 변수
  // 이전 비동기 응답의 State 반영을 방지
  let ignore = false;

  async function loadUsers() {
    // 새로운 요청 시작
    setStatus("loading");

    // 이전 오류 메시지 초기화
    setError(null);

    // 이전 데이터 초기화
    setUsers([]);

    try {
      // AbortSignal을 fetch 옵션으로 전달
      const response = await fetch(`${BASE_URL}/users`, {
        signal: controller.signal,
      });

      // Fetch는 404, 500만으로 Reject하지 않으므로
      // HTTP Status를 직접 검사해야 함
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // response.json()은 Promise를 반환하므로 await 필요
      const data = await response.json();

      // 이전 요청이 Cleanup되었거나 취소되었다면
      // State를 변경하지 않음
      if (ignore || controller.signal.aborted) {
        return;
      }

      // 응답 데이터가 배열인지 검사
      if (!Array.isArray(data)) {
        throw new Error("Invalid users response");
      }

      // 정상적인 최신 응답만 State에 저장
      setUsers(data);
      setStatus("success");
    } catch (err) {
      // 취소된 요청은 실제 HTTP 오류와 구분
      if (
        ignore ||
        controller.signal.aborted ||
        (err instanceof Error && err.name === "AbortError")
      ) {
        return;
      }

      // 예상하지 못한 오류 형태도 처리
      const message = err instanceof Error ? err.message : "Unexpected Error";

      // 실제 오류만 State에 저장
      setError(message);
      setStatus("error");
    }
  }

  // Effect Setup에서 요청 시작
  loadUsers();

  // Effect Cleanup
  return () => {
    // 이전 Effect의 결과를 무효화
    ignore = true;

    // 진행 중인 요청 취소
    controller.abort();
  };
}, []);
```

## 3. Axios

다음은 Axios Instance를 사용하여
특정 사용자의 게시글 목록을 가져오려는 코드

`api`는 이미 생성된 Axios Instance라고 가정

```jsx
async function loadPosts(userId) {
  const response = await api.get("/posts", {
    userId,
  });

  const posts = await response.json();

  return posts;
}
```

### Questions

1. 위 코드에서 잘못된 부분을 모두 찾아 설명하자.

첫 번째: Axios Query Parameter 전달 방식이 잘못됨

```js
api.get("/posts", {
  userId,
});
```

- Axios에서 `get()`의 두 번째 인자는 Request Config 객체
- Query Parameter를 보내려면 반드시 `params` 속성 안에 넣어야 함

```js
api.get("/posts", {
  params: {
    userId,
  },
});
```

두 번째: Axios Response에는 `json()` 메서드가 없음

```js
const posts = await response.json();
```

- 이는 Fetch의 Response를 다루는 방식
- Axios는 일반적인 JSON 응답을 자동으로 파싱하므로 다음처럼 작성

```js
const posts = response.data;
```

2. Axios에서 Query Parameter를 전달하려면 어떻게 해야 하는가?

- `params` 속성을 사용

```js
const response = await api.get("/posts", {
  params: {
    userId: 1,
  },
});
```

- 결과적으로 `/posts?userId=1`을 요청하게 됨

3. Axios에서 응답 데이터를 추출할 때 `response.data`를 사용하는 이유는?

- Axioos는 HTTP 응답을 Axios Response 객체로 제공하며, 서버가 보낸 본문 데이터는 `response.data`에 저장됨

```js
const response = await api.get("/users");

console.log(response.status); // 200
console.log(response.data); // 사용자 배열
```

- JSON 응답은 일반적으로 Axios가 자동으로 파싱하므로 `response.json()`을 사용할 필요가 없음

4. Axios의 기본 설정에서는 HTTP 404 응답을 어떻게 처리하는가?

- Axios의 기본 설정에서는 HTTP 404 응답을 Promise Rejection으로 처리함
- 따라서 다음 코드에서 `catch`가 실행됨

```js
try {
  await api.get("/does-not-exist");
} catch (err) {
  console.error(err);
}
```

- 단, Axios의 `validateStatus` 설정을 변경하면 어떤 상태 코드를 성공 또는 실패로 취급할지 달라질 수 있음

5. `axios.isAxiosError(err)`를 사용하는 이유는?

- 발생한 오류가 Axios에서 생성한 오류인지 검사하기 위함
- Axios Error는 다음과 같은 정보를 제공할 수 있음

| 속성                | 역할                                         |
| ------------------- | -------------------------------------------- |
| `err.response`      | 서버로부터 받은 HTTP 오류 응답               |
| `err.response.data` | HTTP Status Code                             |
| `err.request`       | 전송되었지만 정상 응답을 받지 못한 요청 정보 |
| `err.code`          | Axios 오류 코드                              |
| `err.message`       | 오류 메시지                                  |

예시

```js
if (axios.isAxiosError(err)) {
  console.log(err.response?.status);
  console.log(err.code);
}
```

- Axios Error가 아닌 일반 JavaScript Error와 구분할 수 있어 안전한 오류 처리가 가능함

6. Axios 요청에 AbortController를 연결하려면 어떻게 해야 하는가?

- `AbortController`를 생성하고 `controller.signal`을 Axios Request Config에 전달함

```js
const controller = new AbortController();

api.get("/posts", {
  signal: controller.signal,
});

// 요청 취소
controller.abort();
```

- React의 Effect에서는 Cleanup에서 abort()를 호출하도록 구성할 수 있다.

### Requirements

- `api.get()` 사용
- `params` 옵션 사용
- `response.data` 반환
- 함수 매개변수로 `userId`와 `signal` 전달
- Axios 설정 객체에 `signal` 포함

### Corrected Code

```jsx
/**
 * 특정 사용자의 게시글 목록 조회
 *
 * @param {number} userId - 조회할 사용자 ID
 * @param {AbortSignal} signal - 요청 취소에 사용할 Signal
 * @returns {Promise<Array>} - 게시글 배열
 *
 * 이 함수는 API 요청과 데이터 반환만 담당
 * React State 관리는 호출한 컴포넌트의 책임
 */
async function loadPosts(userId, signal) {
  // Axios GET 요청
  const response = await api.get("/posts", {
    // Query Parameter
    // /posts?userId=1 형태로 변환
    params: {
      userId,
    },

    // 요청 취소를 위한 AbortSignal
    signal,
  });

  // Axios는 서버 응답 데이터를 response.data로 제공
  return response.data;
}
```

## 4. Axios Instance & Interceptor

다음은 Axios Instance와 Interceptor 코드

```jsx
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  console.log("[Request]", config.url);
});

api.interceptors.response.use(
  (response) => {
    console.log("[Response]", response.status);
  },
  (error) => {
    console.error("[Response Error]", error.message);
  },
);

export default api;
```

### Questions

1. Axios Instance를 생성하는 이유는?

- 여러 API 요청에서 공통으로 사용하는 설정을 한 곳에서 관리하기 위해서
- 예를 들어 모든 요청이 동일한 서버에 접근하고, 동일한 Timeout이나 인증 Header를 사용한다면 각 요청마다 설정을 반복할 필요가 없음

```js
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});
```

- 이후 다른 컴포넌트에서는 다음처럼 사용할 수 있음

```js
const response = await api.get("/users");
```

- 또한 Interceptor를 적용하면 공통 요청/응답 처리도 한 곳에서 관리할 수 있음

2. `baseURL`과 `timeout`은 각각 어떤 역할을 하는가?

| 설정      | 역할                                                  |
| --------- | ----------------------------------------------------- |
| `baseURL` | 상대 URL 요청에 사용할 기본 서버 주소                 |
| `timeout` | 지정한 시간을 초과하면 Axios가 요청을 중단하도록 설정 |

예를 들어:

```js
baseURL: "https://jsonplaceholder.typicode.com",
timeout: 5000,
```

- `api.get("/users")`는 기본 URL과 요청 경로를 결합해 해당 서버에 요청함
- `timeout: 5000`은 5,000ms, 즉 5초를 의미함
- Timeout이 발생하면 Axios는 일반적으로 오류를 Reject함

3. Request Interceptor에서 `config`를 반환하지 않으면 어떤 문제가 발생할 수 있는가?

원래 코드

```js
api.interceptors.request.use((config) => {
  console.log("[Request]", config.url);
});
```

- 문제는 `return config`가 없다는 것
- Request Interceptor는 요청 설정을 전달하거나 수정하는 과정이므로, 정상적인 요청을 계속 진행하려면 Config 객체를 반환해야 함

```js
api.interceptors.request.use((config) => {
  console.log("[Request]", config.url);

  return config;
});
```

- 반환하지 않으면 다음 처리 단계에 `undefined`가 전달되어 Axios 요청이 정상적으로 실행되지 않을 수 있음

4. Response Interceptor의 성공 콜백에서 `response`를 반환하지 않으면 호출부에는 어떤 영향을 미치는가?

원래 코드

```js
api.interceptors.response.use((response) => {
  console.log("[Response]", response.status);
});
```

- 이 콜백은 명시적인 `return`이 없으므로 `undefined`를 반환함
- 따라서 호출부에서

```js
const response = await api.get("/users");

console.log(response.data);
```

를 실행하면 `response`가 `undefined`가 되어 오류가 발생할 수 있음

- 올바른 코드는

```js
api.interceptors.response.use((response) => {
  console.log("[Response]", response.status);

  return response;
});
```

5. Response Interceptor의 오류 콜백에서 오류를 다시 Reject하지 않으면 어떤 문제가 생기는가?

원래 코드

```js
(error) => {
  console.error("[Response Error]", error.message);
};
```

- 여기에도 반환문이 없음
- 오류 처리 콜백이 undefined를 정상 반환하면, 해당 Interceptor 이후의 Promise 흐름이 Rejected에서 Fulfilled로 바뀔 수 있음
- 따라서 호출부의 catch가 실행되지 않고, 오류가 발생했는데도 정상 응답처럼 처리되는 문제가 생길 수 있음
- 오류를 호출부에 계속 전달하려면 다음처럼 작성

```js
(error) => {
  console.error("[Response Error]", error.message);

  return Promise.reject(error);
};
```

- 참고로 오류를 기록한 뒤 throw error를 사용해도 오류를 전파할 수 있음

6. `ERR_CANCELED`를 실제 HTTP 오류와 구분해야 하는 이유는?

- `ERR_CANCELED`는 일반적으로 요청이 취소되었다는 의미
- 예를 들어 사용자가 User 1을 선택한 직후 User 2를 선택하면 기존 User 1 요청을 Cleanup에서 취소할 수 있음
- 이때 발생하는 취소 오류는 서버에서 발생한 HTTP 404나 500과는 다름
- 또한 요청 취소에는 HTTP 응답 자체가 없을 수 있으므로 HTTP Status Code가 존재하지 않을 수도 잇음
- 따라서 취소 오류를 일반적인 API 실패 화면이나 Console Error로 취급하지 않는 것이 적절함

### Requirements

위 코드를 다음 조건에 맞게 수정

- Request Interceptor에서 config 반환
- Response Interceptor 성공 시 response 반환
- Response Interceptor 오류 시 Promise.reject(error)
- 취소된 Axios 요청은 console.error로 출력하지 않음
- 실제 HTTP 오류 또는 네트워크 오류만 Console Error로 기록

### Corrected Code

```jsx
import axios from "axios";

/**
 * 공통 Axios Instance
 *
 * 여러 컴포넌트에서 동일한 서버 설정과
 * Interceptor를 재사용하기 위한 객체
 */
const api = axios.create({
  // 기본 API 서버 주소
  baseURL: "https://jsonplaceholder.typicode.com",

  // 요청 제한 시간: 5,000ms = 5초
  timeout: 5000,
});

/**
 * Request Interceptor
 *
 * HTTP 요청이 전송되기 전에 실행
 *
 * 공통 Header 설정, 요청 로그 등의 작업에 활용 가능
 */
api.interceptors.request.use(
  (config) => {
    // 요청 Method와 URL 출력
    console.log("[Request]", config.method?.toUpperCase(), config.url);

    // 반드시 Config 객체 반환
    //
    // 이후 Axios 요청 처리 과정으로 전달됨
    return config;
  },
  (error) => {
    // Request 설정 단계의 오류를 호출부에 전달
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 *
 * 서버 응답 또는 요청 실패를 공통 처리
 */
api.interceptors.response.use(
  // HTTP 응답이 Axios 설정상 성공으로 처리된 경우
  (response) => {
    console.log("[Response]", response.status);

    // 반드시 Response 객체 반환
    //
    // 호출부에서 response.data에 접근할 수 있음
    return response;
  },

  // 요청 실패 또는 Axios가 오류로 처리한 응답
  (error) => {
    /**
     * 요청 취소 여부 검사
     *
     * AbortController로 의도적으로 취소한 경우
     * 일반적인 HTTP 오류처럼 Console Error를 출력하지 않음
     */
    if (axios.isCancel(error)) {
      // 오류 로그는 생략하지만
      // 호출부에서도 취소 여부를 판단할 수 있도록
      // Promise Rejection은 유지
      return Promise.reject(error);
    }

    /**
     * 실제 HTTP 또는 Network Error
     *
     * error.response?.status:
     * - 서버가 오류 HTTP 응답을 반환한 경우
     *
     * error.code:
     * - Axios가 제공하는 오류 코드
     *
     * error.message:
     * - 그 외 오류 설명
     */
    console.error(
      "[Response Error]",
      error.response?.status ?? error.code ?? error.message,
    );

    // 오류를 정상 응답으로 바꾸지 않고
    // 호출한 컴포넌트의 catch까지 전달
    return Promise.reject(error);
  },
);

export default api;
```

## 5. API Request Lifecycle

다음 React Component 일부를 확인

`posts`, `status`, `error`, `handleRefetch`는
이미 선언되어 있다고 가정

```jsx
const isEmpty = posts.length === 0;

return (
  <section>
    {isEmpty && <p>No posts found</p>}

    {status === "loading" && <p>Loading...</p>}

    {status === "error" && <p>Error: {error}</p>}

    {status === "success" &&
      posts.map((post) => <p key={post.id}>{post.title}</p>)}
  </section>
);
```

### Questions

1. 최초 렌더링에서 `posts = []`, `status = "loading"`이라면 어떤 UI가 나타날 수 있는가?

- 문제의 조건은 다음과 같음

```js
const posts = [];
const status = "loading";
```

기존 코드

```js
const isEmpty = posts.length === 0;
```

따라서 `isEmpty`는 `true`
랜더링 결과는

```text
No posts found
Loading...
```

- 두 메시지가 동시에 나타날 수 있다.
- 하지만 요청이 진행 중이라고 해서 게시글이 없는 것으로 확정할 수는 없기 때문에 잘못된 UI다.

2. 이 코드에서 Empty State 판단이 잘못된 이유는?

- `posts.length === 0`만으로 Empty를 판단했기 때문
- 빈 배열은 다음 두 상황 모두에서 나타날 수 있음
  - API 요청이 아직 진행 중인 초기 상태
  - API 요청에 성공했지만 결과가 없는 상태
- 따라서 실제 Empty State는 다음처럼 판단

```js
const isEmpty = status === "success" && posts.length === 0;
```

3. Loading / Success / Error / Empty는 각각 어떤 상황을 나타내는가?

| 상태    | 의미                          | 대표UI              |
| ------- | ----------------------------- | ------------------- |
| Loading | 요청이 진행 중                | `Loading...`        |
| Success | 요청이 성공함                 | 게시글 데이터       |
| Error   | 요청이 실패함                 | 오류 메시지와 Retry |
| Empty   | 요청은 성공했지만 결과가 없음 | `No posts found`    |

4. API 요청에 성공하여 빈 배열을 받은 상황과, 검색 결과가 없는 상황은 어떻게 다른가?

API 결과가 빈 배열인 경우:
서버에서 조회한 원본 데이터 자체가 없음

```js
posts.length === 0;
```

검색 결과가 없는 경우:
서버에서 받아온 데이터는 존재하지만, 사용자가 입력한 검색 조건에 일치하는 데이터가 없음

```js
posts.length > 0 && filteredPosts.length === 0;
```

예를 들어 서버에서 10개의 게시글을 가져왔지만 검색어 "abcdefg"에 해당하는 게시글이 없다면 이는 검색 결과 Empty

원본 데이터 Empty와 검색 결과 Empty는 UI에서 구분하는 것이 좋음

5. Retry와 Refetch는 어떤 점이 비슷하고, UI에서 어떻게 구분할 수 있는가?

둘 다 API 요청을 다시 실행하는 동작이라는 점에서 비슷함
하지만 일반적으로 UI에서 사용하는 맥락이 다름

| 구분      | Retry            | Refresh                    |
| --------- | ---------------- | -------------------------- |
| 사용 상황 | 이전 요청 실패   | 기존 데이터 다시 조회      |
| 대표 상태 | Error            | Success, Empty             |
| 예시 버튼 | `Retry`          | `Refresh`                  |
| 내부 구현 | 재요청 함수 호출 | 같은 재요청 함수 호출 가능 |

두 버튼 모두 같은 `handleRefetch` 함수를 사용할 수 있음

6. `status === "success"`와 `posts.length === 0`을 함께 검사하도록 수정하고, Error 상태에는 Retry 버튼을 추가하자.

### Requirements

- Loading 중에는 Empty 메시지 출력 금지
- Error 중에는 Empty 메시지 출력 금지
- 성공했지만 데이터가 없으면 No posts found 출력
- 데이터가 있으면 게시글 목록 출력
- Error 상태에서 Retry 버튼 표시
- Success 및 Empty 상태에서 Refetch 버튼 표시
- 모든 버튼은 `handleRefetch` 사용

### Corrected Code

```jsx
// status와 posts에서 계산하는 Derived Value
//
// API 요청이 성공했고 데이터가 없을 때만
// Empty 상태로 판단
const isEmpty = status === "success" && posts.length === 0;

return (
  <section>
    {/* Loading 상태 */}
    {status === "loading" && <p>Loading...</p>}

    {/* Error 상태 */}
    {status === "error" && (
      <div>
        <p role="alert">Error: {error}</p>

        {/* 실패한 요청 재시도 */}
        <button type="button" onClick={handleRefetch}>
          Retry
        </button>
      </div>
    )}

    {/* Success + 빈 배열 */}
    {isEmpty && (
      <div>
        <p>No posts found</p>

        {/* 데이터가 없어도 다시 조회 가능 */}
        <button type="button" onClick={handleRefetch}>
          Refetch
        </button>
      </div>
    )}

    {/* Success + 게시글 존재 */}
    {status === "success" && posts.length > 0 && (
      <div>
        <button type="button" onClick={handleRefetch}>
          Refetch
        </button>

        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    )}
  </section>
);
```

## 6. POST Request & Form Submission

다음 코드는 게시글 작성 요청을 처리하려는 함수

`title`, `body`, `userId`, `setSubmitStatus` 등의
State와 함수가 이미 선언되어 있다고 가정

```jsx
function handleSubmit(event) {
  api.post("/posts", {
    title,
    body,
    userId,
  });

  setSubmitStatus("success");
}
```

### Questions

1. Form 제출 시 `event.preventDefault()`가 필요한 이유는?

- HTML Form은 기본적으로 Submit 이벤트가 발생하면 페이지 이동이나 새로고침 수행 가능
- React에서는 JavaScript로 POST 요청을 직접 처리해야 하므로 기본 제출 동작을 막는 것이 일반적

```js
function handleSubmit(event) {
  event.preventDefault();
}
```

2. 위 코드에서 서버 응답을 기다리지 않고 Success 상태로 변경하는 것이 왜 문제인가?

- `api.post()`가 Promise를 반환하는데도 결과를 기다리지 않는다는 것이다.
- 따라서 실제 POST 요청이 실패하더라도 이미 Success 상태가 표시됨
- 올바른 방식은 `async/await`을 사용해 서버가 성공 응답을 반환한 뒤 State를 변경하는 것

```js
const response = await api.post("/posts", {
  title,
  body,
  userId,
});

setCreatedPost(response.data);
setSubmitStatus("success");
```

3. 입력값에 대해 `trim()` 검사를 해야 하는 이유는?

- 사용자 공백만 입력해도 문자열 자체는 빈 문자열이 아닐 수 있기 때문

```js
Boolean("   "); // true
Boolean("   ".trim()); // false
```

- 따라서 제목과 본문에 의미 있는 문자가 입력되었는지 검사하기 위해 `trim()`을 사용함

4. POST 요청 중 중복 제출이 발생하면 어떤 문제가 생길 수 있는가?

- 사용자가 버튼을 여러 번 클릭하면 동일한 POST 요청이 여러 번 전송될 수 있음
- 실제 서버에서는 같은 게시글이 중복 생성되거나, 결제와 같은 기능에서는 중복 처리로 이어질 수 있음
- 따라서 요청이 진행 중인 동안 추가 제출을 방지해야 함

5. `submitting` State와 `useRef()`는 중복 제출 방지에 각각 어떻게 활용할 수 있는가?

- `submitting` State 는 현재 요청 진행 상황을 UI에 반영한다.

```js
<button disabled={submitStatus === "submitting"}>Create Post</button>
```

- `useRef()`는 렌더링을 기다리지 않고 현재 제출 진행 여부를 즉시 확인하는 데 활용 가능

```js
if (submittingRef.current) {
  return;
}

submittingRef.current = true;
```

- 둘을 함께 사용하면 사용자에게 요청 진행 상태를 표시하면서 중복 제출도 방지할 수 있음

6. `try/catch/finally`를 사용하면 어떤 점이 좋아지는가?

| 구문      | 역할                                |
| --------- | ----------------------------------- |
| `try`     | POST 요청 실행 및 성공 처리         |
| `catch`   | POST 실패 시 오류 처리              |
| `finally` | 성공 실패와 관계없이 제출 잠금 해제 |

- 특히 `finally`는 중복 제출을 방지하기 위해 설정한 잠금을 해제하기에 적절함

7. JSONPlaceholder의 POST 요청이 HTTP 201을 반환했을 때, 새 게시글이 실제 데이터베이스에 영구 저장되었다고 볼 수 있는가?

- X
- `201 Created`는 HTTP 수준에서 리소스 생성이 성공했다고 응답한 상태 코드
- 하지만 JSONPlaceholder는 학습과 테스트를 위한 Mock API이므로 일반적인 POST 요청은 실제 데이터베이스에 영구 저장되지 않음
- 따라서 작성 직후 GET 목록을 다시 조회해도 해당 게시글이 나타나지 않을 수 있음

### Requirements

`handleSubmit` 함수를 다음 조건으로 수정

- async Event Handler 사용
- `event.preventDefault()` 호출
- Title / Body 공백 검증
- `submitting` 중 중복 제출 차단
- POST 요청 전 submitting 상태로 변경
- POST 성공 시 서버 응답 데이터 저장
- POST 실패 시 오류 메시지 저장
- 실패하더라도 기존 입력값 유지
- finally에서 중복 제출 잠금 해제

### Corrected Code

```jsx
import { useRef, useState } from "react";

import api from "../api/api";
import { getApiErrorMessage } from "../api/getApiErrorMessage";

/**
 * 게시글 작성 컴포넌트
 *
 * userId:
 * - 부모로부터 전달받은 사용자 ID
 *
 * POST 요청은 useEffect가 아닌
 * 사용자의 Form Submit 이벤트에서 실행
 */
function PostCreateForm({ userId }) {
  // 게시글 제목과 본문
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // 작성 상태
  // idle | submitting | success | error
  const [submitStatus, setSubmitStatus] = useState("idle");

  // 입력 검증 또는 POST 요청 오류 메시지
  const [submitError, setSubmitError] = useState(null);

  // POST 성공 시 서버가 반환한 데이터
  const [createdPost, setCreatedPost] = useState(null);

  /**
   * 중복 제출 방지를 위한 Ref
   *
   * .current를 변경해도 Re-render되지 않음
   *
   * State 업데이트가 화면에 반영되기 전에도
   * 제출 진행 여부를 즉시 검사할 수 있음
   */
  const submittingRef = useRef(false);

  /**
   * 게시글 작성 Event Handler
   *
   * 사용자가 Form을 제출했을 때만 실행
   */
  async function handleSubmit(event) {
    // 1. 브라우저의 기본 Form 제출 방지
    event.preventDefault();

    // 2. 이미 제출 중이면 중복 요청 차단
    if (submittingRef.current) {
      return;
    }

    // 3. 앞뒤 공백 제거
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    // 4. 입력값 검증
    if (!trimmedTitle || !trimmedBody) {
      setSubmitError("Title and Body are required.");

      // 실제 HTTP 요청은 실행되지 않음
      setSubmitStatus("idle");
      setCreatedPost(null);

      return;
    }

    // 5. 중복 제출 잠금 설정
    //
    // 새로운 렌더링을 기다리지 않고 즉시 변경
    submittingRef.current = true;

    // 6. 제출 상태로 전환
    setSubmitStatus("submitting");

    // 이전 오류와 성공 결과 초기화
    setSubmitError(null);
    setCreatedPost(null);

    try {
      // 7. Axios POST 요청
      //
      // 두 번째 인자는 서버에 전송할 Request Body
      const response = await api.post("/posts", {
        title: trimmedTitle,
        body: trimmedBody,
        userId,
      });

      // 8. 성공 응답의 데이터 저장
      //
      // Axios에서는 response.data 사용
      setCreatedPost(response.data);

      // 9. 서버 성공 응답을 받은 뒤 Success로 변경
      setSubmitStatus("success");
    } catch (err) {
      // 10. POST 요청 실패
      //
      // 공통 Error 처리 함수 사용
      const message = getApiErrorMessage(err);

      setSubmitError(message);
      setSubmitStatus("error");

      // title과 body는 변경하지 않음
      // 따라서 실패 후 사용자가 재시도할 수 있음
    } finally {
      // 11. 성공과 실패에 관계없이 잠금 해제
      //
      // 다음 Submit을 허용
      submittingRef.current = false;
    }
  }

  // 현재 요청이 진행 중인지 확인
  const isSubmitting = submitStatus === "submitting";

  return (
    <section>
      <h2>Create Post</h2>

      {/* Form Submit 이벤트 연결 */}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="post-title">Title</label>

          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="post-body">Body</label>

          <textarea
            id="post-body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
            disabled={isSubmitting}
          />
        </div>

        {/* 제출 중에는 버튼 비활성화 */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Post"}
        </button>
      </form>

      {/* 입력값 검증 오류 또는 서버 오류 */}
      {submitError && <p role="alert">Error: {submitError}</p>}

      {/* POST 성공 결과 */}
      {submitStatus === "success" && createdPost && (
        <div>
          <h3>Post Created (Simulated)</h3>

          <p>Post ID: {createdPost.id}</p>
          <p>Title: {createdPost.title}</p>
          <p>User ID: {createdPost.userId}</p>
        </div>
      )}
    </section>
  );
}

export default PostCreateForm;
```

- 이 코드에서는 `api.post()`가 성공한 경우에만 `success` 상태로 변경된다.
- 또한 POST 요청이 실패해도 사용자가 입력한 제목과 본문은 그대로 유지된다.

## 7. Fetch & Axios 종합 비교

### Scenario A — HTTP 404

Fetch와 Axios로 동일한 URL에 요청

```jsx
// Fetch
const response = await fetch("/api/not-found");

// Axios
const response = await api.get("/not-found");
```

### Questions

1. Fetch와 Axios는 기본적으로 HTTP 404를 각각 어떻게 처리하는가?

- Fetch는 HTTP 404를 받아도 일반적으로 Promise를 정상 이행함
- 따라서 `response.ok`를 검사하지 않으면 오류를 성공처럼 처리할 수 있음
- Axios는 기본 설정에서 HTTP 404를 Promise Rejection으로 처리하므로 `catch`에서 실행됨

2. 두 방식 모두 HTTP 오류를 UI에 표시하려면 어떤 차이를 고려해야 하는가?

- Fetch는 직접 `response.ok`를 검사해 오류를 발생시킴

```js
try {
  const response = await fetch("/api/not-found");

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();
} catch (err) {
  console.error(err);
}
```

Axios는 기본적으로 오류 응답이 Reject되므로 `catch`에서 상태 코드를 확인한다.

```js
try {
  const response = await api.get("/does-not-exist");
} catch (err) {
  if (axios.isAxiosError(err) && err.response) {
    console.error(`HTTP Error: ${err.response.status}`);
  }
}
```

### Scenario B — 빠른 사용자 변경

다음 상황을 가정

```text
User 1 선택
    ↓
GET /users/1 시작
    ↓
User 2 선택
    ↓
GET /users/2 시작
    ↓
User 2 응답 도착
    ↓
User 1 응답이 뒤늦게 도착
```

### Questions

1. 어떤 문제가 발생할 수 있는가?

- User 1과 User 2의 요청이 동시에 진행되는 상황에서 User 1의 응답이 늦게 도착하면, 현재 선택한 사용자는 User 2인데 화면에는 User 1의 데이터가 표시될 수 있음
- 이는 요청 결과가 응답 도착 순서에 따라 달라지는 `Race Condition`임
- 이미 최신 요청이 아닌 User 1의 응답이 현재 State를 덮어쓰는 것을 `Stale Response` 문제라고 함

2. AbortController와 Cleanup을 적용하면 어떻게 방지할 수 있는가?

- 각 Effect에서 AbortController를 생성
- Dependency인 `userId`가 변경되면 이전 Effect의 Cleanup 실행
- Cleanup에서 `controller.abort()`를 호출하여 이전 요청 취소
- 응답을 State에 저장하기 전에 요청 취소 여부를 확인

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

      // 취소된 요청이라면 State 업데이트 방지
      if (controller.signal.aborted) return;

      setUser(data);
    } catch (err) {
      // 요청 취소는 일반적인 API 오류로 처리하지 않음
      if (controller.signal.aborted) return;

      console.error(err);
    }
  }

  loadUser();

  return () => {
    controller.abort();
  };
}, [userId]);
```

- 이러한 구조를 통해 이전 요청의 응답이 최신 State를 덮어쓰는 문제를 방지할 수 있음

3. 요청 취소와 오래된 응답 무시는 정확히 같은 개념인가?

서로 다른 개념

- `요청 취소(Abort)`: 진행 중인 비동기 요청을 중단하려는 작업
- `오래된 응답 무시(Ignore)`: 이전 요청의 결과가 도착하더라도 현재 State에 반영하지 않는 작업

| 구분                    | 요청 취소             | 오래된 응답 무시        |
| ----------------------- | --------------------- | ----------------------- |
| 목적                    | 불필요한 요청 중단    | Stale State Update 방지 |
| 대표 도구               | AbortController       | Ignore Flag             |
| 네트워크 요청 중단 시도 | 가능                  | 불가능                  |
| 오래된 결과 반영 방지   | 취소 여부 확인과 결합 | 가능                    |

- AbortController는 진행 중인 요청을 취소하기 위한 도구
- Ignore Flag는 이미 시작된 비동기 작업의 결과를 무효화하기 위한 방법
- 두 방법은 서로 관련이 있지만 동일하지 않으며, 필요에 따라 함께 사용할 수 있음

### Scenario C — 게시글 작성

JSONPlaceholder에서 다음 요청에 성공

```http
POST /posts
HTTP/1.1 201 Created
```

이후 GET 요청으로 게시글 목록을 다시 조회했지만
방금 작성한 게시글은 목록에 없음

### Questions

1. 왜 이런 결과가 발생할 수 있는가?

- JSONPlaceholder는 학습과 테스트를 위한 Mock API임
- 일반적인 POST 요청에 성공 응답을 반환하지만 실제 데이터베이스에 데이터를 영구 저장하지 않음
- 따라서 POST에 성공하더라도 이후 GET 요청 결과에는 새로운 게시글이 포함되지 않을 수 있음

2. POST 성공 응답과 실제 영구 저장은 어떤 차이가 있는가?

- `POST 성공 응답`: 서버가 해당 HTTP 요청을 성공적으로 처리했다고 응답한 상태
- `영구 저장(Persistence)`: 데이터가 실제 저장소에 기록되어 이후에도 유지되는 상태
- HTTP 202 Created는 리소스 생성이 성공했음을 나타내는 상태 코드지만, JSONPlaceholder와 같은 Mock API에서는 실제 영구 저장이 이루어지지 않음
- 실제 서비스에서도 응답 코드만으로 모든 후속 처리나 영속성 보장 범위를 단정해서는 안 되며, 서버의 API 계약을 확인해야 함

3. 실제 서비스에서 POST 실패 후 Retry할 때 고려해야 하는 위험은 무엇인가?

- 가장 중요한 위험은 `중복 데이터 생성`
- 예를 들어 다음 상황 발생 가능

```text
Client
  ↓
POST /posts 요청
  ↓
Server에서 게시글 저장 성공
  ↓
네트워크 오류로 응답 전달 실패
  ↓
Client는 요청 실패로 판단
  ↓
사용자가 Retry 클릭
  ↓
POST /posts 재요청
  ↓
동일한 게시글이 중복 생성될 가능성
```

이를 방지하기 위해 실제 서비스에서는 다음 방법을 고려할 수 있음

- `중복 제출 방지`: 요청 진행 중 Submit 버튼 비활성화
- `Idempotency Key`: 동일한 작업을 식별하는 고유 키를 서버에 전달하여 중복 처리 방지
- `서버 측 중복 검사`: 동일한 요청 또는 데이터를 중복 처리하지 않도록 검증
- `요청 상태 확인`: 재시도 전에 기존 요청의 처리 결과 확인

단순히 클라이언트에서 Submit 버튼을 비활성화하는 것만으로 서버의 모든 중복 생성 문제를 방지할 수는 없음

### Scenario D — 요청 상태 분리

게시글 목록 GET 요청은 성공했으나 게시글 작성 POST 요청은 실패한 상황

### Questions

1. 화면에는 각각 어떤 상태를 표시해야 하는가?

- 게시글 목록 GET 요청은 성공했으므로 기존 게시글 목록을 정상적으로 표시
- 게시글 작성 POST 요청은 실패했으므로 작성 폼에 오류 메시지를 표시
- POST 요청이 실패하더라도 사용자가 입력한 Title과 Body는 유지
- 사용자가 내용을 다시 입력하지 않고 Submit을 통해 재시도할 수 있도록 구성

```text
PostList
  status = success
       ↓
기존 게시글 목록 유지

PostCreateForm
  submitStatus = error
       ↓
오류 메시지 표시
입력값 유지
다시 Submit 가능
```

2. 목록과 작성 요청의 State를 독립적으로 관리해야 하는 이유는?

- GET과 POST는 서로 다른 목적을 가진 독립적인 HTTP 요청이기 때문
- 하나의 공통 `status`를 사용하면 POST 요청 실패가 GET 목록의 UI에도 영향을 줄 수 있음
- 예를 들어 POST가 실패했다는 이유로 정상적으로 조회한 게시글 목록까지 Error 화면으로 변경될 수 있음

따라서 다음과 같이 각각의 요청 상태를 독립적으로 관리하는 것이 적절함

```jsx
const [listStatus, setListStatus] = useState("loading");
const [submitStatus, setSubmitStatus] = useState("idle");
```

- `listStatus`: 게시글 목록 GET 요청의 생명주기 관리
- `submitStatus`: 게시글 작성 POST 요청의 생명주기 관리
- 요청별 State를 분리하면 한쪽 요청의 실패가 다른 영역의 정상적인 UI를 방해하지 않음

3. GET과 POST를 각각 어떤 시점에 실행하는 것이 적절한가?

GET Request

- 화면에 필요한 데이터를 외부 시스템과 동기화해야 할 때 `useEffect()`에서 실행 가능
- Component Mount, Dependency 변경, Refetch 등의 상황에서 실행
- 사용자가 버튼을 클릭하는 등의 이벤트에서 직접 실행하는 것도 가능

POST Request

- 사용자가 명시적으로 데이터를 제출하거나 변경하려는 이벤트가 발생했을 때 실행
- 일반적으로 Form의 `onSubmit` 또는 Button의 `onClick`에서 처리
- Component가 Mount되었다는 이유만으로 POST 요청을 자동 실행하는 구조는 피하는 것이 적절함

결론

- GET과 POST의 실행 위치는 HTTP Method만으로 결정되는 것이 아니라, 요청을 발생시켜야 하는 목적과 시점에 따라 설계해야 함

## Summary

### 이번 Review에서 새롭게 이해한 내용

- Fetch와 Axios는 모두 HTTP 요청을 처리할 수 있지만, HTTP 오류 처리 방식과 Response 데이터 접근 방식이 다름
- Fetch는 HTTP 404나 500 응답을 받아도 일반적으로 Promise를 Reject하지 않으므로 `response.ok`를 직접 검사해야 함
- Axios는 기본적으로 2xx 범위 밖의 HTTP 응답을 오류로 처리하며, 서버 응답 데이터는 `response.data`로 접근함
- Axios Interceptor에서는 `return config`, `return response`, `Promise.reject(error)`를 정확하게 처리해야 이후 Promise 흐름이 유지됨
- API 요청 성공과 실제 데이터 유효성을 구분해야 하며, Empty State는 HTTP 요청 성공 이후에 판단해야 함

### 헷갈렸던 개념

- Fetch의 `response.json()`과 Axios의 `response.data` 차이
- Axios Request Config의 `params`와 POST Request Body의 차이
- 요청 취소(Abort)와 오래된 응답 무시(Ignore)의 차이
- HTTP 요청 성공과 실제 영구 저장의 차이

### 앞으로 실습에서 특히 주의할 부분

- GET 요청에서 Dependency 변경 시 이전 요청 Cleanup 처리
- HTTP Status와 응답 데이터 구조를 구분하여 검증
- Loading / Success / Error / Empty State를 명확하게 구분
- POST 요청은 사용자의 이벤트에서 실행하고, 서버 응답을 확인한 뒤 Success 처리
- 제출 중 중복 요청을 방지하고, 실패한 경우 입력값 유지
- 서로 독립적인 API 요청의 State를 하나로 묶지 않도록 주의

## Review 02 핵심 요약

| 구분               | Fetch API                        | Axios                                       |
| ------------------ | -------------------------------- | ------------------------------------------- |
| 별도 설치          | 필요 없음                        | 필요                                        |
| GET 요청           | `fetch(url)`                     | `api.get(url)`                              |
| Query Parameter    | URL 또는 `URLSearchParams`       | `params`                                    |
| JSON 데이터 추출   | `await response.json()`          | `response.data`                             |
| HTTP 404 기본 처리 | Resolve                          | Reject                                      |
| HTTP 상태 검사     | `response.ok`, `response.status` | `response.status`, `error.response?.status` |
| 요청 취소          | `AbortController`                | `AbortController`                           |
| POST 요청          | Method, Headers, Body 설정       | `api.post(url, data)`                       |
| 공통 설정          | 별도 코드 구성                   | Axios Instance                              |
| Interceptor        | 별도 구현 필요                   | 내장 지원                                   |

### 핵심 개념 정리

1. Fetch와 Axios의 HTTP 오류 처리 차이

- Fetch는 HTTP 오류 응답을 받아도 일반적으로 Promise를 정상 이행하므로 `response.ok`를 검사해야 함
- Axios는 기본적으로 HTTP 오류 응답을 Promise Rejection으로 처리하므로 `catch`에서 오류를 처리할 수 있음

2. Axios Interceptor와 Promise 흐름

- Request Interceptor는 다음 요청 처리 단계에 Config를 전달해야 함
- Response Interceptor는 호출부에 Response를 전달해야 함
- 오류를 계속 전파하려면 `Promise.reject(error)` 또는 `throw error`를 사용해야 함
- 반환값을 잘못 처리하면 이후 요청이나 응답 처리 과정에서 예상하지 못한 오류가 발생할 수 있음

3. GET과 POST의 실행 시점 및 State 분리

- GET은 외부 데이터 조회를 위한 요청으로 Effect 또는 사용자 이벤트에서 실행 가능
- POST는 일반적으로 사용자의 명시적인 제출 이벤트에서 실행
- 서로 다른 API 요청의 Loading / Success / Error State는 독립적으로 관리하는 것이 적절함
