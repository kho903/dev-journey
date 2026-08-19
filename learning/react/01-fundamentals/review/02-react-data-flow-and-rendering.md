# React Data Flow and Rendering Review

## 1. Component Data Flow

React Component의 데이터 흐름은 부모 Component에서 자식 Component 방향

```text
users
↓
UserList
↓
User
↓
Card
```

배열을 사용하는 경우 `map()`을 통해 각각의 데이터를 자식 Component의 Props로 전달

```text
teams
↓
TeamList
↓
teams.map()
↓
Team
↓
members
↓
members.map()
↓
Member
```

## 2. children

Opening Tag와 Closing Tag 사이의 JSX가 `children`으로 전달됨

```jsx
<Card title={name}>
  <p>{role}</p>
  <p>{isActive ? "Active" : "Offline"}</p>
</Card>
```

위 코드에서 `Card`의 `children`

```jsx
<p>{role}</p>
<p>{isActive ? "Active" : "Offline"}</p>
```

Component 자체가 `children`으로 전달되는 것이 아니라 Component Tag 사이에 작성한 JSX가 전달됨

```text
<Component>
  JSX
</Component>

↓

children
```

## 3. key

`key`는 `map()`으로 반복 렌더링되는 각 Element 또는 Component를 React가 구분하기 위한 값

```jsx
users.map((user) => <User key={user.id} name={user.name} />);
```

`map()`이 직접 반복 생성하는 대상이 `User`이므로 `key`를 `User`에 지정

중첩된 `map()`에서는 각 반복 단계마다 각각의 `key` 필요

```text
teams.map()
-> <Team key={team.id} />

members.map()
-> <Member key={member.id} />

skills.map()
-> <li key={skill}>
```

`key`는 일반 Props처럼 자식 Component에서 사용할 수 있는 값이 아님

```jsx
<Member key={member.id} />
```

위의 `key`는 React가 목록의 각 항목을 구분하기 위해 사용하는 특별한 값

## 4. Props and Array Data

배열 자체를 Props로 전달할 수 있음

```jsx
<Team name={team.name} members={team.members} />
```

`team.members` 배열 전체가 `Team` Component의 `members` Props로 전달됨

```text
members 배열
↓
Team
↓
members.map()
↓
각 member 객체
↓
Member Props
```

예시

```jsx
{
  members.map((member) => (
    <Member key={member.id} name={member.name} isLeader={member.isLeader} />
  ));
}
```

## 5. Conditional Rendering

### Ternary Operator

두 가지 출력 중 하나를 선택할 때 사용

```jsx
<p>{isActive ? "Active" : "Offline"}</p>
```

`isActive`가 `true`이면

```text
Active
```

`false`이면

```text
Offline
```

출력

### && Operator

조건이 참일 때만 Element를 렌더링할 때 사용

```jsx
{
  isActive && <button>Message</button>;
}
```

`isActive`가 `true`이면 버튼 렌더링

```jsx
<button>Message</button>
```

`isActive`가 `false`이면 버튼 렌더링되지 않음

## 6. Component Rendering Flow

Component의 흐름은 부모 Component부터 자식 Component 방향으로 확인

예시

```text
App
↓
Profile
↓
Layout
```

```jsx
function App() {
  return <Profile name="JIHUN" skills={["Java", "Spring Boot", "React"]} />;
}
```

`App`에서 `Profile`로 Props 전달

```jsx
function Profile({ name, skills }) {
  return (
    <Layout title="Developer Profile">
      <h2>{name}</h2>

      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </Layout>
  );
}
```

`Profile`에서 `Layout`으로 `title` Props와 `children` 전달

```text
App
↓
Profile
├── name
└── skills
↓
Layout
├── title
└── children
```

## 7. Review Points

- Props는 부모 Component에서 자식 Component 방향으로 전달
- `children`은 Opening Tag와 Closing Tag 사이의 JSX
- 배열 자체도 Props로 전달 가능
- `map()`으로 반복 렌더링되는 JSX에 `key` 지정
- `map()`이 직접 생성하는 Element 또는 Component에 `key` 지정
- 중첩된 `map()`에서는 각 반복 단계마다 각각의 `key` 필요
- `key`는 일반 Props가 아니라 React가 목록 항목을 구분하기 위한 특별한 값
- Boolean 값을 그대로 JSX에 출력하기보다 삼항 연산자나 `&&`를 이용해 표현
- 삼항 연산자는 두 가지 결과 중 하나를 선택할 때 사용
- `&&`는 조건이 참일 때만 Element를 렌더링할 때 사용
- Component 데이터 흐름은 부모 → 자식 방향으로 추적

## 8. Review Mistakes

### children

처음에는 `children`으로 부모 Component 자체가 전달된다고 혼동

실제로는 Component Tag 사이에 작성된 JSX가 `children`으로 전달됨

```jsx
<Card>
  <p>Content</p>
</Card>
```

위 코드에서 `children`

```jsx
<p>Content</p>
```

### key

처음에는 단순히 데이터가 여러 개이기 때문에 `key`를 사용한다고 이해

보다 정확하게는 `map()`을 통해 반복 렌더링되는 각 항목을 React가 구분하기 위해 `key` 사용

```jsx
users.map((user) => <User key={user.id} />);
```

### Component Data Flow

Component의 데이터 흐름은 데이터를 가지고 있는 부모에서 이를 전달받는 자식 방향

```text
users
↓
UserList
↓
User
↓
Card
```
