# JavaScript Modules

## JavaScript Module이란?

JavaScript Module은 코드를 여러 파일로 분리하고 필요한 값을 다른 파일에서 사용할 수 있도록 하는 기능임

```text
Module
→ 기능별로 분리된 JavaScript 파일
```

하나의 파일에 모든 코드를 작성하면 파일이 길어지고 관리하기 어려워질 수 있음

```js
// app.js

const users = [];
const products = [];

function login() {}
function logout() {}
function addUser() {}
function addProduct() {}
function removeProduct() {}
```

기능에 따라 파일을 나누면 코드의 역할이 명확해짐

```text
src/
├── auth.js
├── user.js
├── product.js
└── app.js
```

```text
auth.js
→ 로그인과 로그아웃

user.js
→ 회원 관련 기능

product.js
→ 상품 관련 기능

app.js
→ 각 모듈을 가져와 실행
```

---

## Why Modules Are Needed

Modules를 사용하면 다음과 같은 장점이 있음

- 기능별로 코드를 분리할 수 있음
- 파일의 역할이 명확해짐
- 필요한 코드만 가져와 사용할 수 있음
- 변수 이름 충돌을 줄일 수 있음
- 코드를 재사용하기 쉬워짐
- 테스트와 유지보수가 쉬워짐
- React 컴포넌트와 API 파일을 분리할 수 있음

예:

```text
src/
├── components/
│   ├── Header.jsx
│   └── UserCard.jsx
├── pages/
│   ├── Home.jsx
│   └── Login.jsx
├── api/
│   └── authApi.js
└── App.jsx
```

---

# Export

## `export`란?

`export`는 현재 파일의 변수, 함수, 클래스, 객체 등을 다른 파일에서 사용할 수 있도록 내보내는 문법임

```js
export const name = "JIHUN";
```

다른 파일에서는 `import`를 사용하여 가져올 수 있음

```js
import { name } from "./user.js";

console.log(name);
// JIHUN
```

---

# Named Export

## Named Export란?

Named Export는 내보낸 이름을 그대로 사용하여 가져오는 방식임

```js
export const name = "JIHUN";

export function greet() {
  return `Hello, ${name}`;
}
```

가져오는 파일:

```js
import { name, greet } from "./user.js";

console.log(name);
// JIHUN

console.log(greet());
// Hello, JIHUN
```

Named Export는 한 파일에서 여러 개 사용할 수 있음

```js
export const name = "JIHUN";
export const age = 29;
export const role = "backend";
```

---

## Export after Declaration

변수나 함수를 먼저 선언한 뒤 마지막에 한 번에 내보낼 수도 있음

```js
const name = "JIHUN";
const age = 29;

function greet() {
  return `Hello, ${name}`;
}

export { name, age, greet };
```

가져오는 방식은 동일함

```js
import { name, age, greet } from "./user.js";
```

---

## Named Export Must Use the Exported Name

Named Export를 가져올 때는 기본적으로 내보낸 이름과 같은 이름을 사용해야 함

`user.js`:

```js
export const userName = "JIHUN";
```

올바른 import:

```js
import { userName } from "./user.js";
```

잘못된 import:

```js
// SyntaxError
// import { name } from "./user.js";
```

`user.js`에서 `name`이라는 값을 내보내지 않았으므로 가져올 수 없음

---

# Import Aliases

## Named Import Renaming

`as`를 사용하면 Named Export를 다른 이름으로 가져올 수 있음

`user.js`:

```js
export const name = "JIHUN";
```

`app.js`:

```js
import { name as userName } from "./user.js";

console.log(userName);
// JIHUN
```

문법:

```text
import {
  exportedName as localName
} from "./module.js";
```

`name`은 원래 내보낸 이름이고, `userName`은 현재 파일에서 사용할 이름임

---

## Export Aliases

내보내는 시점에도 이름을 변경할 수 있음

```js
const name = "JIHUN";

export { name as userName };
```

가져오는 파일:

```js
import { userName } from "./user.js";
```

일반적으로는 원래 이름으로 export하고, 이름 충돌이 발생하는 import 파일에서 alias를 사용하는 경우가 많음

---

# Default Export

## `export default`란?

Default Export는 해당 모듈의 대표값 하나를 내보낼 때 사용하는 방식임

```js
const user = {
  name: "JIHUN",
  role: "backend",
};

export default user;
```

