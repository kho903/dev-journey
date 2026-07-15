// =====================
// Practice - Spread Syntax and Rest Parameters
// =====================

// =====================
// Spread Syntax with Arrays
// =====================
{
  const numbers = [10, 20, 30];

  console.log("numbers :", numbers);
  console.log("spread numbers :", ...numbers);
  /*
    numbers : [ 10, 20, 30 ]
    spread numbers : 10 20 30
  */
}

// =====================
// Copying Arrays
// =====================
{
  const original = [10, 20, 30];
  const copied = [...original];

  console.log("original :", original);
  console.log("copied :", copied);

  console.log("original === copied :", original === copied);
  // original === copied : false
}

// Modify the copied array
{
  const original = [10, 20, 30];
  const copied = [...original];
  copied.push(40);

  console.log("original :", original);
  console.log("copied :", copied);
  /*
  original : [ 10, 20, 30 ]
  copied : [ 10, 20, 30, 40 ]
  */
}

// =====================
// Adding Elements while Copying Arrays
// =====================
{
  const numbers = [20, 30];

  const addedFirst = [10, ...numbers];
  const addedLast = [...numbers, 40];
  const addedBoth = [10, ...numbers, 40];

  console.log("addedFirst :", addedFirst);
  console.log("addedLast :", addedLast);
  console.log("addedBoth :", addedBoth);
  /*
    addedFirst : [ 10, 20, 30 ]
    addedLast : [ 20, 30, 40 ]
    addedBoth : [ 10, 20, 30, 40 ]
  */
}

// =====================
// Merging Arrays
// =====================
{
  const frontend = ["HTML", "CSS", "JavaScript"];
  const backend = ["Java", "Spring"];

  const skills = [...frontend, ...backend];

  console.log("skills :", skills);
  // skills : [ 'HTML', 'CSS', 'JavaScript', 'Java', 'Spring' ]
}

// Array merge order
{
  const first = [1, 2];
  const second = [3, 4];

  const firstThenSecond = [...first, ...second];
  const secondThenFirst = [...second, ...first];

  console.log("firstThenSecond :", firstThenSecond);
  console.log("secondThenFirst :", secondThenFirst);
  /*
    firstThenSecond : [ 1, 2, 3, 4 ]
    secondThenFirst : [ 3, 4, 1, 2 ]
  */
}

// =====================
// Spread Syntax in Function Calls
// =====================
{
  function add(a, b, c) {
    return a + b + c;
  }

  const numbers = [10, 20, 30];

  console.log("add result :", add(...numbers));
  // add result : 60
}

// =====================
// Spread Syntax with Math.max()
// =====================
{
  const numbers = [10, 50, 30];

  console.log("Math.max(numbers) :", Math.max(numbers));
  console.log("Math.max(...numbers) :", Math.max(...numbers));
  /*
  Math.max(numbers) : NaN
  Math.max(...numbers) : 50
  */
}

// =====================
// Spread Syntax with Strings
// =====================
{
  const word = "JavaScript";
  const letters = [...word];

  console.log("letters :", letters);
  /*
    letters : [
    'J', 'a', 'v', 'a',
    'S', 'c', 'r', 'i',
    'p', 't'
    ]
  */
}

// =====================
// Spread Syntax with Objects
// =====================
{
  const user = {
    name: "JIHUN",
    age: 29,
  };

  const copiedUser = {
    ...user,
  };

  console.log("user :", user);
  console.log("copiedUser :", copiedUser);
  /*
    user : { name: 'JIHUN', age: 29 }
    copiedUser : { name: 'JIHUN', age: 29 }
  */
  console.log("user === copiedUser :", user === copiedUser);
  // user === copiedUser : false
}

// =====================
// Adding Object Properties
// =====================
{
  const user = {
    name: "JIHUN",
    age: 29,
  };

  const updatedUser = {
    ...user,
    role: "backend",
  };

  console.log("user : ", user);
  // user :  { name: 'JIHUN', age: 29 }

  console.log("updatedUser :", updatedUser);
  // updatedUser : { name: 'JIHUN', age: 29, role: 'backend' }
}

// =====================
// Updating Object Properties
// =====================
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "guest",
  };

  const updatedUser = {
    ...user,
    role: "backend",
  };

  console.log("updatedUser :", updatedUser);
  // updatedUser : { name: 'JIHUN', age: 29, role: 'backend' }
}

// =====================
// Object Property Overwrite Order
// =====================

{
  const user = {
    name: "JIHUN",
    role: "guest",
  };

  const updatedAfterSpread = {
    ...user,
    role: "backend",
  };

  const updatedBeforeSpread = {
    role: "backend",
    ...user,
  };

  console.log("updatedAfterSpread :", updatedAfterSpread);
  // updatedAfterSpread : { name: 'JIHUN', role: 'backend' }

  console.log("updatedBeforeSpread :", updatedBeforeSpread);
  // updatedBeforeSpread : { role: 'guest', name: 'JIHUN' }
}

