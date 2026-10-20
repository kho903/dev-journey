import axios from "axios";

/**
 * API 요청 중 발생한 Error를
 * 사용자가 이해하기 쉬운 문자열로 변환하는 함수
 *
 * @param {unknown} err - catch에서 전달받은 Error
 * @returns {string} - 화면에 표시할 오류 메시지
 */
export function getApiErrorMessage(err) {
  // 1. Axios가 발생시킨 Error인지 확인
  // Axios가 아닌 일반 JavaScript Error도 발생할 수 있으므로 구분
  if (axios.isAxiosError(err)) {
    // 2. 서버로부터 HTTP Response를 받은 경우
    // 예: 400, 401, 404, 500 등의 HTTP 오류
    //
    // Axios는 기본 설정에서 2xx 이외 응답을 Reject 처리
    // 해당 응답은 일반적으로 error.response에 저장됨
    if (err.response) {
      return `HTTP Error: ${err.response.status}`;
    }

    // 3. 요청은 보냈지만 HTTP Response를 받지 못한 경우
    // 예: 서버 연결 실패, 네트워크 장애 등
    //
    // timeout이나 CORS 관련 문제도
    // 이 범주에서 나타날 수 있음
    if (err.request) {
      return `No response received: ${err.message}`;
    }

    // 4. Axios 요청 설정 등의 문제
    return `Axios Error: ${err.message}`;
  }

  // 5. Axios가 아닌 일반 Error 객체
  if (err instanceof Error) {
    return err.message;
  }

  // 6. Error 객체 이외의 값이 throw된 경우
  return "Unexpected Error";
}
