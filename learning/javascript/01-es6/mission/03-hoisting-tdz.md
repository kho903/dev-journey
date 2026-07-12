# Mission - Hoisting and TDZ

## 🎯 Goal

Understand how Hoisting works and why `let` and `const` are safer than `var`.

## Mission 1

Verify `var` Hoisting.

Requirements

- Access a `var` variable before declaration
- Declare the variable using `var`
- Assign `"JIHUN"`
- Print the variable again after declaration
- Explain why `undefined` is printed before declaration

## Mission 2

Verify `let` TDZ.

Requirements

- Try accessing a `let` variable before declaration
- Comment out the error line
- Declare the variable using `let`
- Assign `29`
- Print the variable after declaration
- Explain why `ReferenceError` occurs before declaration

## Mission 3

Verify `const` TDZ.

Requirements

- Try accessing a `const` variable before declaration
- Comment out the error line
- Declare the variable using `const`
- Assign `3.14`
- Print the variable after declaration
- Explain why `ReferenceError` occurs before declaration

## Mission 4

Verify TDZ inside Block Scope.

Requirements

- Create a block using `{}`
- Try accessing a `let` variable before declaration inside the block
- Comment out the error line
- Declare `let value = 10`
- Print `value`
- Explain where the TDZ starts and ends

## Mission 5

Compare `var` and `let` before declaration.

Requirements

- Access a `var` variable before declaration
- Access a `let` variable before declaration
- Comment out the `let` error line
- Declare both variables
- Print both variables after declaration
- Explain the difference between `var` and `let`
