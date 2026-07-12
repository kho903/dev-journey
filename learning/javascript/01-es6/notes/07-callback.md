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

---

# Array Methods

## Array Methods란?

- Array Methods는 배열 데이터를 다룰 때 사용하는 메서드
- JavaScript에서는 배열을 반복하거나, 변환하거나, 조건에 맞는 값만 추출할 때 자주 사용함
- 많은 Array Methods는 Callback Function을 인자로 받음

```js
const arrayMethodIntroNumbers = [1, 2, 3];

arrayMethodIntroNumbers.forEach((number) => {
  console.log(number);
});
```

## forEach()

`forEach()`는 배열의 각 요소를 하나씩 순회하면서 Callback Function을 실행함

```js
const arrayMethodForEachNumbers = [1, 2, 3];

arrayMethodForEachNumbers.forEach((number) => {
  console.log(number);
});
```

- 반환값을 사용하지 않음
- 단순 반복 작업에 사용
- 새로운 배열을 만들지 않음

## map()

`map()`은 배열의 각 요소를 변환해서 새로운 배열을 만듦

```js
const arrayMethodMapNumbers = [1, 2, 3];

const arrayMethodDoubledNumbers = arrayMethodMapNumbers.map((number) => {
  return number * 2;
});

console.log(arrayMethodDoubledNumbers); // [2, 4, 6]
```

짧게 쓰면 다음과 같음

```js
const arrayMethodShortMapNumbers = [1, 2, 3];

const arrayMethodShortDoubledNumbers = arrayMethodShortMapNumbers.map(
  (number) => number * 2,
);

console.log(arrayMethodShortDoubledNumbers); // [2, 4, 6]
```

- 새로운 배열을 반환함
- React에서 리스트 렌더링할 때 자주 사용함

## filter()

`filter()`는 조건을 만족하는 요소만 모아서 새로운 배열을 만듦

```js
const arrayMethodFilterNumbers = [1, 2, 3, 4, 5];

const arrayMethodEvenNumbers = arrayMethodFilterNumbers.filter(
  (number) => number % 2 === 0,
);

console.log(arrayMethodEvenNumbers); // [2, 4]
```

- Callback Function이 `true`를 반환하는 요소만 남김
- 검색, 필터링 기능에 자주 사용함

## find()

`find()`는 조건을 만족하는 첫 번째 요소를 반환함

```js
const arrayMethodUsers = [
  { id: 1, name: "JIHUN" },
  { id: 2, name: "KIM" },
];

const arrayMethodFoundUser = arrayMethodUsers.find((user) => user.id === 2);

console.log(arrayMethodFoundUser); // { id: 2, name: "KIM" }
```

- 조건을 만족하는 첫 번째 요소만 반환함
- 찾는 값이 없으면 `undefined`를 반환함

## some()

`some()`은 배열 안에 조건을 만족하는 요소가 하나라도 있는지 확인함

```js
const arrayMethodSomeNumbers = [1, 2, 3, 4, 5];

const arrayMethodHasEvenNumber = arrayMethodSomeNumbers.some(
  (number) => number % 2 === 0,
);

console.log(arrayMethodHasEvenNumber); // true
```

- 하나라도 조건을 만족하면 `true`
- 모두 만족하지 않으면 `false`

## every()

`every()`는 배열의 모든 요소가 조건을 만족하는지 확인함

```js
const arrayMethodEveryNumbers = [2, 4, 6];

const arrayMethodAllEvenNumbers = arrayMethodEveryNumbers.every(
  (number) => number % 2 === 0,
);

console.log(arrayMethodAllEvenNumbers); // true
```

- 모든 요소가 조건을 만족하면 `true`
- 하나라도 만족하지 않으면 `false`

## reduce()

`reduce()`는 배열의 값을 누적해서 하나의 결과를 만듦

```js
const arrayMethodReduceNumbers = [1, 2, 3, 4];

const arrayMethodSum = arrayMethodReduceNumbers.reduce(
  (accumulator, currentValue) => {
    return accumulator + currentValue;
  },
  0,
);

console.log(arrayMethodSum); // 10
```

위 코드에서:

```text
accumulator   -> 누적값
currentValue  -> 현재 요소
0             -> 초기값
```

짧게 쓰면 다음과 같음

```js
const arrayMethodShortReduceNumbers = [1, 2, 3, 4];

const arrayMethodShortSum = arrayMethodShortReduceNumbers.reduce(
  (acc, cur) => acc + cur,
  0,
);

console.log(arrayMethodShortSum); // 10
```

## forEach() vs map()

| Method      | 목적                  | 반환값      | 새로운 배열 |
| :---------- | :-------------------- | :---------- | :---------: |
| `forEach()` | 각 요소마다 작업 실행 | `undefined` |      X      |
| `map()`     | 각 요소를 변환        | 새로운 배열 |      O      |

```js
const arrayMethodCompareNumbers = [1, 2, 3];

arrayMethodCompareNumbers.forEach((number) => {
  console.log(number);
});

const arrayMethodCompareDoubledNumbers = arrayMethodCompareNumbers.map(
  (number) => number * 2,
);

console.log(arrayMethodCompareDoubledNumbers); // [2, 4, 6]
```

## 핵심 정리

- Array Methods는 배열 데이터를 다룰 때 사용함
- `forEach()`는 반복 실행에 사용함
- `map()`은 새로운 배열을 만들 때 사용함
- `filter()`는 조건에 맞는 요소만 모을 때 사용함
- `find()`는 조건에 맞는 첫 번째 요소를 찾을 때 사용함
- `some()`은 조건을 만족하는 요소가 하나라도 있는지 확인함
- `every()`는 모든 요소가 조건을 만족하는지 확인함
- `reduce()`는 배열을 하나의 값으로 누적할 때 사용함
- React에서는 `map()`, `filter()`, `find()`를 특히 자주 사용함
