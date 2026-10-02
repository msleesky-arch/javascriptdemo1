# JS Lab

HTML, CSS, JavaScript와 20개 라이브러리로 만든 30가지 인터랙티브 데모입니다.

## 실행

`index.html`을 더블 클릭해 브라우저에서 열면 됩니다. 라이브러리는 `vendor` 폴더에 포함되어 인터넷 연결이나 설치가 필요하지 않습니다. 공식 문서 링크는 인터넷 연결이 필요합니다.

로컬 서버를 원한다면 이 폴더에서 `python -m http.server 5173`을 실행한 뒤 `http://localhost:5173`을 엽니다.

## 파일

- `index.html`: 화면 구조와 라이브러리 로딩
- `style.css`: 반응형 디자인
- `app.js`: 검색, 분류, 30개 데모와 예시 코드
- `vendor/`: 버전을 고정해 저장한 라이브러리, CSS, 원본 URL 목록
- `download-libs.py`: 라이브러리 파일을 다시 받는 선택적 도구

## 기능 목록

| 번호 | 기능 | 라이브러리 |
|---|---|---|
| 01–03 | 막대, 라인, 도넛 차트 | Chart.js |
| 04–05 | 스프링, 순차 애니메이션 | Anime.js |
| 06–07 | 타임라인, 텍스트 등장 | GSAP |
| 08 | 드래그 및 키보드 정렬 | SortableJS |
| 09 | 마크다운 에디터 | Marked, DOMPurify |
| 10 | 코드 하이라이트 | Highlight.js |
| 11 | 유연한 검색 | Fuse.js |
| 12–13 | 날짜 포맷, D-day | Day.js |
| 14–15 | 중복 제거, 그룹화 | Lodash |
| 16–17 | CSV/JSON 변환 및 다운로드 | Papa Parse |
| 18 | QR 코드 | QRCode.js |
| 19 | 바코드 | JsBarcode |
| 20–21 | 수식 계산, 단위 변환 | Math.js |
| 22–23 | 색상 팔레트, 대비 확인 | Chroma.js |
| 24 | 축하 효과 | Canvas Confetti |
| 25 | 알림과 확인 | SweetAlert2 |
| 26 | 날짜 범위 달력 | Flatpickr |
| 27 | HTML 정리 | DOMPurify |
| 28 | 텍스트 압축 및 복원 | LZ-String |
| 29 | UUID 생성 및 복사 | UUID |
| 30 | 랜덤 팀 추첨 | Lodash |

입력 데이터는 브라우저에서 처리하며 서버에 보내지 않습니다. 실험 결과는 페이지를 새로고침하면 초기화됩니다. GSAP 등 외부 라이브러리를 다른 제품에 재사용하는 경우 해당 라이브러리의 라이선스를 확인하세요. 버전별 원본 URL은 `vendor/sources.json`에 기록되어 있습니다.
