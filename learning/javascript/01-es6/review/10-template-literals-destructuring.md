# Review - Template Literals and Destructuring

## 📌 What I Learned

- Template Literals는 백틱을 사용하여 문자열을 작성하는 문법
- `${}`를 사용하면 문자열 안에 변수와 표현식을 넣을 수 있음
- `${}` 안에는 연산식, 함수 호출, 조건 표현식 등을 사용할 수 있음
- Template Literals를 사용하면 여러 줄 문자열을 쉽게 만들 수 있음
- Arraay Destructuring은 배열 요소를 순서대로 변수에 할당함
- 쉼표를 사용하면 필요하지 않은 배열 요소를 건너뛸 수 있음
- 구조 분해 할당에서 기본값을 지정할 수 있음
- 기본값은 구조 분해한 값이 `undefined`일 때 적용됨
- 값이 `null`이면 기본값이 적용되지 않음
- Object Destructuring은 프로퍼티 이름을 기준으로 값을 가져옴
- 객체 프로퍼티를 다른 이름의 변수에 저장할 수 있음
- 중첩 객체의 프로퍼티도 구조 분해 할당으로 꺼낼 수 있음
- 함수의 매개변수에서도 구조 분해 할당을 사용할 수 있음
- Array Methods의 Callback Function 매개변수에서도 구조 분해 할당을 사용할 수 있음

## 🤔 What Was Confusing

- Array Destructuring과 Object Destructuring이 값을 가져오는 기준이 달라 헷갈렸음
- 배열 요소를 건너뛸 때 `_`가 아니라 빈 자리와 쉼표를 사용해야 했음
- 객체 프로퍼티 이름 변경 문법에서 왼쪽과 오른쪽의 역할이 헷갈렸음
- 중첩 구조 분해에서 `data` 변수가 별도로 생성되지 않는다는 점이 낯설었음
- 함수 내부에서 객체를 구조 분해하는 것과 Parameter Destructuring의 차이가 헷갈렸음
- 기본값이 `undefined`에는 적용되지만 `null`에는 적용되지 않는다는 점을 구분해야 했음
- 함수에 인자를 전달하지 않을 때 매개변수 전체의 기본값으로 `= {}`가 필요한 이유가 헷갈렸음

## 💻 What I Practiced

- Template Literals로 문자열을 작성함
- `${}` 안에 변수와 연산식을 넣음
- `${}` 안에 함수 호출과 조건 표현식을 사용함
- Template Literals로 여러 줄 문자열을 작성함
- Array Destructuring으로 배열 요소를 변수에 할당함
- 쉼표를 사용하여 배열 요소를 건너뜀
- 배열 구조 분해에서 기본값을 사용함
- Array Destructuring으로 두 변수의 값을 교환함
- Object Destructuring으로 객체 프로퍼티를 변수에 할당함
- 객체 프로퍼티를 다른 이름의 변수로 변경함
- 객체 구조 분해에서 기본값을 사용함
- 중첩 객체의 프로퍼티를 직접 구조 분해함
- 함수 매개변수에서 객체와 배열을 구조 분해함
- `map()`의 Callback Function 매개변수에서 객체를 구조 분해함
- `Object.entries()`의 `[key, value]` 배열을 구조 분해함
- React props와 비슷한 객체 매개변수 구조 분해를 연습함
- API 응답과 비슷한 중첩 객체를 구조 분해함

## 💡 Key Takeaways

- Template Literals는 문자열 연결보다 읽기 쉽고 간결함
- `${}` 안에는 하나의 값으로 평가되는 JavaScript 표현식을 사용할 수 있음
- Array Destructuring은 배열 요소의 순서를 기준으로 값을 할당함
- Object Destructuring은 프로퍼티 이름을 기준으로 값을 할당함
- 배열 요소를 건너뛸 때는 변수 대신 쉼표를 사용해야 함
- 구조 분해 기본값은 값이 `undefined`일 때만 적용됨
- 객체 프로퍼티 이름 변경 문법은 `propertyName: newVariableName` 형태임
- 중첩 구조 분해에서는 중간 프로퍼티 이름의 변수가 자동으로 만들어지지 않음
- Parameter Destructuring은 함수 매개변수 위치에서 바로 값을 꺼내는 방식임
- 객체 매개변수 전체에 `= {}`를 지정하면 인자가 없어도 구조 분해 오류를 방지할 수 있음
- Destructuring은 원본 배열이나 객체를 변경하지 않음
- React props와 API 응답 데이터를 다룰 때 Destsructuring을 자주 사용함

## 🔥 Important Differences

| Concept                 | Description                                  |
| :---------------------- | :------------------------------------------- |
| Template Literal        | 백틱을 사용하여 문자열 작성                  |
| String Interpolation    | `${}`를 사용하여 문자열에 표현식의 결과 삽입 |
| Array Destructuring     | 배열 요소의 순서를 기준으로 값 할당          |
| Object Destructuring    | 객체 프로퍼티 이름을 기준으로 값 할당        |
| Skipping Elements       | 쉼표를 사용하여 배열 요소를 건너뜀           |
| Default Value           | 구조 분해한 값이 `undefined`일 때 적용       |
| Property Renaming       | `propertyName: newVariableName` 사용         |
| Parameter Destructuring | 함수 매개변수 위치에서 값을 바로 구조 분해   |
| Nested Destructuring    | 중첩된 배열이나 객체의 값을 직접 구조 분해   |

## 🚀 Next Study

- Spread Syntax
- Rest Parameters
- Copying Arrays and Objects
- Merging Arrays and Objects
- Shallow Copy
- Rest Parameters in Functions
