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

## 4. Controlled Inputs and Forms

### Controlled Input

Controlled Input은 Input의 값을 React State가 관리하는 방식

HTML Input 자체가 값을 독립적으로 관리하도록 두는 것이 아니라 React State와 Input의 값을 연결

기본 구조

```jsx
const [name, setName] = useState("");

<input
  type="text"
  value={name}
  onChange={(event) => setName(event.target.value)}
/>;
```

핵심 관계

```text
State
↓
value
↓
Input

Input 변경
↓
onChange
↓
Setter
↓
State 변경
↓
Re-render
↓
새로운 State가 Input value에 반영
```

Controlled Input의 핵심은 `value`와 `onChange`

```jsx
<input type="text" value={name} onChange={handleChange} />
```

`value`

```text
Input에 표시할 값을 State에서 가져옴
```

`onChange`

```text
사용자가 Input 값을 변경하면 Event Handler 실행
```

예시

```jsx
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

동작 흐름

```text
초기 State
name = ""
↓
사용자가 J 입력
↓
onChange 발생
↓
event.target.value = "J"
↓
setName("J")
↓
State Update
↓
Re-render
↓
value={name}
↓
Input에 J 표시
```

### Controlled Input Flow

사용자가 `JIHUN`을 입력하는 경우

```text
J
↓
onChange
↓
setName("J")
↓
Re-render

JI
↓
onChange
↓
setName("JI")
↓
Re-render

JIH
↓
onChange
↓
setName("JIH")
↓
Re-render
```

Input의 현재 값이 React State에 저장됨

```text
State
↓
Input value

사용자 입력
↓
onChange
↓
State Update
```

정확히는 State가 Input의 값을 결정하고 Input의 변경 Event가 다시 State를 갱신하는 흐름

### Why Controlled Inputs Are Useful

Input 값을 State로 관리하면 현재 입력값을 React Component에서 쉽게 사용 가능

예시

- 입력값 검증
- 글자 수 확인
- 버튼 활성화 여부 결정
- Form 제출
- 입력값 초기화
- 여러 Input 관리
- 조건부 UI 출력

예시

```jsx
function NameInput() {
  const [name, setName] = useState("");

  return (
    <section>
      <input value={name} onChange={(event) => setName(event.target.value)} />

      <p>Length: {name.length}</p>
    </section>
  );
}
```

State의 값을 이용하여 다른 UI도 함께 계산 가능

### Form

Form은 여러 Input 값을 묶어서 사용자 데이터를 입력받을 때 사용

React에서도 HTML의 `<form>` Element 사용

```jsx
<form>
  <input type="text" />
  <button type="submit">Submit</button>
</form>
```

Form 제출 시 `onSubmit` Event 사용

```jsx
<form onSubmit={handleSubmit}>
```

### onSubmit

`onSubmit`은 Form이 제출될 때 실행되는 Event

```jsx
function handleSubmit(event) {
  console.log("Submit");
}
```

```jsx
<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

Submit 버튼 클릭

```text
Form Submit
↓
onSubmit
↓
handleSubmit(event)
```

### preventDefault

HTML form은 기본적으로 Submit 시 페이지를 다시 요청하거나 새로고침하는 동작을 수행할 수 있음

React에서는 일반적으로 Form Submit Event에서 이 기본 동작을 막고 JavaScript로 제출 Logic 처리

```jsx
function handleSubmit(event) {
  event.preventDefault();
}
```

예시

```jsx
function LoginForm() {
  const [username, setUsername] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(username);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}
```

동작 흐름

```text
Submit
↓
onSubmit
↓
handleSubmit(event)
↓
event.preventDefault()
↓
브라우저 기본 Submit 동작 방지
↓
React / JavaScript Logic 실행
```

### Multiple Inputs with Multiple State

여러 Input을 각각 별도의 State로 관리 가능

```jsx
function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <input value={email} onChange={(event) => setEmail(event.target.value)} />
    </form>
  );
}
```

각 Input과 State가 각각 연결

```text
name Input
↔
name State

email Input
↔
email State
```

Input 개수가 적은 경우 이해하기 쉽고 관리도 단순한 방식

### Form Submit with Multiple State

예시

```jsx
function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log(name);
    console.log(email);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

Submit 시 현재 State 값을 이용 가능

```text
name State
+
email State
↓
handleSubmit
↓
서버 전송 또는 다른 Logic 처리
```

### Resetting Input State

Form 제출 후 Input 값을 초기화하려면 Setter 함수 사용

```jsx
function handleSubmit(event) {
  event.preventDefault();

  console.log(name);

  setName("");
}
```

State가 빈 문자열로 변경

```text
setName("")
↓
State Update
↓
Re-render
↓
value={name}
↓
Input도 빈 값으로 변경
```

Controlled Input이기 때문에 State를 변경하면 Input 화면도 변경됨

### Checkbox

Checkbox도 State로 관리 가능

```jsx
function Agreement() {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <label>
      <input
        type="checkbox"
        checked={isAgreed}
        onChange={(event) => setIsAgreed(event.target.checked)}
      />
      Agree
    </label>
  );
}
```

Text Input에서는 주로

```jsx
event.target.value;
```

사용

Checkbox에서는 주로

```jsx
event.target.checked;
```

사용

```text
Text Input
→ value

Checkbox
→ checked
```

### Select

`select`도 Controlled Input으로 관리 가능

```jsx
function RoleSelect() {
  const [role, setRole] = useState("backend");

  return (
    <select value={role} onChange={(event) => setRole(event.target.value)}>
      <option value="backend">Backend</option>

      <option value="frontend">Frontend</option>
    </select>
  );
}
```

현재 선택된 값은 State에서 관리

```text
role State
↓
select value
```

사용자가 새로운 Option 선택

```text
onChange
↓
event.target.value
↓
setRole()
↓
State Update
```

### Textarea

`textarea` 역시 Controlled Input으로 사용 가능

```jsx
function Introduction() {
  const [content, setContent] = useState("");

  return (
    <textarea
      value={content}
      onChange={(event) => setContent(event.target.value)}
    />
  );
}
```

Input과 동일한 방식으로 `value`와 `onChange` 사용

### Controlled vs Uncontrolled Input

Controlled Input

```jsx
const [name, setName] = useState("");

