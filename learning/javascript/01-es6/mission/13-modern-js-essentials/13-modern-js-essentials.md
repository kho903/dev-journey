# Mission - Modern JavaScript Essentials

## Mission 1. User Class

### Folder

```text
01-user-class/
└── app.js
```

### Requirements

- `User` Class를 작성한다.
- `constructor`에서 `id`, `name`, `role`을 전달받는다.
- `role`이 `null` 또는 `undefined`이면 `"guest"`를 기본값으로 사용한다.
- `introduce()` Instance Method를 작성한다.
- `changeRole(newRole)` Instance Method를 작성한다.
- 서로 다른 User Instance를 2개 생성한다.
- 사용자 정보와 Method 실행 결과를 출력한다.
- `instanceof`로 User Instance인지 확인한다.

### Expected Output

```text
JIHUN is a backend.
KIM is a guest.
KIM is a frontend.
true
```

---

## Mission 2. Admin Inheritance

### Folder

```text
02-admin-inheritance/
└── app.js
```

### Requirements

- `User` Class를 작성한다.
- `User`는 `name`, `role` Property를 가진다.
- `introduce()` Method를 작성한다.
- `Admin` Class가 `User`를 상속받도록 작성한다.
- `Admin`은 추가로 `permission` Property를 가진다.
- 자식 Constructor에서 `super()`를 사용한다.
- `introduce()`를 Override한다.
- Override된 Method에서 `super.introduce()`를 호출한다.
- `manageUsers()` Method를 작성한다.
- `Admin` Instance가 `Admin`과 `User` 모두의 Instance인지 확인한다.

### Expected Output

```text
JIHUN is an admin. Permission: ALL
JIHUN can manage users.
true
true
```

---

## Mission 3. Closure User Account

### Folder

```text
03-closure-user-account/
└── app.js
```

### Requirements

`createUserAccount(name)` 함수를 작성한다.

함수 내부에 다음 Private State를 선언한다.

```text
name
role
loginCount
```

초기값:

```text
role: guest
loginCount: 0
```

다음 Method를 가진 객체를 반환한다.

- `getName()` : 사용자 이름 반환
- `getRole()` : 현재 역할 반환
- `changeRole(newRole)` : 역할 변경
- `login()` : 로그인 횟수를 1 증가시키고 반환
- `getLoginCount()` : 현재 로그인 횟수 반환

외부에서 `role`, `loginCount`에 직접 접근할 수 없는 것도 확인한다.

### Expected Output

```text
JIHUN
guest
backend
1
2
2
undefined
undefined
```

---

## Mission 4. User Validation

### Folder

```text
04-user-validation/
└── app.js
```

### Requirements

`createUser(name, password, profile)` 함수를 작성한다.

다음 조건에서 `Error`를 발생시킨다.

- `name`이 문자열이 아니거나 공백이면 `"Name is required"`
- `password`가 문자열이 아니거나 8글자 미만이면 `"Password must be at least 8 characters"`

검증을 통과하면 다음 객체를 반환한다.

```js
{
  name,
  password,
  email,
}
```

이메일은 Optional Chaining과 Nullish Coalescing을 사용한다.

```js
profile?.contact?.email ?? "No email";
```

다음 세 가지 경우를 `try-catch-finally`로 확인한다.

1. 모든 값이 정상인 사용자
2. 이메일 정보가 없는 사용자
3. 비밀번호가 잘못된 사용자

`finally`에서는 항상 다음 문장을 출력한다.

```text
User creation attempt completed
```

---

## Mission 5. User Management System

### Folder

```text
05-user-management-system/
└── app.js
```

### Requirements

지금까지 배운 내용을 결합하여 사용자 관리 프로그램을 작성한다.

### User Class

- `id`, `name`, `role`, `profile`을 전달받는다.
- 이름이 없으면 Error를 발생시킨다.
- 역할이 `null` 또는 `undefined`이면 `"guest"`를 사용한다.
- `getEmail()` Method를 작성한다.
- 이메일이 없으면 `"No email"`을 반환한다.
- `introduce()` Method를 작성한다.

### Admin Class

- `User`를 상속받는다.
- `permission` Property를 추가한다.
- `introduce()`를 Override한다.
- 부모 Method를 `super`로 호출한다.

### User Manager

`createUserManager()` 함수를 Closure로 작성한다.

함수 내부의 사용자 배열은 외부에 직접 노출하지 않는다.

다음 Method를 반환한다.

- `addUser(user)` : 사용자 추가
- `findUserById(id)` : ID로 사용자 검색
- `findUsersByRole(role)` : 역할로 사용자 검색
- `getUsers()` : 사용자 배열의 복사본 반환
- `getUserCount()` : 사용자 수 반환

### Error Handling

- 중복된 ID를 추가하면 Error를 발생시킨다.
- 오류는 `try-catch`에서 처리한다.
- 작업 종료 메시지는 `finally`에서 출력한다.

### Required Checks

- 일반 사용자 추가
- 관리자 추가
- 전체 사용자 출력
- ID로 사용자 검색
- 역할로 사용자 검색
- 이메일이 없는 사용자 확인
- 중복 ID 추가 오류 확인
- 내부 사용자 배열에 직접 접근할 수 없는지 확인
