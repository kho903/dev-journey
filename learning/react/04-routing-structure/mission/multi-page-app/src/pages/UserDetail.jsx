import { Link, useParams } from "react-router";
import { users } from "../data/users";

function UserDetail() {
  // 1. 현재 URL에서 userId 가져오기
  // /users/2 → userId = "2"
  const { userId } = useParams();

  // 2. URL Parameter는 문자열이므로 숫자로 변환
  const id = Number(userId);

  // 3. users 배열에서 해당 ID의 사용자 검색
  const user = users.find((user) => user.id === id);

  // 4. 일치하는 사용자가 없다면 예외 화면 표시
  if (!user) {
    return (
      <section>
        <h1>User Not Found</h1>
        <p>The requested user does not exist.</p>
        <Link to="/users">Back to Users</Link>
      </section>
    );
  }

  // 5. 검색된 사용자 정보 렌더링
  return (
    <section>
      <h1>User Detail</h1>

      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>

      <Link to="/users">Back to Users</Link>
    </section>
  );
}

export default UserDetail;
