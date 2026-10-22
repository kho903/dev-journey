# Review 01. Effects & Cleanup

## 1. Render와 Effect 실행 순서

다음 React Component를 확인

```jsx
import { useEffect } from "react";

function Example({ value }) {
  console.log("Render:", value);

  useEffect(() => {
    console.log("Effect Setup:", value);

    return () => {
      console.log("Effect Cleanup:", value);
    };
  }, [value]);

  return <p>{value}</p>;
}
```

### Questions

1. 최초 `value = 1`로 Mount되었을 때 Console에 출력되는 순서는?

- Render : 1
- Effect Setup : 1

2. `value`가 1에서 2로 변경되면 어떤 로그가 출력되는가?

```text
Render: 2
Effect Cleanup: 1
Effect Setup: 2
```

- Cleanup은 새 Render가 끝난 뒤, 새 Effect가 실행되기 전에 호출된다. 이때 Cleanup은 이전 Render의 value 1을 기억하고 있음

3. `value`가 변경되지 않은 상태에서 부모가 Re-render되면 Effect도 반드시 재실행되는가?

- 아니다. 부모가 Re-render되면 `Example` 함수는 다시 호출되어 `Render: 1`은 출력됨
- 하지만 React는 Dependency Array(`[value]`)를 이전 값과 비교하고, 달라지지 않았다면 Effect를 건너 뜀

4. Cleanup은 언제 실행되는가?

- Dependency가 바뀌어 Effect가 다시 실행되기 직전 (이전 Effect 정리)
- Component가 Unmount될 때
- (개발 환경) StrictMode가 Mount 직후 한 번 수행하는 검사

## 2. Dependency Array

다음 세 가지 Effect의 차이를 설명

### Case A

```jsx
useEffect(() => {
  console.log("Effect A");
});
```

### Case B

```jsx
useEffect(() => {
  console.log("Effect B");
}, []);
```

### Case C

```jsx
useEffect(() => {
  console.log("Effect C:", userId);
}, [userId]);
```

### Questions

1. A, B, C는 각각 언제 실행되는가?

- A: 매 Render 후 실행 (Mount 포함)
- B: Mount 후 한 번만 실행
- C: Mount 후, 그리고 `userId`가 바뀔 때마다 실행

2. Case C에서 `userId`가 변경되면 어떤 일이 발생하는가?

- userId가 변경되면 새로운 값으로 Render가 진행되고, React는 이전 Dependency와 새로운 Dependency를 비교함
- [userId]의 값이 변경되었으므로 Effect가 다시 실행되어 새로운 userId로 Effect Setup이 진행됨
- 이 예제에는 Cleanup 함수가 없으므로 실제 Cleanup 코드는 실행되지 않음
- 만약 Effect Cleanup 함수를 반환했다면, Dependency 변경 시 이전 Effect의 Cleanup이 먼저 실행된 뒤 새로운 Setup이 실행됨

3. `useEffect`의 Dependency Array에 Reactive Value를 누락하면 어떤 문제가 발생할 수 있는가?

- Effect가 Render 시점의 오래된 값 (Stale Value)을 계속 참조하게 되어, UI나 외부 시스템과 데이터가 어긋남.
- 예를 들어 `userId`가 바뀌었는데, 이전 사용자 기준으로 동작

## 3. Stale Closure

다음 Timer Component에는 문제가 있음

```jsx
import { useEffect, useState } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <p>Count: {count}</p>;
}
```

### Questions

1. 이 코드에서 `count`가 정상적으로 계속 증가하지 않는 이유는?

- `[]`이므로 Effect는 첫 Render에서 한 번만 실행되고, 그 시점의 `count=0`을 Closure로 캡처함
- 그래서 Interval 콜백은 매번 `setCount(0 + 1)`을 호출함
- 첫 tick에서 `count`는 1이 되지만, 이후에는 같은 값(1)으로 설정하므로 더 이상 증가하지 않음

2. Stale Closure란 무엇인가?

- 함수가 만들어진 시점의 변수 값(Snapshot)을 계속 기억하는 현상
- React에서는 Render마다 새로운 `count`가 생기지만, 오래된 Render에서 만든 콜백은 여전히 옛날 값을 봄

3. Dependency Array를 무조건 `[count]`로 변경하는 것이 가장 적절한 해결 방법인가?

