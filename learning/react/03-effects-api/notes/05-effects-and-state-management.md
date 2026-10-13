# 05. Effects & State Management

## 1. Effects and State

- `useState()`는 Component의 상태를 관리하는 Hook
- `useEffect()`는 렌더링 결과를 외부 시스템과 동기화하는 Hook
- Effect 내부에서도 State 값을 참조하거나 State Setter 호출 가능
- Effect와 State를 잘못 결합하면 Stale Closure, Infinite Loop, 불필요한 Re-render 발생 가능

### Basic Example

```jsx
import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>Count: {count}</button>
  );
}

export default Counter;
```

- `count`는 React State
- `document.title`은 외부 브라우저 상태
- `count`가 변경되면 Effect를 통해 브라우저 제목 동기화
- State와 외부 시스템의 동기화에 해당하므로 Effect 사용이 적절함

## 2. State as a Snapshot

- React State는 각 렌더링에서 Snapshot처럼 동작
- Component 함수가 실행되면 해당 렌더링의 Props와 State 값을 참조
- Setter를 호출해도 현재 렌더링의 State 변수가 즉시 변경되지는 않음

### Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count);
  }

  return <button onClick={handleClick}>{count}</button>;
}
```

- 초기 `count = 0`에서 버튼 클릭 시 콘솔에는 `0` 출력
- 이후 새로운 렌더링에서 화면에 `1` 표시
- Event Handler는 자신이 생성된 렌더링의 State 값을 참조

## 3. Stale Closure

- Closure는 자신이 생성된 렌더링의 State와 Props를 참조할 수 있음
- 최신 값이 필요한 상황에서 이전 렌더링의 값을 계속 사용하면 Stale Closure 문제 발생
- Timer, Event Listener, 비동기 Callback 등에서 주의 필요

### Incorrect Example

```jsx
import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <p>Count: {count}</p>;
}
```

### Problem Analysis

- 초기 Mount 시 `count = 0`
- Effect Setup에서 생성한 Interval Callback은 초기 렌더링의 `count` 참조
- Dependency Array가 `[]`이므로 State 변경에 따라 Effect를 다시 Setup하지 않음
- Interval Callback은 계속 `setCount(0 + 1)` 실행
- 결과적으로 `count`가 일반적으로 `1`에서 더 이상 증가하지 않음
- Effect 내부에서 사용하는 Reactive Value인 `count`를 Dependency에서 누락한 문제도 존재

### Execution Flow

```text
Initial Render
count = 0
↓
Effect Setup
↓
Interval Callback 생성
count = 0 참조
↓
1초 후
setCount(1)
↓
Re-render
count = 1
↓
2초 후
기존 Callback 실행
setCount(1)
↓
State 값 동일
↓
count = 1 유지
```

## 4. Functional State Update

- 이전 State를 기반으로 다음 State를 계산하는 방식
- Setter에 Updater Function 전달
- React가 처리하는 이전 State 값을 인자로 받음

### Syntax

```jsx
setCount((prev) => prev + 1);
```

### Correct Example

```jsx
import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <p>Count: {count}</p>;
}

export default Counter;
```

### Explanation

- Interval Callback에서 `count` 변수를 직접 참조하지 않음
- Functional State Update를 통해 최신 처리 대상 State 기준으로 증가
- Effect가 `count`를 읽지 않으므로 Dependency Array를 `[]`로 유지 가능
- Cleanup을 통해 Interval 중복 실행과 자원 낭비 방지

### Execution Flow

```text
Initial State = 0
↓
Interval 실행
prev = 0
↓
State = 1
↓
Interval 실행
prev = 1
↓
State = 2
↓
Interval 실행
prev = 2
↓
State = 3
```

## 5. Infinite Effect Loop

- Effect가 State를 변경하고, 그 변경으로 Dependency가 다시 변경되는 현상이 반복될 때 발생 가능
- Effect 내부에서 State를 변경한다는 이유만으로 반드시 Infinite Loop가 발생하는 것은 아님

### Incorrect Example

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1);
}, [count]);
```

### Execution Flow

```text
count = 0
↓
Effect 실행
↓
setCount(1)
↓
Re-render
↓
count 변경
↓
Effect 재실행
↓
setCount(2)
↓
Re-render
↓
...
```

### Problem

- Effect가 자신의 Dependency인 `count`를 계속 변경
- 종료 조건이 없으므로 반복 발생
- 불필요한 렌더링과 성능 문제 발생 가능

### Recommended Approach

- State 변경의 원인이 사용자 행동이라면 Event Handler 사용
- 기존 Props와 State로 계산 가능한 값이라면 Derived Value 사용
- 외부 시스템의 데이터를 받아 State에 반영해야 할 때는 Effect 사용 검토
- Effect 내부의 State Update가 Dependency를 계속 변경하는지 확인

## 6. Unnecessary Effect

- React State로부터 계산할 수 있는 값을 동기화하려고 Effect를 사용하면 불필요한 State와 렌더링 발생 가능
- Effect 없이 Rendering 과정에서 직접 계산하는 것이 적절한 경우가 많음

### Incorrect Example

