# React Fundamentals

## 1. React

React는 사용자 인터페이스를 만들기 위한 JavaScript Library

웹 화면을 여러 개의 작은 Component로 나누어 구성할 수 있음

```text
Page
├── Header
├── Main
│   ├── UserProfile
│   └── PostList
└── Footer
```

각 Component는 화면 구조와 필요한 데이터를 기반으로 UI의 특정 부분을 표현하는 단위

JavaScript를 사용하여 데이터에 따라 화면을 동적으로 구성할 수 있음

```text
JavaScript Data
↓
React Component
↓
UI
```

React 자체가 JavaScript를 대체하는 새로운 언어는 아님

기존에 학습한 JavaScript 문법을 React에서도 그대로 사용함

- Variable
- Function
- Arrow Function
- Object
- Array
- Destructuring
- Spread Syntax
- `map()`
- `filter()`
- Module
- Async/Await
- Fetch API

특히 React에서는 배열 데이터를 화면에 출력할 때 `map()`을 자주 사용하고, Component에 데이터를 전달할 때 Object와 Destructuring을 많이 사용함

## 2. Why React

JavaScript만으로도 웹 화면을 만들 수 있지만 화면이 복잡해질수록 DOM을 직접 관리해야 하는 코드가 많아질 수 있음

예를 들어 사용자 이름이 변경되었을 때 Vanilla JavaScript에서는 변경된 데이터를 직접 화면에 다시 반영해야 함

```js
const nameElement = document.querySelector("#name");

nameElement.textContent = "JIHUN";
```

화면의 여러 부분이 같은 데이터에 의존한다면 각각의 DOM을 직접 수정해야 할 수 있음

React에서는 화면을 Component 단위로 구성하고 데이터가 변경되면 그 데이터에 맞는 UI를 다시 표현하는 방식 사용

```text
Data 변경
↓
Component 다시 계산
↓
변경된 UI 반영
```

이를 통해 개발자는 DOM을 직접 수정하는 과정보다 현재 데이터에 따라 어떤 화면을 보여줄지 작성하는 데 집중할 수 있음

React를 사용하는 주요 이유

- Component 기반 UI 구성
- 재사용 가능한 UI 작성
- 데이터 변화에 따른 화면 업데이트
- 복잡한 화면 구조 관리
- JavaScript를 이용한 선언적인 UI 작성

## 3. React Project Structure with Vite

Vite는 React 프로젝트의 개발 환경을 빠르게 구성할 수 있도록 도와주는 Build Tool

React 프로젝트 생성 예시

```bash
npm create vite@latest
```

프로젝트 생성 과정에서 React와 JavaScript를 선택할 수 있음

기본적인 React 프로젝트 구조

```text
react-project/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

### `src`

React 애플리케이션의 주요 Source Code를 작성하는 Directory

Component, JavaScript, CSS 등의 코드를 주로 `src` 내부에서 관리함

### `main.jsx`

React 애플리케이션이 시작되는 Entry Point

기본적으로 `App` Component를 Browser의 DOM에 연결하는 역할

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

전체 흐름

```text
index.html
↓
main.jsx
↓
App.jsx
↓
Child Components
```

### `App.jsx`

React 애플리케이션의 최상위 Component로 주로 사용

```jsx
function App() {
  return <h1>Hello React</h1>;
}

export default App;
```

다른 Component를 `App` 내부에서 조합하여 전체 화면을 구성할 수 있음

### `index.html`

Browser가 처음 읽는 HTML 파일

React에서 사용할 Root Element 포함

```html
<div id="root"></div>
```

`main.jsx`에서 해당 Element를 찾아 React 애플리케이션을 연결함

```js
document.getElementById("root");
```

### `package.json`

프로젝트에서 사용하는 Package와 Script 등의 정보 관리

대표적인 Script

```bash
npm run dev
npm run build
```

`npm run dev`는 개발 서버 실행

`npm run build`는 배포에 사용할 Production Build 생성

## 4. JSX

JSX는 JavaScript 코드 안에서 HTML과 비슷한 형태로 UI를 작성할 수 있도록 하는 Syntax

```jsx
function App() {
  return <h1>Hello React</h1>;
}
```

위의 `<h1>Hello React</h1>` 부분이 JSX

JSX는 HTML 자체가 아니라 JavaScript에서 UI 구조를 표현하기 위한 Syntax

### JavaScript Expression

JSX 내부에서 JavaScript 값을 사용할 때 중괄호 `{}` 사용

```jsx
function App() {
  const name = "JIHUN";

  return <h1>Hello {name}</h1>;
}
```

결과

```text
Hello JIHUN
```

중괄호 안에는 JavaScript Expression을 작성할 수 있음

```jsx
const user = {
  name: "JIHUN",
  age: 29,
};