- 단정할 수 없음. `[count]`로 바꾸면 동작은 하지만, `count`가 바뀔 때마다 `Interval`을 해제하고 다시 만들어서 불필요한 비용이 들고 타이핑도 매번 초기화됨
- 이전 State만 필요하다면 Functional Update로 Dependency 자체를 없애는 편이 나음

4. Functional State Update를 사용하여 코드를 수정

### Corrected Code

```jsx
import { useEffect, useState } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <p>Count: {count}</p>;
}
```

- `setCount`는 참조가 안정적이고 `prevCount`는 React가 넘겨주는 최신값이므로, `[]`로도 안전함

## 4. Event Listener Cleanup

다음 Component에서 문제를 찾아 수정

```jsx
import { useEffect, useState } from "react";

function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, []);

  return <p>Width: {width}px</p>;
}
```

### Questions

1. 위 코드는 왜 Event Listener를 정상적으로 제거하지 못하는가?

- `addEventListener`와 `removeEventListener`에 서로 다른 함수 인스턴스(별개의 화살표 함수)를 넘겼기 때문
- 내용이 똑같아도 참조가 다르면 다른 함수이므로, 제거가 일어나지 않고, Listener가 남게 됨

2. Event Listener를 올바르게 제거하려면 무엇이 중요한가?

- 등록할 때와 해제할 때 같은 함수 참조(와 같은 옵션)을 사용해야 함
- 그러려면 Handler나 변수나 named function으로 한 번만 선언해서 양쪽에 넘기면 됨

3. 수정한 전체 코드 작성

### Corrected Code

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

  return <p>Width: {width}px</p>;
}
```

## 5. API Request Cleanup

다음 코드는 Props로 전달받은 `userId`에 따라 사용자 정보를 조회

```jsx
useEffect(() => {
  async function loadUser() {
    const response = await fetch(`/api/users/${userId}`);

    const data = await response.json();

    setUser(data);
  }

  loadUser();
}, [userId]);
```

### Questions

1. 사용자가 User 1 → User 2를 빠르게 변경하면 어떤 문제가 발생할 수 있는가?

- User1 요청이 User2요청보다 늦게 도착하면, 화면은 User2인데 State에는 User1의 데이터가 들어감
- 또 Unmount된 뒤에 응답이 도착해 불필요하게 State를 갱신할 수도 있음

2. 이 문제를 Race Condition 및 Stale Response와 연결하여 설명

- 네트워크 응답은 요청한 순서대로 도착한다는 보장이 없음. 결과가 요청 순서가 아니라 응답 도착 순서에 좌우되는 것이 Race Condition
- 이미 최신이 아닌 요청(`userId = 1`)의 응답이 늦게 도착해서 현재 State를 덮어쓰는 것이 Stale Response. 해당 Effect는 Cleanup으로 이미 생명이 끝났는데, 비동기 콜백이 계속 살아서 State를 갱신하는 셈

3. AbortController가 필요한 이유는?

Cleanup 시점에 진행 중인 요청을 취소해서 다음 효과를 얻기 위함

- 오래된 응답이 State를 덮어쓰는 것을 방지
- 불필요한 네트워크 사용 감소
- Unmount 이후의 State 갱신 방지

취소된 `fetch`는 `AbortError`로 reject되므로 `catch`에서 구분해서 처리

### Requirements

- `AbortController` 사용
- `controller.signal` 전달
- HTTP Status 검사
- `try/catch`를 이용한 Error Handling
- 취소된 요청의 State Update 방지
- Cleanup에서 `controller.abort()` 호출
- Dependency Array에 `userId` 포함

### Corrected Code

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadUser() {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      // 이미 취소된 요청이면 State를 갱신하지 않는다
      if (controller.signal.aborted) return;

      setUser(data);
    } catch (error) {
      // 요청이 이미 취소되었거나 AbortError라면 무시
      if (
        controller.signal.aborted ||
        (error instanceof Error && error.name === "AbortError")
      ) {
        return;
      }

      // 실제 요청 오류만 처리
      console.error("Failed to load user:", error);

      setError(error instanceof Error ? error.message : "Unexpected Error");
    }
  }

  loadUser();

  return () => {
    controller.abort();
  };
}, [userId]);
```

## 6. React StrictMode

개발 환경에서 다음과 같은 Console 로그를 확인

