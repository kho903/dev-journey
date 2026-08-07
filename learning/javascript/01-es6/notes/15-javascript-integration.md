# 15. JavaScript Integration

## 1. JavaScript 기능을 통합하는 이유

실제 애플리케이션에서는 하나의 JavaScript 문법이나 기능만 단독으로 사용하지 않음

함수, 배열 메서드, 객체 구조 분해 할당, Spread Syntax, Promise, Async/Await 등을 하나의 실행 흐름 안에서 함께 사용

단순히 문법을 아는 것뿐 아니라 입력부터 출력까지 데이터가 어떤 순서로 이동하는지 이해하는 것이 중요함

일반적인 애플리케이션 데이터 흐름

```text
데이터 입력
-> 입력값 검증
-> 데이터 정규화
-> 데이터 변환
-> 비동기 요청
-> 응답 데이터 가공
-> 결과 출력
```

여러 기능을 통합할 때 고려한 사항

- 입력 데이터가 올바를 형식인지 확인
- 데이터 형식을 일관되게 정리
- 필요한 데이터만 선택하고 변환
- 함수별로 책임 분리
- 비동기 작업의 의존 관계 확인
- Error가 발생하고 처리되는 위치 구분
- 서버 응답을 애플리케이션에 필요한 형태로 가곡

## 2. 입력 데이터 검증

입력 데이터 검증은 함수가 데이터를 사용하기 전에 값이 올바른지 확인하는 과정

검증 없이 데이터를 사용하면 예상하지 못한 TypeError나 잘못된 결과가 발생할 수 있음

검증항목

- 값의 존재 여부
- 자료형 확인
- 문자열 공백 확인
- 숫자 범위 확인
- 배열 여부 확인
- 필수 속성 확인
- 허용된 값인지 확인

### 객체 검증

```js
function validateUser(user) {
  if (!user || typeof user !== "object") {
    throw new Error("Invalid user");
  }

  if (typeof user.name !== "string" || user.name.trim() === "") {
    throw new Error("Invalid user name");
  }

  if (typeof user.age !== "number" || user.age < 0) {
    throw new Error("Invalid user age");
  }

  return true;
}
```

`typeof null`의 결과는 `"object"`이므로 객체 검증 시 `null` 여부도 함께 확인 필요

```js
typeof null; // "object"
```

따라서 다음 조건 사용

```js
if (!user || typeof user !== "object") {
  throw new Error("Invalid user");
}
```

### 배열 검증

```js
function validateUsers(users) {
  if (!Array.isArray(users)) {
    throw new Error("Users must be an array");
  }

  if (users.length === 0) {
    throw new Error("Users cannot be empty");
  }

  return true;
}
```

배열 여부는 `typeof`가 아니라 `Array.isArray()` 사용

```js
typeof []; // "object"

Array.isArray([]); // true
```

### `false` 반환 방식

```js
function isValidUser(user) {
  if (!user || typeof user !== "object") {
    return false;
  }

  if (typeof user.name !== "string" || user.name.trim() === "") {
    return false;
  }

  return true;
}
```

특징

- 검증 결과만 필요할 때 사용
- 조건문에서 쉽게 사용 가능
- 실패 원인을 자세히 전달하기 어려움

사용예시

```js
if (!isValidUser(user)) {
  console.log("Invalid user");
}
```

### Error 발생 방식

```js
function validateUser(user) {
  if (!user || typeof user !== "object") {
    throw new Error("Invalid user");
  }

  if (typeof user.name !== "string" || user.name.trim() === "") {
    throw new Error("Invalid user name");
  }
}
```

특징

- 검증 실패 원인을 Error 메시지로 전달 간으
- 이후 작업을 즉시 중단 가능
- 상위 함수의 `try-catch`에서 처리 가능

판단 기준

```text
단순한 참과 거짓 확인
-> true 또는 false 반환

실패 이후 작업을 중단하고 원인을 전달
-> Error 발생
```

## 3. 데이터 정규화

데이터 정규화는 입력 형식이 서로 다른 데이터를 일정한 형식으로 맞추는 작업

사용자가 입력한 문자열에는 불필요한 공백이나 대소문자 차이가 포함될 수 있음

정규화를 먼저 수행하면 이후 데이터 비교와 처리가 단순해짐

```js
function normalizeUser(user) {
  return {
    ...user,
    name: user.name.trim().toUpperCase(),
    email: user.email.trim().toLowerCase(),
  };
}
```

입력 데이터

```js
const user = {
  id: 1,
  name: "  jihun  ",
  email: "  JIHUN@EXAMPLE.COM  ",
};
```

정규화 결과

```js
{
  id: 1,
  name: "JIHUN",
  email: "jihun@example.com",
}
```

주요 정규화 작업

