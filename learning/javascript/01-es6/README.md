# let

## 특징

- 블록(Block, {}) 단위의 스코프를 가지는 변수
  - 중괄호({}) 로 감싸진 모든 코드 블록 내부에서 선언된 변수는 오직 그 블록 안에서만 접근 가능
- 선언과 동시에 초기화할 수 있고, 선언 후 나중에 값을 할당할 수도 있음
- 값 재할당 가능
  - 변수 선언 후 언제든지 다른 값으로 변경 가능

## var 와 차이

- let 은 Block Scope 를 가짐
- var 는 Block Scope 를 가지지 않고, Function Scope 를 가짐
- 재선언 여부
  - var 는 동일한 이름으로 변수 재선언 가능해도 에러가 나지 않아, 기존 값 덮어버리는 위험 존재
  - let 은 동일한 스코프 내에서 재선언이 절대 불가능

```js
if (true) {
  var a = 10;
  let b = 20;
}

console.log(a); // 10
console.log(b); // ReferenceError
```

## 언제 사용하는가?

- 값이 변경될 가능성이 있는 변수를 선언할 때 사용
- 기본적으로는 재할당이 불가능한 const 를 사용하는 것이 권장되며, 반복문 등에서 변수 값이 주기적으로 바뀌어야 할 때에 let 을 사용
  - 반복문의 인덱스 (index)
  - API 응답을 저장하는 변수
  - 사용자 입력값
  - 조건에 따라 변경되는 상태값

## 예제

1. 값을 업데이트 할 때

```js
let count = 0;
count = 1; // 재할당
```

2. 반복문 (for문)

```js
for (let i = 0; i < 5; i++) {
  //...
}
```

3. 조건에 따라 값이 달라질 때 : API 호출 결과나 사용자 동작에 따라 변수의 상태가 변경됨.

```javascript
let message;

if (isLogin) {
  message = "로그인 성공";
} else {
  message = "로그인 실패";
}
```

## 핵심정리

- Block Scope 를 가짐
- 재선언은 불가능함
- 재할당은 가능
- 기본적으로 const 를 먼저 사용하고, 재할당이 필요한 경우 let 을 사용함

# const

## 특징

- 블록(Block, {}) 단위의 스코프를 가지는 변수
- 선언과 동시에 반드시 초기화해야 함
- 재할당이 불가능함
- 객체(Object) 와 배열(Array) 의 내부 데이터는 수정할 수 있지만, 변수 자체를 다른 객체나 배열로 재할당할 수는 없음

## let 과 차이

- let 은 재할당이 가능하지만, const 는 재할당이 불가능
- 기본적으로 const 를 사용하고, 값의 변경이 필요한 경우에만 let 을 사용

## 언제 사용하는가?

- 변경되지 않는 값을 선언할 때 사용
- 기본적으로 const 를 사용하고, 값의 변경이 필요한 경우에만 let 을 사용
- 예)
  - 설정 값 (Configuration)
  - API URL
  - 객체 (Object)
  - 배열 (Array)
  - 함수 (Function)

## 예제

1. 기본 사용

```js
const PI = 3.14;
```

2. 재할당 불가

```js
const name = "JIHUN";
name = "KIM"; // TypeError: Assignment to constant variable.
```

3. 객체는 변경 가능

```js
const user = {
  name: "JIHUN",
};
user.name = "KIM";
console.log(user.name); // KIM
```

4. 배열도 변경 가능

```js
const numbers = [1, 2, 3];
numbers.push(4);
console.log(numbers); // [1, 2, 3, 4]
```

5. 상수

```js
const API_URL = "https://api.example.com";
const MAX_RETRY_COUNT = 3;
```

## 핵심 정리

- Block Scope 를 가짐
- 선언과 동시에 초기화해야 함
- 재할당 불가
- 객체(Object)와 배열(Array)의 내부 데이터는 수정 가능
  > 실무에서는 기본적으로 const를 먼저 사용하고, 값을 변경해야 하는 경우에만 let을 사용
  > const 는 변수의 참조(Reference)를 변경하지 못하게 할 뿐, 객체나 배열 내부의 데이터를 수정하는 것은 가능함

# var

## 특징

