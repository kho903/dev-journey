# Spread Syntax and Rest Parameters

## `...` 문법

JavaScript의 `...`는 사용하는 위치와 목적에 따라 두 가지 역할을 함

```text
Spread Syntax
-> 배열, 객체 등의 값을 펼침

Rest Syntax
-> 여러 값을 하나로 모음
```

같은 `...` 기호를 사용하지만 동작 방향은 반대임

```js
const numbers = [10, 20, 30];

// Spread: 배열의 값을 펼침
console.log(...numbers);
// 10 20 30
```

```js
function printNumbers(...numbers) {
  console.log(...numbers);
  // 10 20 30
}
```

```js
function printNumbers(...numbers) {
  // Rest: 전달받은 여러 값을 하나의 배열로 모음
  console.log(numbers);
}

printNumbers(10, 20, 30);
// [10, 20, 30]
```

# Spread Syntax

## Spread Syntax란?

Spread Syntax는 배열, 문자열의 요소를 펼치거나, 객체의 프로퍼티를 새로운 객체에 복사하는 문법임

```js
const numbers = [10, 20, 30];

console.log(...numbers);
// 10 20 30
```

다음 코드는 배열의 요소를 각각 전달함

```js
console.log(...numbers);
// 10 20 30
```

## Spread Syntax with Arrays

배열 안에서 Spread Syntax를 사용하면 기존 배열의 요소를 새로운 배열 안에 펼칠 수 있음

```js
const numbers = [10, 20, 30];

const newNumbers = [...numbers];

console.log(newNumbers);
// [10, 20, 30]
```

다음 두 코드는 비슷한 결과를 만듦

```js
const newNumbers1 = [numbers[0], numbers[1], numbers[2]];
const newNumbers2 = [...numbers];

console.log(newNumbers1);
console.log(newNumbers2);
```

Spread Syntax를 사용하면 배열의 요소 수를 직접 알지 못해도 모든 요소를 펼칠 수 있음

## Copying Arrays

Spread Syntax를 사용하여 배열을 복사할 수 있음

```js
const original = [10, 20, 30];
const copied = [...original];

console.log(original);
// [10, 20, 30]

console.log(copied);
// [10, 20, 30]
```

두 배열은 같은 요소를 가지고 있지만 서로 다른 배열임

```js
console.log(original === copied);
// false
```

복사한 배열에 요소를 추가하거나 삭제해도 원본 배열 자체는 변경되지 않음
단, 배열 내부에 객체나 배열이 있다면 해당 중첩 값의 참조는 공유될 수 있음

```js
const original = [10, 20, 30];
const copied = [...original];

copied.push(40);

console.log(original);
// [10, 20, 30]

console.log(copied);
// [10, 20, 30, 40]
```

## Adding Elements while Copying Arrays

기존 배열을 복사하면서 새로운 요소를 앞이나 뒤에 추가할 수 있음

```js
const numbers = [20, 30];

const newNumbers = [10, ...numbers, 40];

console.log(newNumbers);
// [10, 20, 30, 40]
```

Spread Syntax의 위치에 따라 요소가 들어가는 위치도 달라짐

```js
const numbers = [20, 30];

const addedFirst = [10, ...numbers];
const addedLast = [...numbers, 40];

console.log(addedFirst);
// [10, 20, 30]

console.log(addedLast);
// [20, 30, 40]
```

## Merging Arrays

여러 배열을 하나의 새로운 배열로 합칠 수 있음

```js
const frontend = ["HTML", "CSS", "JavaScript"];
const backend = ["Java", "Spring"];

const skills = [...frontend, ...backend];

console.log(skills);
// ["HTML", "CSS", "JavaScript", "Java", "Spring"]
```

배열의 순서는 Spread Syntax를 작성한 순서를 따름

```js
const first = [1, 2];
const second = [3, 4];

console.log([...first, ...second]);
// [1, 2, 3, 4]

console.log([...second, ...first]);
// [3, 4, 1, 2]
```

## Spread Syntax in Function Calls

함수를 호출할 때 배열의 요소를 각각의 인자로 전달할 수 있음

```js
function add(a, b, c) {
  return a + b + c;
}

const numbers = [10, 20, 30];

console.log(add(...numbers));
// 60
```

다음 코드와 같은 의미임

```js
console.log(add(numbers[0], numbers[1], numbers[2]));
```

Spread Syntax를 사용하면 배열의 요소를 함수 인자로 간결하게 전달할 수 있음

## Spread Syntax with `Math.max()`

`Math.max()`는 배열 자체를 인자로 받는 것이 아니라 여러 숫자를 각각의 인자로 받음

