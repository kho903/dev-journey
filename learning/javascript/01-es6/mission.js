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
