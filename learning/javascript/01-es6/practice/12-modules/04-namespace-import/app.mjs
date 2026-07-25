import * as caculator from "./calculator.mjs";

console.log("calculator.add(10, 20) :", caculator.add(10, 20));
console.log("calculator.subtract(20, 10) :", caculator.subtract(20, 10));
console.log("calculator.multiply(20, 10) :", caculator.multiply(10, 20));
console.log("calculator.divide(20, 10) :", caculator.divide(20, 10));
console.log("calculator.divide(20, 0) :", caculator.divide(20, 0));
/*
calculator.add(10, 20) : 30
calculator.subtract(20, 10) : 10
calculator.multiply(20, 10) : 200
calculator.divide(20, 10) : 2
calculator.divide(20, 0) : Cannot divide by zero
*/
