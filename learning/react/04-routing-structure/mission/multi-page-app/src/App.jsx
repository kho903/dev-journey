import { Routes, Route } from "react-router";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Users from "./pages/Users";
import About from "./pages/About";

// Step 5에서 추가한 페이지
import UserDetail from "./pages/UserDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* 공통 Layout */}
      <Route element={<MainLayout />}>
        {/* 기본 페이지 */}
        <Route index element={<Home />} />

        {/* 사용자 목록 */}
        <Route path="users" element={<Users />} />

        {/* 사용자 상세 페이지: 동적 경로 */}
        <Route path="users/:userId" element={<UserDetail />} />

        {/* 소개 페이지 */}
        <Route path="about" element={<About />} />

        {/* 정의되지 않은 모든 경로 처리 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
