import { Link, useParams } from "react-router";
import { users } from "../data/users";

function UserDetail() {
  // TODO 2: 현재 URL에서 userId 추출
  // /users/1 → userId = "1"
  const { userId } = useParams();

  // TODO 3: URL Parameter는 문자열이므로 숫자로 변환
  const id = Number(userId);

  // users 배열에서 ID가 일치하는 사용자 검색
  // find()는 일치하는 첫 번째 요소를 반환
  // 일치하는 사용자가 없으면 undefined 반환
  const user = users.find((user) => user.id === id);

  // TODO 4: 존재하지 않는 사용자 처리
  // 예: /users/999
  if (!user) {
    return (
      <section>
        <h1>User Not Found</h1>
        <Link to="/users">Back to Users</Link>
      </section>
    );
  }

  // 검색에 성공한 사용자 정보 표시
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