- `trim()`을 사용한 문자열 앞뒤 공백 제거
- `toUpperCase()`와 `toLowerCase()`를 사용한 대소문자 통일
- `??`를 사용한 기본값 설정
- 문자열과 숫자 형식 통일
- 선택 속성에 기본값 추가

### 기본값 설정

```js
function normalizeUser(user) {
  return {
    ...user,
    role: user.role ?? "user",
    active: user.active ?? true,
  };
}
```

`??`는 왼쪽 값이 `null` 또는 `undefined`일 때만 오른쪽 값 사용

```js
null ?? "default"; // "default"
undefined ?? "default"; // "default"
false ?? true; // false
0 ?? 100; // 0
```

### 원본 객체를 직접 수정하지 않는 이유

좋지 않은 예시

```js
function normalizeUser(user) {
  user.name = user.name.trim().toUpperCase();

  return user;
}
```

위 코드는 Parameter로 전달받은 원본 객체를 직접 변경함

원본 객체를 다른 코드에서도 사용하고 있다면 예상하지 못한 영향 발생 가능

새 객체를 반환하는 방식

```js
function normalizeUser(user) {
  return {
    ...user,
    name: user.name.trim().toUpperCase(),
  };
}
```

Spread Syntax를 사용해 기존 속성을 복사하고 필요한 속성만 새로운 값으로 덮어씀

## 4. 데이터 변환

데이터 변환은 원본 데이터를 애플리케이션에서 필요한 형태로 바꾸는 과정

배열 데이터를 처리할 떄 배열 메서드를 조합해 하나의 흐름 구성 가능

```js
const activeUserNames = users
  .filter((user) => user.active)
  .map((user) => user.name.trim())
  .map((name) => name.toUpperCase());
```

실행 흐름

```text
전체 사용자 배열
-> 활성 사용자만 선택
-> 이름 문자열 추출
-> 공백 제거
-> 대문자로 변환
```

### `filter()`

조건을 만족하는 요소만 선택해 새로운 배열 반환

```js
const activeUsers = users.filter((user) => user.active);
```

원본 배열의 길이보다 결과 배열의 길이가 작거나 같음

### `map()`

각 요소를 새로운 값으로 변환해 새로운 배열 반환

```js
const userNames = users.map((user) => user.name);
```

원본 배열과 결과 배열의 길이가 동일함

### `find()`

조건을 처음 만족하는 요소 하나 반환

```js
const user = users.find((user) => user.id === 1);
```

찾지 못하면 `undefined` 반환

### `some()`

조건을 만족하는 요소가 하나라도 있는지 확인

```js
const hasAdmin = users.some((user) => user.role === "admin");
```

Boolean 값 반환

### `every()`

모든 요소가 조건을 만족하는지 확인

```js
const areAllActive = users.every((user) => user.active);
```

Boolean 값 반환

### `reduce()`

배열의 여러 값을 하나의 결과로 누적

```js
const totalPrice = products.reduce((total, product) => {
  return total + product.price;
}, 0);
```

첫 번째 Parameter는 누적값

두 번째 Parameter는 현재 요소

마지막 `0`은 누적값의 초깃값

객체 형태로 누적 가능

```js
const roleCount = users.reduce(
    (const, user) => {
        const role = user.role;
        count[role] = (count[role] ?? 0) + 1;
        return count;
    },
    {},
)
```

예상 결과

```js
{
    backend: 2,
    frontend: 1,
    admin: 1,
}
```

## 5. 함수별 책임 분리

하나의 함수가 너무 많은 작업을 담당하면 코드 이해와 수정이 어려워짐

좋지 않은 구조

```js
async function processUsers(users) {
  // 입력값 검증
  // 데이터 정규화
  // 서버 요청
  // 응답 데이터 변환
  // 결과 출력
  // Error 처리
}
```

하나의 함수가 여러 책임을 담당하는 상태

책임을 나눈 구조

```js
function validateUsers(users) {}

function normalizeUsers(users) {}

async function fetchUserDetails(users) {}

function createUserSummary(users) {}

async function main() {}
```

각 함수의 역할

```text
validateUsers()
→ 입력 데이터 검증

normalizeUsers()
→ 사용자 데이터 형식 통일

fetchUserDetails()
→ 비동기 데이터 요청

createUserSummary()
→ 결과 데이터 가공

main()
→ 전체 실행 순서와 Error 처리
```

함수 분리의 장점

- 각 함수의 역할을 쉽게 이해 가능
- 작은 단위로 테스트 가능
- 다른 코드에서 재사용 가능
- 문제 발생 위치 확인이 쉬움
- 함수 이름만으로 작업 목적 예측 가능
- 변경 사항의 영향 범위 감소

상위 함수와 하위 함수의 역할

