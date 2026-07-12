# Object Methods

## Object란?

Object는 여러 개의 값을 `key: value` 형태로 묶어서 관리하는 자료형

```js
const user = {
  name: "JIHUN",
  age: 29,
  role: "backend",
};
```

위 객체에서

```text
name, age, role     -> key 또는 property name
JIHUN, 29, backend  -> value
```

## Object Property Access

객체의 프로퍼티에 접근하는 방법은 두 가지

- Dot Notation
- Bracket Notation

## Dot Notation

점 표기법은 객체 이름 뒤에 `.`과 프로퍼티 이름을 작성하는 방법

```js
const user = {
  name: "JIHUN",
  age: 29,
};

console.log(user.name); // JIHUN
console.log(user.age); // 29
```

- 프로퍼티 이름이 정해져 있을 때 사용하기 편함
- 코드가 짧고 읽기 쉬움
- 일반적인 프로퍼티 접근에서는 Dot Notation을 주로 사용함

## Bracket Notation

대괄호 표기법은 객체 이름 뒤에 `["property"]`를 작성하는 방법

```js
const user = {
  name: "JIHUN",
  age: 29,
};

console.log(user["name"]); // JIHUN
console.log(user["age"]); // 29
```

대괄호 안에는 문자열이나 프로퍼티 이름을 계산할 수 있는 표현식을 작성할 수 있음

```js
const user = {
  name: "JIHUN",
  age: 29,
};

console.log(user["name"]); // 문자열 사용

const propertyName = "name";

console.log(user[propertyName]); // 변수 사용
```

다음과 같이 작성하면 `"name"`이라는 문자열이 아니라 `name`이라는 변수를 찾음

```js
const propertyName = "name";

console.log(user[propertyName]); // JIHUN
```

## Dot Notation vs Bracket Notation

```js
const user = {
  name: "JIHUN",
  age: 29,
};

console.log(user.name);
console.log(user["name"]);
```

두 코드는 같은 값을 반환함

| Notation         | Example        | 사용 시점                        |
| :--------------- | :------------- | :------------------------------- |
| Dot Notation     | `user.name`    | 프로퍼티 이름이 고정되어 있을 때 |
| Bracket Notation | `user["name"]` | 프로퍼티 이름이 변수로 정해질 때 |

## Computed Property Access

프로퍼티 이름을 변수로 가지고 있을 때는 Bracket Notation을 사용해야 함

```js
const user = {
  name: "JIHUN",
  age: 29,
};

const property = "name";

console.log(user[property]); // JIHUN
```

다음 코드는 `property` 변수의 값을 사용하지 않음

```js
console.log(user.property);
```

- `user.property`는 실제로 `"property"`라는 이름의 프로퍼티를 찾기 때문

## Add a Property

객체를 만든 뒤 새로운 프로퍼티를 추가할 수 있음

```js
const user = {
  name: "JIHUN",
};

user.age = 29;
user["role"] = "backend";

console.log(user);
// { name: "JIHUN", age: 29, role: "backend" }
```

## Update a Property

이미 존재하는 프로퍼티에 새로운 값을 할당하면 값이 수정됨

```js
const user = {
  name: "JIHUN",
  age: 29,
};

user.name = "KIM";
user["age"] = 30;

console.log(user);
// { name: "KIM", age: 30 }
```

객체가 `const`로 선언되어 있어도 내부 프로퍼티는 수정할 수 있음

```js
const user = {
  name: "JIHUN",
};

user.name = "KIM";
```

하지만 객체 변수 자체를 다른 객체로 재할당할 수는 없음

```js
const user = {
  name: "JIHUN",
};

// TypeError
// user = { name: "KIM" };
```

## Delete a Property

`delete` 연산자를 사용하면 객체의 프로퍼티를 삭제할 수 있음

```js
const user = {
  name: "JIHUN",
  age: 29,
};

delete user.age;

console.log(user);
// { name: "JIHUN" }
```

## Object.keys()

`Object.keys()`는 객체의 모든 key를 배열로 반환함

```js
const user = {
  name: "JIHUN",
  age: 29,
  role: "backend",
};

const keys = Object.keys(user);

console.log(keys);
// ["name", "age", "role"]
```

반환값은 배열이므로 Array Methods를 사용할 수 있음

```js
Object.keys(user).forEach((key) => {
  console.log(key);
});
```

## Object.values()

`Object.values()`는 객체의 모든 value를 배열로 반환

```js
const user = {
  name: "JIHUN",
  age: 29,
  role: "backend",
};

const values = Object.values(user);

console.log(values);
// ["JIHUN", 29, "backend"]
```

```js
Object.values(user).forEach((value) => {
  console.log(value);
});
```

## Object.entries()

`Object.entries()`는 객체의 key와 value를 배열의 쌍으로 반환함

```js
const user = {
  name: "JIHUN",
  age: 29,
  role: "backend",
};

const entries = Object.entries(user);
console.log(entries);
```

결과:

```text
[
  ["name", "JIHUN"],
  ["age", 29],
  ["role", "backend"]
]
```

각 요소는 `[key, value]` 형태의 배열

```js
Object.entries(user).forEach((entry) => {
  console.log(entry);
});
```

구조 분해 할당을 사용하면 key와 value를 바로 꺼낼 수 있음

```js
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

## Object.keys(), values(), entries() 비교

```js
const user = {
  name: "JIHUN",
  age: 29,
};
```

```js
console.log(Object.keys(user));
// ["name", "age"]

console.log(Object.values(user));
// ["JIHUN", 29]

