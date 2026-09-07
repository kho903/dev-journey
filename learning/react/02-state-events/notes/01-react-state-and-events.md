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

## 2. useState

### useState

`useState`는 React Component에서 State를 생성하고 관리하기 위한 React Hook

React에서 State가 필요한 경우 `useState`를 이용하여 State 값과 State를 변경하는 함수를 생성

```jsx
const [count, setCount] = useState(0);
```

기본 구조

```text
const [State, State 변경 함수] = useState(초기값);
```

각 요소의 역할

```text
count
→ 현재 State 값

setCount
→ count State를 변경하기 위한 함수

useState(0)
→ count의 초기값을 0으로 설정
```

### Import useState

`useState`는 React에서 제공하는 Hook이므로 먼저 import 필요

```jsx
import { useState } from "react";
```

예시

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return <p>{count}</p>;
}

export default Counter;
```

초기 렌더링 시

```text
useState(0)
↓
count = 0
↓
<p>{count}</p>
↓
화면에 0 출력
```

### State and Setter Function

`useState`의 반환값은 두 개의 값을 가진 배열

```jsx
const result = useState(0);
```

개념적으로 다음과 같은 형태

```jsx
const [count, setCount] = useState(0);
```

JavaScript 배열 Destructuring과 동일한 문법

```js
const numbers = [10, 20];

const [first, second] = numbers;
```

```text
first = 10
second = 20
```

따라서

```jsx
const [count, setCount] = useState(0);
```

는 `useState`가 반환한 값에서 현재 State와 State 변경 함수를 각각 받아 사용하는 구조

### State Initial Value

`useState()`의 Argument는 State의 초기값이며, Component의 초기 렌더링에서 State를 초기화할 때 사용

숫자

```jsx
const [count, setCount] = useState(0);
```

문자열

```jsx
const [name, setName] = useState("JIHUN");
```

Boolean

```jsx
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

배열

```jsx
const [skills, setSkills] = useState([]);
```

객체

```jsx
const [user, setUser] = useState({
  name: "JIHUN",
  role: "Backend Developer",
});
```

State는 특정 타입만 사용할 수 있는 것이 아니라 JavaScript에서 사용하는 다양한 값을 저장 가능

### Reading State

State 값은 일반 JavaScript 변수처럼 JSX에서 사용 가능

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <p>{count}</p>
    </section>
  );
}
```

초기 화면

```text
0
```

State 값이 변경되면 새로운 State 값을 기준으로 Component가 다시 렌더링됨

### Updating State

State를 변경할 때 State 값을 직접 수정하지 않고 Setter 함수 사용

잘못된 방식

```jsx
count++;
```

또는

```jsx
count = count + 1;
```

`count`는 직접 대입하여 변경하는 값이 아님

State 변경 함수 사용

```jsx
setCount(count + 1);
```

예시

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  return (
    <section>
      <p>{count}</p>
      <button onClick={increase}>Increase</button>
    </section>
  );
}
```

동작 흐름

```text
초기 State
count = 0
↓
Increase 버튼 클릭
↓
increase() 실행
↓
setCount(count + 1)
↓
setCount(1)
↓
React에 State Update 요청
↓
Component 다시 렌더링
↓
count = 1
↓
화면에 1 출력
```

### State Update and Re-render

State Setter 함수를 호출하면 React에 State 변경을 요청

```jsx
setCount(1);
```

React는 새로운 State를 기준으로 Component를 다시 렌더링

```text
setCount()
↓
State Update
↓
Re-render
↓
새로운 State 값을 이용하여 JSX 생성
↓
UI 업데이트
```

React에서는 화면의 값을 직접 찾아서 수정하기보다 State를 변경하여 UI가 다시 만들어지도록 구성

```text
State
↓
UI
```

State가 화면의 기준이 되는 구조

### Multiple State Values

하나의 Component에서 여러 State 사용 가능

