class User {
  constructor(name, age, role) {
    this.name = name;
    this.age = age;
    this.role = role;
  }

  introduce() {
    return `My name is ${this.name}, I am ${this.age} years old, and my role is ${this.role}.`;
  }
}

const jihun = new User("JIHUN", 29, "backend");
const kim = new User("KIM", 26, "frontend");
console.log(jihun);
console.log(jihun.introduce());
console.log(jihun instanceof User);
console.log(kim);
console.log(kim.introduce());
console.log(kim instanceof User);

/*
User { name: 'JIHUN', age: 29, role: 'backend' }
My name is JIHUN, I am 29 years old, and my role is backend.
true
User { name: 'KIM', age: 26, role: 'frontend' }
My name is KIM, I am 26 years old, and my role is frontend.
true
*/
