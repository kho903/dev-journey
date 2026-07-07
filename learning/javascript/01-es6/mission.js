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
