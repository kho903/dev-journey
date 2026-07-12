// =====================
// Mission - Arrow Function and this
// =====================

// Mission 1
// Convert a Function Expression to an Arrow Function
const addRegular = function (a, b) {
  return a + b;
};
console.log("addRegular:", addRegular(10, 20)); // 30
const addArrow = (a, b) => {
  return a + b;
};
console.log("addArrow:", addArrow(10, 20)); // 30

// Mission 2
// Use Implicit Return
const multiply = (a, b) => a * b;
console.log("multiply using Implicit Return:", multiply(10, 20)); // 200

// Mission 3
// Use One Parameter Arrow Function
// prettier-ignore
const arrowGreet = name => console.log("Hello,", name);
arrowGreet("JIHUN"); // Hello, JIHUN

// Mission 4
// Return an Object from an Arrow Function
// const createUser = (name, age) => ({ name: name, age: age });
const createUser = (name, age) => ({ name, age }); // gpt feedback
console.log(createUser("JIHUN", 29)); // { name: 'JIHUN', age: 29 }

// Mission 5
// Compare Regular Function `this` and Arrow Function `this`.
const user1 = {
  name: "JIHUN",
  printName: function () {
    console.log("user1 this.name:", this.name);
  },
};
user1.printName(); // JIHUN

const user2 = {
  name: "JIHUN",
  printName: () => {
    console.log("user2 this.name:", this.name);
  },
};
user2.printName(); // does not print "JIHUN"

// MISSION 6
const numbers = [1, 2, 3];
// my solution - this is using map like forEach
/*
const doubledNumbers = [];
numbers.map((element) => {
  doubledNumbers.push(element * 2);
});
*/
// gpt solution
const doubledNumbers = numbers.map((element) => element * 2);
console.log("doubledNumbers:", doubledNumbers); // [2, 4, 6]

// Bonus Mission
// Explain why Arrow Functions are often used in React
/*
  Reason
  - Arrow Functions are often used in React because they are short and readable
  - They are useful for event handlers and callback functions
  - They can also use values from the outer scope naturally
*/
const handleClick = () => {
  console.log("clicked");
};
handleClick(); // clicked
