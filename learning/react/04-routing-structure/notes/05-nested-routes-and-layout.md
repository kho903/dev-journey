# 05. Nested Routes & Layout

## 1. Nested Routes

- 부모 Route 내부에 자식 Route를 정의하는 방식
- 부모와 자식 Route를 계층적으로 구성
- 자식 경로는 부모 경로를 기준으로 연결

```jsx
<Route path="/users" element={<UsersLayout />}>
  <Route path=":userId" element={<UserDetail />} />
</Route>
```

- `/users/1` 접근 시 부모와 자식 Route 모두 매칭
- 자식 컴포넌트는 부모의 Outlet 위치에 렌더링

## 2. Outlet

- 현재 매칭된 자식 Route를 렌더링하는 컴포넌트
- 부모 컴포넌트에서 자식 화면이 표시될 위치를 지정
- 자식 Route가 매칭되지 않으면 기본적으로 아무것도 렌더링하지 않음

```jsx
import { Outlet } from "react-router";

function Layout() {
  return (
    <div>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
```

## 3. Shared Layout

- 여러 페이지에서 공통으로 사용하는 UI 구조
- Header, Navigation, Footer 등을 재사용
- 페이지 이동 시 공통 Layout은 유지하고 Outlet 내부 내용 변경

## 4. Index Route

- 부모 Route의 기본 자식 페이지
- `index` 속성으로 정의하며 별도의 path가 없음
- 부모 URL에 접근하면 해당 컴포넌트가 Outlet에 렌더링

```jsx
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />
</Route>
```

- `/` → Home 렌더링
- `/about` → About 렌더링

## 5. 기본 코드 예시

```jsx
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router";

function Layout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/users">Users</Link>
          {" | "}
          <Link to="/about">About</Link>
        </nav>
      </header>

      <hr />

      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function Users() {
  return <h1>Users Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

- Layout은 공통 Header, Navigation, Footer 담당
- Outlet은 현재 경로에 맞는 자식 컴포넌트 표시
- 부모 Route 내부에 자식 Route를 선언
- Index Route는 부모 경로의 기본 화면
- 자식 Route의 상대 경로는 부모 경로를 기준으로 매칭

## 6. Layout Route

- path가 없는 부모 Route도 정의 가능
- URL 경로를 추가하지 않고 자식 Route를 공통 Layout으로 묶을 수 있음

```jsx
<Route element={<Layout />}>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Route>
```

## Summary

- Nested Routes: 부모와 자식 Route의 계층 구조
- Outlet: 매칭된 자식 Route의 렌더링 위치
- Shared Layout: 여러 페이지에서 사용하는 공통 UI
- Index Route: 부모 경로의 기본 자식 페이지
- Layout Route: URL 경로를 추가하지 않는 공통 Layout Route
