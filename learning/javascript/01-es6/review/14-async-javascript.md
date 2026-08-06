# 14. Async JavaScript Review

## 1. 동기와 비동기

### 동기와 비동기 처리의 차이

동기 처리는 이전 작업이 끝날 때까지 기다린 후 다음 작업을 실행하는 방식

비동기 처리는 시간이 오래 걸리는 작업의 완료를 기다리는 동안 다른 코드를 먼저 실행할 수 있는 방식

JavaScript는 기본적으로 하나의 Call Stack에서 코드를 실행하므로 오래 걸리는 작업을 동기적으로 처리하면 이후 코드와 화면 처리가 모두 멈출 수 있음

네트워크 요청, Timer, 파일 처리와 같이 완료 시점을 바로 알 수 없는 작업에서 비동기 처리 필요

### JavaScript에서 비동기 처리가 필요한 이유

서버 요청이나 Timer 작업이 끝날 때까지 Call Stack을 점유하지 않기 위함

비동기 작업을 실행 환경에 맡긴 뒤 JavaScript는 다음 코드를 계속 실행할 수 있음

작업이 완료되면 Callback이 Queue에 등록되고 Event Loop를 통해 다시 실행됨

이를 통해 사용자 입력, 화면 렌더링, 다른 JavaScript 코드가 불필요하게 차단되는 현상 방지

### `setTimeout()`이 호출 스택에서 바로 실행되지 않는 이유

`setTimeout()`은 Callback을 즉시 실행하는 함수가 아니라 일정 시간이 지난 후 실행하도록 등록하는 함수

Timer 처리는 브라우저의 Web API 또는 Node.js의 Timer 기능에서 담당

지정 시간이 지나면 Callback이 Task Queue에 등록됨

현재 Call Stack의 동기 코드와 Microtask가 모두 끝난 후 Event Loop에 의해 실행됨

따라서 Delay가 `0ms`여도 즉시 실행되지 않음

## 2. Promise

### Promise의 세 가지 상태

- `Pending` : 비동기 작업이 아직 완료되지 않은 상태
- `Fulfilled` : 비동기 작업이 성공한 상태
- `Rejected` : 비동기 작업이 실패한 상태

Promise는 `Pending` 상태에서 `Fulfilled` 또는 `Rejected` 상태로 한 번만 변경 가능

상태가 결정된 이후에는 다른 상태로 변경되지 않음

### `resolve()`와 `reject()`의 역할

`resolve(value)`는 Promise를 성공 상태로 변경하고 성공 결과를 전달하는 역할

전달된 값은 `then()`이나 `await`를 통해 받을 수 있음

`reject(error)`는 Promise를 실패 상태로 변경하고 실패 이유를 전달하는 역할

전달된 Error는 `catch()` 또는 `try-catch`를 통해 처리 가능

### 여러 번 호출될 경우의 결과

한 Promise에서 `resolve()`와 `reject()`가 여러 번 호출되어도 최초 호출만 적용됨

```js
new Promise((resolve, reject) => {
  resolve("Success");
  reject(new Error("Failed"));
  resolve("Another result");
});
```

위 Promise는 첫 번째 `resolve()`에 의해 Fulfilled 상태로 결정됨

이후의 `reject()`와 `resolve()`는 Promise 상태에 영향을 주지 않음

다만 `resolve()`나 `reject()` 이후의 일반 코드는 계속 실행될 수 있으므로 `return` 또는 `if-else`를 사용해 불필요한 실행을 막는 것이 좋음

### Promise Executor의 실행 시점

Promise Constructor에 전달하는 함수를 Executor라고 부름

```js
new Promise((resolve, reject) => {
  console.log("Executor");
});
```

Promise 객체가 생성되는 순간 Executor는 동기적으로 즉시 실행됨

Executor 내부에 작성된 `setTimeout()`의 Callback이나 비동기 작업만 나중에 실행됨

## 3. Promise Chaining

### `then()`에서 다음 Promise를 반환해야 하는 이유

- `then()`에서 Promise를 반환하면 다음 `then()`은 해당 Promise가 완료될 때까지 기다림

```js
getUser()
  .then((user) => {
    return getUserPosts(user);
  })
  .then((posts) => {
    console.log(posts);
  });
```

