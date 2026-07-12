// Mission 1
// Use `forEach()`
{
  const numbers = [1, 2, 3, 4, 5];
  numbers.forEach((number) => console.log(number));
  /*
   1
   2
   3
   4
   5
  */
  /*
    Reason
    - `forEach()` executes a callback function for each element in an array.
    - It is used when we want to perform an action for each element
    - `forEach()` does not create a new array
    - The return value of `forEach()` is `undefined`
  */
}

// Mission 2
// Use `map()`
{
  const numbers = [1, 2, 3, 4, 5];
  const doubledNumbers = numbers.map((number) => number * 2);
  console.log("doubledNumbers :", doubledNumbers); // [ 2, 4, 6, 8, 10 ]
  /*
    Reason
    - `map()` converts each element and returns a new array
    - The original array is not changed
  */
}

// Mission 3
// Use `filter()`
{
  const numbers = [1, 2, 3, 4, 5, 6];
  const evenNumbers = numbers.filter((number) => number % 2 === 0);
  console.log("evenNumbers :", evenNumbers); // [ 2, 4, 6 ]
  /*
    Reason
    - `filter()` returns a new array by gathering only the elements that satisfy the condition
    - In this code, only even numbers remain
  */
}

// Mission 4
// Use `find()`
{
  const users = [
    { id: 1, name: "JIHUN", role: "backend" },
    { id: 2, name: "KIM", role: "frontend" },
    { id: 3, name: "LEE", role: "backend" },
  ];
  const foundUser = users.find((user) => user.id === 2);
  console.log("foundUser :", foundUser);
  // foundUser : { id: 2, name: 'KIM', role: 'frontend' }
  /*
    What happens if no matching element is found
    - `find()` returns `undefined`
  */
  const undefinedExample = users.find((user) => user.id === 4);
  console.log("undefinedExample :", undefinedExample); // undefined
}

// Mission 5
// Use `some()`
{
  const numbers = [1, 3, 5, 8];
  const hasEvenNumber = numbers.some((number) => number % 2 === 0);
  console.log("hasEvenNumber :", hasEvenNumber); // true
  /*
    Reason
    - 'some()' checks if at least one element in the array satisfies the condition
    - The numbers array has 8, which is an even number
    - So the result is true
  */
}

// Mission 6
// Use `every()`
{
  const numbers = [2, 4, 6, 8];
  const allEvenNumbers = numbers.every((number) => number % 2 === 0);
  console.log("allEvenNumbers :", allEvenNumbers); // true
  /*
    Reason
    - `every()` returns true only if the callback function returns a truthy value for every array element.
    - The numbers array has only even number
    - So it returns true
  */
}

// Mission 7
// Use `reduce()`
{
  const numbers = [1, 2, 3, 4];
  const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  console.log("sum :", sum); // 10
  /*
    Explain the role of `accumulator`, `currentValue`, and initial value

    - accumulator   -> accumulated value
    - currentValue  -> current value
    - 0             -> initial value
  */
}

// Mission 8
{
  const products = [
    { id: 1, name: "Keyboard", price: 10000 },
    { id: 2, name: "Mouse", price: 5000 },
    { id: 3, name: "Monitor", price: 150000 },
  ];

  const totalPrice = products.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);
  console.log("totalPrice :", totalPrice); // 165000
}

// Mission 9
// Filter backend users
{
  const users = [
    { id: 1, name: "JIHUN", role: "backend" },
    { id: 2, name: "KIM", role: "frontend" },
    { id: 3, name: "LEE", role: "backend" },
  ];
  const backendUsers = users.filter((user) => user.role === "backend");
  console.log("backendUsers :", backendUsers);
  /*
    backendUsers : [
        { id: 1, name: 'JIHUN', role: 'backend' },
        { id: 3, name: 'LEE', role: 'backend' }
    ]
  */
}

// Bonus Mission
// Create a React-like list rendering example
{
  const menuItems = ["Home", "About", "Contact"];
  const menuTexts = menuItems.map((menuItem) => `<li>${menuItem}</li>`);
  console.log("menuTexts :", menuTexts);
  // [ '<li>Home</li>', '<li>About</li>', '<li>Contact</li>' ]
  /*
    Explain why React often uses `map()` for list rendering

    - `map()` returns a new array
    - React can render arrays of elements
    - It fits declarative programming
    - We can describe what the UI should look like based on data
    - This is useful when rendering lists from arrays
  */
}