```jsx
import { useEffect, useState } from "react";

function Profile() {
  const [firstName, setFirstName] = useState("JIHUN");
  const [lastName, setLastName] = useState("KIM");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  return <p>{fullName}</p>;
}
```

### Problem

- `fullName`은 `firstName`과 `lastName`으로 계산 가능
- 계산 가능한 값을 별도 State로 중복 관리
- Effect를 통한 추가 State Update 발생
- State 간 값이 일시적으로 일치하지 않을 수 있음

### Correct Example

```jsx
import { useState } from "react";

function Profile() {
  const [firstName, setFirstName] = useState("JIHUN");
  const [lastName, setLastName] = useState("KIM");

  const fullName = `${firstName} ${lastName}`;

  return <p>{fullName}</p>;
}
```

- `fullName`을 Derived Value로 계산
- 별도 State와 Effect 불필요
- Single Source of Truth 유지

## 7. Event Handler vs Effect

- 사용자의 특정 행동으로 시작되는 작업은 Event Handler가 적절한 경우가 많음
- 렌더링 결과를 외부 시스템과 동기화할 때 Effect 사용 검토

### Event Handler Example

```jsx
function SaveButton() {
  async function handleSave() {
    await fetch("/api/profile", {
      method: "POST",
    });
  }

  return <button onClick={handleSave}>Save</button>;
}
```

- 사용자가 Save 버튼을 클릭할 때 요청 실행
- 특정 사용자 행동에 따른 API 요청
- Effect로 이동할 필요 없음
- 실전에서는 요청 실패 및 Loading 상태 처리 필요

### Effect Example

```jsx
import { useEffect, useState } from "react";

function Page() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <p>Count: {count}</p>;
}
```

- `count`와 브라우저 문서 제목을 동기화
- 사용자 이벤트와 직접 결합할 필요 없음
- 외부 시스템 동기화에 해당하므로 Effect 사용이 적절함

## 8. State Update Inside Effect

- Effect 내부에서 State Setter를 사용하는 것 자체가 금지되는 것은 아님
- 외부 시스템에서 가져온 데이터를 State에 반영할 때 필요한 경우 존재
- 단순 계산이나 사용자 이벤트 처리를 Effect로 옮기는 것은 지양

### Example

```jsx
useEffect(() => {
  function handleOnline() {
    setIsOnline(true);
  }

  function handleOffline() {
    setIsOnline(false);
  }

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}, []);
```

- 외부 브라우저 이벤트를 구독
- 이벤트가 발생하면 React State 변경
- 외부 시스템의 변경 내용을 React에 반영하는 적절한 Effect 사용 예시
- `isOnline` State와 `setIsOnline` Setter는 Component에서 별도로 선언되어 있다고 가정

## 9. Common Mistakes

### Missing Dependency

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

- Effect 내부에서 `count` 참조
- Dependency에서 `count` 누락
- Stale Closure 발생 가능

### Correct Functional Update

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

- 현재 State 변수를 직접 참조하지 않음
- Functional Update로 이전 State 기준 변경

### Derived Value with Effect

```jsx
useEffect(() => {
  setTotal(price * quantity);
}, [price, quantity]);
```

- 단순 계산 결과를 별도 State에 저장하는 불필요한 Effect 패턴

### Correct Derived Value

```jsx
const total = price * quantity;
```

- Rendering 중 계산
- 불필요한 State와 Effect 제거

## 10. Design Principles

| 상황                    | 권장 방식                            |
| ----------------------- | ------------------------------------ |
| 이전 State 기반 변경    | Functional State Update              |
| 합계 및 통계 계산       | Derived Value                        |
| 문자열 조합             | Derived Value                        |
| 버튼 클릭 후 API 요청   | Event Handler                        |
| 브라우저 제목 동기화    | Effect                               |
| 외부 이벤트 구독        | Effect + Cleanup                     |
| Timer를 통한 State 변경 | Effect + Functional Update + Cleanup |
| 외부 API 데이터 조회    | Effect 또는 데이터 조회 도구 검토    |

### Checklist

- Effect가 정말 외부 시스템과 동기화하는 작업인지 확인
- Effect 내부에서 사용하는 Reactive Value를 Dependency에 포함
- 반복 Callback에서 오래된 State를 참조하는지 확인
- 이전 State 기반 업데이트에는 Functional Update 사용 검토
- Effect가 자신의 Dependency를 반복 변경하는지 확인
- 계산 가능한 데이터는 Derived Value로 처리
- Setup에서 생성한 외부 자원은 Cleanup으로 정리

## Summary

- State는 렌더링마다 Snapshot처럼 동작
- Stale Closure는 Callback이 이전 렌더링의 State나 Props를 계속 참조하는 문제
- Functional State Update는 이전 State를 기반으로 안전하게 값을 변경하는 방법
- Effect가 Dependency를 계속 변경하면 Infinite Effect Loop 발생 가능
- 계산 가능한 값에 불필요한 Effect를 사용하지 않아야 함
- 사용자 행동에 따른 작업은 Event Handler 사용
- 외부 시스템과 동기화할 필요가 있을 때 Effect 사용
- Effect 내부에서 State를 변경할 수 있지만 그 목적과 실행 조건을 검토해야 함
