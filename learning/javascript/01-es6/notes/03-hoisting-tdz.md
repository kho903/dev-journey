# Hoisting and TDZ

## Hoisting이란?

- Hoisting은 JavaScript 에서 변수 선언이 코드 실행 전에 먼저 처리되는 것처럼 동작하는 현상
- 하지만 실제 코드가 물리적으로 위로 이동하는 것은 아님
- JavaScript 엔진이 코드를 실행하기 전에 선언 정보를 먼저 메모리에 등록하기 때문에, 선언문이 코드 아래에 있어도 위에 있는 것처럼 동작할 수 있음

## var의 Hoisting

- `var`로 선언한 변수는 선언과 동시에 `undefined`로 초기화됨
- 그래서 선언문보다 위에서 변수에 접근해도 에러가 발생하지 않고 `undefined`가 출력됨

```js
console.log(userName); // undefined
var userName = "JIHUN";
console.log(userName); // JIHUN
```

- 위 코드는 JavaScript 엔진 입장에서 대략 아래처럼 동작한다고 이해할 수 있음

```js
var userName;
console.log(userName); // undefined
userName = "JIHUN";
console.log(userName); // JIHUN
```

## let과 const의 Hoisting

- `let`과 `const`도 Hoisting 됨
- 하지만 `var`처럼 `undefined`로 바로 초기화되지 않음
- 선언문에 도달하기 전까지는 변수에 접근할 수 없음

```js
console.log(age); // ReferenceError
let age = 29;
```

```js
console.log(PI); // ReferenceError
const PI = 3.14;
```

## TDZ란?

- TDZ는 Temporal Dead Zone의 약자
- 변수가 스코프 안에 존재하지만, 아직 초기화되기 전까지 접근할 수 없는 구간을 의미
- `let`과 `const`는 선언문에 도달하기 전까지 TDZ에 있기 때문에 접근하면 `ReferenceError`가 발생함

```js
{
  // TDZ start
  // console.log(value); // ReferenceError
  let value = 10; // TDZ end
  console.log(value); // 10
}
```

## var, let, const 비교

| keyword | Hoisting |     초기화      |    선언 전 접근    |
| :-----: | :------: | :-------------: | :----------------: |
|  `var`  |    O     |   `undefined`   | 가능 (`undefined`) |
|  `let`  |    O     | 초기화되지 않음 |       불가능       |
| `const` |    O     | 초기화되지 않음 |       불가능       |

## 핵심 정리

- `var`, `let`, `const`는 모두 Hoisting 됨
- `var`는 Hoisting되면서 `undefined`로 초기화됨
- `let`과 `const`도 Hoisting되지만, 선언문에 도달하기 전까지 초기화되지 않음
- `let`과 `const`는 TDZ 때문에 선언 전에 접근 불가
- TDZ는 실수를 빠르게 발견하게 해 주기 때문에 `var`보다 안전함
