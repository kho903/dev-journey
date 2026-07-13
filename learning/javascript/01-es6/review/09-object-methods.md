# Review - Object Methods

## 📌 What I Learned

- 객체는 여러 값을 `key: value` 형태로 관리하는 자료형
- Dot Notation과 Bracket Notation으로 객체의 프로퍼티에 접근할 수 있음
- 프로퍼티 이름이 변수로 정해질 때는 Bracket Notation을 사용해야 함
- 객체의 프로퍼티는 추가, 수정, 삭제할 수 있음
- `Object.keys()`는 객체의 key를 배열로 반환함
- `Object.values()`는 객체의 value를 배열로 반환함
- `Object.entries()`는 객체의 프로퍼티를 `[key, value]` 형태의 배열로 반환함
- `in` 연산자는 상속받은 프로퍼티까지 확인함
- `Object.hasOwn()`은 객체가 직접 가진 프로퍼티만 확인함
- Object Methods가 반환한 배열에는 Array Methods를 사용할 수 있음
- 객체 안에 다른 객체를 넣어 중첩 객체를 만들 수 있음

## 🤔 What Was Confusing

- `user[propertyName]`과 `user.propertyName`의 차이가 헷갈렸음
- 프로퍼티가 존재하지 않는 경우와 값이 `undefined`인 경우를 구분해야 했음
- `in`과 `Object.hasOwn()`은 비슷해 보이지만 확인 범위가 다름
- `Object.entries()`의 반환값이 단순 배열이 아니라 `[key, value]` 배열의 모음이라는 점을 이해해야 했음
- `Object.entries()`의 각 요소에서 key와 value를 `entry[0]`, `entry[1]`로 꺼내는 과정이 처음에는 낯설었음
- 객체가 `const`로 선언되어 있어도 내부 프로퍼티를 수정할 수 있다는 점과 객체 자체의 재할당을 구분해야 했음

## 💻 What I Practiced

- Dot Notation으로 객체 프로퍼티에 접근함
- Bracket Notation으로 객체 프로퍼티에 접근함
- 변수에 저장된 프로퍼티 이름으로 객체 값에 접근함
- 객체에 새로운 프로퍼티를 추가함
- 객체의 기존 프로퍼티 값을 수정함
- `delete` 연산자로 프로퍼티를 삭제함
- `Object.keys()`로 key 배열을 만듦
- `Object.values()`로 value 배열을 만듦
- `Object.entries()`로 `[key, value]` 배열을 만듦
- `in`과 `Object.hasOwn()`으로 프로퍼티 존재 여부를 확인함
- `Object.keys()`와 `forEach()`로 객체를 순회함
- `Object.entries()`와 `filter()`를 함께 사용함
- `Object.values()`와 `reduce()`로 점수의 총합을 계산함
- 객체 배열에 `find()`, `filter()`, `map()`을 사용함
- API 응답과 비슷한 중첩 객체를 다뤄 봄

## 💡 Key Takeaways

- 프로퍼티 이름이 고정되어 있다면 Dot Notation을 사용하는 것이 읽기 쉬움
- 프로퍼티 이름이 변수나 표현식으로 결정된다면 Bracket Notation을 사용해야 함
- `Object.keys()`는 key만 필요할 때 사용함
- `Object.values()`는 value만 필요할 때 사용함
- `Object.entries()`는 key와 value가 모두 필요할 때 사용함
- 객체 자신의 프로퍼티만 확인하려면 `Object.hasOwn()`을 사용하는 것이 명확함
- 프로퍼티 값이 `undefined`여도 해당 프로퍼티는 객체에 존재할 수 있음
- `Object.keys()`, `Object.values()`, `Object.entries()`는 배열을 반환하므로 `forEach()`, `map()`, `filter()`, `reduce()`와 함께 사용할 수 있음
- React와 API 통신에서는 객체와 객체 배열을 자주 사용함

## 🔥 Important Differences

| Concept            | Description                              |
| :----------------- | :--------------------------------------- |
| Dot Notation       | 고정된 프로퍼티 이름으로 접근            |
| Bracket Notation   | 변수나 표현식을 사용하여 프로퍼티에 접근 |
| `Object.keys()`    | key 배열 반환                            |
| `Object.values()`  | value 배열 반환                          |
| `Object.entries()` | `[key, value]` 배열 반환                 |
| `in`               | 자신의 프로퍼티와 상속받은 프로퍼티 확인 |
| `Object.hasOwn()`  | 객체가 직접 가진 프로퍼티만 확인         |

## 🚀 Next Study

- Template Literals
- Array Destructuring
- Object Destructuring
- Parameter Destructuring
- Spread Syntax
- Rest Parameters
