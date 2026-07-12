# Arrow Function and this

## Arrow Function이란?

- Arrow Function은 ES6에서 추가된 함수 표현 방식
- `function` 키워드 대신 `=>`를 사용함
- Function Expression을 더 짧게 작성할 수 있음

```js
const sayHello = function () {
  console.log("Hello");
};

const sayHi = () => {
  console.log("Hi");
};
```

## Basic Syntax

```js
const add = (a, b) => {
  return a + b;
};

console.log(add(10, 20)); // 30
```

- 매개변수가 하나일 때는 괄호 생략 가능

```js
// prettier-ignore
const greet = name => {
  console.log("Hello, " + name);
};

greet("JIHUN"); // Hello, JIHUN
```

- 하지만 매개변수가 없거나 두 개 이상이면 괄호 필요

```js
const sayHello = () => {
  console.log("Hello");
};

const add = (a, b) => {
  return a + b;
};
```

## Implicit Return

- Arrow Function에서 함수 본문이 한 줄이고 바로 값을 반환하는 경우, `{}`와 `return` 생략 가능

```js
const add = (a, b) => a + b;

console.log(add(10, 20)); // 30
```

- 객체를 바로 반환할 때는 객체 리터럴을 `()`로 감싸야 함

```js
const createUser = (name, age) => ({
  name: name,
  age: age,
});

console.log(createUser("JIHUN", 29));
```

## Regular Function vs Arrow Function

### Regular Function

```js
const add = function (a, b) {
  return a + b;
};

console.log(add(10, 20)); // 30
```

### Arrow Function

```js
const add = (a, b) => {
  return a + b;
};

console.log(add(10, 20)); // 30
```

```js
const add = (a, b) => a + b;
console.log(add(10, 20)); // 30
```

## this란?

- `this`는 함수가 실행될 때 결정되는 자기 참조 값
- 일반 함수에서는 `this`가 호출 방식에 따라 달라질 수 있음

```js
const user = {
  name: "JIHUN",
  printName: function () {
    console.log(this.name);
  },
};

user.printName(); // JIHUN
```

- 위 코드에서 `printName()`은 `user` 객체를 통해 호출되었기 때문에 `this`는 `user`를 가리킴

## Arrow Function의 this

- Arrow Function은 자신만의 `this`를 가지지 않음
- 대신 Arrow Function이 선언된 위치의 바깥 `this`를 그대로 사용함

```js
const user = {
  name: "JIHUN",
  printName: () => {
    console.log(this.name);
  },
};

user.printName(); // undefined
```

- 위 코드에서 Arrow Function은 자신만의 `this`를 가지지 않기 때문에 `user`를 가리키지 않음
- 따라서 객체의 메서드를 만들 때는 Arrow Function보다 일반 함수를 사용하는 것이 더 안전함

## React에서 Arrow Function을 많이 쓰는 이유

- React에서 이벤트 핸들러나 콜백 함수를 작성할 때 Arrow Function을 자주 사용함

```js
const handleClick = () => {
  console.log("clicked");
};
```

- Arrow Function은 문법이 짧고, 바깥 Scope의 값을 자연스럽게 사용할 수 있기 때문에 React 코드에서 많이 사용됨

## 핵심 정리

- Arrow Function은 `function` 키워드 대신 `=>`를 사용하는 함수 표현 방식
- 함수 본문이 한 줄이면 `return` 생략 가능
- 매개변수가 하나일 때는 괄호 생략 가능
- 매개변수가 없거나 두 개 이상이면 괄호 필요
- Arrow Function은 자신만의 `this`를 가지지 않음
- 객체의 메서드를 만들 때는 Arrow Function보다 일반 함수를 사용하는 것이 더 안전함
- React에서는 이벤트 핸들러와 콜백 함수에서 Arrow Function을 자주 사용함
