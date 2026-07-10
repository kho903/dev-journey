// let, const
// Mission 1
let count = 0;
console.log("count : ", count);
count += 5;
console.log("count after + 5 : ", count);

// Mission 2
const PI = 3.14;
console.log("PI : ", PI);
// TypeError: Assignment to constant variable.
// PI = 3.14159;

// Mission 3
const user = {
  name: "JIHUN",
  age: 29,
};
console.log({ user });

user.name = "KIM";
console.log("====== Update user.name =====");
console.log({ user });

console.log("====== Add user.skill =====");
user.skill = "Java";
console.log({ user });

// Mission 4
const fruits = ["Apple", "Banana"];
console.log({ fruits });
fruits.push("Orange");
console.log("====== After Push Orange =====");
console.log({ fruits });
console.log("Array Length : ", fruits.length);

// Mission 5

if (true) {
  let a = 10;
}
// ReferenceError: a is not defined
// console.log("a : ", a);
// Reason :
// 'a' is block-scoped, so it cannot be accessed outside the if block

// =====================
// Mission - var
// =====================

// Mission 1
// var can be re-declared
var userName = "JIHUN";
var userName = "KIM";
console.log("userName : ", userName);

// Mission 2
// var can be reassigned
var score = 10;
console.log("score : ", score);

score = 20;
console.log("score after reassignment : ", score);

// Mission 3
// var does not have Block Scope
if (true) {
  var message = "Hello var";
}
console.log("message : ", message); // Accessible outside the if block

// Mission 4
// var has Function Scope
function testVarScope() {
  var value = 100;
  console.log("value in testVarScope() : ", value);
}

testVarScope();

// ReferenceError: value is not defined
// console.log("value (outside of testVarScope()): ", value);

// Mission 5
// Compare var and let
if (true) {
  var a = 10;
  let b = 20;
  console.log("a (inside) :", a);
  console.log("b (inside) :", b);
}
console.log("a (outside) :", a); // Accessible because var does not have Block Scope
// ReferenceError: b is not defined
// console.log("b (outside) :", b);

// =====================
// Mission - Hoisting and TDZ
// =====================

// Mission 1
console.log("var before declaration : ", hoistedName); // undefined
var hoistedName = "JIHUN";
console.log("var after declaration : ", hoistedName); // JIHUN
/*
  Reason
  - `var` declarations are hoisted and initialized with `undefined`.
  - So accessing a `var` variable before declaration does not cause an error.
  - Instead, it prints `undefined`.
*/

// Mission 2
// let Hoisting and TDZ

// ReferenceError: Cannot access 'hoistedAge' before initialization
// console.log("let before declaration : ", hoistedAge);
let hoistedAge = 29;
console.log("let after declaration : ", hoistedAge);
/*
  Reason
  - `let` declarations are also hoisted.
  - but, they are not initialized with `undefined`.
  - Before the declaration line, the variable is in the TDZ.
  - So accessing it before declaration causes a ReferenceError.
*/

// Mission 3
// const Hoisting and TDZ

// ReferenceError: Cannot access 'hoistedPI' before initialization
// console.log("const before declaration : ", hoistedPI);
const hoistedPI = 3.14;
console.log("const after declaration : ", hoistedPI);

/*
  Reason
  - `const` declarations are also hoisted.
  - But, they are not initialized before the declaration line like `let`.
  - So accessing a `const` variable before declaration causes a ReferenceError.
  - `const` must be initialized when it is declared.
*/

// Mission 4
{
  // TDZ start
  // ReferenceError: Cannot access 'variableLet' before initialization
  // console.log("access let variable before declaration : ", variableLet);
  let variableLet = "let"; // TDZ end
  console.log("access let variable after declaration : ", variableLet);
}
/*
  Reason
  - The TDZ starts at the beginning of the block.
  - The TDZ ends when the `let` declaration is executed.
  - Before the declaration line, `variableLet` exists in the scope,
  - but, it cannot be accessed yet.
*/

// Mission 5
// Compare var and let before declaration
console.log("varNumber before declaration : ", hoistedNumber); // undefined

// ReferenceError: Cannot access 'hoistedLetNumber' before initialization
// console.log("letNumber before declaration : ", hoistedLetNumber);
var hoistedNumber = 100;
let hoistedLetNumber = 200;

console.log("varNumber after declaration:", hoistedNumber); // 100
console.log("letNumber after declaration:", hoistedLetNumber); // 200

