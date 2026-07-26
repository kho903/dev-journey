# Modern JavaScript Essentials

## 1. JavaScript Class

Class는 비슷한 형태의 객체를 반복해서 만들기 위한 문법

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  introduce() {
    return `My name is ${this.name} and my role is ${this.role}.`;
  }
}
```

### Instance 생성

`new`를 사용하여 Class를 기반으로 객체를 생성함

```js
const user1 = new User("JIHUN", "backend");
const user2 = new User("KIM", "frontend");

console.log(user1);
console.log(user2);
```

`user1`과 `user2`는 `User` Class로부터 만들어진 서로 다른 Instance

```js
console.log(user1 instanceof User);
// true
```

### Class와 Instance

```text
Class
-> 객체를 만들기 위한 설계도

Instance
-> Class를 기반으로 실제 생성된 객체
```

## 2. Constructor

`constructor`는 `new`로 Instance를 생성할 때 자동으로 실행되는 특별한 메서드

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const user = new User("JIHUN", 29);

console.log(user.name);
// JIHUN

console.log(user.age);
// 29
```

`constructor`의 매개변수로 전달된 값을 Instance의 Property에 저장할 수 있음

## 3. this

Class의 Instance Method에서 `this`는 해당 Method를 호출한 Instance를 가리킴

`constructor` 내부에서는 `new`를 통해 현재 생성 중인 Instance를 가리킴

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

const user = new User("JIHUN");

console.log(user.greet());
// Hello, JIHUN
```

여기서 `this.name`은 `user.name`을 의미함

```text
this
-> 현재 메서드를 호출한 객체
```

## 4. Instance Property와 Instance Method

### Instance Property

각 Instance가 가지는 데이터

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}
```

`name`과 `role`은 Instance Property

### Instance Method

Instance를 통해 호출하는 함수

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  changeRole(newRole) {
    this.role = newRole;
  }
}

const user = new User("JIHUN", "frontend");

user.changeRole("backend");

console.log(user.role);
// backend
```

## 5. Class Inheritance

`extends`를 사용하면 기존 Class의 Property와 Method를 물려받을 수 있음

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

class Admin extends User {
  deleteUser() {
    return `${this.name} deleted a user.`;
  }
}

const admin = new Admin("JIHUN");

console.log(admin.greet());
// Hello, JIHUN

console.log(admin.deleteUser());
// JIHUN deleted a user.
```

`Admin`은 `User`를 상속받았기 때문에 `greet()` 사용 가능

## 6. super

자식 Class에서 별도의 `constructor`를 작성하면 `super()`를 먼저 호출해야 함

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

class Admin extends User {
  constructor(name, permission) {
    super(name);

    this.permission = permission;
  }
}

const admin = new Admin("JIHUN", "ALL");

console.log(admin.name);
// JIHUN

console.log(admin.permission);
// ALL
```

```js
super(name);
```

`super()`는 부모 Class의 `constructor`를 호출함

자식 Class의 `constructor`에서 `this`를 사용하기 전에 반드시 `super()`가 실행되어야 함

### 부모 Method 호출

`super.methodName()` 형태로 부모 Class의 Method를 호출할 수도 있음

```js
class User {
  greet() {
    return "Hello";
  }
}

class Admin extends User {
  greet() {
    return `${super.greet()}, Admin`;
  }
}

const admin = new Admin();

console.log(admin.greet());
// Hello, Admin
```

# Closure

## 7. Lexical Scope

Lexical Scope는 함수가 선언된 위치를 기준으로 접근할 수 있는 변수가 결정되는 규칙

```js
const globalMessage = "global";

function outer() {
  const outerMessage = "outer";

  function inner() {
    console.log(globalMessage);
    console.log(outerMessage);
  }

  inner();
}

outer();
```

`inner()`는 자신이 선언된 위치의 바깥 Scope에 있는 `outerMessage`에 접근할 수 있음

```text
inner Function
-> outer Function의 변수에 접근 가능

outer Function
-> inner Function 내부 변수에는 접근 불가능
```

## 8. Closure

Closure는 함수가 자신이 선언된 위치의 Lexical Environment를 기억하고, 그 Scope의 변수에 계속 접근할 수 있는 특성

외부 함수의 실행이 끝난 뒤에도 내부 함수가 외부 변수에 접근하는 것은 Closure를 확인할 수 있는 대표적인 예시

```js
function createCounter() {
  let count = 0;

  function increase() {
    count++;

    return count;
  }

  return increase;
}

const counter = createCounter();

console.log(counter());
// 1

console.log(counter());
// 2