```jsx
function Profile() {
  const [name, setName] = useState("JIHUN");
  const [age, setAge] = useState(29);
  const [isActive, setIsActive] = useState(true);

  return (
    <section>
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{isActive ? "Active" : "Offline"}</p>
    </section>
  );
}
```

각 State는 각각 자신의 Setter 함수로 변경

```text
name
↔ setName

age
↔ setAge

isActive
↔ setIsActive
```

### State Naming Convention

일반적으로 State 이름과 Setter 함수 이름을 다음 형태로 작성

```text
State
→ value

Setter
→ set + State 이름
```

예시

```jsx
const [count, setCount] = useState(0);

const [name, setName] = useState("");

const [isOpen, setIsOpen] = useState(false);

const [users, setUsers] = useState([]);
```

Setter 함수의 `set` 뒤에는 State 이름을 대문자로 시작하는 형태를 주로 사용

```text
count → setCount
name → setName
user → setUser
isActive → setIsActive
```

### Rules of Hooks

`useState`와 같은 React Hook은 React Function Component 또는 Custom Hook의 최상위에서 호출

권장

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return <p>{count}</p>;
}
```

조건문 내부에서 Hook 호출 금지

```jsx
function Counter({ isActive }) {
  if (isActive) {
    const [count, setCount] = useState(0);
  }

  return <p>Counter</p>;
}
```

반복문 내부에서도 Hook 호출 금지

```jsx
for (...) {
    const [count, setCount] = useState(0);
}
```

Hook 호출 순서를 React가 렌더링마다 일관되게 추적할 수 있도록 Component 최상위에서 호출

### Core Concept

`useState`의 기본 흐름

```text
useState(initialValue)
↓
State 생성
↓
현재 State 값 사용
↓
사용자 Event 발생
↓
Setter 함수 호출
↓
State Update
↓
Re-render
↓
새로운 State 기반 UI 출력
```

가장 기본적인 형태

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  return (
    <section>
      <p>{count}</p>
      <button onClick={increase}>Increase</button>
    </section>
  );
}
```

핵심

```text
const [count, setCount] = useState(0);
      ↓        ↓                 ↓
   State    Setter           Initial Value
```

State는 직접 변경하지 않고 Setter 함수를 통해 변경

```text
count++               X

setCount(count + 1)   O
```

## 3. Event Handling

### Event Handling

Event는 사용자가 화면에서 발생시키는 동작

대표적인 Event

- 버튼 클릭
- Input 입력
- Form 제출
- Mouse 이동
- Keyboard 입력

React에서는 JSX Element에 Event Handler를 연결하여 사용자 Event 처리

```jsx
<button onClick={handleClick}>Click</button>
```

기본 흐름

```text
User Action
↓
Event 발생
↓
Event Handler 실행
↓
State 변경 또는 Logic 실행
↓
필요한 경우 Re-render
```

### onClick

`onClick`은 Element를 클릭했을 때 실행할 함수를 지정하는 React Event

예시

```jsx
function Button() {
  function handleClick() {
    console.log("Button Clicked");
  }

  return <button onClick={handleClick}>Click</button>;
}
```

버튼 클릭 시

```text
Click
↓
onClick Event 발생
↓
handleClick 실행
↓
Console 출력
```

```text
Button Clicked
```

React Event 이름은 일반적으로 camelCase 사용

```text
onclick     X
onClick     O

onchange    X
onChange    O
```

### Event Handler Function

Event Handler는 Event가 발생했을 때 실행되는 함수

예시

```jsx
function handleClick() {
  console.log("Clicked");
}
```

JSX에서 Event Handler 연결

```jsx
<button onClick={handleClick}>Click</button>
```

여기서 중요한 점은 함수를 실행하는 것이 아니라 함수 자체를 전달한다는 점

```jsx
onClick = { handleClick };
```

버튼이 클릭되었을 때 React가 `handleClick` 함수를 실행

### handleClick vs handleClick()

다음 두 코드는 의미가 다름