<input value={name} onChange={(event) => setName(event.target.value)} />;
```

```text
React State가 Input 값 관리
```

Uncontrolled Input

```text
DOM 자체가 Input 값 관리
```

Controlled Input은 React State를 통해 현재 값을 바로 확인하고 제어할 수 있다는 장점

이번 학습에서는 Controlled Input 중심으로 사용

### Common Mistakes

`value`만 설정하고 `onChange`를 작성하지 않는 경우

```jsx
<input value={name} />
```

State가 변경되지 않기 때문에 사용자가 Input 값을 정상적으로 수정할 수 없는 읽기 전용 형태가 될 수 있음

수정

```jsx
<input value={name} onChange={(event) => setName(event.target.value)} />
```

Form Submit에서 `preventDefault()` 누락

```jsx
function handleSubmit(event) {
  console.log("Submit");
}
```

일반적인 React Form 처리에서는

```jsx
function handleSubmit(event) {
  event.preventDefault();

  console.log("Submit");
}
```

형태 사용

---

Event Handler를 호출한 결과를 전달

```jsx
<form onSubmit={handleSubmit()}>
```

일반적인 Event Handler 연결에서는 잘못된 방식

```jsx
<form onSubmit={handleSubmit}>
```

사용

---

Checkbox에서 `value` 사용

```jsx
onChange={(event) => setIsAgreed(event.target.value)}
```

Checkbox 상태를 Boolean으로 관리할 때는 일반적으로

```jsx
onChange={(event) => setIsAgreed(event.target.checked)}
```

사용

---

### Core Concept

Controlled Input의 핵심 흐름

```text
State
↓
Input value
↓
사용자 입력
↓
onChange
↓
Event Handler
↓
Setter
↓
State Update
↓
Re-render
↓
Input value 변경
```

Form의 핵심 흐름

```text
Input
↓
State
↓
Submit
↓
onSubmit
↓
handleSubmit
↓
preventDefault
↓
State 값 사용
```

기본 패턴

```jsx
function Form() {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={(event) => setValue(event.target.value)} />

      <button type="submit">Submit</button>
    </form>
  );
}
```

핵심

```text
value
→ State 값을 Input에 전달

onChange
→ Input 변경을 State에 반영

onSubmit
→ Form 제출 처리

preventDefault()
→ 브라우저 기본 Submit 동작 방지
```

## 5. Functional State Updates

### Functional State Update

React State를 이전 State 값을 기준으로 변경해야 하는 경우 Setter 함수에 새로운 값을 직접 전달하는 대신 함수를 전달할 수 있음

기본 형태

```jsx
setCount((prevCount) => prevCount + 1);
```

구조

```text
setState((previousState) => newState);
```

예시

```jsx
const [count, setCount] = useState(0);

setCount((prevCount) => prevCount + 1);
```

```text
prevCount
→ 이전 State 값

prevCount + 1
→ 새로운 State 값
```

---

### Direct State Update

일반적인 State 변경

```jsx
setCount(count + 1);
```

현재 렌더링에서 가지고 있는 `count` 값을 이용하여 새로운 State를 계산

예시

```text
count = 0
↓
setCount(count + 1)
↓
setCount(1)
```

간단한 State 변경에서는 사용할 수 있는 정상적인 방식

### Functional State Update

이전 State를 기준으로 새로운 State를 계산하는 경우

```jsx
setCount((prevCount) => prevCount + 1);
```

React가 Setter 함수에 이전 State 값을 전달

```text
이전 State
↓
prevCount
↓
prevCount + 1
↓
새로운 State
```

예시

```text
prevCount = 0
↓
prevCount + 1
↓
1
```

### Multiple State Updates

다음 코드 확인

```jsx
function increaseThreeTimes() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
```

처음 `count`가 `0`이라고 가정

직관적으로는

```text
0
↓
1
↓
2
↓
3
```

이 될 것처럼 보일 수 있음

하지만 각 `setCount(count + 1)`은 현재 렌더링에서 동일한 `count` 값을 참조할 수 있음

```text
현재 렌더링의 count = 0

setCount(0 + 1)
setCount(0 + 1)
setCount(0 + 1)
```

따라서 세 번 모두 같은 값인 `1`을 업데이트하도록 요청할 수 있음

### Multiple Functional Updates

이전 State를 이용하여 연속으로 업데이트하려면 Functional State Update 사용

```jsx
function increaseThreeTimes() {
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
}
```

동작 개념

```text
초기 State
0

↓

첫 번째 Update
prevCount = 0
→ 1

↓

두 번째 Update
prevCount = 1
→ 2

↓

세 번째 Update
prevCount = 2
→ 3
```

최종 결과

```text
3
```

### Why Functional Updates Are Useful

State Update는 즉시 현재 변수 값을 직접 변경하는 방식으로 동작한다고 생각하면 안 됨

React는 State Update 요청을 처리하여 이후 렌더링에 반영

따라서 이전 State를 기준으로 새로운 State를 계산해야 하는 경우 Functional State Update를 사용하면 더 안전한 형태

```jsx
setCount((prevCount) => prevCount + 1);
```

핵심

```text
현재 렌더링에서 읽은 State를 이용하여 값 계산
→ setCount(count + 1)

이전 State를 기준으로 다음 State 계산
→ setCount((prevCount) => prevCount + 1)
```

특히 같은 Event Handler 안에서 State를 여러 번 업데이트하는 경우 Functional State Update가 중요

### Previous State Parameter

Functional State Update의 Parameter 이름은 자유롭게 지정 가능

```jsx
setCount((prevCount) => prevCount + 1);
```

```jsx
setCount((previous) => previous + 1);
```

```jsx
setCount((prev) => prev + 1);
```

모두 같은 의미

일반적으로 다음 형태를 많이 사용

```text
prev
prevCount
previousCount
```

State 이름을 알아보기 쉽게 포함하는 형태 권장

```jsx
setCount((prevCount) => prevCount + 1);
```

### Toggle with Functional Update

Boolean State도 이전 State를 기준으로 변경 가능

기존 방식

```jsx
function toggle() {
  setIsOpen(!isOpen);
}
```

Functional State Update

```jsx
function toggle() {
  setIsOpen((prevIsOpen) => !prevIsOpen);
}
```

동작

```text
prevIsOpen = false
↓
!false
↓
true
```

다시 실행

```text
prevIsOpen = true
↓
!true
↓
false
```

현재 State를 반전하는 Toggle처럼 이전 State에 의존하는 경우 Functional Update 사용 가능

### Event Handling Example

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrease() {
    setCount((prevCount) => prevCount + 1);
  }

  function handleDecrease() {
    setCount((prevCount) => prevCount - 1);
  }

  return (
    <section>
      <p>{count}</p>

      <button onClick={handleIncrease}>Increase</button>

      <button onClick={handleDecrease}>Decrease</button>
    </section>
  );
}
```

동작 흐름

```text
Click
↓
Event Handler
↓
Setter 호출
↓
이전 State 전달
↓
새로운 State 계산
↓
State Update
↓
Re-render
```

### Direct Update vs Functional Update

Direct Update

```jsx
setCount(count + 1);
```

특징

```text
현재 렌더링의 count 값을 사용
```

Functional Update

```jsx
setCount((prevCount) => prevCount + 1);
```

특징

```text
React가 제공하는 이전 State 값을 사용
```

비교

```text
setCount(count + 1)

count
↓
현재 렌더링에서 읽은 값
↓
새로운 값 계산
```

```text
setCount((prevCount) => prevCount + 1)

React가 이전 State 전달
↓
prevCount
↓
새로운 값 계산
```

### When to Use Functional Updates

이전 State 값을 기준으로 새로운 State를 만드는 경우 Functional Update 사용 권장

예시

Counter

```jsx
setCount((prevCount) => prevCount + 1);
```

Toggle

```jsx
setIsOpen((prevIsOpen) => !prevIsOpen);
```