가져오는 파일:

```js
import user from "./user.js";

console.log(user);
// { name: "JIHUN", role: "backend" }
```

Default Export를 가져올 때는 중괄호를 사용하지 않음

```js
import user from "./user.js";
```

---

## Default Import Name

Default Export는 가져오는 파일에서 원하는 이름으로 사용할 수 있음

`user.js`:

```js
const user = {
  name: "JIHUN",
};

export default user;
```

`app.js`:

```js
import member from "./user.js";

console.log(member);
// { name: "JIHUN" }
```

다음 이름도 가능함

```js
import currentUser from "./user.js";
```

Default Export는 export된 이름을 기준으로 가져오는 것이 아니라 파일의 대표값을 가져오기 때문임

다만 파일의 내용과 관련된 이름을 사용하는 것이 읽기 좋음

---

## Default Export with Functions

함수를 Default Export로 내보낼 수 있음

```js
function greet(name) {
  return `Hello, ${name}`;
}

export default greet;
```

가져오는 파일:

```js
import greet from "./greet.js";

console.log(greet("JIHUN"));
// Hello, JIHUN
```

선언과 동시에 내보낼 수도 있음

```js
export default function greet(name) {
  return `Hello, ${name}`;
}
```

---

## One Default Export per Module

하나의 파일에서는 Default Export를 하나만 사용할 수 있음

잘못된 예:

```js
// SyntaxError

// export default function login() {}
// export default function logout() {}
```

Named Export는 여러 개 사용할 수 있지만 Default Export는 하나만 사용할 수 있음

---

# Named Export vs Default Export

| 구분      | Named Export              | Default Export                 |
| :-------- | :------------------------ | :----------------------------- |
| 개수      | 한 파일에서 여러 개 가능  | 한 파일에서 하나만 가능        |
| Export    | `export const name = ...` | `export default value`         |
| Import    | 중괄호 사용               | 중괄호 사용하지 않음           |
| 이름      | Export 이름과 일치해야 함 | 원하는 이름으로 가져올 수 있음 |
| 이름 변경 | `as` 사용                 | 가져오는 이름을 자유롭게 지정  |
| 용도      | 여러 기능이나 값을 제공   | 파일의 대표값을 제공           |

Named Export:

```js
export const name = "JIHUN";
export const age = 29;
```

```js
import { name, age } from "./user.js";
```

Default Export:

```js
const user = {
  name: "JIHUN",
  age: 29,
};

export default user;
```

```js
import user from "./user.js";
```

---

# Named Export and Default Export Together

한 파일에서 Named Export와 Default Export를 함께 사용할 수 있음

`calculator.js`:

```js
export const PI = 3.141592;

export function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

export default multiply;
```

가져오는 파일:

```js
import multiply, { PI, add } from "./calculator.js";

console.log(PI);
// 3.141592

console.log(add(10, 20));
// 30

console.log(multiply(10, 20));
// 200
```

Default Import를 먼저 작성하고, Named Import는 중괄호 안에 작성함

```js
import defaultValue, { namedValue1, namedValue2 } from "./module.js";
```

---

# Namespace Import

## Importing All Named Exports

`* as`를 사용하면 모듈의 모든 Named Export를 하나의 객체와 비슷한 형태로 가져올 수 있음

`calculator.js`:

```js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}
```

`app.js`:

```js
import * as calculator from "./calculator.js";

console.log(calculator.add(10, 20));
// 30

console.log(calculator.subtract(20, 10));
// 10

console.log(calculator.multiply(10, 20));
// 200
```

여기서 `calculator`는 Module Namespace Object임

```text
calculator.add
calculator.subtract
calculator.multiply
```

모듈에서 어떤 기능을 가져왔는지 명확하게 표시할 수 있다는 장점이 있음

---

# Module Scope

## 각 모듈은 독립적인 Scope를 가짐

JavaScript Module의 최상위 변수는 다른 모듈에 자동으로 노출되지 않음

`user.js`:

```js
const name = "JIHUN";
```

`app.js`:

```js
// ReferenceError
// console.log(name);
```

`name`을 다른 파일에서 사용하려면 반드시 export해야 함

```js
export const name = "JIHUN";
```

그리고 사용할 파일에서 import해야 함

```js
import { name } from "./user.js";
```

