# Async JavaScript

## 1. Synchronous JavaScript

Synchronous는 코드가 작성된 순서대로 하나씩 실행되는 방식

앞의 작업이 끝나야 다음 작업을 실행할 수 있음

```js
console.log("Start");

function calculate() {
  let result = 0;

  for (let i = 0; i < 1_000_000; i++) {
    result += i;
  }

  return result;
}

console.log(calculate());
console.log("End");
```

실행 순서

```text
Start
계산 결과
End
```

JavaScript는 기본적으로 하나의 작업을 처리하는 Single Thread 언어

하나의 작업이 오래 걸리면 해당 작업이 끝날 때까지 다음 코드의 실행이 지연될 수 있음

## 2. Asynchronous JavaScript

Asynchronous는 특정 작업의 완료를 기다리는 동안 다음 코드를 먼저 실행할 수 있는 방식

대표적인 비동기 작업

- Timer
- HTTP Request
- File Reading
- Event Handling
- Database Request

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer completed");
}, 1000);

console.log("End");
```

실행 결과

```text
Start
End
Timer completed
```

`setTimeout()`의 Callback은 즉시 실행되지 않음

설정한 시간이 지난 뒤 실행 가능한 상태가 되고 현재 실행 중인 코드가 모두 끝난 후 실행됨

## 3. Callback Function

Callback Function은 다른 함수에 Argument로 전달되어 나중에 실행되는 함수

```js
function greet(name, callback) {
  console.log(`Hello ${name}`);

  callback();
}

function finishGreeting() {
  console.log("Greeting completed");
}

greet("JIHUN", finishGreeting);
```

Arrow Function을 직접 전달하는 것도 가능함

```js
greet("JIHUN", () => {
  console.log("Greeting completed");
});
```

Timer에서도 Callback Function 사용

```js
setTimeout(() => {
  console.log("Executed after one second");
}, 1000);
```

### Callback의 문제점

비동기 작업이 여러 단계로 중첩되면 코드의 깊이가 증가할 수 있음

```js
setTimeout(() => {
  console.log("Step 1");

  setTimeout(() => {
    console.log("Step 2");

    setTimeout(() => {
      console.log("Step 3");
    }, 1000);
  }, 1000);
}, 1000);
```

Callback이 계속 중첩되어 코드의 가독성과 유지보수성이 떨어지는 현상을 Callback Hell이라고 함

Promise는 Callback 중심의 비동기 코드를 더 구조적으로 처리하기 위해 사용함

## 4. Promise

Promise는 비동기 작업의 미래 결과를 나타내는 객체

비동기 작업이 아직 완료되지 않았더라도 성공 결과 또는 실패 결과를 나중에 전달할 수 있음

```js
const promise = new Promise((resolve, reject) => {
  // Asynchronous operation
});
```

Promise Constructor는 Executor Function을 전달받음

Executor Function은 다음 두 함수를 Parameter로 전달받음

```text
resolve
reject
```

- `resolve(value)`는 작업 성공 처리
- `reject(error)`는 작업 실패 처리

## 5. Promise States

Promise에는 세 가지 상태가 존재함

| State     | Description                           |
| :-------- | :------------------------------------ |
| Pending   | 비동기 작업이 아직 완료되지 않은 상태 |
| Fulfilled | 비동기 작업이 성공한 상태             |
| Rejected  | 비동기 작업이 실패한 상태             |

Promise는 처음 생성되면 `Pending` 상태

```text
Pending
-> resolve() 호출
-> Fulfilled
```

또는 다음과 같이 실패 상태로 변경됨

```text
Pending
-> reject() 호출
-> Rejected
```

Promise가 Fulfilled 또는 Rejected 상태가 되면 다른 상태로 변경되지 않음

## 6. resolve and reject

비동기 작업이 성공하면 `resolve()` 호출

```js
const successPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Data loaded successfully");
  }, 1000);
});
```

비동기 작업이 실패하면 `reject()` 호출

```js
const failurePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Failed to load data"));
  }, 1000);
});
```

## 7. then, catch and finally

### then()

`then()`은 Promise가 Fulfilled 상태가 되었을 때 실행됨

```js
const promise = new Promise((resolve) => {
  resolve("Success");
});

