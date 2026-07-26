import * as calculator from "./calculator.mjs";

console.log("add :", calculator.add(10, 20));
console.log("subtract :", calculator.subtract(20, 10));
console.log("multiply :", calculator.multiply(10, 20));
console.log("divide :", calculator.divide(20, 10));
console.log("divide by zero :", calculator.divide(20, 0));

/*
add : 30
subtract : 10
multiply : 200
divide : 2
divide : Cannot divide by zero
*/