// =====================
// Merging Objects
// =====================
{
  const personalInfo = {
    name: "JIHUN",
    age: 29,
  };

  const jobInfo = {
    role: "backend",
    language: "Java",
  };

  const user = {
    ...personalInfo,
    ...jobInfo,
  };

  console.log("user :", user);
  // user : { name: 'JIHUN', age: 29, role: 'backend', language: 'Java' }
}

// Merge objects with duplicate properties
{
  const first = {
    name: "JIHUN",
    role: "guest",
  };

  const second = {
    role: "backend",
  };

  const result = {
    ...first,
    ...second,
  };

  console.log("result :", result);
  // result : { name: 'JIHUN', role: 'backend' }
}

// =====================
// Shallow Copy with Nested Objects
// =====================
{
  const original = {
    name: "JIHUN",
    address: {
      city: "Seoul",
    },
  };

  const copied = {
    ...original,
  };

  console.log("original === copied :", original === copied);
  // original === copied : false

  console.log(
    "original.address === copied.address :",
    original.address === copied.address,
  );
  // original.address === copied.address : true

  copied.address.city = "Busan";

  console.log("original.address.city :", original.address.city);
  console.log("copied.address.city :", copied.address.city);
  // original.address.city : Busan
  // copied.address.city : Busan
}

// =====================
// Copying Nested Objects
// =====================
{
  const original = {
    name: "JIHUN",
    address: {
      city: "Seoul",
      country: "Korea",
    },
  };

  const copied = {
    ...original,
    address: {
      ...original.address,
    },
  };

  copied.address.city = "Busan";

  console.log("original.address.city :", original.address.city);
  // original.address.city : Seoul

  console.log("copied.address.city :", copied.address.city);
  // copied.address.city : Busan

  console.log(
    "original.address === copied.address :",
    original.address === copied.address,
  );
  // original.address === copied.address : false
}

// =====================
// Shallow Copy with Nested Arrays
// =====================
{
  const original = [
    {
      id: 1,
      name: "JIHUN",
    },
  ];

  const copied = [...original];
  console.log("original === copied :", original === copied);
  // original === copied : false

  console.log("original[0] === copied[0] :", original[0] === copied[0]);
  // original[0] === copied[0] : true

  copied[0].name = "KIM";

  console.log("original[0].name :", original[0].name);
  // original[0].name : KIM
}

// Copy each object inside an array
{
  const original = [
    {
      id: 1,
      name: "JIHUN",
    },
    {
      id: 2,
      name: "KIM",
    },
  ];

  const copied = original.map((user) => ({
    ...user,
  }));

  copied[0].name = "LEE";

  console.log("original[0].name :", original[0].name);
  console.log("copied[0].name :", copied[0].name);
  // original[0].name : JIHUN
  // copied[0].name : LEE
}

// =====================
// Rest Parameters
// =====================
{
  function printNumbers(...numbers) {
    console.log("numbers :", numbers);
  }

  printNumbers(10, 20, 30);
  // numbers : [ 10, 20, 30 ]
}

// =====================
// Rest Parameters with reduce()
// =====================
{
  function sum(...numbers) {
    return numbers.reduce((total, number) => total + number, 0);
  }

  console.log("sum(10, 20) :", sum(10, 20));
  console.log("sum(10, 20, 30) :", sum(10, 20, 30));
  console.log("sum(10, 20, 30, 40) :", sum(10, 20, 30, 40));
  /*
  sum(10, 20) : 30
  sum(10, 20, 30) : 60
  sum(10, 20, 30, 40) : 100
  */
}

// =====================
// Rest Parameters with filter()
// =====================
{
  function getEvenNumbers(...numbers) {
    return numbers.filter((number) => number % 2 === 0);
  }

  const evenNumbers = getEvenNumbers(1, 2, 3, 4, 5, 6);

  console.log("evenNumbers :", evenNumbers);
  // evenNumbers : [ 2, 4, 6 ]
}

// =====================
// Rest Parameters with filter()
// =====================
{
  function getEvenNumbers(...numbers) {
    return numbers.filter((number) => number % 2 === 0);
  }

  const evenNumbers = getEvenNumbers(1, 2, 3, 4, 5, 6);

  console.log("evenNumbers :", evenNumbers);
  // evenNumbers : [ 2, 4, 6 ]
}

// =====================
// Regular Parameters with Rest Parameters
// =====================
{
  function printUser(name, ...skills) {
    console.log(`Name : ${name}`);
    console.log("Skills :", skills);
  }

  printUser("JIHUN", "Java", "Spring", "JavaScript");
  /*
    Name : JIHUN
    Skills : [ 'Java', 'Spring', 'JavaScript' ]
  */
}

