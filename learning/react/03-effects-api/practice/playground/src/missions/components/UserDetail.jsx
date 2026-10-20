import { useEffect, useState } from "react";
import axios from "axios";

import api from "../../api/api";
import { getApiErrorMessage } from "../../api/getApiErrorMessage";

/**
 * UserDetail Component
 *
 * userId:
 * - 부모 컴포넌트에서 전달받은 사용자 ID
 * - 조회할 사용자 정보의 기준
 *
 * userId 변경 시 새로운 API Request 실행
 */
function UserDetail({ userId }) {
  // 서버에서 조회한 사용자 상세 정보
  const [user, setUser] = useState(null);

  // 상세 조회 요청 상태
  const [detailStatus, setDetailStatus] = useState("loading");

  // 상세 조회 오류 메시지
  const [detailError, setDetailError] = useState(null);

  // 상세 조회 실패 시 Retry를 실행하기 위한 State
  const [detailRetryCount, setDetailRetryCount] = useState(0);

  /**
   * 사용자 상세 조회 Effect
   *
   * 실행 조건:
   * 1. 컴포넌트 최초 Mount
   * 2. userId 변경
   * 3. detailRetryCount 변경
   *
   * UserList의 Effect와는 완전히 독립적으로 동작
   */
  useEffect(() => {
    // 현재 Effect의 결과를 사용해도 되는지 확인하기 위한 Flag
    let ignore = false;

    // 사용자 상세 조회 전용 AbortController
    const controller = new AbortController();

    async function loadUserDetail() {
      // 1. 새로운 상세 조회 요청 시작
      setDetailStatus("loading");

      // 이전 오류 메시지 초기화
      setDetailError(null);

      // 이전 상세 데이터 초기화
      setUser(null);

      try {
        // 2. 선택한 사용자 ID로 상세 조회
        //
        // userId = 1인 경우
        // GET /users/1
        //
        // userId = 2인 경우
        // GET /users/2
        //
        // UserList에서 가져온 목록 데이터를
        // 그대로 사용하는 것이 아니라
        // 별도의 상세 API 요청을 수행
        const response = await api.get(`/users/${userId}`, {
          signal: controller.signal,
        });

        // 3. 이전 요청이 취소되었다면 결과 반영하지 않음
        //
        // 사용자를 빠르게 변경한 경우
        // 오래된 응답이 최신 State를 덮어쓰는 문제 방지
        if (ignore || controller.signal.aborted) {
          return;
        }

        // 4. Axios Response Data 추출
        const data = response.data;

        // 5. 예상한 상세 응답 형태인지 확인
        // 사용자 상세 API는 객체를 반환해야 함
        if (data === null || typeof data !== "object" || Array.isArray(data)) {
          throw new Error("Invalid user detail response");
        }

        // 6. 사용자 상세 정보 State 저장
        setUser(data);

        // 7. 요청 성공 상태로 변경
        setDetailStatus("success");
      } catch (err) {
        // 8. 이전 Effect의 요청이거나 취소된 요청이면 무시
        if (ignore || controller.signal.aborted || axios.isCancel(err)) {
          return;
        }

        // 9. 공통 Error 메시지 처리
        const message = getApiErrorMessage(err);

        setDetailError(message);
        setDetailStatus("error");
      }
    }

    // 사용자 상세 API 요청 실행
    loadUserDetail();

    /**
     * Effect Cleanup
     *
     * 이전 userId의 요청을 더 이상 사용하지 않도록 설정
     *
     * 예:
     * User 1 선택
     * → GET /users/1
     *
     * User 2 선택
     * → 이전 Effect Cleanup
     * → GET /users/2
     */
    return () => {
      ignore = true;

      controller.abort();

      console.log("[UserDetail] Cleanup:", userId);
    };
  }, [userId, detailRetryCount]);

  /**
   * 사용자 상세 조회 Retry
   *
   * detailRetryCount를 증가시켜
   * 현재 userId에 대한 API Request를 재실행
   *
   * UserList의 listRetryCount에는 영향을 주지 않음
   */
  function handleRetry() {
    setDetailRetryCount((prev) => prev + 1);
  }

  return (
    <section>
      <h2>User Details</h2>

      {/* 상세 조회 Loading 상태 */}
      {detailStatus === "loading" && <p>Loading user details...</p>}

      {/* 상세 조회 Error 상태 */}
      {detailStatus === "error" && (
        <div>
          <p>Error: {detailError}</p>

          {/* 현재 선택한 사용자 상세 API만 다시 호출 */}
          <button type="button" onClick={handleRetry}>
            Retry Detail
          </button>
        </div>
      )}

      {/* 상세 조회 성공 시 사용자 정보 출력 */}
      {detailStatus === "success" && user && (
        <div>
          <h3>{user.name}</h3>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Phone:</strong> {user.phone}
          </p>

          <p>
            <strong>City:</strong> {user.address?.city ?? "No city"}
          </p>

          <p>
            <strong>Company:</strong> {user.company?.name ?? "No company"}
          </p>
        </div>
      )}
    </section>
  );
}

export default UserDetail;