```js
const numbers = [10, 50, 30];

console.log(Math.max(numbers));
// NaN
```

Spread Syntax를 사용하면 배열의 요소를 각각 전달할 수 있음

```js
const numbers = [10, 50, 30];

console.log(Math.max(...numbers));
// 50
```

실제로는 다음과 비슷하게 호출됨

```js
console.log(Math.max(10, 50, 30));
// 50
```

## Spread Syntax with Strings

문자열은 반복 가능한 값이므로 배열 안에서 펼칠 수 있음

```js
const word = "JavaScript";

const letters = [...word];

console.log(letters);
// ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]
```

# Object Spread Syntax

## Spread Syntax with Objects

객체 안에서 Spread Syntax를 사용하면 객체의 프로퍼티를 새로운 객체에 복사할 수 있음

```js
const user = {
  name: "JIHUN",
  age: 29,
};

const copiedUser = {
  ...user,
};

console.log(copiedUser);
// { name: "JIHUN", age: 29 }
```

원본 객체와 복사된 객체는 서로 다른 객체임

```js
console.log(user === copiedUser);
// false
```

## Copying Objects

객체를 복사하면서 새로운 프로퍼티를 추가할 수 있음

```js
const user = {
  name: "JIHUN",
  age: 29,
};

const updatedUser = {
  ...user,
  role: "backend",
};

console.log(updatedUser);
// {
//   name: "JIHUN",
//   age: 29,
//   role: "backend"
// }
```

원본 객체는 변경되지 않음

```js
console.log(user);
// {
//   name: "JIHUN",
//   age: 29
// }
```

## Updating Object Properties

기존 객체를 복사하면서 특정 프로퍼티의 값을 변경할 수 있음

```js
const user = {
  name: "JIHUN",
  age: 29,
  role: "guest",
};

const updatedUser = {
  ...user,
  role: "backend",
};

console.log(updatedUser);
/*{
  name: "JIHUN",
  age: 29,
  role: "backend"
}
*/
```

`...user`가 먼저 실행되어 기존 프로퍼티가 복사되고, 뒤에 작성한 `role`이 기존 값을 덮어씀

## Object Property Overwrite Order

객체를 병합할 때 같은 이름의 프로퍼티가 있으면 나중에 작성된 값이 이전 값을 덮어씀

```js
const user = {
  name: "JIHUN",
  role: "guest",
};

const updatedUser = {
  ...user,
  role: "backend",
};

console.log(updatedUser.role);
// backend
```

작성 순서를 반대로 하면 결과가 달라짐

```js
const user = {
  name: "JIHUN",
  role: "guest",
};

const updatedUser = {
  role: "backend",
  ...user,
};

console.log(updatedUser.role);
// guest
```

이 코드에서는 `role: "backend"`가 먼저 작성되지만, 뒤의 `...user`가 `role: "guest"`로 다시 덮어씀

```text
나중에 작성된 프로퍼티가 최종값이 됨
```

## Merging Objects

여러 객체의 프로퍼티를 하나의 새로운 객체로 합칠 수 있음

```js
const personalInfo = {
  name: "JIHUN",
  age: 29,
};

const jobInfo = {
  role: "backend",
  language: "Java",
};

const user = {
  ...personalInfo,
  ...jobInfo,
};

console.log(user);
/*
{
  name: "JIHUN",
  age: 29,
  role: "backend",
  language: "Java"
}
*/
```

같은 프로퍼티 이름이 있다면 뒤에 펼친 객체의 값이 사용됨

```js
const first = {
  name: "JIHUN",
  role: "guest",
};

const second = {
  role: "backend",
};

const result = {
  ...first,
  ...second,
};

console.log(result);
/*
{
  name: "JIHUN",
  role: "backend"
}
*/
```

# Shallow Copy

## Shallow Copy란?

Spread Syntax를 사용한 배열과 객체 복사는 Shallow Copy임

```text
Shallow Copy
-> 얕은 복사
```

Shallow Copy는 최상위 배열이나 객체는 새로 생성하지만, 내부에 있는 중첩 객체나 배열까지 완전히 새로 복사하지는 않음

## Shallow Copy with Nested Objects

```js
const original = {
  name: "JIHUN",
  address: {
    city: "Seoul",
  },
};

const copied = {
  ...original,
};
```

최상위 객체는 서로 다름

```js
console.log(original === copied);
// false
```

하지만 중첩된 `address` 객체는 같은 객체를 참조함

```js
console.log(original.address === copied.address);
// true
```

