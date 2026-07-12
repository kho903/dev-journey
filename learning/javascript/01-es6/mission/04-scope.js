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
