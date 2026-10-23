# 03. Link & Navigation

## 1. Navigation

- 사용자가 다른 URL이나 페이지로 이동하는 동작
- React Router에서는 Client-Side Navigation 지원
- 일반적인 내부 페이지 이동 시 전체 HTML 문서 새로고침 없이 화면 전환 가능

## 2. a 태그와 Link

### a 태그

- HTML에서 사용하는 기본 링크
- `href` 속성으로 이동할 주소 지정
- 일반적인 내부 경로 이동 시 새 문서를 요청할 수 있음
- 외부 웹사이트 이동에도 사용

### Link

- React Router에서 제공하는 페이지 이동 컴포넌트
- `to` 속성으로 이동할 경로 지정
- Client-Side Routing을 활용하여 페이지 이동
- 일반적인 내부 페이지 이동에 적합

```jsx
// 일반 HTML 링크
<a href="/about">About</a>

// React Router Link
<Link to="/about">About</Link>
```

## 3. NavLink

- 현재 URL과 링크 경로의 일치 여부 확인
- Link의 기능을 포함하며 활성화된 링크 표시 가능
- `isActive`로 현재 링크의 활성화 여부 확인
- 활성화된 링크에 기본적으로 `active` 클래스 적용
- Navigation Menu 구현에 적합

```jsx
<NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
  About
</NavLink>
```

## 4. end 속성

- NavLink의 경로가 끝까지 일치해야 활성화되도록 설정
- 하위 경로까지 활성화되는 것을 방지할 때 사용

```jsx
// /users와 `/users/1`에서 모두 활성화될 수 있음
<NavLink to="/users">Users</NavLink>

// /users에서만 활성화
<NavLink to="/users" end>Users</NavLink>
```

- `/` 경로는 기본적으로 정확한 루트 경로에서만 활성화되는 예외가 있음

## 5. 기본 코드 예시

```jsx
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router";

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Home
        </NavLink>

        {" | "}

        <NavLink
          to="/about"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          About
        </NavLink>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </BrowserRouter>
  );
}

export default App;
```

- NavLink: 현재 활성화된 페이지를 굵은 글씨로 표시
- Link: 일반적인 내부 페이지 이동
- Routes / Route: 현재 URL에 해당하는 컴포넌트 렌더링
- BrowserRouter: URL 및 History 관리

## Summary

- a: 일반 HTML 링크
- Link: Client-Side Navigation
- NavLink: 현재 활성화된 링크 표시
- to: 이동할 URL 경로
- isActive: 현재 링크 활성화 여부
- end: 하위 경로까지 활성화되는 것을 제한
