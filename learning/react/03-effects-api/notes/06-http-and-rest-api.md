# 06. HTTP & REST API

## 1. HTTP

- HTTP(Hypertext Transfer Protocol)는 Client와 Server가 데이터를 주고받기 위한 Application Layer Protocol
- 일반적으로 Client가 Request를 보내고 Server가 Response를 반환하는 방식
- React와 Spring Boot 사이의 API 통신에도 HTTP 사용
- HTTPS는 TLS를 통해 HTTP 통신을 암호화하는 방식

### Client-Server Architecture

```text
React (Client)
    |
    | HTTP Request
    v
Spring Boot (Server)
    |
    | Database Query
    v
MySQL (Database)
    |
    | Query Result
    v
Spring Boot (Server)
    |
    | HTTP Response
    v
React (Client)
```

- Client는 서버에 데이터 조회 및 변경 요청
- Server는 요청을 처리하고 Response 반환
- React는 응답받은 데이터를 State 등에 반영하여 UI 갱신

## 2. HTTP Request

- Client가 Server에 보내는 요청
- HTTP Method, URL, Header, Body 등으로 구성
- 요청 목적에 따라 사용하는 Method와 Body가 달라짐

### Example

```http
POST /api/users HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json

{
  "name": "JIHUN",
  "role": "backend"
}
```

### Request Components

| 구성   | 역할                       |
| ------ | -------------------------- |
| Method | 요청 작업의 의미 표현      |
| URL    | 요청 대상 Resource 지정    |
| Header | 요청에 관한 부가 정보 전달 |
| Body   | 서버에 전달할 데이터       |

### Headers

- `Content-Type`은 요청 Body의 Media Type을 표시
- `Accept`는 Client가 응답으로 처리 가능한 Media Type을 표시
- `Authorization`은 인증 정보 전달 등에 사용

### Request Body

- 주로 POST, PUT, PATCH에서 데이터 전달에 사용
- JSON, Form Data 등 다양한 형태 사용 가능
- 일반적인 REST API의 GET 요청에서는 Body를 사용하지 않음

## 3. HTTP Response

- Server가 Client의 요청을 처리한 결과
- Status Code, Header, Body 등으로 구성
- 요청 성공 여부와 반환 데이터를 전달

### Example

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/users/1

{
  "id": 1,
  "name": "JIHUN",
  "role": "backend"
}
```

### Response Components

| 구성        | 역할                  |
| ----------- | --------------------- |
| Status Code | 요청 처리 결과 표시   |
| Header      | 응답에 관한 부가 정보 |
| Body        | 응답 데이터           |

- 요청 결과에 따라 Response Body가 없을 수도 있음
- 대표적으로 `204 No Content` 응답은 Body를 포함하지 않음

## 4. HTTP Methods

HTTP Method는 요청이 Resource에 대해 어떤 작업을 수행하는지 나타냄

| Method | 주요 용도                    | 예시                  |
| ------ | ---------------------------- | --------------------- |
| GET    | Resource 조회                | 사용자 목록 조회      |
| POST   | 데이터 제출 및 Resource 생성 | 사용자 등록           |
| PUT    | Resource 전체 교체           | 사용자 정보 전체 교체 |
| PATCH  | Resource 부분 변경           | 사용자 이름 변경      |
| DELETE | Resource 삭제                | 사용자 삭제           |

### GET

```http
GET /api/users
```

- 사용자 목록 조회
- 일반적인 조회 요청에 사용
- 조회 자체가 서버의 Resource 상태를 변경하지 않도록 설계

### POST

```http
POST /api/users
Content-Type: application/json

{
  "name": "JIHUN"
}
```

- 사용자 등록 요청
- 서버가 새로운 사용자 Resource 생성 가능

### PUT

```http
PUT /api/users/1
Content-Type: application/json

{
  "name": "MINJI",
  "role": "frontend"
}
```

- 대상 Resource의 전체 표현을 교체하는 용도
- API 설계에 따라 요청에 필요한 필드와 동작 정의 필요

### PATCH

```http
PATCH /api/users/1
Content-Type: application/json

