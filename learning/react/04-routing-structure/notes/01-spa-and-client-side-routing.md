# 01. SPA & Client-Side Routing

## 1. SPA (Single-Page Application)

- 하나의 HTML 문서를 기반으로 동작하는 웹 애플리케이션
- 페이지 이동 시 전체 HTML 문서를 다시 로드하지 않고 필요한 UI를 갱신
- React는 SPA를 구현하는 데 활용할 수 있는 UI 라이브러리

## 2. MPA (Multi-Page Application)

- 여러 HTML 문서를 기반으로 구성되는 웹 애플리케이션
- 일반적인 페이지 이동 시 서버로부터 새로운 HTML 문서를 요청
- 페이지마다 별도의 문서 로딩이 발생할 수 있음

## 3. Client-Side Routing

- 브라우저에서 URL 경로에 따라 표시할 컴포넌트를 결정하는 방식
- 전체 문서 새로고침 없이 화면 전환 가능
- Browser History API 등을 활용하여 URL과 화면 상태를 동기화

## 4. React Router

- React 애플리케이션의 Routing을 관리하는 라이브러리
- URL 경로에 따라 컴포넌트를 렌더링
- 페이지 이동, URL Parameter, 중첩 라우팅 등을 지원

## 5. SPA Routing 주의사항

- SPA에서도 API 요청 및 리소스 로딩은 발생할 수 있음
- URL 직접 접근 또는 새로고침 시 서버의 적절한 경로 처리 필요
- 브라우저의 뒤로 가기와 앞으로 가기 동작도 고려해야 함

## Summary

- SPA: 하나의 HTML 문서를 기반으로 UI 전환
- MPA: 일반적으로 페이지 이동 시 새로운 HTML 문서 요청
- Client-Side Routing: 브라우저에서 URL에 맞는 컴포넌트 결정
- React Router: React에서 Routing을 구현하기 위한 라이브러리
