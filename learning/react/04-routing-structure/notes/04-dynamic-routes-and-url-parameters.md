# 04. Dynamic Routes & URL Parameters

## 1. Dynamic Routes

- URL의 일부를 동적으로 처리하는 라우팅 방식
- `:`을 사용하여 동적인 경로 구간 정의
- 하나의 Route로 여러 리소스의 상세 페이지 처리 가능

```jsx
<Route path="/users/:userId" element={<UserDetail />} />
```

- `/users/1`, `/users/2` 등이 동일한 Route에 매칭
- `userId` 값에 따라 서로 다른 사용자 정보 표시 가능

## 2. useParams()

- React Router에서 제공하는 Hook
- 현재 URL과 일치하는 Dynamic Route Parameter를 객체 형태로 반환
- URL Parameter의 값은 문자열로 제공됨

```jsx
import { useParams } from "react-router";

function UserDetail() {
  const { userId } = useParams();

  return <h1>User ID: {userId}</h1>;
}
```

- `/users/10` 접근 시 `userId`는 문자열 `"10"`

## 3. URL Parameter와 Query Parameter

### URL Parameter

- URL 경로의 일부로 특정 리소스를 식별
- React Router의 `useParams()`로 접근

```text
/users/10
```

### Query Parameter

- URL의 `?` 뒤에 전달되는 값
- 검색, 정렬, 필터링 등에 주로 활용
- React Router의 `useSearchParams()`로 접근 가능

```text
/users?role=admin
```

## 4. Parameter 타입 변환

- useParams()가 반환하는 값은 문자열
- 숫자 ID가 필요하면 명시적으로 변환
- 변환 결과가 유효한지 확인하는 것이 좋음

```jsx
const { userId } = useParams();

const id = Number(userId);

if (!Number.isInteger(id) || id <= 0) {
  return <p>Invalid User ID</p>;
}
```

## 5. 기본 코드 예시

```jsx
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router";

function Users() {
  return (
    <div>
      <h1>User List</h1>

      <Link to="/users/1">User 1</Link>
      {" | "}
      <Link to="/users/2">User 2</Link>
    </div>
  );
}

function UserDetail() {
  const { userId } = useParams();

  return <h1>User Detail: {userId}</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

- `/users` 접근 시 Users 컴포넌트 표시
- User 1 클릭 시 `/users/1`로 이동
- User 2 클릭 시 `/users/2`로 이동
- UserDetail에서 useParams()로 현재 ID 확인

## Summary

- Dynamic Route: 동적 URL 경로 처리
- `:userId`: 동적 경로 구간 선언
- useParams(): URL 경로의 Parameter 추출
- URL Parameter: 특정 리소스 식별에 주로 사용
- Query Parameter: 검색, 필터링 등에 주로 사용
- useParams()에서 반환된 URL Parameter 값은 문자열이므로 필요한 경우 타입 반환
