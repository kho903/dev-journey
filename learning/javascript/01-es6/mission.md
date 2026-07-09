# Mission

## 🎯 Goal

Understand and use `let` and `const` correctly without referring to notes.

---

## Mission 1

Create a variable named `count` using `let`.

- Initialize it with `0`
- Increase its value to `5`
- Print the result

---

## Mission 2

Create a constant named `PI`.

- Assign `3.14`
- Print it
- Try changing its value and observe the error.

---

## Mission 3

Create an object named `user`.

```javascript
{
  name: "JIHUN",
  age: 25
}
```

- Change the `name` to `"KIM"`
- Print the object

---

## Mission 4

Create an array.

```javascript
["Apple", "Banana"];
```

- Add `"Orange"`
- Print the array

---

## Mission 5

Write code to verify Block Scope.

Requirements

- Declare `let a = 10` inside an `if` block.
- Try accessing `a` outside the block.
- Explain why an error occurs.

---

## Bonus Mission

Replace every possible `let` with `const`.

Explain why some variables must remain `let`.

---

# Mission - var and Function Scope

## 🎯 Goal

Understand how `var` works and why `let` and `const` are preferred in modern JavaScript.

---

## Mission 1

Create a variable named `userName` using `var`.

- Assign `"JIHUN"`
- Re-declare `userName` with `"KIM"`
- Print the result
- Explain why re-declaration is possible

---

## Mission 2

Create a variable named `score` using `var`.

- Assign `10`
- Reassign it to `20`
- Print both values
- Explain why reassignment is possible

---

## Mission 3

Verify that `var` does not have Block Scope.

Requirements

- Declare `var message = "Hello var"` inside an `if` block
- Access `message` outside the block
- Explain why it is possible

---

## Mission 4

Verify that `var` has Function Scope.

Requirements

- Create a function named `testVarScope`
- Declare `var value = 100` inside the function
- Print `value` inside the function
- Try accessing `value` outside the function
- Explain why an error occurs

---

## Mission 5

Compare `var` and `let`.

Requirements

- Declare `var a = 10` inside an `if` block
- Declare `let b = 20` inside the same block
- Try accessing both outside the block
- Explain the difference

---

# Mission - Hoisting and TDZ

## 🎯 Goal

Understand how Hoisting works and why `let` and `const` are safer than `var`.

---

## Mission 1

Verify `var` Hoisting.

Requirements

- Access a `var` variable before declaration
- Declare the variable using `var`
- Assign `"JIHUN"`
- Print the variable again after declaration
- Explain why `undefined` is printed before declaration

---

## Mission 2

Verify `let` TDZ.

Requirements

- Try accessing a `let` variable before declaration
- Comment out the error line
- Declare the variable using `let`
- Assign `29`
- Print the variable after declaration
- Explain why `ReferenceError` occurs before declaration

---

## Mission 3

Verify `const` TDZ.

Requirements

- Try accessing a `const` variable before declaration
- Comment out the error line
- Declare the variable using `const`
- Assign `3.14`
- Print the variable after declaration
- Explain why `ReferenceError` occurs before declaration

---

## Mission 4

Verify TDZ inside Block Scope.

Requirements

- Create a block using `{}`
- Try accessing a `let` variable before declaration inside the block
- Comment out the error line
- Declare `let value = 10`
- Print `value`
- Explain where the TDZ starts and ends

---

## Mission 5

Compare `var` and `let` before declaration.

Requirements

- Access a `var` variable before declaration
- Access a `let` variable before declaration
- Comment out the `let` error line
- Declare both variables
- Print both variables after declaration
- Explain the difference between `var` and `let`

---

# Mission - Scope and Lexical Scope

## 🎯 Goal

Understand how Scope works and how JavaScript searches for variables.

---

## Mission 1

Verify Global Scope.

Requirements

- Declare a variable named `globalMessage` in the Global Scope
- Create a function named `printGlobalMessage`
- Print `globalMessage` inside the function
- Call the function
- Explain why the function can access `globalMessage`

---

## Mission 2

Verify Function Scope.

Requirements

- Create a function named `testFunctionScope`
- Declare `var functionMessage = "function scope"` inside the function
- Print `functionMessage` inside the function
- Try accessing `functionMessage` outside the function
- Comment out the error line
- Explain why an error occurs outside the function

---

## Mission 3

Verify Block Scope.

Requirements

- Create an `if` block
- Declare `let blockLet = "block let"` inside the block
- Declare `const blockConst = "block const"` inside the block
- Print both variables inside the block
- Try accessing both variables outside the block
- Comment out the error lines
- Explain why an error occurs outside the block

---

## Mission 4

Verify Scope Chain.

Requirements

- Declare `const globalName = "JIHUN"` in the Global Scope
- Create a function named `outer`
- Declare `const outerValue = "outer"` inside `outer`
- Create a function named `inner` inside `outer`
- Declare `const innerValue = "inner"` inside `inner`
- Print `innerValue`, `outerValue`, and `globalName` inside `inner`
- Call `inner` inside `outer`
- Call `outer`
- Explain the order JavaScript uses to search for variables

---

## Mission 5

Verify Lexical Scope.

Requirements

- Declare `const value = "global"` in the Global Scope
- Create a function named `lexicalOuter`
- Declare `const value = "outer"` inside `lexicalOuter`
- Create a function named `lexicalInner` inside `lexicalOuter`
- Print `value` inside `lexicalInner`
- Call `lexicalInner` inside `lexicalOuter`
- Call `lexicalOuter`
- Explain why `"outer"` is printed instead of `"global"`

---

## Bonus Mission

Verify that Lexical Scope is based on declaration location, not call location.

Requirements

- Create a function inside another function
- Return the inner function
- Call the returned function outside the outer function
- Explain why the inner function can still access variables from the outer function

---

# Mission - Function Declaration and Function Expression

## 🎯 Goal

Understand how functions work and compare Function Declaration with Function Expression.

---

## Mission 1

Create a Function Declaration.

Requirements

- Create a function named `sayHello`
- Print `"Hello"` inside the function
- Call the function

---

## Mission 2

Use Parameters and Arguments.

Requirements

- Create a function named `greet`
- Add one parameter named `name`
- Print `"Hello, JIHUN"` by passing `"JIHUN"` as an argument
- Explain the difference between Parameter and Argument

---

## Mission 3

Use `return`.

Requirements

- Create a function named `add`
- Add two parameters named `a` and `b`
- Return the sum of `a` and `b`
- Store the result in a variable named `result`
- Print `result`

---

## Mission 4

Verify that `return` stops function execution.

Requirements

- Create a function named `testReturn`
- Return `"finished"`
- Add a `console.log()` after the `return`
- Verify that the code after `return` does not run
- Explain why it does not run

---

## Mission 5

Create a Function Expression.

Requirements

- Create a variable named `sayHi`
- Store an anonymous function in `sayHi`
- Print `"Hi"` inside the function
- Call `sayHi`

---

## Mission 6

Compare Function Declaration and Function Expression Hoisting.

Requirements

- Call a Function Declaration before it is declared
- Verify that it works
- Try calling a Function Expression before it is initialized
- Comment out the error line
- Explain why Function Declaration can be called before declaration
- Explain why Function Expression cannot be called before initialization
