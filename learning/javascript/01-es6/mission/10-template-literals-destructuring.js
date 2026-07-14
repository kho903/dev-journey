// Mission 1
// Use template Literals
{
  const name = "JIHUN";
  const role = "backend";
  const message = `${name} is a ${role} developer`;
  console.log(`message : ${message}`);
  // message : JIHUN is a backend developer
}

// Mission 2
// Use expressions inside `${}`
{
  const a = 10;
  const b = 20;

  console.log(`${a} + ${b} = ${a + b}`);
  // 10 + 20 = 30
  /*
    Explain why JavaScript expressions can be used inside `${}`
    - `${}` can contain JavaScript expressions that evaluate to a value
    - JavaScript evaluates the expression and inserts the result into the Template Literal
    - The result is converted to a string when neccessary
    - Statements such as `if` statements and `for` loops cannot be written directly inside `${}` because they do not evaluate to a value
  */
}

// Mission 3
// Use a conditional expression inside a Template Literal
{
  const isLoggedIn = true;
  const message = `User is ${isLoggedIn ? "logged in" : "logged out"}`;
  console.log(`message : ${message}`);
  // message : User is logged in
}

// Mission 4
{
  const profile = `
Name: JIHUN
Role: backend
Language: JavaScript
`;

  console.log(`profile : ${profile}`);
  /*
    profile : 
    Name: JIHUN
    Role: backend
    Language: JavaScript
  */
}

// Mission 5
// Use Array Destructuring
{
  const colors = ["red", "green", "blue"];
  const [firstColor, secondColor, thirdColor] = colors;
  console.log(`firstColor : ${firstColor}`);
  console.log(`secondColor : ${secondColor}`);
  console.log(`thirdColor : ${thirdColor}`);
  /*
    firstColor : red
    secondColor : green
    thirdColor : blue
  */
  /*
    Explain why Array Destructuring uses element order
    - An array is an ordered list of values indexed by contiguous integers(0, 1, 2, ...).
    - Arrays do not have named properties for their data elements; their only identifying characteristic is their position in the sequence.
    - Therefore, when unpacking an array, the JavaScript engine mapps values sequentially from 0 onwards
  */
}

// Mission 6
// Skip an array element
{
  const colors = ["red", "green", "blue"];
  const [firstColor, , thirdColor] = colors;
  console.log(`firstColor : ${firstColor}`);
  console.log(`thirdColor : ${thirdColor}`);
  /*
    firstColor : red
    thirdColor : blue
  */
}

// Mission 7
// Use Default values in Array Destructuring
{
  const colors = ["red"];
  const [firstColor, secondColor = "green"] = colors;
  console.log(`firstColor : ${firstColor}`);
  console.log(`secondColor : ${secondColor}`);
  /*
    firstColor : red
    secondColor : green
  */
  /*
    Explain when the default value is applied
    - The default value is applied when the corresponding array element is missing or `undefined`
    - The default value is not applied when the element is `null`
  */
}

// Mission 8
{
  let first = 10;
  let second = 20;
  console.log(`before swap - first = ${first} second = ${second}`);
  [second, first] = [first, second];
  console.log(`after swap - first = ${first} second = ${second}`);
  /*
  before swap - first = 10 second = 20
  after swap - first = 20 second = 10
  */
}

// Mission 9
// Use Object Destructuring
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };

  const { name, age, role } = user;

  console.log(`name: ${name}, age: ${age}, role: ${role}`);
  // userName: JIHUN, userAge: 29, userRole: backend
  /*
  Explain why Object Destructuring uses property names instead of property order
  - Object Destructuring matches values using property names
  - The variable `name` receives the value of the `name` property
  - Therefore, the order of the properties does not affect the result
  */
}

