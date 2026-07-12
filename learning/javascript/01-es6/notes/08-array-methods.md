# Array Methods

## Array Methods란?

- Array Methods는 배열 데이터를 다룰 때 사용하는 메서드
- 배열을 반복하거나, 변환하거나, 조건에 맞는 값만 추출할 때 자주 사용함
- 많은 Array Methods는 Callback Function을 인자로 받음

```js
const numbers = [1, 2, 3];

numbers.forEach((number) => {
  console.log(number);
});
```

## forEach()

`forEach()`는 배열의 각 요소를 하나씩 순회하면서 Callback Function을 실행함

```js
const numbers = [1, 2, 3];

numbers.forEach((number) => {
  console.log(number);
});
```

- 각 요소마다 특정 작업을 실행할 때 사용함
- 새로운 배열을 만들지 않음
- 반환값은 `undefined`

## map()

`map()`은 배열의 각 요소를 변환해서 새로운 배열을 만듦

```js
const numbers = [1, 2, 3];

const doubledNumbers = numbers.map((number) => {
  return number * 2;
});

console.log(doubledNumbers); // [2, 4, 6]
```

짧게 쓰면 다음과 같음

```js
const numbers = [1, 2, 3];

const doubledNumbers = numbers.map((number) => number * 2);

console.log(doubledNumbers); // [2, 4, 6]
```

- 새로운 배열을 반환함
- 원본 배열은 변경하지 않음
- React에서 리스트 렌더링할 때 자주 사용함

## filter()

`filter()`는 조건을 만족하는 요소만 모아서 새로운 배열을 만듦

```js
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter((number) => number % 2 === 0);

console.log(evenNumbers); // [2, 4]
```

- Callback Function이 `true`를 반환하는 요소만 남김
- 새로운 배열을 반환함
- 원본 배열은 변경하지 않음
- 검색, 필터링 기능에 자주 사용함

## find()

`find()`는 조건을 만족하는 첫 번째 요소를 반환함

```js
const users = [
  { id: 1, name: "JIHUN" },
  { id: 2, name: "KIM" },
];

const foundUser = users.find((user) => user.id === 2);

console.log(foundUser); // { id: 2, name: "KIM" }
```

- 조건을 만족하는 첫 번째 요소만 반환함
- 찾는 값이 없으면 `undefined`를 반환함
- 특정 id를 가진 데이터 하나를 찾을 때 자주 사용함

## some()

`some()`은 배열 안에 조건을 만족하는 요소가 하나라도 있는지 확인함

```js
const numbers = [1, 3, 5, 8];

const hasEvenNumber = numbers.some((number) => number % 2 === 0);

console.log(hasEvenNumber); // true
```

- 하나라도 조건을 만족하면 `true`
- 모두 만족하지 않으면 `false`
- 반환값은 boolean

## every()

`every()`는 배열의 모든 요소가 조건을 만족하는지 확인함

```js
const numbers = [2, 4, 6];

const allEvenNumbers = numbers.every((number) => number % 2 === 0);

console.log(allEvenNumbers); // true
```

- 모든 요소가 조건을 만족하면 `true`
- 하나라도 만족하지 않으면 `false`
- 반환값은 boolean

## reduce()

`reduce()`는 배열의 값을 누적해서 하나의 결과를 만듦

```js
const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(sum); // 10
```

위 코드에서:

```text
accumulator   -> 누적값
currentValue  -> 현재 요소
0             -> 초기값
```

짧게 쓰면 다음과 같음

```js
const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((acc, cur) => acc + cur, 0);

console.log(sum); // 10
```

- 배열을 하나의 값으로 누적할 때 사용함
- 합계, 총 가격, 평균 계산 등에 자주 사용함
- 초기값을 지정하면 누적 계산의 시작값을 명확하게 정할 수 있음

## forEach() vs map()

| Method      | 목적                  | 반환값      | 새로운 배열 |
| :---------- | :-------------------- | :---------- | :---------: |
| `forEach()` | 각 요소마다 작업 실행 | `undefined` |      X      |
| `map()`     | 각 요소를 변환        | 새로운 배열 |      O      |

```js
const numbers = [1, 2, 3];

numbers.forEach((number) => {
  console.log(number);
});

const doubledNumbers = numbers.map((number) => number * 2);

console.log(doubledNumbers); // [2, 4, 6]
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
