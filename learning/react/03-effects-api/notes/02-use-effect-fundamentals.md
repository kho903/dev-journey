# 02. useEffect Fundamentals

## 1. useEffect

- React Component의 렌더링 결과를 외부 시스템과 동기화하기 위한 Hook
- Effect의 Setup은 렌더링 도중이 아니라 Commit 이후 실행됨
- 외부 시스템과의 동기화가 필요할 때 사용 검토

### Syntax

```jsx
import { useEffect } from "react";

useEffect(() => {
  // Effect Setup
}, [dependencies]);
```

- 첫 번째 인자 : Effect Setup Function
- 두 번째 인자 : Dependency Array
- Dependency Array에 따라 Effect의 재실행 여부 결정
- Hook은 React Component 또는 Custom Hook의 최상위 수준에서 호출해야 함
- 조건문, 반복문, 일반 함수 내부에서 호출하면 안 됨

## 2. Basic Example

```jsx
import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect 실행:", count);
  }, [count]);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>Count: {count}</button>
  );
}

export default Counter;
```

### Execution Flow

```text
Initial Render
↓
Commit
↓
Effect Setup
↓
Button Click
↓
setCount()
↓
Re-render
↓
Dependency 비교
↓
Commit
↓
Effect Setup 재실행 (Dependency 변경 시)
```

- 초기 Mount 시 Effect 실행
- 이후 `count`가 변경되면 Effect 재실행
- 개발 환경의 StrictMode에서는 추가 실행 가능

## 3. Dependency Array

### Without Dependency Array

```jsx
useEffect(() => {
  console.log("Effect 실행");
});
```

- Dependency Array 생략
- Component가 Commit될 때마다 Effect 실행

### Empty Dependency Array

```jsx
useEffect(() => {
  console.log("Effect 실행");
}, []);
```

- 초기 Mount 시 Effect 실행
- 일반적인 프로덕션 환경에서는 Mount당 Setup 한 번 실행
- 개발 StrictMode에서는 추가 Setup 및 Cleanup 검사 가능

### With Dependencies

```jsx
useEffect(() => {
  console.log("Count 변경:", count);
}, [count]);
```

- 초기 Mount 시 실행
- 이후 `count`가 변경되면 Effect 재실행
- Dependency 비교에는 `Object.is()` 사용

### Comparison

| Syntax                   | Execution                 |
| ------------------------ | ------------------------- |
| `useEffect(fn)`          | 매 Commit 이후            |
| `useEffect(fn, [])`      | Mount 시                  |
| `useEffect(fn, [count])` | Mount 시 및 count 변경 시 |

## 4. Rendering vs Effect

```jsx
import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  console.log("Rendering");

  useEffect(() => {
    console.log("Effect");
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Increase</button>;
}
```

- Rendering 내부 코드는 Component 실행 중 평가됨
- Effect Setup은 Commit 이후 실행됨
- React는 렌더링을 중단하거나 다시 시도할 수 있음
- Commit되지 않은 렌더링의 Effect는 실행되지 않음

## 5. When to Use useEffect

### Appropriate Cases

- State에 따른 `document.title` 변경
- 외부 API 데이터 조회 (직접 데이터를 가져오는 방식에서 사용 가능)
- 외부 이벤트 구독 및 해제
- 외부 라이브러리와 데이터 동기화

### Unnecessary Cases

- 합계 및 통계 계산
- 배열 필터링
- 단순 문자열 가공
- 버튼 클릭에 따른 특정 저장 요청

- 기존 Props와 State로 계산 가능한 값은 Derived Value 사용
- 사용자 행동으로 시작되는 작업은 Event Handler 사용
- 외부 시스템과 동기화할 필요가 있는지 먼저 판단

## 6. StrictMode

- 개발 환경에서 Effect의 안전성을 점검하기 위해 추가 실행 가능
- 초기 Mount 시 Setup과 Cleanup에 대한 추가 검사 수행 가능
- 콘솔에 Effect 로그가 예상보다 여러 번 출력될 수 있음
- 실제 프로덕션 환경의 실행 횟수와 구분 필요

## Summary

- `useEffect()`는 React와 외부 시스템의 동기화를 위한 Hook
- Effect Setup은 Commit 이후 실행됨
- Dependency Array로 Effect의 재실행 조건 관리
- Dependency 값은 `Object.is()`로 비교됨
- 개발 StrictMode에서는 Effect 추가 실행 가능
- 계산 가능한 값에 불필요한 Effect를 사용하지 않는 것이 중요함
