// =====================
// Practice - Template Literals and Destructuring
// =====================

// Template Literals
{
  const message = `Hello`;

  console.log("message :", message);
  // message : Hello
}

// =====================
// String Interpolation
// =====================
{
  const name = "JIHUN";
  const age = 29;

  const message = `My name is ${name} and I am ${age} years old`;

  console.log("message :", message);
  // message : My name is JIHUN and I am 29 years old
}

// =====================
// Expressions inside ${}
// =====================
{
  const a = 10;
  const b = 20;

  const result = `${a} + ${b} = ${a + b}`;

  console.log("result :", result);
  // result : 10 + 20 = 30
}

// Function call inside ${}
{
  function getName() {
    return "JIHUN";
  }

  const message = `Hello, ${getName()}`;

  console.log("message :", message); // Hello, JIHUN
}

// Conditional expression inside ${}
{
  const isLoggedIn = true;

  const message = `User is ${isLoggedIn ? "logged in" : "logged out"}`;

  console.log("message :", message);
  // message : User is logged in
}

// =====================
// Multi-line Strings
// =====================
{
  const message = `Hello
My name is JIHUN
I am studying JavaScript`;
  console.log(message);
  /*
    Hello
    My name is JIHUN
    I am studying JavaScript
  */
}

// =====================
// HTML-like String
// =====================
{
  const name = "JIHUN";
  const role = "backend";

  const userItem = `
    <li>
        <strong>${name}</strong>
        <span>${role}</span>
    </li>
  `;

  console.log(userItem);
  /*
    <li>
        <strong>JIHUN</strong>
        <span>backend</span>
    </li>
  */
}

// =====================
// Array Destructuring
// =====================
{
  const colors = ["red", "green", "blue"];

  const [firstColor, secondColor, thirdColor] = colors;

  console.log("firstColor :", firstColor);
  console.log("secondColor :", secondColor);
  console.log("thirdColor :", thirdColor);
  /*
    firstColor : red
    secondColor : green
    thirdColor : blue
  */
}

// =====================
// Skipping Array Elements
// =====================
{
  const colors = ["red", "green", "blue"];
  const [firstColor, , thirdColor] = colors;

  console.log("firstColor :", firstColor);
  console.log("thirdColor :", thirdColor);
  /*
    firstColor : red
    thirdColor : blue
  */
}

// =====================
// Default Values in Array Destructuring
// =====================
{
  const colors = ["red"];
  const [firstColor, secondColor = "green"] = colors;

  console.log("firstColor :", firstColor);
  console.log("secondColor :", secondColor);
  /*
    firstColor : red
    secondColor : green
  */
}

// Default value with undefined
{
  const colors = ["red", undefined];
  const [firstColor, secondColor = "green"] = colors;

  console.log("firstColor :", firstColor);
  console.log("secondColor :", secondColor);
  /*
    firstColor : red
    secondColor : green
  */
}

// Default value is not applied to null
{
  const colors = ["red", null];
  const [firstColor, secondColor = "green"] = colors;

  console.log("firstColor :", firstColor);
  console.log("secondColor :", secondColor);
  /*
    firstColor : red
    secondColor : null
  */
}

// =====================
// Swap Variables
// =====================
{
  let first = 10;
  let second = 20;

  [first, second] = [second, first];

  console.log("first :", first);
  console.log("second :", second);
  /*
    first : 20
    second : 10
  */
}

// =====================
// Object Destructuring
// =====================
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };

  const { name, age, role } = user;

  console.log("name :", name);
  console.log("age :", age);
  console.log("role :", role);
  /*
    name : JIHUN
    age : 29
    role : backend
  */
}

// =====================
// Rename Object Properties
// =====================
{
  const user = {
    name: "JIHUN",
    age: 29,
  };

  const { name: userName, age: userAge } = user;

  console.log("userName :", userName);
  console.log("userAge :", userAge);
  /*
    userName : JIHUN
    userAge : 29
  */
}

// =====================
// Default Values in Object Destructuring
// =====================
{
  const user = {
    name: "JIHUN",
  };

  const { name, role = "guest" } = user;
  console.log("name :", name);
  console.log("role :", role);
  /*
    name : JIHUN
    role : guest
  */
}

// Rename with default value
{
  const user = {
    name: "JIHUN",
  };
  const { name: userName, role: userRole = "guest" } = user;
  console.log("userName :", userName);
  console.log("userRole :", userRole);
  /*
    userName : JIHUN
    userRole : guest
  */
}

// =====================
// Nested Object Destructuring
// =====================
{
  const response = {
    status: 200,
    data: {
      id: 1,
      name: "JIHUN",
      role: "backend",
    },
  };

  const {
    data: { name, role },
  } = response;

  console.log("name :", name);
  console.log("role :", role);
  /*
    name : JIHUN
    role : backend
  */
}

// Nested destructuring in two steps
{
  const response = {
    status: 200,
    data: {
      id: 1,
      name: "JIHUN",
      role: "backend",
    },
  };

  const { data } = response;
  const { id, name, role } = data;

  console.log("id :", id);
  console.log("name :", name);
  console.log("role :", role);
  /*
    id: 1
    name: JIHUN
    role: backend
  */
}

// =====================
// Parameter Destructuring
// =====================
{
  function printUser({ name, role }) {
    console.log(`Name: ${name}`);
    console.log(`Role: ${role}`);
  }

  const user = {
    name: "JIHUN",
    role: "backend",
  };

  printUser(user);

  /*
    Name: JIHUN
    Role: backend
  */
}

// =====================
// Default Values in Parameter Destructuring
// =====================
{
  function printUser({ name = "Unknown", role = "guest" } = {}) {
    console.log(`Name: ${name}`);
    console.log(`Role: ${role}`);
  }

  printUser({
    name: "JIHUN",
  });
  printUser();
  /*
    Name: JIHUN
    Role: guest
    Name: Unknown
    Role: guest
  */
}

// =====================
// Array Parameter Destructuring
// =====================
{
  function printCoordinates([x, y]) {
    console.log(`x: ${x}`);
    console.log(`y: ${y}`);
  }

  const coordinates = [10, 20];
  printCoordinates(coordinates);
  /*
    x: 10
    y: 20
  */
}

// =====================
// Destructuring with Array Methods
// =====================
{
  const users = [
    { id: 1, name: "JIHUN", role: "backend" },
    { id: 2, name: "KIM", role: "frontend" },
  ];

  const names = users.map(({ name }) => name);

  console.log("names :", names);
  // names : [ 'JIHUN', 'KIM' ]
}

// Object.entries() with Array Destructuring
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };

  Object.entries(user).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
  /*
    name: JIHUN
    age: 29
    role: backend
  */
}

// =====================
// React-like Props Example
// =====================
{
  function UserCard({ name, role = "guest" }) {
    return `${name} - ${role}`;
  }
  const userCard = UserCard({
    name: "JIHUN",
    role: "backend",
  });

  console.log("userCard :", userCard);
  // userCard : JIHUN - backend
}

// =====================
// API-like Response Example
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

  const { status, message, data } = response;
  const { id, name, role } = data;

  console.log(`Status : ${status}`);
  console.log(`Message : ${message}`);
  console.log(`User : ${id}, ${name}, ${role}`);
  /*
    Status : 200
    Message : success
    User : 1, JIHUN, backend
  */
}
