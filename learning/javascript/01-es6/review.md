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
