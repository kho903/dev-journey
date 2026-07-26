import { users, findUserById, findUsersByRole } from "./userData.mjs";

console.log("all users :", users);
console.log("user by ID :", findUserById(1));
console.log("backend users :", findUsersByRole("backend"));
/*
all users : [
  { id: 1, name: 'JIHUN', role: 'backend' },
  { id: 2, name: 'KIM', role: 'frontend' },
  { id: 3, name: 'LEE', role: 'backend' }
]
user by ID : { id: 1, name: 'JIHUN', role: 'backend' }
backend users : [
  { id: 1, name: 'JIHUN', role: 'backend' },
  { id: 3, name: 'LEE', role: 'backend' }
]
*/
