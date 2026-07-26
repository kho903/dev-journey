export function findUserById(users, id) {
  return users.find((user) => user.id === id);
}

export function findUsersByRole(users, role) {
  return users.filter((user) => user.role === role);
}

export function addUser(users, newUser) {
  return [...users, newUser];
}