// =====================
// Rest Parameters vs arguments
// =====================
{
  function printArguments() {
    console.log("arguments :", arguments);
    console.log("Array.isArray(arguments) :", Array.isArray(arguments));
  }

  printArguments(10, 20, 30);
  /*
    arguments : [Arguments] { '0': 10, '1': 20, '2': 30 }
    Array.isArray(arguments) : false
  */
}

{
  function printNumbers(...numbers) {
    console.log("numbers :", numbers);
    console.log("Array.isArray(numbers) :", Array.isArray(numbers));
  }

  printNumbers(10, 20, 30);
  /*
  numbers : [ 10, 20, 30 ]
  Array.isArray(numbers) : true
  */
}

// Rest Parameters in an Arrow Function
{
  const doubleNumbers = (...numbers) => {
    return numbers.map((number) => number * 2);
  };

  console.log("doubleNumbers :", doubleNumbers(10, 20, 30));
  // doubleNumbers : [ 20, 40, 60 ]
}

// =====================
// Rest Syntax in Array Destructuring
// =====================
{
  const numbers = [10, 20, 30, 40, 50];

  const [first, second, ...restNumbers] = numbers;

  console.log("first :", first);
  console.log("second :", second);
  console.log("restNumbers :", restNumbers);
  /*
    first : 10
    second : 20
    restNumbers : [ 30, 40, 50 ]
  */
}

// =====================
// Rest Syntax in Object Destructuring
// =====================
{
  const user = {
    id: 1,
    name: "JIHUN",
    age: 29,
    role: "backend",
  };

  const { id, ...userInfo } = user;

  console.log("id :", id);
  console.log("userInfo :", userInfo);
  /*
  id : 1
  userInfo : { name: 'JIHUN', age: 29, role: 'backend' }
   */
}

// =====================
// Excluding an Object Property
// =====================
{
  const user = {
    id: 1,
    name: "JIHUN",
    password: "1234",
    role: "backend",
  };

  const { password, ...safeUser } = user;

  console.log("password :", password);
  console.log("safeUser :", safeUser);
  console.log("original user :", user);
  /*
    password : 1234
    safeUser : { id: 1, name: 'JIHUN', role: 'backend' }
    original user : { id: 1, name: 'JIHUN', password: '1234', role: 'backend' }
  */
}

// =====================
// Spread and Rest Together
// =====================
{
  function addBonus(bonus, ...scores) {
    const updatedScores = scores.map((score) => score + bonus);

    return [...updatedScores];
  }

  const result = addBonus(5, 70, 80, 90);
  console.log("result :", result);
  // result : [ 75, 85, 95 ]
}

// =====================
// React-like Array Update
// =====================
{
  const users = [
    { id: 1, name: "JIHUN" },
    { id: 2, name: "KIM" },
  ];

  const newUser = {
    id: 3,
    name: "LEE",
  };

  const updatedUsers = [...users, newUser];
  console.log("updatedUsers :", updatedUsers);
  /*
  updatedUsers : [
    { id: 1, name: 'JIHUN' },
    { id: 2, name: 'KIM' },
    { id: 3, name: 'LEE' }
  ]
  */
}

// =====================
// React-like Object Update
// =====================
{
  const user = {
    name: "JIHUN",
    age: 29,
    role: "guest",
  };

  const updatedUser = {
    ...user,
    role: "backend",
  };

  console.log("updatedUser :", updatedUser);
}

// =====================
// React-like Nested Object Update
// =====================
{
  const user = {
    name: "JIHUN",
    address: {
      city: "Seoul",
      country: "Korea",
    },
  };

  const updatedUser = {
    ...user,
    address: {
      ...user.address,
      city: "Busan",
    },
  };

  console.log("original user :", user);
  console.log("updatedUser :", updatedUser);
  /*
  original user : { name: 'JIHUN', address: { city: 'Seoul', country: 'Korea' } }
  updatedUser : { name: 'JIHUN', address: { city: 'Busan', country: 'Korea' } }
  */
}

// =====================
// Updating an Object inside an Array
// =====================
{
  const users = [
    { id: 1, name: "JIHUN", role: "guest" },
    { id: 2, name: "KIM", role: "frontend" },
  ];

  const updatedUsers = users.map((user) =>
    user.id === 1
      ? {
          ...user,
          role: "backend",
        }
      : user,
  );
  console.log("updatedUsers :", updatedUsers);
}

// =====================
// API-like Example
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

  const { status, ...responseBody } = response;

  console.log("status :", status);
  // status : 200

  console.log("responseBody :", responseBody);
  // responseBody : { message: 'success', data: { id: 1, name: 'JIHUN', role: 'backend' } }
}
