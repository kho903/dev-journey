# 01. Side Effect & Rendering

## 1. Rendering

- React가 현재 Props와 State를 바탕으로 Component를 실행하여 UI 결과를 계산하는 과정
- Rendering과 실제 DOM 변경은 서로 다른 단계

### Rendering Process

1. Render Phase
   - Component 실행
   - Props와 State를 기반으로 JSX 계산
2. Commit Phase
   - 필요한 DOM 변경 반영
3. Browser Paint
   - 브라우저가 화면에 결과 표시

```text
Props / State
     ↓
Render Phase
     ↓
Commit Phase
     ↓
Browser Paint
```

- Render Phase와 Commit Phase는 React의 주요 처리 단계
- Browser Paint는 React가 아닌 브라우저가 화면을 그리는 과정

## 2. Pure Rendering

- 같은 Props와 State에 대해 동일한 렌더링 결과를 계산하는 것
- 렌더링 도중 외부 상태를 변경하지 않는 것
- React는 렌더링을 여러 번 실행하거나 중단할 수 있으므로 순수성 유지가 중요함

### Pure Rendering Example

```jsx
function Price({ price, quantity }) {
  const total = price * quantity;

  return <p>Total: {total}</p>;
}
```

- Props를 기반으로 결과만 계산
- 외부 데이터 변경 없음
- 같은 입력에 대해 같은 결과 반환

### Impure Rendering Example

```jsx
let renderCount = 0;

function Counter() {
  renderCount++;

  return <p>Render Count: {renderCount}</p>;
}
```

- 렌더링 중 외부 변수 `renderCount` 변경
- 같은 입력에서도 실행 횟수에 따라 결과가 달라질 수 있음
- Pure Rendering 원칙 위반

## 3. Side Effect

- 함수의 결과 계산 외에 외부 시스템에 영향을 주거나 상호작용하는 작업
- React에서는 Rendering 중 Side Effect 실행을 피해야 함
- Side Effect 자체가 잘못된 것은 아니며 실행 위치가 중요함

### Examples

| 작업                                  | Side Effect |
| ------------------------------------- | ----------- |
| 숫자 계산                             | X           |
| 배열 `filter()`를 이용한 새 배열 계산 | X           |
| JSX 계산                              | X           |
| 외부 변수 변경                        | O           |
| API 요청                              | O           |
| `localStorage` 데이터 저장            | O           |
| `document.title` 변경                 | O           |
| Timer 생성                            | O           |
| Event Listener 등록                   | O           |

### Incorrect Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  document.title = `Count: ${count}`;

  return <p>{count}</p>;
}
```

- 렌더링 도중 브라우저의 `document.title` 변경
- 외부 시스템을 변경하는 Side Effect 발생
- React의 렌더링 재실행 및 중단 과정에서 예상하지 못한 동작 가능

## 4. Rendering vs Event Handler vs Effect

### Rendering

- 현재 Props와 State를 바탕으로 UI 계산
- Pure하게 유지해야 함
- 계산 가능한 값은 Rendering 중 처리

### Event Handler

- 사용자의 특정 행동에 반응하는 함수
- 클릭, 입력, Form 제출 등
- 사용자 행동에 따른 Side Effect 실행 가능

```jsx
function SaveButton() {
  function handleSave() {
    localStorage.setItem("message", "Saved");
  }

  return <button onClick={handleSave}>Save</button>;
}
```

- 사용자가 Save 버튼을 클릭했을 때 실행
- 사용자 행동에 따른 저장 작업이므로 Event Handler 사용이 적절함

### Effect

- React의 렌더링 결과를 외부 시스템과 동기화하기 위한 기능
- 외부 시스템과의 동기화가 필요할 때 `useEffect()` 사용 검토
- Effect는 Rendering 중 실행되지 않고, DOM 변경이 Commit된 이후 실행됨
- 브라우저 Paint와의 정확한 실행 순서는 상황에 따라 달라질 수 있음

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
```

- `count` 변경에 따라 브라우저 문서 제목을 동기화
- 렌더링 중 직접 외부 시스템을 변경하지 않음

## 5. Derived Value vs Effect

- 기존 Props와 State로 계산 가능한 값은 Derived Value 사용
- 단순 계산을 위해 `useEffect()`와 별도 State를 추가하지 않는 것이 좋음

### Incorrect

```jsx
const [count, setCount] = useState(0);
const [doubleCount, setDoubleCount] = useState(0);

useEffect(() => {
  setDoubleCount(count * 2);
}, [count]);
```

- 계산 가능한 값을 별도 State로 중복 저장
- 불필요한 Effect와 State Update 발생
- 렌더링 사이에 값이 일시적으로 불일치할 가능성

### Correct

```jsx
const [count, setCount] = useState(0);

const doubleCount = count * 2;
```

- `count`로부터 직접 계산
- 별도 State 및 Effect 불필요
- 데이터 불일치 방지

## 6. StrictMode

- React 개발 환경에서 잠재적인 문제를 발견하도록 돕는 기능
- Component의 렌더링 로직을 추가로 실행하여 순수성 검사 가능
- 개발 중 `console.log()`가 여러 번 출력될 수 있음
- 렌더링이 여러 번 실행되어도 안전한 코드 작성 필요
- 개발용 추가 검사 동작을 실제 프로덕션 렌더링 횟수와 혼동하지 않아야 함

## 7. When to Use Effect

| 상황                                 | 권장 방식                              |
| ------------------------------------ | -------------------------------------- |
| 합계 및 통계 계산                    | Derived Value                          |
| 배열 필터링                          | Derived Value                          |
| 버튼 클릭 후 API POST 요청           | Event Handler                          |
| Form 입력 처리                       | Event Handler                          |
| State와 문서 제목 동기화             | Effect                                 |
| 외부 이벤트 구독 및 해제             | Effect                                 |
| 화면에 표시할 데이터의 외부 API 조회 | Effect 또는 전용 데이터 조회 도구 검토 |

## Summary

- Rendering은 Props와 State를 바탕으로 UI를 계산하는 과정
- Pure Rendering은 React Component의 핵심 원칙
- Side Effect는 외부 시스템에 영향을 주거나 상호작용하는 작업
- 사용자의 특정 행동에 따른 작업은 Event Handler 사용
- 외부 시스템과의 동기화가 필요하면 Effect 사용 검토
- 계산 가능한 값은 별도 State나 Effect 대신 Derived Value 사용
- `useEffect()`는 모든 State 변경에 필요한 기능이 아님