복사본의 중첩 객체를 수정하면 원본에도 영향을 줌

```js
copied.address.city = "Busan";

console.log(original.address.city);
// Busan

console.log(copied.address.city);
// Busan
```

## Copying Nested Objects

중첩 객체도 새로 복사하려면 해당 객체에도 Spread Syntax를 사용해야 함

```js
const original = {
  name: "JIHUN",
  address: {
    city: "Seoul",
  },
};

const copied = {
  ...original,
  address: {
    ...original.address,
  },
};

copied.address.city = "Busan";

console.log(original.address.city);
// Seoul

console.log(copied.address.city);
// Busan
```

현재 예제에서는 `address`까지 새 객체로 복사됨

하지만 중첩 구조가 더 깊다면 각 단계마다 별도로 복사해야 함

## Shallow Copy with Nested Arrays

배열도 같은 특징을 가짐

```js
const original = [
  {
    id: 1,
    name: "JIHUN",
  },
];

const copied = [...original];

console.log(original === copied);
// false

console.log(original[0] === copied[0]);
// true
```

복사된 배열은 새로운 배열이지만, 배열 안의 객체는 같은 객체를 참조함

```js
copied[0].name = "KIM";

console.log(original[0].name);
// KIM
```

배열 안의 객체까지 새로 복사하려면 `map()`과 Spread Syntax를 함께 사용할 수 있음

```js
const copied = original.map((user) => ({
  ...user,
}));

copied[0].name = "KIM";

console.log(original[0].name);
// JIHUN

console.log(copied[0].name);
// KIM
```

# Rest Parameters

## Rest Parameters란?

Rest Parameters는 함수에 전달된 여러 인자를 하나의 배열로 모으는 문법임

```js
function printNumbers(...numbers) {
  // Rest: 전달받은 인자를 배열로 모음
  console.log(numbers);

  // Spread: 배열의 요소를 각각 펼침
  console.log(numbers);
}

printNumbers(10, 20, 30);
// [10, 20, 30]
// 10, 20, 30
```

```text
Spread
-> 값을 펼침

Rest
-> 값을 모음
```

## Rest Parameters with Multiple Arguments

함수에 전달되는 인자의 개수가 정해져 있지 않을 때 사용할 수 있음

```js
function sum(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}

console.log(sum(10, 20));
// 30

console.log(sum(10, 20, 30, 40));
// 100
```

`numbers`는 실제 배열이므로 Array Methods를 사용할 수 있음

```js
function getEvenNumbers(...numbers) {
  return numbers.filter((number) => number % 2 === 0);
}

console.log(getEvenNumbers(1, 2, 3, 4, 5, 6));
// [2, 4, 6]
```

## Regular Parameters with Rest Parameters

일반 매개변수와 Rest Parameters를 함께 사용할 수 있음

```js
function printUser(name, ...skills) {
  console.log(`Name: ${name}`);
  console.log("Skills:", skills);
}

printUser("JIHUN", "Java", "Spring", "JavaScript);
```

결과

```text
Name: JIHUN
Skills: ["Java", "Spring", "JavaScript"]
```

첫 번째 인자는 `name`에 할당되고, 나머지 인자는 모두 `skills` 배열에 저장됨

## Rest Parameter Rules

Rest Parameter는 반드시 마지막 매개변수여야 함

정상

```js
function printUser(name, ...skills) {
  console.log(name);
  console.log(skills);
}
```

잘못된 예

```js
// SyntaxError
// function printUser(...skills, name) {}
```

Rest Parameter 뒤에는 다른 매개변수를 작성할 수 없음

함수 하나에는 Rest Parameter를 하나만 사용할 수 있음

```js
// SyntaxError
// function example(...first, ...second) {}
```

Rest Parameter 뒤에는 쉼표를 작성할 수 없음

```js
// SyntaxError
// function example(...numbers,) {}
```

## Rest Parameters vs `arguments`

일반 함수에서는 `arguments` 객체로 전달받은 인자에 접근할 수 있음

```js
function printArguments() {
  console.log(arguments);
}

printArguments(10, 20, 30);
```

하지만 `arguments`는 실제 배열이 아님

```js
function printArguments() {
  console.log(Array.isArray(arguments));
}

printArguments(10, 20, 30);
// false
```

Rest Parameter는 실제 배열임

```js
function printNumbers(...numbers) {
  console.log(Array.isArray(numbers));
}

printNumbers(10, 20, 30);
// true
```

따라서 Rest Parameter에는 `map()`, `filter()`, `reduce()` 등의 Array Methods를 바로 사용할 수 있음

