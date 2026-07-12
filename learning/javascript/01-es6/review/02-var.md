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
