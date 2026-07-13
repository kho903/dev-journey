# Mission - Template Literals and Destructuring

## 🎯 Goal

- Practice Template Literals
- Insert variables and expressions into strings using `${}`
- Practice Array Destructuring
- Practice Object Destructuring
- Use default values and renamed variables
- Practice Destructuring in function parameters
- Understand how Destructuring is used with React-like props and API data

## Mission 1

Use Template Literals.

Requirements

- Create variables named `name` and `role`
- Store `"JIHUN"` in `name`
- Store `"backend"` in `role`
- Create a variable named `message`
- Use a Template Literal to create the following string
- Print `message`

Expected output

```text
JIHUN is a backend developer
```

## Mission 2

Use expressions inside `${}`.

Requirements

- Create variables named `a` and `b`
- Store `10` in `a`
- Store `20` in `b`
- Use a Template Literal to print the addition result
- Do not create a separate variable for `a + b`
- Explain why JavaScript expressions can be used inside `${}`

Expected output

```text
10 + 20 = 30
```

## Mission 3

Use a conditional expression inside a Template Literal.

Requirements

- Create a variable named `isLoggedIn`
- Store `true` in `isLoggedIn`
- Create a variable named `message`
- Use the conditional operator inside `${}`
- Print `"User is logged in"` when `isLoggedIn` is `true`
- Print `"User is logged out"` when `isLoggedIn` is `false`
- Print `message`

## Mission 4

Create a multi-line string.

Requirements

- Create a variable named `profile`
- Use a Template Literal
- Include the following information on separate lines
- Print `profile`

Expected output

```text
Name: JIHUN
Role: backend
Language: JavaScript
```

## Mission 5

Use Array Destructuring.

Requirements

- Create an array named `colors`
- Store `"red"`, `"green"`, and `"blue"` in the array
- Use Array Destructuring
- Store each value in `firstColor`, `secondColor`, and `thirdColor`
- Print all three variables
- Explain why Array Destructuring uses element order

## Mission 6

Skip an array element.

Requirements

- Use the same type of `colors` array
- Use Array Destructuring
- Store the first value in `firstColor`
- Skip the second value
- Store the third value in `thirdColor`
- Print `firstColor` and `thirdColor`

Expected output

```text
red
blue
```

## Mission 7

Use default values in Array Destructuring.

Requirements

- Create an array named `colors` containing only `"red"`
- Use Array Destructuring
- Store the first value in `firstColor`
- Store the second value in `secondColor`
- Set the default value of `secondColor` to `"green"`
- Print both variables
- Explain when the default value is applied

Expected output

```text
red
green
```

## Mission 8

Swap two variables using Array Destructuring.

Requirements

- Create `first` with the value `10`
- Create `second` with the value `20`
- Swap their values using Array Destructuring
- Do not create a temporary variable
- Print both values before and after the swap

Expected result after swapping

```text
first: 20
second: 10
```

## Mission 9

Use Object Destructuring.

Requirements

- Create an object named `user`
- Add `name`, `age`, and `role` properties
- Use Object Destructuring
- Extract all three properties into variables
- Print the variables
- Explain why Object Destructuring uses property names instead of property order

Example data

```js
{
  name: "JIHUN",
  age: 29,
  role: "backend"
}
```

## Mission 10

Rename variables with Object Destructuring.

Requirements

- Create an object named `user`
- Add `name` and `age` properties
- Use Object Destructuring
- Store `name` in a new variable named `userName`
- Store `age` in a new variable named `userAge`
- Print `userName` and `userAge`
- Explain whether variables named `name` and `age` are created

## Mission 11

Use default values in Object Destructuring.

Requirements

- Create an object named `user`
- Add only a `name` property
- Use Object Destructuring
- Extract `name`
- Extract `role` with the default value `"guest"`
- Print `name` and `role`
- Explain why the default value is used

## Mission 12

Rename a property and assign a default value.

Requirements

- Create an object named `user`
- Add only a `name` property
- Use Object Destructuring
- Rename `name` to `userName`
- Rename `role` to `userRole`
- Set the default value of `userRole` to `"guest"`
- Print `userName` and `userRole`

## Mission 13

Use Nested Object Destructuring.

Requirements

- Create an object named `response`
- Add `status` and `data` properties
- The `data` property should contain `id`, `name`, and `role`
- Use Nested Object Destructuring
- Extract `name` and `role` directly from `response.data`
- Print `name` and `role`
- Explain whether a variable named `data` is created

Example data

```js
{
  status: 200,
  data: {
    id: 1,
    name: "JIHUN",
    role: "backend"
  }
}
```

## Mission 14

Use Object Destructuring in function parameters.

Requirements

- Create a function named `printUser`
- The function should receive one user object
- Use Parameter Destructuring to extract `name` and `role`
- Print `name` and `role`
- Call the function with a user object
- Explain how Parameter Destructuring works

Expected output

```text
Name: JIHUN
Role: backend
```

## Mission 15

Use default values in Parameter Destructuring.

Requirements

- Create a function named `printUser`
- Use Parameter Destructuring
- Set the default value of `name` to `"Unknown"`
- Set the default value of `role` to `"guest"`
- Set the default value of the entire parameter to an empty object
- Call the function once with `{ name: "JIHUN" }`
- Call the function again without an argument
- Explain why the function does not throw an error when called without an argument

Expected output

```text
Name: JIHUN
Role: guest

Name: Unknown
Role: guest
```

## Mission 16

Use Array Destructuring in function parameters.

Requirements

- Create a function named `printCoordinates`
- Use Array Parameter Destructuring
- Extract `x` and `y`
- Print both values
- Call the function with `[10, 20]`

Expected output

```text
x: 10
y: 20
```

## Mission 17

Use Destructuring with `map()`.

Requirements

- Create an array named `users`
- Each user should have `id`, `name`, and `role`
- Use `map()`
- Destructure `name` directly in the callback parameter
- Create a new array named `names`
- Print `names`

Example data

```js
[
  { id: 1, name: "JIHUN", role: "backend" },
  { id: 2, name: "KIM", role: "frontend" },
];
```

Expected output

```js
["JIHUN", "KIM"];
```

## Mission 18

Use Destructuring with `Object.entries()`.

Requirements

- Create an object named `user`
- Add `name`, `age`, and `role` properties
- Use `Object.entries()`
- Use `forEach()`
- Destructure each `[key, value]` pair in the callback parameter
- Print each key and value

Expected output

```text
name: JIHUN
age: 29
role: backend
```

## Bonus Mission

Create a React-like props example.

Requirements

- Create a function named `UserCard`
- Receive `name` and `role` using Parameter Destructuring
- Set the default value of `role` to `"guest"`
- Return a Template Literal containing `name` and `role`
- Call `UserCard()` with an object
- Print the returned value
- Explain why React components frequently use Parameter Destructuring for props

Expected output

```text
JIHUN - backend
```