기존 배열에 새로운 데이터를 추가하는 경우

```jsx
setUsers((prevUsers) => [...prevUsers, newUser]);
```

기존 객체 값을 기반으로 변경하는 경우

```jsx
setUser((prevUser) => ({
  ...prevUser,
  name: "JIHUN",
}));
```

배열과 객체 State는 이후 Section

### State Update Queue

같은 Event Handler 안에서 여러 State Update가 발생하면 React는 Update 요청을 처리

Functional State Update를 사용하면 각 Update가 이전 Update 결과를 기반으로 계산 가능

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

개념적인 흐름

```text
0
↓
Update 1
↓
1
↓
Update 2
↓
2
↓
Update 3
↓
3
```

Setter에 전달하는 함수는 이전 State를 받아 다음 State를 반환하는 함수

```text
previousState
↓
Updater Function
↓
nextState
```

### Common Mistakes

Functional Update 함수에서 값을 반환하지 않는 경우

잘못된 방식

```jsx
setCount((prevCount) => {
  prevCount + 1;
});
```

`{}`를 사용하는 Arrow Function은 직접 `return` 필요

수정

```jsx
setCount((prevCount) => {
  return prevCount + 1;
});
```

또는

```jsx
setCount((prevCount) => prevCount + 1);
```

---

이전 State를 직접 수정하는 방식으로 생각

```jsx
setCount((prevCount) => {
  prevCount++;
  return prevCount;
});
```

숫자는 Primitive 값이라 동작 결과 자체는 만들어질 수 있지만 Functional Update에서는 새로운 값을 계산해서 반환하는 형태로 작성하는 것이 명확

```jsx
setCount((prevCount) => prevCount + 1);
```

### Core Concept

기본 State Update

```jsx
setCount(count + 1);
```

```text
현재 렌더링의 State
↓
새로운 State 계산
```

연속 Update

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

```text
0
↓
1
↓
2
↓
3
```

핵심 패턴

```text
이전 State를 기반으로 변경
↓
Functional State Update 사용
```

```jsx
setState((prevState) => nextState);
```

React State Update에서 중요한 기준

```text
Previous State
↓
Updater Function
↓
Next State
↓
Re-render
↓
Updated UI
```

## 6. Object State and Immutable Updates

### Object State

React State에는 객체도 저장 가능

```jsx
const [user, setUser] = useState({
  name: "JIHUN",
  role: "Backend Developer",
  age: 29,
});
```

현재 State

```text
user
├── name: JIHUN
├── role: Backend Developer
└── age: 29
```

JSX에서 일반 객체와 동일하게 Property 접근 가능

```jsx
function Profile() {
  const [user, setUser] = useState({
    name: "JIHUN",
    role: "Backend Developer",
    age: 29,
  });

  return (
    <section>
      <h2>{user.name}</h2>
      <p>{user.role}</p>
      <p>{user.age}</p>
    </section>
  );
}
```

### Do Not Mutate State Directly

객체 State의 Property를 직접 변경하는 방식 사용 금지

잘못된 방식

```jsx
user.name = "MINJI";
```

또는

```jsx
function changeName() {
  user.name = "MINJI";
}
```

객체 자체를 직접 수정하는 방식

```text
기존 State 객체
↓
직접 수정
↓
같은 객체 Reference 유지
```

React State는 기존 State를 직접 수정하기보다 새로운 값을 만들어 Setter 함수에 전달하는 방식 사용

### Immutable Update

Immutable Update는 기존 State를 직접 수정하지 않고 새로운 객체를 생성하여 State를 변경하는 방식

예시

```jsx
setUser({
  ...user,
  name: "MINJI",
});
```

`...user`는 기존 객체의 Property를 새로운 객체에 복사

```text
기존 user

{
  name: "JIHUN",
  role: "Backend Developer",
  age: 29
}

↓

...user

↓

{
  name: "JIHUN",
  role: "Backend Developer",
  age: 29
}
```

이후 `name`을 다시 작성

```jsx
{
  ...user,
  name: "MINJI",
}
```

결과

```text
{
  name: "MINJI",
  role: "Backend Developer",
  age: 29
}
```

기존 객체를 수정하지 않고 새로운 객체 생성

### Spread Syntax

객체 State Update에서 Spread Syntax 자주 사용

```jsx
const user = {
  name: "JIHUN",
  role: "Backend Developer",
  age: 29,
};
```

복사

```jsx
const newUser = {
  ...user,
};
```

Property 변경

```jsx
const newUser = {
  ...user,
  age: 30,
};
```

결과

```text
name: JIHUN
role: Backend Developer
age: 30
```

뒤에서 작성한 Property가 앞에서 복사한 같은 이름의 Property를 덮어씀

따라서 순서 중요

```jsx
{
  ...user,
  name: "MINJI",
}
```

```text
name = MINJI
```

반대로

```jsx
{
  name: "MINJI",
  ...user,
}
```

기존 `user.name`이 뒤에서 다시 복사되므로

```text
name = JIHUN
```

이 될 수 있음

### Updating One Property

객체 State의 일부 Property만 변경하는 경우에도 전체 객체를 새로 생성

```jsx
function changeRole() {
  setUser({
    ...user,
    role: "Full Stack Developer",
  });
}
```

동작

```text
기존 State

{
  name: "JIHUN",
  role: "Backend Developer",
  age: 29
}

↓

Spread

↓

기존 Property 복사

↓

role만 새로운 값으로 덮어쓰기

↓

새로운 객체 생성

↓

setUser(newObject)

↓

Re-render
```

### Why Spread is Needed

다음 방식은 기존 Property를 유지하지 않음

```jsx
setUser({
  name: "MINJI",
});
```

새로운 State는

```text
{
  name: "MINJI"
}
```

만 존재

기존

```text
role
age
```

Property는 새로운 객체에 포함되지 않음

기존 Property를 유지하면서 일부만 변경하려면

```jsx
setUser({
  ...user,
  name: "MINJI",
});
```

사용

### Functional Object State Update

새로운 객체 State가 이전 State에 의존하는 경우 Functional State Update 사용 가능

```jsx
setUser((prevUser) => ({
  ...prevUser,
  age: prevUser.age + 1,
}));
```

구조

```text
Previous User State
↓
prevUser
↓
Spread
↓
변경할 Property 계산
↓
새로운 객체 반환
↓
State Update
```

예시

```jsx
function increaseAge() {
  setUser((prevUser) => ({
    ...prevUser,
    age: prevUser.age + 1,
  }));
}
```

초기값

```text
age = 29
```

실행

```text
prevUser.age = 29
↓
29 + 1
↓
age = 30
```

### Parentheses in Object Return

Arrow Function에서 객체를 바로 반환할 때 `()` 사용

```jsx
setUser((prevUser) => ({
  ...prevUser,
  age: prevUser.age + 1,
}));
```

여기서

```jsx
({
  ...
})
```

형태는 객체를 바로 반환한다는 의미

다음처럼 `{}`만 사용하면 함수 Body로 해석

```jsx
setUser((prevUser) => {
  ...prevUser
})
```

올바르지 않은 형태

직접 `return`을 사용하는 경우

