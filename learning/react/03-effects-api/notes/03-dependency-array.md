# 03. Dependency Array

## 1. Dependency Array

- `useEffect()`의 재실행 여부를 판단하는 데 사용하는 값들의 배열
- React는 이전 렌더링과 현재 렌더링의 Dependency를 비교
- Dependency 값이 변경되면 Commit 이후 Effect 재실행
- 비교에는 `Object.is()` 사용

### Syntax

```jsx
useEffect(() => {
  // Effect Setup
}, [dependency1, dependency2]);
```

- Dependency Array에는 Effect 내부에서 사용하는 Reactive Value 포함
- Reactive Value는 Props, State, Component 내부에서 선언한 변수 및 함수 등을 의미
- Dependency Array의 항목 수와 작성 순서는 일정하게 유지해야 함

## 2. Reactive Values

- React의 렌더링에 따라 변경될 수 있는 값
- 대표적으로 Props, State, Component 내부에서 선언한 변수 및 함수 등이 해당함

### Example

```jsx
import { useEffect, useState } from "react";

function UserPage({ userId }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `User: ${userId}, Count: ${count}`;
  }, [userId, count]);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>Count: {count}</button>
  );
}
```

- `userId`는 Props
- `count`는 State
- Effect 내부에서 두 값을 사용하므로 `[userId, count]` 필요
- 두 값 중 하나라도 변경되면 Effect 재실행

## 3. Object.is()

- React가 Dependency를 비교할 때 사용하는 JavaScript 함수
- 각 Dependency를 이전 렌더링의 값과 비교
- 객체 내부까지 재귀적으로 비교하는 Deep Comparison이 아님

### Primitive Values

```js
Object.is(10, 10); // true
Object.is(10, 20); // false

Object.is("hello", "hello"); // true
Object.is("hello", "world"); // false

Object.is(true, true); // true
Object.is(true, false); // false
```

- Number, String, Boolean 등 Primitive Value는 값 자체를 비교
- 값이 동일하면 Dependency가 변경되지 않은 것으로 판단

### Reference Values

```js
const object1 = { name: "JIHUN" };
const object2 = { name: "JIHUN" };

Object.is(object1, object2); // false

const object3 = object1;

Object.is(object1, object3); // true
```

- Object, Array, Function 등은 Reference 비교
- 내용이 동일하더라도 서로 다른 객체라면 다른 값으로 판단
- 동일한 객체를 참조한다면 같은 값으로 판단

## 4. Primitive Dependency

```jsx
import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Count: {count}
      </button>

      <input value={name} onChange={(event) => setName(event.target.value)} />
    </div>
  );
}
```

### Execution

- 초기 Mount 시 Effect 실행
- `count` 변경 시 Effect 재실행
- `name` 변경 시 Component Re-render 발생
- `name`만 변경되었다면 `count`는 동일하므로 Effect 재실행하지 않음

```text
count = 0
↓
Effect 실행

name 변경
↓
Re-render
↓
count 동일
↓
Effect 재실행 없음

count = 1
↓
Re-render
↓
count 변경
↓
Effect 재실행
```

## 5. Object Dependency

객체를 Dependency로 사용할 때는 Reference 변경에 주의해야 함

### Problem

```jsx
import { useEffect, useState } from "react";

function UserPage({ userId }) {
  const [count, setCount] = useState(0);

  const options = {
    title: `User: ${userId}`,
  };

  useEffect(() => {
    document.title = options.title;
  }, [options]);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>Count: {count}</button>
  );
}
```

### Problem Analysis

- Component가 Re-render될 때마다 `options` 객체가 새로 생성됨
- 새 객체는 이전 객체와 Reference가 다름
- `Object.is(previousOptions, currentOptions)`는 `false`
- `count`만 변경해도 Effect가 불필요하게 재실행됨

```text
Render 1
options = Object A
↓
Render 2
options = Object B
↓
Object.is(A, B) === false
↓
Effect 재실행
```

### Solution

```jsx
import { useEffect, useState } from "react";

function UserPage({ userId }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `User: ${userId}`;
  }, [userId]);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>Count: {count}</button>
  );
}
```

- 불필요한 객체 Dependency 제거
- Effect 내부에서 필요한 Primitive Value를 직접 사용
- `userId`가 변경될 때만 Effect 재실행

## 6. Function Dependency

Component 내부에서 선언한 Function도 Re-render 시 새로 생성될 수 있음

