// Mission 1
// Access object properties
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };
  const userDotName = user.name;
  const userBracketRole = user["role"];
  console.log(`userDotName = ${userDotName}`); // JIHUN
  console.log(`userBracketRole = ${userBracketRole}`); // backend
  /*
  Explain the difference between Dot Notation and Bracket Notation
  - Dot Notation is cleaner and easier to read, so it is commonly used when the property name is fixed
  - Bracket Notation is more flexible because it allows us to use variables and property names containing spaces or special characters
  */
}

// Mission 2
// Use Computed Property Access
{
  const user = {
    name: "JIHUN",
  };
  const propertyName = "name";
  console.log(`user[propertyName] : ${user[propertyName]}`); // JIHUN
  console.log(`user.propertyName : ${user.propertyName}`); // undefined
  /*
  Explain why the two results are different
  - `user[propertyName]` uses the value stored in the `propertyName` variable
  - Since `propertyName` contains `"name"`, it accesses `user.name`
  - `user.propertyName` looks for a property literally named `"propertyName"`
  - Since `user` does not have that property, it returns `undefined`
  */
}

// Mission 3
// Add, update, and delete object properties
{
  const user = {
    name: "JIHUN",
  };
  user.age = 29;
  user["role"] = "backend";
  console.log("user :", user);
  // { name: 'JIHUN', age: 29, role: 'backend' }

  user.name = "KIM";
  console.log("user after changing name :", user);
  // { name: 'KIM', age: 29, role: 'backend' }
  delete user.role;
  console.log("user after deleting role :", user);
  // { name: 'KIM', age: 29 }
  /*
  Explain why properties inside a `const` object can be changed
  - An object declared with `const` cannot be reassigned to another object
  - However, its internal properties can still be added, updated, or deleted
  */
}

// Mission 4
// Use `Object.keys()`, `Object.values()`, and `Object.entries()`
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };
  const keys = Object.keys(user);
  const values = Object.values(user);
  const entries = Object.entries(user);
  console.log("keys :", keys);
  // [ 'name', 'age', 'role' ]
  console.log("values :", values);
  // [ 'JIHUN', 29, 'backend' ]
  console.log("entries :", entries);
  // [ [ 'name', 'JIHUN' ], [ 'age', 29 ], [ 'role', 'backend' ] ]
  /*
  Explain what each method returns
  - `Object.keys()` returns an array of property keys
  - `Object.values()` returns an array of property values
  - `Object.entries()` returns an array of `[key, value]` pairs
  */
}

// Mission 5
// Check whether properties exist
{
  const user = {
    name: "JIHUN",
    age: undefined,
  };
  console.log(`"name" in user : ${"name" in user}`); // true
  console.log(`"age" in user : ${"age" in user}`); // true
  console.log(`"role" in user : ${"role" in user}`); // false
  console.log(`Object.hasOwn(user, "name") : ${Object.hasOwn(user, "name")}`);
  console.log(`Object.hasOwn(user, "age") : ${Object.hasOwn(user, "age")}`);
  console.log(`Object.hasOwn(user, "role") : ${Object.hasOwn(user, "role")}`);
  /*
    Explain why `"age" in user` returns `true`
    - The `in` operator checks whether the property exists
    - The `age` property exists even though its value is `undefined`
    - Therefore, `"age" in user` returns `true`
    Explain the difference between a missing property and a property whose value is `undefined`
    - A missing property means that the property key does not exist in the object
    - A property whose value is `undefined` still exists, but its current value is `undefined`
    - Accessing either property may return `undefined`, so `in` or `Object.hasOwn()` can be used to distinguish them
  */
}

