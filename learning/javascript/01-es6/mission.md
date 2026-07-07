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
