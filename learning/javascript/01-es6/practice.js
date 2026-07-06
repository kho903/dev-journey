// let
let count = 0;
console.log("count : ", count);

count = 10;
console.log("count : ", count);

// =====================

// const
const PI = 3.14;
console.log("PI", PI);
// TypeError
// PI = 3.14159;

// Object
const user = {
  name: "JIHUN",
};
console.log(user); // { name: 'JIHUN' }

user.name = "KIM";

console.log(user); // { name: 'KIM' }
// TypeError
// user = {};

// =====================
// Array
const numbers = [1, 2, 3];
numbers.push(4);
console.log(numbers);

// =====================
// Block Scope
if (true) {
  let a = 10;
  const b = 20;

  console.log("a : ", a);
  console.log("b : ", b);
}

// ReferenceError
// console.log("a : ", a);
// console.log("b : ", b);
