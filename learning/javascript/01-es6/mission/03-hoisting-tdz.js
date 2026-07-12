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
