import { Routes, Route, NavLink } from "react-router";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// NavLink의 활성화 여부에 따라 스타일 지정
// isActive: 현재 URL과 링크 경로가 일치하면 true
const navLinkStyle = ({ isActive }) => ({
  fontWeight: isActive ? "bold" : "normal",
});

function App() {
  return (
    <div>
      <header>
        <h1>Routing Playground</h1>
        <nav>
          {/* "/" 경로로 이동 */}
          {/* end: 하위 경로에서 활성화되는 것을 제한 */}
          <NavLink to="/" end style={navLinkStyle}>
            Home
          </NavLink>

          {" | "}

          {/* "/about" 경로로 이동 */}
          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>
          {" | "}

          {/* "/contact" 경로로 이동 */}
          <NavLink to="/contact" style={navLinkStyle}>
            Contact
          </NavLink>
        </nav>
      </header>
      <hr />

      <main>
        {/* Routes: 현재 URL과 일치하는 Route 선택 */}
        <Routes>
          {/* "/" 접근 시 Home 컴포넌트 렌더링 */}
          <Route path="/" element={<Home />} />

          {/* "/about" 접근 시 About 렌더링 */}
          <Route path="/about" element={<About />} />

          {/* "/contact" 접근 시 Contact 렌더링 */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