```jsx
setUser((prevUser) => {
  return {
    ...prevUser,
    age: prevUser.age + 1,
  };
});
```

두 형태 모두 가능

```jsx
setUser((prevUser) => ({
  ...prevUser,
  age: prevUser.age + 1,
}));
```

### Object State with Event

예시

```jsx
import { useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    name: "JIHUN",
    role: "Backend Developer",
  });

  function handleChangeRole() {
    setUser({
      ...user,
      role: "Full Stack Developer",
    });
  }

  return (
    <section>
      <h2>{user.name}</h2>
      <p>{user.role}</p>

      <button onClick={handleChangeRole}>Change Role</button>
    </section>
  );
}
```

동작 흐름

```text
Click
↓
handleChangeRole
↓
기존 user 복사
↓
role 변경
↓
새로운 객체 생성
↓
setUser()
↓
State Update
↓
Re-render
```

### Object State with Controlled Inputs

여러 Form 값을 하나의 객체 State로 관리 가능

```jsx
const [form, setForm] = useState({
  name: "",
  email: "",
});
```

Name Input 변경

```jsx
function handleNameChange(event) {
  setForm({
    ...form,
    name: event.target.value,
  });
}
```

Email Input 변경

```jsx
function handleEmailChange(event) {
  setForm({
    ...form,
    email: event.target.value,
  });
}
```

전체 예시

```jsx
function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  function handleNameChange(event) {
    setForm({
      ...form,
      name: event.target.value,
    });
  }

  function handleEmailChange(event) {
    setForm({
      ...form,
      email: event.target.value,
    });
  }

  return (
    <form>
      <input type="text" value={form.name} onChange={handleNameChange} />

      <input type="email" value={form.email} onChange={handleEmailChange} />
    </form>
  );
}
```

데이터 구조

```text
form State
├── name
└── email
```

각 Input이 변경될 때 기존 객체를 유지하면서 해당 Property만 변경

### Dynamic Property Update

여러 Input을 하나의 Event Handler로 처리 가능

Input에 `name` Attribute 지정

```jsx
<input name="name" value={form.name} onChange={handleChange} />
<input name="email" value={form.email} onChange={handleChange} />
```

Event Handler

```jsx
function handleChange(event) {
  const { name, value } = event.target;

  setForm((prevForm) => ({
    ...prevForm,
    [name]: value,
  }));
}
```

`[name]`은 Computed Property Name

Name Input에서 Event 발생

```text
event.target.name = "name"
event.target.value = "JIHUN"
```

따라서

```jsx
[name]: value
```

는 개념적으로

```text
name: "JIHUN"
```

과 같은 결과

Email Input에서는

```text
event.target.name = "email"
```

이므로

```text
email: value
```

Property 변경

### Dynamic Form Example

```jsx
function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  return (
    <form>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
    </form>
  );
}
```

동작 흐름

```text
Input 변경
↓
onChange
↓
handleChange
↓
name / value 추출
↓
기존 form State 복사
↓
해당 Property 변경
↓
새로운 객체 생성
↓
setForm
↓
Re-render
```

### Nested Object State

객체 내부에 객체가 존재할 수 있음

```jsx
const [user, setUser] = useState({
  name: "JIHUN",
  address: {
    city: "Seoul",
    country: "Korea",
  },
});
```

`city`를 변경할 때 단순히 최상위 객체만 Spread하면 부족

잘못된 형태

```jsx
setUser({
  ...user,
  address: {
    city: "Busan",
  },
});
```

이 경우 기존

```text
country: Korea
```

가 사라짐

중첩 객체도 별도로 복사 필요

```jsx
setUser({
  ...user,
  address: {
    ...user.address,
    city: "Busan",
  },
});
```

결과

```text
user
├── name: JIHUN
└── address
    ├── city: Busan
    └── country: Korea
```

### Spread Syntax Is Shallow Copy

Spread Syntax는 객체의 모든 중첩 구조를 자동으로 깊게 복사하지 않음

```jsx
const newUser = {
  ...user,
};

console.log(user === newUser); // false
console.log(user.address === newUser.address); // true
```

최상위 Property는 복사되지만 중첩 객체는 별도로 처리 필요

따라서 중첩된 값을 변경하는 경우 변경되는 경로의 객체를 각각 복사

```jsx
setUser((prevUser) => ({
  ...prevUser,
  address: {
    ...prevUser.address,
    city: "Busan",
  },
}));
```

### Direct Mutation vs Immutable Update

잘못된 방식

```jsx
user.name = "MINJI";

setUser(user);
```

기존 객체를 직접 수정하면 이전 State와 새로운 State가 같은 객체 Reference를 사용할 수 있어 React의 State 변경 추적과 렌더링을 예측하기 어려워짐

```text
기존 객체
↓
Mutation
↓
같은 객체 사용
```

권장 방식

```jsx
setUser((prevUser) => ({
  ...prevUser,
  name: "MINJI",
}));
```

```text
기존 State
↓
복사
↓
새로운 값 적용
↓
새로운 객체
↓
Setter
```

### Common Mistakes

객체 State를 직접 변경

```jsx
user.name = "MINJI";
```

수정

```jsx
setUser((prevUser) => ({
  ...prevUser,
  name: "MINJI",
}));
```

기존 Property를 Spread하지 않음

```jsx
setUser({
  name: "MINJI",
});
```

다른 Property까지 유지해야 하는 경우

```jsx
setUser((prevUser) => ({
  ...prevUser,
  name: "MINJI",
}));
```

Spread 순서 오류

```jsx
setUser({
  name: "MINJI",
  ...user,
});
```

`user.name`이 뒤에서 다시 덮어쓸 수 있음

수정

```jsx
setUser({
  ...user,
  name: "MINJI",
});
```

중첩 객체 복사 누락

```jsx
setUser({
  ...user,
  address: {
    city: "Busan",
  },
});
```

기존 `address`의 다른 Property를 유지해야 한다면

```jsx
setUser({
  ...user,
  address: {
    ...user.address,
    city: "Busan",
  },
});
```

### Core Concept

Object State

```jsx
const [user, setUser] = useState({
  name: "JIHUN",
  role: "Backend Developer",
});
```

잘못된 방식

```jsx
user.name = "MINJI";
```

권장 방식

```jsx
setUser((prevUser) => ({
  ...prevUser,
  name: "MINJI",
}));
```

핵심 흐름

```text
Previous State
↓
Copy
↓
Change Required Property
↓
New Object
↓
Setter
↓
State Update
↓
Re-render
```

객체 State 변경의 핵심

```text
기존 State 직접 수정 X

새로운 객체 생성 O
```

Spread Syntax

```jsx
{
  ...prevState,
  changedProperty: newValue,
}
```

중첩 객체

```jsx
{
  ...prevState,
  nestedObject: {
    ...prevState.nestedObject,
    changedProperty: newValue,
  },
}
```

React State를 다룰 때 중요한 원칙

```text
State
↓
Treat as Immutable
↓
Create New Value
↓
Setter
↓
Re-render
```

## 7. Array State and Immutable Updates

### Array State

