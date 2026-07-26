class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  introduce() {
    return `My name is ${this.name} and my role is ${this.role}.`;
  }
}

class Admin extends User {
  constructor(name, role, permission) {
    super(name, role);
    this.permission = permission;
  }

  manageUsers() {
    return `${this.name} can manage users with ${this.permission} permission.`;
  }
}

const admin = new Admin("JIHUN", "admin", "ALL");

console.log(admin);
console.log(admin.introduce());
console.log(admin.manageUsers());
console.log(admin instanceof Admin);
console.log(admin instanceof User);
/*
Admin { name: 'JIHUN', role: 'admin', permission: 'ALL' }
My name is JIHUN and my role is admin.
JIHUN can manage users with ALL permission.
true
true
*/