function App() {
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.age + 1}</p>
      <p>{user.age >= 20 ? "Adult" : "Minor"}</p>
    </div>
  );
}
```

### JSX Attribute

JSX에서는 HTML과 비슷하게 Attribute를 작성할 수 있음

```jsx
const imageUrl = "/profile.png";

function App() {
  return <img src={imageUrl} alt="Profile" />;
}
```

고정된 문자열은 따옴표 사용 가능

```jsx
<img src="/profile.png" alt="Profile" />
```

JavaScript 값을 전달할 때는 `{}`를 사용

```jsx
<img src={imageUrl} alt={altText} />
```

### `className`

HTML의 `class` 대신 JSX에서는 `className` 사용

```jsx
<div className="container">Hello React</div>
```

### Self-closing Tag

내용이 없는 Element는 닫는 Tag가 필요함

```jsx
<img src="/profile.png" alt="Profile" />
<input type="text" />
```

### One Parent Element

Component가 여러 JSX Element를 반환할 때 하나의 Parent Element로 감싸야 함

```jsx
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>React</p>
    </div>
  );
}
```

여러 Element를 불필요한 DOM Element 없이 묶고 싶다면 Fragment 사용 가능

```jsx
function App() {
  return (
    <>
      <h1>Hello</h1>
      <p>React</p>
    </>
  );
}
```

`<>...</>`는 Fragment의 축약 문법

### Important JSX Rules

- JavaScript Expression은 `{}` 내부에 작성
- HTML의 `class` 대신 `className` 사용
- 내용이 없는 Element도 닫아야 함
- 여러 Element를 반환할 경우 하나의 Parent로 묶어야 함
- 일부 HTML Attribute는 JSX에서 다른 이름을 사용함

## 5. React Component

Component는 React UI를 구성하는 독립적인 단위

하나의 Page를 여러 Component로 나누어 구성할 수 있음

```text
App
├── Header
├── UserProfile
├── PostList
└── Footer
```

각 Component는 필요한 JSX를 반환함

```jsx
function Header() {
  return <header>Header</header>;
}
```

### Function Component

React에서는 JavaScript Function을 사용하여 Component를 만들 수 있음

```jsx
function UserProfile() {
  return (
    <section>
      <h2>JIHUN</h2>
      <p>Backend Developer</p>
    </section>
  );
}
```

Component Function의 이름은 대문자로 시작해야 함

```jsx
function UserProfile() {
  return <h2>User Profile</h2>;
}
```

잘못된 예

```jsx
function userProfile() {
  return <h2>User Profile</h2>;
}
```

React는 소문자로 시작하는 JSX Tag를 HTML Element로 인식함

```jsx
<div />
<section />
<button />
```

대문자로 시작하는 Tag는 React Component로 인식함

```jsx
<UserProfile />
<Header />
<PostList />
```

### Using Components

만든 Component는 다른 Component의 JSX 내부에서 사용할 수 있음

```jsx
function Header() {
  return <header>Header</header>;
}

function App() {
  return (
    <div>
      <Header />
      <main>Hello React</main>
    </div>
  );
}
```

`<Header />`를 작성하면 `Header` Component가 반환하는 JSX가 해당 위치에 렌더링됨

### Component Composition

여러 Component를 조합하여 하나의 화면 구성 가능

```jsx
function Header() {
  return <header>Header</header>;
}

function Main() {
  return <main>Main</main>;
}

function Footer() {
  return <footer>Footer</footer>;
}

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
```

하나의 큰 Component에 모든 UI를 작성하기보다 역할에 따라 작은 Component로 나누어 관리할 수 있음

```text
큰 UI
↓
여러 Component로 분리
↓
각 Component를 조합
↓
전체 Page 구성
```

### Component Export and Import

Component를 별도 파일로 분리하여 사용할 수 있음

`Header.jsx`

```jsx
function Header() {
  return <header>Header</header>;
}

export default Header;
```

`App.jsx`

```jsx
import Header from "./components/Header.jsx";

function App() {
  return <Header />;
}

