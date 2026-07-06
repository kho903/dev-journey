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