/*
  Reason 
  - `var` is hoisted and initialized with `undefined`.
  - So it can be accessed before declaration.

  - `let` is also hoisted, but it stays in the TDZ until the declaration line.
  - So it can't be accessed before declaration.
*/

// =====================
// Mission - Scope and Lexical Scope
// =====================

// Mission 1
// Verify Global Scope
const globalMessage = "Global Message";

function printGlobalMessage() {
  console.log("globalMessage in printGlobalMessage() : ", globalMessage);
}
printGlobalMessage(); // Global Message
/*
  Reason
  - `globalMessage` is declared in global Scope
  - so `printGlobalMessage()` can access `globalMessage`
*/

// Mission 2
// Verify Function Scope
function testFunctionScope() {
  var functionMessage = "function scope";
  console.log("functionMessage in testFunctionScope() : ", functionMessage);
}
testFunctionScope();
// ReferenceError: functionMessage is not defined
// console.log(
//   "functionMessage outside of testFunctionScope() : ",
//   functionMessage,
// );
/*
  Reason
  - `functionMessage` is declared in `testFunctionScope()`;
  - It has function Scope
  - so we can't access outside of `testFunctionScope()` function
*/

// Mission 3
if (true) {
  let blockLet = "block let";
  const blockConst = "block const";
  console.log("blockLet in if block : ", blockLet); // block let
  console.log("blockConst in if block : ", blockConst); // block const
}

// ReferenceError: blockLet is not defined
// console.log("blockLet out of if block : ", blockLet);
// ReferenceError: blockConst is not defined
// console.log("blockConst out of if block : ", blockConst);

/*
  Reason
  - `blockLet` and `blockConst` are declared inside the if block
  - They have block scope
  - So we can't access them outside of the if block
*/

// Mission 4
// Verify Scope Chain
const globalName = "JIHUN";
function outer() {
  const outerValue = "outer";
  function inner() {
    const innerValue = "inner";
    console.log("globalName : ", globalName);
    console.log("outerValue : ", outerValue);
    console.log("innerValue : ", innerValue);
  }

  inner();
}
outer();

/*
  - JavaScript searches for variables from the current scope
  - If the variable is not found, it searches the outer scope
  - `inner()` can access `innerValue`, `outerValue`, and `globalName` through the Scope Chain
*/

// Mission 5
// Verify Lexical Scope.
const value = "global";
function lexicalOuter() {
  const value = "outer";

  function lexicalInner() {
    console.log("value : ", value);
  }

  lexicalInner();
}

lexicalOuter();

/*
  why `"outer"` is printed instead of `"global"`
  - `lexicalInner()` is declared inside `lexicalOuter()`
  - So it uses the scope of `lexicalOuter()`
  - Therefore, `"outer"` is printed instead of `"global"`
  - Scope is determined by declaration location, not call location.
*/

// Bonus Mission
// Verify that Lexical Scope is based on declaration location, not call location
function createMessagePrinter() {
  const message = "Hello from outer function";

  function printMessage() {
    console.log("message : ", message);
  }

  return printMessage;
}

const printer = createMessagePrinter();

printer(); // message :  Hello from outer function
/*
  - `printMessage()` is declared inside `createMessagePrinter()`
  - So `printMessage()` remembers the scope where it was declared
  - Even though `printer()` is called outside of `createMessagePrinter()`, it can still access `message`
  - This shows that Lexical Scope is based on declaration location, not call location
*/

// =====================
// Mission - Function Declaration and Function Expression
// =====================

// Mission 1
// Create a Function Declaration.
function sayHello() {
  console.log("Hello");
}
sayHello();

// Mission 2
// Use Parameters and Argument
function greet(name) {
  console.log(`Hello, ${name}`);
}
greet("JIHUN");
// the difference between Parameter and Argument
// A parameter refers to the variables found in the function definition, sometimes called as a formal parameter
// An argument refers to the actual input supplied at function call, sometimes called as an actual argument
// greet(name) <- "name" is parameter
// greet("JIHUN") <- "JIHUN" is argument

// Mission 3
// Use `return`.
function add(a, b) {
  return a + b;
}

const result = add(1, 2);
console.log("result : ", result); // 3

// Mission 4
// Verify that `return` stops function execution.
function testReturn() {
  return "finished";
  console.log("console log after return");
}
let returnValue = testReturn();
console.log("returnValue : " + returnValue);
// "return" terminates the function immediately and returns the value
// therefore, the console.log() written under the return statement is never executed
// because it is out of the execution flow

// Mission 5
// Create a Function Expression.
let sayHi = function () {
  console.log("Hi");
};
sayHi();

