# Mission - Array Methods

## 🎯 Goal

- Practice common JavaScript Array Methods
- Understand how Array Methods use Callback Functions
- Understand when to use `forEach()`, `map()`, `filter()`, `find()`, `some()`, `every()`, and `reduce()`

## Mission 1

Use `forEach()`.

Requirements

- Create an array named `numbers` with `[1, 2, 3, 4, 5]`
- Use `forEach()`
- Print each number
- Explain why `forEach()` does not create a new array

## Mission 2

Use `map()`.

Requirements

- Create an array named `numbers` with `[1, 2, 3, 4, 5]`
- Use `map()`
- Create a new array named `doubledNumbers`
- Each number should be multiplied by `2`
- Print `doubledNumbers`
- Explain why `map()` returns a new array

## Mission 3

Use `filter()`.

Requirements

- Create an array named `numbers` with `[1, 2, 3, 4, 5, 6]`
- Use `filter()`
- Create a new array named `evenNumbers`
- Only even numbers should remain
- Print `evenNumbers`
- Explain why `filter()` returns only elements that satisfy the condition

## Mission 4

Use `find()`.

Requirements

- Create an array named `users`
- Each user should have `id`, `name`, and `role`
- Use `find()`
- Find the user whose `id` is `2`
- Store the result in a variable named `foundUser`
- Print `foundUser`
- Explain what happens if no matching element is found

Example data

```js
[
  { id: 1, name: "JIHUN", role: "backend" },
  { id: 2, name: "KIM", role: "frontend" },
  { id: 3, name: "LEE", role: "backend" },
];
```

## Mission 5

Use `some()`.

Requirements

- Create an array named `numbers` with `[1, 3, 5, 8]`
- Use `some()`
- Check whether the array has at least one even number
- Store the result in a variable named `hasEvenNumber`
- Print `hasEvenNumber`
- Explain why the result is `true`

## Mission 6

Use `every()`.

Requirements

- Create an array named `numbers` with `[2, 4, 6, 8]`
- Use `every()`
- Check whether all numbers are even
- Store the result in a variable named `allEvenNumbers`
- Print `allEvenNumbers`
- Explain why the result is `true`

## Mission 7

Use `reduce()`.

Requirements

- Create an array named `numbers` with `[1, 2, 3, 4]`
- Use `reduce()`
- Calculate the sum of all numbers
- Store the result in a variable named `sum`
- Print `sum`
- Explain the role of `accumulator`, `currentValue`, and initial value

## Mission 8

Calculate total product price using `reduce()`.

Requirements

- Create an array named `products`
- Each product should have `id`, `name`, and `price`
- Use `reduce()`
- Calculate the total price of all products
- Store the result in a variable named `totalPrice`
- Print `totalPrice`

Example data

```js
[
  { id: 1, name: "Keyboard", price: 10000 },
  { id: 2, name: "Mouse", price: 5000 },
  { id: 3, name: "Monitor", price: 150000 },
];
```

## Mission 9

Filter backend users.

Requirements

- Create an array named `users`
- Each user should have `id`, `name`, and `role`
- Use `filter()`
- Create a new array named `backendUsers`
- Only users whose role is `"backend"` should remain
- Print `backendUsers`

Example data

```js
[
  { id: 1, name: "JIHUN", role: "backend" },
  { id: 2, name: "KIM", role: "frontend" },
  { id: 3, name: "LEE", role: "backend" },
];
```

## Bonus Mission

Create a React-like list rendering example.

Requirements

- Create an array named `menuItems` with `["Home", "About", "Contact"]`
- Use `map()`
- Create a new array named `menuTexts`
- Each menu item should be converted to `<li>menuItem</li>`
- Print `menuTexts`
- Explain why React often uses `map()` for list rendering