promise.then((result) => {
  console.log(result);
});
```

실행 결과

```text
Success
```

`resolve()`에 전달한 값은 `then()`의 Callback Parameter로 전달됨

### catch()

`catch()`는 Promise가 Rejected 상태가 되었을 때 실행됨

```js
const promise = new Promise((resolve, reject) => {
  reject(new Error("Something went wrong"));
});

promise.catch((error) => {
  console.log(error.name);
  console.log(error.message);
});
```

실행 결과

```text
Error
Something went wrong
```

### finally()

`finally()`는 Promise의 성공 또는 실패 여부와 관계없이 실행됨

```js
const promise = new Promise((resolve) => {
  resolve("Success");
});

promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log("Promise completed");
  });
```

`finally()`의 주요 활용 사례

- Loading 상태 해제
- 연결 종료
- 자원 정리
- 완료 메시지 출력

## 8. Promise Chaining

`then()`은 새로운 Promise를 반환함

따라서 여러 개의 `then()`을 연결할 수 있음

```js
Promise.resolve(10)
  .then((number) => {
    return number * 2;
  })
  .then((number) => {
    return number + 5;
  })
  .then((number) => {
    console.log(number);
  });
```

실행 과정

```text
10
→ 10 * 2
→ 20
→ 20 + 5
→ 25
```

실행 결과

```text
25
```

Arrow Function의 중괄호와 `return` 생략 가능

```js
Promise.resolve(10)
  .then((number) => number * 2)
  .then((number) => number + 5)
  .then((number) => console.log(number));
```

### Promise를 반환하는 Chaining

`then()` 내부에서 다른 Promise를 반환하면 해당 Promise가 완료될 때까지 다음 `then()`이 기다림

```js
function delayMessage(message, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
}

delayMessage("Step 1", 1000)
  .then((message) => {
    console.log(message);

    return delayMessage("Step 2", 1000);
  })
  .then((message) => {
    console.log(message);

    return delayMessage("Step 3", 1000);
  })
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error.message);
  });
```

비동기 작업을 연결할 때 Promise를 반드시 `return`해야 함

```js
return delayMessage("Step 2", 1000);
```

`return`하지 않으면 다음 `then()`이 해당 작업의 완료를 기다리지 않음

## 9. Error Propagation

Promise Chain 중간에서 Error가 발생하면 이후의 성공 `then()`을 건너뛰고 가장 가까운 `catch()`로 이동함

```js
Promise.resolve(10)
  .then((number) => {
    return number * 2;
  })
  .then(() => {
    throw new Error("Calculation failed");
  })
  .then(() => {
    console.log("This code is not executed");
  })
  .catch((error) => {
    console.log(error.message);
  });
```

실행 결과

```text
Calculation failed
```

## 10. async Function

함수 앞에 `async`를 작성하면 해당 함수는 항상 Promise를 반환함

```js
async function getMessage() {
  return "Hello";
}

const result = getMessage();

console.log(result);
```

`result`는 문자열이 아닌 Promise

```js
getMessage().then((message) => {
  console.log(message);
});
```

실행 결과

```text
Hello
```

`async` 함수에서 일반 값을 반환하면 JavaScript가 자동으로 Fulfilled Promise로 감쌈

```js
return "Hello";
```

다음과 비슷한 형태로 처리됨

```js
return Promise.resolve("Hello");
```

## 11. await

`await`는 Promise가 완료될 때까지 `async` 함수 내부의 실행을 기다림

```js
function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "JIHUN",
      });
    }, 1000);
  });
}

async function printUser() {
  const user = await getUser();

  console.log(user);
}