// Mission 6
// Compare `in` and `Object.hasOwn()`
{
  const parent = {
    inheritedValue: "inherit",
  };

  const child = Object.create(parent);
  child.ownValue = "child";
  console.log(`${"inheritedValue" in parent}`); // true
  console.log(`${"inheritedValue" in child}`); // true
  console.log(`${"ownValue" in parent}`); // false
  console.log(`${"ownValue" in child}`); // true

  console.log(
    'Object.hasOwn(child, "inheritedValue") :',
    Object.hasOwn(child, "inheritedValue"),
  ); // false

  console.log(
    'Object.hasOwn(child, "ownValue") :',
    Object.hasOwn(child, "ownValue"),
  ); // true
  /*
  Explain why the results are different
  - The `in` operator checks both the object's own properties and properties inherited through the prototype chain  - `Object.hasOwn()` checks only properties that belong directly to the object
  - `inheritedValue` is inherited from `parent`, so `"inheritedValue" in child` is true
  - However, `Object.hasOwn(child, "inheritedValue")` is false
  - `ownValue` belongs directly to `child`, so both checks return true
  */
}

// Mission 7
// Iterate over an object
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };

  Object.keys(user).forEach((key) => {
    console.log(`${key}: ${user[key]}`);
  });
  /*
    name: JIHUN
    age: 29
    role: backend
  */
  /*
  Explain why `user.key` cannot be used in this situation
  - `key` is a variable whose value changes during each iteration
  - `user[key]` uses the value stored in the `key` variable
  - `user.key` looks for a property literally named `"key"`
  - Therefore, Bracket Notation must be used for computed property access
  */
}

// Mission 8
// Iterate using `Object.entries()`
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };
  Object.entries(user).forEach((entry) => {
    console.log(`${entry[0]}: ${entry[1]}`);
  });
  /*
    name: JIHUN
    age: 29
    role: backend
  */
}

// Mission 9
// Use Object Methods with Array Methods
{
  const scores = {
    java: 90,
    spring: 85,
    javascript: 80,
  };
  const highScores = Object.entries(scores).filter(([_, score]) => score >= 85);
  console.log("highScores :", highScores); // [ [ 'java', 90 ], [ 'spring', 85 ] ]
}

// Mission 10
// Calculate the total score
{
  const scores = {
    java: 90,
    spring: 85,
    javascript: 80,
  };

  const scoreValues = Object.values(scores);

  const totalScore = scoreValues.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  console.log(`totalScore : ${totalScore}`); // 255
  /*
  Explain why Array Methods can be used after `Object.values()`
  - Because `Object.values()` returns a standard JavaScript array
  - Therefore, Array Methods such as `reduce()`, `map()`, and `filter()` can be used on the returned value
  */
}

// Mission 11
// Handle an array of objects.
{
  const users = [
    { id: 1, name: "JIHUN", role: "backend" },
    { id: 2, name: "KIM", role: "frontend" },
    { id: 3, name: "LEE", role: "backend" },
  ];

  const foundUser = users.find((user) => user.id === 2);
  console.log(foundUser);
  // { id: 2, name: 'KIM', role: 'frontend' }
  const backendUsers = users.filter((user) => user.role === "backend");
  console.log(backendUsers);
  /*
  [
    { id: 1, name: 'JIHUN', role: 'backend' },
    { id: 3, name: 'LEE', role: 'backend' }
  ]
  */
  const names = users.map((user) => user.name);
  console.log(names); // [ 'JIHUN', 'KIM', 'LEE' ]
}

// Bonus Mission
// Handle an API-like response object
{
  const response = {
    status: 200,
    message: "success",
    data: {
      id: 1,
      name: "JIHUN",
      role: "backend",
    },
  };

  console.log(`response.status : ${response.status}`); // 200
  console.log(`response.data.name : ${response.data.name}`); // JIHUN
  Object.entries(response.data).forEach((entry) => {
    console.log(`${entry[0]} : ${entry[1]}`);
  });
  /*
  id : 1
  name : JIHUN
  role : backend
  */
  /*
  Explain how nested objects can represent API response data
  - Nested objects allow related data to be grouped together
  - `status` and `message` describe the result of the API request
  - `data` contains the actual user information
  - A nested property can be accessed using `response.data.name`
  */
}
