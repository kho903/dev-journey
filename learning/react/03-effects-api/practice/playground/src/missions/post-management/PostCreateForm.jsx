import { useRef, useState } from "react";

import api from "../../api/api";
import { getApiErrorMessage } from "../../api/getApiErrorMessage";

/**
 * PostCreateForm Component
 *
 * 부모 컴포넌트에서 전달받는 Props:
 *
 * userId
 * - 현재 선택한 사용자 ID
 * - 게시글 작성 시 Request Body에 포함
 *
 * 담당 기능:
 * - 제목 및 본문 입력
 * - 입력값 검증
 * - POST 요청
 * - Submitting / Success / Error 상태 관리
 * - 중복 제출 방지
 * - 서버 응답 결과 표시
 *
 * POST 요청은 useEffect에서 실행하지 않음
 */
function PostCreateForm({ userId }) {
  // 게시글 제목 Input State
  const [title, setTitle] = useState("");

  // 게시글 본문 Textarea State
  const [body, setBody] = useState("");

  /**
   * 게시글 작성 요청 상태
   *
   * idle:
   * - 아직 작성 요청하지 않음
   *
   * submitting:
   * - POST 요청 진행 중
   *
   * success:
   * - POST 요청 성공
   *
   * error:
   * - POST 요청 실패
   */
  const [submitStatus, setSubmitStatus] = useState("idle");

  // 입력 검증 및 POST 오류 메시지
  const [submitError, setSubmitError] = useState(null);

  // POST 성공 시 서버가 반환한 게시글 데이터
  const [createdPost, setCreatedPost] = useState(null);

  /**
   * 중복 제출 방지를 위한 Ref
   *
   * useState:
   * - 값이 변경되면 React Re-render 발생
   *
   * useRef:
   * - .current를 변경해도 Re-render되지 않음
   *
   * 여기서는 제출 진행 여부를 즉시 확인하기 위해 사용
   *
   * 사용자가 매우 빠르게 Submit 버튼을 누르더라도
   * 동시에 여러 POST 요청이 실행되는 것을 방지
   */
  const submittingRef = useRef(false);

  /**
   * 작성 폼 제출 Event Handler
   *
   * async 함수로 선언했지만
   * useEffect 내부에서 자동 실행되는 함수가 아님
   *
   * 사용자가 Form을 Submit했을 때만 실행됨
   */
  async function handleSubmit(event) {
    // 1. 브라우저 기본 Form 제출 방지
    //
    // 기본 동작을 막지 않으면
    // 페이지가 새로고침될 수 있음
    event.preventDefault();

    // 2. 이미 POST 요청 중이라면 다시 실행하지 않음
    //
    // 버튼 disabled와 함께 이중으로 방어
    //
    // State 변경 결과가 화면에 반영되기 전에도
    // Ref의 current 값은 즉시 변경할 수 있음
    if (submittingRef.current) {
      return;
    }

    // 3. 앞뒤 공백 제거
    //
    // 예:
    // "  React  " → "React"
    // "     " → ""
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    // 4. 입력값 검증
    //
    // 제목 또는 본문 중 하나라도 비어 있으면
    // POST 요청을 실행하지 않음
    if (!trimmedTitle || !trimmedBody) {
      setSubmitError("Title and Body are required.");

      // 새로운 작성 요청이 시작되지 않았으므로
      // submitting 상태로 변경하지 않음
      setSubmitStatus("idle");

      // 과거 성공 결과가 남아 있지 않도록 제거
      setCreatedPost(null);

      return;
    }

    /**
     * 5. 현재 사용자 ID 저장
     *
     * Submit 시점의 userId를 사용
     *
     * POST 요청 진행 중 부모의 userId가 변경되더라도
     * 이미 시작된 요청은 원래 선택했던 userId로 전송됨
     */
    const submittedUserId = userId;

    // 6. 중복 제출 잠금
    //
    // await 이전에 동기적으로 변경
    submittingRef.current = true;

    // 7. 새로운 작성 요청 시작
    setSubmitStatus("submitting");

    // 이전 오류 메시지 초기화
    setSubmitError(null);

    // 이전 성공 결과 초기화
    setCreatedPost(null);

    try {
      /**
       * 8. Axios POST 요청
       *
       * POST /posts
       *
       * Request Body:
       * {
       *   title: "...",
       *   body: "...",
       *   userId: 1
       * }
       *
       * Axios는 일반 객체를 JSON으로 직렬화
       *
       * 직접 JSON.stringify()를 호출하지 않아도 됨
       */
      const response = await api.post("/posts", {
        title: trimmedTitle,
        body: trimmedBody,
        userId: submittedUserId,
      });

      /**
       * 9. POST 성공
       *
       * JSONPlaceholder는 일반적으로
       * HTTP 201 Created 응답을 반환
       *
       * response.data에는 서버가 반환한
       * 게시글 객체가 포함됨
       */
      const data = response.data;

      // 서버가 반환한 결과 저장
      setCreatedPost(data);

      // 작성 성공 상태로 변경
      setSubmitStatus("success");

      /**
       * 참고:
       *
       * 성공 후 입력값은 일부러 유지
       *
       * JSONPlaceholder는 실제 DB에 저장하지 않으므로
       * 어떤 내용을 제출했는지 확인하기 쉽게 하기 위함
       *
       * 실제 서비스에서는 성공 후 입력값을 비우거나
       * 화면을 이동시키는 방식도 선택 가능
       */
    } catch (err) {
      /**
       * 10. POST 요청 실패
       *
       * 공통 Error 메시지 변환 함수 사용
       *
       * 실패하더라도 사용자가 입력한
       * title과 body는 그대로 유지
       *
       * 사용자는 내용을 다시 입력할 필요 없이
       * Submit 버튼을 눌러 재시도할 수 있음
       */
      const message = getApiErrorMessage(err);

      setSubmitError(message);
      setSubmitStatus("error");
    } finally {
      /**
       * 11. 요청 종료
       *
       * 성공 / 실패 여부와 관계없이 실행
       *
       * 다음 Submit을 할 수 있도록 잠금 해제
       *
       * setSubmitStatus()는 성공 또는 실패
       * 분기에서 이미 처리했으므로 여기서 변경하지 않음
       */
      submittingRef.current = false;
    }
  }

  // 현재 POST 요청 진행 여부
  //
  // 버튼 비활성화 및 UI 출력에 활용
  const isSubmitting = submitStatus === "submitting";

  return (
    <section>
      <h2>Create Post</h2>

      {/*
        Form Submit 이벤트 연결

        사용자가 버튼을 클릭하거나
        입력창에서 Enter로 제출하는 경우에도
        handleSubmit()이 실행됨
      */}
      <form onSubmit={handleSubmit} noValidate>
        {/* 게시글 제목 입력 */}
        <div>
          <label htmlFor="post-title">Title</label>

          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            placeholder="Enter post title"
            disabled={isSubmitting}
          />
        </div>

        <br />

        {/* 게시글 본문 입력 */}
        <div>
          <label htmlFor="post-body">Body</label>

          <textarea
            id="post-body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
            placeholder="Enter post content"
            rows={5}
            disabled={isSubmitting}
          />
        </div>

        <br />

        <p>Post User ID: {userId}</p>

        {/*
          type="submit":
          Form의 onSubmit Handler를 실행

          disabled:
          POST 진행 중 중복 제출 방지
        */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Post"}
        </button>
      </form>

      <hr />

      {/* 입력 검증 오류 또는 POST 오류 */}
      {submitError && <p role="alert">Error: {submitError}</p>}

      {/* POST 성공 시 결과 표시 */}
      {submitStatus === "success" && createdPost && (
        <div>
          <h3>Post Created (Simulated)</h3>

          <p>
            <strong>Post ID:</strong> {createdPost.id}
          </p>

          <p>
            <strong>Title:</strong> {createdPost.title}
          </p>

          <p>
            <strong>User ID:</strong> {createdPost.userId}
          </p>

          <p>
            JSONPlaceholder returned a successful response. The post was not
            permanently saved.
          </p>
        </div>
      )}
    </section>
  );
}

export default PostCreateForm;