```text
Effect Setup
Effect Cleanup
Effect Setup
```

### Questions

1. 최초 Mount에서 위와 같은 로그가 나타날 수 있는 이유는?

- 개발 환경의 StrictMode는 Mount 직후 Effect를 Setup -> Cleanup -> Setup 순서로 한 번 더 실행해서 "Mount -> Unmount -> Remount"를 일부러 시뮬레이션하기 때문

2. 이것이 React의 오류를 의미하는가?

- X. React의 의도된 동작이며, Cleanup이 빠졌거나 잘못 작성된 Effect를 개발 중에 미리 드러내기 위한 검사

3. StrictMode를 제거하여 중복 실행을 해결하는 것이 적절한가?

- X. 증상만 숨길 뿐이고, 버그(Listener 중복 등록, Interval 중복, 요청 중복 등)는 그대로 남음
- 실제 환경에서도 Dependency 변경이나 Unmount 때 Cleanup은 호출되므로 Effect 자체를 고쳐야 함

4. StrictMode와 Effect Cleanup은 어떤 관계가 있는가?

- StrictMode는 Setup과 Cleanup이 서로 정확히 대칭을 이루는가를 검증
- Cleanup이 Setup의 효과를 제대로 되돌린다면 추가 실행은 아무 문제도 일으키지 않음
- 반대로 대칭이 깨져 있으면(예: Listener) 즉시 눈에 띄게 됨

5. Production에서도 동일한 추가 검사 과정이 실행되는가?

- X. 이 추가 검사는 개발 환경에서만 실행되며, Production Build에서는 Effect가 Mount 시 한 번만 실행됨

## 7. 종합 회고

### Q1. Effect는 언제 필요한가?

- 필요한 경우 : React 바깥의 시스템과 동기화 해야 할 때. 예를 들면 Timer, window/document의 Event Listener, WebSocket/구독, 브라우저 API(`document.title` 등), 서드파티 라이브러리 연동, (프레임워크나 라이브러리를 쓰지 않을 때) 데이터 Fetching이 있다.

- 필요 없는 경우
  - Props/State로 계산 가능한 값은 Render 중에 직접 계산
  - 사용자 이벤트(클릭, 제출 등)에 대한 반응은 Event Handler에서 처리
  - Props 변경 시 State 초기화는 `key`를 쓰거나 Render 중에 처리
  - State 변경을 연쇄시키려고 Effect를 쓰지 않는다

### Q2. Cleanup이 필요한 이유는?

Effect가 외부에 지속적인 작업이나 연결을 시작했다면, Cleanup을 통해 이를 정리해야 Component의 생명주기와 외부 시스템의 동작이 어긋나지 않음

- Timer (`clearInterval`) : 정리하지 않으면 Unmount 후에도 계속 실행되고, Effect가 다시 실행될 때마다 Interval이 중복으로 쌓임
- EventListener(`removeEventListener`) : 해제하지 않으면 Listener가 누적되어 메모리 누수와 중복 호출이 생김
- API Request(`AbortController`) : 취소하지 않으면 Race Condition과 Stale Response로 오래된 데이터가 화면에 반영될 수 있음

### Q3. 가장 중요하다고 생각하는 개념은?

- "Effect는 외부 시스템과의 동기화를 담당하며, 정리가 필요한 작업에는 적절한 Cleanup이 필요하다."는 개념이 가장 중요하다고 생각
- Timer, Event Listener, WebSocket, API Request처럼 Effect가 지속적인 작업이나 외부 연결을 시작했다면, Dependency 변경 또는 Unmount 시 해당 작업을 정리해야 함
- 모든 Effect에 Cleanup이 필요한 것은 아니지만, Cleanup이 필요한 Effect에서는 Setup과 Cleanup이 서로 대응하도록 작성하는 것이 중요함
- Stale Closure, Event Listener 해제, 요청 취소, StrictMode의 추가 검사는 모두 Effect의 생명주기와 외부 작업을 올바르게 관리하는 것이 왜 중요한지 보여주는 사례임
- 이 관점을 가지면 Effect를 단순히 "Mount 시 한 번 실행하는 코드"가 아니라 "React와 외부 시스템을 동기화하는 코드"로 이해하게 되어, 더욱 안정적이고 예측 가능한 Effect를 작성할 수 있음
