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
