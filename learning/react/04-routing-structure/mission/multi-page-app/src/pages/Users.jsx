import { Link } from "react-router";

// 사용자 데이터 가져오기
import { users } from "../data/users";

function Users() {
  return (
    <section>
      <h1>User List</h1>

      <ul>
        {/* users 배열을 순회하며 사용자 목록 생성 */}
        {users.map((user) => (
          <li key={user.id}>
            {/* 사용자 ID에 맞는 상세 페이지로 이동 */}
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
