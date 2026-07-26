import { users } from "./data/users.mjs";

import {
  findUserById,
  findUsersByRole,
  addUser,
} from "./services/userService.mjs";

import UserCard from "./components/UserCard.mjs";

// 전체 사용자 출력
console.log("all users");

users.forEach((user) => {
  console.log(UserCard(user));
});

// ID로 사용자 검색
console.log("find user by ID");
console.log(findUserById(users, 1));

// 역할로 사용자 검색
console.log("find users by role");

findUsersByRole(users, "backend").forEach((user) => {
  console.log(UserCard(user));
});

// 새로운 사용자
const newUser = {
  id: 4,
  name: "PARK",
  role: "infra",
};

// 원본을 변경하지 않고 새로운 배열 생성
const updatedUsers = addUser(users, newUser);

// 새로운 사용자가 추가된 배열
console.log("updated users");

updatedUsers.forEach((user) => {
  console.log(UserCard(user));
});

// 원본 배열 확인
console.log("original users");

users.forEach((user) => {
  console.log(UserCard(user));
});

/*
all users

<article>
  <h1>1</h1>
  <h2>JIHUN</h2>
  <p>backend</p>
</article>

<article>
  <h1>2</h1>
  <h2>KIM</h2>
  <p>frontend</p>
</article>

<article>
  <h1>3</h1>
  <h2>LEE</h2>
  <p>backend</p>
</article>
find user by ID
{ id: 1, name: 'JIHUN', role: 'backend' }
find users by role

<article>
  <h1>1</h1>
  <h2>JIHUN</h2>
  <p>backend</p>
</article>

<article>
  <h1>3</h1>
  <h2>LEE</h2>
  <p>backend</p>
</article>
updated users

<article>
  <h1>1</h1>
  <h2>JIHUN</h2>
  <p>backend</p>
</article>

<article>
  <h1>2</h1>
  <h2>KIM</h2>
  <p>frontend</p>
</article>

<article>
  <h1>3</h1>
  <h2>LEE</h2>
  <p>backend</p>
</article>

<article>
  <h1>4</h1>
  <h2>PARK</h2>
  <p>infra</p>
</article>
original users

<article>
  <h1>1</h1>
  <h2>JIHUN</h2>
  <p>backend</p>
</article>

<article>
  <h1>2</h1>
  <h2>KIM</h2>
  <p>frontend</p>
</article>

<article>
  <h1>3</h1>
  <h2>LEE</h2>
  <p>backend</p>
</article>
*/
