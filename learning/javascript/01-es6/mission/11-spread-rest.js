// Mission 1
// Expand an array using Spread Syntax
{
  const numbers = [10, 20, 30];
  console.log(...numbers);
  // 10 20 30
  console.log(numbers);
  // [ 10, 20, 30 ]
  /*
    Explain the difference between `console.log(numbers)` and `console.log(...numbers)`
    - `console.log(numbers)` passes the entire array as one argument
    - `console.log(...numbers)` spreads the array elements and passes them as separate arguments
  */
}

// Mission 2
// Copy an array using Spread Syntax
{
  const original = [10, 20, 30];
  const copied = [...original];
  console.log("original :", original);
  console.log("copied :", copied);
  console.log("original === copied:", original === copied);
  /*
  original : [ 10, 20, 30 ]
  copied : [ 10, 20, 30 ]
  original === copied: false
  */
  /*
  Explain why the comparison result is `false`

  - Arrays are reference values in JavaScript
  - `copied` is a new array created in a different memory location
  - Therefore, `original` and `copied` have different references
  */
}

// Mission 3
// Modify a copied array
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

// Mission 4
// Add elements while copying an array
{
  const numbers = [20, 30];
  const result = [10, ...numbers, 40];
  console.log("numbers :", numbers);
  console.log("result :", result);
  /*
    numbers : [ 20, 30 ]
    result : [ 10, 20, 30, 40 ]
  */
}

// Mission 5
// Merge two arrays
{
  const frontend = ["HTML", "CSS", "JavaScript"];
  const backend = ["Java", "Spring"];
  const skills = [...frontend, ...backend];
  console.log("skills :", skills);
  // skills : [ 'HTML', 'CSS', 'JavaScript', 'Java', 'Spring' ]
}

// Mission 6
// Pass array elements as function arguments
{
  function add(a, b, c) {
    return a + b + c;
  }
  const numbers = [10, 20, 30];
  console.log("add(...numbers) :", add(...numbers));
  // add(...numbers) : 60
}

// Mission 7
{
  const numbers = [10, 50, 30, 80];

  const maxNumber = Math.max(...numbers);
  console.log("maxNumber :", maxNumber);
  // maxNumber : 80

  const maxNumber2 = Math.max(numbers);
  console.log("maxNumber2 :", maxNumber2);
  // maxNumber2 : NaN
  /*
  Explain why `Math.max(numbers)` returns `NaN`
  - `Math.max()` expects numbers as separate arguments
  - `Math.max(numbers)` passes the entire array as one argument
  - JavaScript tries to convert the array into a number
  - The multi-element array cannot be converted into a valid number, so the result is `NaN`
  */
}

// Mission 8
// Expand a string into an array
{
  const word = "JavaScript";
  const letters = [...word];

  console.log("letters :", letters);
  // letters : ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]
}

// Mission 9
// Copy and update an Object
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
  console.log("user :", user);
  console.log("updatedUser :", updatedUser);
  /*
  user : { name: 'JIHUN', age: 29, role: 'guest' }
  updatedUser : { name: 'JIHUN', age: 29, role: 'backend' }
  */
}

// Mission 10
// Practice object property overwrite order
{
  const user = {
    name: "JIHUN",
    role: "guest",
  };

  const result1 = {
    ...user,
    role: "backend",
  };

  const result2 = {
    role: "backend",
    ...user,
  };

  console.log("result1.role :", result1.role);
  console.log("result2.role :", result2.role);
  // result1.role : backend
  // result2.role : guest
  /*
  Explain why the results are different

  - When objects contain the same property name, the value written later overwrites the earlier value
  - In `result1`, `role: "backend"` is written after `...user`
  - In `result2`, `...user` is written after `role : "backend"`
  */
}

// Mission 11
// Merge multiple objects
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
  /*
    user : { name: 'JIHUN', age: 29, role: 'backend', language: 'Java' }
  */
}

