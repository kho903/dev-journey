# Callback Function

## Callback Function이란?

- Callback Function은 다른 함수의 인자로 전달되는 함수
- 전달된 함수는 필요한 시점에 나중에 호출될 수 있음
- JavaScript에서는 함수도 값처럼 다룰 수 있기 때문에 Callback Function을 사용할 수 있음

```js
function sayHello() {
  console.log("Hello");
}

function executeCallback(callback) {
  callback();
}

executeCallback(sayHello); // Hello
```

## Function as Value

- JavaScript에서 함수는 값처럼 변수에 저장할 수 있음

```js
const sayHi = function () {
  console.log("Hi");
};

sayHi(); // Hi
```

- 함수는 변수에 저장할 수 있을 뿐만 아니라, 다른 함수의 인자로 전달할 수도 있음

```js
function sayHi() {
  console.log("Hi");
}

function runFunction(callback) {
  callback();
}

runFunction(sayHi); // Hi
```

## Callback with Parameters

- Callback Function도 인자를 받을 수 있음

```js
function greet(name) {
  console.log("Hello, " + name);
}

function executeGreeting(callback) {
  callback("JIHUN");
}

executeGreeting(greet); // Hello, JIHUN
```

## Callback with Arrow Function

- Callback Function은 Arrow Function으로도 작성 가능

```js
function executeCallback(callback) {
  callback();
}

executeCallback(() => {
  console.log("Arrow Callback");
});
```

## Callback and Array Methods

- `map()` 같은 배열 메서드는 Callback Function을 사용함

```js
const numbers = [1, 2, 3];

const doubledNumbers = numbers.map((number) => {
  return number * 2;
});

console.log(doubledNumbers);
```

- 위 코드에서 이 부분이 Callback Function임

```js
(number) => {
  return number * 2;
};
```

- 더 짧게 쓰면 이렇게 작성할 수 있음

```js
const numbers = [1, 2, 3];

const doubledNumber = numbers.map((number) => number * 2);
console.log(doubledNumbers); // [2, 4, 6]
```

---

## Callback and React

- React에서 이벤트 핸들러도 Callback Function의 개념과 연결됨

```js
const handleClick = () => {
  console.log("clicked");
};
```

- React에서는 이 함수를 이벤트가 발생했을 때 실행되도록 전달함

```jsx
<button onClick={handleClick}>Click</button>
```

- 즉, `handleClick` 함수는 클릭 이벤트가 발생했을 때 나중에 실행되는 Callback Function처럼 동작함

## 핵심 정리

- Callback Function은 다른 함수의 인자로 전달되는 함수
- JavaScript에서는 함수도 값처럼 다룰 수 있음
- 함수는 변수에 저장할 수 있고, 다른 함수에 인자로 전달할 수도 있음
- Callback Function은 전달된 함수 안에서 필요한 시점에 호출됨
- `map()`, `filter()`, `forEach()` 같은 배열 메서드는 Callback Function을 사용함
- React의 이벤트 핸들러도 Callback Function 개념과 연결됨