React State에는 배열도 저장 가능

```jsx
const [skills, setSkills] = useState(["Java", "Spring Boot", "React"]);
```

현재 State

```text
skills
├── Java
├── Spring Boot
└── React
```

배열 State도 일반 JavaScript 배열처럼 `map()`, `filter()` 등의 메서드 사용 가능

```jsx
function SkillList() {
  const [skills, setSkills] = useState(["Java", "Spring Boot", "React"]);

  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}
```

### Do not Mutate Array State Directly

Array State도 객체 State와 마찬가지로 직접 수정하지 않는 것이 원칙

잘못된 방식

```jsx
skills.push("Docker");
```

또는

```jsx
skills.pop();
```

```jsx
skills.splice(0, 1);
```

이러한 메서드는 기존 배열 자체를 변경하는 Mutable Method

```text
기존 Array State
↓
push / pop / splice
↓
기존 배열 자체 변경
↓
Mutation
```

React State에서는 기존 배열을 직접 수정하기보다 새로운 배열을 생성하여 Setter 함수에 전달

### Adding an Item

기존 배열에 새로운 Item을 추가할 때 Spread Syntax 사용 가능

```jsx
setSkills([...skills, "Docker"]);
```

동작

```text
기존 skills

[
  "Java",
  "Spring Boot",
  "React"
]

↓

...skills

↓

기존 Item 복사

↓

"Docker" 추가

↓

새로운 배열 생성
```

결과

```text
[
  "Java",
  "Spring Boot",
  "React",
  "Docker"
]
```

### Functional Array State Update

새로운 배열 State가 이전 State를 기반으로 만들어지는 경우 Functional State Update 사용 권장

```jsx
setSkills((prevSkills) => [...prevSkills, "Docker"]);
```

구조

```text
Previous Array State
↓
prevSkills
↓
Spread
↓
새로운 Item 추가
↓
새로운 Array 반환
↓
State Update
```

배열에 Item을 추가하는 경우 자주 사용하는 형태

```jsx
setItems((prevItems) => [...prevItems, newItem]);
```

### Adding an Object to Array State

배열 State의 Item이 객체일 수도 있음

```jsx
const [users, setUsers] = useState([
  {
    id: 1,
    name: "JIHUN",
  },
]);
```

새로운 User 추가

```jsx
const newUser = {
  id: 2,
  name: "MINJI",
};

setUsers((prevUsers) => [...prevUsers, newUser]);
```

결과

```text
users
├── id: 1 / JIHUN
└── id: 2 / MINJI
```

기존 배열을 수정하지 않고 새로운 배열 생성

### Prepending an Item

새로운 Item을 배열 앞에 추가할 수도 있음

```jsx
setSkills((prevSkills) => ["Docker", ...prevSkills]);
```

결과

```text
[
  "Docker",
  "Java",
  "Spring Boot",
  "React"
]
```

Spread 위치에 따라 추가되는 위치가 달라짐

```text
[...prevArray, newItem]
→ 뒤에 추가

[newItem, ...prevArray]
→ 앞에 추가
```

### Removing an Item with filter()

배열에서 Item을 삭제할 때 `filter()` 사용 가능

```jsx
const [users, setUsers] = useState([
  { id: 1, name: "JIHUN" },
  { id: 2, name: "MINJI" },
  { id: 3, name: "YUNA" },
]);
```

`id === 2`인 User 삭제

```jsx
setUsers((prevUsers) => prevUsers.filter((user) => user.id !== 2));
```

`filter()`는 조건이 `true`인 Item만 포함한 새로운 배열 반환

```text
id = 1
1 !== 2
→ true
→ 유지

id = 2
2 !== 2
→ false
→ 제거

id = 3
3 !== 2
→ true
→ 유지
```

결과

```text
[
  { id: 1, name: "JIHUN" },
  { id: 3, name: "YUNA" }
]
```

### Remove Handler

삭제할 ID를 Argument로 전달 가능

```jsx
function handleDelete(id) {
  setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
}
```

Button에서 호출

```jsx
<button onClick={() => handleDelete(user.id)}>Delete</button>
```

동작 흐름

```text
Delete Click
↓
handleDelete(user.id)
↓
filter()
↓
해당 id를 제외한 새로운 배열 생성
↓
setUsers()
↓
State Update
↓
Re-render
```

### Updating an Item with map()

배열 내부 특정 Item을 수정할 때 `map()` 사용 가능

```jsx
const [users, setUsers] = useState([
  { id: 1, name: "JIHUN", active: false },
  { id: 2, name: "MINJI", active: false },
]);
```

`id === 1` User의 `active` 값을 `true`로 변경

```jsx
setUsers((prevUsers) =>
  prevUsers.map((user) =>
    user.id === 1
      ? {
          ...user,
          active: true,
        }
      : user,
  ),
);
```

동작

```text
user.id === 1
↓
true
↓
새로운 User 객체 생성
↓
active 변경

user.id !== 1
↓
기존 user 그대로 반환
```

결과

```text
[
  {
    id: 1,
    name: "JIHUN",
    active: true
  },
  {
    id: 2,
    name: "MINJI",
    active: false
  }
]
```

### Why map() Is Useful for Updates

`map()`은 기존 배열을 기반으로 새로운 배열을 반환

```text
Previous Array
↓
map()
↓
각 Item 확인
↓
변경 대상
→ 새로운 Item 반환

변경 대상 아님
→ 기존 Item 반환
↓
New Array
```

따라서 Array State의 특정 Item을 Immutable하게 수정할 때 자주 사용

### Toggle an Item

특정 User의 Boolean Property를 Toggle하는 예시

```jsx
function handleToggle(id) {
  setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user.id === id
        ? {
            ...user,
            active: !user.active,
          }
        : user,
    ),
  );
}
```

동작

```text
id 일치
↓
기존 user 복사
↓
active 반전
↓
새로운 객체 반환
```

예시

```text
false
↓
true
```

다시 실행

```text
true
↓
false
```

### Array State CRUD

배열 State에서 자주 사용하는 기본 작업

```text
Create
→ Spread

Read / Render
→ map()

Find
→ find()

Filter
→ filter()

Update
→ map()

Delete
→ filter()
```

추가

```jsx
setUsers((prevUsers) => [...prevUsers, newUser]);
```

수정

```jsx
setUsers((prevUsers) =>
  prevUsers.map((user) =>
    user.id === targetId
      ? {
          ...user,
          name: "MINJI",
        }
      : user,
  ),
);
```

삭제

```jsx
setUsers((prevUsers) => prevUsers.filter((user) => user.id !== targetId));
```

### Array State with Controlled Input

Input 값을 이용하여 새로운 Item을 배열에 추가 가능

```jsx
function SkillForm() {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setSkills((prevSkills) => [...prevSkills, skill]);

    setSkill("");
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          value={skill}
          onChange={(event) => setSkill(event.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {skills.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
```

동작 흐름

```text
Input 입력
↓
skill State
↓
Submit
↓
handleSubmit
↓
prevSkills 복사
↓
skill 추가
↓
새로운 배열 생성
↓
setSkills
↓
skill 초기화
↓
Re-render
```

