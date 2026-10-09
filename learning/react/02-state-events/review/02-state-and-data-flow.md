# Review 2 — State & Data Flow

## Q1. State vs Derived Value

다음 코드 확인

```jsx
const [users, setUsers] = useState([]);
const [keyword, setKeyword] = useState("");

const filteredUsers = users.filter((user) => user.name.includes(keyword));

const userCount = users.length;
const hasUsers = users.length > 0;
```

### Question

1. 여기서 실제 State는 무엇인가?

- `users`
- `keyword`

`useState()`로 선언되었으며 React가 렌더링 사이에서 값을 유지하고 관리하는 데이터

2. Derived Value는 무엇인가?

- `filteredUsers`
- `userCount`
- `hasUsers`

모두 기존 State로부터 계산 가능한 값

3. `filteredUsers`를 별도의 `useState`로 관리하지 않는 이유는 무엇인가?

- 데이터 동기화 오류 방지 : `users`나 `keyword`가 변경될 때 `filteredUsers` 상태를 별도로 관리하면 수동으로 갱신을 맞춰주어야 하므로 데이터 불일치 발생 쉬움
- 불필요한 State 관리 방지 : `filteredUsers`는 `users`와 `keyword`로 계산 가능한 값이므로 별도 State로 저장할 필요 없음. 불필요한 State를 중복 관리하면 동기화를 위한 추가 Update가 발생하거나 State 간 데이터 불일치 가능성이 높아짐

## Q2. State as a Snapshot

다음 코드 확인

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

초기 `count`는 `0`이라고 가정

### Question

1. 버튼을 한 번 누르면 `console.log(count)`에는 무엇이 출력되는가?

- 0

2. 클릭 후 화면의 `count`는 얼마인가?

- 1

3. 콘솔과 화면의 값이 달라질 수 있는 이유는 무엇인가?

- React의 State는 각 렌더링에서 Snapshot처럼 사용됨
- `handleClick`이 실행되는 시점의 `count` 변수는 당시 렌더링 스냅샷의 값인 0으로 고정되어 있으므로, `setCount(0 + 1)`을 요청하고 `console.log(0)`을 실행함
- 따라서 콘솔에는 이전 값(0)이 출력되고, 이후 React가 새 값(1)으로 컴포넌트를 리렌더딩하면서 화면에는 1이 나타남

## Q3. Functional State Update

다음 두 코드 비교

- Code A

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

- Code B

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

초기 `count`가 `0`이고, 각 코드 묶음이 하나의 Event Handler에서 실행된다고 가정

### Question

1. Code A의 최종 결과는?

- 1

2. Code B의 최종 결과는?

- 3

3. 두 코드의 결과가 달라지는 이유는 무엇인가?

- Code A : 현재 렌더링의 `count` 값(0)을 참조하므로 `setCount(1)`을 3번 호출하는 것과 같음
- React는 State Update 요청들을 Queue에 넣고 처리하지만, 세 요청이 모두 State를 `1`로 교체하는 것이므로 최종 결과는 `1`
- Code B : Functional State Update를 사용하므로 각 Updater Function이 이전 Update 결과를 기반으로 다음 State 계산
- 따라서 Code B의 최종 결과는 `3`

## Q4. Object State and Immutable Update

다음 코드 확인

```jsx
const [user, setUser] = useState({
  name: "JIHUN",
  address: {
    city: "Seoul",
    country: "Korea",
  },
});
```

다음과 같이 State를 변경

```jsx
setUser({
  ...user,
  address: {
    city: "Busan",
  },
});
```

### Question

1. 위 코드의 문제점은 무엇인가?

- 최상위 `user` 객체는 새로 생성하지만 `address` 객체를 새로운 객체로 완전히 대체. 따라서 기존 `address.country` Property가 사라짐

```text
변경 전
address
├── city: Seoul
└── country: Korea

변경 후
address
└── city: Busan
```

- 기존 State를 직접 Mutation하는 오류는 아니지만, 유지해야 할 Property를 누락한 문제

2. `country`를 유지하면서 `city`만 변경하려면 어떻게 해야 하는가?

```jsx
setUser((prevUser) => ({
  ...prevUser,
  address: {
    ...prevUser.address,
    city: "Busan",
  },
}));
```

변경 결과

```text
user
├── name: JIHUN
└── address
    ├── city: Busan
    └── country: Korea
```

3. 이 문제와 Shallow Copy는 어떤 관계가 있는가?

- Spread Syntax는 Shallow Copy 수행. 최상위 객체를 복사해도 중첩 객체까지 자동으로 깊게 복사하지는 않음

## Q5. Array State CRUD

다음 코드 확인

```jsx
const [users, setUsers] = useState([
  { id: 1, name: "JIHUN", active: true },
  { id: 2, name: "MINJI", active: false },
]);
```

### Question

1. 새로운 User를 추가할 때 적절한 배열 처리 방식은?

- Spread Syntax를 이용하여 새로운 배열 생성

```jsx
const newUser = {
  id: 3,
  name: "YUNA",
  active: false,
};

setUsers((prevUsers) => [...prevUsers, newUser]);
```

2. `id === 2`인 User를 삭제할 때 사용할 메서드는?

- `filter()` 사용

```jsx
setUsers((prevUsers) => prevUsers.filter((user) => user.id !== 2));
```

3. `id === 1`인 User의 `active`를 반전할 때 사용할 메서드는?

- `map()` + Object Spread 사용

