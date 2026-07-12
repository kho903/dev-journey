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
