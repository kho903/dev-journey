# Template Literals and Destructuring

## Template Literals란?

Template Literals는 문자열을 작성할 때 백틱을 사용하는 문법

```js
const message = `Hello`;

console.log(message); // Hello
```

일반 문자열은 작은따옴표 또는 큰따옴표를 사용

```js
const message1 = "Hello";
// prettier-ignore
const message2 = 'Hello';
```

Template Literals는 백틱을 사용

```js
const message = `Hello`;
```

## String Interpolation

Template Literals 안에서 `${}`를 사용하면 변수나 표현식의 값을 문자열에 넣을 수 있음

```js
const name = "JIHUN";
const age = 29;

const message = `My name is ${name} and I am ${age} years old`;

console.log(message);
// My name is JIHUN and I am 29 years old
```

기존 문자열 연결 방식

```js
const name = "JIHUN";
const age = 29;

const message = "My name is " + name + " and I am " + age + " years old";
```

Template Literals 사용

```js
const message = `My name is ${name} and I am ${age} years old`;
```

Template Literals를 사용하면 문자열 연결을 더 간결하고 읽기 쉽게 작성할 수 있음

## Expressions inside `${}`

`${}` 안에는 변수뿐만 아니라 JavaScript 표현식도 작성할 수 있음

```js
const a = 10;
const b = 20;

console.log(`${a} + ${b} = ${a + b}`);
// 10 + 20 = 30
```

함수의 반환값도 사용할 수 있음

```js
function getName() {
  return "JIHUN";
}

console.log(`Hello, ${getName()}`);
// Hello, JIHUN
```

조건 연산자도 사용할 수 있음

```js
const isLoggedIn = true;

const message = `User is ${isLoggedIn ? "logged in" : "logged out"}`;

console.log(message);
// User is logged in
```

## Multi-line Strings

Template Literals를 사용하면 줄바꿈이 포함된 문자열을 쉽게 만들 수 있음

```js
const message = `Hello
My name is JIHUN
I am studying JavaScript`;

console.log(message);
```

결과

```text
Hello
My name is JIHUN
I am studying JavaScript
```

일반 문자열에서는 줄바꿈 문자인 `\n`을 사용해야 함

```js
const message = "Hello\nMy name is JIHUN\nI am studying JavaScript";

console.log(message);
```

## HTML-like Strings

Template Literals는 HTML 형태의 문자열을 만들 때도 편리함

```js
const name = "JIHUN";
const role = "backend";

const userItem = `
    <li>
        <strong>${name}</strong>
        <span>${role}</span>
    </li>
`;

console.log(userItem);
```

React의 JSX는 Template Literals와 다른 문법이지만, 변수와 표현식을 화면에 넣는다는 점에서 연결되는 부분이 있음

# Destructuring

Destructuring은 배열이나 객체의 값을 분해하여 변수에 할당하는 문법임

```text
Destructuring
-> 구조 분해 할당
```

배열과 객체에서 필요한 값을 더 간결하게 꺼낼 수 있음

## Array Destructuring

배열 구조 분해 할당은 배열의 요소를 순서대로 변수에 저장함

기존 방식

```js
const colors = ["red", "green", "blue"];

const firstColor = colors[0];
const secondColor = colors[1];

console.log(firstColor); // red
console.log(secondColor); // green
```

Array Destructuring 사용

```js
const colors = ["red", "green", "blue"];

const [firstColor, secondColor] = colors;

console.log(firstColor); // red
console.log(secondColor); // green
```

배열 구조 분해는 **요소의 순서**를 기준으로 값을 할당함

```js
const numbers = [10, 20, 30];

const [first, second, third] = numbers;

console.log(first); // 10
console.log(second); // 20
console.log(third); // 30
```

## Skipping Array Elements

쉼표를 사용하면 필요하지 않은 배열 요소를 건너뛸 수 있음

```js
const colors = ["red", "green", "blue"];

const [firstColor, , thirdColor] = colors;

console.log(firstColor); // red
console.log(thirdColor); // blue
```

두 번째 요소인 `"green"`은 변수에 저장하지 않고 건너뜀

## Default Values in Array Destructuring

배열에 값이 없으면 기본값을 사용할 수 있음

```js
const colors = ["red"];

const [firstColor, secondColor = "green"] = colors;

console.log(firstColor); // red
console.log(secondColor); // green
```

배열에 실제 값이 있으면 기본값은 사용되지 않음

```js
const colors = ["red", "blue"];

const [firstColor, secondColor = "green"] = colors;

console.log(secondColor); // blue
```

기본값은 값이 `undefined`일 때 적용됨

```js
const colors = ["red", undefined];

const [firstColor, secondColor = "green"] = colors;

console.log(secondColor); // green
```

