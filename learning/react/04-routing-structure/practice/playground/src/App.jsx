import { Routes, Route, NavLink } from "react-router";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Practice 02에서 추가한 페이지
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";

// 현재 활성화된 Navigation 링크 스타일 지정
const navLinkStyle = ({ isActive }) => ({
  fontWeight: isActive ? "bold" : "normal",
});

function App() {
  return (
    <div>
      <header>
        <h1>Routing Playground</h1>

        <nav>
          <NavLink to="/" end style={navLinkStyle}>
            Home
          </NavLink>

          {" | "}

          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>

          {" | "}

          <NavLink to="/contact" style={navLinkStyle}>
            Contact
          </NavLink>

          {" | "}

          {/* Practice 02: Users 목록 페이지 추가 */}
          <NavLink to="/users" style={navLinkStyle}>
            Users
          </NavLink>
        </nav>
      </header>

      <hr />

      <main>
        <Routes>
          {/* Practice 01 */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Practice 02: 사용자 목록 */}
          <Route path="/users" element={<Users />} />

          {/* Practice 02: 동적 사용자 상세 경로 */}
          {/* :userId는 URL에 따라 달라지는 Parameter */}
          <Route path="/users/:userId" element={<UserDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