{
  "name": "YUNA"
}
```

- 기존 Resource의 일부 필드 변경

### DELETE

```http
DELETE /api/users/1
```

- 특정 사용자 Resource 삭제 요청

## 5. Safe and Idempotent Methods

### Safe Method

- 요청의 의도된 의미가 서버 상태 변경이 아닌 Method
- 대표적으로 GET, HEAD 등이 해당
- 서버 로그 기록 등 부수적인 처리가 발생할 수는 있음

### Idempotent Method

- 동일한 요청을 여러 번 수행해도 서버에 미치는 의도된 최종 효과가 같은 성질
- 응답 Status Code까지 항상 동일해야 한다는 의미는 아님

| Method | Safe | Idempotent      |
| ------ | ---- | --------------- |
| GET    | O    | O               |
| POST   | X    | 일반적으로 X    |
| PUT    | X    | O               |
| PATCH  | X    | 반드시 O는 아님 |
| DELETE | X    | O               |

### Example

```text
DELETE /api/users/1

첫 번째 요청
→ 사용자 삭제 성공
→ 204 No Content

두 번째 요청
→ 이미 삭제된 사용자
→ 404 Not Found 가능
```

- 두 번째 요청의 응답 코드가 달라도 삭제된 상태는 유지
- 따라서 DELETE는 Idempotent Method

## 6. HTTP Status Codes

HTTP Response의 처리 결과를 나타내는 숫자 코드

### Status Code Categories

| 범위 | 의미          |
| ---- | ------------- |
| 1xx  | Informational |
| 2xx  | Success       |
| 3xx  | Redirection   |
| 4xx  | Client Error  |
| 5xx  | Server Error  |

### Common Status Codes

| Status                    | 의미                         | 대표 상황                   |
| ------------------------- | ---------------------------- | --------------------------- |
| 200 OK                    | 요청 성공                    | 사용자 조회 성공            |
| 201 Created               | Resource 생성 성공           | 회원 등록 성공              |
| 204 No Content            | 응답 Body 없이 성공          | 삭제 성공                   |
| 400 Bad Request           | 잘못된 요청                  | 요청 형식 또는 값 오류      |
| 401 Unauthorized          | 유효한 인증 정보 필요        | 로그인 필요, 토큰 오류      |
| 403 Forbidden             | 요청 접근 거부               | 접근 권한 부족              |
| 404 Not Found             | 요청 Resource를 찾을 수 없음 | 존재하지 않는 사용자        |
| 409 Conflict              | 현재 Resource 상태와 충돌    | 중복 등록 등                |
| 422 Unprocessable Content | 요청 내용을 처리할 수 없음   | 의미상 유효하지 않은 데이터 |
| 429 Too Many Requests     | 요청 횟수 제한               | Rate Limit 초과             |
| 500 Internal Server Error | 서버 내부 오류               | 처리 중 예외 발생           |
| 502 Bad Gateway           | Gateway가 잘못된 응답 수신   | Upstream 응답 오류          |
| 503 Service Unavailable   | 서비스 이용 불가             | 점검 또는 과부하            |

### Important

- API 요청이 성공했는지는 Response Status Code로 판단
- HTTP 4xx와 5xx는 응답을 수신했지만 요청 처리에 문제가 있는 상황
- 네트워크 연결 실패는 HTTP Error Response 자체를 받지 못할 수도 있음

## 7. Path Parameter vs Query Parameter

### Path Parameter

- URL 경로의 일부로 Resource를 식별
- 특정 사용자나 게시글 조회 등에 사용

```http
GET /api/users/10
```

- `10`은 조회 대상 User ID

### Query Parameter

- URL의 `?` 이후에 전달되는 요청 Parameter
- 검색, 필터링, 정렬, Pagination 등에 사용

```http
GET /api/users?role=backend&page=0&size=10
```

- `role=backend` : Backend 사용자 검색
- `page=0` : 페이지 번호
- `size=10` : 페이지 크기

### Request Body

- 복잡한 데이터를 Server에 전달할 때 사용

```http
POST /api/users
Content-Type: application/json