하지만 값이 `null`이면 기본값이 적용되지 않음

```js
const colors = ["red", null];

const [firstColor, secondColor = "green"] = colors;

console.log(secondColor); // null
```

## Swap Variables

Array Destructuring을 사용하면 두 변수의 값을 간단하게 교환할 수 있음

```js
let first = 10;
let second = 20;

[first, second] = [second, first];

console.log(first); // 20
console.log(second); // 10
```

## Object Destructuring

객체 구조 분해 할당은 객체의 프로퍼티를 같은 이름의 변수에 저장함

기존 방식

```js
const user = {
  name: "JIHUN",
  age: 29,
  role: "backend",
};

const name = user.name;
const age = user.age;

console.log(name);
console.log(age);
```

Object Destructuring 사용

```js
const user = {
  name: "JIHUN",
  age: 29,
  role: "backend",
};

const { name, age } = user;

console.log(name); // JIHUN
console.log(age); // 29
```

객체 구조 분해는 배열과 다르게 **프로퍼티 이름**을 기준으로 값을 가져옴

```js
const user = {
  name: "JIHUN",
  age: 29,
};

const { age, name } = user;

console.log(name); // JIHUN
console.log(age); // 29
```

작성 순서가 객체의 프로퍼티 순서와 달라도 상관없음

## Rename Object Properties

객체의 프로퍼티를 다른 변수 이름으로 저장할 수 있음

```js
const user = {
  name: "JIHUN",
  age: 29,
};

const { name: userName, age: userAge } = user;

console.log(userName); // JIHUN
console.log(userAge); // 29
```

문법

```text
propertyName: newVariableName
```

다음 코드에서는 `name`이라는 변수가 만들어지는 것은 아님

```js
const { name: userName } = user;

console.log(userName); // JIHUN

// ReferenceError
// console.log(name);
```

## Default Values in Object Destructuring

객체에 프로퍼티가 없으면 기본값을 사용할 수 있음

```js
const user = {
  name: "JIHUN",
};

const { name, role = "guest" } = user;

console.log(name); // JIHUN
console.log(role); // guest
```

객체에 실제 값이 있으면 기본값은 사용되지 않음

```js
const user = {
  name: "JIHUN",
  role: "backend",
};

const { role = "guest" } = user;

console.log(role); // backend
```

배열 구조 분해와 마찬가지로 값이 `undefined`일 때 기본값이 적용됨

```js
const user = {
  name: "JIHUN",
  role: undefined,
};

const { role = "guest" } = user;

console.log(role); // guest
```

값이 `null`이면 기본값은 적용되지 않음

```js
const user = {
  name: "JIHUN",
  role: null,
};

const { role = "guest" } = user;

console.log(role); // null
```

## Rename with Default Value

변수 이름 변경과 기본값을 함께 사용할 수 있음

```js
const user = {
  name: "JIHUN",
};

const { name: userName, role: userRole = "guest" } = user;

console.log(userName); // JIHUN
console.log(userRole); // guest
```

문법

```text
propertyName: newVariableName = defaultValue
```

## Nested Object Destructuring

중첩 객체의 프로퍼티도 구조 분해 할당으로 꺼낼 수 있음

```js
const response = {
  status: 200,
  data: {
    id: 1,
    name: "JIHUN",
    role: "backend",
  },
};

const {
  data: { name, role },
} = response;

console.log(name); // JIHUN
console.log(role); // backend
```

이 코드에서는 `data`라는 변수가 별도로 만들어지지 않음

```js
// ReferenceError
// console.log(data);
```

먼저 `data`를 꺼낸 뒤 다시 구조 분해할 수도 있음

```js
const { data } = response;
const { name, role } = data;

console.log(name); // JIHUN
console.log(role); // backend
```

입문 단계에서는 두 단계로 나누는 방식이 더 읽기 쉬울 수 있음

## Parameter Destructuring

함수의 매개변수에서 객체 구조 분해 할당을 사용할 수 있음

기존 방식

```js
function printUser(user) {
  console.log(`Name: ${user.name}`);
  console.log(`Role: ${user.role}`);
}
const user = {
  name: "JIHUN",
  role: "backend",
};

printUser(user);
```

Parameter Destructuring 사용

```js
function printUser({ name, role }) {
  console.log(`Name: ${name}`);
  console.log(`Role: ${role}`);
}

const user = {
  name: "JIHUN",
  role: "backend",
};

printUser(user);
```

함수에 객체가 전달되면 필요한 프로퍼티를 매개변수에서 바로 꺼냄

## Default Values in Parameter Destructuring

함수 매개변수에서도 기본값을 사용할 수 있음

