import { Link } from "react-router";

function NotFound() {
  return (
    <section>
      <h1>404 Not Found</h1>

      <p>The requested page does not exist.</p>

      {/* 홈 페이지로 돌아가기 */}
      <Link to="/">Back to Home</Link>
    </section>
  );
}

export default NotFound;
