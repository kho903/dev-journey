// =====================
// var
// =====================

// Re-declaration
var userName = "JIHUN";
var userName = "KIM";

console.log("userName : ", userName); // KIM

// Reassignment
var score = 10;
console.log("score : ", score);

score = 20;
console.log("score after reassignment : ", score);

// Block Scope
// var does not have Block Scope
if (true) {
  var message = "declare message in if block";
}
console.log("message : ", message);

// Function Scope
// var has Function Scope
function testVarScope() {
  var functionScopedValue = 100;
  console.log("inside function : ", functionScopedValue);
}

testVarScope();

// ReferenceError
// functionScopedValue can only be accessed inside testVarScope()
// console.log("outside function : ", functionScopedValue);