따라서 서로 다른 모듈에서 같은 변수 이름을 선언해도 충돌하지 않음

`user.js`:

```js
const name = "JIHUN";
```

`product.js`:

```js
const name = "Keyboard";
```

각 변수는 서로 다른 Module Scope에 존재함

---

## Modules Use Strict Mode

JavaScript Module은 자동으로 Strict Mode에서 실행됨

따라서 다음과 같이 선언하지 않은 변수에 값을 넣을 수 없음

```js
// ReferenceError
// userName = "JIHUN";
```

반드시 변수를 선언해야 함

```js
const userName = "JIHUN";
```

별도로 다음 문장을 작성할 필요가 없음

```js
"use strict";
```

---

# Imports Are Read-only Bindings

import한 변수는 가져온 파일에서 직접 재할당할 수 없음

`counter.js`:

```js
export let count = 0;

export function increase() {
  count += 1;
}
```

`app.js`:

```js
import { count, increase } from "./counter.js";

console.log(count);
// 0

// import한 binding에는 직접 재할당할 수 없음
// count = 10;

increase();

console.log(count);
// 1
```

Import는 단순히 처음 값만 복사하는 것이 아니라 원본 모듈의 값과 연결된 Live Binding임

원본 모듈에서 `count`가 변경되면 import한 파일에서도 변경된 값을 확인할 수 있음

하지만 import한 파일에서 직접 `count`를 재할당할 수는 없음

```text
원본 모듈
→ 값을 변경할 수 있음

가져온 모듈
→ import binding을 직접 재할당할 수 없음
```

---

## Imported Objects

객체를 import한 경우에도 import 변수 자체는 재할당할 수 없음

`user.js`:

```js
export const user = {
  name: "JIHUN",
};
```

`app.js`:

```js
import { user } from "./user.js";

// 재할당 불가능
// user = { name: "KIM" };
```

객체 내부 프로퍼티는 객체 자체의 규칙에 따라 변경될 수 있음

```js
user.name = "KIM";
```

하지만 여러 모듈이 같은 객체를 공유하면 예상하지 못한 변경이 발생할 수 있으므로, 일반적으로 import한 객체를 직접 변경하는 방식은 피하는 것이 좋음

---

# Side-effect Import

특정 값을 가져오지 않고 파일의 코드를 실행하기 위해 import할 수도 있음

`setup.js`:

```js
console.log("Application setup completed");
```

`app.js`:

```js
import "./setup.js";
```

실행 결과:

```text
Application setup completed
```

이 방식은 설정 코드, 전역 스타일, 초기화 코드 등을 실행할 때 사용될 수 있음

React에서는 CSS 파일을 가져올 때도 비슷한 형태를 사용함

```js
import "./App.css";
```

CSS 값을 JavaScript 변수로 가져오는 것이 아니라 해당 스타일 파일이 처리되도록 요청하는 방식임

---

# File Extension and Relative Paths

모듈 경로를 작성할 때 현재 파일을 기준으로 상대 경로를 사용할 수 있음

```text
./
→ 현재 폴더

../
→ 상위 폴더
```

같은 폴더:

```js
import { add } from "./calculator.js";
```

상위 폴더:

```js
import { add } from "../calculator.js";
```

하위 폴더:

```js
import { add } from "./utils/calculator.js";
```

브라우저와 순수 Node.js ES Module 환경에서는 일반적으로 파일 확장자를 작성함

```js
import { add } from "./calculator.js";
```

Vite와 같은 Bundler 환경에서는 확장자를 생략하는 코드도 자주 볼 수 있음

```js
import { add } from "./calculator";
```

현재 JavaScript Module 연습에서는 실행 환경의 차이를 줄이기 위해 확장자를 작성함

---

# Browser ES Modules

브라우저에서 JavaScript Module을 사용하려면 `<script>` 태그에 `type="module"`을 작성함

```html
<script type="module" src="./app.js"></script>
```

`app.js`:

```js
import { greet } from "./greet.js";

console.log(greet("JIHUN"));
```

`greet.js`:

```js
export function greet(name) {
  return `Hello, ${name}`;
}
```

일반적인 Script:

```html
<script src="./app.js"></script>
```

Module Script:

```html
<script type="module" src="./app.js"></script>
```

Module Script는 다음과 같은 특징이 있음

