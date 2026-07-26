const users = [
  {
    id: 1,
    name: "JIHUN",
    role: "backend",
  },
  {
    id: 2,
    name: "KIM",
    role: "frontend",
  },
];

function findUserById(id) {
  return users.find((user) => user.id === id);
}

export { users, findUserById };
