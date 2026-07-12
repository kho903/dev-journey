# Review - Hoisting and TDZ

## 📌 What I Learned

- `var`, `let`, `const` 는 모두 Hoisting 됨
- `var`는 Hoisting 되면서 `undefined`로 초기화됨
- `let`과 `const`도 Hoisting되지만, 해당 변수를 선언하기 전까지 초기화되지 않음
- `let`과 `const`는 TDZ에 있기 때문에 선언 전에 접근하면 `ReferenceError`가 발생함
- TDZ는 변수를 선언하기 전에 사용하는 실수를 빠르게 발견하게 해 줌

## 🤔 What Was Confusing

- 처음에는 `let`과 `const`는 Hoisting이 되지 않는다고 생각함
- 하지만 `let`과 `const`도 Hoisting되며, TDZ 때문에 선언 전에 접근할 수 없다는 점이 중요함
- `var`는 선언 전에 접근하면 에러가 아니라 `undefined`가 출력된다는 점
- `ReferenceError`가 발생하는 이유는 변수가 없는 것이 아니라, 아직 초기화가 되지 않았기 때문

## 💻 What I Practiced

- `var` 변수를 선언 전에 접근해서 `undefined`가 출력되는 것을 확인함
- `let`, `const` 변수를 선언 전에 접근하면 `ReferenceError`가 발생하는 것을 확인함
- Block Scope 안에서 TDZ가 어디서 시작되고 끝나는 지 확인함
- `var`와 `let`/`const`를 선언 전에 접근했을 때의 차이를 비교함

## 💡 Key Takeaways

- Hoisting은 코드가 실제로 위로 이동하는 것이 아니라, JavaScript 엔진이 선언 정보를 먼저 처리하는 것처럼 동작하는 현상
- `var`는 Hoisting 후 `undefined`로 초기화되기 때문에 선언 전 접근이 가능함
- `let`과 `const`는 Hoisting되지만 TDZ에 있기 때문에 선언 전 접근이 불가능함
- TDZ 덕분에 선언 전에 변수를 사용하는 실수를 빨리 발견할 수 있음
- 현대 JavaScript에서는 `var`보다 `let`, `const`가 더 안전함

## 🚀 Next Study

- Scope 정리
- Function Declaration
- Function Expression
- Arrow Function
