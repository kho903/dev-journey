# var

## 특징

- Function Scope를 가지는 변수 선언 방식
- 같은 스코프 안에서 재선언 가능
- 재할당 가능
- 선언 전에 접근할 경우 `undefined`가 출력될 수 있음
- ES6 이후에는 `var` 보다는 `let`과 `const` 사용이 권장됨

## let, const와의 차이

- `var`는 Block Scope를 가지지 않음
- `var`는 Function Scope 를 가짐
- `var`는 같은 스코프 안에서 재선언 가능
- `let`과 `const`는 같은 스코프 안에서 재선언 불가

## 언제 사용하는가?

- 현재 JavaScript에서는 사용하지 않는 것이 권장됨
- 레거시 코드에서 주로 볼 수 있음
- `var`를 이해해야 레거시 코드를 이해할 수 있는 경우가 있음

## 예제

1. 재선언 가능

```js
var name = "JIHUN";
var name = "KIM";

console.log(name); // KIM
```

2. 재할당 가능

```js
var count = 0;
count = 10;

console.log(count);
```

3. Block Scope를 가지지 않음

```js
if (true) {
  var message = "Hello";
}

console.log(message); // Hello
```

4. Function Scope

```js
function testFuncScopeInVar() {
  var value = 10;
}

console.log(value); // ReferenceError
```

## 핵심 정리

- `var`는 Function Scope를 가짐
- `var`는 Block Scope를 가지지 않음
- 같은 스코프 안에서 재선언 가능
- 재할당 가능
- 예측하기 어려운 버그를 만들 수 있기 때문에 현대 JavaScript에서는 `var` 대신에 `let`과 `const`를 사용하는 것이 권장됨
