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
