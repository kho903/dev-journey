import { NavLink, Outlet } from "react-router";

// 현재 활성화된 링크의 스타일 지정
const navLinkStyle = ({ isActive }) => ({
  fontWeight: isActive ? "bold" : "normal",
});

function MainLayout() {
  return (
    <div>
      {/* 모든 페이지에서 공통으로 표시되는 Header */}
      <header>
        <h1>Multi-Page App</h1>

        <nav>
          {/* 홈 페이지 */}
          <NavLink to="/" end style={navLinkStyle}>
            Home
          </NavLink>

          {" | "}

          {/* 사용자 목록 페이지 */}
          <NavLink to="/users" style={navLinkStyle}>
            Users
          </NavLink>

          {" | "}

          {/* 소개 페이지 */}
          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>
        </nav>
      </header>

      <hr />

      {/* 현재 URL과 일치하는 자식 Route를 표시 */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
