# Mission - Arrow Function and this

## 🎯 Goal

- Understand Arrow Function syntax and how `this` behaves differently from regular functions

## Mission 1

Convert a Function Expression to an Arrow Function

Requirements

- Create a Function Expression named `add`
- It should take two parameters : `a` and `b`
- Return `a + b`
- Convert it to an Arrow Function named `arrowAdd`
- Print both results

## Mission 2

Use Implicit Return

Requirements

- Create an Arrow Function named `multiply`
- It should take two parameters : `a` and `b`
- Return `a * b` using implicit return
- Print the result

## Mission 3

Use One Parameter Arrow Function

Requirements

- Create an Arrow Function named `greet`
- It should take one parameter named `name`
- Print `"Hello, JIHUN"` by passing `"JIHUN"` as an argument
- Write a comment explaining that parentheses can be omitted when there is only one parameter

## Mission 4

Return an Object from an Arrow Function

Requirements

- Create an Arrow Function named `createUser`
- It should take two parameters: `name` and `age`
- Return an object with `name` and `age`
- Use implicit return
- Wrap the object with `()`
- Print the result

## Mission 5

Compare Regular Function `this` and Arrow Function `this`.

Requirements

- Create an object named `user1`
- Add a property `name`
- Add a regular function method named `printName`
- Print `this.name` inside the method
- Verify that `this` refers to `user1`

Then:

- Create an object named `user2`
- Add a property `name`
- Add an arrow function method named `printName`
- Print `this.name` inside the method
- Verify that `this` does not refer to `user2`

## Mission 6

Use Arrow Function in a Callback.

Requirements

- Create an array named `numbers` with `[1, 2, 3]`
- Use `map()` with an Arrow Function
- Create a new array named `doubledNumbers`
- Each number should be multiplied by `2`
- Print `doubledNumbers`

## Bonus Mission

Explain why Arrow Functions are often used in React.

Requirements

- Write a short comment explaining why Arrow Functions are useful for event handlers or callbacks
- Create a simple function named `handleClick`
- Print `"clicked"` inside the function