export default App;
```

JavaScript Modules에서 학습한 `import`와 `export`가 React Component에서도 그대로 사용됨

### Important Component Rules

- Component는 UI를 구성하는 독립적인 단위
- Component Function 이름은 대문자로 시작
- Component는 JSX를 반환할 수 있음
- 다른 Component 내부에서 Component 사용 가능
- 여러 Component를 조합하여 화면 구성 가능
- Component를 파일별로 분리하여 관리 가능

## 6. Props

Props는 Parent Component에서 Child Component로 데이터를 전달하기 위한 값

```text
Parent Component
↓
Props
↓
Child Component
```

예를 들어 `App` Component에서 `UserCard` Component로 사용자 이름 전달 가능

```jsx
function UserCard(props) {
  return <h2>{props.name}</h2>;
}

function App() {
  return <UserCard name="JIHUN" />;
}
```

`App`에서 전달한:

```jsx
name = "JIHUN";
```

값이 `UserCard`의 `props` 객체에 저장됨

```js
props.name;
```

### Props Object

여러 개의 Props를 전달하면 하나의 객체 형태로 받을 수 있음

```jsx
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.role}</p>
      <p>{props.age}</p>
    </div>
  );
}

function App() {
  return <UserCard name="JIHUN" role="Backend Developer" age={29} />;
}
```

`UserCard`가 받는 Props의 형태

```js
{
    name: "JIHUN",
    role: "Backend Developer",
    age: 29
}
```

문자열은 따옴표로 전달 가능

```jsx
<UserCard name="JIHUN" />
```

JavaScript 값이나 숫자, 객체, 배열 등을 전달할 때는 `{}` 사용

```jsx
<UserCard age={29} />
```

### Props Destructuring

JavaScript에서 학습한 Object Destructuring을 Props에도 사용할 수 있음

기존 방식

```jsx
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.role}</p>
    </div>
  );
}
```

Destructuring 사용

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

React에서는 Props를 Parameter에서 바로 Destructuring하는 형태를 자주 사용함

### Passing JavaScript Values

변수도 Props로 전달 가능

```jsx
function App() {
  const userName = "JIHUN";
  const userAge = 29;

  return <UserCard name={userName} age={userAge} />;
}
```

객체 전달 가능

```jsx
function App() {
  const user = {
    name: "JIHUN",
    role: "Backend Developer",
  };

  return <UserCard user={user} />;
}
```

Child Component

```jsx
function UserCard({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.role}</p>
    </div>
  );
}
```

배열도 동일한 방식으로 전달 가능

```jsx
function App() {
  const skills = ["Java", "Spring Boot", "React"];

  return <SkillList skills={skills} />;
}
```

### Props Are Read-Only

Child Component는 전달받은 Props를 직접 수정하지 않는 것이 React의 기본 원칙

잘못된 방식

```jsx
function UserCard(props) {
  props.name = "KIM";

  return <h2>{props.name}</h2>;
}
```

Props는 Parent에서 전달한 값을 Child에서 읽어서 사용하는 방식

```text
Parent
↓
Props
↓
Child
```

기본적인 데이터 흐름은 Parent에서 Child 방향

이를 One-way Data Flow라고 함

### Important Props Rules

- Props는 Component 사이에서 데이터를 전달할 때 사용
- Parent Component에서 Child Component 방향으로 전달
- Props는 객체 형태로 전달받음
- Object Destructuring 사용 가능
- 문자열뿐 아니라 숫자, 배열, 객체 등도 전달 가능
- 전달받은 Props를 Child에서 직접 수정하지 않음

## 7. Children

`children`은 Component의 Opening Tag와 Closing Tag 사이에 전달된 내용을 받을 수 있는 특별한 Props

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

`Card` Component 사용

```jsx
function App() {
  return (
    <Card>
      <h2>JIHUN</h2>
      <p>Backend Developer</p>
    </Card>
  );
}
```

`Card`의 Opening Tag와 Closing Tag 사이에 작성한 JSX가 `children`으로 전달됨

```jsx
<h2>JIHUN</h2>
<p>Backend Developer</p>
```

전체 흐름

```text
<Card>
    JSX
