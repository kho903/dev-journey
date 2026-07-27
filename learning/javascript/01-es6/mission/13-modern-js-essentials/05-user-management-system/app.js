class User {
  constructor(id, name, role, profile) {
    this.id = id;
    if (typeof name !== "string" || name.trim() === "")
      throw new Error("Name is required");
    this.name = name;
    this.role = role ?? "guest";
    this.profile = profile;
  }

  introduce() {
    const article = /^[aeiou]/i.test(this.role) ? "an" : "a";
    return `${this.name} is ${article} ${this.role}.`;
  }

  getEmail() {
    return profile?.contact?.email ?? "No email";
  }
}

class Admin extends User {
  constructor(id, name, role, profile, permission) {
    super(id, name, role, profile);
    this.permission = permission;
  }

  introduce() {
    return `${super.introduce()} Permission: ${this.permission}`;
  }
}
function createUserManager() {
  const users = [];

  return {
    addUser(user) {
      const isDuplicateId = users.some(
        (existingUser) => existingUser.id === user.id,
      );

      if (isDuplicateId) {
        throw new Error("User ID already exists");
      }
      users.push(user);
    },
    findUserById(id) {
      return users.find((user) => user.id == id);
    },
    findUsersByRole(role) {
      return users.filter((user) => user.role === role);
    },
    getUsers() {
      return [...users];
    },
    getUserCount() {
      return users.length;
    },
  };
}
const jihun = new User(1, "JIHUN", "backend", {
  contact: {
    email: "jihun@example.com",
  },
});
const lee = new User(2, "LEE", null, null);
const admin = new Admin(3, "KIM", "admin", null, "ALL");

const manager = createUserManager();
manager.addUser(jihun);
console.log(manager.getUsers());
manager.addUser(lee);
console.log(manager.getUsers());
manager.addUser(admin);

console.log(manager.getUsers());
console.log(manager.getUserCount());
console.log(manager.findUserById(2));
console.log(manager.findUsersByRole("backend"));
manager.getUsers().forEach((user) => console.log(user.getEmail()));

console.log(admin.introduce());

try {
  const existIdUser = new User(1, "PARK", null, null);
  manager.addUser(existIdUser);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
} finally {
  console.log("User management operation completed");
}

console.log(manager.users);
// undefined
