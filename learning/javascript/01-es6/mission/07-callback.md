# Mission - Callback Function

## 🎯 Goal

- Understand how Callback Functions work and how functions can be passed as arguments

## Mission 1

Create a Basic Callback Function.

Requirements

- Create a function named `sayHello`
- Print `"Hello"` inside `sayHello`
- Create a function named `executeCallback`
- `executeCallback` should take one parameter named `callback`
- Call `callback()` inside `executeCallback`
- Pass `sayHello` to `executeCallback`
- Explain why `sayHello` is called later inside `executeCallback`

## Mission 2

Use Function as Value.

Requirements

- Create a Function Expression named `sayHi`
- Print `"Hi"` inside `sayHi`
- Create a function named `runFunction`
- `runFunction` should take one parameter named `callback`
- Call `callback()` inside `runFunction`
- Pass `sayHi` to `runFunction`
- Explain why a function can be passed as a value

## Mission 3

Use Callback with Parameters.

Requirements

- Create a function named `greet`
- `greet` should take one parameter named `name`
- Print `"Hello, JIHUN"` by using `name`
- Create a function named `executeGreeting`
- `executeGreeting` should take one parameter named `callback`
- Call `callback("JIHUN")` inside `executeGreeting`
- Pass `greet` to `executeGreeting`
- Explain how the argument `"JIHUN"` is passed to the callback function

## Mission 4

Use Callback with Arrow Function.

Requirements

- Create a function named `executeArrowCallback`
- `executeArrowCallback` should take one parameter named `callback`
- Call `callback()` inside `executeArrowCallback`
- Pass an Arrow Function directly as an argument
- Print `"Arrow Callback"` inside the Arrow Function

## Mission 5

Use Callback with Parameters and Arrow Function.

Requirements

- Create a function named `calculate`
- `calculate` should take three parameters: `a`, `b`, and `callback`
- Call `callback(a, b)` inside `calculate`
- Store the result in a variable named `result`
- Print `result`
- Call `calculate(10, 20, callback)` using different callback functions
- Use one callback for addition
- Use another callback for multiplication

## Mission 6

Use Callback with `map()`.

Requirements

- Create an array named `numbers` with `[1, 2, 3]`
- Use `map()` with a Callback Function
- Create a new array named `doubledNumbers`
- Each number should be multiplied by `2`
- Print `doubledNumbers`
- Explain why `map()` uses a Callback Function

## Mission 7

Use Callback with `forEach()`.

Requirements

- Use the same `numbers` array
- Use `forEach()` with a Callback Function
- Print each number
- Explain the difference between `map()` and `forEach()`

## Bonus Mission

Create a React-like Event Handler.

Requirements

- Create an Arrow Function named `handleClick`
- Print `"clicked"` inside `handleClick`
- Create a function named `simulateClick`
- `simulateClick` should take one parameter named `callback`
- Call `callback()` inside `simulateClick`
- Pass `handleClick` to `simulateClick`
- Explain why this is similar to React's `onClick={handleClick}`