```jsx
setUsers((prevUsers) =>
  prevUsers.map((user) =>
    user.id === 1
      ? {
          ...user,
          active: !user.active,
        }
      : user,
  ),
);
```

4. React State에서 `users.push(newUser)`를 직접 사용하지 않는 이유는?

- `push()`는 기존 배열 자체를 변경하는 Mutable Method
- React State를 직접 Mutation하면 이전 State와 새로운 State가 동일한 배열 Reference를 공유할 수 있으며 React가 State 변경을 감지하지 못해 렌더링이 생략될 수 있음
- 따라서 새로운 배열을 생성하여 Setter 함수에 전달

## Q6. Controlled Input

다음 코드 확인

```jsx
function NameInput() {
  const [name, setName] = useState("");

  return <input type="text" value={name} />;
}
```

### Question

1. 이 Input에 사용자가 정상적으로 글자를 입력할 수 있는가?

- 일반적인 사용자 입력으로 값을 변경할 수 없음

2. 왜 그런가?

```jsx
<input type="text" value={name} />
```

- `value`가 React State에 의해 제어되지만 입력 변경을 State에 반영하는 `onChange`가 없음
- 따라서 `name` State가 변경되지 않으며 Input은 사실상 읽기 전용 형태

3. 정상적인 Controlled Input으로 만들려면 무엇을 추가해야 하는가?

```jsx
function NameInput() {
  const [name, setName] = useState("");

  return (
    <input
      type="text"
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
  );
}
```

## Q7. Edit and Cancel State Design

프로필 수정 기능을 만든다고 가정

```jsx
const [profile, setProfile] = useState({
  name: "JIHUN",
  role: "Backend Developer",
});
```

사용자가 Edit 버튼을 눌러 이름을 `"MINJI"`로 수정했지만, Save 대신 Cancel을 선택한 상황

### Question

1. Form을 `profile` State에 직접 연결하면 어떤 문제가 발생할 수 있는가?

- 수정 중인 Input을 `profile` State에 직접 연결하면 사용자가 입력할 때마다 저장된 Profile 데이터도 변경됨
- 따라서 Save하지 않고 Cancel을 눌러도 기존 Profile 값이 이미 변경된 상태가 될 수 있음

2. Cancel 기능을 올바르게 구현하려면 State를 어떻게 설계하는 것이 좋은가?

- 저장된 데이터와 수정 중인 데이터를 분리

```jsx
const [profile, setProfile] = useState({
  name: "JIHUN",
  role: "Backend Developer",
});

const [form, setForm] = useState({ ...profile });

const [isEditing, setIsEditing] = useState(false);
```

- 각 State의 역할

```text
profile
→ 저장된 Profile 데이터

form
→ 수정 중인 임시 데이터

isEditing
→ Edit Mode 여부
```

- Edit 버튼 클릭 시

```jsx
function handleEdit() {
  setForm({ ...profile });
  setIsEditing(true);
}
```

- 현재 Profile 데이터를 Form에 복사한 뒤 수정 시작

3. Save와 Cancel은 각각 어떤 State를 변경해야 하는가?

Save

```jsx
function handleSave(event) {
  event.preventDefault();

  setProfile({ ...form });
  setIsEditing(false);
}
```

- 수정된 Form 데이터를 Profile에 반영

Cancel

```jsx
function handleCancel() {
  setForm({ ...profile });
  setIsEditing(false);
}
```

- 수정 중인 Form을 기존 Profile 데이터로 초기화
- 실제 저장된 Profile은 변경하지 않음

## Q8. React State Update Flow

다음 코드 확인

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const doubleCount = count * 2;

  function handleIncrease() {
    setCount((prev) => prev + 1);
  }

  return (
    <section>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>

      <button onClick={handleIncrease}>Increase</button>
    </section>
  );
}
```

### Question

1. `count`와 `doubleCount` 중 State는 무엇인가?

State

```jsx
const [count, setCount] = useState(0);
```

Derived Value

```jsx
const doubleCount = count * 2;
```

2. 버튼을 누르면 어떤 함수가 실행되는가?

```jsx
handleIncrease();
```

- 내부에서 Functional State Update 실행

```jsx
setCount((prev) => prev + 1);
```

3. Setter 호출 후 React에서는 어떤 흐름으로 UI가 갱신되는가?

```text
Button Click
↓
onClick
↓
handleIncrease()
↓
setCount()
↓
State Update 요청
↓
React Re-render
↓
새로운 count 값 사용
↓
doubleCount 다시 계산
↓
JSX 계산
↓
필요한 DOM 변경 반영
↓
Updated UI
```

4. `doubleCount`를 별도 State로 저장하지 않아도 되는 이유는?

- `doubleCount`는 기존 `count`를 이용하여 언제든 계산 가능

```jsx
const doubleCount = count * 2;
```

- 따라서 별도 `useState`로 저장할 필요가 없음
- Component가 Re-render되면 현재 `count` 값을 이용하여 `doubleCount`도 다시 계산됨
- 불필요한 State를 줄여 데이터 불일치를 방지하고 Single Source of Truth 유지 가능

## Review Summary

이번 Review에서 확인할 핵심 개념

- State vs Derived Value
- State as a Snapshot
- Functional State Update
- Immutable Object Update
- Array State CRUD
- Controlled Input
- Edit / Cancel State Design
- React Re-rendering Flow

### Core Flow

```text
Event
↓
Event Handler
↓
Setter
↓
State Update 요청
↓
React Re-render
↓
Derived Value 계산
↓
JSX 계산
↓
필요한 DOM 변경 반영
↓
Updated UI
```