```text
상위 함수
-> 전체 실행 순서 관리
-> 여러 하위 함수 조합
-> 최종 Error 처리
-> 결과 출력

하위 함수
-> 구체적인 한 가지 작업 처리
-> 검증 실패 또는 요청 실패 시 Error 전달
-> 처리 결과 반환
```

## 6. 동기 데이터 처리 흐름

동기 데이터 처리는 현재 입력값을 즉시 검증하고 변환할 수 있는 작업에 사용

```js
function processUsers(users) {
  const validUsers = users.filter((user) => user.active);

  const normalizedUsers = validUsers.map((user) => ({
    ...user,
    name: user.name.trim().toUpperCase(),
  }));

  return normalizedUsers;
}
```

실행 흐름

```text
입력 배열
-> 활성 사용자 선택
-> 사용자 데이터 정규화
-> 새로운 배열 반환
```

함수를 더 작게 분리 가능

```js
function getActiveUsers(users) {
  return users.filter((user) => user.active);
}

function normalizeUsers(users) {
  return users.map((user) => ({
    ...user,
    name: user.name.trim().toUpperCase(),
  }));
}

function processUsers(users) {
  const activeUsers = getActiveUsers(users);
  const normalizedUsers = normalizeUsers(activeUsers);

  return normalizedUsers;
}
```

동기 작업에서는 앞의 함수가 반환한 결과를 바로 다음 함수에 전달 가능

```js
const result = normalizeUsers(getActiveUsers(users));
```

다만 함수 호출이 너무 중첩되면 읽기 어려울 수 있으므로 중간 변수 사용도 좋은 방법

## 7. 비동기 데이터 처리 흐름

서버 요청이나 Timer처럼 완료까지 시간이 필요한 작업은 Promise 기반 비동기 처리 사용

```js
async function loadUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`User request failed: ${response.status}`);
  }

  const users = await response.json();

  return users;
}
```

실행 흐름

```text
비동기 요청 시작
-> HTTP 응답 대기
-> 응답 상태 확인
-> Response Body 변환 대기
-> 사용자 배열 반환
```

`fetch()`는 Promise 반환

```js
const responsePromise = fetch(url);
```

`await`를 사용하면 Promise의 완료 결과를 받을 수 있음

```js
const response = await fetch(url);
```

`response.json()`도 Promise를 반환하므로 `await` 필요

```js
const users = await response.json();
```

비동기 함수에서도 검증과 변환 함수를 함께 사용 가능

```js
async function loadAndProcessUsers() {
  const users = await loadUsers();

  validateUsers(users);

  const normalizedUsers = normalizeUsers(users);

  return normalizedUsers;
}
```

## 8. 순차 처리와 병행 처리 선택

비동기 작업을 작성할 때 작업 사이의 의존 관계 확인 필요

### 순차 처리

다음 작업이 이전 작업의 결과를 필요로 할 때 사용

```js
const user = await fetchUser(1);
const posts = await fetchUserPosts(user.id);
```

실행 흐름

```text
사용자 요청 시작
-> 사용자 요청 완료
-> user.id 확인
-> 게시글 요청 시작
-> 게시글 요청 완료
```

게시글 요청에 `user.id`가 필요하므로 사용자 요청이 완료되기 전에 게시글 요청 시작 불가

전체 시간은 두 작업의 실행 시간 합에 가까움

```text
사용자 요청 800ms
게시글 요청 500ms
전체 약 1300ms
```

### 병행 처리

작업들이 서로의 결과를 필요로 하지 않을 때 사용

```js
const userPromise = fetchUser(1);
const postsPromise = fetchUserPosts(1);

const [user, posts] = await Promise.all([userPromise, postsPromise]);
```

실행 흐름

```text
사용자 요청 시작
게시글 요청 시작
-> 두 요청 병행 실행
-> 두 요청이 모두 완료될 때까지 대기
```

전체 시간은 가장 오래 걸리는 작업 기준

```text
사용자 요청 800ms
게시글 요청 500ms
전체 약 800ms
```

판단 기준

```text
두 번째 작업이 첫 번째 작업의 결과를 필요로 함
-> 순차 처리

각 작업이 이미 필요한 입력값을 가지고 있음
-> 병행 처리
```

병행 처리가 가능하더라도 서버 부하, 요청 제한, 작업 순서 등의 조건 확인 필요

## 9. Error 발생과 전달

하위 함수에서 작업 실패를 발견하면 Error 발생 가능

```js
async function fetchUser(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  if (!response.ok) {
    throw new Error(`User request failed: ${response.status}`);
  }

  return response.json();
}
```

하위 함수에서 발생한 Error는 호출한 상위 함수로 전달됨

```js
async function main() {
  try {
    const user = await fetchUser(1);

    console.log(user);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("Request completed");
  }
}
```

실행 흐름

```text
fetchUser() 호출
-> HTTP 요청 실패
-> throw new Error()
-> Rejected Promise 반환
-> await 위치에서 Error 발생
-> main()의 catch 실행
-> finally 실행
```