printUser();
```

`await`는 일반적으로 `async` 함수 내부에서 사용함

```js
async function functionName() {
  const result = await promise;
}
```

Promise가 Fulfilled 상태가 되면 `resolve()`에 전달한 값이 반환됨

```js
const user = await getUser();
```

Promise가 Rejected 상태가 되면 Error 발생

## 12. Async Error Handling

Async/Await에서는 `try-catch`로 Promise의 실패를 처리함

```js
function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("User not found"));
    }, 1000);
  });
}

async function printUser() {
  try {
    const user = await getUser();

    console.log(user);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("User request completed");
  }
}

printUser();
```

`await`하는 Promise가 Rejected 상태가 되면 `catch`로 이동함

## 13. Sequential Execution

여러 개의 `await`를 순서대로 작성하면 비동기 작업도 순차적으로 실행됨

```js
function delay(message, milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, milliseconds);
  });
}

async function runSequentially() {
  const first = await delay("First", 1000);
  console.log(first);

  const second = await delay("Second", 1000);
  console.log(second);
}

runSequentially();
```

첫 번째 작업이 끝난 후 두 번째 작업 시작

각 작업이 1초 걸리므로 전체 실행 시간은 약 2초

## 14. Parallel Execution

서로 의존하지 않는 비동기 작업은 동시에 시작할 수 있음

```js
async function runInParallel() {
  const firstPromise = delay("First", 1000);
  const secondPromise = delay("Second", 1000);

  const first = await firstPromise;
  const second = await secondPromise;

  console.log(first);
  console.log(second);
}

runInParallel();
```

두 Promise를 먼저 생성하면 두 작업이 거의 동시에 시작됨

## 15. Promise.all()

`Promise.all()`은 여러 Promise를 동시에 실행하고 모든 작업이 완료될 때까지 기다림

```js
async function loadAllData() {
  const results = await Promise.all([
    delay("User data", 1000),
    delay("Post data", 1500),
    delay("Comment data", 500),
  ]);

  console.log(results);
}

loadAllData();
```

실행 결과

```js
["User data", "Post data", "Comment data"];
```

결과 배열의 순서는 작업 완료 순서가 아닌 전달한 Promise의 순서와 동일함

```text
첫 번째 Promise의 결과
두 번째 Promise의 결과
세 번째 Promise의 결과
```

`Promise.all()`에 전달한 작업 중 하나라도 실패하면 전체 결과가 Rejected 상태가 됨

```js
Promise.all([Promise.resolve("Success"), Promise.reject(new Error("Failed"))])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error.message);
  });
```

## 16. Fetch API

Fetch API는 브라우저에서 HTTP Request를 보내기 위한 기능

```js
fetch("https://example.com/users");
```

`fetch()`는 Promise를 반환함

```js
const responsePromise = fetch("https://example.com/users");
```

따라서 `then()` 또는 `async/await`로 처리해야 함

## 17. HTTP Request and Response

클라이언트가 서버에 정보를 요청하는 것을 HTTP Request라고 함

서버가 클라이언트에 결과를 전달하는 것을 HTTP Response라고 함

```text
React Client
-> HTTP Request
-> Spring Boot Server

Spring Boot Server
-> HTTP Response
-> React Client
```

HTTP Request에 포함될 수 있는 정보

- URL
- HTTP Method
- Header
- Body

HTTP Response에 포함될 수 있는 정보

- Status Code
- Header
- Body

## 18. HTTP Methods

| Method | Description        |
| :----- | :----------------- |
| GET    | 데이터 조회        |
| POST   | 새로운 데이터 생성 |
| PUT    | 데이터 전체 수정   |
| PATCH  | 데이터 일부 수정   |
| DELETE | 데이터 삭제        |

예시

```text
GET /users
POST /users
GET /users/1
PATCH /users/1
DELETE /users/1
```

## 19. GET Request

`fetch()`는 기본적으로 GET Request를 전송함

```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    return response.json();
  })
  .then((users) => {
    console.log(users);
  })
  .catch((error) => {
    console.log(error.message);
  });
