// =====================
// Practice - Array Methods
// =====================

// forEach()
{
  const numbers = [1, 2, 3];

  numbers.forEach((number) => {
    console.log("forEach number :", number);
  });
  /*
    forEach number : 1
    forEach number : 2
    forEach number : 3
  */
}

// map()
{
  const numbers = [1, 2, 3];

  const doubledNumbers = numbers.map((number) => {
    return number * 2;
  });
  console.log("doubledNumbers :", doubledNumbers); // [ 2, 4, 6 ]
}

// map() with implicit return
{
  const numbers = [1, 2, 3];
  const tripledNumbers = numbers.map((number) => number * 3);
  console.log("tripledNumbers :", tripledNumbers); // [ 3, 6, 9 ]
}

// filter()
{
  const numbers = [1, 2, 3, 4, 5, 6];
  const evenNumbers = numbers.filter((number) => number % 2 === 0);
  console.log("evenNumbers :", evenNumbers); // [ 2, 4, 6 ]
}

// filter() with condition
{
  const numbers = [1, 2, 3, 4, 5, 6];
  const greaterThanThreeNumbers = numbers.filter((number) => number > 3);
  console.log("greaterThanThreeNumbers :", greaterThanThreeNumbers); // [ 4, 5, 6 ]
}

// find()
{
  const users = [
    { id: 1, name: "JIHUN", role: "backend" },
    { id: 2, name: "KIM", role: "frontend" },
    { id: 3, name: "LEE", role: "backend" },
  ];

  const foundUser = users.find((user) => user.id === 2);

  console.log("foundUser :", foundUser);
  // { id: 2, name: 'KIM', role: 'frontend' }
}

// find() returns the first matching element
{
  const users = [
    { id: 1, name: "JIHUN", role: "backend" },
    { id: 2, name: "KIM", role: "frontend" },
    { id: 3, name: "LEE", role: "backend" },
  ];

  const foundBackendUser = users.find((user) => user.role === "backend");
  console.log("foundBackendUser :", foundBackendUser);
  // { id: 1, name: 'JIHUN', role: 'backend' }
}

// some()
{
  const numbers = [1, 3, 5, 8];
  const hasEvenNumber = numbers.some((number) => number % 2 === 0);
  console.log("hasEvenNumber :", hasEvenNumber); // true
}

// every()
{
  const numbers = [2, 4, 6, 8];
  const allEvenNumbers = numbers.every((number) => number % 2 === 0);
  console.log("allEvenNumbers :", allEvenNumbers); // true
}

// reduce()
{
  const numbers = [1, 2, 3, 4];
  const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  console.log("sum :", sum); // 10
}

// reduce() with implicit return
{
  const numbers = [1, 2, 3, 4];
  const sum = numbers.reduce((acc, cur) => acc + cur, 0);
  console.log("sum :", sum); // 10
}

// Practical Example - total price
{
  const products = [
    { id: 1, name: "Keyboard", price: 10000 },
    { id: 2, name: "Mouse", price: 5000 },
    { id: 3, name: "Monitor", price: 15000 },
  ];

  const totalPrice = products.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
  console.log("totalPrice :", totalPrice); // 30000
}

// Practical Example - filter backend users
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

// React-like Example
{
  const menuItems = ["Home", "About", "Contact"];
  const menuTexts = menuItems.map((menuItem) => `<li>${menuItem}</li>`);
  console.log("menuTexts :", menuTexts);
  // [ '<li>Home</li>', '<li>About</li>', '<li>Contact</li>' ]
}
