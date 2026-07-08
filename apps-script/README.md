# Apps Script backend

`Code.gs`는 구글 시트를 데이터 저장소로 사용하는 웹앱 백엔드입니다. 시트의 `Todos` 탭에 `id, title, status, createdAt, dueDate, completedAt, cancelledAt, locationAddress, locationLat, locationLng, updatedAt` 컬럼을 사용합니다(시트나 헤더가 없으면 최초 요청 시 자동 생성됩니다).

## 배포 방법

1. 데이터를 저장할 구글 시트를 새로 만들거나 기존 시트를 엽니다.
2. 메뉴에서 확장 프로그램 → Apps Script를 엽니다.
3. 기본 `Code.gs`의 내용을 이 폴더의 [Code.gs](Code.gs) 내용으로 교체합니다.
4. 프로젝트 설정에서 `appsscript.json`을 이 폴더의 [appsscript.json](appsscript.json) 내용으로 맞춥니다 (매니페스트 파일 보기 옵션 활성화 필요).
5. 배포 → 새 배포 → 유형 선택에서 "웹 앱"을 선택합니다.
   - 실행 계정: 나(배포하는 사용자)
   - 액세스 권한: 모든 사용자
6. 배포 후 발급되는 웹 앱 URL을 복사합니다. 이 URL을 프런트엔드의 `VITE_APPS_SCRIPT_URL` 환경변수로 사용합니다.

## 동작 확인

```bash
# 전체 목록 조회
curl "<웹앱 URL>"

# 할 일 생성
curl -X POST "<웹앱 URL>" \
  -H "Content-Type: text/plain;charset=utf-8" \
  -d '{"action":"create","todo":{"id":"test-1","title":"테스트","status":"in_progress","createdAt":"2026-01-01T00:00:00.000Z","dueDate":null,"completedAt":null,"cancelledAt":null,"locationAddress":null,"locationLat":null,"locationLng":null,"updatedAt":"2026-01-01T00:00:00.000Z"}}'

# 할 일 삭제
curl -X POST "<웹앱 URL>" \
  -H "Content-Type: text/plain;charset=utf-8" \
  -d '{"action":"delete","id":"test-1"}'
```

코드를 수정한 뒤에는 배포 → 배포 관리에서 기존 배포를 "편집"하고 새 버전을 선택해 저장해야 웹 앱 URL이 최신 코드로 갱신됩니다.
