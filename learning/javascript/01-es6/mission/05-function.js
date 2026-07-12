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