// Mission 6
// Compare Function Declaration and Function Expression Hoisting.
beforeCheck();
function beforeCheck() {
  console.log("beforeCheck()");
}

// ReferenceError: Cannot access 'beforeFunctionExpressionCheck' before initialization
// beforeFunctionExpressionCheck();
const beforeFunctionExpressionCheck = () => {
  console.log("beforeFunctionExpressionCheck()");
};

/*
- Explain why Function Declaration can be called before declaration
  - During the compilation phase, the JavaScript engine looks for all function declarations and hoists both the function name and its entire definition to the top of their enclosing scope.
- Explain why Function Expression cannot be called before initialization
  - JavaScript treats function expressions exactly like any other variable assignment.
  - Only the variable declaration is hoisted, not the function assignment.
*/

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
const greet = name => console.log("Hello,", name);
greet("JIHUN"); // Hello, JIHUN

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

// =====================
// Mission - Callback Function
// =====================

// Mission 1
function sayHello() {
  console.log("Hello");
}

function executeCallback(callback) {
  callback();
}

executeCallback(sayHello); // Hello
/*
  Explain why `sayHello` is called later inside `executeCallback`
  - `sayHello` is passed to `executedallback` as a function reference
  - Because we pass `sayHello` without parentheses `()`, it does not run immediately
  - Inside `executeCallback`, the parameter `callback` refers to `sayHello`
  - When `callback()` is executed, `sayHello()` is finally called
*/

// Mission 2
const sayHi = function () {
  console.log("Hi");
};
function runFunction(callback) {
  callback();
}

runFunction(sayHi); // Hi
/*
  Explain why a function can be passed as a value
  - In JavaScript, functions are first-class values
  - This means functions can be stored in variable
  - Functions can also be passed as arguments to other functions
  - In this code, `sayHi` is passed to `runFunction` as a value  
*/

// Mission 3
// Use Callback with Parameters.
function greet(name) {
  console.log("Hello, " + name);
}
greet("JIHUN"); // Hello, JIHUN

function executeGreeting(callback) {
  callback("JIHUN");
}
executeGreeting(greet); // Hello, JIHUN

/*
  Reason
  - `greet` is passed to `executeGreeting` as a callback function
  - Inside `executeGreeting`, `callback` refers to the `greet` function
  - When `callback("JIHUN")` is executed, it works like `greet("JIHUN")`
  - The value `"JIHUN"` is passed to the `name` parameter of `greet`
*/

// Mission 4
// Use Callback with Arrow Function
const executeArrowCallback = (callback) => {
  callback();
};
executeArrowCallback(() => console.log("Arrow Callback"));
/*
  Reason
  - An Arrow Function can also be passed directly as a callback function
  - The Arrow Function is executed inside `executeArrowCallback`
*/

// Mission 5
// Use Callback with parameters and Arrow Function
function calculate(a, b, callback) {
  const result = callback(a, b);
  console.log("result :", result);
}
calculate(10, 20, (a, b) => a + b); // 30
calculate(10, 20, (a, b) => a * b); // 200

/*
  Reason
  - `calculate` does not decide how to calculate the result by itself
  - Instead, it receives a callback function
  - If the callback returns `a + b`, the result is addition
  - If the callback returns `a * b`, the result is multiplication
  - This makes `calculate` more flexible
*/

// Mission 6
// Use Callback with `map()`

const numbers = [1, 2, 3];
const doubledNumbers = numbers.map((number) => number * 2);
console.log(doubledNumbers);
/*
  Why map() uses a callback function
  - `map()` uses a callback function to decide how each element should be transformed
  - `map()` calls the callback once for each element
  - The return value of the callback becomes an element of the new array
  - `map()` returns a new array
*/

// Mission 7
// Use Callback with forEach()
numbers.forEach((number) => {
  console.log("number : ", number);
});

/*
  Difference between map() and forEach()
  - `map()` is used when we want to create a new array
  - `map()` returns a new array
  - `forEach()` is used when we just want to run some code for each element
  - `forEach()` does not return a new array
*/

// Bonus Mission
// Create a React-like Event Handler.
const handleClick = () => {
  console.log("clicked");
};

function simulateClick(callback) {
  callback();
}
simulateClick(handleClick); // clicked
/*
  Explain why this is similar to React's `onClick={handleClick}`
  - In React, `onClick={handleClick}` passes the function itself
  - It does not call `handleClick` immediately
  - React calls `handleClick` later when the click event happens
  - This is similar to `simulateClick(handleClick)`
  - `simulateClick` receives the function and executes it later with `callback()`
 */