```js
function doubleNumbers(...numbers) {
  return numbers.map((number) => number * 2);
}

console.log(doubleNumbers(10, 20, 30));
// [20, 40, 60]
```

화살표 함수에는 자체 `arguments` 객체가 없지만 Rest Parameters는 사용할 수 있음

```js
const sum = (...numbers) => {
  return numbers.reduce((total, number) => total + number, 0);
};

console.log(sum(10, 20, 30));
// 60
```

새로운 코드에서는 일반적으로 `arguments`보다 Rest Parameters가 더 명확하고 사용하기 편리함

# Rest Syntax in Destructuring

## Rest Syntax in Array Destructuring

배열 구조 분해에서 Rest Syntax를 사용하면 남은 요소를 하나의 배열로 모을 수 있음

```js
const numbers = [10, 20, 30, 40, 50];
const [first, second, ...restNumbers] = numbers;

console.log(first);
// 10
console.log(second);
// 20
console.log(restNumbers);
// [30, 40, 50]
```

Rest Syntax는 구조 분해의 마지막 위치에 작성해야 함

정상

```js
const [first, ...restNumbers] = numbers;
```

잘못된 예

```js
// SyntaxError
// const [...restNumbers, last] = numbers;
```

## Rest Syntax in Object Destructuring

객체 구조 분해에서 Rest Syntax를 사용하면 선택하지 않은 나머지 프로퍼티를 새로운 객체로 모을 수 있음

```js
const user = {
  id: 1,
  name: "JIHUN",
  age: 29,
  role: "backend",
};

const { id, ...userInfo } = user;
console.log(id);
// 1

console.log(userInfo);
/*
{
  name: "JIHUN",
  age: 29,
  role: "backend"
}
*/
```

`id`는 별도의 변수에 저장되고, 나머지 프로퍼티는 `userInfo` 객체에 저장됨

객체의 Rest Syntax도 마지막에 작성해야 함

```js
const { name, ...otherInfo } = user;
```

## Removing a Property without Changing the Original Object

객체 구조 분해와 Rest Syntax를 사용하면 특정 프로퍼티를 제외한 새로운 객체를 만들 수 있음

이 방법은 새로운 객체에서 특정 프로퍼티를 제외하는 용도임

단, 민감한 정보는 클라이언트에 전달된 후 제거하는 것이 아니라 서버가 API 응답을 만들 때부터 포함하지 않는 것이 중요함

```js
const user = {
  id: 1,
  name: "JIHUN",
  password: "1234",
  role: "backend",
};

const { password, ...safeUser } = user;

console.log(safeUser);
/*
{
  id: 1,
  name: "JIHUN",
  role: "backend"
}
*/
```

원본 객체는 변경되지 않음

```js
console.log(user);
/*
{
  id: 1,
  name: "JIHUN",
  password: "1234",
  role: "backend"
}
*/
```

API 응답에서 민감한 값을 제외하거나, 필요한 프로퍼티를 분리할 때 사용할 수 있음

# Spread vs Rest

Spread Syntax와 Rest Syntax는 모두 `...`를 사용하지만 역할이 다름

| 구분      | Spread Syntax                | Rest Syntax                        |
| :-------- | :--------------------------- | :--------------------------------- |
| 역할      | 값을 펼침                    | 여러 값을 하나로 모음              |
| 동작 방향 | 하나에서 여러 개로           | 여러 개에서 하나로                 |
| 배열      | 배열 요소를 펼침             | 남은 요소를 배열로 모음            |
| 객체      | 객체 프로퍼티를 펼침         | 남은 프로퍼티를 객체로 모음        |
| 함수      | 배열 요소를 함수 인자로 전달 | 여러 함수 인자를 배열로 모음       |
| 판단 기준 | 값을 사용하는 위치           | 값을 선언하거나 구조 분해하는 위치 |

Spread Syntax:

```js
const numbers = [10, 20, 30];

console.log(...numbers);
// 10 20 30
```

Rest Parameters:

```js
function printNumbers(...numbers) {
  console.log(numbers);
}

printNumbers(10, 20, 30);
// [10, 20, 30]
```

Rest Syntax in Destructuring:

```js
const [first, ...restNumbers] = [10, 20, 30];

console.log(first);
// 10

console.log(restNumbers);
// [20, 30]
```

# React-like Examples

## Updating an Array

React에서는 기존 배열을 직접 수정하지 않고 새로운 배열을 만드는 방식이 자주 사용됨

```js
const users = [
  { id: 1, name: "JIHUN" },
  { id: 2, name: "KIM" },
];

const newUser = {
  id: 3,
  name: "LEE",
};

const updatedUsers = [...users, newUser];
console.log(updatedUsers);
```

