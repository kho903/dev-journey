# Review 01 - Routing & Application Structure

## 1. 개념 문제

### Q1. BrowserRouter, Routes, Route의 역할

- `BrowserRouter`: 브라우저 History API를 활용하여 URL과 라우팅 상태 관리
- `Routes`: 현재 URL과 일치하는 Route 구성 선택
- `Route`: `path`와 `element`를 사용해 URL 경로와 컴포넌트 연결

BrowserRouter는 라우팅 환경을 제공하고, Routes와 Route는 어떤 컴포넌트를 표시할지 결정하는 데 사용됨

### Q2. Link와 NavLink의 차이

- `Link`: Client-Side Navigation을 이용한 페이지 이동
- `NavLink`: Link 기능에 더해 현재 링크의 활성화 상태 제공
- `isActive`: 현재 링크가 활성화되어 있는지 나타내는 boolean 값
- `end`: 하위 경로까지 활성화되지 않도록 경로 끝까지의 일치를 요구하는 속성

예를 들어 `/users/1`에 접근하면 `<NavLink to="/users">`는 활성화되지만 `<NavLink to="/users" end>`는 활성화되지 않음

### Q3. Dynamic Routes와 useParams()

URL이 `/users/10`이고 Route가 `users/:userId`라면:

```jsx
const { userId } = useParams();
```

- `userId`의 값: `"10"`
- `userId`의 타입: `string`
- `useParams()`의 반환값: `{ userId: "10" }` 형태의 객체

숫자가 필요하면 `Number(userId)`로 명시적으로 변환해야 함

### Q4. Nested Routes와 Outlet의 역할

- `Nested Routes`: 부모 Route 내부에 자식 Route를 정의하는 구조
- `Outlet`: 부모 컴포넌트에서 현재 매칭된 자식 Route를 렌더링할 위치
- `pages/`: URL에 대응하는 개별 페이지 컴포넌트 관리
- `layouts/`: Header, Navigation, Footer 등 공통 UI 구조 관리
- Layout은 공통 UI를 유지하고, Outlet을 통해 현재 URL에 해당하는 페이지를 표시

## 2. 코드 문제

### Q5. Dynamic Route 구현

```jsx
import { useParams } from "react-router";

function UserDetail() {
  // TODO 1: URL에서 userId 가져오기
  const { userId } = useParams();

  // TODO 2: 문자열을 숫자로 변환
  const id = Number(userId);

  return <h1>User ID: {id}</h1>;
}

export default UserDetail;
```

- 동작 과정

`/users/3` → `userId = "3"` → `Number(userId) = 3` → `User ID: 3`

### Q6. Nested Routes 구현

```jsx
import { Routes, Route, Outlet } from "react-router";

// Home, About, NotFound는 이미 정의되어 있다고 가정

function Layout() {
  return (
    <div>
      <header>Common Header</header>

      <main>
        {/* TODO 1: 자식 Route 렌더링 */}
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* 공통 Layout을 부모 Route로 지정 */}
      <Route element={<Layout />}>
        {/* TODO 2: 기본 페이지 */}
        <Route index element={<Home />} />

        {/* TODO 3: About 페이지 */}
        <Route path="about" element={<About />} />

        {/* TODO 4: 일치하지 않는 URL 처리 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
```

이 코드는 최상위에서 `BrowserRouter`가 설정되어 있다는 전제

`path="*"`는 정의되지 않은 경로를 처리하고, `Outlet`이 있으므로 404 페이지에서도 공통 Header가 표시됨

## 3. Review 최종 핵심 정리

| 개념            | 핵심 역할                   |
| --------------- | --------------------------- |
| `BrowserRouter` | URL과 History 관리          |
| `Routes`        | 현재 경로에 맞는 Route 선택 |
| `Route`         | 경로와 컴포넌트 연결        |
| `Link`          | 페이지 이동                 |
| `NavLink`       | 페이지 이동 + 활성화 상태   |
| `useParams()`   | 동적 URL Parameter 추출     |
| `Outlet`        | 자식 Route 렌더링           |
| Index Route     | 부모 경로의 기본 페이지     |
| `path="*"`      | 정의되지 않은 URL 처리      |