`getUserPosts()`를 반환하지 않으면 다음 `then()`은 게시글 조회 완료를 기다리지 않음

Promise Chain에서 작업 순서를 연결하려면 다음 Promise를 반드시 반환해야 함

### 일반 값을 반환했을 때 전달되는 방식

`then()`에서 일반 값을 반환하면 JavaScript가 해당 값을 성공한 Promise처럼 처리함

```js
Promise.resolve(10)
  .then((number) => {
    return number * 2;
  })
  .then((result) => {
    console.log(result);
  });
```

첫 번째 `then()`에서 반환한 `20`이 다음 `then()`의 Parameter로 전달됨

개념적으로 다음과 유사한 처리

```js
return Promise.resolve(20);
```

### Error가 `catch()`까지 전달되는 과정

Promise Chain의 중간에서 Error가 발생하면 이후의 성공용 `then()`을 건너뛰고 가장 가까운 `catch()`로 전달됨

```js
getUser()
  .then((user) => {
    throw new Error("Failed");
  })
  .then(() => {
    console.log("실행되지 않음");
  })
  .catch((error) => {
    console.log(error.message);
  });
```

Rejected Promise를 반환한 경우에도 동일하게 `catch()`까지 전달됨

### `finally()`에 `console.log()` 실행 결과를 전달하면 안 되는 이유

잘못된 코드

```js
promise.finally(console.log("Completed"));
```

위 코드는 `finally()`가 실행될 때 출력하는 것이 아니라 Promise Chain을 만드는 순간 `console.log()`를 실행함

`console.log()`의 반환값은 `undefined`이므로 실제로는 다음과 비슷한 코드가 됨

```js
promise.finally(undefined);
```

`finally()`에는 나중에 실행할 Callback Function을 전달해야 함

```js
promise.finally(() => {
  console.log("Completed");
});
```

## 4. Async/Await

### `async` 함수가 항상 반환하는 값

`async` 함수는 항상 Promise를 반환함

일반 값을 반환하면 해당 값을 가진 Fulfilled Promise가 됨

```js
async function getNumber() {
  return 10;
}
```

개념적으로 다음과 유사함

```js
function getNumber() {
  return Promise.resolve(10);
}
```

`async` 함수 내부에서 Error가 발생하면 Rejected Promise가 반환됨

### `await`의 역할

`await`는 Promise가 완료될 때까지 해당 `async` 함수의 이후 실행을 잠시 중단함

JavaScript 전체 실행이나 Thread를 멈추는 것은 아님

기다리는 동안 Call Stack을 비우고 다른 동기 코드와 비동기 Callback을 실행할 수 있음

Promise가 성공하면 성공값을 반환하고 실패하면 Error를 발생시킴

### `await` 이후 코드가 Microtask로 처리되는 이유

`await`는 Promise의 완료 결과를 기반으로 이후 코드를 다시 실행함

Promise가 완료되면 `await` 아래의 코드는 Microtask Queue에 등록됨

현재 실행 중인 동기 코드가 모두 끝난 후 Task보다 먼저 실행됨

```js
async function run() {
  console.log("Start");
  await Promise.resolve();
  console.log("End");
}
```

`End`는 동기적으로 바로 실행되지 않고 Microtask로 실행됨

### Rejected Promise 처리 방법

`async/await`에서는 `try-catch`를 사용해 Rejected Promise 처리 가능

```js
async function loadData() {
  try {
    const data = await getData();

    console.log(data);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("Completed");
  }
}
```

`await` 중인 Promise가 Rejected 상태가 되면 Error가 발생하고 실행 흐름이 `catch`로 이동함

## 5. 순차 처리와 병행 처리

### 순차 처리

```js
const user = await getUser();
const posts = await getPosts();
```

실행 순서

```text
getUser() 시작
-> 사용자 조회 완료 대기
-> getPosts() 시작
-> 게시글 조회 완료 대기
```

사용자 조회가 800ms이고 게시글 조회가 500ms라면 전체 시간은 약 1300ms

두 번째 작업이 첫 번째 작업의 결과를 필요로 할 때 순차 처리 필요

```js
const user = await getUser();
const posts = await getUserPosts(user.id);
```

게시글 조회에 `user.id`가 필요하므로 동시에 시작할 수 없음

### 병행 처리

