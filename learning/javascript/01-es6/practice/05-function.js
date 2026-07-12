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
