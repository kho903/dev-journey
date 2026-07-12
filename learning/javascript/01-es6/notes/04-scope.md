# Scope and Lexical Scope

## Scope란?

- Scope는 변수에 접근할 수 있는 범위를 의미
- JavaScript에서는 변수가 어디에서 선언되었는지에 따라 접근 가능한 범위가 달라짐

## Global Scope

- Global Scope는 코드의 가장 바깥 영역을 의미함
- Global Scope에서 선언된 변수는 코드 어디에서든 접근 가능

```js
const globalValue = "global";

function printGlobalValue() {
  console.log(globalValue);
}

printGlobalValue(); // global
```

## Function Scope

- Function Scope는 함수 내부에서 선언된 변수가 함수 안에서만 접근 가능한 범위를 의미
- `var`는 Function Scope를 가짐

```js
function testFunctionScope() {
  var message = "Hello";
  console.log(message); // Hello
}

testFunctionScope();

// ReferenceError
// console.log(message);
```

## Block Scope

- Block Scope는 `{}` 내부에서 선언된 변수가 해당 블록 안에서만 접근 가능한 범위를 의미
- `let`과 `const`는 Block Scope를 가짐

```js
if (true) {
  let age = 29;
  const userName = "JIHUN";

  console.log(age); // 29
  console.log(userName); // JIHUN
}

// ReferenceError
// console.log(age);
// console.log(userName);
```

## Scope Chain

- JavaScript는 변수를 찾을 때 현재 Scope에서 먼저 찾음
- 현재 Scope에 변수가 없으면 바깥 Scope로 이동해서 변수를 찾음
- 이 과정을 Scope Chain이라고 함

```js
const globalValue = "JIHUN";

function outer() {
  const outerValue = "outer";

  function inner() {
    const innerValue = "inner";

    console.log(innerValue); // inner
    console.log(outerValue); // outer
    console.log(globalValue); // JIHUN
  }
  inner();
}
outer();
```

- 위 코드에서 `inner()` 함수는 다음 순서로 변수를 찾음

```text
inner Scope
↓
outer Scope
↓
Global Scope
```

## Lexical Scope

- Lexical Scope는 함수가 어디에서 호출되었는지가 아니라, 어디에서 선언되었는지에 따라 Scope가 결정되는 것을 의미함

```js
const value = "global";

function outer() {
  const value = "outer";

  function inner() {
    console.log(value);
  }
  inner();
}
outer(); // outer
```

- `inner()` 함수는 `outer()` 함수 안에서 선언되었기 때문에, `outer`의 Scope에 있는 `value`를 참조함
- 즉, 함수의 Scope는 호출 위치가 아니라 선언 위치를 기준으로 결정됨

## 핵심 정리

- Scope는 변수에 접근할 수 있는 범위
- Global Scope는 코드 어디에서든 접근 가능
- Function Scope는 함수 내부에서만 접근 가능
- Block Scope는 `{}` 내부에서만 접근 가능
- `var`는 Function Scope를 가짐
- `let`과 `const`는 Block Scope를 가짐
- JavaScript는 현재 Scope에서 변수를 찾고, 없으면 바깥 Scope로 이동함
- 이 과정을 Scope Chain이라고 함
- Lexical Scope는 함수가 선언된 위치를 기준으로 Scope가 결정되는 방식
