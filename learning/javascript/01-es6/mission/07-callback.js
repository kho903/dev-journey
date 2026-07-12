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
const functionSayHi = function () {
  console.log("Hi");
};
function runFunction(callback) {
  callback();
}

runFunction(functionSayHi); // Hi
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

const arrowNumbers = [1, 2, 3];
const doubledNumbersByArrow = arrowNumbers.map((number) => number * 2);
console.log(doubledNumbersByArrow);
/*
  Why map() uses a callback function
  - `map()` uses a callback function to decide how each element should be transformed
  - `map()` calls the callback once for each element
  - The return value of the callback becomes an element of the new array
  - `map()` returns a new array
*/

// Mission 7
// Use Callback with forEach()
arrowNumbers.forEach((number) => {
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
const arrowHandleClick = () => {
  console.log("clicked");
};

function simulateClick(callback) {
  callback();
}
simulateClick(arrowHandleClick); // clicked
/*
  Explain why this is similar to React's `onClick={handleClick}`
  - In React, `onClick={handleClick}` passes the function itself
  - It does not call `handleClick` immediately
  - React calls `handleClick` later when the click event happens
  - This is similar to `simulateClick(handleClick)`
  - `simulateClick` receives the function and executes it later with `callback()`
 */