```jsx
onClick = { handleClick };
```

```jsx
onClick={handleClick()}
```

올바른 방식

```jsx
<button onClick={handleClick}>Click</button>
```

`handleClick` 함수 자체를 Event Handler로 전달

```text
Component Render
↓
handleClick 함수 전달
↓
사용자가 버튼 클릭
↓
handleClick 실행
```

잘못된 방식

```jsx
<button onClick={handleClick()}>Click</button>
```

`handleClick()`을 작성하면 Component가 렌더링되는 시점에 함수가 즉시 실행됨

```text
Component Render
↓
handleClick() 실행
↓
함수의 반환값이 onClick에 전달
```

따라서 일반적인 Event Handler 연결에서는 함수 호출이 아니라 함수 자체 전달

```text
onClick={handleClick}
→ Event 발생 시 실행할 함수 전달

onClick={handleClick()}
→ Render 시 handleClick을 즉시 실행하고
  그 반환값을 onClick에 전달
```

### Inline Event Handler

Event Handler를 JSX 내부에서 Arrow Function으로 작성 가능

```jsx
<button onClick={() => console.log("Clicked")}>Click</button>
```

State 변경 예시

```jsx
const [count, setCount] = useState(0);

return <button onClick={() => setCount(count + 1)}>Increase</button>;
```

Arrow Function을 사용하면 Event가 발생했을 때 내부 코드 실행

```text
Render
↓
Arrow Function 전달
↓
Click
↓
Arrow Function 실행
↓
setCount(count + 1)
```

### Passing Arguments to Event Handler

Event Handler에 Argument를 전달해야 하는 경우 Arrow Function 사용

```jsx
function greet(name) {
  console.log(`Hello ${name}`);
}
```

잘못된 방식

```jsx
<button onClick={greet("JIHUN")}>Greeting</button>
```

렌더링 시 `greet("JIHUN")`이 즉시 실행됨

올바른 방식

```jsx
<button onClick={() => greet("JIHUN")}>Greeting</button>
```

동작 흐름

```text
Click
↓
Arrow Function 실행
↓
greet("JIHUN")
↓
Hello JIHUN
```

### Event Handling with State

Event Handling은 State와 함께 사용하는 경우가 많음

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  return (
    <section>
      <p>{count}</p>
      <button onClick={increase}>Increase</button>
    </section>
  );
}
```

동작 흐름

```text
count = 0
↓
사용자 Click
↓
onClick
↓
increase()
↓
setCount(count + 1)
↓
State Update
↓
Re-render
↓
count = 1
```

React의 Interactive UI에서 가장 기본적인 흐름

```text
Event
↓
State Update
↓
Re-render
↓
UI Update
```

### Toggle with Event

Boolean State를 이용하여 Toggle UI 구현 가능

```jsx
import { useState } from "react";

function Toggle() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <section>
      <button onClick={toggle}>Toggle</button>

      <p>{isOpen ? "Open" : "Closed"}</p>
    </section>
  );
}
```

초기 상태

```text
isOpen = false
↓
Closed
```

버튼 클릭

```text
toggle()
↓
setIsOpen(!false)
↓
setIsOpen(true)
↓
Re-render
↓
Open
```

다시 클릭

```text
toggle()
↓
setIsOpen(!true)
↓
setIsOpen(false)
↓
Re-render
↓
Closed
```

### onChange

`onChange`는 Input 등의 값이 변경될 때 사용하는 React Event
React의 text Input에서 `onChange`는 사용자가 값을 입력하여 값이 변경될 때마다 발생

예시

```jsx
function InputExample() {
  function handleChange(event) {
    console.log(event.target.value);
  }

  return <input type="text" onChange={handleChange} />;
}
```

사용자가 Input에 값을 입력하면 `handleChange` 실행

```text
사용자 입력
↓
onChange
↓
handleChange(event)
↓
event.target.value
↓
현재 Input 값
```

### Event Object

React Event Handler는 Event 정보를 담고 있는 객체를 Argument로 받을 수 있음

```jsx
function handleChange(event) {
  console.log(event);
}
```

Input의 현재 값 확인

```jsx
function handleChange(event) {
  console.log(event.target.value);
}
```

예를 들어 사용자가 다음 값을 입력

```text
React
```

다음 값으로 접근 가능

```jsx
event.target.value;
```

결과

```text
React
```

자주 사용하는 형태

```jsx
function handleChange(event) {
  const value = event.target.value;
}
```

### onChange with State

Input 값을 State와 연결 가능

```jsx
import { useState } from "react";