</Card>
↓
children
↓
Card Component 내부에서 렌더링
```

### children as Props

`children`도 일반 Props와 마찬가지로 Component가 전달받는 Props 객체에 포함됨

기존 방식

```jsx
function Card(props) {
  return <div className="card">{props.children}</div>;
}
```

Destructuring 사용

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

React에서는 Destructuring 형태를 자주 사용함

### Props and children Together

일반 Props와 `children`을 함께 받을 수도 있음

```jsx
function Card({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
```

사용

```jsx
function App() {
  return (
    <Card title="Profile">
      <p>Name: JIHUN</p>
      <p>Role: Backend Developer</p>
    </Card>
  );
}
```

여기서:

```
title="Profile"
```

은 일반 Props

```jsx
<p>Name: JIHUN</p>
<p>Role: Backend Developer</p>
```

는 `children`으로 전달됨

### Why children Is Useful

`children`을 사용하면 Component의 공통적인 Layout은 유지하면서 내부 내용만 다르게 전달할 수 있음

```jsx
<Card>
  <UserProfile />
</Card>

<Card>
  <PostList />
</Card>
```

`Card` Component 자체를 반복해서 새로 만들 필요 없이 내부 내용만 변경하여 재사용 가능

```text
공통 Layout
+
다른 children
↓
재사용 가능한 Component
```

### Important children Rules

- `children`은 Component Tag 사이의 내용을 전달받는 Props
- JSX, 문자열, 다른 Component 등을 `children`으로 전달 가능
- `props.children`으로 접근 가능
- Destructuring을 사용하여 `{ children }`으로 받을 수 있음
- 일반 Props와 `children`을 함께 사용할 수 있음
- 공통 Layout Component를 만들 때 유용함

## 8. Array Rendering and `key`

React에서는 배열 데이터를 여러 개의 UI Element로 변환할 때 `map()`을 자주 사용함

JavaScript에서 학습한 `map()`과 동일한 Array Method

```js
const numbers = [1, 2, 3];

const doubled = numbers.map((number) => number * 2);
```

React에서는 새로운 값을 만드는 대신 JSX Element를 반환하는 방식으로 자주 사용함

```jsx
const skills = ["Java", "Spring Boot", "React"];

function SkillList() {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}
```

`map()`의 각 반복에서 JSX를 반환함

```text
"Java"
↓
<li>Java</li>

"Spring Boot"
↓
<li>Spring Boot</li>

"React"
↓
<li>React</li>
```

### Rendering Object Arrays

객체 배열도 동일하게 렌더링 가능

```jsx
const users = [
  {
    id: 1,
    name: "JIHUN",
    role: "Backend",
  },
  {
    id: 2,
    name: "MINJI",
    role: "Frontend",
  },
];

function UserList() {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.role}
        </li>
      ))}
    </ul>
  );
}
```

JavaScript Object Property에 접근하는 방식도 그대로 사용함

```jsx
user.id;
user.name;
user.role;
```

### `key`

React에서 배열을 이용해 여러 Element를 렌더링할 때 각 Element에 고유한 `key`를 지정해야 함

```jsx
users.map((user) => <li key={user.id}>{user.name}</li>);
```

`key`는 React가 배열의 각 Element를 구분하는 데 사용함

```text
user id 1 → key 1
user id 2 → key 2
user id 3 → key 3
```

데이터가 추가, 삭제, 변경되었을 때 React가 어떤 항목이 변경되었는지 판단하는 데 도움을 줌

### Stable Key

가능하면 데이터 자체가 가지고 있는 고유한 값을 `key`로 사용

```jsx
<li key={user.id}>{user.name}</li>
```

대표적으로 Database의 ID와 같은 고유한 값 사용 가능

```jsx
key={user.id}
key={post.id}
key={product.id}
```

배열 Index도 `key`로 사용할 수 있지만 항목의 순서가 변경되거나 추가와 삭제가 발생하는 배열에서는 주의가 필요함

```jsx
users.map((user, index) => <li key={index}>{user.name}</li>);
```

고유 ID가 존재한다면 Index보다 ID를 우선해서 사용하는 것이 좋음

### Component Rendering

`map()`을 이용해 HTML Element뿐 아니라 React Component도 반복 렌더링 가능

```jsx
function UserCard({ name, role }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}
```

```jsx
function UserList() {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} name={user.name} role={user.role} />
      ))}
    </div>
  );
}
```

흐름

```text
users Array
↓
map()
↓
각 user를 UserCard로 변환
↓
여러 UserCard 렌더링
```

### Destructuring with `map()`

Object Destructuring도 함께 사용할 수 있음

```jsx
users.map(({ id, name, role }) => (
  <UserCard key={id} name={name} role={role} />
));
```

JavaScript에서 학습한 `map()`과 Destructuring이 React에서도 그대로 활용됨

### Important Array Rendering Rules

- 배열 데이터를 JSX로 변환할 때 `map()`을 자주 사용
- `map()` Callback에서 JSX 반환 가능
- 객체 배열도 렌더링 가능
- 반복 렌더링되는 Element에는 고유한 `key` 지정
- 가능하면 배열 Index보다 데이터의 고유 ID를 `key`로 사용
- HTML Element뿐 아니라 Component도 반복 렌더링 가능
- Destructuring과 `map()`을 함께 사용할 수 있음

## 9. Conditional Rendering

Conditional Rendering은 조건에 따라 서로 다른 UI를 렌더링하는 방식

JavaScript의 `if`, 삼항 연산자, 논리 AND 연산자 등을 JSX와 함께 사용할 수 있음

### `if`

조건에 따라 서로 다른 JSX를 반환할 수 있음

```jsx
function UserStatus({ isLoggedIn }) {
  if (isLoggedIn) {
    return <p>Logged In</p>;
  }

  return <p>Guest</p>;
}
```

```text
isLoggedIn === true
↓
Logged In

