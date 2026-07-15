# Mission - Spread Syntax and Rest Parameters

## 🎯 Goal

- Practice Spread Syntax with arrays and objects
- Copy and merge arrays without changing the original arrays
- Copy, update, and merge objects
- Understand object property overwrite order
- Understand the limitations of Shallow Copy
- Collect multiple function arguments using Rest Parameters
- Collect remaining values using Rest Syntax
- Practice React-like immutable updates

## Mission 1

Expand an array using Spread Syntax

Requirements

- Create an array named `numbers`
- Store `10`, `20`, and `30` in the array
- Use Spread Syntax inside `console.log()`
- Print the array elements as separate values
- Explain the difference between `console.log(numbers)` and `console.log(...numbers)`

## Mission 2

Copy an array using Spread Syntax

Requirements

- Create an array named `original`
- Store `10`, `20`, and `30` in the array
- Create a new array named `copied`
- Copy `original` using Spread Syntax
- Print both arrays
- Compare the arrays using `===`
- Explain why the comparison result is `false`

Expected result

```text
original === copied: false
```

## Mission 3

Modify a copied array

Requirements

- Create an array named `original`
- Copy it into a new array named `copied`
- Add `40` only to `copied`
- Print both arrays
- Confirm that `original` was not changed

Expected output

```text
original: 10,20,30
copied: 10,20,30,40
```

## Mission 4

Add elements while copying an array

Requirements

- Create an array named `numbers` containing `20` and `30`
- Create a new array named `result`
- Add `10` before the original elements
- Add `40` after the original elements
- Use Spread Syntax
- Print `result`

Expected output

```text
[10, 20, 30, 40];
```

## Mission 5

Merge two arrays

Requirements

- Create an array named `frontend`
- Add `"HTML"`, `"CSS"`, and `"JavaScript"`
- Create an array named `backend`
- Add `"Java"` and `"Spring"`
- Merge both arrays into a new array named `skills`
- Do not use `concat()`
- Print `skills`

Expected output

```text
["HTML", "CSS", "JavaScript", "Java", "Spring"];
```

## Mission 6

Pass array elements as function arguments

Requirements

- Create a function named `add`
- The function should receive three parameters
- Return the sum of the three parameters
- Create an array containing `10`, `20`, and `30`
- Pass the array elements using Spread Syntax
- Print the result

Expected output

```text
60
```

## Mission 7

Find the largest number using `Math.max()`

Requirements

- Create an array named `numbers`
- Store `10`, `50`, `30`, and `80`
- Use Spread Syntax with `Math.max()`
- Store the result in `maxNumber`
- Print `maxNumber`
- Explain why `Math.max(numbers)` returns `NaN`

Expected output

```text
80
```

## Mission 8

Expand a string into an array

Requirements

- Create a variable named `word`
- Store `"JavaScript"` in `word`
- Use Spread Syntax
- Create an array named `letters`
- Print `letters`

Expected output

```text
["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]
```

## Mission 9

Copy and update an object

Requirements

- Create an object named `user`
- Add `name`, `age`, and `role` properties
- Set `role` to `"guest"`
- Create a new object named `updatedUser`
- Copy all properties from `user`
- Change only `role` to `"backend"`
- Print both objects
- Confirm that the original object was not changed

Example data

```js
{
  name: "JIHUN",
  age: 29,
  role: "guest"
}
```

## Mission 10

Practice object property overwrite order

Requirements

- Create an object named `user`
- Add `name: "JIHUN"` and `role: "guest"`
- Create an object named `result1`
- Spread `user` first and write `role: "backend"` afterward
- Create an object named `result2`
- Write `role: "backend"` first and spread `user` afterward
- Print the `role` property of both objects
- Explain why the results are different

Expected output

```text
result1.role: backend
result2.role: guest
```

## Mission 11

Merge multiple objects

Requirements

- Create an object named `personalInfo`
- Add `name` and `age`
- Create an object named `jobInfo`
- Add `role` and `language`
- Merge them into a new object named `user`
- Use Object Spread Syntax
- Print `user`

Expected result

```js
{
  name: "JIHUN",
  age: 29,
  role: "backend",
  language: "Java"
}
```

## Mission 12

Demonstrate Shallow Copy

Requirements

