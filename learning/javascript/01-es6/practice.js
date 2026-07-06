// let
let count = 0;
console.log("count : ", count);

count = 10;
console.log("count : ", count);

// =====================

// const
const PI = 3.14;
console.log("PI : ", PI);
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

// =====================
// var
// =====================

// Re-declaration
var userName = "JIHUN";
var userName = "KIM";

console.log("userName : ", userName); // KIM

// Reassignment
var score = 10;
console.log("score : ", score);

score = 20;
console.log("score after reassignment : ", score);

// Block Scope
// var does not have Block Scope
if (true) {
  var message = "declare message in if block";
}
console.log("message : ", message);

// Function Scope
// var has Function Scope
function testVarScope() {
  var functionScopedValue = 100;
  console.log("inside function : ", functionScopedValue);
}

testVarScope();

// ReferenceError
// functionScopedValue can only be accessed inside testVarScope()
// console.log("outside function : ", functionScopedValue);