- Function Scope를 가지는 변수 선언 방식
- 같은 스코프 안에서 재선언 가능
- 재할당 가능
- 선언 전에 접근할 경우 `undefined`가 출력될 수 있음
- ES6 이후에는 `var` 보다는 `let`과 `const` 사용이 권장됨

## let, const와의 차이

- `var`는 Block Scope를 가지지 않음
- `var`는 Function Scope 를 가짐
- `var`는 같은 스코프 안에서 재선언 가능
- `let`과 `const`는 같은 스코프 안에서 재선언 불가

## 언제 사용하는가?

- 현재 JavaScript에서는 사용하지 않는 것이 권장됨
- 레거시 코드에서 주로 볼 수 있음
- `var`를 이해해야 레거시 코드를 이해할 수 있는 경우가 있음

## 예제

1. 재선언 가능

```js
var name = "JIHUN";
var name = "KIM";

console.log(name); // KIM
```

2. 재할당 가능

```js
var count = 0;
count = 10;

console.log(count);
```

3. Block Scope를 가지지 않음

```js
if (true) {
  var message = "Hello";
}

console.log(message); // Hello
```

4. Function Scope

```js
function testFuncScopeInVar() {
  var value = 10;
}

console.log(value); // ReferenceError
```

## 핵심 정리

- `var`는 Function Scope를 가짐
- `var`는 Block Scope를 가지지 않음
- 같은 스코프 안에서 재선언 가능
- 재할당 가능
- 예측하기 어려운 버그를 만들 수 있기 때문에 현대 JavaScript에서는 `var` 대신에 `let`과 `const`를 사용하는 것이 권장됨

---

# Hoisting and TDZ

## Hoisting이란?

- Hoisting은 JavaScript 에서 변수 선언이 코드 실행 전에 먼저 처리되는 것처럼 동작하는 현상
- 하지만 실제 코드가 물리적으로 위로 이동하는 것은 아님
- JavaScript 엔진이 코드를 실행하기 전에 선언 정보를 먼저 메모리에 등록하기 때문에, 선언문이 코드 아래에 있어도 위에 있는 것처럼 동작할 수 있음

## var의 Hoisting

- `var`로 선언한 변수는 선언과 동시에 `undefined`로 초기화됨
- 그래서 선언문보다 위에서 변수에 접근해도 에러가 발생하지 않고 `undefined`가 출력됨

```js
console.log(userName); // undefined
var userName = "JIHUN";
console.log(userName); // JIHUN
```

- 위 코드는 JavaScript 엔진 입장에서 대략 아래처럼 동작한다고 이해할 수 있음

```js
var userName;
console.log(userName); // undefined
userName = "JIHUN";
console.log(userName); // JIHUN
```

## let과 const의 Hoisting

- `let`과 `const`도 Hoisting 됨
- 하지만 `var`처럼 `undefined`로 바로 초기화되지 않음
- 선언문에 도달하기 전까지는 변수에 접근할 수 없음

```js
console.log(age); // ReferenceError
let age = 29;
```

```js
console.log(PI); // ReferenceError
const PI = 3.14;
```

## TDZ란?

- TDZ는 Temporal Dead Zone의 약자
- 변수가 스코프 안에 존재하지만, 아직 초기화되기 전까지 접근할 수 없는 구간을 의미
- `let`과 `const`는 선언문에 도달하기 전까지 TDZ에 있기 때문에 접근하면 `ReferenceError`가 발생함

```js
{
  // TDZ start
  // console.log(value); // ReferenceError
  let value = 10; // TDZ end
  console.log(value); // 10
}
```

## var, let, const 비교

| keyword | Hoisting |     초기화      |    선언 전 접근    |
| :-----: | :------: | :-------------: | :----------------: |
|  `var`  |    O     |   `undefined`   | 가능 (`undefined`) |
|  `let`  |    O     | 초기화되지 않음 |       불가능       |
| `const` |    O     | 초기화되지 않음 |       불가능       |

## 핵심 정리

- `var`, `let`, `const`는 모두 Hoisting 됨
- `var`는 Hoisting되면서 `undefined`로 초기화됨
- `let`과 `const`도 Hoisting되지만, 선언문에 도달하기 전까지 초기화되지 않음
- `let`과 `const`는 TDZ 때문에 선언 전에 접근 불가
- TDZ는 실수를 빠르게 발견하게 해 주기 때문에 `var`보다 안전함
