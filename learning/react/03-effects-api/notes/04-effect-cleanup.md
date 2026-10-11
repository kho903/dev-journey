# 04. Effect Cleanup

## 1. Effect Cleanup

- `useEffect()`에서 Setup한 외부 시스템 연결이나 작업을 정리하는 함수
- Effect의 Setup 함수가 반환하는 Function으로 작성
- Timer, Event Listener, 외부 시스템 연결 등을 해제할 때 사용
- 모든 Effect에서 Cleanup이 필요한 것은 아님

### Syntax

```jsx
useEffect(() => {
  // Setup
  console.log("Effect Setup");

  return () => {
    // Cleanup
    console.log("Effect Cleanup");
  };
}, []);
```

- `useEffect()` 내부에서 반환하는 Function이 Cleanup
- Setup에서 생성한 자원을 Cleanup에서 정리
- Cleanup은 이전 Setup의 값을 참조할 수 있음

## 2. Cleanup Execution Timing

Cleanup은 단순히 Component가 Unmount될 때만 실행되는 것이 아님

### Execution Conditions

1. Component Unmount
   - 해당 Effect의 마지막 Cleanup 실행
2. Dependency 변경
   - 새 Setup 실행 전에 기존 Cleanup 실행
3. 개발 환경의 StrictMode
   - 추가 Setup 및 Cleanup 검사 가능

### Execution Flow

```text
Mount
↓
Effect Setup

Dependency 변경
↓
Re-render / Commit
↓
Previous Effect Cleanup
↓
New Effect Setup

Unmount
↓
Last Effect Cleanup
```

- Dependency가 변경되지 않으면 해당 Effect의 Cleanup 및 Setup 재실행 불필요
- Cleanup은 이전 Effect의 Setup을 정리하는 역할
- 새 Setup은 새로운 Props와 State를 기준으로 실행

## 3. setInterval() and clearInterval()

`setInterval()`은 지정된 시간 간격으로 Callback을 반복 실행하는 브라우저 API

`clearInterval()`은 등록된 Interval을 해제하는 API

### Incorrect Example

```jsx
import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }, []);

  return <p>Seconds: {seconds}</p>;
}
```

### Problem

- Interval 생성 후 정리하지 않음
- Component가 Unmount되어도 Interval이 계속 실행될 수 있음
- 개발 StrictMode의 추가 Setup 과정에서 여러 Interval이 등록될 수 있음
- 불필요한 Timer 실행과 자원 낭비 발생 가능

### Correct Example

```jsx
import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <p>Seconds: {seconds}</p>;
}

export default Timer;
```

### Explanation

- Setup에서 `setInterval()` 호출
- 반환된 `intervalId` 저장
- Cleanup에서 `clearInterval(intervalId)` 호출
- Unmount 시 Interval 정리
- 개발 StrictMode의 추가 검사에서도 Interval 중복 유지 방지

### Functional State Update

```jsx
setSeconds((prev) => prev + 1);
```

- 이전 State 값을 기준으로 다음 State 계산
- Effect에서 현재 `seconds` 변수를 직접 참조할 필요 없음
- 따라서 Timer Effect의 Dependency를 `[]`로 유지 가능
- State Snapshot에 의한 오래된 값 참조 문제 방지

## 4. Mount and Unmount

### Conditional Rendering Example

```jsx
import { useState } from "react";
import Timer from "./Timer";

function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <section>
      <button onClick={() => setShowTimer((prev) => !prev)}>
        {showTimer ? "Hide Timer" : "Show Timer"}
      </button>

      {showTimer && <Timer />}
    </section>
  );
}

export default App;
```

### Execution

```text
showTimer = true
↓
Timer Mount
↓
Effect Setup
↓
Interval 실행

Hide Timer 클릭
↓
showTimer = false
↓
Timer Unmount
↓
Effect Cleanup
↓
clearInterval()

Show Timer 클릭
↓
Timer 새로 Mount
↓
Effect Setup
↓
새 Interval 실행
```

- Conditional Rendering을 통해 Component Mount 및 Unmount 확인 가능
- Unmount 시 Cleanup으로 외부 자원 정리
- 다시 Mount하면 새로운 Component 인스턴스의 State와 Effect 생성

## 5. Event Listener Cleanup

브라우저 이벤트를 직접 구독할 때도 Cleanup 필요

### Incorrect Example

```jsx
useEffect(() => {
  function handleResize() {
    console.log("Window resized");
  }

  window.addEventListener("resize", handleResize);

  // Cleanup 누락
}, []);
```

### Problem

- EventListener 등록 후 해제하지 않음
- Component Unmount 이후에도 Listener가 남을 수 있음
- 반복 Mount나 추가 Setup에 따라 Listener 중복 등록 가능

### Correct Example

```jsx
import { useEffect, useState } from "react";

function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <p>Window Width: {width}</p>;
}

export default WindowWidth;
```

### Explanation