기존 배열 `users`는 그대로 유지되고 `updatedUsers`라는 새로운 배열이 생성됨

## Updating an Object

객체 상태를 변경할 때도 기존 객체를 복사한 후 필요한 프로퍼티를 덮어쓰는 방식이 자주 사용됨

```js
const user = {
  name: "JIHUN",
  age: 29,
  role: "guest",
};

const updatedUser = {
  ...user,
  role: "backend",
};

console.log(updatedUser);
/*
{
  name: "JIHUN",
  age: 29,
  role: "backend"
}
*/
```

## Updating a Nested Object

중첩 객체를 변경하려면 바깥 객체와 변경할 중첩 객체를 각각 복사해야 함

```js
const user = {
  name: "JIHUN",
  address: {
    city: "Seoul",
    country: "Korea",
  },
};

const updatedUser = {
  ...user,
  address: {
    ...user.address,
    city: "Busan",
  },
};

console.log(updatedUser);
// {
//   name: "JIHUN",
//   address: {
//     city: "Busan",
//     country: "Korea"
//   }
// }
```

`user.address`를 펼치지 않고 다음처럼 작성하면 기존의 `country` 프로퍼티가 사라짐

```js
const updatedUser = {
  ...user,
  address: {
    city: "Busan",
  },
};
```

결과 :

```js
{
    name: "JIHUN",
    address: {
        city: "Busan"
    }
}
```

## Updating an Object inside an Array

객체 배열에서 특정 객체만 변경할 때 `map()`과 Spread Syntax를 함께 사용할 수 있음

```js
const users = [
  { id: 1, name: "JIHUN", role: "guest" },
  { id: 2, name: "KIM", role: "frontend" },
];

const updatedUsers = users.map((user) =>
  user.id === 1
    ? {
        ...user,
        role: "backend",
      }
    : user,
);
console.log(updatedUsers);
```

`id`가 `1`인 객체만 새로운 객체로 복사하면서 `role`을 변경함

# API-like Example

API 응답에서 필요한 프로퍼티와 나머지 프로퍼티를 분리할 수 있음

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

const { status, ...responseBody } = response;

console.log(status);

console.log(responseBody);
/*
{
  message: "success",
  data: {
    id: 1,
    name: "JIHUN",
    role: "backend"
  }
}
*/
```

API 데이터에 새로운 값을 추가하여 새로운 객체를 만들 수도 있음

```js
const user = {
  id: 1,
  name: "JIHUN",
  role: "backend",
};

const userWithStatus = {
  ...user,
  isActive: true,
};

console.log(userWithStatus);
/*
{
  id: 1,
  name: "JIHUN",
  role: "backend",
  isActive: true
}
*/
```

# Important Points

- Spread Syntax와 Rest Syntax는 모두 `...`를 사용함
- Spread Syntax는 배열이나 객체의 값을 펼침
- Rest Syntax는 여러 값을 배열이나 객체로 모음
- 배열 Spread는 배열의 요소를 펼침
- 객체 Spread는 객체의 프로퍼티를 펼침
- Spread Syntax를 사용한 복사는 Shallow Copy임
- Shallow Copy에서는 중첩 객체나 배열의 참조가 공유될 수 있음
- 중첩 데이터를 독립적으로 변경하려면 해당 단계도 별도로 복사해야 함
- Rest Parameters는 여러 함수 인자를 실제 배열로 모음
- Rest Parameter는 반드시 마지막 매개변수여야 함
- Rest Parameters에는 Array Methods를 바로 사용할 수 있음
- 배열 구조 분해의 Rest Syntax는 남은 요소를 배열로 모음
- 객체 구조 분해의 Rest Syntax는 남은 프로퍼티를 객체로 모음
- React에서는 배열과 객체 상태를 직접 변경하지 않고 새로운 값을 만들 때 Spread Syntax를 자주 사용함

# 핵심정리

```js
// 배열 펼치기
const copied = [...original];
```

```js
// 배열 병합
const merged = [...first, ...second];
```

```js
// 객체 복사 및 프로퍼티 변경
const updatedUser = {
  ...user,
  role: "backend",
};
```

```js
// 여러 함수 인자를 배열로 모으기
function sum(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}
```

```js
// 배열의 나머지 요소 모으기
const [first, ...restNumbers] = numbers;
```

```js
// 객체의 나머지 프로퍼티 모으기
const { id, ...userInfo } = user;
```

```text
Spread
-> 펼치기

Rest
-> 모으기
```
