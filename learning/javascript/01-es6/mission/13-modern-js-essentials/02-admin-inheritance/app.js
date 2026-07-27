class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  introduce() {
    const article = /^[aeiou]/i.test(this.role) ? "an" : "a";

    return `${this.name} is ${article} ${this.role}.`;
  }
}

class Admin extends User {
  constructor(name, role, permission) {
    super(name, role);
    this.permission = permission;
  }

  introduce() {
    return `${super.introduce()} Permission: ${this.permission}`;
  }

  manageUser() {
    return `${this.name} can manage users.`;
  }
}

const jihun = new Admin("JIHUN", "ADMIN", "ALL");
console.log(jihun.introduce());
console.log(jihun.manageUser());
console.log(jihun instanceof Admin);
console.log(jihun instanceof User);
/*
JIHUN is an ADMIN. Permission: ALL
JIHUN can manage users.
true
true
*/
