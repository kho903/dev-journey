import { Link } from "react-router";
import { users } from "../data/users";

function Users() {
  return (
    <section>
      <h1>User List</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {/* TODO 1: 사용자 ID에 따른 동적 URL 생성 */}
            {/* 예: user.id가 1이면 /users/1로 이동 */}
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