console.log(counter());
// 3
```

`createCounter()`의 실행은 끝났지만, 반환된 `increase()` 함수는 계속 `count`에 접근할 수 있음

```text
Closure
-> 함수와 그 함수가 선언될 당시의 Lexical Environment의 조합
```

## 9. Closure를 사용한 상태 보존

Closure를 사용하면 함수 호출 사이에 값을 유지할 수 있음

```js
function createUser(name) {
  let role = "guest";

  return {
    getName() {
      return name;
    },

    getRole() {
      return role;
    },

    changeRole(newRole) {
      role = newRole;
    },
  };
}

const user = createUser("JIHUN");

console.log(user.getRole());
// guest

user.changeRole("backend");

console.log(user.getRole());
// backend
```

`name`과 `role`은 외부에서 직접 접근할 수 없고, 반환된 Method를 통해서만 접근하거나 변경할 수 있음

```js
console.log(user.role);
// undefined
```

이처럼 Closure를 사용해 간단한 Private State를 만들 수 있음

# Error Handling

## 10. try-catch

`try` 내부에서 발생한 오류를 `catch`가 처리하면, 해당 오류 때문에 프로그램의 실행이 즉시 중단되는 것을 방지할 수 있음

```js
try {
  const user = JSON.parse('{"name":"JIHUN"}');

  console.log(user);
} catch (error) {
  console.log("JSON parsing failed");
}
```

잘못된 JSON 문자열을 전달하면 오류가 발생함

```js
try {
  const user = JSON.parse("{name:JIHUN}");

  console.log(user);
} catch (error) {
  console.log("JSON parsing failed");
  console.log(error.message);
}
```

오류가 발생하더라도 프로그램 전체가 즉시 종료되는 것을 방지 가능

## 11. Error Object

`catch`의 매개변수에는 발생한 Error Object가 전달됨

```js
try {
  JSON.parse("{invalid json}");
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
```

주요 Property:

```text
error.name
→ 오류 종류

error.message
→ 오류 내용

error.stack
→ 오류가 발생한 위치와 호출 정보
```

## 12. throw

`throw`를 사용하면 개발자가 직접 오류를 발생시킬 수 있음

```js
function validateAge(age) {
  if (age < 0) {
    throw new Error("Age cannot be negative");
  }

  return true;
}
```

```js
try {
  validateAge(-1);
} catch (error) {
  console.log(error.message);
}
// Age cannot be negative
```

단순히 `false`만 반환하는 것과 달리, `throw`는 정상적인 실행 흐름을 중단하고 가까운 `catch`로 이동함

## 13. finally

`finally`는 오류 발생 여부와 관계없이 항상 실행됨

```js
try {
  console.log("try");
} catch (error) {
  console.log("catch");
} finally {
  console.log("finally");
}
```

정상 실행:

```text
try
finally
```

오류 발생:

```text
catch
finally
```

`finally`는 연결 종료, 로딩 상태 해제, 자원 정리 등에 사용 가능

```js
let loading = true;

try {
  console.log("Load data");
} catch (error) {
  console.log(error.message);
} finally {
  loading = false;
}
```

## 14. Input Validation과 Error Handling

```js
function createUser(name, password) {
  if (!name) {
    throw new Error("Name is required");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  return {
    name,
    password,
  };
}
```

```js
try {
  const user = createUser("JIHUN", "1234");

  console.log(user);
} catch (error) {
  console.log("Failed to create user");
  console.log(error.message);
}
```

# Optional Chaining

## 15. Optional Chaining `?.`

Optional Chaining은 `?.` 왼쪽의 값이 `null` 또는 `undefined`이면 이후 Property 접근을 중단하고 `undefined`를 반환함

```js
const user = {
  name: "JIHUN",
  profile: {
    email: "jihun@example.com",
  },
};

console.log(user.profile.email);
// jihun@example.com
```

`profile`이 없으면 일반적인 접근은 오류가 발생함

```js
const user = {
  name: "JIHUN",
};

// console.log(user.profile.email);
// TypeError
```

Optional Chaining을 사용하면 안전하게 접근할 수 있음

```js
console.log(user.profile?.email);
// undefined
```

## 16. 여러 단계 Optional Chaining

중첩된 모든 단계가 불확실하면 각 단계에 `?.`를 사용할 수 있음

```js
const response = {
  data: {
    user: null,
  },
};

console.log(response.data?.user?.profile?.email);
// undefined
```

React에서 API 응답 데이터가 아직 로딩되지 않았거나 일부 값이 없는 경우 사용할 수 있음

```js
const userName = response.data?.user?.name;
```

## 17. Optional Chaining과 Method

Method가 존재하는 경우에만 실행할 수도 있음

```js
const user = {
  greet() {
    return "Hello";
  },
};

console.log(user.greet?.());
// Hello
```

Method가 없어도 오류가 발생하지 않음

```js
const guest = {};

console.log(guest.greet?.());
// undefined
// 단, Property가 존재하지만 함수가 아닌 경우에는 호출 오류가 발생할 수 있음
```

# Nullish Coalescing

## 18. Nullish Coalescing `??`

`??`는 왼쪽 값이 `null` 또는 `undefined`일 때 오른쪽 기본값을 사용함

```js
const userName = undefined;

console.log(userName ?? "Guest");
// Guest
```

```js
const userRole = null;

console.log(userRole ?? "guest");
// guest
```

값이 존재하면 기존 값을 사용함

```js
const userName = "JIHUN";

console.log(userName ?? "Guest");
// JIHUN
```

## 19. `||`와 `??`의 차이

Logical OR `||`는 왼쪽 값이 Falsy이면 오른쪽 값을 사용함

Falsy Value:

```text
false
0
""
null
undefined
NaN
```

```js
console.log(0 || 100);
// 100

console.log("" || "default");
// default

console.log(false || true);
// true
```

`??`는 `null`과 `undefined`만 기본값으로 변경함

```js
console.log(0 ?? 100);
// 0

console.log("" ?? "default");
// ""

console.log(false ?? true);
// false
```

### 비교

| Value       | `value \|\| "default"` | `value ?? "default"` |
| :---------- | :--------------------- | :------------------- |
| `undefined` | `"default"`            | `"default"`          |
| `null`      | `"default"`            | `"default"`          |
| `0`         | `"default"`            | `0`                  |
| `""`        | `"default"`            | `""`                 |
| `false`     | `"default"`            | `false`              |

숫자 `0`, 빈 문자열, `false`도 정상적인 값으로 유지해야 한다면 `??`를 사용하는 것이 적절함

## 20. Optional Chaining과 Nullish Coalescing 조합

두 문법은 함께 자주 사용함

```js
const user = {
  profile: null,
};

const email = user?.profile?.email ?? "No email";

console.log(email);
// No email
```

동작 순서:

```text
user.profile?.email
→ profile이 null이므로 undefined 반환

undefined ?? "No email"
→ No email 반환
```

React에서 API 데이터를 출력할 때 사용할 수 있음

```js
const userName = response.data?.user?.name ?? "Guest";
```

# Combined Example

## 21. 사용자 관리 예제

```js
class User {
  constructor(id, name, role) {
    if (!name) {
      throw new Error("Name is required");
    }

    this.id = id;
    this.name = name;
    this.role = role ?? "guest";
  }

  introduce() {
    return `${this.name} is a ${this.role}.`;
  }
}

try {
  const user = new User(1, "JIHUN", "backend");

  console.log(user.introduce());

  const email = user.profile?.email ?? "No email";

  console.log(email);
} catch (error) {
  console.log("Failed to create user");
  console.log(error.message);
} finally {
  console.log("User creation completed");
}
```

예상 결과:

```text
JIHUN is a backend.
No email
User creation completed
```

이 예제에서는 다음 개념이 함께 사용됨

```text
Class
constructor
new
this
Instance Method
throw
try-catch-finally
Optional Chaining
Nullish Coalescing
```

# Key Takeaways

- Class는 비슷한 객체를 반복해서 만들기 위한 문법
- `new`를 사용하면 Class를 기반으로 Instance가 생성됨
- `constructor`는 Instance가 생성될 때 자동으로 실행됨
- Class 내부의 `this`는 현재 Instance를 가리킴
- `extends`를 사용하면 다른 Class의 기능을 상속받을 수 있음
- `super()`는 부모 Class의 `constructor`를 호출함
- Lexical Scope는 함수가 선언된 위치를 기준으로 변수 접근 범위를 결정함
- Closure는 외부 함수의 실행이 끝난 후에도 외부 변수에 접근할 수 있음
- Closure를 사용하면 함수 호출 사이에 상태를 유지할 수 있음
- `try-catch`는 실행 중 발생한 오류를 처리함
- `throw`는 개발자가 직접 오류를 발생시킴
- `finally`는 오류 발생 여부와 관계없이 실행됨
- Optional Chaining은 존재하지 않는 중첩 Property에 안전하게 접근함
- Nullish Coalescing은 값이 `null` 또는 `undefined`일 때만 기본값을 적용함
- `||`는 모든 Falsy Value를 기본값으로 변경하지만 `??`는 `null`과 `undefined`만 변경함
