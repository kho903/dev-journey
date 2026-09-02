# React State and Events

## 1. React State

### React State

State는 React가 Component의 렌더링 사이에서 유지하고 관리하는 데이터

사용자의 행동이나 프로그램의 동작에 따라 값이 변경되고, State가 변경되면 React가 해당 Component를 다시 렌더링하여 변경된 값을 화면에 반영

예시

```text
Counter

count = 0

사용자가 Increase 버튼 클릭
↓
count = 1
↓
React Component 다시 렌더링
↓
화면에 1 출력
```

React에서 화면에 표시되는 값이 사용자 행동에 따라 변경되어야 하는 경우 State 사용

대표적인 State 사용 예시

- Counter의 숫자
- 로그인 여부
- Toggle 상태
- Input 입력값
- 선택된 메뉴
- Modal 열림 여부
- 장바구니 상품 목록

### Why State Is Needed

일반 JavaScript 변수도 값을 변경할 수 있음

```js
let count = 0;

function increase() {
  count++;
}
```

`increase()`를 실행하면 JavaScript 변수 `count`의 값 자체는 변경됨

```text
0
↓
1
↓
2
```

하지만 React는 일반 JavaScript 변수의 변경을 State 변경으로 인식하지 않음

따라서 변수의 값이 변경되었다는 이유만으로 React Component가 자동으로 다시 렌더링되지 않음

```jsx
let count = 0;

function Counter() {
  function increase() {
    count++;
  }

  return (
    <section>
      <p>{count}</p>
      <button onClick={increase}>Increase</button>
    </section>
  );
}
```

버튼을 클릭하면 `count` 변수의 값은 변경될 수 있지만 React에게 다시 렌더링해야 한다는 정보가 전달되지 않음

```text
일반 변수 변경
↓
count 값 변경
↓
React에게 렌더링 요청 없음
↓
화면이 자동으로 변경되지 않음
```

React에서는 변경되는 데이터를 State로 관리하고 State를 변경하는 함수를 통해 값을 변경

```jsx
const [count, setCount] = useState(0);
```

State 변경 함수를 호출하면 React에 State 업데이트를 요청하고 Component가 새로운 State를 기준으로 다시 렌더링됨

```text
setCount()
↓
State 변경
↓
React가 변경 감지
↓
Component 다시 렌더링
↓
변경된 State를 이용하여 새로운 UI 생성
```

### Props vs State

Props와 State 모두 Component에서 사용하는 데이터를 의미하지만 역할과 관리 주체가 다름

| 구분        | Props                                  | State                         |
| ----------- | -------------------------------------- | ----------------------------- |
| 데이터 전달 | 부모 Component에서 전달                | Component 내부에서 관리       |
| 변경 주체   | 부모 Component                         | State를 가지고 있는 Component |
| 주요 목적   | Component에 데이터 전달                | 변경되는 데이터 관리          |
| 변경 시     | 새로운 Props를 받으면 다시 렌더링 가능 | State 변경 시 다시 렌더링     |

Props 예시

```jsx
function User({ name }) {
  return <h2>{name}</h2>;
}

function App() {
  return <User name="JIHUN" />;
}
```

데이터 흐름

```text
App
↓
name="JIHUN"
↓
User
```

`User`는 부모인 `App`으로부터 `name` Props를 전달받음

State는 Component 내부에서 관리

```text
Component
↓
State 보유
↓
사용자 행동
↓
State 변경
↓
Component 다시 렌더링
```

Props는 외부에서 전달받는 데이터, State는 Component가 직접 관리하는 변경 가능한 데이터라는 차이

### JavaScript Variable vs State

일반 JavaScript 변수와 React State의 가장 중요한 차이는 React의 렌더링과 연결되어 있는지 여부

일반 변수

```js
let count = 0;

count++;
```

변수의 값만 변경됨

```text
JavaScript Variable
↓
값 변경
↓
React 렌더링과 직접 연결되지 않음
```

State

```jsx
const [count, setCount] = useState(0);

setCount(1);
```

```text
React State
↓
State 변경
↓
React가 변경 인식
↓
Component 다시 렌더링
↓
화면 업데이트
```

또한 Component 함수 내부에 선언한 일반 변수는 Component가 다시 렌더링될 때 다시 초기화될 수 있음

```jsx
function Counter() {
  let count = 0;

  // Component가 다시 실행되면 count도 다시 0부터 시작
}
```

반면 State는 React가 Component의 렌더링 사이에서도 값을 유지하도록 관리

```jsx
const [count, setCount] = useState(0);
```

```text
일반 변수
→ 단순 JavaScript 데이터
→ 값 변경이 React 렌더링을 요청하지 않음

State
→ React가 관리하는 Component 데이터
→ State 변경 시 다시 렌더링
→ 렌더링 사이에서도 값 유지
```

### Core Concept

React에서 State를 이해할 때 중요한 흐름

```text
User Action
↓
Event
↓
State Update
↓
Re-render
↓
Updated UI
```

React의 UI는 State의 현재 값을 기준으로 만들어짐

따라서 화면을 직접 수정하는 방식보다 State를 변경하고 React가 새로운 State를 기반으로 화면을 다시 렌더링하도록 만드는 방식이 기본적인 React의 흐름
