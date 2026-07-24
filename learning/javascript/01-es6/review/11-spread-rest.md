# Review - Spread Syntax and Rest Parameters

## 📌 What I Learned

- Spread Syntax와 Rest Syntax는 모두 `...`를 사용함
- Spread Syntax는 배열이나 객체의 값을 펼치는 문법
- Rest Syntax는 여러 값을 하나의 배열이나 객체로 모으는 문법
- 배열 안에서 Spread Syntax를 사용하면 기존 배열의 요소를 새로운 배열에 펼칠 수 있음
- Spread Syntax로 배열을 복사하고 병합할 수 있음
- 함수 호출에서 배열 요소를 각각의 인자로 전달할 수 있음
- 문자열도 Spread Syntax를 사용하여 문자 배열로 만들 수 있음
- Object Spread Syntax로 객체의 프로퍼티를 새로운 객체에 복사할 수 있음
- 객체를 복사하면서 프로퍼티를 추가하거나 수정할 수 있음
- 같은 이름의 프로퍼티가 있으면 나중에 작성된 값이 이전 값을 덮어씀
- Spread Syntax를 사용한 배열과 객체 복사는 Shallow Copy임
- Shallow Copy에서는 중첩 객체나 배열의 참조가 공유될 수 있음
- 중첩 객체를 독립적으로 변경하려면 해당 중첩 객체도 별도로 복사해야 함
- Rest Parameters는 함수에 전달된 여러 인자를 실제 배열로 모음
- Rest Parameter는 반드시 마지막 매개변수에 작성해야 함
- 배열 구조 분해에서 Rest Syntax를 사용하면 남은 요소를 배열로 모을 수 있음
- 객체 구조 분해에서 Rest Syntax를 사용하면 남은 프로퍼티를 객체로 모을 수 있음
- React에서는 기존 배열과 객체를 직접 변경하지 않고 새로운 값을 만들 때 Spread Syntax를 자주 사용함

## 🤔 What Was Confusing

- Spread와 Rest가 같은 `...` 문법을 사용해서 처음에는 역할을 구분하기 어려웠음
- `...`가 값을 펼치는지 모으는지는 작성된 위치와 문맥에 따라 달라짐
- 배열을 Spread Syntax로 복사하면 모든 중첩 값까지 완전히 복사되는 것으로 착각하기 쉬웠음
- 최상위 객체는 다르지만 중첩 객체는 같은 참조를 가질 수 있다는 점이 헷갈렸음
- 객체 프로퍼티를 덮어쓸 때 작성 순서에 따라 최종값이 달라짐
- Rest Parameter와 배열 구조 분해에서 사용하는 Rest Syntax와 역할이 비슷해 보였음
- Rest Parameter가 반드시 마지막 매개변수여야 하는 이유를 이해해야 했음
- 객체 구조 분해로 프로퍼티를 제외해도 원본 객체에서는 해당 프로퍼티가 삭제되지 않음
- React 형태의 중첩 객체 업데이트에서는 바깥 객체와 중첩 객체를 모두 복사해야 했음

## 💻 What I Practiced

- 배열 요소를 Spread Syntax로 펼침
- 배열을 새로운 배열로 복사함
- 복사한 배열을 수정하고 원본 배열이 유지되는지 확인
- 기존 배열을 복사하면서 앞뒤에 새로운 요소를 추가함
- 여러 배열을 하나의 배열로 병합함
- 함수 호출 시 배열 요소를 각각의 인자로 전달함
- `Math.max()`에 배열 요소를 Spread Sytax로 전달함
- 문자열을 문자 배열로 변환함
- 객체를 새로운 객체로 복사함
- 객체를 복사하면서 프로퍼티를 추가하고 수정함
- 객체 프로퍼티 덮어쓰기 순서에 따른 결과를 비교함
- 여러 객체를 하나의 객체로 병합함
- Shallow Copy에서 중첩 객체의 참조가 공유되는 것을 확인함
- 중첩 객체를 별도로 복사하여 원본과 참조를 분리함
- Rest Parameters로 여러 함수 인자를 배열에 모음
- Rest Parameters와 `reduce()`를 함께 사용함
- 일반 매개변수와 Rest Parameters를 함께 사용함
- 배열 구조 분해에서 남은 요소를 배열로 모음
- 객체 구조 분해에서 남은 프로퍼티를 객체로 모음
- 특정 프로퍼티를 제외한 새로운 객체를 만듦
- React와 비슷한 방식으로 배열과 객체를 불변 업데이트함
- 객체 배열에서 특정 객체만 새로운 객체로 교체함

## 💡 Key Takeaways

- Spread Syntax는 값을 사용하는 위치에서 기존 값을 펼침
- Rest Syntax는 매개변수나 구조 분해 위치에서 남은 값을 모음
- Spread Syntax로 만든 배열과 객체는 원본과 다른 새로운 참조를 가짐
- 배열에 요소를 추가하거나 객체 프로퍼티를 변경할 때 원본을 직접 수정하지 않고 새로운 값을 만들 수 있음
- 객체에서 같은 프로퍼티가 여러 번 작성되면 마지막에 작성된 값이 최종값이 됨
- Spread Syntax는 Deep Copy가 아니라 Shallow Copy를 수행함
- 중첩 객체나 배열은 원본과 복사본이 같은 참조를 공유할 수 있음
- 중첩 데이터를 변경할 때는 변경하려는 단계까지 각각 복사해야 함
- Rest Parameters는 실제 배열이므로 `map()`, `filter()`, `reduce()`를 바로 사용할 수 있음
- Rest Parameter는 나머지 모든 인자를 모으므로 반드시 마지막에 작성해야 함
- 객체 Rest Syntax는 특정 프로퍼티를 분리하고 나머지 프로퍼티로 새 객체를 만들 때 유용함
- 민감한 정보는 프론트엔드에서 제거하는 것이 아니라 서버 응답을 만들 때부터 제외해야 함
- React 상태를 변경할 때는 기존 값을 직접 수정하지 않는 불변성 관리가 중요함

## 🔍 Spread vs Rest

| 구분      | Spread Syntax                    | Rest Syntax                    |
| :-------- | :------------------------------- | :----------------------------- |
| 역할      | 값을 펼침                        | 여러 값을 모음                 |
| 방향      | 하나에서 여러 개로               | 여러 개에서 하나로             |
| 배열      | 배열 요소를 펼침                 | 남은 요소를 배열로 모음        |
| 객체      | 객체 프로퍼티를 복사함           | 남은 프로퍼티를 객체로 모음    |
| 함수      | 배열 요소를 각각의 인자로 전달함 | 여러 인자를 하나의 배열로 모음 |
| 주요 위치 | 배열·객체 리터럴, 함수 호출      | 함수 매개변수, 구조 분해 할당  |

## 🚀 Next Study

- JavaScript Modules
- `export`
- `export default`
- Named Export
- `import`
- Import Aliases
- Separating Code into Multiple Files
- React Component Import and Export