### Empty Input Validation

빈 문자열을 배열에 추가하지 않도록 확인 가능

```jsx
function handleSubmit(event) {
  event.preventDefault();

  if (skill.trim() === "") {
    return;
  }

  setSkills((prevSkills) => [...prevSkills, skill]);

  setSkill("");
}
```

```text
skill.trim() === ""
↓
true
↓
return
↓
추가하지 않음
```

### Array of Objects with Form

실제 애플리케이션에서는 단순 문자열보다 객체를 배열 State에 추가하는 경우가 많음

```jsx
const [users, setUsers] = useState([]);
const [name, setName] = useState("");
```

User 생성

```jsx
function handleSubmit(event) {
  event.preventDefault();

  const newUser = {
    id: Date.now(),
    name,
  };

  setUsers((prevUsers) => [...prevUsers, newUser]);
  setName("");
}
```

결과 예시

```text
users
↓
[
  {
    id: ...,
    name: "JIHUN"
  }
]
```

### Why id Is Important

객체 배열을 수정하거나 삭제하려면 각 Item을 구분할 값 필요

```jsx
{
  id: 1,
  name: "JIHUN",
}
```

삭제

```jsx
user.id !== targetId;
```

수정

```jsx
user.id === targetId;
```

렌더링

```jsx
<User key={user.id} user={user} />
```

동일한 `id`가 다음 여러 역할에서 사용 가능

```text
Item 식별
↓
수정 대상 찾기

Item 식별
↓
삭제 대상 찾기

Item 식별
↓
React key
```

### Do Not Use push() for State

잘못된 방식

```jsx
function addSkill() {
  skills.push("Docker");
  setSkills(skills);
}
```

`push()`는 기존 배열 자체를 변경

또한 `setSkills(skills)`에서 기존 배열과 같은 Reference를 다시 전달

```text
기존 skills
↓
push()
↓
기존 배열 Mutation
↓
같은 Reference
↓
setSkills(skills);
```

권장 방식

```jsx
function addSkill() {
  setSkills((prevSkills) => [...prevSkills, "Docker"]);
}
```

```text
Previous State
↓
Copy
↓
새 Item 추가
↓
New Array
↓
Setter
```

### Mutable vs Immutable Array Methods

기존 배열을 직접 변경하는 대표적인 메서드

```text
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

React State에 사용할 때는 기존 State를 직접 변경하지 않도록 주의

새로운 배열을 반환하는 대표적인 방법

```text
map()
filter()
slice()
Spread Syntax
```

예시

```jsx
const newArray = [...prevArray, newItem];
```

```jsx
const filteredArray = prevArray.filter(...);
```

```jsx
const updatedArray = prevArray.map(...);
```

### sort() with Array State

`sort()`는 기존 배열 자체를 변경하므로 State에 바로 사용하지 않는 것이 좋음

잘못된 방식

```jsx
users.sort((a, b) => a.name.localeCompare(b.name));

setUsers(users);
```

새로운 배열을 먼저 생성한 뒤 정렬

```jsx
setUsers((prevUsers) =>
  [...prevUsers].sort((a, b) => a.name.localeCompare(b.name)),
);
```

흐름

```text
Previous Array
↓
Spread
↓
New Array
↓
sort()
↓
Sorted New Array
↓
State Update
```

### reverse() with Array State

`reverse()` 역시 기존 배열을 변경

잘못된 방식

```jsx
users.reverse();

setUsers(users);
```

권장 방식

```jsx
setUsers((prevUsers) => [...prevUsers].reverse());
```

또는

```jsx
setUsers((prevUsers) => {
  const newUsers = [...prevUsers];

  newUsers.reverse();

  return newUsers;
});
```

### Nested Objects in Array State

배열 안에 객체가 있고 객체 안에 다시 중첩 객체가 존재할 수도 있음

```jsx
const [users, setUsers] = useState([
  {
    id: 1,
    name: "JIHUN",
    address: {
      city: "Seoul",
      country: "Korea",
    },
  },
]);
```

특정 User의 `city` 변경

```jsx
setUsers((prevUsers) =>
  prevUsers.map((user) =>
    user.id === 1
      ? {
          ...user,
          address: {
            ...user.address,
            city: "Busan",
          },
        }
      : user,
  ),
);
```

필요한 단계마다 새로운 값 생성

```text
Array
↓
map()
↓
변경할 User 객체 복사
↓
address 객체 복사
↓
city 변경
↓
새로운 User 객체
↓
새로운 Array
```

### Common Mistakes

Array State 직접 수정

```jsx
users.push(newUser);
```

수정

```jsx
setUsers((prevUsers) => [...prevUsers, newUser]);
```

---

삭제를 위해 `splice()` 사용

```jsx
users.splice(index, 1);
```

기존 배열을 직접 변경

삭제할 조건을 기준으로 `filter()` 사용

```jsx
setUsers((prevUsers) => prevUsers.filter((user) => user.id !== targetId));
```

---

특정 Item을 직접 변경

```jsx
users[0].name = "MINJI";
```

수정 대상은 `map()`으로 찾아 새로운 객체 생성

```jsx
setUsers((prevUsers) =>
  prevUsers.map((user) =>
    user.id === targetId
      ? {
          ...user,
          name: "MINJI",
        }
      : user,
  ),
);
```

---

`map()` 결과를 Setter에 전달하지 않는 경우

```jsx
users.map((user) => ({
  ...user,
  active: true,
}));
```

새로운 배열은 생성되지만 State는 변경되지 않음

Setter에 전달 필요

```jsx
setUsers((prevUsers) =>
  prevUsers.map((user) => ({
    ...user,
    active: true,
  })),
);
```

### Core Concept

Array State

```jsx
const [users, setUsers] = useState([]);
```

추가

```jsx
setUsers((prevUsers) => [...prevUsers, newUser]);
```

삭제

```jsx
setUsers((prevUsers) => prevUsers.filter((user) => user.id !== targetId));
```

수정

```jsx
setUsers((prevUsers) =>
  prevUsers.map((user) =>
    user.id === targetId
      ? {
          ...user,
          name: "MINJI",
        }
      : user,
  ),
);
```

핵심 흐름

```text
Previous Array State
↓
map / filter / Spread
↓
New Array
↓
Setter
↓
State Update
↓
Re-render
```

배열 State 변경의 핵심

```text
기존 배열 직접 수정 X

새로운 배열 생성 O
```

주요 패턴

```text
Add
→ Spread

Update
→ map()

Delete
→ filter()
```

객체 배열 Update

```text
Array
↓
map()
↓
Target Item 확인
↓
Object Spread
↓
Property 변경
↓
New Object
↓
New Array
```

React Array State를 다룰 때 중요한 원칙

```text
State Array
↓
Treat as Immutable
↓
Create New Array
↓
Setter
↓
Re-render
```

## 8. Derived State and State Design

### Derived Value

Derived Value는 이미 존재하는 State 또는 Props를 이용하여 계산할 수 있는 값

예시

```jsx
const [firstName, setFirstName] = useState("JIHUN");
const [lastName, setLastName] = useState("KIM");

