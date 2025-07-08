# ReturnZone Frontend

분실물 찾기 플랫폼의 프론트엔드 애플리케이션입니다.

## 환경 설정

프로젝트를 실행하기 전에 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음 환경변수들을 설정해주세요:

```env
# API Configuration
VITE_API_BASE_URL=https://15.164.234.32.nip.io
VITE_API_TIMEOUT=10000
VITE_API_RETRY_COUNT=3

# WebSocket Configuration
VITE_WS_BASE_URL=ws://15.164.234.32:8080

# Development Settings
VITE_DEBUG_MODE=false
VITE_ENABLE_MOCK_DATA=false
```

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

## 주요 기능

- 분실물 등록 및 조회
- 카테고리별 필터링
- 위치 기반 검색
- 실시간 채팅
- 지도 연동

## 기술 스택

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- WebSocket

## API 연동

이 프로젝트는 다음 API 서버와 연동됩니다:

- REST API: `https://15.164.234.32.nip.io`
- WebSocket: `ws://15.164.234.32:8080`

API 서비스는 `src/services/apiService.js`에서 관리되며, 다음 기능들을 제공합니다:

- 분실물 CRUD 조작
- 카테고리 및 위치 기반 검색
- 채팅 및 메시지 관리
- 사용자 인증
- 파일 업로드