// Mission 10
// Rename variables with Object Destructuring
{
  const user = {
    name: "JIHUN",
    age: 29,
  };
  const { name: userName, age: userAge } = user;
  console.log(`userName: ${userName}, userAge : ${userAge}`);
  // userName: JIHUN, userAge : 29
  /*
    Explain whether variables named `name` and `age` are created
    - No, variables named `name` and `age` are not created
    - When you use the colon(`:`) syntax in object destructuring, the identifier on the left side (`name`) is only used as a matching key to find the property inside the object.
    - The identifier on the right side(`userName`) is the actual variable name that gets created in memory
  */
}

// Mission 11
// Use default values in Object Destructuring
{
  const user = {
    name: "JIHUN",
  };

  const { name, role = "guest" } = user;
  console.log(`name : ${name}, role : ${role}`);
  // name : JIHUN, role : guest
  /*
  Explain why the default value is used
  - JavaScript uses default values to transform defensive coding (writing heavy `if/else` checks to avoid crashes) into declarative coding (stating up-front what the fallback should be)
  - This results in software that is cleaner to write, easier to test, and significantly more resilient to runtime errors
  */
}

// Mission 12
// Rename a property and assign a default value
{
  const user = {
    name: "JIHUN",
  };
  const { name: userName, role: userRole = "guest" } = user;

  console.log(`userName=${userName}, userRole=${userRole}`);
}

// Mission 13
// Use Nested Object Destructuring
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

  console.log(`name = ${name}, role = ${role}`);
  // name = JIHUN, role = backend
  /*
  Explain whether a variable named `data` is created
  - The only variable declared in this variables are `response`, `name` and `role`
  - Trying to reference `data` directly (e.g., `console.log(data)`) would throw a `ReferenceError`
  */
}

// Mission 14
{
  const user = {
    name: "JIHUN",
    role: "backend",
  };
  const printUser = ({ name, role }) => {
    console.log(`Name: ${name}\nRole: ${role}`);
  };
  printUser(user);
  /*
    Name: JIHUN
    Role: backend
  */
  /*
  Explain how Parameter Destructuring works

  - The function receives an object as an argument
  - The object is destructured directly in the parameter position
  - The `name` and `role` properties become local variables inside the function
  */
}

// Mission 15
// Use default values in Parameter Destructuring
{
  const user = {
    name: "JIHUN",
  };
  function printUser({ name = "Unknown", role = "guest" } = {}) {
    console.log(`name = ${name}, role = ${role}`);
  }

  printUser(user);
  printUser();
  /*
    name = JIHUN, role = guest
    name = Unknown, role = guest
  */
  /*
  Explain why the function does not throw an error when called without an argument
  - The key reason `printUser()` works without throwing an error is the entire parameter's default value set at the end `= {}`
  */
}

// Mission 16
// Use Array Destructuring in function parameters
{
  function printCoordinates([x, y]) {
    console.log(`x: ${x}`);
    console.log(`y: ${y}`);
  }
  printCoordinates([10, 20]);
  /*
  x: 10
  y: 20
  */
}

// Mission 17
// Use Destructuring with `map()`
{
  const users = [
    { id: 1, name: "JIHUN", role: "backend" },
    { id: 2, name: "KIM", role: "frontend" },
  ];

  const names = users.map(({ name }) => name);
  console.log(names);
  // [ 'JIHUN', 'KIM' ]
}

// Mission 18
// Use Destructuring with `Object.entries()`
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "backend",
  };

  const userEntries = Object.entries(user);
  userEntries.forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
  /*
    name: JIHUN
    age: 29
    role: backend
  */
}

// Bonus Mission
{
  function UserCard({ name, role = "guest" }) {
    return `${name} - ${role}`;
  }

  console.log(
    UserCard({
      name: "JIHUN",
      role: "backend",
    }),
  );
  // JIHUN - backend
  /*
  Explain why React components frequently use Parameter Destructuring for props

  - It avoids repeatedly writing `props.`
  - It clearly shows which props the component expects
  - Default values can be assigned directly in the parameter
  - It makes component code shorter and easier to read
  */
}
