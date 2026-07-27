function createUserAccount(name) {
  let role = "guest";
  let loginCount = 0;
  return {
    getName() {
      return name;
    },
    getRole() {
      return role;
    },
    changeRole(newRole) {
      role = newRole;
    },
    login() {
      return ++loginCount;
    },
    getLoginCount() {
      return loginCount;
    },
  };
}
const jihun = createUserAccount("JIHUN");
console.log(jihun.getName());
console.log(jihun.getRole());
jihun.changeRole("backend");
console.log(jihun.getRole());
console.log(jihun.login());
console.log(jihun.login());
console.log(jihun.getLoginCount());
console.log(jihun.role);
console.log(jihun.loginCount);

/*
JIHUN
guest
backend
1
2
2
undefined
undefined
*/