### Problem

```jsx
import { useEffect, useState } from "react";

function UserPage({ userId }) {
  const [count, setCount] = useState(0);

  function updateTitle() {
    document.title = `User: ${userId}`;
  }

  useEffect(() => {
    updateTitle();
  }, [updateTitle]);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>Count: {count}</button>
  );
}
```

### Problem Analysis

- `updateTitle`은 Component가 실행될 때마다 새 함수로 생성됨
- Function Reference가 변경되므로 Effect가 매 렌더링 후 재실행될 수 있음
- `count` 변경이 문서 제목과 무관해도 Effect 재실행 발생

### Solution

```jsx
import { useEffect, useState } from "react";

function UserPage({ userId }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `User: ${userId}`;
  }, [userId]);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>Count: {count}</button>
  );
}
```

- Effect 내부에서 필요한 작업 직접 수행
- 불필요한 Function Dependency 제거
- 실제 Reactive Value인 `userId`만 Dependency로 지정

## 7. Infinite Effect Loop

Effect 내부에서 State를 변경하면 Re-render 발생 가능

변경된 State가 다시 Effect의 Dependency를 변경하면 무한 반복 발생 가능

### Incorrect

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1);
}, [count]);
```

### Execution

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

- Effect가 Dependency를 변경하는 State Update 실행
- 별도 종료 조건이 없으므로 반복 발생
- 무한 렌더링 또는 과도한 Update 문제 발생 가능

### Solution

- 해당 State Update가 실제로 Effect에 필요한 작업인지 먼저 확인
- 사용자 행동에 따른 변경이면 Event Handler 사용
- 기존 State로 계산 가능한 값이면 Derived Value 사용
- 외부 시스템과의 동기화가 필요한 경우에만 Effect 사용

### Event Handler Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrease() {
    setCount((prev) => prev + 1);
  }

  return <button onClick={handleIncrease}>Count: {count}</button>;
}
```

- 사용자 클릭에 따른 State 변경
- Effect 불필요

## 8. Dependency Management

### Include Reactive Values

- Effect 내부에서 참조하는 Reactive Value를 Dependency Array에 포함
- Props, State, Component 내부에서 선언한 변수 및 함수 등이 대상
- Dependency를 임의로 생략하면 오래된 값(Stale Value)을 참조할 수 있음

### Avoid Unnecessary Dependencies

- 객체나 함수가 매 렌더링마다 생성되어 불필요한 Effect 재실행을 유발하는지 확인
- 필요한 경우 객체나 함수를 Effect 내부로 이동
- Effect에 필요하지 않은 계산은 Rendering 또는 Event Handler로 분리
- Dependency를 무조건 제거하기보다는 코드 구조를 수정하는 것이 중요함

### ESLint

- React Hooks 관련 ESLint 규칙으로 Dependency 누락 확인 가능
- 대표적으로 `react-hooks/exhaustive-deps` 규칙 사용
- 경고를 무시하기보다 Effect 내부에서 사용하는 값을 분석하여 수정

## 9. Dependency Array Comparison

| Syntax                   | Execution                         |
| ------------------------ | --------------------------------- |
| `useEffect(fn)`          | 매 Commit 이후 실행               |
| `useEffect(fn, [])`      | Mount 시 실행                     |
| `useEffect(fn, [count])` | Mount 시 및 count 변경 시 실행    |
| `useEffect(fn, [a, b])`  | Mount 시 및 a 또는 b 변경 시 실행 |

- Dependency 값은 `Object.is()`로 비교
- 개발 StrictMode에서는 추가 Setup 및 Cleanup 검사 가능
- Dependency가 변경되면 기존 Cleanup 이후 새로운 Setup 실행
- Cleanup의 구체적인 동작은 추후

## Summary

- Dependency Array는 Effect의 재실행 여부를 판단하는 기준
- Effect에서 사용하는 Reactive Value를 Dependency에 포함해야 함
- React는 `Object.is()`로 이전 Dependency와 현재 Dependency 비교
- Primitive Value는 값 비교
- Object, Array, Function은 Reference 비교
- 새 객체나 함수를 매 렌더링마다 생성하면 Effect가 불필요하게 재실행될 수 있음
- Effect 내부에서 Dependency를 계속 변경하면 Infinite Effect Loop 발생 가능
- Dependency를 임의로 생략하지 말고 Effect의 구조를 올바르게 설계해야 함
