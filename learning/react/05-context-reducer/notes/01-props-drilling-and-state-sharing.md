# 01. Props Drilling & State Sharing

## 1. Props Drilling

- 부모 컴포넌트의 데이터를 여러 단계의 자식 컴포넌트로 전달하는 현상
- 중간 컴포넌트가 데이터를 직접 사용하지 않아도 props를 전달해야 할 수 있음
- 컴포넌트 계층이 깊어지면 데이터 전달 구조가 복잡해질 수도 있음

## 2. Props Drilling 예시

```jsx
function App() {
  const user = { name: "Alice" };
  return <Header user={user} />;
}

function Header({ user }) {
  return <Navigation user={user} />;
}

function Navigation({ user }) {
  return <UserProfile user={user} />;
}

function UserProfile({ user }) {
  return <h1>Hello, {user.name}!</h1>;
}

export default App;
```

- App에서 user 데이터 생성
- Header와 Navigation은 user를 사용하지 않고 전달
- UserProfile에서 실제 user 데이터 사용

## 3. Props Drilling의 문제점

- 중간 컴포넌트에 불필요한 props 전달 코드가 증가할 수 있음
- 컴포넌트 계층이 깊어질수록 수정 및 유지보수가 복잡해질 수 있음
- 데이터 전달 경로를 추적하기 어려워질 수 있음

## 4. Lifting State Up

- 여러 컴포넌트에서 동일한 상태를 사용해야 할 때 상태를 공통 부모로 이동하는 방식
- 부모가 상태를 관리하고 자식에게 props로 전달
- 필요한 경우 상태 변경 함수도 자식에게 전달
- 상태 공유를 위한 기본적인 방법

## 5. Context API

- 여러 컴포넌트에서 공통으로 필요한 데이터를 공유하는 React 기능
- 중간 컴포넌트를 거쳐 props를 반복 전달하지 않아도 됨
- 하위 컴포넌트에서 Context 값을 직접 읽을 수 있음
- 모든 상태를 Context로 관리할 필요는 없음

## 6. Props vs Context

| 구분        | Props                            | Context                                 |
| ----------- | -------------------------------- | --------------------------------------- |
| 데이터 전달 | 부모 -> 자식                     | Provider -> 하위 컴포넌트               |
| 사용 상황   | 일반적인 컴포넌트 간 데이터 전달 | 여러 하위 컴포넌트에서 공통 데이터 사용 |
| 장점        | 데이터 흐름이 명확함             | 중간 컴포넌트의 반복 전달 감소          |

## Summary

- Props Drilling: 여러 단계에 걸친 props 전달
- State Lifting: 공유할 상태를 공통 부모로 이동
- Context API: 중간 props 전달 없이 하위 컴포넌트에서 데이터 공유
- 단순한 데이터 전달은 props를 우선 고려
- Context는 필요할 때 사용하는 것이 좋음