```js
const userPromise = getUser();
const postsPromise = getPosts();

const [user, posts] = await Promise.all([userPromise, postsPromise]);
```

실행 순서

```text
getUser() 시작
getPosts() 시작
-> 두 작업이 동시에 진행
-> 모든 작업 완료 대기
```

사용자 조회가 800ms이고 게시글 조회가 500ms라면 전체 시간은 가장 오래 걸리는 작업을 기준으로 약 800ms

두 작업이 서로의 결과를 필요로 하지 않을 때 병행 처리 가능

### 판단 기준

다음 작업이 이전 작업의 결과를 사용한다면 순차 처리

서로 독립적으로 실행할 수 있다면 병행 처리

병행 처리가 가능한 작업을 불필요하게 순차 처리하면 전체 응답 시간이 길어질 수 있음

## 6. Promise.all()

### 반환값

`Promise.all()`은 여러 Promise를 하나의 Promise로 묶어 반환함

모든 Promise가 성공하면 각 성공 결과를 담은 배열로 Fulfilled 됨

```js
const result = await Promise.all([Promise.resolve("A"), Promise.resolve("B")]);

console.log(result);
```

출력

```text
[ 'A', 'B' ]
```

### 결과 배열의 순서

결과 배열의 순서는 작업이 완료된 순서가 아니라 `Promise.all()`에 전달한 배열의 순서를 따름

```js
const [emailMessage, auditMessage] = await Promise.all([
  sendEmail(),
  writeAuditLog(),
]);
```

감사 로그가 먼저 완료되어도 결과 배열에서는 이메일 결과가 첫 번째 위치에 들어감

### 하나의 Promise가 실패한 경우

전달된 Promise 중 하나라도 Rejected 상태가 되면 `Promise.all()`도 즉시 Rejected 상태가 됨

성공한 결과 배열은 반환되지 않고 실패 이유가 `catch()`로 전달됨

### 다른 작업의 취소 여부

`Promise.all()`이 Rejected 상태가 되어도 이미 시작된 다른 Promise 작업이 자동으로 취소되지는 않음

다른 네트워크 요청이나 Timer는 계속 실행될 수 있음

작업 취소가 필요하면 `AbortController`처럼 별도의 취소 기능 필요

## 7. Fetch API

### `fetch()`가 반환하는 값

`fetch()`는 `Response` 객체를 결과로 갖는 Promise를 반환함

```js
const response = await fetch(url);
```

`response`에는 HTTP 상태 코드, Header, Body와 같은 응답 정보가 포함됨

### HTTP 404와 500에서 자동으로 Reject되지 않는 이유

`fetch()`는 서버와 HTTP 통신에 성공해 응답을 받으면 Promise를 Fulfilled 상태로 처리함

404나 500도 서버로부터 정상적인 HTTP 응답을 받은 상황으로 판단함

주로 네트워크 연결 실패, DNS 오류, 요청 중단과 같은 상황에서 Rejected 상태가 됨

### `response.ok` 확인이 필요한 이유

`response.ok`는 HTTP 상태 코드가 일반적으로 200부터 299 사이인지 나타냄

```js
if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
```

이를 확인하지 않으면 404나 500 응답도 성공 흐름에서 처리될 수 있음

### `response.json()`에 `await`가 필요한 이유

`response.json()`은 Response Body를 읽고 JSON으로 변환하는 비동기 작업이므로 Promise를 반환함

```js
const data = await response.json();
```

`await`를 사용하지 않으면 data에는 변환된 JavaScript 객체가 아니라 Promise가 저장됨

`async` 함수에서 `return response.json()`처럼 Promise 자체를 반환하는 방식도 가능하지만 변수에 실제 JSON 데이터를 저장하려면 `await` 필요

### POST 요청에서 `JSON.stringify()`가 필요한 이유

일반 JavaScript 객체를 JSON 형식의 Request Body로 전송하려면 JSON 문자열로 직렬화해야 하므로 JSON 문자열로 변환할 필요가 있음

```js
body: JSON.stringify({
  title: "JavaScript",
  userId: 1,
}),
```

서버에는 문자열 형태의 JSON 데이터가 전달됨

`Content-Type: application/json` Header를 함께 설정해 Body가 JSON 형식임을 서버에 전달함

## 8. Event Loop 실행 순서 예측

