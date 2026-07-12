// =====================
// Callback Function
// =====================

// Basic Callback
function sayHello() {
  console.log("Hello");
}

function executeCallback(callback) {
  callback();
}

executeCallback(sayHello); // Hello

// =====================
// Function as Value
// =====================

const sayHi = function () {
  console.log("Hi");
};
sayHi(); // Hi

function runFunction(callback) {
  callback();
}
runFunction(sayHi); // Hi

// =====================
// Callback with Parameters
// =====================

function greet(name) {
  console.log("Hello, " + name);
}

function executeGreeting(callback) {
  callback("JIHUN");
}

executeGreeting(greet); // Hello, JIHUN

// =====================
// Callback with Arrow Function
// =====================
function executeArrowCallback(callback) {
  callback();
}

executeArrowCallback(() => {
  console.log("Arrow Callback");
}); // Arrow Callback

// =====================
// Callback with Parameters and Arrow Function
// =====================
function calculate(a, b, callback) {
  const result = callback(a, b); // callback function is executed here
  console.log("result :", result);
}
calculate(10, 20, (a, b) => a + b); // 30
calculate(10, 20, (a, b) => a * b); // 200

// =====================
// Callback and Array Methods
// =====================
const numbers = [1, 2, 3];

const doubledNumbers = numbers.map((number) => {
  return number * 2;
});

console.log("doubledNumbers :", doubledNumbers); // [2, 4, 6]

// =====================
// Callback with forEach
// =====================
numbers.forEach((number) => {
  console.log("number :", number);
});

// =====================
// Callback and React-like Event Handler
// =====================
const handleClick = () => {
  console.log("clicked");
};

function simulateClick(callback) {
  callback();
}

simulateClick(handleClick); // clicked
