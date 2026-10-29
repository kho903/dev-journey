import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// React Router의 BrowserRouter 가져오기
import { BrowserRouter } from "react-router";

import App from "./App.jsx";
import "./index.css";

// React 애플리케이션 시작
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter로 App 전체를 감싸기 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