const fullName = `${firstName} ${lastName}`;
```

`fullName`은 별도의 State가 아니라 기존 State를 이용하여 계산한 값

```text
firstName State
+
lastName State
↓
계산
↓
fullName
```

현재 값

```text
firstName = JIHUN
lastName = KIM

↓

fullName = JIHUN KIM
```

### Do Not Store Unnecessary State

다음처럼 `fullName`까지 별도의 State로 저장할 수도 있어 보임

```jsx
const [firstName, setFirstName] = useState("JIHUN");
const [lastName, setLastName] = useState("KIM");
const [fullName, setFullName] = useState("JIHUN KIM");
```

하지만 `fullName`은 이미 `firstName`과 `lastName`으로 계산 가능

따라서 별도의 State로 관리할 필요가 없음

```jsx
const fullName = `${firstName} ${lastName}`;
```

State 구조

```text
필요한 State

firstName
lastName

↓

계산 가능한 값

fullName
```

### Why Unnecessary State Is a Problem

같은 정보를 여러 State에 중복해서 저장하면 값이 서로 맞지 않는 문제가 발생할 수 있음

예시

```jsx
const [firstName, setFirstName] = useState("JIHUN");
const [lastName, setLastName] = useState("KIM");
const [fullName, setFullName] = useState("JIHUN KIM");
```

이후

```jsx
setFirstName("MINJI");
```

만 실행하면

```text
firstName = MINJI
lastName = KIM
fullName = JIHUN KIM
```

처럼 State 사이에 불일치 발생 가능

```text
실제 이름
MINJI KIM

fullName State
JIHUN KIM
```

따라서 계산 가능한 값은 필요할 때 계산하는 방식이 더 단순함

```jsx
const fullName = `${firstName} ${lastName}`;
```

### Single Source of Truth

같은 정보를 여러 곳에서 별도로 관리하기보다 하나의 기준 데이터에서 필요한 값을 계산하는 방식이 중요

예시

```jsx
const [price, setPrice] = useState(10000);
const [quantity, setQuantity] = useState(2);

const totalPrice = price * quantity;
```

```text
price
+
quantity
↓
totalPrice 계산
```

`totalPrice`를 별도의 State로 관리하지 않음

```jsx
const [totalPrice, setTotalPrice] = useState(20000);
```

대신

```jsx
const totalPrice = price * quantity;
```

사용

핵심

```text
Source State
↓
Derived Value
```

### Derived Boolean Value

Boolean 값도 기존 State를 기준으로 계산 가능

예시

```jsx
const [name, setName] = useState("");

const isEmpty = name.trim() === "";
```

```text
name
↓
trim()
↓
빈 문자열인지 확인
↓
isEmpty
```

Button 활성화 여부에 활용 가능

```jsx
<button disabled={isEmpty}>Submit</button>
```

전체 예시

```jsx
function NameForm() {
  const [name, setName] = useState("");

  const isEmpty = name.trim() === "";

  return (
    <form>
      <input value={name} onChange={(event) => setName(event.target.value)} />

      <button type="button" disabled={isEmpty}>
        Submit
      </button>
    </form>
  );
}
```

`isEmpty`는 `name`으로 바로 계산 가능하므로 별도의 State 필요 없음

### Derived Count

배열 State의 개수도 별도 State로 저장할 필요가 없는 경우가 많음

```jsx
const [users, setUsers] = useState([
  { id: 1, name: "JIHUN" },
  { id: 2, name: "MINJI" },
]);

const userCount = users.length;
```

```text
users State
↓
length
↓
userCount
```

다음처럼 중복 State를 만드는 것보다

```jsx
const [users, setUsers] = useState([]);
const [userCount, setUserCount] = useState(0);
```

필요할 때 계산

```jsx
const userCount = users.length;
```

사용

### Derived Array

배열 State를 기준으로 새로운 배열을 계산할 수도 있음

예시

```jsx
const [users, setUsers] = useState([
  { id: 1, name: "JIHUN", active: true },
  { id: 2, name: "MINJI", active: false },
  { id: 3, name: "YUNA", active: true },
]);

const activeUsers = users.filter((user) => user.active);
```

`activeUsers`는 새로운 State가 아니라 `users`에서 계산한 값

```text
users State
↓
filter()
↓
activeUsers
```

결과

```text
JIHUN
YUNA
```

### Derived Filtered List

검색 기능에서도 같은 방식 사용 가능

```jsx
const [users, setUsers] = useState([
  { id: 1, name: "JIHUN" },
  { id: 2, name: "MINJI" },
  { id: 3, name: "YUNA" },
]);

const [keyword, setKeyword] = useState("");

const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(keyword.toLowerCase()),
);
```

State

```text
users
keyword
```

Derived Value

```text
filteredUsers
```

흐름

```text
users
+
keyword
↓
filter()
↓
filteredUsers
↓
Rendering
```

### Do Not Duplicate Filtered State

다음처럼 원본 배열과 필터링 결과를 모두 State로 관리할 필요가 없는 경우가 많음

```jsx
const [users, setUsers] = useState([]);
const [keyword, setKeyword] = useState("");
const [filteredUsers, setFilteredUsers] = useState([]);
```

`filteredUsers`가 항상 `users`와 `keyword`로 계산 가능하다면

```jsx
const [users, setUsers] = useState([]);
const [keyword, setKeyword] = useState("");

const filteredUsers = users.filter((user) => user.name.includes(keyword));
```

처럼 계산해서 사용

```text
users State
+
keyword State
↓
Derived filteredUsers
```

State 중복 감소

### Derived Value Recalculation

Component가 다시 렌더링되면 Component 함수가 다시 실행

따라서 일반 변수로 작성한 Derived Value도 현재 State를 기준으로 다시 계산

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const doubleCount = count * 2;

  return (
    <section>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>

      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increase
      </button>
    </section>
  );
}
```

초기 상태

```text
count = 0
doubleCount = 0
```

Click

```text
setCount()
↓
count = 1
↓
Re-render
↓
Component 함수 다시 실행
↓
doubleCount = 1 * 2
↓
2
```

따라서 `doubleCount`를 State로 따로 관리할 필요가 없음

### State as a Snapshot

각 렌더링에서는 해당 렌더링 시점의 State 값을 사용

즉 각 렌더링은 State의 특정 시점 값을 Snapshot처럼 가지고 있음

예시

```jsx
const [count, setCount] = useState(0);
```

현재 렌더링

```text
count = 0
```

State Update

```jsx
setCount(1);
```

Setter를 호출해도 현재 실행 중인 렌더링의 `count` 값 자체가 즉시 변경되는 것은 아님

```jsx
function handleClick() {
  console.log(count); // 0

  setCount(1);

  console.log(count); // 0
}
```

동작 흐름

```text
현재 Render
count = 0
↓
setCount(1)
↓
State Update 요청
↓
현재 Render의 count = 0
↓
다음 Render
↓
count = 1
```

이후 새로운 렌더링에서는 새로운 State 값을 사용

```text
count = 1
```

각 렌더링은 해당 시점의 State 값을 기준으로 JSX와 Derived Value를 계산