```

Async/Await로 작성한 형태

```js
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    console.log(users);
  } catch (error) {
    console.log(error.message);
  }
}

getUsers();
```

## 20. Response JSON Conversion

Fetch API의 Response Body는 바로 JavaScript 객체로 사용할 수 없음

`response.json()`을 호출하여 JSON 데이터를 JavaScript 값으로 변환해야 함

```js
const response = await fetch(url);
const data = await response.json();
```

`response.json()`도 Promise를 반환하므로 `await` 필요

```js
const data = await response.json();
```

## 21. response.ok

Fetch API는 서버가 `404`나 `500`을 반환해도 자동으로 Rejected Promise가 되지 않음

네트워크 연결 자체가 성공하면 Response를 반환함

따라서 HTTP 요청 성공 여부를 직접 확인해야 함

```js
async function getUser(id) {
  const response = await fetch(`https://example.com/users/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
}
```

`response.ok`는 Status Code가 `200`부터 `299` 범위이면 `true`

## 22. HTTP Status Codes

| Status Code | Description                    |
| :---------- | :----------------------------- |
| 200         | 요청 성공                      |
| 201         | 새로운 데이터 생성 성공        |
| 204         | 요청 성공이며 반환할 Body 없음 |
| 400         | 잘못된 Request                 |
| 401         | 인증되지 않은 사용자           |
| 403         | 접근 권한 없음                 |
| 404         | Resource를 찾을 수 없음        |
| 500         | 서버 내부 오류                 |

Status Code는 서버 요청의 처리 결과를 나타냄

## 23. POST Request

POST Request에서는 Request Option 설정 필요

```js
async function createUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
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

  const createdUser = await response.json();
  console.log(createdUser);
}

createUser();
```

### method

전송할 HTTP Method 지정

```js
method: "POST";
```

### headers

Request에 대한 추가 정보 전달

```js
headers: {
    "Content-Type" : "application/json",
}
```

`Content-Type`은 전송하는 Body의 데이터 형식을 나타냄

### body

서버에 전달할 데이터 지정

```js
body: JSON.stringify({
  name: "JIHUN",
  role: "backend",
});
```

JavaScript 객체를 JSON 문자열로 변환하기 위해 `JSON.stringify()` 사용

## 24. Event Loop

JavaScript는 한 번에 하나의 작업만 실행하지만 브라우저 환경의 기능과 Event Loop를 통해 비동기 작업을 처리함

주요 구성 요소

- Call Stack
- Web API
- Task Queue
- Microtask Queue
- Event Loop

## 25. Call Stack

Call Stack은 현재 실행 중인 함수와 코드를 관리함

```js
function first() {
  second();
}

function second() {
  console.log("Second");
}

first();
```

실행 흐름

```text
Global Context
→ first()
→ second()
→ console.log()
```

함수 실행이 끝나면 Stack에서 제거됨

## 26. Web API

Web API는 브라우저가 제공하는 기능

대표적인 Web API

- `setTimeout()`
- DOM Event
- Fetch API

`setTimeout()`을 호출하면 Timer 자체를 JavaScript Call Stack이 직접 기다리지 않음

브라우저의 Web API가 Timer를 처리함

## 27. Task Queue

`setTimeout()`의 Callback은 Timer가 끝난 후 Task Queue에 들어감

Task Queue의 Callback은 Call Stack이 비어 있을 때 실행됨

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");
```

실행 결과

```text
Start
End
Timeout
```

Delay가 `0`이어도 현재 동기 코드보다 먼저 실행되지 않음

## 28. Microtask Queue

Promise의 `then`, `catch`, `finally` Callback은 Microtask Queue에 들어감

```js
Promise.resolve().then(() => {
  console.log("Promise");
});
```

Microtask Queue는 Task Queue보다 우선순위가 높음

## 29. Promise and setTimeout Execution Order

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

실행 결과

```text
Start
End
Promise
Timeout
```

실행 흐름

```text
1. 동기 코드 실행
2. Call Stack이 비워짐
3. Microtask Queue 실행
4. Task Queue 실행
```

따라서 Promise Callback이 `setTimeout()` Callback보다 먼저 실행됨

## 30. Event Loop Execution Flow

비동기 코드의 기본 실행 흐름

```text
1. JavaScript Code가 Call Stack에서 실행됨
2. 비동기 작업이 Web API로 전달됨
3. 작업 완료 후 Callback이 Queue로 이동함
4. Call Stack이 비었는지 Event Loop가 확인함
5. Microtask Queue의 작업이 먼저 실행됨
6. Task Queue의 작업이 실행됨
```

Promise 관련 Callback은 Microtask Queue에서 처리됨

Timer 관련 Callback은 Task Queue에서 처리됨

## 31. Key Differences

| Concept              | Description                                           |
| :------------------- | :---------------------------------------------------- |
| Synchronous          | 앞의 작업이 끝난 후 다음 작업 실행                    |
| Asynchronous         | 작업 완료를 기다리는 동안 다음 코드 실행 가능         |
| Callback             | 다른 함수에 전달되어 나중에 실행되는 함수             |
| Promise              | 비동기 작업의 미래 결과를 나타내는 객체               |
| Pending              | Promise 작업이 아직 완료되지 않은 상태                |
| Fulfilled            | Promise 작업이 성공한 상태                            |
| Rejected             | Promise 작업이 실패한 상태                            |
| `resolve()`          | Promise를 Fulfilled 상태로 변경                       |
| `reject()`           | Promise를 Rejected 상태로 변경                        |
| `then()`             | Promise 성공 결과 처리                                |
| `catch()`            | Promise 실패 결과 처리                                |
| `finally()`          | 성공과 실패 여부와 관계없이 실행                      |
| `async`              | 함수를 Promise를 반환하는 함수로 만듦                 |
| `await`              | Promise가 완료될 때까지 async 함수 내부 실행을 기다림 |
| Sequential Execution | 비동기 작업을 순서대로 실행                           |
| Parallel Execution   | 독립적인 비동기 작업을 동시에 시작                    |
| Fetch API            | HTTP Request를 전송하는 API                           |
| `response.ok`        | HTTP Response의 성공 여부 확인                        |
| Call Stack           | 현재 실행 중인 JavaScript 코드 관리                   |
| Microtask Queue      | Promise Callback 등을 대기시킴                        |
| Task Queue           | Timer Callback 등을 대기시킴                          |
| Event Loop           | Stack과 Queue를 확인하여 Callback 실행 관리           |

## 32. Key Takeaways

- JavaScript는 기본적으로 코드를 동기적으로 실행함
- 오래 걸리는 작업은 비동기로 처리하여 다음 코드의 실행이 막히는 것을 방지할 수 있음
- Callback Function은 나중에 실행할 함수를 전달하는 방식
- Promise는 비동기 작업의 성공 또는 실패 결과를 관리함
- Promise는 Pending, Fulfilled, Rejected 상태를 가짐
- `then`, `catch`, `finally`로 Promise 결과 처리 가능
- Promise Chaining에서는 다음 작업의 값이나 Promise를 `return`해야 함
- `async` 함수는 항상 Promise를 반환함
- `await`는 Promise의 완료 결과를 간결하게 처리함
- Async/Await의 Error는 `try-catch`로 처리 가능
- 서로 독립적인 작업은 `Promise.all()`로 동시에 처리 가능
- Fetch API는 Promise를 반환함
- `response.json()`도 Promise를 반환함
- Fetch API에서는 `response.ok`를 직접 확인해야 함
- POST Request Body는 `JSON.stringify()`로 JSON 문자열로 변환함
- Promise Callback은 Microtask Queue에서 처리됨
- Timer Callback은 Task Queue에서 처리됨
- Microtask Queue는 Task Queue보다 먼저 실행됨
