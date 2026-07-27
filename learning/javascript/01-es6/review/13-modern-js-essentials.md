# Review - Modern JavaScript Essentials

## 📌 What I Learned

- Class는 비슷한 형태의 객체를 반복해서 생성하기 위한 문법
- `constructor`는 `new`로 Instance를 생성할 때 자동으로 실행됨
- Class 내부의 `this`는 현재 Instance를 가리킴
- Instance Method는 생성된 객체를 통해 호출함
- `extends`를 사용하면 부모 Class의 Property와 Method를 상속받을 수 있음
- `super()`는 부모 Class의 Constructor를 호출함
- `super.methodName()`으로 부모 Method를 호출할 수 있음
- Method Override는 자식 Class에서 부모 Method를 다시 정의하는 것
- Closure는 함수가 선언될 당시의 Lexical Environment를 기억하는 특성
- Closure를 사용하면 외부에서 직접 접근할 수 없는 Private State를 만들 수 있음
- `throw`를 사용하여 직접 Error를 발생시킬 수 있음
- `try-catch`를 사용하여 발생한 Error를 처리할 수 있음
- `finally`는 성공과 실패 여부와 관계없이 실행됨
- Optional Chaining `?.`은 Nullish 값에서 이후 접근을 중단하고 `undefined`를 반환함
- Nullish Coalescing `??`는 값이 `null` 또는 `undefined`일 때만 기본값을 적용함
- Logical OR `||`는 모든 Falsy Value에 기본값을 적용함
- Closure와 Class를 조합하여 사용자 관리 프로그램을 구현할 수 있음

## 🤔 What Was Confusing

- `this`가 Class 자체가 아니라 Method를 호출한 Instance를 가리킨다는 점
- 자식 Constructor에서 `this`보다 `super()`를 먼저 호출해야 한다는 점
- Override한 Method 안에서 부모 Method를 호출하는 방법
- Closure 내부 변수와 반환 객체의 Property 차이
- 값을 변경하는 Method가 아무것도 반환하지 않으면 `undefined`가 출력된다는 점
- `++count`와 `count++`의 반환값 차이
- `throw`가 실행되면 이후 코드가 중단되고 `catch`로 이동한다는 점
- Optional Chaining이 모든 오류를 막는 것이 아니라 Nullish 접근만 처리한다는 점
- `||`와 `??`가 `0`, `""`, `false`를 다르게 처리한다는 점
- 배열 복사본을 반환해도 내부 객체까지 복사되는 것은 아니라는 점
- `==`와 `===`의 타입 변환 차이
- 중복 여부 확인에는 `forEach()`보다 `some()`이 적절하다는 점

## 💻 What I Practiced

- `User` Class와 여러 User Instance를 생성함
- `constructor`로 Instance Property를 초기화함
- `introduce()`와 `changeRole()` Instance Method를 작성함
- `instanceof`로 객체의 Class 관계를 확인함
- `User`를 상속받는 `Admin` Class를 작성함
- `super()`로 부모 Constructor를 호출함
- 부모 Method를 호출하면서 Method Override를 구현함
- Closure Counter를 만들어 상태를 유지함
- Closure로 역할과 로그인 횟수를 외부에서 숨김
- `throw new Error()`로 입력값 검증 오류를 발생시킴
- `try-catch-finally`로 성공과 실패 상황을 처리함
- Optional Chaining으로 중첩된 이메일에 안전하게 접근함
- 존재하지 않는 Method를 Optional Chaining으로 안전하게 호출함
- `||`와 `??`를 사용하여 기본값 처리 결과를 비교함
- Class, 상속, Closure, Error Handling을 결합한 사용자 관리 시스템을 작성함
- `find()`, `filter()`, `some()`으로 사용자 데이터를 조회하고 검증함
- Spread Syntax로 내부 배열의 복사본을 반환함

## 💡 Key Takeaways

- Class는 객체를 생성하는 문법이며 생성된 객체를 Instance라고 함
- `constructor`는 Instance 초기화 작업을 담당함
- `this.property`로 각 Instance의 데이터를 저장하거나 조회함
- 상속은 공통 기능을 재사용할 수 있지만 지나치게 복잡하게 사용하지 않아야 함
- 자식 Constructor에서는 `super()`를 호출한 뒤 `this`를 사용할 수 있음
- Method Override를 사용하면 부모 기능을 자식의 목적에 맞게 확장할 수 있음
- Closure는 함수 호출이 끝난 뒤에도 외부 함수의 상태를 유지할 수 있음
- Closure 내부 변수는 반환 객체에 포함하지 않으면 외부에서 직접 접근할 수 없음
- `throw`는 잘못된 상태에서 정상 실행을 중단시키는 데 사용함
- 입력값은 사용하기 전에 타입과 값의 유효성을 모두 확인해야 함
- `finally`는 로딩 상태 해제나 자원 정리처럼 항상 필요한 작업에 적합함
- Optional Chaining은 값이 `null` 또는 `undefined`일 때 이후 Property 접근으로 인한 오류를 방지함
- `??`는 `0`, 빈 문자열, `false`를 정상적인 값으로 유지함
- 값이 존재하는지만 확인할 때는 `some()`이 자연스러움
- 일반적인 값 비교에는 타입까지 확인하는 `===`를 사용해야 함
- Spread Syntax로 만든 배열은 Shallow Copy이므로 내부 객체는 공유될 수 있음

## 🔥 Important Differences

| Concept            | Description                                              |
| :----------------- | :------------------------------------------------------- |
| Class              | 비슷한 구조의 객체를 생성하기 위한 문법                  |
| Instance           | Class를 기반으로 실제 생성된 객체                        |
| Constructor        | Instance 생성 시 자동으로 실행되는 초기화 Method         |
| Instance Method    | 생성된 Instance를 통해 호출하는 Method                   |
| Inheritance        | 부모 Class의 기능을 자식 Class가 물려받는 구조           |
| Method Override    | 자식 Class에서 부모 Method를 다시 정의하는 것            |
| `super()`          | 부모 Class의 Constructor를 호출함                        |
| `super.method()`   | 부모 Class의 Method를 호출함                             |
| Lexical Scope      | 함수가 선언된 위치를 기준으로 결정되는 Scope             |
| Closure            | 함수가 선언 당시의 Lexical Environment를 기억하는 특성   |
| Private State      | 외부에서 직접 접근하지 못하도록 숨긴 상태                |
| `throw`            | 직접 Error를 발생시키고 정상 흐름을 중단함               |
| `catch`            | 발생한 Error를 전달받아 처리함                           |
| `finally`          | Error 발생 여부와 관계없이 항상 실행됨                   |
| Optional Chaining  | Nullish 값이면 이후 접근을 중단하고 `undefined`를 반환함 |
| Logical OR         | 모든 Falsy Value에 오른쪽 기본값을 적용함                |
| Nullish Coalescing | `null`, `undefined`에만 기본값을 적용함                  |
| `find()`           | 조건에 맞는 첫 번째 요소를 반환함                        |
| `filter()`         | 조건에 맞는 모든 요소를 배열로 반환함                    |
| `some()`           | 조건에 맞는 요소가 하나라도 있는지 확인함                |
| Shallow Copy       | 최상위 배열은 복사하지만 내부 객체는 공유함              |

## 🚀 Next Study

- Synchronous and Asynchronous JavaScript
- Callback Function
- Promise
- `resolve` and `reject`
- `then`, `catch`, `finally`
- Promise Chaining
- `async` and `await`
- Fetch API
- HTTP Request and Response
- Event Loop