- Setup에서 `addEventListener()` 호출
- Cleanup에서 `removeEventListener()` 호출
- 등록한 Listener와 동일한 Function Reference 사용
- Component Unmount 시 Listener 제거

### Important

```jsx
window.addEventListener("resize", handleResize);

return () => {
  window.removeEventListener("resize", handleResize);
};
```

- 등록과 해제 시 동일한 Event Type 및 Function Reference 필요
- 새로운 익명 함수를 전달하면 기존 Listener가 해제되지 않을 수 있음

## 6. Cleanup with Dependencies

Dependency가 변경되는 경우에도 Cleanup 실행

### Example

```jsx
import { useEffect } from "react";

function RoomListener({ roomId }) {
  useEffect(() => {
    function handleKeyDown(event) {
      console.log(`Room ${roomId}: ${event.key}`);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [roomId]);

  return <p>Current Room: {roomId}</p>;
}

export default RoomListener;
```

### Execution

```text
roomId = 1
↓
Effect Setup
↓
Room 1의 Keydown Handler 등록

roomId = 2
↓
Re-render / Commit
↓
Room 1의 Keydown Handler 제거
↓
Room 2의 Keydown Handler 등록

Unmount
↓
Room 2의 Keydown Handler 제거
```

- `roomId` 변경 시 기존 Listener 해제 후 새로운 Listener 등록
- 이전 Setup의 Handler는 이전 `roomId` 값을 참조
- 새로운 Setup의 Handler는 변경된 `roomId` 값을 참조
- Cleanup으로 오래된 Listener의 잔존 방지

## 7. StrictMode and Cleanup

- React StrictMode는 개발 환경에서 Effect의 안전성을 검사
- Root StrictMode의 초기 Mount에서는 추가 Setup 및 Cleanup Cycle 실행 가능
- Setup과 Cleanup이 서로 대응하도록 작성하는 것이 중요함

### Example

```jsx
useEffect(() => {
  console.log("Setup");

  return () => {
    console.log("Cleanup");
  };
}, []);
```

### Development StrictMode

초기 Mount 시 콘솔 출력 예시

```text
Setup
Cleanup
Setup
```

실제 Unmount 시

```text
Cleanup
```

- 추가 검사는 개발 환경에서 발생
- Production에서 StrictMode로 인한 추가 검사는 발생하지 않음
- Cleanup이 올바르면 Setup이 다시 실행되더라도 이전 자원이 남지 않음

## 8. Common Mistakes

### Missing Cleanup

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("Tick");
  }, 1000);
}, []);
```

- Interval 생성 후 정리 누락

### Correct

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => clearInterval(id);
}, []);
```

### Incorrect Cleanup Return

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return clearInterval(id);
}, []);
```

- Cleanup Function 대신 `clearInterval()`을 즉시 실행
- Timer가 Setup 과정에서 바로 정리됨
- Cleanup Function을 반환하지 않음

### Correct Return

```jsx
return () => clearInterval(id);
```

- 함수 자체를 반환하여 Cleanup 시점에 실행하도록 설정

## 9. Cleanup and API Requests

- API 요청도 Component 생명주기 및 Dependency 변경을 고려해야 함
- 이전 요청의 응답이 나중에 도착할 수 있음
- 요청 취소 또는 오래된 응답 무시 등의 처리가 필요할 수 있음
- Fetch API에서는 `AbortController`를 활용한 요청 취소 가능
- 구체적인 API 요청 취소와 Race Condition은 이후 학습

## 10. When Cleanup Is Needed

| 작업                   | Cleanup                              |
| ---------------------- | ------------------------------------ |
| 단순 값 계산           | 불필요                               |
| `document.title` 변경  | 일반적으로 불필요                    |
| `setInterval()` 생성   | `clearInterval()`                    |
| `setTimeout()` 생성    | `clearTimeout()` 검토                |
| Event Listener 등록    | `removeEventListener()`              |
| WebSocket 연결         | 연결 종료                            |
| 외부 Subscription 등록 | Subscription 해제                    |
| API 요청               | 요청 취소 또는 오래된 응답 무시 검토 |

- Setup에서 생성한 자원을 정리할 필요가 있는지 확인
- Cleanup이 필요하지 않은 Effect에 억지로 Cleanup을 추가할 필요 없음

## Summary

- Cleanup은 Effect Setup으로 생성한 작업이나 외부 자원을 정리하는 함수
- Cleanup은 Unmount뿐 아니라 Dependency 변경 시에도 실행됨
- Dependency 변경 시 이전 Cleanup 이후 새로운 Setup 실행
- `setInterval()` 은 `clearInterval()`로 정리
- `addEventListener()`는 `removeEventListener()`로 정리
- Event Listener 제거 시 동일한 Function Reference 사용
- StrictMode의 추가 Setup 및 Cleanup 검사에 대응할 수 있어야 함
- Cleanup Function은 `return () => {...}` 형태로 반환
- 외부 자원과의 연결을 시작했다면 해제 방법도 함께 고려해야 함
