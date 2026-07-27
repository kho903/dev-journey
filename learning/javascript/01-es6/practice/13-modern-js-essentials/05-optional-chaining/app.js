const user = {
  name: "JIHUN",
  profile: {
    contact: {
      email: "jihun@example.com",
    },
  },

  greet() {
    return `Hello, ${this.name}`;
  },
};
const guest = {};

console.log(user?.profile?.contact?.email);
// jihun@example.com
console.log(user?.profile?.contact?.tel);
// undefined
console.log(guest?.profile?.contact?.email);
// undefined
console.log(user?.greet?.());
// Hello, JIHUN
console.log(guest?.greet?.());
// undefined
