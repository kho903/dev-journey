# Review - JavaScript Modules

## 📌 What I Learned

- JavaScript Module은 코드를 파일 단위로 분리하고 필요한 값만 외부에 공개하는 기능
- `export`를 사용하여 변수, 함수, 객체, 클래스를 다른 모듈에 공개할 수 있음
- `import`를 사용하여 다른 모듈에서 공개한 값을 가져올 수 있음
- Named Export는 하나의 모듈에서 여러 값을 내보낼 수 있음
- Named Import는 중괄호 `{}`를 사용하며, export된 이름과 동일한 이름으로 가져와야 함
- Default Export는 하나의 모듈에서 하나만 사용할 수 있음
- 한 모듈에서 Named Export와 Default Export를 함께 사용할 수 있음
- Import Alias는 import하는 파일에서 사용할 이름을 변경하는 문법
- Export Alias는 외부에 공개할 이름을 변경하는 문법
- Namespace Import는 모든 Named Export를 하나의 Module Namespace Object로 가져오는 문법
- 각 모듈은 독립적인 Module Scope를 가짐
- 서로 다른 모듈에서는 같은 이름의 변수를 선언해도 충돌하지 않음
- import한 값은 복사본이 아니라 원본 모듈과 연결된 Live Binding임
- import한 값은 읽을 수 있지만 import한 모듈에서 직접 재할당할 수 없음
- Side-effect Import는 값을 가져오지 않고 모듈의 최상위 코드를 실행하는 방식
- 모듈을 `data`, `services`, `components`, `app`으로 분리함
- Spread Syntax를 사용하여 원본 배열을 변경하지 않고 사용자를 추가함
- Export Alias를 사용하여 외부에 공개할 이름을 변경함

## 💡 Key Takeaways

- Named Export는 여러 값을 내보낼 수 있으며 import할 때 중괄호가 필요함
- Named Import는 기본적으로 export된 이름과 동일한 이름을 사용해야 함
- Default Export는 한 모듈에서 하나만 사용할 수 있음
- Default Import는 중괄호를 사용하지 않고 원하는 이름으로 가져올 수 있음
- Named Export와 Default Export는 하나의 모듈에서 함께 사용할 수 있음
- Import Alias는 가져오는 파일 내부에서 사용할 이름을 변경함
- Export Alias는 내보내는 모듈에서 외부에 공개할 이름을 변경함
- Namespace Import는 모든 Named Export를 하나의 객체 형태로 묶어서 가져옴
- 각 모듈의 최상위 변수와 함수는 해당 모듈만의 Scope를 사짐
- import한 값은 단순한 복사본이 아니라 원본 모듈의 값을 실시간으로 참조함
- import한 binding은 읽기 전용이므로 가져온 파일에서 직접 재할당할 수 없음
- Side-effect Import는 초기 설정이나 실행 코드가 포함된 모듈을 불러올 때 사용함
- 단순한 출력이나 반복 실행이 목적이면 `forEach()`가 적절함
- 요소를 변환하여 새로운 배열을 만드는 것이 목적이면 `map()`이 적절함
- 서비스 함수가 데이터를 매개변수로 받으면 특정 데이터 모듈에 대한 의존성을 줄일 수 있음
- Spread Syntax를 사용하면 원본 배열을 변경하지 않고 새로운 배열을 만들 수 있음
- 모듈을 역할별로 분리하면 코드의 재사용성과 유지보수성이 좋아짐
- Module의 핵심은 파일 분리가 아니라 책임 분리와 의존성 관리임

## 🔥 Important Differences

| Concept              | Description                                                    |
| :------------------- | :------------------------------------------------------------- |
| Named Export         | 여러 값을 이름과 함께 내보냄                                   |
| Named Import         | 중괄호를 사용하여 export된 이름으로 값을 가져옴                |
| Default Export       | 하나의 모듈에서 하나의 기본값을 내보냄                         |
| Default Import       | 중괄호 없이 원하는 이름으로 기본값을 가져옴                    |
| Import Alias         | import하는 파일에서 사용할 지역 이름을 변경함                  |
| Export Alias         | export하는 모듈에서 외부에 공개할 이름을 변경함                |
| Namespace Import     | 모든 Named Export를 하나의 객체 형태로 가져옴                  |
| Module Scope         | 각 모듈이 서로 독립적인 Scope를 가짐                           |
| Live Binding         | import한 값이 export한 원본 값의 변경을 계속 반영함            |
| Side-effect Import   | 값을 가져오지 않고 모듈의 최상위 코드를 실행함                 |
| `map()`              | 각 요소를 변환하여 새로운 배열을 반환함                        |
| `forEach()`          | 각 요소를 순회하며 작업을 실행하고 새로운 배열은 반환하지 않음 |
| Direct Dependency    | 서비스 모듈이 데이터 모듈을 직접 import하여 사용함             |
| Parameter Dependency | 서비스 함수가 사용할 데이터를 매개변수로 전달받음              |
| Mutable Update       | `push()` 등을 사용하여 원본 배열을 직접 변경함                 |
| Immutable Update     | Spread Syntax로 원본을 유지하며 새로운 배열을 생성함           |
| Module Separation    | 파일을 역할과 책임에 따라 분리함                               |

## 🚀 Next Study

- JavaScript Classes
- Class Declaration
- Constructor and Instances
- Instance Properties and Methods
- The `this` Keyword
- Getter and Setter
- Static Methods
- Inheritance
- `extends` and `super`
- Private Fields
- Classes with JavaScript Modules
