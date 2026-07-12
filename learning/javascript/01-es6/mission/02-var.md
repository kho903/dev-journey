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
