# CLAUDE.md
- 문서의 내용은 반드시 지켜야함. 참고사항이 아님 
## 기술 스택
- **빌드 도구**: Vite
- **언어**: JavaScript (TypeScript 아님)
- **스타일링**: Tailwind CSS v4
- **상태 관리**: Zustand (persist, immer 사용)
- **서버 통신**: Axios
- **라우터**: router V7
## 라우팅 구조
- `MainPage` 하나를 레이아웃으로 둔다.
- 공통 `Header`를 삽입한다.
- Header에 있는 메뉴를 누르면 `<Outlet />`을 이용해 페이지를 전환한다.
- 로그인은 독립 페이지로 구성한다.
## 폴더 구조
- `pages` — view 컴포넌트
- `service` — 비즈니스 로직
- `api` — API 통신 모듈
- `store` — Zustand 설정 및 구현
- `router` — 라우팅 관련 코드

## 예제 데이터
- assets/mock 폴더 하위에 예제데이터 위치 

## 작업 규칙
- 내가 쓴 내용 외에 임의로 추가하지 말 것.
- 에이전트 판단으로 코드를 작성하지 말 것.
- 코드 구현 시 이미 개발된 코드는 수정을 최소화할 것.