import { Routes, Route } from "react-router";

// 공통 Layout 컴포넌트
import MainLayout from "./layouts/MainLayout";

// 개별 페이지 컴포넌트
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <Routes>
      {/* TODO 2: path가 없는 Layout Route */}
      {/* URL 경로를 추가하지 않고 공통 Layout 적용 */}
      <Route element={<MainLayout />}>
        {/* TODO 3: 기본 페이지 (/) */}
        {/* index는 부모 경로의 기본 자식 Route */}
        <Route index element={<Home />} />

        {/* /about 접근 시 About 페이지 */}
        <Route path="about" element={<About />} />

        {/* /contact 접근 시 Contact 페이지 */}
        <Route path="contact" element={<Contact />} />

        {/* /users 접근 시 사용자 목록 */}
        <Route path="users" element={<Users />} />

        {/* /users/1, /users/2 등 동적 경로 */}
        {/* :userId 값은 useParams()로 가져올 수 있음 */}
        <Route path="users/:userId" element={<UserDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