### 모든 함수에서 Error를 처리할 필요가 없는 이유

하위 함수가 Error를 처리할 방법이 없다면 Error를 상위 함수로 전달하는 편이 좋음

좋지 않은 예시

```js
async function fetchUser(id) {
  try {
    const response = await fetch(`/users/${id}`);

    return response.json();
  } catch (error) {
    console.log(error.message);
  }
}
```

Error를 출력한 뒤 `undefined`가 반환될 수 있어 상위 함수가 실패 여부를 알기 어려움

Error를 전달하는 예시

```js
async function fetchUser(id) {
  const response = await fetch(`/users/${id}`);

  if (!response.ok) {
    throw new Error("User request failed");
  }

  return response.json();
}
```

상위 함수에서 처리

```js
async function main() {
  try {
    const user = await fetchUser(1);

    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
}
```

### `api.js`

Fetch API와 서버 요청 관리

```js
async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`User request failed: ${response.status}`);
  }

  return response.json();
}
```

### `validataion.js`

입력값과 응답 데이터 검증

```js
function validateUsers(users) {
  if (!Array.isArray(users)) {
    throw new Error("Invalid users");
  }
}
```

### `transformation.js`

데이터 정규화와 변환

```js
function createUserProfiles(users) {
  return users.map((user) => ({
    id: user.id,
    name: user.name.trim(),
    email: user.email.toLowerCase(),
  }));
}
```

### `constants.js`

URL과 고정값 관리

```js
const API_URL = "https://jsonplaceholder.typicode.com";
```

현재 학습 단계에서는 하나의 `app.js`에 모든 함수를 작성하더라도 함수별 책임을 명확하게 분리하는 것이 핵심

## 12. 전체 데이터 흐름 예시

```js
function validateUsers(users) {
  if (!Array.isArray(users)) {
    throw new Error("Users must be an array");
  }

  if (users.length === 0) {
    throw new Error("Users cannot be empty");
  }
}

function normalizeUsers(users) {
  return users.map((user) => ({
    id: user.id,
    name: user.name.trim().toUpperCase(),
    email: user.email.trim().toLowerCase(),
  }));
}

function createSummary(users) {
  return {
    userCount: users.length,
    userNames: users.map((user) => user.name),
  };
}

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`User request failed: ${response.status}`);
  }

  return response.json();
}

async function main() {
  try {
    const users = await fetchUsers();

    validateUsers(users);

    const normalizedUsers = normalizeUsers(users);

    const summary = createSummary(normalizedUsers);

    console.log(summary);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("User processing completed");
  }
}

main();
```

전체 실행 흐름

```text
main() 실행
-> fetchUsers() 호출
-> 사용자 데이터 요청
-> HTTP 상태 확인
-> Response Body를 JSON으로 변환
-> 사용자 배열 반환
-> validateUsers()로 응답 검증
-> normalizeUsers()로 데이터 정규화
-> createSummary()로 요약 객체 생성
-> 결과 출력
-> finally에서 완료 메시지 출력
```

함수별 책임

```text
fetchUsers()
-> 서버 요청 담당

validateUsers()
-> 응답 데이터 검증 담당

normalizeUsers()
→ 사용자 데이터 형식 통일 담당

createSummary()
→ 최종 결과 생성 담당

main()
→ 전체 작업 순서와 Error 처리 담당
```

## 13. 핵심 정리

- 실제 애플리케이션에서는 여러 JavaScript 기능을 하나의 흐름으로 조합
- 입력 데이터는 사용 전에 자료형과 필수값 검증 필요
- 검증 결과만 필요하면 Boolean 반환 가능
- 작업을 중단하고 실패 원인을 전달하려면 Error 발생
- 정규화는 데이터 형식을 일관되게 만드는 과정
- 원본 객체를 직접 수정하지 않고 새로운 객체를 반환하는 방식 권장
- `filter()`, `map()`, `reduce()` 등을 조합해 데이터 가공 가능
- 하나의 함수는 하나의 주요 책임 담당
- 상위 함수는 전체 실행 흐름과 Error 처리 담당
- 하위 함수는 구체적인 작업을 처리하고 결과 또는 Error 전달
- 이전 작업의 결과가 필요하면 순차 처리
- 서로 독립적인 비동기 작업은 `Promise.all()`을 사용해 병행 처리 가능
- `fetch()`와 `response.json()`은 Promise 반환
- HTTP 오류 처리를 위해 `response.ok` 확인 필요
- 서버 응답은 애플리케이션에서 필요한 형태로 변환해 사용
- `return new Error()`는 정상 반환이고 `throw new Error()`는 예외 발생
- 데이터 입력부터 출력까지 전체 흐름을 설계하는 능력이 중요
