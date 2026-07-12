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