isLoggedIn === false
↓
Guest
```

### Ternary Operator

JSX 내부에서는 삼항 연산자를 이용하여 조건에 따라 값을 선택할 수 있음

```jsx
function UserStatus({ isLoggedIn }) {
  return <p>{isLoggedIn ? "Logged In" : "Guest"}</p>;
}
```

삼항 연산자

````js
condition ? valueIfTrue : valueIfFalse;
```

JSX 자체를 선택하는 것도 가능

```jsx
function UserAction({ isLoggedIn }) {
  return (
    <div>{isLoggedIn ? <button>Logout</button> : <button>Login</button>}</div>
  );
}
````

### Logical AND `&&`

특정 조건이 `true`일 때만 Element를 렌더링하고 싶다면 `&&` 사용 가능

```jsx
function AdminMenu({ isAdmin }) {
  return <div>{isAdmin && <button>Admin</button>}</div>;
}
```

`isAdmin`이 `true`이면:

```jsx
<button>Admin</button>
```

렌더링

`false`이면 해당 Element를 렌더링하지 않음

### Conditional Rendering with Props

Props 값을 이용하여 조건부 렌더링 가능

```jsx
function UserCard({ name, active }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{active ? "Active" : "Inactive"}</p>
    </article>
  );
}
```

사용

```jsx
<UserCard name="JIHUN" active={true} />
```

### Conditional Component Rendering

조건에 따라 Component 자체를 렌더링할 수도 있음

```jsx
function App() {
  const isLoggedIn = true;
  return <main>{isLoggedIn ? <UserProfile /> : <LoginForm />}</main>;
}
```

또는 특정 Component만 조건부로 출력

```jsx
function App() {
  const isAdmin = true;

  return (
    <>
      <Header />
      {isAdmin && <AdminMenu />}
    </>
  );
}
```

### Important Conditional Rendering Rules

- JavaScript 조건식을 이용하여 UI 변경 가능
- Component에서 `if`를 사용하여 서로 다른 JSX 반환 가능
- JSX 내부에서는 삼항 연산자를 자주 사용
- 조건이 `true`일 때만 렌더링하려면 `&&` 사용 가능
- Props를 조건으로 사용할 수 있음
- 조건에 따라 Element나 Component 자체를 렌더링할 수 있음

## 10. Default Props Values

Component가 Props를 전달받지 못했을 때 사용할 기본값을 지정할 수 있음

JavaScript Parameter의 Default Value와 Destructuring을 함께 사용

```jsx
function UserCard({ name = "Unknown", role = "Guest" }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}
```

Props를 모두 전달한 경우

```jsx
<UserCard name="JIHUN" role="Backend Developer" />
```

결과

```text
JIHUN
Backend Developer
```

Props를 전달하지 않은 경우

```jsx
<UserCard />
```

결과

```text
Unknown
Guest
```

### Partial Props

일부 Props만 전달할 수도 있음

```jsx
<UserCard name="JIHUN" />
```

이 경우:

```text
name -> "JIHUN"
role -> "Guest"
```

`name`은 전달받은 값을 사용하고 `role`은 Default Value 사용

### `undefined` and `null`

JavaScript Default Parameter와 동일하게 값이 `undefined`인 경우 Default Value 적용

```jsx
<UserCard name={undefined} />
```

```text
name → "Unknown"
```

하지만 `null`은 명시적으로 전달된 값이므로 Default Value가 적용되지 않음

```jsx
<UserCard name={null} />
```

```text
name → null
```

### Default Value with Other Props

여러 Props 중 필요한 값에만 Default Value 지정 가능

```jsx
function UserCard({ name, role = "Guest", active = false }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{active ? "Active" : "Inactive"}</p>
    </article>
  );
}
```

### Important Default Props Rules

- Props Destructuring에서 Default Value 지정 가능
- Props가 `undefined`일 때 Default Value 사용
- `null`에는 Default Value가 적용되지 않음
- 모든 Props에 Default Value를 지정할 필요는 없음
- JavaScript의 Default Parameter 문법을 그대로 활용함

## 11. Component Design Basics

React에서는 하나의 큰 Component에 모든 UI를 작성하기보다 역할에 따라 여러 Component로 분리하여 관리할 수 있음

예를 들어 하나의 Profile Page가 있다면 다음과 같이 나눌 수 있음

```text
ProfilePage
├── Header
├── UserProfile
├── SkillList
└── Footer
```

각 Component가 하나의 명확한 역할을 가지도록 구성하는 것이 중요함

### Separate by Responsibility

Component를 역할에 따라 분리하면 코드의 구조를 이해하기 쉬워짐

하나의 Component에 모든 UI를 작성한 경우

```jsx
function App() {
  return (
    <>
      <header>Header</header>

      <main>
        <h1>JIHUN</h1>
        <p>Backend Developer</p>

        <ul>
          <li>Java</li>
          <li>Spring Boot</li>
          <li>React</li>
        </ul>
      </main>

      <footer>Footer</footer>
    </>
  );
}
```

Component를 분리한 경우

```jsx
function Header() {
  return <header>Header</header>;
}