```js
function printUser({ name, role = "guest" }) {
  console.log(`Name: ${name}`);
  console.log(`Role: ${role}`);
}

const user = {
  name: "JIHUN",
};

printUser(user);
```

결과

```text
Name: JIHUN
Role: guest
```

함수에 아무 인자도 전달되지 않는 상황까지 처리하려면 객체 자체에도 기본값을 줄 수 있음

```js
function printUser({ name = "Unknown", role = "guest" } = {}) {
  console.log(`Name: ${name}`);
  console.log(`Role: ${role}`);
}
printUser();
```

결과:

```text
Name: Unknown
Role: guest
```

## Array Parameter Destructuring

배열도 함수의 매개변수에서 구조 분해할 수 있음

```js
function printCoordinates([x, y]) {
  console.log(`x: ${x}`);
  console.log(`y: ${y}`);
}

const coordinates = [10, 20];

printCoordinates(coordinates);
```

결과:

```text
x: 10
y: 20
```

## Destructuring with Array Methods

객체 배열과 Array Methods를 함께 사용할 때 구조 분해 할당을 사용할 수 있음

```js
const users = [
  { id: 1, name: "JIHUN", role: "backend" },
  { id: 2, name: "KIM", role: "frontend" },
];

const names = users.map(({ name }) => name);

console.log(names);
// ["JIHUN", "KIM"]
```

`map()`의 Callback Function 매개변수에서 객체를 바로 구조 분해함

기존 방식

```js
const names = users.map((user) => user.name);
```

구조 분해 사용

```js
const names = users.map(({ name }) => name);
```

두 코드의 결과는 같음

## React-like Props Example

React 컴포넌트는 props 객체를 전달받음

일반적인 객체 매개변수 방식

```js
function UserCard(props) {
  return `${props.name} - ${props.role}`;
}

console.log(
  UserCard({
    name: "JIHUN",
    role: "backend",
  }),
);
```

Parameter Destructuring 사용

```js
function UserCard({ name, role }) {
  return `${name} - ${role}`;
}

console.log(
  UserCard({
    name: "JIHUN",
    role: "backend",
  }),
);
```

React에서는 다음과 같은 형태로 자주 사용함

```jsx
function UserCard({ name, role }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}
```

JSX는 React에서 학습 예정

## API-like Response Example

API 응답 객체에서 필요한 데이터만 꺼낼 수 있음

```js
const response = {
  status: 200,
  message: "success",
  data: {
    id: 1,
    name: "JIHUN",
    role: "backend",
  },
};

const { status, message, data } = response;
const { id, name, role } = data;

console.log(`Status: ${status}`);
console.log(`Message: ${message}`);
console.log(`User: ${id}, ${name}, ${role}`);
```

## Array Destructuring vs Object Destructuring

| 구분      | Array Destructuring       | Object Destructuring           |
| :-------- | :------------------------ | :----------------------------- |
| 기준      | 요소의 순서               | 프로퍼티 이름                  |
| 문법      | `const [a, b] = array`    | `const { name, age } = object` |
| 건너뛰기  | 쉼표 사용                 | 필요한 프로퍼티만 작성         |
| 이름 변경 | 변수 이름을 자유롭게 지정 | `property: newName` 사용       |
| 기본값    | `const [a = 0] = array`   | `const { age = 0 } = object`   |

## Important Points

- Array Destructuring은 요소의 순서가 중요함
- Object Destructuring은 프로퍼티 이름이 중요함
- 기본값은 값이 `undefined`일 때 적용됨
- 값이 `null`이면 기본값이 적용되지 않음
- 객체 프로퍼티의 이름을 변경할 때는 `property: newVariable` 문법을 사용함
- 함수 매개변수에서도 Destructuring을 사용할 수 있음
- Destructuring은 원본 배열이나 객체를 변경하지 않음
- React props와 API 응답 데이터를 다룰 때 자주 사용함

## 핵심 정리

- Template Literals는 백틱을 사용해 문자열을 작성함
- `${}`를 사용해 문자열 안에 변수나 표현식을 넣을 수 있음
- Template Literals는 여러 줄 문자열을 쉽게 작성할 수 있음
- Array Destructuring은 배열의 요소를 순서대로 변수에 저장함
- Object Destructuring은 프로퍼티 이름을 기준으로 값을 변수에 저장함
- 배열 요소를 건너뛸 때는 쉼표를 사용함
- 구조 분해한 값에 기본값을 지정할 수 있음
- 객체 프로퍼티를 다른 변수 이름으로 저장할 수 있음
- 함수 매개변수에서도 구조 분해 할당을 사용할 수 있음
- React에서는 props 객체를 구조 분해하는 방식이 자주 사용됨
