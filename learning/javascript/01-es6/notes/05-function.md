# Function Declaration and Function Expression

## Function이란?

- Function은 특정 작업을 수행하는 코드 블록
- 반복되는 코드를 하나로 묶어서 재사용할 수 있음
- JavaScript에서 Function은 값처럼 변수에 저장하거나 전달할 수 있음

```js
function sayHello() {
  console.log("Hello");
}

sayHello(); // Hello
```

## Funtion Declaration

- Function Declaration은 `function`키워드를 사용해 함수를 선언하는 방식

```js
function sayHello() {
  console.log("Hello");
}

sayHello(); // Hello
```

- Function Declaration은 Hoisting됨
- 그래서 함수 선언보다 위에서 호출해도 실행됨

```js
sayHi();

function sayHi() {
  console.log("Hi");
}
```

## Parameters and Arguments

- Parameter는 함수를 선언할 때 함수가 받을 값을 정의하는 변수
- Argument는 함수를 호출할 때 실제로 전달하는 값

```js
function greet(name) {
  console.log("Hello, " + name);
}

greet("JIHUN"); // Hello, JIHUN
```

- 위 코드에서 `name`은 Parameter, `"JIHUN"`은 Argument

## Return

- `return`은 함수의 실행 결과를 함수 밖으로 반환하는 역할을 함

```js
function add(a, b) {
  return a + b;
}

const result = add(10, 20);

console.log(result); // 30
```

```js
function testReturn() {
  return "finished";

  console.log("This will not run");
}

console.log(testReturn()); // finished
```

## Function Expression

- Function Expression은 함수를 변수에 저장하는 방식

```js
const sayHello = function () {
  console.log("Hello");
};

sayHello(); // Hello
```

- Function Expression은 변수에 함수 값을 할당하는 형태
- 그래서 변수 선언 전에 호출 불가

```js
// ReferenceError
// sayHello();

const sayHello = function () {
  console.log("Hello");
};
```

## Function Declaration vs Function Expression

| Type                 | Syntax                        | Hoisting | 호출 위치         |
| :------------------- | :---------------------------- | :------: | :---------------- |
| Function Declaration | `function test() {}`          |    O     | 선언 전 호출 가능 |
| Function Expression  | `const test = function () {}` |    X     | 선언 후 호출 가능 |

## 핵심 정리

- Function은 특정 작업을 수행하는 코드 블록
- Function을 사용하면 반복되는 코드를 재사용할 수 있음
- Parameter는 함수를 선언할 때 받는 변수
- Argument는 함수를 호출할 때 전달하는 실제 값
- `return`은 함수의 실행 결과를 밖으로 반환함
- Function Declaration은 Hoisting 됨
- Function Expression은 변수에 함수를 저장하는 방식
- Function Expression은 선언 전에 호출할 수 없음