- Create an object named `original`
- Add a nested object named `address`
- Add `city: "Seoul"` inside `address`
- Create `copied` using Object Spread Syntax
- Compare `original` and `copied` using `===`
- Compare `original.address` and `copied.address` using `===`
- Change `copied.address.city` to `"Busan"`
- Print both city values
- Explain why the original object is affected

Expected results

```text
original === copied: false
original.address === copied.address: true
original.address.city: Busan
copied.address.city: Busan
```

## Mission 13

Copy a nested object independently

Requirements

- Use an object containing a nested `address` object
- Copy the outer object using Spread Syntax
- Copy the `address` object separately using Spread Syntax
- Change the copied city to `"Busan"`
- Confirm that the original city remains `"Seoul"`
- Compare both `address` objects using `===`

Expected results

```text
original.address.city: Seoul
copied.address.city: Busan
original.address === copied.address: false
```

## Mission 14

Collect multiple arguments using Rest Parameters

Requirements

- Create a function named `sum`
- Use Rest Parameters
- Collect all arguments in an array named `numbers`
- Use `reduce()` to calculate the total
- Set the initial value of `reduce()` to `0`
- Call the function with different numbers of arguments
- Print each result

Expected output

```text
30
60
100
```

Example calls

```js
sum(10, 20);
sum(10, 20, 30);
sum(10, 20, 30, 40);
```

## Mission 15

Use regular parameters with Rest Parameters

Requirements

- Create a function named `printUser`
- The first parameter should be `name`
- Collect the remaining arguments in `skills`
- Print the name
- Print the skills array
- Explain why the Rest Parameter must be the final parameter

Example call

```js
printUser("JIHUN", "Java", "Spring", "JavaScript");
```

Expected output

```text
Name: JIHUN
Skills: Java,Spring,JavaScript
```

## Mission 16

Use Rest Syntax in Array Destructuring

Requirements

- Create an array named `numbers`
- Store `10`, `20`, `30`, `40`, and `50`
- Store the first element in `first`
- Store the second element in `second`
- Collect the remaining elements in `restNumbers`
- Print all three variables
- Explain why Rest Syntax must be written last

Expected results

```text
first: 10
second: 20
restNumbers: 30,40,50
```

## Mission 17

Use Rest Syntax in Object Destructuring

Requirements

- Create an object named `user`
- Add `id`, `name`, `age`, and `role`
- Extract `id`
- Collect the remaining properties in `userInfo`
- Print `id`
- Print `userInfo`
- Confirm that `userInfo` is an object

Example data

```js
{
  id: 1,
  name: "JIHUN",
  age: 29,
  role: "backend"
}
```

## Mission 18

Exclude a property from a new object

Requirements

- Create an object named `user`
- Add `id`, `name`, `password`, and `role`
- Use Object Destructuring and Rest Syntax
- Store `password` separately
- Collect the remaining properties in `safeUser`
- Print `safeUser`
- Confirm that the original object is not changed
- Explain whether this alone is enough to protect sensitive data in an API

Expected result

```js
{
  id: 1,
  name: "JIHUN",
  role: "backend"
}
```

## Mission 19

Update a nested object in a React-like way

Requirements

- Create an object named `user`
- Add `name`
- Add a nested `address` object
- Add `city: "Seoul"` and `country: "Korea"`
- Create a new object named `updatedUser`
- Change only the city to `"Busan"`
- Do not change the original object
- Copy both the outer object and the nested object
- Print both objects

Expected result

```text
original city: Seoul
updated city: Busan
```

## Mission 20

Update one object inside an array

Requirements

- Create an array named `users`
- Add at least two user objects
- Each object should have `id`, `name`, and `role`
- Use `map()`
- Change the role of the user whose `id` is `1`
- Use Spread Syntax to create a new object
- Keep all other user objects unchanged
- Store the result in `updatedUsers`
- Print both `users` and `updatedUsers`

Example data

```js
[
  { id: 1, name: "JIHUN", role: "guest" },
  { id: 2, name: "KIM", role: "frontend" },
];
```

## Bonus Mission

Use Spread Syntax and Rest Parameters together

Requirements

- Create a function named `addBonus`
- The first parameter should be `bonus`
- Collect the remaining arguments in `scores`
- Add `bonus` to every score using `map()`
- Return a new array
- Call the function with `5`, `70`, `80`, and `90`
- Print the returned array
- Explain which `...` is Rest and which operation creates the new array

Expected output

```text
[75, 85, 95]
```