- 각 파일이 독립적인 Module Scope를 가짐
- 자동으로 Strict Mode를 사용함
- `import`와 `export`를 사용할 수 있음
- 기본적으로 지연 실행됨
- 로컬 파일을 직접 열기보다 개발 서버를 통해 실행하는 것이 안정적임

---

# Node.js ES Modules

Node.js에서 ES Modules를 사용하는 대표적인 방법은 두 가지임

## `.mjs` Extension

파일 확장자를 `.mjs`로 작성하면 ES Module로 처리됨

```text
calculator.mjs
app.mjs
```

`calculator.mjs`:

```js
export function add(a, b) {
  return a + b;
}
```

`app.mjs`:

```js
import { add } from "./calculator.mjs";

console.log(add(10, 20));
```

실행:

```bash
node app.mjs
```

---

## `"type": "module"`

`package.json`에 다음 설정을 추가하면 해당 패키지 범위의 `.js` 파일을 ES Module로 처리함

```json
{
  "type": "module"
}
```

이후 `.js` 파일에서 `import`와 `export`를 사용할 수 있음

`calculator.js`:

```js
export function add(a, b) {
  return a + b;
}
```

`app.js`:

```js
import { add } from "./calculator.js";

console.log(add(10, 20));
```

실행:

```bash
node app.js
```

현재 프로젝트 전체 설정을 변경하지 않고 Modules만 독립적으로 연습하려면 `.mjs` 확장자를 사용하는 방법이 간단함

---

# CommonJS와 ES Modules

Node.js에서는 기존에 CommonJS라는 모듈 시스템도 많이 사용됐음

CommonJS:

```js
const calculator = require("./calculator");

module.exports = calculator;
```

ES Modules:

```js
import calculator from "./calculator.js";

export default calculator;
```

| 구분        | CommonJS         | ES Modules             |
| :---------- | :--------------- | :--------------------- |
| 가져오기    | `require()`      | `import`               |
| 내보내기    | `module.exports` | `export`               |
| 대표 확장자 | `.cjs`           | `.mjs`                 |
| 웹 표준     | 아님             | 표준 JavaScript Module |
| React/Vite  | 일반적이지 않음  | 주로 사용              |

현재 학습에서는 React와 최신 JavaScript 환경에서 자주 사용하는 ES Modules를 중심으로 학습함

---

# React-like Module Examples

## React Component Export

React 컴포넌트를 파일별로 나누어 관리함

`UserCard.jsx`:

```jsx
function UserCard({ name, role }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

export default UserCard;
```

`App.jsx`:

```jsx
import UserCard from "./components/UserCard.jsx";

function App() {
  return <UserCard name="JIHUN" role="backend" />;
}

export default App;
```

컴포넌트 파일에서는 Default Export를 자주 사용함

---

## Named Export with API Functions

하나의 API 파일에서 여러 함수를 Named Export로 내보낼 수 있음

`authApi.js`:

```js
export async function loginMember(loginData) {
  // Login API request
}

export async function logoutMember() {
  // Logout API request
}

export async function getCurrentMember() {
  // Current member API request
}
```

사용하는 파일:

```js
import { loginMember, logoutMember, getCurrentMember } from "./api/authApi.js";
```

여러 관련 함수를 하나의 파일에서 제공할 때 Named Export를 사용할 수 있음

---

## React Hook Import

React 라이브러리에서도 Named Import를 사용함

```js
import { useEffect, useState } from "react";
```

`useEffect`와 `useState`는 React 패키지가 제공하는 Named Export임

React Router에서도 필요한 기능을 가져올 수 있음

```js
import { Link, Route, Routes } from "react-router-dom";
```

---

## CSS Import

React 프로젝트에서 CSS 파일은 Side-effect Import 형태로 가져옴

```js
import "./UserCard.css";
```

이 import는 JavaScript 변수나 함수를 가져오기 위한 것이 아니라 컴포넌트에 필요한 스타일을 포함하기 위한 것임

---

# Practical Folder Example

```text
src/
├── api/
│   └── authApi.js
├── components/
│   ├── Header.jsx
│   └── UserCard.jsx
├── pages/
│   ├── Home.jsx
│   └── Login.jsx
├── utils/
│   └── validation.js
├── App.jsx
└── main.jsx
```

`validation.js`:

```js
export function validateUserId(userId) {
  return /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/.test(userId);
}

export function validatePassword(password) {
  return password.length >= 8;
}
```

`Login.jsx`:

```jsx
import { validatePassword, validateUserId } from "../utils/validation.js";
```

`UserCard.jsx`:

```jsx
function UserCard({ name, role }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}

export default UserCard;
```

`App.jsx`:

```jsx
import UserCard from "./components/UserCard.jsx";
```

각 파일은 하나의 명확한 역할을 가지도록 분리하는 것이 중요함

---

# Common Errors

## Missing File Extension

순수 Node.js ES Module 환경에서는 파일 확장자가 필요함

잘못된 예:

```js
// Error
// import { add } from "./calculator";
```

수정:

```js
import { add } from "./calculator.js";
```

`.mjs` 파일이라면:

```js
import { add } from "./calculator.mjs";
```

---

## Missing Curly Braces

Named Export를 가져올 때는 중괄호가 필요함

`user.js`:

```js
export const name = "JIHUN";
```

잘못된 import:

```js
// 잘못된 의도로 작성한 코드
// import name from "./user.js";
```

올바른 import:

```js
import { name } from "./user.js";
```

---

## Adding Curly Braces to Default Import

Default Export는 중괄호 없이 가져옴

`UserCard.jsx`:

```jsx
export default UserCard;
```

잘못된 import:

```js
// Error
// import { UserCard } from "./UserCard.jsx";
```

올바른 import:

```js
import UserCard from "./UserCard.jsx";
```

---

## Wrong Named Export Name

`user.js`:

```js
export const userName = "JIHUN";
```

잘못된 import:

```js
// Error
// import { name } from "./user.js";
```

올바른 import:

```js
import { userName } from "./user.js";
```

Alias 사용:

```js
import { userName as name } from "./user.js";
```

---

## Reassigning an Imported Binding

`counter.js`:

```js
export let count = 0;
```

`app.js`:

```js
import { count } from "./counter.js";

// TypeError
// count = 10;
```

import한 binding에는 직접 값을 재할당할 수 없음

---

# Important Points

- JavaScript Module은 코드를 기능별 파일로 분리하는 방법임
- 다른 파일에서 사용할 값은 `export`해야 함
- 내보낸 값을 사용할 파일에서는 `import`해야 함
- Named Export는 한 파일에서 여러 개 사용할 수 있음
- Named Import는 기본적으로 Export된 이름과 일치해야 함
- `as`를 사용하면 Named Import의 이름을 변경할 수 있음
- Default Export는 한 파일에서 하나만 사용할 수 있음
- Default Import는 중괄호를 사용하지 않음
- Default Import의 이름은 가져오는 파일에서 자유롭게 정할 수 있음
- Named Export와 Default Export를 한 파일에서 함께 사용할 수 있음
- `* as`를 사용하면 모든 Named Export를 Namespace Object로 가져올 수 있음
- 각 Module은 독립적인 Scope를 가짐
- JavaScript Module은 자동으로 Strict Mode를 사용함
- import한 binding은 직접 재할당할 수 없음
- Import는 원본 모듈의 변경을 반영하는 Live Binding임
- 브라우저에서는 `<script type="module">`을 사용함
- Node.js에서는 `.mjs` 또는 `"type": "module"`을 사용할 수 있음
- React 컴포넌트는 파일별로 분리하고 import와 export로 연결함
- React Hook은 React 패키지에서 Named Import로 가져옴
- CSS 파일은 Side-effect Import 방식으로 가져올 수 있음

---

# 핵심 정리

Named Export:

```js
export const name = "JIHUN";
export function greet() {}
```

Named Import:

```js
import { name, greet } from "./user.js";
```

Import Alias:

```js
import { name as userName } from "./user.js";
```

Default Export:

```js
export default function UserCard() {}
```

Default Import:

```js
import UserCard from "./UserCard.js";
```

Named Export와 Default Export 함께 사용:

```js
import defaultValue, { namedValue1, namedValue2 } from "./module.js";
```

Namespace Import:

```js
import * as calculator from "./calculator.js";
```

Side-effect Import:

```js
import "./setup.js";
```

```text
export
→ 현재 파일의 값을 다른 파일에서 사용할 수 있도록 내보냄

import
→ 다른 파일이 내보낸 값을 현재 파일로 가져옴
```
