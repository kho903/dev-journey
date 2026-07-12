# Review - Array Methods

## 📌 What I Learned

- Array Methods는 배열 데이터를 다룰 때 사용하는 메서드
- 많은 Array Methods는 Callback Function을 인자로 받음
- `forEach()`는 배열의 각 요소를 순회하면서 작업을 실행함
- `map()`은 배열의 각 요소를 변환해서 새로운 배열을 반환함
- `filter()`는 조건을 만족하는 요소만 모아서 새로운 배열을 반환함
- `find()`는 조건을 만족하는 첫 번째 요소를 반환함
- `some()`은 조건을 만족하는 요소가 하나라도 있는지 확인함
- `every()`는 모든 요소가 조건을 만족하는지 확인함
- `reduce()`는 배열의 값을 누적해서 하나의 결과를 만듦

## 🤔 What Was Confusing

- `forEach()`와 `map()`은 둘 다 배열을 반복하지만 목적이 다름
- `forEach()`는 새로운 배열을 만들지 않고, 반환값은 `undefined`
- `map()`은 새로운 배열을 반환함
- `filter()`는 조건을 만족하는 모든 요소를 반환하지만, `find()`는 첫 번째 요소만 반환함
- `some()`과 `every()`는 둘 다 `boolean` 값을 반환하지만 조건이 다름
- `reduce()`의 `accumulator`, `currentValue`, initial value 개념이 처음에는 헷갈렸음

## 💻 What I Practiced

- `forEach()`로 배열의 각 요소를 출력함
- `map()`으로 숫자 배열을 두 배로 변환함
- `filter()`로 짝수만 남기는 배열을 만듦
- `find()`로 특정 id를 가진 user를 찾음
- `some()`으로 짝수가 하나라도 있는지 확인함
- `every()`로 모든 숫자가 짝수인지 확인함
- `reduce()`로 숫자 배열의 합계를 구함
- `reduce()`로 상품 가격의 총합을 구함
- `filter()`로 backend role을 가진 user만 추출함
- `map()`으로 React-like list rendering 예제를 만들어 봄

## 💡 Key Takeaways

- 배열을 단순히 순회할 때는 `forEach()`를 사용함
- 기존 배열을 변환해서 새로운 배열이 필요할 때는 `map()`을 사용함
- 조건에 맞는 여러 요소가 필요할 때는 `filter()`를 사용함
- 조건에 맞는 하나의 요소만 필요할 때는 `find()`를 사용함
- 조건을 만족하는 요소가 하나라도 있는지 확인할 때는 `some()`을 사용함
- 모든 요소가 조건을 만족하는지 확인할 때는 `every()`를 사용함
- 배열을 하나의 값으로 누적할 때는 `reduce()`를 사용함
- React에서는 리스트 렌더링을 할 때 `map()`을 자주 사용함

## 🔥 Important Differences

| Method      | Purpose                          | Return Value          |
| :---------- | :------------------------------- | :-------------------- |
| `forEach()` | 각 요소마다 작업 실행            | `undefined`           |
| `map()`     | 각 요소를 변환                   | 새로운 배열           |
| `filter()`  | 조건에 맞는 요소만 추출          | 새로운 배열           |
| `find()`    | 조건에 맞는 첫 번째 요소 찾기    | 요소 또는 `undefined` |
| `some()`    | 하나라도 조건을 만족하는지 확인  | `boolean`             |
| `every()`   | 모두 조건을 만족하는지 확인      | `boolean`             |
| `reduce()`  | 값을 누적해서 하나의 결과 만들기 | 누적 결과             |

## 🚀 Next Study

- Object Methods
- `Object.keys()`
- `Object.values()`
- `Object.entries()`
- Handling Arrays of Objects
- Template Literal
- Destructuring
- Spread / Rest