{
  "name": "JIHUN",
  "role": "backend"
}
```

### Comparison

| 방식            | 주요 사용 목적    |
| --------------- | ----------------- |
| Path Parameter  | Resource 식별     |
| Query Parameter | 검색 및 조회 조건 |
| Request Body    | 요청 데이터 전달  |

## 8. JSON

- JSON(JavaScript Object Notation)은 데이터를 표현하기 위한 Text Format
- React와 Spring Boot 사이의 API 통신에서 자주 사용
- JavaScript Object와 형태가 비슷하지만 서로 다른 개념

### JSON Example

```json
{
  "id": 1,
  "name": "JIHUN",
  "active": true,
  "skills": ["Java", "Spring Boot", "React"]
}
```

### JSON.stringify()

- JavaScript Value를 JSON 문자열로 직렬화

```js
const user = {
  name: "JIHUN",
  role: "backend",
};

const json = JSON.stringify(user);

console.log(json);
```

Result:

```text
{"name":"JIHUN","role":"backend"}
```

### JSON.parse()

- JSON 문자열을 JavaScript Value로 변환

```js
const json = '{"name":"JIHUN","role":"backend"}';

const user = JSON.parse(json);

console.log(user.name); // JIHUN
```

### Important

- JavaScript Object와 JSON 문자열은 동일하지 않음
- JSON에는 함수나 `undefined`를 값으로 표현할 수 없음
- JSON의 Property Name은 큰 따옴표로 작성
- 실제 HTTP 통신에서는 JSON 데이터를 직렬화하거나 파싱하는 과정 필요

## 9. REST API

- REST(Representational State Transfer)는 네트워크 애플리케이션을 위한 Architectural Style
- Resource를 중심으로 URI를 설계하고 HTTP의 표준 의미를 활용하는 방식
- REST의 핵심 제약에는 Stateless, Client-Server, Uniform Interface 등이 포함
- HTTP와 JSON을 사용한다고 해서 모든 API가 엄밀한 REST API가 되는 것은 아님

### Resource-Oriented URL

권장하는 형태:

```http
GET    /api/users
GET    /api/users/1
POST   /api/users
PUT    /api/users/1
PATCH  /api/users/1
DELETE /api/users/1
```

- URI는 Resource 중심으로 설계
- Method는 Resource에 대한 요청 작업을 표현
- 같은 Resource에 다양한 HTTP Method 사용 가능

### Action-Oriented URL

```http
GET  /api/getUsers
POST /api/createUser
POST /api/deleteUser
```

- URL에 동작을 직접 표현한 형태
- 일반적인 Resource 중심 REST API 설계에서는 Method와 Resource를 분리하는 방식 선호
- 모든 Action-Oriented URL이 무조건 잘못된 API라는 의미는 아님

## 10. Stateless

- REST의 핵심 제약 중 하나
- Server가 이전 요청의 대화 상태를 기억해야만 다음 요청을 처리할 수 있는 구조를 피하는 원칙
- 각 Request에는 해당 요청을 이해하고 처리하는 데 필요한 정보가 포함되어야 함

### Example

```http
GET /api/users/1
Authorization: Bearer <access-token>
```

- 요청마다 필요한 인증 정보를 전달하는 방식의 예시
- 실제 인증 정보는 Header나 Cookie 등을 통해 전달 가능
- Stateless가 Database나 모든 Server State를 사용하지 않는다는 의미는 아님

## 11. Asynchronous Communication

- API 요청은 네트워크 통신이므로 응답을 받기까지 시간이 소요됨
- JavaScript에서는 Promise 및 `async/await`를 이용해 비동기 결과 처리 가능
- API 응답을 기다리는 동안 브라우저 전체 실행을 차단하지 않도록 설계

### Async / Await Example

```js
async function loadUsers() {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const users = await response.json();

  return users;
}
```

### Execution

```text
loadUsers() 호출
↓
HTTP GET Request 시작
↓
응답 대기
↓
Response 수신
↓
HTTP Status 확인
↓
JSON Parsing
↓
사용자 데이터 반환
```

### Important

- `fetch()`는 Promise 반환
- `await`는 해당 async 함수의 실행을 일시 중단하고 결과를 기다림
- `response.json()`도 비동기 처리
- Fetch API는 HTTP 404, 500 등의 응답을 받았다는 이유만으로 Promise를 Reject하지 않음
- HTTP 오류를 처리하려면 `response.ok` 또는 `response.status` 확인 필요

## 12. CORS

- CORS(Cross-Origin Resource Sharing)는 브라우저의 Cross-Origin HTTP 요청에 대한 접근 허용을 제어하는 메커니즘
- 브라우저의 Same-Origin Policy와 관련
- React와 Spring Boot의 Origin이 다르면 CORS 설정이 필요할 수 있음

### Example

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:8080
```

