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

---

# Review - Function Declaration and Function Expression

## 📌 What I Learned

- Function은 특정 작업을 수행하는 코드 블록
- Function을 사용하면 반복되는 코드를 재사용할 수 있음
- Parameter는 함수를 선언할 때 받는 변수
- Argument는 함수를 호출할 때 전달하는 실제 값
- `return`은 함수의 실행 결과를 함수 밖으로 반환함
- `return`을 만나면 함수 실행이 즉시 종료됨
- Function Declaration은 Hoisting되기 때문에 선언 전에 호출 가능
- Function Expression은 변수에 함수를 저장하는 방식
- Function Expression은 초기화 전에 호출할 수 없음

## 🤔 What Was Confusing

- 처음에는 Function Declaration과 Function Expression의 차이가 단순히 문법 차이라고 생각함
- 하지만 Hoisting 동작이 다르기 때문에 호출 가능한 위치도 달라진다는 점이 중요했음
- Function Declaration은 함수 이름과 함수 본문 전체가 먼저 준비되는 것처럼 동작함
- Function Expression은 변수 선언은 Hoisting되지만, 함수 값은 코드 실행 중에 할당됨
- Parameter와 Argument의 차이도 헷갈릴 수 있었음

## 💻 What I Practiced

- Function Declaration을 만들고 호출해 봄
- Parameter를 사용해서 함수에 값을 전달해 봄
- Argument를 전달해서 `"Hello, JIHUN"`을 출력해 봄
- `return`을 사용해서 함수의 결과를 밖으로 반환해 봄
- `return` 이후의 코드는 실행되지 않는다는 것을 확인함
- Function Expression을 변수에 저장하고 호출해 봄
- Function Declaration을 선언 전에 호출해 봄
- Function Expression을 초기화 전에 호출할 수 없다는 것을 확인함

## 💡 Key Takeaways

- Function Declaration은 선언 전에 호출 가능
- Function Expression은 초기화 후에만 호출 가능
- Function Expression은 변수에 함수 값을 할당하는 방식
- `return`은 값을 반환하고 함수 실행을 종료함
- Parameter는 함수 정의 시 받는 변수이고, Argument는 함수 호출 시 전달하는 실제 값
- React에서 이벤트 핸들러와 컴포넌트를 이해하려면 Function 개념이 중요함

## 🚀 Next Study

- Arrow Function
- `this`
- Callback Function
- Array Methods

---

# Review - Arrow Function and this

## 📌 What I Learned

- Arrow Function은 ES6에서 추가된 함수 표현 방식
- `function` 키워드 대신 `=>`를 사용함
- Function Expression을 더 짧게 작성할 수 있음
- 함수 본문이 한 줄이고 값을 바로 반환하는 경우 `{}`와 `return` 생략 가능
- 이를 Implicit Return이라고 함
- 객체를 바로 반환할 때는 객체 리터럴을 `()`로 감싸야 함
- Arrow Function은 자신만의 `this`를 가지지 않음
- 객체의 메서드에서 `this`를 사용해야 할 때는 일반 함수가 더 안전함
- React에서는 이벤트 핸들러나 콜백 함수에서 Arrow Function을 자주 사용함

## 🤔 What Was Confusing

- 처음에는 Arrow Function이 단순히 짧은 함수 문법이라고만 생각함
- 하지만 Arrow Function은 일반 함수와 `this` 동작 방식이 다르다는 점이 중요했음
- 객체 메서드에서 Arrow Function을 사용하면 `this`가 해당 객체를 가리키지 않을 수 있음
- `map()`을 사용할 때는 `push()`로 배열을 직접 변경하기보다, 새 배열을 반환하는 것이 더 자연스러움
- 객체를 Implicit Return할 때 `{}`만 쓰면 함수 본문으로 해석될 수 있기 때문에 `({})` 형태로 감싸야 함

## 💻 What I Practiced

