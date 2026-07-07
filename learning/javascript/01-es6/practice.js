// let
let count = 0;
console.log("count : ", count);

count = 10;
console.log("count : ", count);

// =====================

// const
const PI = 3.14;
console.log("PI :", PI);
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

// =====================
// Hoisting and TDZ
// =====================

// var hoisting
console.log("hoistedVar : ", hoistedVar); // undefined
var hoistedVar = "JIHUN";
console.log("hoistedVar after declaration : ", hoistedVar); // JIHUN

// =====================
// let Hoisting and TDZ
// =====================

// ReferenceError: Cannot access 'hoistedLet' before initialization
// console.log("hoistedLet:", hoistedLet);

let hoistedLet = 29;
console.log("hoistedLet : ", hoistedLet);

// =====================
// const Hoisting and TDZ
// =====================

// ReferenceError: Cannot access 'hoistedConst' before initialization
// console.log("hoistedConst", hoistedConst);
const hoistedConst = 3.14;
console.log("hoistedConst : ", hoistedConst);

// =====================
// TDZ in Block Scope
// =====================
{
  // TDZ start
  // ReferenceError: Cannot access 'value' before initialization
  // console.log("value : ", value);

  let value = 10;
  console.log("value : ", value);
}

// =====================
// Difference between var and let
// =====================

console.log("varNumber : ", varNumber); // undefined
var varNumber = 100;

// ReferenceError
// console.log("letNumber : ", letNumber);
let letNumber = 200;

console.log("varNumber after declaration : ", varNumber);
console.log("letNumber after declaration : ", letNumber);
