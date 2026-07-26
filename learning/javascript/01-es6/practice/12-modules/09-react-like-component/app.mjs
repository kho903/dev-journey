import UserCard from "./UserCard.mjs";
import { findUserById, users } from "./userData.mjs";

console.log("All users :");

users.forEach((user) => {
  console.log(
    UserCard({
      name: user.name,
      role: user.role,
    }),
  );
});

const selectedUser = findUserById(1);

console.log("Selected user:");

if (selectedUser) {
  console.log(UserCard(selectedUser));
}

/*
All users :

<article>
    <h2>JIHUN</h2>
    <p>backend</p>
</article>


<article>
    <h2>KIM</h2>
    <p>frontend</p>
</article>

Selected user:

<article>
    <h2>JIHUN</h2>
    <p>backend</p>
</article>

*/