```text
State Snapshot
↓
JSX
+
Derived Values
↓
UI
```

### Conditional Rendering with State

State 값에 따라 서로 다른 UI 출력 가능

예시

```jsx
function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <section>{isLoggedIn ? <p>Welcome</p> : <p>Please Login</p>}</section>;
}
```

흐름

```text
isLoggedIn
↓
true / false
↓
Conditional Rendering
↓
다른 UI 출력
```

### Conditional Rendering with &&

조건이 `true`일 때만 특정 UI를 출력하고 싶은 경우 `&&` 사용 가능

```jsx
function Notification() {
  const [hasMessage, setHasMessage] = useState(true);

  return <section>{hasMessage && <p>New Message</p>}</section>;
}
```

```text
hasMessage = true
↓
New Message 출력

hasMessage = false
↓
출력하지 않음
```

### Derived Boolean with Conditional Rendering

Derived Value와 Conditional Rendering을 함께 사용할 수 있음

```jsx
function UserList() {
  const [users, setUsers] = useState([]);

  const hasUsers = users.length > 0;

  return (
    <section>
      {hasUsers ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No Users</p>
      )}
    </section>
  );
}
```

`hasUsers`는 State가 아님

```text
users State
↓
users.length > 0
↓
hasUsers
↓
Conditional Rendering
```

### State Design

Component를 설계할 때 모든 값을 State로 만드는 것이 좋은 방식은 아님

먼저 해당 값이 실제로 State가 필요한지 판단

State가 필요한 대표적인 경우

```text
렌더링 사이에서 값을 유지해야 하는 값

사용자 Interaction 또는 외부 데이터에 의해 변경되는 값

값이 변경되었을 때 UI에 반영되어야 하는 값
```

예시

```text
Input 값
→ State

Toggle 상태
→ State

선택된 Item
→ State

서버에서 받아온 데이터
→ State
```

### Values That Usually Do Not Need State

다른 State나 Props로 계산 가능한 값은 일반적으로 별도의 State가 필요하지 않음

예시

```text
firstName + lastName
→ fullName

price × quantity
→ totalPrice

users.length
→ userCount

users.filter(...)
→ filteredUsers

name.trim() === ""
→ isEmpty
```

이런 값은 Derived Value로 계산 가능

### State or Derived Value

예시 1

```jsx
const [price, setPrice] = useState(10000);
const [quantity, setQuantity] = useState(2);
```

다음 값

```text
totalPrice
```

는

```jsx
const totalPrice = price * quantity;
```

로 계산 가능

따라서 Derived Value

---

예시 2

```jsx
const [isOpen, setIsOpen] = useState(false);
```

`isOpen`은 사용자가 버튼을 클릭하여 변경

다른 값으로부터 단순히 계산되는 값이 아님

따라서 State

---

예시 3

```jsx
const [users, setUsers] = useState([]);
```

User 개수

```jsx
const userCount = users.length;
```

Derived Value

---

예시 4

검색어

```jsx
const [keyword, setKeyword] = useState("");
```

사용자가 직접 변경하므로 State

검색 결과

```jsx
const filteredUsers = users.filter(...);
```

기존 `users`와 `keyword`를 이용해 계산 가능하므로 Derived Value

### Minimal State

State는 필요한 최소한의 값만 저장하는 것이 좋음

예시

```text
users
keyword
```

만 State로 관리

```jsx
const [users, setUsers] = useState([]);
const [keyword, setKeyword] = useState("");
```

필요한 나머지 값 계산

```jsx
const filteredUsers = users.filter(...);
const userCount = users.length;
const hasUsers = users.length > 0;
```

구조

```text
State
├── users
└── keyword

Derived Values
├── filteredUsers
├── userCount
└── hasUsers
```

State가 단순해지고 값 사이의 불일치 가능성도 감소

### Keep Related Data Consistent

같은 의미의 데이터를 여러 State에 중복 저장하지 않는 것이 중요

좋지 않은 예시

```jsx
const [users, setUsers] = useState([]);
const [userCount, setUserCount] = useState(0);
```

User 추가 시

```jsx
setUsers((prevUsers) => [...prevUsers, newUser]);

setUserCount((prevCount) => prevCount + 1);
```

두 State를 항상 함께 정확하게 변경해야 함

한쪽 Update를 빠뜨리면

```text
users.length = 3
userCount = 2
```

처럼 불일치 가능

대신

```jsx
const [users, setUsers] = useState([]);

const userCount = users.length;
```

사용

```text
users
↓
Single Source of Truth
↓
userCount 계산
```

### State Design Questions

새로운 값을 State로 만들기 전에 다음 순서로 생각

```text
1. 이 값이 시간이 지나면서 변경되는가?

2. 변경되었을 때 UI에 영향을 주는가?

3. 다른 State 또는 Props에서 계산 가능한가?
```

다른 값에서 계산 가능하다면

```text
State 추가 X
Derived Value 사용
```

직접 변경되는 독립적인 값이라면

```text
State 사용 고려
```

### Common Mistakes

계산 가능한 값을 State로 중복 저장

```jsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [fullName, setFullName] = useState("");
```

수정

```jsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

const fullName = `${firstName} ${lastName}`;
```

---

배열의 개수를 별도의 State로 관리

```jsx
const [users, setUsers] = useState([]);
const [userCount, setUserCount] = useState(0);
```

수정

```jsx
const [users, setUsers] = useState([]);

const userCount = users.length;
```

---

필터링 결과를 별도의 State로 중복 관리

```jsx
const [users, setUsers] = useState([]);
const [keyword, setKeyword] = useState("");
const [filteredUsers, setFilteredUsers] = useState([]);
```

계산 가능한 경우

```jsx
const [users, setUsers] = useState([]);
const [keyword, setKeyword] = useState("");

const filteredUsers = users.filter((user) => user.name.includes(keyword));
```

사용

### Core Concept

State

```text
Component가 렌더링 사이에서 기억해야 하며
변경 시 UI에 영향을 주는 데이터
```

Derived Value

```text
State 또는 Props로부터 계산 가능한 값
```

예시

```jsx
const [price, setPrice] = useState(10000);
const [quantity, setQuantity] = useState(2);

const totalPrice = price * quantity;
```

구조

```text
State
├── price
└── quantity
      ↓
   계산
      ↓
Derived Value
└── totalPrice
```

State Design의 핵심

```text
필요한 최소 State만 저장
↓
계산 가능한 값은 계산
↓
중복 State 제거
↓
Single Source of Truth 유지
```

Conditional Rendering

```text
State / Derived Value
↓
Condition
↓
UI 선택
```

React Component의 기본 흐름

```text
Props
+
State
↓
Derived Values
↓
JSX
↓
UI
```

State Update 발생

```text
Event
↓
Setter
↓
State Update
↓
Re-render
↓
Derived Values 다시 계산
↓
JSX 다시 계산
↓
Updated UI
```

핵심 질문

```text
이 값이 정말 State여야 하는가?

다른 State 또는 Props에서 계산할 수 있는가?

계산 가능하다면 Derived Value 사용
```
