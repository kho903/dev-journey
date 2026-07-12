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