// Mission 12
// Demonstrate Shallow Copy
{
  const original = {
    address: {
      city: "Seoul",
    },
  };

  const copied = {
    ...original,
  };

  console.log("original === copied :", original === copied);

  console.log(
    "original.address === copied.address :",
    original.address === copied.address,
  );

  copied.address.city = "Busan";

  console.log("original.address.city :", original.address.city);
  console.log("copied.address.city :", copied.address.city);

  /*
    original === copied : false
    original.address === copied.address : true
    original.address.city : Busan
    copied.address.city : Busan
  */
  /* 
  Explain why the original object is affected

  - Spread Syntax creates a new outer object
  - However, the nested `address` object is not copied independently
  - `original.address` and `copied.address` reference the same object
  - Therefore, modifying `copied.address.city` also affects `original`
  */
}

// Mission 13
// Copy a nested object
{
  const original = {
    name: "JIHUN",
    age: 29,
    address: {
      city: "Seoul",
      country: "KOREA",
      street: "Dongdaemun",
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
  console.log("copied.address.city :", copied.address.city);
  console.log(
    "original.address === copied.address :",
    original.address === copied.address,
  );
  /*
  original.address.city : Seoul
  copied.address.city : Busan
  original.address === copied.address : false
  */
}

// Mission 14
// Collect multiple arguments using Rest Parameters
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

// Mission 15
// Use regular parameters with Rest Parameters
{
  function printUser(name, ...skills) {
    console.log(`Name: ${name}`);
    console.log(`Skills: ${skills.join(",")}`);
  }

  printUser("JIHUN", "Java", "Spring", "JavaScript");
  /*
    Name: JIHUN
    Skills: Java,Spring,JavaScript
  */
  /*
    Explain why the Rest Parameter must be the final parameter

    - A Rest Parameter collects all remaining arguments
    - If another parameter followed it, JavaScript could not determine
      which remaining value should be assigned to that parameter
    - Therefore, a Rest Parameter must be the final parameter
  */
}

// Mission 16
// Use Rest Syntax in Array Destructuring
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
  /*
  Explain why Rest Syntax must be written last
  - Because the rest syntax collects the remaining elements into a single array.
 */
}

// Mission 17
// Use Rest Syntax in Object Destructuring
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
  console.log("typeof userInfo :", typeof userInfo);
  console.log("Array.isArray(userInfo) :", Array.isArray(userInfo));
  /*  
  id : 1
  userInfo : { name: 'JIHUN', age: 29, role: 'backend' }
  typeof userInfo : object
  Array.isArray(userInfo) : false
  */
}

// Mission 18
// Exclude a property from a new object
{
  const user = {
    id: 1,
    name: "JIHUN",
    password: "1234",
    role: "backend",
  };
  const { password, ...safeUser } = user;
  console.log("safeUser :", safeUser);
  console.log("user :", user);
  /*
  safeUser : { id: 1, name: 'JIHUN', role: 'backend' }
  user : { id: 1, name: 'JIHUN', password: '1234', role: 'backend' }
  */
  /*
  Explain whether this alone is enough to protect sensitive data in an API
  - No this alone is not enough
  - The original `user` object still contains the password
  - The password may still be exposed through logs, error messages, or another response created by mistake
  - Sensitive data should be excluded on the server before the API response is created
  - A dedicated response DTO should contain only safe properties
  */
}

// Mission 19
// Update a nested object in a React-like way
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
  console.log("original city:", user.address.city);
  console.log("updated city:", updatedUser.address.city);
  /*
  original city: Seoul
  updated city: Busan
  */
}

// Mission 20
// Update one object inside an array
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

  console.log("users :", users);
  console.log("updatedUsers :", updatedUsers);
  /*
  users : [
    { id: 1, name: 'JIHUN', role: 'guest' },
    { id: 2, name: 'KIM', role: 'frontend' }
  ]
  updatedUsers : [
    { id: 1, name: 'JIHUN', role: 'backend' },
    { id: 2, name: 'KIM', role: 'frontend' }
  ]
  */
}

// Bonus Mission
// Use Spread Syntax and Rest Parameters together
{
  function addBonus(bonus, ...scores) {
    const updatedScores = scores.map((score) => score + bonus);
    return [...updatedScores];
  }
  console.log(addBonus(5, 70, 80, 90));
  // [ 75, 85, 95 ]
  /*
  Explain which `...` is Rest and which operation creates the new array
  - `...scores` is a Rest Parameter that collects the remaining arguments
  - `...updatedScores` is Spread Syntax that expands the array elements
    into a new array
  */
}
