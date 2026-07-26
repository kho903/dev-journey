import UserCard from "./UserCard.mjs";
import { users } from "./userData.mjs";

users.forEach((user) => console.log(UserCard(user)));
/*
<article>
  <h2>JIHUN</h2>
  <p>backend</p>
</article>

<article>
  <h2>KIM</h2>
  <p>frontend</p>
</article>
*/
