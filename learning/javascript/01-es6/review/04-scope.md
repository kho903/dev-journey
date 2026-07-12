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
