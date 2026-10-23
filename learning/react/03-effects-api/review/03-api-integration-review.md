# Review 03. API Integration

## 1. Component & State Design

다음과 같은 React 애플리케이션을 개발한다고 가정

- UserList: 사용자 목록 조회
- UserDetail: 선택한 사용자 상세 조회
- PostCreateForm: 게시글 작성

### Questions

1. 세 컴포넌트의 API 요청과 State를 분리해야 하는 이유는?

- 각 컴포넌트의 API 요청 목적과 생명주기가 다르기 때문
- Loading, Success, Error 상태를 독립적으로 관리하기 위함
- 하나의 요청이 실패해도 다른 컴포넌트의 정상적인 동작에 영향을 주지 않도록 설계

2. `selectedUserId`를 부모 컴포넌트에서 관리하는 이유는?

- UserList에서 선택한 사용자 ID를 UserDetail에 전달해야 하기 때문
- 여러 컴포넌트에서 공유하는 State는 공통 부모에서 관리하는 것이 적절함
- 이를 State Lifting이라고 하며, Props를 통해 자식 컴포넌트에 값을 전달

3. 사용자 변경 시 기존 상세 데이터를 어떻게 처리해야 하는가?

- 기존 사용자 상세 데이터 초기화 또는 이전 상세 컴포넌트 Unmount
- 이전 API 요청은 AbortController로 취소
- 오래된 응답이 새로운 사용자 정보에 덮어써지지 않도록 방지

## 2. Race Condition & Cleanup

다음 코드의 문제점을 찾아 수정

```jsx
useEffect(() => {
  async function loadUser() {
    const response = await api.get(`/users/${userId}`);
    setUser(response.data);
  }

  loadUser();
}, [userId]);
```

### Questions

1. User 1 → User 2로 빠르게 변경할 때 발생할 수 있는 문제는?

- API 응답은 요청한 순서대로 도착한다는 보장이 없음
- User 2 응답이 먼저 도착한 후 User 1 응답이 늦게 도착할 수 있음
- 이 경우 화면에는 User 2가 선택되어 있지만 User 1 데이터가 표시되는 Race Condition 발생
- 이를 Stale Response 문제라고 함

2. `AbortController`와 Cleanup을 적용하여 코드를 수정

### Corrected Code

```jsx
useEffect(() => {
  const controller = new AbortController();
  let ignore = false;

  async function loadUser() {
    setUser(null);

    try {
      // 현재 userId로 API 요청
      const response = await api.get(`/users/${userId}`, {
        signal: controller.signal,
      });

      // 취소되었거나 오래된 요청이면 무시
      if (ignore || controller.signal.aborted) {
        return;
      }

      setUser(response.data);
    } catch (err) {
      // 취소된 요청은 실제 오류로 처리하지 않음
      if (ignore || controller.signal.aborted) {
        return;
      }

      console.error("Failed to load user:", err);
    }
  }

  loadUser();

  // Dependency 변경 또는 Unmount 시 실행
  return () => {
    ignore = true;
    controller.abort();
  };
}, [userId]);
```

- AbortController: 진행 중인 요청 취소
- Ignore Flag: 오래된 비동기 응답의 State 반영 방지
- Cleanup: Dependency 변경 또는 Unmount 시 이전 작업 정리

## 3. API State & Retry

다음 코드를 확인

```jsx
const isEmpty = posts.length === 0;

function handleRetry() {
  setRetryCount(retryCount + 1);
}
```

### Questions

1. `isEmpty` 판단에 어떤 문제가 있는가?

- `posts.length === 0`만으로 판단하면 Loading 상태에서도 Empty 메시지가 나타날 수 있음
- API 요청이 성공한 이후에 데이터가 없는 경우만 Empty로 판단해야 함

2. Functional State Update로 Retry 함수를 수정

- 이전 State를 기준으로 값을 증가시키도록 작성

3. `retryCount`를 Effect Dependency에 포함하는 이유는?

- retryCount가 변경되면 Effect를 다시 실행하기 위함
- 동일한 조건으로 API를 다시 요청할 수 있음

4. Retry와 Refetch의 차이는?

- Retry: 실패한 요청을 다시 시도
- Refetch: 기존 데이터를 다시 조회
- 목적은 다르지만 내부적으로 동일한 재요청 함수를 사용할 수 있음

### Corrected Code

```jsx
// 성공했지만 데이터가 없는 경우만 Empty
const isEmpty = status === "success" && posts.length === 0;

// Functional State Update
function handleRetry() {
  setRetryCount((prev) => prev + 1);
}

// Effect Dependency 예시
useEffect(() => {
  // API 조회 로직
}, [userId, retryCount]);
```

## 4. GET & POST Integration

게시글 목록을 조회하고 새로운 게시글을 작성하는
React 애플리케이션을 개발한다고 가정

### Questions

1. GET과 POST는 각각 어떤 시점에 실행하는 것이 적절한가?

- GET: Mount, Dependency 변경 등 외부 데이터와 동기화가 필요한 경우 useEffect에서 실행 가능
- GET은 사용자의 Refetch 이벤트에서 직접 실행하는 것도 가능
- POST: 사용자가 Form을 제출하는 등의 명시적인 이벤트가 발생했을 때 실행
- POST는 일반적으로 onSubmit이나 onClick Event Handler에서 처리

2. POST 진행 중 중복 제출을 방지하는 방법은?

- Submitting 상태에서 Submit 버튼 비활성화
- useRef로 제출 중인지 즉시 확인하여 중복 요청 방지
- 요청이 종료되면 finally에서 잠금 해제

3. POST가 실패하더라도 기존 GET 목록을 유지하려면 어떻게 설계해야 하는가?

- GET과 POST의 State를 독립적으로 관리
- listStatus와 submitStatus를 분리
- 기존 게시글 목록과 사용자 입력값은 유지

4. POST 성공 후 반드시 GET 목록을 다시 조회해야 하는가?

- 반드시 다시 조회할 필요는 없음
- 실제 서버에 데이터가 저장되는 서비스라면 최신 목록 반영을 위해 Refetch하거나 State를 갱신할 수 있음
- JSONPlaceholder는 POST 데이터를 영구 저장하지 않으므로, Refetch해도 새 게시글이 나타나지 않음
- 서비스 요구사항과 API 동작 방식에 따라 결정

## Summary

### 이번 Issue에서 가장 중요하게 배운 개념

- useEffect는 React와 외부 시스템을 동기화하기 위한 Hook
- Dependency 변경 시 이전 Effect의 Cleanup이 실행됨
- AbortController와 Ignore Flag로 Race Condition 및 Stale Response 방지
- GET과 POST는 요청 목적에 따라 실행 시점을 구분
- 여러 API 요청의 State는 각 요청의 책임에 맞게 독립적으로 관리
- Retry/Refetch를 통해 API 요청 생명주기를 제어할 수 있음

### 앞으로 React 프로젝트에서 주의할 점

- 불필요한 useEffect 사용 지양
- Dependency Array 누락 주의
- 비동기 요청의 Cleanup 처리
- HTTP 오류와 요청 취소 구분
- Loading / Success / Error / Empty 상태 명확히 관리
- POST 중복 제출 방지
- 컴포넌트별 책임과 State 관리 범위 명확히 구분