function UserProfile() {
  return (
    <section>
      <h1>JIHUN</h1>
      <p>Backend Developer</p>
    </section>
  );
}

function SkillList() {
  return (
    <ul>
      <li>Java</li>
      <li>Spring Boot</li>
      <li>React</li>
    </ul>
  );
}
function Footer() {
  return <footer>Footer</footer>;
}

function App() {
  return (
    <>
      <Header />
      <UserProfile />
      <SkillList />
      <Footer />
    </>
  );
}
```

각 Component의 역할이 명확해지고 필요한 부분을 독립적으로 수정하기 쉬워짐

### Separate Data and UI

Component 내부에 데이터를 직접 반복해서 작성하기보다 데이터를 별도로 관리하고 UI에서 사용하는 방식 가능

```jsx
const skills = ["Java", "Spring Boot", "React"];

function SkillList() {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}
```

데이터와 UI 구조를 분리하면 데이터가 변경되어도 같은 Component 구조를 재사용 가능

```text
Data
↓
Component
↓
UI
```

### Reusable Components

비슷한 UI를 반복해서 작성해야 한다면 Props를 이용하여 하나의 Component를 재사용할 수 있음

```jsx
function UserCard({ name, role }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}
```

```jsx
<UserCard
  name="JIHUN"
  role="Backend"
/>

<UserCard
  name="MINJI"
  role="Frontend"
/>
```

같은 UI 구조를 사용하면서 Props만 다르게 전달 가능

### Component Composition

작은 Component를 조합하여 더 큰 Component 구성 가능

```jsx
function ProfilePage() {
  return (
    <>
      <Header />

      <main>
        <UserProfile />
        <SkillList />
      </main>

      <Footer />
    </>
  );
}
```

```text
작은 Component
↓
Component 조합
↓
Page
↓
Application
```

### When to Separate Components

다음과 같은 경우 Component 분리를 고려할 수 있음

- 하나의 Component가 너무 길어지는 경우
- 특정 UI가 명확한 역할을 가지는 경우
- 같은 UI 구조를 여러 위치에서 재사용하는 경우
- 특정 부분을 독립적으로 관리하고 싶은 경우

무조건 작은 단위로 나누는 것이 목적은 아님

Component의 역할과 재사용 가능성을 기준으로 적절한 단위로 분리하는 것이 중요함

### Important Component Design Rules

- Component가 하나의 명확한 역할을 가지도록 구성
- 큰 UI를 여러 Component로 나누어 관리 가능
- Props를 이용하여 Component 재사용 가능
- 배열 데이터와 `map()`을 이용하여 반복 UI 구성 가능
- 작은 Component를 조합하여 더 큰 화면 구성 가능
- 필요 이상으로 Component를 지나치게 세분화하지 않음