- Host가 동일해도 Port가 다르면 서로 다른 Origin
- Origin은 Scheme, Host, Port의 조합으로 구분

### Request Flow

```textReact (Browser)
http://localhost:5173
        |
        | HTTP Request
        | Origin: http://localhost:5173
        v
Spring Boot
http://localhost:8080
        |
        | HTTP Response
        | Access-Control-Allow-Origin: http://localhost:5173
        v
Browser
        |
        | CORS Response Header 확인
        | 접근 허용 여부 판단
        v
React JavaScript에서 응답 사용
```

### Important

- CORS는 주로 Browser에서 적용하는 접근 제어
- 서버 간 HTTP 통신이나 Postman에서는 동일한 브라우저 CORS 제한이 적용되지 않음
- 일부 Cross-Origin 요청에서는 본 요청 전에 Preflight OPTIONS 요청 발생
- 허용 Origin 등의 정보는 Backend에서 적절히 설정해야 함
- 보안 검사를 피하려고 무조건 모든 Origin을 허용하는 방식은 지양

## 13. React and Spring Boot Integration

### Spring Boot Controller

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUser(
            @PathVariable Long id
    ) {
        if (id != 1L) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
            Map.of(
                "id", id,
                "name", "JIHUN",
                "role", "backend"
            )
        );
    }
}
```

- `@RestController`는 HTTP Response Body에 데이터를 반환하는 Controller
- `@GetMapping("/{id}")`는 HTTP GET 요청 Mapping
- `@PathVariable`은 URL Path Parameter를 Java Parameter로 전달
- `ResponseEntity`를 통해 Status Code와 Response Body 지정

### Request

```http
GET /api/users/1
```

### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "JIHUN",
  "role": "backend"
}
```

### React Request

```jsx
async function getUser() {
  const response = await fetch("http://localhost:8080/api/users/1");

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const user = await response.json();

  console.log(user);
}
```

- React에서 Fetch API를 이용해 요청
- Spring Boot에서 JSON 응답 반환
- React에서 응답 JSON을 JavaScript Object로 변환
- 실제 브라우저 통신에서는 Spring Boot의 CORS 설정 등이 필요할 수 있음

## 14. Common Mistakes

### HTTP Status Code 무시

```js
const response = await fetch("/api/users");
const users = await response.json();
```

- 요청 실패 여부를 확인하지 않음
- 서버가 오류 응답을 반환해도 정상 데이터로 처리하려 할 수 있음

### Recommended

```js
const response = await fetch("/api/users");

if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`);
}

const users = await response.json();
```

### JSON Body 직렬화 누락

```js
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: { name: "JIHUN" },
});
```

- 일반적인 JSON Request Body로 JavaScript Object를 그대로 전달할 수 없음

### Recommended

```js
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "JIHUN",
  }),
});
```

## Summary

- HTTP는 Client와 Server 간 Request 및 Response를 주고받는 Protocol
- HTTP Request는 Method, URL, Header, Body 등으로 구성
- HTTP Response는 Status Code, Header, Body 등으로 구성
- GET, POST, PUT, PATCH, DELETE는 서로 다른 의미를 가진 HTTP Method
- Safe와 Idempotent는 서로 다른 개념
- Path Parameter는 Resource 식별, Query Parameter는 검색 및 조회 조건에 주로 사용
- JSON은 API 통신에 자주 사용하는 데이터 형식
- REST는 Resource 중심 설계 및 제약 조건을 포함하는 Architectural Style
- Stateless는 각 요청을 독립적으로 이해하고 처리할 수 있도록 하는 원칙
- API 통신에는 비동기 처리와 HTTP 오류 확인이 필요
- CORS는 Browser의 Cross-Origin 접근 제어와 관련
- React와 Spring Boot는 HTTP 및 JSON을 통해 통신 가능