- Function Expression을 Arrow Function으로 바꿔 봄
- Arrow Function에서 Implicit Return을 사용해 봄
- 매개변수가 하나인 Arrow Function을 작성해 봄
- Arrow Function에서 객체를 바로 반환해 봄
- 일반 함수 메서드에서 `this.name`이 객체의 값을 참조하는 것을 확인함
- Arrow Function 메서드에서는 `this`가 객체 자신을 가리키지 않는 것을 확인함
- `map()`과 Arrow Function을 사용해서 새로운 배열을 만들어 봄
- React에서 자주 사용하는 이벤트 핸들러 형태의 Arrow Function을 작성해 봄

## 💡 Key Takeaways

- Arrow Function은 함수를 짧고 간결하게 작성할 수 있게 해 줌
- Implicit Return은 한 줄로 값을 반환할 때 유용함
- 객체를 바로 반환할 때는 `({ name, age })`처럼 작성해야 함
- Arrow Function은 자신만의 `this`를 가지지 않음
- 객체 메서드에서 `this`를 사용해야 한다면 일반 함수를 사용하는 것이 안전함
- `map()`은 기존 배열을 직접 수정하는 것이 아니라, 새로운 배열을 반환하는 방식으로 사용하는 것이 좋음
- React에서는 이벤트 핸들러와 콜백 함수에서 Arrow Function이 자주 사용됨

## 🚀 Next Study

- Callback Function
- Array Methods
- Template Literal
- Destructuring
- Spread / Rest

---

# Review - Callback Function

## 📌 What I Learned

- Callback Function은 다른 함수의 인자로 전달되는 함수
- JavaScript 에서는 함수도 값처럼 다룰 수 있음
- 함수는 변수에 저장할 수 있고, 다른 함수의 인자로 전달할 수도 있음
- Callback Function은 전달받은 함수 안에서 필요한 시점에 실행됨
- 함수 이름 뒤에 `()`를 붙이면 즉시 실행되고, `()` 없이 전달하면 함수 자체를 전달하는 것
- `map()`, `forEach()` 같은 배열 메서드는 Callback Function을 사용함
- React의 이벤트 핸들러도 Callback Function 개념과 연결됨

## 🤔 What Was Confusing

- 처음에는 함수를 인자로 전달한다는 개념이 헷갈림
- `sayHello()`처럼 호출하는 것과 `sayHello`처럼 함수 자체를 전달하는 차이가 중요했음
- Callback Function은 전달되는 순간 실행되는 것이 아니라, 다른 함수 내부에서 나중에 실행된다는 점이 중요했음
- `map()`과 `forEach()`는 둘 다 Callback Function을 사용하지만 목적이 다르다는 점이 헷갈릴 수 있었음
- 같은 파일에 여러 미션을 누적하다 보니 변수명 중복으로 전체 실행 시 에러가 발생할 수 있다는 점을 알게 됨

## 💻 What I Practiced

- 함수를 다른 함수의 인자로 전달해 봄
- 전달받은 함수를 함수 내부에서 `callback()` 형태로 실행해 봄
- Function Expression을 Callback Function으로 전달해 봄
- Callback Function에 인자를 전달해 봄
- Arrow Function을 직접 Callback Function으로 전달해 봄
- `calculate()` 함수에 덧셈과 곱셈 콜백을 각각 전달해 봄
- `map()`을 사용해서 새로운 배열을 만들어 봄
- `forEach()`를 사용해서 배열의 각 요소를 출력해 봄
- React의 `onClick={handleClick}`과 비슷한 구조를 `simulateClick()`으로 연습해 봄

## 💡 Key Takeaways

- Callback Function은 함수 자체를 인자로 전달하는 방식
- 함수 이름 뒤에 `()`를 붙이면 실행 결과를 전달하게 되므로 주의해야 함
- Callback Function을 사용하면 함수의 동작을 외부에서 주입할 수 있음
- `map()`은 새로운 배열을 반환할 때 사용함
- `forEach()`는 각 요소에 대해 어떤 작업을 실행할 때 사용함
- React 이벤트 핸들러는 "나중에 실행될 함수"를 전달한다는 점에서 Callback Function과 연결됨
- 여러 미션을 하나의 파일에 누적할 때는 변수명 충돌을 피하기 위해 prefix를 붙이는 것이 좋음

## 🚀 Next Study

- Array Methods
- `map()`
- `filter()`
- `find()`
- `reduce()`
