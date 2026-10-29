import { NavLink, Outlet } from "react-router";

// NavLink의 활성화 여부에 따라 스타일 변경
const navLinkStyle = ({ isActive }) => ({
  fontWeight: isActive ? "bold" : "normal",
});

function MainLayout() {
  return (
    <div>
      {/* 모든 페이지에서 공통으로 표시할 Header */}
      <header>
        <h1>Routing Playground</h1>

        <nav>
          {/* Home 페이지 */}
          <NavLink to="/" end style={navLinkStyle}>
            Home
          </NavLink>

          {" | "}

          {/* About 페이지 */}
          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>

          {" | "}

          {/* Contact 페이지 */}
          <NavLink to="/contact" style={navLinkStyle}>
            Contact
          </NavLink>

          {" | "}

          {/* Users 목록 페이지 */}
          {/* /users/1 등 하위 경로에서도 활성화됨 */}
          <NavLink to="/users" style={navLinkStyle}>
            Users
          </NavLink>
        </nav>
      </header>

      <hr />

      <main>
        {/* TODO 1: 현재 매칭된 자식 Route를 렌더링 */}
        {/* URL에 따라 Outlet 내부에 표시할 컴포넌트가 결정됨 */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