function NameInput() {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <section>
      <input type="text" value={name} onChange={handleChange} />

      <p>{name}</p>
    </section>
  );
}
```

사용자가 `JIHUN` 입력

```text
Input 입력
↓
onChange
↓
handleChange(event)
↓
event.target.value = "JIHUN"
↓
setName("JIHUN")
↓
State Update
↓
Re-render
↓
화면에 JIHUN 출력
```

이와 같이 Input의 값과 React State를 연결하는 방식을 Controlled Input이라고 함

Controlled Input에 대해서는 다음 Section에서 자세히 학습

### Event Handler Naming

Event Handler 함수는 일반적으로 `handle` 접두사를 붙여 작성

```jsx
function handleClick() {}

function handleChange() {}

function handleSubmit() {}
```

Element의 Event Prop에는 `on` 접두사 사용

```jsx
onClick = { handleClick };

onChange = { handleChange };

onSubmit = { handleSubmit };
```

일반적인 Naming 형태

```text
Event Prop
onClick

↓

Handler Function
handleClick
```

```text
Event Prop
onChange

↓

Handler Function
handleChange
```

### Event Handler as Props

Event Handler 함수 역시 Props로 자식 Component에 전달 가능

```jsx
function Button({ onClick }) {
  return <button onClick={onClick}>Click</button>;
}
```

부모 Component

```jsx
function App() {
  function handleClick() {
    console.log("Clicked");
  }

  return <Button onClick={handleClick} />;
}
```

데이터 흐름

```text
App
↓
handleClick 함수
↓
Button의 onClick Props
↓
button의 onClick
↓
Click
↓
handleClick 실행
```

함수도 JavaScript 값이므로 Props로 전달 가능

### Common Mistakes

Event Handler를 즉시 실행

```jsx
<button onClick={handleClick()}>Click</button>
```

잘못된 이유

```text
Click 시 실행되는 것이 아니라
Render 시 바로 실행됨
```

수정

```jsx
<button onClick={handleClick}>Click</button>
```

Argument가 필요한 경우

```jsx
<button onClick={() => handleClick(1)}>Click</button>
```

문자열로 Event Handler 작성

```jsx
<button onClick="handleClick()">Click</button>
```

React JSX에서는 JavaScript 함수를 전달

```jsx
<button onClick={handleClick}>Click</button>
```

### Core Concept

React Event Handling의 기본 흐름

```text
User Action
↓
React Event
↓
Event Handler
↓
Logic
↓
State Update
↓
Re-render
↓
Updated UI
```

기본 패턴

```jsx
function Component() {
  const [state, setState] = useState(initialValue);

  function handleEvent() {
    setState(newValue);
  }

  return <button onClick={handleEvent}>Update</button>;
}
```

핵심 구분

```text
handleClick
→ 함수 자체

handleClick()
→ 함수 호출
```

Event Handler에는 일반적으로 함수 자체 전달

```jsx
onClick = { handleClick };
```

Argument가 필요한 경우 Arrow Function 사용

```jsx
onClick={() => handleClick(value)}
```

Input의 값 변경 확인

```jsx
onChange = { handleChange };
```

```jsx
function handleChange(event) {
  console.log(event.target.value);
}
```

React의 Interactive UI에서 가장 기본적인 관계

```text
Event
↓
State
↓
UI
```
