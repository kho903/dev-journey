# 02. React Router Fundamentals

## 1. React Router

- React 애플리케이션에서 URL 기반 페이지 이동을 구현하는 라이브러리
- 현재 URL에 따라 렌더링할 컴포넌트를 결정
- SPA에서 전체 HTML 문서 새로고침 없이 페이지 전환 가능

## 2. BrowserRouter

- 브라우저의 History API를 활용하는 Router 컴포넌트
- URL 변경과 브라우저의 뒤로 가기 / 앞으로 가기 관리
- 일반적으로 애플리케이션의 최상위에서 사용
- 하위 컴포넌트에 Routing 기능 제공

## 3. Routes

- 여러 Route를 정의하는 컨테이너
- 현재 URL과 일치하는 Route를 선택하여 렌더링
- Route는 일반적으로 Routes 내부에서 선언

## 4. Route

- URL 경로와 React 컴포넌트를 연결
- `path`: URL 경로 지정
- `element`: 해당 경로에서 렌더링할 JSX 지정

## 5. 기본 코드 예시

```jsx
import { BrowserRouter, Routes, Route } from "react-router";

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

- `/` 접근 시 Home 컴포넌트 렌더링
- `/about` 접근 시 About 컴포넌트 렌더링
- `BrowserRouter`는 라우팅 기능 제공
- `Routes`는 경로에 맞는 Route 선택
- `Route`는 경로와 컴포넌트 연결

## 6. React Router 설치

```bash
npm install react-router
```

- React Router 최신 Declarative Mode 기준 `react-router` 패키지 사용
- `react-router-dom`은 React Router v6에서 주로 사용되었으며, v7에서는 호환성을 위해 유지되었으나 v8에서는 제거됨
- 하나의 애플리케이션에 BrowserRouter를 중복 배치하지 않도록 주의

## Summary

- BrowserRouter: URL 및 History 관리
- Routes: 현재 경로와 일치하는 Route 선택
- Route: URL 경로와 렌더링할 컴포넌트 연결
- path: URL 경로
- element: 렌더링할 JSX
