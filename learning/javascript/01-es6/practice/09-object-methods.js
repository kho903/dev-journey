// =====================
// Practice - Object Methods
// =====================

// Object Property Access
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };

  // Dot Notation
  console.log("user.name :", user.name); // JIHUN
  console.log("user.age :", user.age); // 29

  // Bracket Notation
  console.log('user["name"] :', user["name"]); // JIHUN
  console.log('user["role"] :', user["role"]); // backend
}

// =====================
// Computed Property Access
// =====================

{
  const user = {
    name: "JIHUN",
    age: 29,
  };
  const propertyName = "name";

  console.log("user[propertyName] :", user[propertyName]); // JIHUN
  console.log("user.propertyName :", user.propertyName); // undefined
}

// =====================
// Add, Update, and Delete Properties
// =====================
{
  const user = {
    name: "JIHUN",
  };

  // Add
  user.age = 29;
  user["role"] = "backend";

  console.log("after adding properties :", user);
  // { name: 'JIHUN', age: 29, role: 'backend' }

  // Update
  user.name = "KIM";
  user["age"] = 30;

  console.log("after updating properties :", user);
  // { name: 'KIM', age: 30, role: 'backend' }

  // Delete
  delete user.role;
  console.log("after deleting role :", user);
  // { name: 'KIM', age: 30 }
}

// =====================
// Object.keys()
// =====================
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };

  const keys = Object.keys(user);

  console.log("keys :", keys);
  // [ 'name', 'age', 'role' ]
}

// =====================
// Object.values()
// =====================
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };

  const values = Object.values(user);

  console.log("values :", values);
  // [ 'JIHUN', 29, 'backend' ]
}

// =====================
// Object.entries()
// =====================
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };

  const entries = Object.entries(user);

  console.log("entries :", entries);
  // [ [ 'name', 'JIHUN' ], [ 'age', 29 ], [ 'role', 'backend' ] ]
}

// =====================
// Property Existence with `in`
// =====================
{
  const user = {
    name: "JIHUN",
    age: undefined,
  };

  console.log('"name" in user :', "name" in user); // true
  console.log('"age" in user :', "age" in user); // true
  console.log('"role" in user :', "role" in user); // false

  // 값이 undefined여도 프로퍼티가 존재하면 true
  console.log("user.age :", user.age); // undefined
}

// =====================
// Object.hasOwn()
// =====================
{
  const user = {
    name: "JIHUN",
    age: 29,
  };

  console.log('Object.hasOwn(user, "name") :', Object.hasOwn(user, "name")); // true
  console.log('Object.hasOwn(user, "role") :', Object.hasOwn(user, "role")); // false
}

// =====================
// `in` vs Object.hasOwn()
// =====================
{
  const parent = {
    inheritedValue: "parent",
  };

  const child = Object.create(parent);
  child.ownValue = "child";
  console.log('"ownValue in child :"', "ownValue" in child); // true
  console.log('"inheritedValue in child :"', "inheritedValue" in child); // true

  console.log(
    'Object.hasOwn(child, "ownValue") :',
    Object.hasOwn(child, "ownValue"),
  ); // true

  console.log(
    'Object.hasOwn(child, "inheritedValue") :',
    Object.hasOwn(child, "inheritedValue"),
  ); // false
}

// =====================
// Object Iteration with Object.keys()
// =====================
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
}

// =====================
// Object Iteration with Object.entries()
// =====================
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };

  Object.entries(user).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];

    console.log(`${key}: ${value}`);
  });
  /*
    name: JIHUN
    age: 29
    role: backend
  */
}

// =====================
// Object Methods with Array Methods
// =====================
{
  const scores = {
    java: 90,
    spring: 85,
    javascript: 80,
  };

  const highScores = Object.entries(scores).filter((entry) => {
    const score = entry[1];
    return score >= 85;
  });
  console.log("highScores :", highScores);
  // [ [ 'java', 90 ], [ 'spring', 85 ] ]
}

// =====================
// Calculate Total with Object.values()
// =====================
{
  const scores = {
    java: 90,
    spring: 85,
    javascript: 80,
  };

  const totalScore = Object.values(scores).reduce(
    (accumulator, score) => accumulator + score,
    0,
  );

  console.log("totalScore :", totalScore); // 255
}

// =====================
// Array of Objects
// =====================
{
  const users = [
    { id: 1, name: "JIHUN", role: "backend" },
    { id: 2, name: "KIM", role: "frontend" },
    { id: 3, name: "LEE", role: "backend" },
  ];

  const foundUser = users.find((user) => user.id === 2);

  console.log("foundUser :", foundUser);
  // { id: 2, name: 'KIM', role: 'frontend' }

  const backendUsers = users.filter((user) => user.role === "backend");

  console.log("backendUsers :", backendUsers);
  /*
    backendUsers : [
        { id: 1, name: 'JIHUN', role: 'backend' },
        { id: 3, name: 'LEE', role: 'backend' }
    ]
  */

  const names = users.map((user) => user.name);
  console.log("names :", names);
  // [ 'JIHUN', 'KIM', 'LEE' ]
}

// =====================
// Practical API-like Example
// =====================
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

  console.log("response.status :", response.status); // 200
  console.log("response.data.name :", response.data.name); // JIHUN

  Object.entries(response.data).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];

    console.log(`${key}: ${value}`);
  });
  /*
    id: 1
    name: JIHUN
    role: backend
  */
}
