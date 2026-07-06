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
