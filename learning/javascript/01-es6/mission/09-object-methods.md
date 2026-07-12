# Mission - Object Methods

## 🎯 Goal

- Practice accessing and modifying object properties
- Understand Dot Notation and Bracket Notation
- Practic `Object.keys()`, `Object.values()`, and `Object.entries()`
- Understand the difference between `in` and `Object.hasOwn()`
- Use Object Methods together with Array Methods

## Mission 1

Access object properties

Requirements

- Create an object named `user`
- Add `name`, `age`, and `role` properties
- Access `name` using Dot Notation
- Access `role` using Bracket Notation
- Print both value
- Explain the difference between Dot Notattion and Bracket Notation

Example data

```js
{
  name: "JIHUN",
  age: 29,
  role: "backend"
}
```

## Mission 2

Use Computed Property Access

Requirements

- Create an object named `user`
- Create a variable named `propertyName` with the value `"name"`
- Access the property using `user[propertyName]`
- Print the result
- Also print `user.propertyName`
- Explain why the two results are different

## Mission 3

Add, update, and delete object properties

Requirements

- Create an object named `user` with a `name` property
- Add an `age` property using Dot Notation
- Add a `role` property using Bracket Notation
- Change `name` to `"KIM"`
- Delete the `role` property
- Print the object after each operation
- Explain why properties inside a `const` object can be changed

## Mission 4

Use `Object.keys()`, `Object.values()`, and `Object.entries()`

Requirements

- Create an object named `user`
- Add `name`, `age`, and `role` properties
- Store the result of `Object.keys(user)` in `keys`
- Store the result of `Object.values(user)` in `values`
- Store the result of `Object.entries(user)` in `entries`
- Print all three variables
- Explain what each method returns

## Mission 5

Check whether properites exist

Requirements

- Create an object named `user`
- Add a `name` property
- Add an `age` property whose value is `undefined`
- Use the `in` operator to check `name`, `age`, and `role`
- Use `Object.hasOwn()` to check the same properties
- Print all results
- Explain why `"age" in user` returns `true`
- Explain the difference between a missing property and a property whose value is `undefined`

## Mission 6

Compare `in` and `Object.hasOwn()`.

Requirements

- Create an object named `parent`
- Add an `inheritedValue` property to `parent`
- Create `child` using `Object.create(parent)`
- Add an `ownValue` property directly to `child`
- Check both properties using the `in` operator
- Check both properties using `Object.hasOwn()`
- Print all results
- Explain why the results are different

## Mission 7

Iterate over an object.

Requirements

- Create an object named `user`
- Add `name`, `age`, and `role` properties
- Use `Object.keys()` with `forEach()`
- Print each key and its corresponding value
- Access each value using `user[key]`
- Explain why `user.key` cannot be used in this situation

Expected output

```text
name: JIHUN
age: 29
role: backend
```

## Mission 8

Iterate using `Object.entries()`.

Requirements

- Use the same type of `user` object
- Use `Object.entries()` with `forEach()`
- Receive each `[key, value]` pair as an `entry`
- Access the key using `entry[0]`
- Access the value using `entry[1]`
- Print each key and value

Expected output

```text
name: JIHUN
age: 29
role: backend
```

## Mission 9

Use Object Methods with Array Methods.

Requirements

- Create an object named `scores`
- Add `java`, `spring`, and `javascript` scores
- Use `Object.entries()`
- Use `filter()` to keep only scores greater than or equal to `85`
- Store the result in a variable named `highScores`
- Print `highScores`

Example data

```js
{
  java: 90,
  spring: 85,
  javascript: 80
}
```

Expected result

```js
[
  ["java", 90],
  ["spring", 85],
];
```

## Mission 10

Calculate the total score.

Requirements

- Create an object named `scores`
- Add `java`, `spring`, and `javascript` scores
- Use `Object.values()` to create an array of scores
- Use `reduce()` to calculate the total
- Store the result in a variable named `totalScore`
- Print `totalScore`
- Explain why Array Methods can be used after `Object.values()`

Example data

```js
{
  java: 90,
  spring: 85,
  javascript: 80
}
```

Expected result

```text
255
```

## Mission 11

Handle an array of objects.

Requirements

- Create an array named `users`
- Each user should have `id`, `name`, and `role`
- Use `find()` to find the user whose `id` is `2`
- Store the result in `foundUser`
- Use `filter()` to extract users whose role is `"backend"`
- Store the result in `backendUsers`
- Use `map()` to extract only user names
- Store the result in `names`
- Print all three results

Example data

```js
[
  { id: 1, name: "JIHUN", role: "backend" },
  { id: 2, name: "KIM", role: "frontend" },
  { id: 3, name: "LEE", role: "backend" },
];
```

## Bonus Mission

Handle an API-like response object.

Requirements

- Create an object named `response`
- Add `status`, `message`, and `data` properties
- The `data` property should contain another object
- Access and print `response.status`
- Access and print `response.data.name`
- Use `Object.entries()` to iterate over `response.data`
- Print every key and value inside `data`
- Explain how nested objects can represent API response data

Example data

```js
{
  status: 200,
  message: "success",
  data: {
    id: 1,
    name: "JIHUN",
    role: "backend"
  }
}
```
