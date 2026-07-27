class User {
  constructor(id, name, role) {
    this.id = id;
    this.name = name;
    this.role = role ?? "guest";
  }

  introduce() {
    return `${this.name} is a ${this.role}`;
  }

  changeRole(newRole) {
    this.role = newRole;
  }
}

const jihun = new User(1, "JIHUN", "backend");
console.log(jihun.introduce());
// JIHUN is a backend
const kim = new User(2, "KIM", null);
console.log(kim.introduce());
// KIM is a guest
kim.changeRole("frontend");
console.log(kim.introduce());
// KIM is a frontend
console.log(jihun instanceof User);
console.log(kim instanceof User);
/*
true
true
*/
