import { Link } from "react-router";

function Home() {
  return (
    <section>
      <h1>Home Page</h1>
      <p>Welcome to the Multi-Page Application!</p>

      {/* 사용자 목록 페이지로 이동 */}
      <Link to="/users">View Users</Link>
    </section>
  );
}

export default Home;
