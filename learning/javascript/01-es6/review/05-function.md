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
