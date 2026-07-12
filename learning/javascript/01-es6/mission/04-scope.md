# Mission - Scope and Lexical Scope

## 🎯 Goal

Understand how Scope works and how JavaScript searches for variables.

## Mission 1

Verify Global Scope.

Requirements

- Declare a variable named `globalMessage` in the Global Scope
- Create a function named `printGlobalMessage`
- Print `globalMessage` inside the function
- Call the function
- Explain why the function can access `globalMessage`

## Mission 2

Verify Function Scope.

Requirements

- Create a function named `testFunctionScope`
- Declare `var functionMessage = "function scope"` inside the function
- Print `functionMessage` inside the function
- Try accessing `functionMessage` outside the function
- Comment out the error line
- Explain why an error occurs outside the function

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

## Bonus Mission

Verify that Lexical Scope is based on declaration location, not call location.

Requirements

- Create a function inside another function
- Return the inner function
- Call the returned function outside the outer function
- Explain why the inner function can still access variables from the outer function
