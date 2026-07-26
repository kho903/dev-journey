# Mission - JavaScript Modules

## 🎯 Goal

- Separate JavaScript code into multiple files
- Export and import variables, functions, and objects
- Practice Named Export and Default Export
- Rename imported values using Import Aliases
- Use Namespace Import
- Understand Module Scope
- Practice Side-effect Import
- Organize modules in a React-like structure

## Mission 1

Export and import a variable

Requirements

- Create `user.mjs`
- Create a variable named `name`
- Store `"JIHUN"` in `name`
- Export `name` using Named Export
- Create `app.mjs`
- Import `name`
- Print `name`

Expected output

```text
JIHUN
```

## Mission 2

Export and import multiple values

Requirements

- Create `user.mjs`
- Create `name`, `age`, and `role`
- Export all three values
- Import them into `app.mjs`
- Print each value

Expected output

```text
name : JIHUN
age : 29
role : backend
```

## Mission 3

Export a function

Requirements

- Create `greet.mjs`
- Create a function named `greet`
- The function should receive `name`
- Return `Hello, ${name}`
- Export the function using Named Export
- Import and call it from `app.mjs`

Expected output

```text
Hello, JIHUN
```

## Mission 4

Use Default Export

Requirements

- Create `user.mjs`
- Create a user object
- Add `name`, `age`, and `role`
- Export the object using Default Export
- Import it into `app.mjs`
- Use a different name when importing
- Print the imported object

Example data

```js
{
  name: "JIHUN",
  age: 29,
  role: "backend"
}
```

## Mission 5

Export a function as Default Export

Requirements

- Create `calculator.mjs`
- Create a function named `multiply`
- Return the multiplication result
- Export it using Default Export
- Import it into `app.mjs`
- Call the function with `10` and `20`

Expected output

```text
200
```

## Mission 6

Use Import Aliases

Requirements

- Create `user.mjs`
- Export `name` and `role`
- Import `name` as `userName`
- Import `role` as `userRole`
- Print both imported values

Expected output

```text
userName : JIHUN
userRole : backend
```

## Mission 7

Use Namespace Import

Requirements

- Create `calculator.mjs`
- Add `add`, `subtract`, `multiply`, and `divide`
- Export all functions using Named Export
- Import all exports using `* as calculator`
- Call every function
- Prevent division by zero

Expected output

```text
add : 30
subtract : 10
multiply : 200
divide : 2
divide by zero : Cannot divide by zero
```

## Mission 8

Use Named Export and Default Export together

Requirements

- Create `calculator.mjs`
- Create `PI`
- Create `add`
- Create `subtract`
- Create `multiply`
- Export `PI`, `add`, and `subtract` using Named Export
- Export `multiply` using Default Export
- Import all values into `app.mjs`
- Print the results

Expected output

```text
PI : 3.141592
add : 30
subtract : 10
multiply : 200
```

## Mission 9

Demonstrate Module Scope

Requirements

- Create `user.mjs`
- Declare `name` as `"JIHUN"`
- Create and export `getUserName`
- Create `product.mjs`
- Declare another variable named `name`
- Store `"Keyboard"` in it
- Create and export `getProductName`
- Import both functions into `app.mjs`
- Confirm that the two `name` variables do not conflict

Expected output

```text
user name : JIHUN
product name : Keyboard
```

## Mission 10

Demonstrate Live Binding

Requirements

- Create `counter.mjs`
- Create an exported variable named `count`
- Set its initial value to `0`
- Create and export `increase`
- Create and export `decrease`
- Create and export `reset`
- Import all values into `app.mjs`
- Call the functions and print `count` after every change
- Explain why the imported `count` changes
- Explain why `count` cannot be reassigned directly in `app.mjs`

Expected output

```text
initial count : 0
after increase : 1
after second increase : 2
after decrease : 1
after reset : 0
```

## Mission 11

Use Side-effect Import

Requirements

- Create `setup.mjs`
- Print an application setup message
- Do not export any value
- Create `app.mjs`
- Import `setup.mjs` without receiving a value
- Print an application running message
- Explain why the setup message is printed first

Expected output

```text
Application setup completed
Application is running
```

## Mission 12

Separate validation functions

Requirements

- Create `validation.mjs`
- Create `validateUserId`
- The user ID must contain 5 to 12 characters
- The first character must be an English letter
- The remaining characters may contain English letters, numbers, or `_`
- Create `validatePassword`
- The password must contain at least 8 characters
- Export both functions
- Import and test them in `app.mjs`

Example calls

```js
validateUserId("jihun_01");
validateUserId("1jihun");
validatePassword("password123");
validatePassword("1234");
```

## Mission 13

Separate user data and lookup functions

Requirements

- Create `userData.mjs`
- Create an array named `users`
- Add at least three user objects
- Create `findUserById`
- Create `findUsersByRole`
- Export the array and both functions
- Import them into `app.mjs`
- Find one user by ID
- Find all backend users
- Print the results

Example data

```js
[
  { id: 1, name: "JIHUN", role: "backend" },
  { id: 2, name: "KIM", role: "frontend" },
  { id: 3, name: "LEE", role: "backend" },
];
```

## Mission 14

Create a React-like component module

Requirements

- Create `UserCard.mjs`
- Create a function named `UserCard`
- Receive an object containing `name` and `role`
- Return an HTML-like string
- Export `UserCard` using Default Export
- Create `userData.mjs`
- Export a users array
- Import both modules into `app.mjs`
- Use `map()` or `forEach()` to render every user

Expected format

```html
<article>
  <h2>JIHUN</h2>
  <p>backend</p>
</article>
```

## Mission 15

Build a small modular application

Requirements

Create the following structure:

```text
15-user-management/
├── data/
│   └── users.mjs
├── services/
│   └── userService.mjs
├── components/
│   └── UserCard.mjs
└── app.mjs
```

### `users.mjs`

- Create and export a users array
- Add at least three users

### `userService.mjs`

- Create `findUserById`
- Create `findUsersByRole`
- Create `addUser`
- Export all functions using Named Export

### `UserCard.mjs`

- Create a function that returns an HTML-like user card
- Export it using Default Export

### `app.mjs`

- Import the users array
- Import all service functions
- Import `UserCard`
- Print every user
- Find one user by ID
- Find users by role
- Add a new user without directly modifying the original array
- Print the updated user list

## Bonus Mission

Create a module with an export alias

Requirements

- Create `user.mjs`
- Declare a variable named `name`
- Export it as `userName`
- Import `userName` into `app.mjs`
- Print the result
- Explain the difference between Export Alias and Import Alias

Expected output

```text
JIHUN
```