console.log(Object.entries(user));
// [["name", "JIHUN"], ["age", 29]]
```

| Method             | 반환하는 값         |
| :----------------- | :------------------ |
| `Object.keys()`    | key 배열            |
| `Object.values()`  | value 배열          |
| `Object.entries()` | `[key, value]` 배열 |

## Property Existence with `in`

`in` 연산자는 객체에 특정 프로퍼티가 존재하는지 확인함

```js
const user = {
  name: "JIHUN",
  age: 29,
};
console.log("name" in user); // true
console.log("role" in user); // false
```

결과는 `boolean` 값
프로퍼티 값이 `undefined`여도 프로퍼티가 존재하면 `true` 반환

```js
const user = {
  name: undefined,
};

console.log("name" in user); // true
```

## Object.hasOwn()

`Object.hasOwn()`은 해당 객체가 직접 가지고 있는 프로퍼티인지 확인함

```js
const user = {
  name: "JIHUN",
  age: 29,
};

console.log(Object.hasOwn(user, "name")); // true
console.log(Object.hasOwn(user, "role")); // false
```

```text
Object.hasOwn(object, propetyName)
```

- 프로퍼티가 객체에 직접 존재하면 `true`
- 존재하지 않으면 `false`

## `in` vs Object.hasOwn()

```js
const user = {
  name: "JIHUN",
};

console.log("name" in user); // true
console.log(Object.hasOwn(user, "name")); // true
```

일반 객체에서는 결과가 같아 보일 수 있음

차이점

- `in`은 상속받은 프로퍼티까지 확인
- `Object.hasOwn()`은 객체가 직접 가진 프로퍼티만 확인함

객체 자신의 프로퍼티만 확인하려면 `Object.hasOwn()`을 사용하는 것이 명확함

## Object Iteration with Object.keys()

```js
const user = {
  name: "JIHUN",
  age: 29,
  role: "backend",
};

Object.keys(user).forEach((key) => {
  console.log(key, user[key]);
});
```

결과:

```text
name JIHUN
age 29
role backend
```

`key`는 문자열이기 때문에 값을 가져올 때 Bracket Notation을 사용함

```js
user[key];
```

다음처럼 작성하면 안 됨

```js
user.key;
```

`user.key`는 `"key"`라는 이름의 프로퍼티를 찾기 때문

## Object Iteration with Object.entries()

key와 value가 모두 필요할 때는 `Object.entries()`가 편리함

```js
const user = {
  name: "JIHUN",
  age: 29,
  role: "backend",
};

Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

결과:

```text
name: JIHUN
age: 29
role: backend
```

## Object with Array Methods

`Object.keys()`, `Object.values()`, `Object.entries()`는 배열을 반환하므로 Array Methods와 함께 사용할 수 있음

```js
const scores = {
  java: 90,
  spring: 85,
  javascript: 80,
};

const highScores = Object.entries(scores).filter(
  ([language, score]) => score >= 85,
);

console.log(highScores);
// [["java", 90], ["spring", 85]]
```

이 코드에서 `language`를 사용하지 않는다면 관례적으로 `_`를 사용할 수도 있다.

```js
const highScores = Object.entries(scores).filter(([_, score]) => score >= 85);
```

## Practical Example

API 응답처럼 객체 데이터를 다룰 수 있음

```js
const user = {
  id: 1,
  name: "JIHUN",
  email: "jihun@example.com",
  role: "backend",
};

Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

## Array of Objects

실무와 React에서는 객체 하나보다 객체 배열을 자주 다룸

```js
const users = [
  { id: 1, name: "JIHUN", role: "backend" },
  { id: 2, name: "KIM", role: "frontend" },
  { id: 3, name: "LEE", role: "backend" },
];
```

특정 객체를 찾을 때

```js
const foundUser = users.find((user) => user.id === 2);

console.log(foundUser);
// { id: 2, name: "KIM", role: "frontend" }
```

특정 조건의 객체만 추출할 때

```js
const backendUsers = users.filter((user) => user.role === "backend");

console.log(backendUsers);
```

객체 배열을 다른 형태로 변환할 때

```js
const names = users.map((user) => user.name);
console.log(names);
// ["JIHUN", "KIM", "LEE"]
```

## React에서 Object가 중요한 이유

React에서는 다음과 같은 데이터를 객체로 관리하는 경우가 많음

```js
const user = {
  name: "JIHUN",
  email: "jihun@example.com",
};
```

또한 서버로부터 객체 배열 형태의 데이터를 자주 받음

```js
const posts = [
  { id: 1, title: "First Post" },
  { id: 2, title: "Second Post" },
];
```

React에서는 `map()`을 사용해 객체 배열을 화면에 렌더링할 수 있음

```js
const titles = posts.map((post) => post.title);

console.log(titles);
// ["First Post", "Second Post"]
```

## 핵심 정리

- 객체는 데이터를 `key: value` 형태로 관리함
- Dot Notation은 프로퍼티 이름이 고정되어 있을 때 사용함
- Bracket Notation은 프로퍼티 이름이 변수나 표현식으로 결정될 때 사용함
- `Object.keys()`는 key 배열을 반환함
- `Object.values()`는 value 배열을 반환함
- `Object.entries()`는 `[key, value]` 형태의 배열을 반환함
- `in`은 상속받은 프로퍼티를 포함하여 프로퍼티의 존재 여부를 확인함
- `Object.hasOwn()`은 객체가 직접 가진 프로퍼티인지 확인함
- `Object.keys()`, `Object.values()`, `Object.entries()`의 반환값에는 Array Methods를 사용할 수 있음
- React와 API 응답에서는 객체와 객체 배열을 자주 다룸
