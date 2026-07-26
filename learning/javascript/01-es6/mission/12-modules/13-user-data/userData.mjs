export const users = [
  { id: 1, name: "JIHUN", role: "backend" },
  { id: 2, name: "KIM", role: "frontend" },
  { id: 3, name: "LEE", role: "backend" },
];

export function findUserById(id) {
  return users.find((user) => user.id === id);
}

export function findUsersByRole(role) {
  return users.filter((user) => user.role === role);
}
