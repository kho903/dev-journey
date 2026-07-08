# Review - ES6 let & const

## 📌 What I Learned

- `let`은 Block Scope를 가지며, 같은 Scope 안에서 재선언 불가
- `let`은 재할당이 가능하기 때문에 값이 변경되어야 하는 변수에 사용
- `const`는 선언과 동시에 반드시 초기화해야 하며, 재할당 불가
- `const`로 선언한 객체와 배열은 변수 자체를 다른 값으로 재할당은 할 수 없지만, 내부 데이터는 수정 가능

## 🤔 What Was Confusing

- `const`가 객체나 배열 내부값 또한 변경하지 못할 것이라고 생각
- 하지만 `const`는 변수의 참조를 바꾸지 못하게 하는 것이고, 참조하고 있는 객체나 배열 내부의 데이터 변경은 가능
- `let`과 `var`의 차이에서 Block Scope와 Function Scope 개념이 중요

## 💻 What I Practiced

- `let`을 사용해 값을 재할당
- `const`를 사용해 상수 선언, 재할당 시 에러 발생 확인
- `const`로 선언한 배열에 `push()`로 값 추가
- `let`과 `const`가 Block Scope를 가진다는 것을 확인
- `const`로 선언한 객체의 프로퍼티를 수정하고, 새 프로퍼티를 추가

## 💡 Key Takeaways

- 기본적으로 `const`를 사용할 것
- 값이 바뀌어야 하는 경우에만 `let`을 사용할 것
- `var`는 재선언과 스코프 문제로 되도록 사용하지 말 것
- `const`는 "값을 완전히 고정한다"가 아니라 "변수의 재할당을 막는다"에 가까운 개념

## 🚀 Next Study

- `var`
- Scope
- Hoisting
- TDZ

# Review - var and Function Scope

## 📌 What I Learned

- `var`는 같은 Scope 안에서 재선언 가능
- `var`는 재할당 가능
- `var`는 Block Scope를 가지지 않음
- `var`는 Function Scope를 가짐
- `if` 블록 안에서 선언한 `var` 변수는 블록 밖에서도 접근 가능
- 함수 안에서 선언한 `var` 변수는 함수 밖에서 접근 불가

## 🤔 What Was Confusing

- 처음에는 `var`가 어디서든 접근 가능한 변수라고 생각
- 하지만 `var`는 Block Scope가 없을 뿐, Function Scope를 가진다는 점이 중요
- `if` 블록 안의 `var`는 밖에서 접근 가능하지만, 함수 안의 `var`는 함수 밖에서 접근 불가
- `let`과 `const`는 Block Scope 를 가지기 때문에 `var`보다 예측이 쉬움

## 💻 What I Practiced

- `var`로 선언한 변수를 다시 선언해 봄
- `var`로 선언한 변수에 값을 재할당해 봄
- `if` 블록 안에서 선언한 `var` 변수를 블록 밖에서 출력해 봄
- 함수 안에서 선언한 `var` 변수가 함수 밖에서는 접근되지 않는 것을 확인함
- 같은 `if` 블록 안에서 `var`와 `let`을 선언하고, 블록 밖에서 접근 가능 여부를 비교함

## 💡 Key Takeaways

- `var`는 재선언이 가능해서 의도치 않은 변수 덮어쓰기가 발생할 수 있음
- `var`는 Block Scope를 가지지 않기 때문에 코드의 예측 가능성이 낮아질 수 있음
- `var`는 Function Scope를 가지므로 함수 내부에서 선언된 변수는 함수 밖에서 접근할 수 없음
- 현대 JavaScript에서는 기본적으로 `const`를 사용하고, 재할당이 필요한 경우 `let`을 사용하는 것을 권장
- `var`는 새 코드에서 사용하기보다는 레거시(기존) 코드를 유지보수하고 이해하기 위해 알아두는 것이 좋음

## 🚀 Next Study

- Hoisting
- TDZ
- Scope

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

# Review - Scope and Lexical Scope

## 📌 What I Learned

- Scope는 변수에 접근할 수 있는 범위를 의미함
- Global Scope에서 선언된 변수는 코드 어디에서든 접근 가능
- Function Scope에서 선언된 변수는 함수 내부에서만 접근 가능
- Block Scope에서 선언된 변수는 해당 블록 내부에서만 접근 가능
- `var`는 Function Scope를 가짐
- `let`과 `const`는 Block Scope를 가짐
- JavaScript는 변수를 찾을 때 현재 Scope에서 먼저 찾고, 없으면 바깥 Scope로 이동함
- 이 과정을 Scope Chain 이라고 함
- Lexical Scope는 함수가 호출된 위치가 아니라 선언된 위치를 기준으로 Scope가 결정되는 방식

## 🤔 What Was Confusing

- 처음에는 Scope를 단순히 "변수를 사용할 수 있는 위치" 정도로만 이해함
- 하지만 Scope는 변수가 선언된 위치에 따라 접근 가능 범위가 결정된다는 점이 중요
- Scope Chain에서 `inner()` 함수가 자기 안에 없는 변수를 바깥 Scope에서 찾는 흐름이 중요했음
- Lexical Scope는 함수의 호출 위치가 아니라 선언 위치를 기준으로 결정된다는 점이 헷갈림
- 미션을 통해 함수가 선언된 위치의 Scope를 기억할 수 있다는 점을 확인함

## 💻 What I Practiced

- Global Scope에 선언한 변수를 함수 안에서 출력해 봄
- 함수 안에서 선언한 `var` 변수를 함수 밖에서 접근할 수 없는 것을 확인함
- `if` 블록 안에서 선언한 `let`, `const` 변수를 블록 밖에서 접근할 수 없는 것을 확인함
- 중첩 함수 구조를 만들어 Scope Chain을 확인함
- `inner()` 함수가 `inner Scope -> outer Scope -> Global Scope` 순서로 변수를 찾는 것을 확인함
- Lexical Scope 예제를 통해 함수가 선언된 위치의 Scope를 참조한다는 것을 확인함
- Bonus Mission에서 내부 함수를 반환하고, 바깥에서 호출해도 외부 함수의 변수에 접근 가능한 것을 확인함

## 💡 Key Takeaways

- Scope는 변수의 접근 가능 범위를 결정함
- `var`는 Function Scope, `let`과 `const`는 Block Scope를 가짐
- JavaScript는 현재 Scope에서 변수를 찾고, 없으면 바깥 Scope로 이동함
- Scope Chain은 중첩 함수와 Closure를 이해하는 데 중요함
- Lexical Scope는 함수가 어디서 호출되었는지가 아니라 어디서 선언되었는지를 기준으로 결정됨
- 내부 함수가 외부 함수의 변수를 기억하는 구조는 Closure와 연결됨

## 🚀 Next Study

- Function Declaration
- Function Expression
- Parameters and Arguments
- Return
- Function Hoisting
