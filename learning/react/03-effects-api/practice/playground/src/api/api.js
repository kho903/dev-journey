import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

// TODO 1
// Request Interceptor 등록
//
// 요구사항
// 1. api.interceptors.request.use() 사용
// 2. HTTP Method와 URL을 console.log()로 출력
// 3. config를 반드시 반환
// 4. Request Error는 Promise.reject()로 전달
api.interceptors.request.use(
  (config) => {
    console.log("[Request]", config.method?.toUpperCase(), config.url);

    return config;
  },
  (error) => Promise.reject(error),
);
// TODO 2
// Response Interceptor 등록
//
// 요구사항
// 1. api.interceptors.response.use() 사용
// 2. 성공 시 HTTP Status 출력
// 3. 오류 시 HTTP Status 또는 Error Code 출력
// 4. 성공한 response는 그대로 반환
// 5. Error는 Promise.reject()로 다시 전달
api.interceptors.response.use(
  (response) => {
    console.log("[Response]", response.status);

    return response;
  },
  (error) => {
    console.error(
      "[Response Error]",
      error.response?.status ?? error.code ?? error.message,
    );

    return Promise.reject(error);
  },
);

export default api;