코드

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

async function run() {
  console.log("D");

  await Promise.resolve();

  console.log("E");
}

run();

console.log("F");
```

```text
A
D
F
C
E
B
```

### 실행 과정

- `console.log("A")`는 동기 코드이므로 즉시 실행됨
- `setTimeout()`의 Callback은 Timer 처리가 끝난 후 Task Queue에 등록됨
- `Promise.resolve().then()`의 Callback은 Microtask Queue에 등록됨
- `run()`을 호출하면 `async` 함수도 호출 시점부터 `await` 전까지 동기적으로 실행되므로 `D` 출력
- `await Promise.resolve()` 이후의 `console.log("E")`는 Microtask Queue에 등록됨
- `console.log("F")`는 동기 코드이므로 즉시 실행됨
- 동기 코드 완료 후 Microtask Queue 처리 시작
- Microtask는 등록 순서에 따라 `C`, `E` 순서로 실행됨
- Microtask Queue가 모두 비워진 후 Task Queue의 Timer Callback이 실행되어 `B` 출력

전체 흐름

```text
동기 코드: A → D → F
Microtask Queue: C → E
Task Queue: B
```

## 9. Error 처리

### `return new Error()`

```js
return new Error("Failed");
```

Error 객체를 일반적인 반환값으로 전달하는 코드

Error가 실제로 발생한 것이 아니므로 `catch()`가 실행되지 않음

동기 함수에서는 호출한 곳에 Error 객체가 정상 반환됨

```js
function run() {
  return new Error("Failed");
}

const result = run();

console.log(result.message);
```

`async` 함수에서는 Error 객체를 성공값으로 가진 Fulfilled Promise가 반환됨

```js
async function run() {
  return new Error("Failed");
}
```

개념적으로 다음과 유사함

```js
return Promise.resolve(new Error("Failed"));
```

### `throw new Error()`

```js
throw new Error("Failed");
```

실제 예외를 발생시키는 코드

동기 코드에서는 가장 가까운 `try-catch`로 실행 흐름 이동

`async` 함수에서는 Rejected Promise가 반환됨

```js
async function run() {
  throw new Error("Failed");
}
```

개념적으로 다음과 유사함

```js
return Promise.reject(new Error("Failed"));
```

따라서 비동기 함수의 실패를 `catch()`에서 처리하려면 Error 객체를 반환하는 것이 아니라 `throw` 사용 필요

## 10. 회고

- 가장 이해하기 어려웠던 개념은 Promise의 실행 시점과 Event Loop에서 Microtask와 Task의 실행 순서를 구분하는 부분
- 처음에는 `setTimeout()`의 Delay가 `0ms`이면 즉시 실행될 것으로 생각했지만 동기 코드와 Microtask가 모두 끝난 후 실행된다는 점을 학습
- `finally(console.log("Completed"))`처럼 함수가 아닌 실행 결과를 전달해 출력이 즉시 발생하는 실수가 있었음
- Promise 내부에서 `reject()`를 호출한 후 `return`하지 않아 이후의 `resolve()` 코드까지 실행되는 실수도 있었음
- `saveOrder()`의 `setTimeout()` Callback에서 객체를 `return`하면 Promise의 결과가 될 것으로 생각했지만 반드시 `resolve()`로 전달해야 한다는 점을 학습
- 비동기 함수를 호출할 때 `await`를 빠뜨리면 실제 데이터가 아닌 Promise 객체를 사용하게 된다는 점을 확인
- 재고 부족 상황에서 `return new Error()`를 사용하면 정상 반환으로 처리되고 `throw new Error()`를 사용해야 `catch()`가 실행된다는 점을 이해함
- Promise와 Async/Await는 서로 다른 기능이 아니라 같은 Promise 기반 비동기 처리를 다른 문법으로 표현하는 관계라고 이해함
- 이전 작업의 결과가 다음 작업에 필요하면 순차 처리하고 서로 독립적인 작업이면 `Promise.all()`을 사용해 병행 처리하는 것이 판단 기준
- Spring Boot에서도 외부 API 호출, 데이터베이스 작업, 메시지 처리, 파일 업로드와 같이 시간이 걸리는 작업이 많으므로 비동기 처리의 실행 순서와 Error 처리에 대한 이해가 중요하다고 생각함
