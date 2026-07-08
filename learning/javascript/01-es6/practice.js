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

// =====================
// Scope and Lexical Scope
// =====================

// Global Scope
const globalValue = "global";

function printGlobalValue() {
  console.log("globalValue : ", globalValue);
}

printGlobalValue(); // global

// =====================
// Function Scope
// =====================

function testFunctionScope() {
  var functionValue = "function scope";
  console.log("functionValue inside function : ", functionValue);
}

testFunctionScope(); // function scope

// ReferenceError: functionValue is not defined
// console.log("functionValue outside function : ", functionValue);

// =====================
// Block Scope
// =====================

if (true) {
  let blockLet = "block let";
  const blockConst = "block const";

  console.log("blockLet inside block : ", blockLet);
  console.log("blockConst inside block : ", blockConst);
}

// ReferenceError: blockLet is not defined
// console.log("blockLet outside block : ", blockLet);
// ReferenceError: blockConst is not defined
// console.log("blockConst outside block : ", blockConst);

// =====================
// Scope Chain
// =====================

const globalName = "JIHUN";

function outer() {
  const outerValue = "outer";

  function inner() {
    const innerValue = "inner";
    console.log("innerValue : ", innerValue);
    console.log("outerValue : ", outerValue);
    console.log("globalName : ", globalName);
  }

  inner();
}
outer();
/*
  innerValue :  inner
  outerValue :  outer
  globalName :  JIHUN
 */
/*
  Scope Chain
  inner Scope -> outer Scope -> Global Scope
*/

// =====================
// Lexical Scope
// =====================
const lexicalValue = "global";

function lexicalOuter() {
  const lexicalValue = "outer";

  function lexicalInner() {
    console.log("lexicalValue : ", lexicalValue);
  }

  lexicalInner();
}
lexicalOuter(); // outer

// =====================
// Function Declaration and Function Expression
// =====================

// Function Declaration
function sayHello() {
  console.log("Hello");
}

sayHello(); // Hello

// =====================
// Parameters and Arguments
// =====================
function greet(name) {
  console.log("Hello, " + name);
}

greet("JIHUN"); // Hello, JIHUN

// =====================
// Return
// =====================
function add(a, b) {
  return a + b;
}

const addResult = add(10, 20);

console.log("addResult : ", addResult); // 30

// return stops function execution
function testReturn() {
  return "finished";

  // This line will not run
  console.log("This will not run");
}
console.log("testReturn : ", testReturn()); // finished

// =====================
// Function Expression
// =====================
const sayHi = function () {
  console.log("Hi");
};

sayHi(); // Hi

// =====================
// Function Hoisting
// =====================
hoistedFunction();

function hoistedFunction() {
  console.log("Function Declaration is hoisted");
}

// Function Expression cannot be called before declaration
// ReferenceError: Cannot access 'notHoistedFunction' before initialization
// notHoistedFunction();
const notHoistedFunction = function () {
  console.log("Function Expression cannot be called before initialization");
};
notHoistedFunction();
