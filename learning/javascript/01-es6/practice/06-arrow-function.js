// =====================
// Arrow Function and this
// =====================

// Regular Function
const regularAdd = function (a, b) {
  return a + b;
};

console.log("regularAdd :", regularAdd(10, 20)); // 30

// =====================
// Arrow Function
// =====================

const arrowAdd = (a, b) => {
  return a + b;
};

console.log("arrowAdd :", arrowAdd(10, 20)); // 30

// =====================
// Implicit Return
// =====================

const implicitAdd = (a, b) => a + b;

console.log("implicitAdd :", implicitAdd(10, 20)); // 30

// =====================
// One Parameter
// =====================
// prettier-ignore
const greet = name => {
  console.log("Hello, " + name);
};
greet("JIHUN"); // Hello, JIHUN

// =====================
// Return Object
// =====================

const createUser = (name, age) => ({
  name: name,
  age: age,
});

console.log("createUser :", createUser("JIHUN", 29)); // createUser : { name: 'JIHUN', age: 29 }

// =====================
// Regular Function this
// =====================

const user1 = {
  name: "JIHUN",
  printName: function () {
    console.log("user1 name :", this.name);
  },
};
user1.printName(); // JIHUN

// =====================
// Arrow Function this
// =====================

const user2 = {
  name: "KIM",
  printName: () => {
    console.log("user2 name :", this.name);
  },
};

// Arrow Function does not have its own this
// So this does not refer to user2
user2.printName(); // does not print "KIM"

// =====================
// Arrow Function in Callback
// =====================

const numbers = [1, 2, 3];

// prettier-ignore
const doubledNumbers = numbers.map(number => number * 2);
console.log("doubledNumbers :", doubledNumbers); // doubleNumbers : [ 2, 4, 6 ]
