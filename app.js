'use strict';
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const categories = [
  ['전체', '◫'],
  ['데이터 시각화', '▥'],
  ['모션 & 인터랙션', '✳'],
  ['텍스트 & 에디터', '✎'],
  ['데이터 & 유틸리티', '⌘'],
  ['UI 컴포넌트', '◇']
];

const demos = [
  {
    id: 'chart',
    lib: 'Chart.js',
    title: '인터랙티브 멀티 차트',
    category: '데이터 시각화',
    desc: '막대, 꺾은선, 도넛, 파이 차트를 자유롭게 전환하고 실시간 데이터를 시각화합니다.',
    bestFor: '대시보드 통계, 매출 분석 리포트, 방문자 추이 그래프 구현 시',
    useCases: [
      'SaaS 관리자 대시보드의 실시간 매출·가입자·트래픽 지표 시각화',
      '가계부 및 자산 관리 서비스의 지출 카테고리 비중(도넛 차트) 분석',
      '피트니스/헬스케어 앱의 일별 운동량 및 체중 변화 추이 그래프'
    ],
    pros: 'HTML5 Canvas 기반 고성능 렌더링, 반응형 자동 크기 조절, 8가지 기본 차트 내장',
    tip: '대량의 데이터(수만 개 포인트)를 다룰 때는 decimation 플러그인이나 다운샘플링을 적용하면 훨씬 부드럽습니다.',
    art: 'bars',
    code: `const chart = new Chart(canvas, {
  type: 'bar', // 'bar' | 'line' | 'doughnut' | 'pie'
  data: {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [{
      label: '방문자 수',
      data: [120, 190, 140, 250, 220, 310, 280],
      backgroundColor: '#98b965'
    }]
  },
  options: { responsive: true, maintainAspectRatio: false }
});`,
    docs: 'https://www.chartjs.org/docs/latest/'
  },
  {
    id: 'anime',
    lib: 'Anime.js',
    title: '스프링 & 스태거 모션',
    category: '모션 & 인터랙션',
    desc: '부드러운 스프링 물리 Easing과 순차 지연(Stagger) 효과로 생동감 넘치는 인터랙션을 만듭니다.',
    bestFor: '버튼 클릭 반응, 마이크로 인터랙션, 로딩 스피너 및 리스트 순차 등장 시',
    useCases: [
      '장바구니 담기 클릭 시 아이콘이 튕기거나 숫자가 올라가는 인터랙티브 피드백',
      '화면 진입 시 카드 목록들이 0.1초 간격으로 통통 튀며 순차 등장하는 스태거 효과',
      'SVG 경로(Path) 모핑 및 로딩 애니메이션 구현'
    ],
    pros: '17KB의 가벼운 용량, CSS 속성·SVG·JS 객체 수치 모두 제어 가능, 직관적인 스프링 물리 공식',
    tip: '동일 요소에 새로운 애니메이션을 트리거하기 전 anime.remove(targets)를 호출하면 모션 충돌을 방지할 수 있습니다.',
    art: 'dots',
    code: `anime({
  targets: '.orb',
  translateY: [-30, 0],
  scale: [0.8, 1],
  delay: anime.stagger(100), // 순차 지연
  easing: 'spring(1, 80, 10, 0)', // 탄성 물리
  duration: 1000
});`,
    docs: 'https://animejs.com/'
  },
  {
    id: 'gsap',
    lib: 'GSAP',
    title: '타임라인 시퀀스 모션',
    category: '모션 & 인터랙션',
    desc: '여러 모션 단계를 하나의 타임라인으로 엮어 재생, 일시정지, 역재생을 정밀하게 제어합니다.',
    bestFor: '브랜드 프로모션 랜딩 페이지, 복잡한 시퀀스 애니메이션, 인터랙티브 웹사이트 제작 시',
    useCases: [
      '애플이나 토스 스타일의 고급 프로모션 페이지 스크롤 스토리텔링',
      '오브젝트 이동 → 회전 → 텍스트 등장 등 여러 애니메이션이 정밀하게 맞물리는 시퀀스 연출',
      '재생, 일시정지, 역재생(Reverse), 진행률 바(Seek)를 제어하는 모션 플레이어'
    ],
    pros: '웹 애니메이션 업계 표준, 브라우저 60fps 하드웨어 가속 최적화, 정밀한 타임라인(Timeline) 제어',
    tip: 'ScrollTrigger 플러그인과 결합하면 스크롤 위치에 맞춰 완벽하게 동작하는 패럴랙스 웹을 만들 수 있습니다.',
    art: 'dots',
    code: `const tl = gsap.timeline({ repeat: -1, yoyo: true });
tl.to('.box', { x: 200, duration: 0.8, ease: 'power2.out' })
  .to('.box', { rotation: 180, scale: 1.2, duration: 0.5 })
  .fromTo('.letters span', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.05 });`,
    docs: 'https://gsap.com/docs/v3/'
  },
  {
    id: 'sortable',
    lib: 'SortableJS',
    title: '드래그 앤 드롭 카드 정렬',
    category: '모션 & 인터랙션',
    desc: '마우스와 모바일 터치 제스처를 모두 지원하는 부드러운 순서 재정렬 기능을 구현합니다.',
    bestFor: '할 일 목록(Todo), 칸반 보드, 이미지 업로드 순서 변경, 대시보드 위젯 재배치 시',
    useCases: [
      '트렐로(Trello)나 노션 스타일의 카드 드래그 앤 드롭 칸반 보드',
      '쇼핑몰 상품 상세 이미지 업로드 후 대표 사진 순서 변경 UI',
      '사용자 맞춤형 대시보드 위젯 순서 및 메뉴 즐겨찾기 재배치'
    ],
    pros: 'jQuery 등 외부 종속성 없는 순수 바닐라JS, 스마트폰 터치 제스처 완벽 지원, 부드러운 애니메이션 내장',
    tip: 'onEnd 콜백에서 변경된 DOM 순서를 가져와 API나 로컬스토리지에 저장하면 정렬 상태가 유지됩니다.',
    art: 'list',
    code: `Sortable.create(document.getElementById('list'), {
  animation: 180,
  ghostClass: 'sortable-ghost',
  onEnd: (evt) => {
    console.log('이동 전:', evt.oldIndex, '→ 이동 후:', evt.newIndex);
  }
});`,
    docs: 'https://sortablejs.github.io/Sortable/'
  },
  {
    id: 'marked',
    lib: 'Marked',
    title: '실시간 마크다운 에디터',
    category: '텍스트 & 에디터',
    desc: '입력한 마크다운 문법을 밀리초 단위로 초고속 파싱하여 깔끔한 HTML로 즉시 변환합니다.',
    bestFor: '노션/벨로그 스타일 마크다운 작성기, AI 챗봇의 마크다운 응답 실시간 표시 시',
    useCases: [
      'ChatGPT, Gemini 등 생성형 AI 챗봇이 스트리밍으로 출력하는 텍스트 렌더링',
      '개발자 블로그, 사내 위키, Q&A 게시판의 마크다운 입력 & 실시간 미리보기',
      'GitHub README 및 제품 릴리즈 노트 뷰어 UI'
    ],
    pros: '초경량·초고속 파싱 속도, GitHub Flavored Markdown(GFM) 지원, 파서 커스텀 확장성',
    tip: '사용자 입력 마크다운을 innerHTML로 넣을 때는 반드시 DOMPurify.sanitize()로 소독하여 XSS 해킹을 방지하세요.',
    art: 'code',
    code: `import { marked } from 'marked';
import DOMPurify from 'dompurify';

const rawHtml = marked.parse('# 제목\\n**굵은 글씨**와 [링크](https://...)');
const safeHtml = DOMPurify.sanitize(rawHtml);
previewElement.innerHTML = safeHtml;`,
    docs: 'https://marked.js.org/'
  },
  {
    id: 'highlight',
    lib: 'Highlight.js',
    title: '다국어 코드 구문 강조',
    category: '텍스트 & 에디터',
    desc: 'JavaScript, Python, HTML, CSS, SQL, JSON 등 다양한 언어의 소스코드를 알록달록하게 시각화합니다.',
    bestFor: '기술 블로그, 프로그래밍 강의 사이트, AI 코딩 비서의 코드 스니펫 가독성 개선 시',
    useCases: [
      '개발자 기술 블로그 및 오픈소스 프로젝트 문서의 코드 블록 구문 강조',
      'AI 코딩 어시스턴트 서비스에서 생성된 코드 출력창',
      '사내 코드 리뷰 도구 및 코드 스니펫 공유 웹 서비스'
    ],
    pros: '190개 이상의 프로그래밍 언어 지원, 언어 자동 감지(Auto-detection), 다양한 미려한 CSS 테마',
    tip: '특정 언어만 쓰는 서비스라면 해당 언어 서브셋만 번들링하여 라이브러리 용량을 크게 줄일 수 있습니다.',
    art: 'code',
    code: `// 특정 언어 지정 강조
const result = hljs.highlight(codeString, { language: 'javascript' }).value;
codeElement.innerHTML = result;

// 또는 DOM 요소 자동 강조
hljs.highlightElement(codeElement);`,
    docs: 'https://highlightjs.org/'
  },
  {
    id: 'fuse',
    lib: 'Fuse.js',
    title: '오타 허용 퍼지 검색 엔진',
    category: '데이터 & 유틸리티',
    desc: '정확한 철자가 아니거나 오타가 있어도 유사도를 계산하여 원하는 결과를 똑똑하게 찾아냅니다.',
    bestFor: '서버 요청 없이 브라우저에서 문서, 제품 카탈로그, 전역 검색창(⌘K)을 만들 때',
    useCases: [
      '전역 검색창(Command Palette, ⌘K)에서 기능 및 메뉴 즉시 검색',
      '이커머스 상품명 오타 허용 검색 (예: "githb" → "github", "삼송" → "삼성")',
      '주소록, 자주 묻는 질문(FAQ), 태그 자동완성 필터링'
    ],
    pros: '서버 비용 0원(100% 클라이언트 연산), 복수 필드 검색 및 가중치(weights) 설정 지원',
    tip: 'threshold 값을 0.2~0.4 사이로 설정하면 너무 엉뚱한 결과 없이 적절한 오타 허용 검색이 완성됩니다.',
    art: 'search',
    code: `const fuse = new Fuse(books, {
  keys: ['title', 'author', 'tags'],
  threshold: 0.35 // 0.0 (완전일치) ~ 1.0 (모두일치)
});

const results = fuse.search('markdwn'); // 오타가 있어도 검색 성공!`,
    docs: 'https://www.fusejs.io/'
  },
  {
    id: 'dayjs',
    lib: 'Day.js',
    title: '날짜 포맷팅 & D-day 계산기',
    category: '데이터 & 유틸리티',
    desc: 'Moment.js를 대체하는 2KB 초경량 라이브러리로 날짜 변환, D-day 계산, 시간 연산을 손쉽게 처리합니다.',
    bestFor: '게시글 "방금 전/3시간 전" 표시, 마감일 D-day 계산, 국가별 날짜 포맷 변환 시',
    useCases: [
      'SNS 및 커뮤니티 게시글/댓글의 등록 시간 표시 ("방금 전", "3일 전")',
      '시험, 프로젝트 런칭, 이벤트 마감 디데이(D-Day) 카운트다운',
      '결제일, 정기 구독 갱신일, 배송 예정일(+3일) 등 날짜 덧셈/뺄셈 연산'
    ],
    pros: 'Moment.js와 100% 호환되는 익숙한 API, 단 2KB의 초경량 크기, 불변 객체(Immutable) 설계',
    tip: '상대 시간("3시간 전")이나 한글 요일을 표시하려면 relativeTime 플러그인과 ko 로케일을 불러와 사용하세요.',
    art: 'date',
    code: `// 포맷 변환
dayjs().format('YYYY년 MM월 DD일 HH:mm');

// D-day 계산
const target = dayjs('2026-12-31');
const diffDays = target.diff(dayjs(), 'day'); // 남은 일수

// 날짜 연산
const nextWeek = dayjs().add(7, 'day').format('YYYY-MM-DD');`,
    docs: 'https://day.js.org/'
  },
  {
    id: 'lodash',
    lib: 'Lodash',
    title: '모던 데이터 정제 유틸리티',
    category: '데이터 & 유틸리티',
    desc: '배열 중복 제거, 키 기준 그룹화, 무작위 셔플 및 조 편성 등 자바스크립트 데이터 가공을 단순화합니다.',
    bestFor: '복잡한 API 응답 데이터 가공, 검색창 입력 디바운싱(Debounce), 대량 데이터 필터링 시',
    useCases: [
      '검색창 입력 시 매 타자마다 API를 호출하지 않도록 제어하는 `_.debounce`',
      '회원 목록을 부서별·등급별로 묶어주는 `_.groupBy` 및 중복 제거 `_.uniq`',
      '이벤트 추첨 및 워크숍 팀 빌딩을 위한 무작위 셔플 `_.shuffle` & 청크 `_.chunk`'
    ],
    pros: '완벽하게 검증된 내부 최적화 알고리즘, 크로스 브라우징 완벽 지원, 직관적인 메서드 명명',
    tip: '현대 JS 환경에서는 필요한 함수만 개별 import (예: import debounce from "lodash/debounce")하면 번들 크기를 절약할 수 있습니다.',
    art: 'list',
    code: `// 1. 중복 제거 및 정렬
const uniqueSorted = _.sortBy(_.uniq([5, 2, 8, 2, 5, 1]));

// 2. 그룹화
const byTeam = _.groupBy(users, 'team');

// 3. 랜덤 팀 편성 (셔플 후 2명씩 묶기)
const teams = _.chunk(_.shuffle(members), 2);`,
    docs: 'https://lodash.com/docs/4.17.21'
  },
  {
    id: 'papa',
    lib: 'Papa Parse',
    title: 'CSV ↔ JSON 변환 및 다운로드',
    category: '데이터 & 유틸리티',
    desc: '대용량 CSV 파일도 웹 워커로 부드럽게 파싱하고, 한글 깨짐 없는 엑셀 호환 CSV 파일로 내보냅니다.',
    bestFor: '엑셀 데이터 웹 업로드, 관리자 페이지 목록 엑셀(CSV) 다운로드 기능 구현 시',
    useCases: [
      '관리자 페이지에서 주문 내역, 회원 명단을 엑셀용 CSV 파일로 원클릭 다운로드',
      '사용자가 업로드한 수만 행의 엑셀 CSV 파일을 브라우저에서 즉시 테이블/차트로 변환',
      '쉼표, 따옴표, 줄바꿈이 뒤섞인 복잡한 표 데이터를 안전하게 상호 변환'
    ],
    pros: '대용량 파일 스트리밍 지원, 특수문자 완벽 파싱, 브라우저 환경에 최적화된 초고속 성능',
    tip: '한국어 엑셀에서 CSV를 열 때 글자가 깨지지 않으려면 파일 내용 맨 앞에 UTF-8 BOM(\\uFEFF)을 추가하세요.',
    art: 'code',
    code: `// 1. CSV -> JSON 파싱
const { data, errors } = Papa.parse(csvString, { header: true });

// 2. JSON -> CSV 변환
const csv = Papa.unparse(jsonData);

// 3. 한글 깨짐 방지 다운로드 (BOM 추가)
const blob = new Blob(['\\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });`,
    docs: 'https://www.papaparse.com/docs'
  },
  {
    id: 'qrcode',
    lib: 'QRCode.js',
    title: 'QR 코드 생성기 (한글 지원)',
    category: 'UI 컴포넌트',
    desc: 'URL이나 텍스트를 스캔 가능한 QR 이미지로 즉시 생성하며, 한글(UTF-8)과 크기/오류복원 설정을 지원합니다.',
    bestFor: '모바일 결제 QR, Wi-Fi 접속, 모바일 티켓, PC 화면을 모바일로 넘겨줄 때',
    useCases: [
      'PC 웹사이트 접속 유저에게 모바일 앱 다운로드 링크 바로 건네기',
      '오프라인 매장 테이블 주문 QR 및 Wi-Fi 원터치 자동 연결 QR 안내문 생성',
      '2단계 인증(Google Authenticator) OTP 등록 키 및 모바일 입장권 발권'
    ],
    pros: '외부 서버 호출 없는 100% 클라이언트 로컬 렌더링, 4단계 오류 복원 레벨(L/M/Q/H) 지원',
    tip: '한글 등 유니코드 텍스트를 변환할 때는 unescape(encodeURIComponent(text)) 처리를 거쳐야 오류 없이 인식됩니다.',
    art: 'qr',
    code: `// 한글 UTF-8 인코딩 처리 후 생성
const safeText = unescape(encodeURIComponent('안녕하세요! https://example.com'));
new QRCode(containerElement, {
  text: safeText,
  width: 180,
  height: 180,
  correctLevel: QRCode.CorrectLevel.M
});`,
    docs: 'https://github.com/davidshimjs/qrcodejs'
  },
  {
    id: 'barcode',
    lib: 'JsBarcode',
    title: '표준 1D 바코드 생성기',
    category: 'UI 컴포넌트',
    desc: 'CODE128, EAN, CODE39 등 산업 표준 바코드를 SVG/Canvas로 선명하게 생성합니다.',
    bestFor: '물류 재고 관리, 영수증, 택배 송장, 편의점 바코드 스캐너 연동 시스템 구축 시',
    useCases: [
      '물류 창고 입출고 상품 라벨 및 재고 일련번호 바코드 출력',
      '온라인 쇼핑몰 주문 영수증 및 택배 운송장 번호 바코드 생성',
      '모바일 멤버십 카드 바코드 및 쿠폰 바코드 스캔 화면'
    ],
    pros: 'SVG 벡터 포맷 지원으로 확대/인쇄 시에도 깨짐 없음, 다양한 바코드 규격(CODE128, EAN13 등) 지원',
    tip: 'CODE128은 영문 대소문자, 숫자, 기호만 지원하므로 사용자 입력 시 한글이 포함되지 않도록 유효성 검사를 두는 것이 좋습니다.',
    art: 'barcode',
    code: `JsBarcode('#barcode', 'PRD-2026-X89', {
  format: 'CODE128',
  width: 2,
  height: 70,
  displayValue: true,
  fontSize: 16,
  margin: 10
});`,
    docs: 'https://github.com/lindell/JsBarcode'
  },
  {
    id: 'math',
    lib: 'Math.js',
    title: '수학 수식 파서 & 단위 변환기',
    category: '데이터 & 유틸리티',
    desc: '복잡한 수학 수식을 파싱하여 계산하고, 길이·무게·온도 등 단위 변환을 손쉽게 수행합니다.',
    bestFor: '공학용 계산기, 사용자 정의 수식 평가기, 해외 이커머스 단위 자동 변환기 구현 시',
    useCases: [
      '웹 기반 공학용 계산기 및 삼각함수, 루트, 로그 수식 평가',
      '해외 직구 이커머스의 단위 자동 변환 (인치 ↔ cm, 파운드 ↔ kg, 화씨 ↔ 섭씨)',
      '자바스크립트의 기본 부동소수점 오차(0.1 + 0.2 = 0.30000000000000004) 없는 정밀 계산'
    ],
    pros: '문자열 수식 직접 평가(evaluate), 방대한 물리 단위 변환 내장, 행렬 및 복소수 지원',
    tip: '사용자 입력을 evaluate()에 넘길 때는 scope를 제한하거나 AST 파싱 검증을 거치면 보안상 더욱 안전합니다.',
    art: 'math',
    code: `// 1. 수식 계산
const result = math.evaluate('sqrt(144) + 2^3 + sin(45 deg)'); // 20.707...

// 2. 단위 변환
const converted = math.unit('100 cm').to('m').toString(); // "1 m"
const temp = math.unit('25 degC').to('degF').toString(); // "77 degF"`,
    docs: 'https://mathjs.org/docs/'
  },
  {
    id: 'chroma',
    lib: 'Chroma.js',
    title: '컬러 팔레트 & 웹 접근성 진단기',
    category: '데이터 시각화',
    desc: '인간의 시각에 자연스러운 LCH 색공간으로 그라데이션 팔레트를 만들고, WCAG 명도 대비율을 검사합니다.',
    bestFor: '데이터 시각화 히트맵 배색, 디자인 시스템 컬러 스케일 자동 생성, 웹 접근성 가독성 검사 시',
    useCases: [
      '지도 히트맵이나 통계 차트에서 데이터 수치에 따른 부드러운 그라데이션 색상 스케일 생성',
      '배경색과 텍스트 색상의 명도 대비율(Contrast Ratio)을 검사해 WCAG 4.5:1 합격 여부 판정',
      '메인 브랜드 컬러로부터 다크 모드/라이트 모드용 5단계 명도 팔레트 자동 생성'
    ],
    pros: 'LCH/LAB 색공간 지원으로 왜곡 없는 색상 보간, 색공간 상호 변환(HEX, RGB, HSL, LAB) 탁월',
    tip: 'RGB 대신 mode("lch")를 사용해 스케일을 생성하면 중간 단계에서 칙칙한 회색 톤이 생기지 않고 선명합니다.',
    art: 'palette',
    code: `// 1. 그라데이션 색상 팔레트 생성
const colors = chroma.scale(['#284937', '#d5f087']).mode('lch').colors(5);

// 2. 웹 접근성 명도 대비율 검사 (WCAG 기준)
const ratio = chroma.contrast('#eaf1df', '#293825'); // 9.87 : 1 (통과!)`,
    docs: 'https://gka.github.io/chroma.js/'
  },
  {
    id: 'confetti',
    lib: 'Canvas Confetti',
    title: '축하 폭죽 & 파티클 효과',
    category: '모션 & 인터랙션',
    desc: 'HTML5 Canvas를 활용하여 렉 없이 부드럽게 화면을 채우는 축하 꽃가루 폭죽 효과를 연출합니다.',
    bestFor: '회원가입 완료, 결제 성공, 퀘스트/퀴즈 정답 등 성취감과 도파민을 주는 순간',
    useCases: [
      '서비스 결제 완료 또는 장바구니 주문 성공 축하 연출',
      '게이미피케이션 플랫폼의 레벨업, 뱃지 획득, 퀴즈 정답 시각적 보상',
      '설문 조사 제출 완료 및 신년/연말 프로모션 이벤트 효과'
    ],
    pros: '초당 60프레임 하드웨어 가속 Canvas 렌더링, 파티클 수·각도·스프레드·색상 완벽 커스텀',
    tip: '모달 다이얼로그 안에서 띄울 때는 confetti.create(customCanvas)로 모달 내부 캔버스에 바인딩하면 모달에 가려지지 않습니다.',
    art: 'confetti',
    code: `// 중앙에서 펑 터지는 축하 폭죽
confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 }
});

// 양쪽 대포 모드
confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });`,
    docs: 'https://github.com/catdad/canvas-confetti'
  },
  {
    id: 'swal',
    lib: 'SweetAlert2',
    title: '모던 반응형 알림 팝업',
    category: 'UI 컴포넌트',
    desc: '브라우저의 투박한 alert/confirm을 대체하는 세련된 성공, 경고, 확인, 입력 대화상자입니다.',
    bestFor: '중요한 데이터 삭제 전 "정말 진행할까요?" 확인, 예쁜 결과 피드백, 인라인 입력 팝업 시',
    useCases: [
      '게시글이나 프로젝트 삭제 전 사용자의 실수를 막는 재확인(Confirm) 다이얼로그',
      '작업 완료 시 초록 체크 애니메이션과 함께 피드백을 전달하는 성공 팝업',
      '별도 페이지 이동 없이 팝업 안에서 비밀번호나 사유를 입력받는 프롬프트 창'
    ],
    pros: 'Promise 기반 깔끔한 비동기 문법, 반응형 자동 중앙 정렬, 내장된 아름다운 아이콘 애니메이션',
    tip: 'Swal.fire()는 Promise를 반환하므로 const { isConfirmed } = await Swal.fire(...) 형태로 깔끔하게 후속 처리를 연결할 수 있습니다.',
    art: 'alert',
    code: `// 1. 확인/취소 질문창
const result = await Swal.fire({
  title: '변경 사항을 저장할까요?',
  text: '저장하지 않으면 수정 내용이 사라집니다.',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: '저장하기',
  cancelButtonText: '취소',
  confirmButtonColor: '#688c42'
});

if (result.isConfirmed) {
  Swal.fire('저장 완료!', '안전하게 저장되었습니다.', 'success');
}`,
    docs: 'https://sweetalert2.github.io/'
  },
  {
    id: 'flatpickr',
    lib: 'Flatpickr',
    title: '경량 인터랙티브 달력 선택기',
    category: 'UI 컴포넌트',
    desc: '브라우저 기본 date input의 한계를 넘어 단일 날짜 및 여행/예약 기간(Range)을 우아하게 선택합니다.',
    bestFor: '숙박/항공/렌터카 예약 기간 선택, 대시보드 조회 기간 필터, 배송 희망일 지정 시',
    useCases: [
      '호텔/항공권 예약 서비스의 입실일-퇴실일 범위(Date Range) 선택 및 박수 자동 계산',
      '관리자 페이지의 데이터 조회 기간(최근 7일, 이번 달 등) 설정 캘린더',
      '배송 불가일(공휴일/주말) 비활성화 기능이 포함된 배송 지정일 캘린더'
    ],
    pros: '외부 종속성 0%, 15KB 미만의 초경량, 모바일/데스크톱 모두 쾌적한 UX, 다양한 내장 테마',
    tip: 'mode: "range" 옵션을 주면 두 번의 클릭으로 기간을 바로 지정할 수 있으며, onChange 이벤트로 선택 일수를 즉시 계산할 수 있습니다.',
    art: 'date',
    code: `flatpickr('#date-range', {
  mode: 'range',
  dateFormat: 'Y-m-d',
  defaultDate: ['2026-10-10', '2026-10-15'],
  onChange: (selectedDates) => {
    if (selectedDates.length === 2) {
      console.log('선택된 기간:', selectedDates[0], '~', selectedDates[1]);
    }
  }
});`,
    docs: 'https://flatpickr.js.org/'
  },
  {
    id: 'purify',
    lib: 'DOMPurify',
    title: 'XSS 방지 HTML 보안 소독기',
    category: '텍스트 & 에디터',
    desc: '악의적인 스크립트 실행 코드(<script>, onerror= 등)를 무력화하고 안전한 HTML 태그만 남겨 화면을 보호합니다.',
    bestFor: '위지윅 리치 에디터 본문 출력, 마크다운 렌더링, 외부 API HTML 데이터 표시 시',
    useCases: [
      '네이버/티스토리 스타일 서식 있는 에디터에서 작성된 게시글을 innerHTML로 안전하게 삽입',
      'Marked 마크다운 변환 결과물에 삽입될 수 있는 악성 스크립트 원천 방어',
      '댓글이나 채팅 메시지에 볼드/링크 태그는 허용하면서 해킹 공격(쿠키 탈취 등) 차단'
    ],
    pros: '웹 보안 업계 표준이자 사실상의 정답, 브라우저 DOM 파서를 활용해 우회 공격 완벽 차단',
    tip: '특정 태그나 속성만 허용하고 싶다면 ALLOWED_TAGS 또는 ALLOWED_ATTR 옵션으로 화이트리스트를 정밀하게 구성할 수 있습니다.',
    art: 'code',
    code: `const dirty = '<p>안전한 문장</p><img src="x" onerror="alert(document.cookie)">';
const clean = DOMPurify.sanitize(dirty);
// 결과: '<p>안전한 문장</p><img src="x">' (위험한 onerror 이벤트 핸들러만 정확히 제거!)
container.innerHTML = clean;`,
    docs: 'https://github.com/cure53/DOMPurify'
  },
  {
    id: 'lz',
    lib: 'LZ-String',
    title: '고효율 텍스트 압축 & 복원기',
    category: '텍스트 & 에디터',
    desc: '긴 텍스트 문자열을 최대 70~90% 크기로 줄여 LocalStorage 용량을 절약하고 URL 공유 링크를 만듭니다.',
    bestFor: '5MB 용량 제한이 있는 LocalStorage 캐싱, 긴 상태 데이터를 URL 해시로 공유할 때',
    useCases: [
      '브라우저 localStorage / sessionStorage(5MB 제한)에 대량의 오프라인 캐시 데이터 저장',
      '웹 그래픽 툴(캔버스 상태, 마인드맵, 다이어그램)의 세이브 데이터를 URL 해시로 공유',
      '웹소켓이나 API 통신 시 텍스트 페이로드 크기를 줄여 네트워크 비용 절감'
    ],
    pros: 'UTF-16 및 URL-Safe Base64 포맷 지원, 서버 없이 클라이언트 100% 압축/복원, 빠른 연산 속도',
    tip: 'URL 주소에 담아 공유할 때는 compressToEncodedURIComponent()를 사용하면 URL 인코딩 문제 없이 안전하게 전달됩니다.',
    art: 'code',
    code: `// 1. 문자열 압축 (Base64)
const compressed = LZString.compressToBase64(longText);

// 2. 원본으로 복원
const restored = LZString.decompressFromBase64(compressed);
console.log('일치 여부:', longText === restored);`,
    docs: 'https://pieroxy.net/blog/pages/lz-string/index.html'
  },
  {
    id: 'uuid',
    lib: 'UUID',
    title: 'RFC4122 v4 고유 식별자 생성기',
    category: '데이터 & 유틸리티',
    desc: '전 세계 어디서도 절대 중복되지 않는 128비트 범용 고유 식별자(UUID v4)를 생성하고 유효성을 검증합니다.',
    bestFor: '클라이언트 임시 ID, 파일 업로드 세션 식별자, 결제 멱등성 키, 고유 키 부여 시',
    useCases: [
      'DB에 저장하기 전 프론트엔드 상태(장바구니 아이템, Todo 항목, 탭)에 고유 id 부여',
      '네트워크 중복 요청 방지 및 결제 멱등성(Idempotency Key) 헤더 생성',
      '클라우드(S3 등)에 업로드할 파일의 이름 충돌 방지를 위한 랜덤 고유 파일명 생성'
    ],
    pros: '암호학적 난수(crypto.getRandomValues) 기반으로 충돌 확률 0%, 국제 표준 RFC4122 규격',
    tip: '최신 브라우저에서는 crypto.randomUUID()를 기본 지원하므로, 구형 브라우저 호환이 필요한 프로젝트에서 uuid 라이브러리가 탁월합니다.',
    art: 'code',
    code: `// UUID v4 생성
const id = uuid.v4(); // 예: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

// 유효성 검증
const isValid = uuid.validate(id); // true`,
    docs: 'https://github.com/uuidjs/uuid'
  }
].map((item, index) => ({ ...item, num: index + 1 }));

let selected = '전체', query = '', cleanups = [], heroChart, currentTab = 'demo', activeDemo = null;

const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const fuse = new Fuse(demos, {
  keys: ['title', 'lib', 'desc', 'bestFor', 'category'],
  threshold: 0.35,
  ignoreLocation: true
});

function art(type) {
  if (type === 'bars') return '<div class="mini-bars">' + [28, 49, 38, 65, 52, 76, 45].map(h => `<i style="height:${h}px"></i>`).join('') + '</div>';
  if (type === 'line') return '<svg class="mini-line" viewBox="0 0 180 74" aria-hidden="true"><path d="M0 68 L25 43 L50 52 L80 18 L108 35 L135 10 L180 22 L180 74 L0 74" fill="#dce8c9"/><path d="M0 68 L25 43 L50 52 L80 18 L108 35 L135 10 L180 22" fill="none" stroke="#97b969" stroke-width="3"/></svg>';
  if (type === 'dots') return '<div class="mini-dots"><i></i><i></i><i></i><i></i></div>';
  if (type === 'palette') return '<div class="mini-palette">' + ['#273e35', '#567951', '#92b36e', '#c5da92', '#e5eec9'].map(c => `<i style="background:${c}"></i>`).join('') + '</div>';
  if (type === 'list') return '<div class="mini-list"><span>⠿ Plan</span><span>⠿ Build</span><span>⠿ Launch</span></div>';
  const labels = { search: '⌕ Find', date: 'OCT / 06', qr: '▦', barcode: '▥ ▥ ▥', math: 'ƒ(x)', confetti: '✦ ✧ ✦', alert: '✓ Alert' };
  return type === 'code' ? '<div class="mini-code">{ code: "clean" }</div>' : `<div class="mini-label" style="font-size:${type === 'qr' ? '70' : type === 'barcode' ? '42' : '26'}px">${labels[type] || 'JS'}</div>`;
}

function render() {
  const matches = query ? fuse.search(query).map(r => r.item) : demos;
  const items = matches.filter(d => selected === '전체' || d.category === selected);

  $('#cards').innerHTML = items.map(d => `
    <button class="card" data-demo="${d.id}" aria-label="${d.title} 체험하기">
      <div class="card-art ${['', 'art-purple', 'art-blue', 'art-peach', 'art-yellow'][categories.findIndex(c => c[0] === d.category) % 5]}">
        <span class="card-num">LIBRARY ${String(d.num).padStart(2, '0')}</span>
        <span class="card-tag">${d.category}</span>
        ${art(d.art)}
      </div>
      <div class="card-text">
        <h3>${d.title}</h3>
        <p>${d.desc}</p>
        <div class="card-use-hint">💡 ${escapeHTML(d.bestFor)}</div>
        <div class="card-bottom">
          <span class="library-tag">${d.lib}</span>
          <span class="try">체험 & 가이드 ↗</span>
        </div>
      </div>
    </button>
  `).join('');

  $('#empty').hidden = items.length > 0;
  $('#result-count').textContent = items.length;
  $('#section-title').firstChild.textContent = selected === '전체' ? '모든 라이브러리 ' : selected + ' ';

  $('#categories').innerHTML = categories.map(([c, icon]) => `
    <button data-category="${c}" class="${c === selected ? 'active' : ''}" ${c === selected ? 'aria-current="true"' : ''}>
      <span class="nav-symbol">${icon}</span>
      ${c === '전체' ? '전체 보기' : c}
      <span class="nav-count">${c === '전체' ? 20 : demos.filter(d => d.category === c).length}</span>
    </button>
  `).join('');

  $('#quick-filters').innerHTML = categories.map(([c]) => `
    <button data-category="${c}" aria-pressed="${selected === c}" class="${selected === c ? 'active' : ''}">
      ${c === '전체' ? '전체' : c}
    </button>
  `).join('');
}

function setCategory(c) {
  selected = c;
  render();
}

document.addEventListener('click', e => {
  const card = e.target.closest('[data-demo]');
  const cat = e.target.closest('[data-category]');
  if (card) openDemo(card.dataset.demo);
  if (cat) setCategory(cat.dataset.category);
});

$('#search').addEventListener('input', e => {
  query = e.target.value.trim();
  render();
});

$('#reset-search').onclick = () => {
  selected = '전체';
  query = '';
  $('#search').value = '';
  render();
};

document.addEventListener('keydown', e => {
  if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && !$('#demo-dialog').open) {
    e.preventDefault();
    $('#search').focus();
  }
});

// Featured Hero Chart
const colors = ['#98b965', '#c4d895', '#698e43', '#dce7c9', '#aaba88', '#7fa357', '#b5ce91'];
function makeChart(canvas, type, values = [12, 19, 14, 25, 20, 30, 22]) {
  return new Chart(canvas, {
    type,
    data: {
      labels: ['월', '화', '수', '목', '금', '토', '일'],
      datasets: [{
        label: '주간 실험 횟수',
        data: values,
        backgroundColor: type === 'line' ? '#b6cf8e44' : colors,
        borderColor: type === 'line' ? '#98b965' : '#fff',
        borderWidth: type === 'line' ? 2 : 0,
        borderRadius: 4,
        tension: 0.35,
        fill: type === 'line'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { color: '#a0a795', font: { size: 11 } } },
        y: { beginAtZero: true, border: { display: false }, grid: { color: '#edf0e7' }, ticks: { stepSize: 10, color: '#b1b6aa', font: { size: 10 } } }
      }
    }
  });
}

heroChart = makeChart($('#hero-chart'), 'bar');
document.querySelectorAll('[data-chart]').forEach(b => {
  b.onclick = () => {
    heroChart.destroy();
    heroChart = makeChart($('#hero-chart'), b.dataset.chart);
    document.querySelectorAll('[data-chart]').forEach(x => x.classList.toggle('active', x === b));
  };
});
$('#featured-open').onclick = () => openDemo('chart');

// Dialog Elements
const body = $('#demo-body');
function mount(html) { body.innerHTML = html; }
const input = (id, label, value, type = 'text') => `<label>${label}<input id="${id}" type="${type}" value="${escapeHTML(value)}"></label>`;
const area = (id, value) => `<textarea id="${id}" aria-label="입력 데이터">${escapeHTML(value)}</textarea>`;
const output = () => '<div id="out" class="output" role="status" aria-live="polite"></div>';
const runButton = (text = '실행하기') => `<button id="run">${text}</button>`;
function textOut(v) {
  const el = $('#out', body);
  if (!el) return;
  el.textContent = typeof v === 'string' ? v : JSON.stringify(v, null, 2);
  el.classList.remove('error');
}
function safeRun(fn) {
  return () => {
    try {
      fn();
    } catch (e) {
      const el = $('#out', body);
      if (el) {
        el.textContent = '확인 필요: ' + e.message;
        el.classList.add('error');
      }
    }
  };
}
function bind(fn, initial = true) {
  const btn = $('#run', body);
  if (btn) btn.onclick = safeRun(fn);
  if (initial) safeRun(fn)();
}

// Modal Tabs
function switchTab(tabName) {
  currentTab = tabName;
  $$('.modal-tab').forEach(b => {
    const isTarget = b.dataset.tab === tabName;
    b.classList.toggle('active', isTarget);
    b.setAttribute('aria-selected', isTarget);
  });
  $('#tab-demo').hidden = tabName !== 'demo';
  $('#tab-guide').hidden = tabName !== 'guide';
  $('#tab-code').hidden = tabName !== 'code';
}

$('#modal-tabs').addEventListener('click', e => {
  const btn = e.target.closest('.modal-tab');
  if (btn) switchTab(btn.dataset.tab);
});

function openDemo(id) {
  cleanups.forEach(fn => fn());
  cleanups = [];

  const d = demos.find(item => item.id === id);
  if (!d) return;
  activeDemo = d;

  $('#demo-title').textContent = d.title;
  $('#demo-library').textContent = `LIBRARY ${String(d.num).padStart(2, '0')} / ${d.lib}`;
  $('#demo-description').textContent = d.desc;
  $('#demo-code').textContent = d.code;
  $('#demo-code').removeAttribute('data-highlighted');
  hljs.highlightElement($('#demo-code'));
  $('#demo-docs').href = d.docs;

  // Render Guide
  $('#guide-body').innerHTML = `
    <div class="guide-card">
      <h4>📌 언제 쓰면 좋은가? (실무 추천 상황)</h4>
      <p><strong>${escapeHTML(d.bestFor)}</strong></p>
    </div>
    <div class="guide-card">
      <h4>🎯 대표 실무 활용 사례</h4>
      <ul class="guide-list">
        ${d.useCases.map((u, i) => `<li><span class="badge">사례 ${i + 1}</span> <span>${escapeHTML(u)}</span></li>`).join('')}
      </ul>
    </div>
    <div class="guide-card">
      <h4>⚡ 핵심 장점 및 도입 이유</h4>
      <p>${escapeHTML(d.pros)}</p>
    </div>
    <div class="guide-tip">
      <strong>💡 실무 활용 팁:</strong> ${escapeHTML(d.tip)}
    </div>
  `;

  // Always reset to Demo tab on open
  switchTab('demo');

  try {
    setup(d);
  } catch (e) {
    mount('<div class="output error">기능을 불러오는 중 오류가 발생했습니다: ' + escapeHTML(e.message) + '</div>');
    console.error(e);
  }

  if (!$('#demo-dialog').open) $('#demo-dialog').showModal();
  $('#demo-dialog').scrollTop = 0;
}

$('#close-dialog').onclick = () => $('#demo-dialog').close();
$('#demo-dialog').addEventListener('close', () => {
  cleanups.forEach(fn => fn());
  cleanups = [];
});

$('#demo-dialog').addEventListener('click', e => {
  // If SweetAlert is open, ignore clicks
  if (document.querySelector('.swal2-container')) return;
  if (e.target === $('#demo-dialog')) {
    const r = e.target.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      e.target.close();
    }
  }
});

$('#help').onclick = () => {
  Swal.fire({
    title: 'JS Lab 안내',
    html: '자바스크립트 대표 20개 라이브러리를 <b>1:1</b>로 실시간 체험하고,<br><b>[언제 쓰면 좋은가?]</b> 탭에서 실무 가이드를 확인해 보세요.<br><br>모든 기능은 서버 없이 브라우저에서 안전하게 동작합니다.',
    confirmButtonText: '체험 시작',
    confirmButtonColor: '#688c42'
  });
};

// -------------------------------------------------------------
// 20 Individual, Robust, Bug-Free Demos
// -------------------------------------------------------------
function setup(d) {
  const id = d.id;

  // 1. Chart.js (통합 멀티 차트)
  if (id === 'chart') {
    mount(`
      <div class="controls">
        <label>차트 종류
          <select id="chart-type">
            <option value="bar">막대 차트 (Bar)</option>
            <option value="line">꺾은선 차트 (Line)</option>
            <option value="doughnut">도넛 차트 (Doughnut)</option>
            <option value="pie">파이 차트 (Pie)</option>
          </select>
        </label>
        ${input('values', '데이터 (쉼표 구분)', '35, 25, 18, 12, 10')}
        ${runButton('차트 반영')}
        <button id="add-random">랜덤 데이터 추가</button>
      </div>
      <div class="demo-canvas"><canvas id="demo-canvas"></canvas></div>
      ${output()}
    `);

    let currentType = 'bar';
    let myChart = null;

    const build = (type, dataArr) => {
      if (myChart) myChart.destroy();
      const isPieOrDoughnut = type === 'doughnut' || type === 'pie';
      myChart = new Chart($('#demo-canvas', body), {
        type,
        data: {
          labels: dataArr.map((_, i) => isPieOrDoughnut ? ['기획', '디자인', '개발', '테스트', '운영', '마케팅', '보안'][i] || `항목 ${i + 1}` : `${i + 1}일차`),
          datasets: [{
            label: '지표 값',
            data: dataArr,
            backgroundColor: isPieOrDoughnut ? colors : (type === 'line' ? '#b6cf8e44' : colors),
            borderColor: type === 'line' ? '#82a94f' : '#fff',
            borderWidth: type === 'line' ? 2 : 1,
            borderRadius: type === 'bar' ? 4 : 0,
            fill: type === 'line',
            tension: 0.35
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: isPieOrDoughnut, position: 'bottom' }
          }
        }
      });
    };

    cleanups.push(() => { if (myChart) myChart.destroy(); });

    const update = () => {
      const nums = $('#values', body).value.split(',').map(v => Number(v.trim()));
      if (!nums.length || nums.some(n => !Number.isFinite(n) || n < 0)) throw Error('0 이상의 유효한 숫자를 쉼표로 구분해 입력하세요.');
      currentType = $('#chart-type', body).value;
      build(currentType, nums);
      textOut(`차트 형태: ${currentType.toUpperCase()} | 항목 수: ${nums.length}개 | 합계: ${_.sum(nums)}`);
    };

    $('#chart-type', body).onchange = update;
    $('#add-random', body).onclick = () => {
      const cur = $('#values', body).value.split(',').map(v => Number(v.trim())).filter(n => Number.isFinite(n));
      cur.push(_.random(10, 50));
      $('#values', body).value = cur.join(', ');
      update();
    };

    bind(update);
    return;
  }

  // 2. Anime.js (스프링 & 스태거 모션)
  if (id === 'anime') {
    mount(`
      <div class="controls">
        ${input('speed', '재생 속도 (ms)', '1000', 'number')}
        ${runButton('▶ 애니메이션 재생')}
      </div>
      <div class="animation-stage" id="stage" style="gap:14px;justify-content:center;">
        <div class="orb" style="background:#85af4b;"></div>
        <div class="orb" style="background:#a5cb6d;"></div>
        <div class="orb" style="background:#bfdd8a;"></div>
        <div class="orb" style="background:#d8ecc5;"></div>
      </div>
      ${output()}
    `);

    const orbs = $$('.orb', body);
    cleanups.push(() => anime.remove(orbs));

    const play = () => {
      anime.remove(orbs);
      const dur = _.clamp(Number($('#speed', body).value) || 1000, 300, 4000);
      anime({
        targets: orbs,
        translateY: [-35, 0],
        rotate: [0, 180],
        scale: [0.75, 1],
        delay: anime.stagger(120),
        duration: dur,
        easing: 'spring(1, 80, 10, 0)'
      });
      textOut(`스프링 바운스 재생 완료 (순차 지연 120ms / 속도 ${dur}ms)`);
    };

    bind(play);
    return;
  }

  // 3. GSAP (타임라인 시퀀스 모션)
  if (id === 'gsap') {
    mount(`
      <div class="controls">
        <button id="tl-play">▶ 재생</button>
        <button id="tl-pause">⏸ 일시정지</button>
        <button id="tl-restart">↺ 처음부터</button>
        <button id="tl-reverse">⟲ 역재생</button>
      </div>
      <div class="animation-stage" id="stage" style="flex-direction:column;align-items:flex-start;justify-content:center;gap:16px;">
        <div class="orb" id="gsap-box" style="background:#6d9539;"></div>
        <div class="letters" id="gsap-text"><span>G</span><span>S</span><span>A</span><span>P</span><span>&nbsp;</span><span>M</span><span>O</span><span>T</span><span>I</span><span>O</span><span>N</span></div>
      </div>
      ${output()}
    `);

    const box = $('#gsap-box', body);
    const letters = $$('#gsap-text span', body);
    let tl;

    cleanups.push(() => {
      if (tl) tl.kill();
      gsap.killTweensOf([box, letters]);
    });

    const initTL = () => {
      if (tl) tl.kill();
      gsap.set([box, letters], { clearProps: 'all' });
      tl = gsap.timeline({
        onUpdate: () => textOut(`타임라인 진행률: ${Math.round(tl.progress() * 100)}%`),
        onComplete: () => textOut('시퀀스 애니메이션 완료!')
      });

      const maxDist = Math.max(100, $('#stage', body).clientWidth - 100);
      tl.to(box, { x: maxDist, duration: 0.9, ease: 'power2.out' })
        .to(box, { rotation: 180, scale: 1.3, duration: 0.4 })
        .fromTo(letters, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.4 }, '-=0.2');
    };

    $('#tl-play', body).onclick = () => tl && tl.play();
    $('#tl-pause', body).onclick = () => tl && tl.pause();
    $('#tl-restart', body).onclick = () => { initTL(); tl.play(); };
    $('#tl-reverse', body).onclick = () => tl && tl.reverse();

    initTL();
    return;
  }

  // 4. SortableJS (드래그 앤 드롭 카드 정렬)
  if (id === 'sortable') {
    mount(`
      <p class="badge">💡 카드 어디든 마우스로 잡고 끌거나, 오른쪽 ↑ ↓ 버튼으로 순서를 바꿀 수 있습니다.</p>
      <div class="sort-list" id="sort-list"></div>
      ${output()}
    `);

    const items = ['1. 요구사항 정의 및 와이어프레임 설계', '2. UI 컴포넌트 라이브러리 선정', '3. 인터랙티브 프로토타입 개발', '4. 사용성 테스트 및 피드백 반영', '5. 프로덕션 배포 및 모니터링'];
    const listEl = $('#sort-list', body);

    listEl.innerHTML = items.map((text, idx) => `
      <div class="sort-item" data-text="${escapeHTML(text)}">
        <span class="handle">⠿</span>
        <span style="flex:1;">${escapeHTML(text)}</span>
        <button data-dir="-1" aria-label="위로 이동" style="padding:4px 8px!important;">↑</button>
        <button data-dir="1" aria-label="아래로 이동" style="padding:4px 8px!important;margin-left:4px!important;">↓</button>
      </div>
    `).join('');

    const refreshOrder = () => {
      const current = $$('.sort-item', listEl).map((el, i) => `${i + 1}위: ${el.dataset.text}`);
      textOut('현재 정렬된 작업 순서:\n' + current.join('\n'));
      $$('.sort-item', listEl).forEach((el, i, arr) => {
        el.querySelector('[data-dir="-1"]').disabled = i === 0;
        el.querySelector('[data-dir="1"]').disabled = i === arr.length - 1;
      });
    };

    const sortable = Sortable.create(listEl, {
      animation: 200,
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      onEnd: refreshOrder
    });

    cleanups.push(() => sortable.destroy());

    listEl.onclick = e => {
      const btn = e.target.closest('[data-dir]');
      if (!btn) return;
      const item = btn.closest('.sort-item');
      const dir = Number(btn.dataset.dir);
      if (dir === -1 && item.previousElementSibling) {
        listEl.insertBefore(item, item.previousElementSibling);
      } else if (dir === 1 && item.nextElementSibling) {
        listEl.insertBefore(item.nextElementSibling, item);
      }
      refreshOrder();
    };

    refreshOrder();
    return;
  }

  // 5. Marked (실시간 마크다운 파서)
  if (id === 'marked') {
    mount(`
      ${area('md-text', `# JS Lab 마크다운 에디터 🚀

Marked는 **초고속 마크다운 컴파일러**입니다.

### 주요 기능 체크
- [x] 실시간 파싱 지원
- [x] GFM 테이블 및 코드 블록 지원
- [x] DOMPurify 연동으로 안전한 XSS 차단

> "작은 실험 하나가 새로운 서비스를 만듭니다."

| 라이브러리 | 용도 | 속도 |
| :--- | :--- | :--- |
| Marked | 마크다운 변환 | 초고속 |
| DOMPurify | 보안 소독 | 필수 |
`)}
      <p class="badge">실시간 렌더링 미리보기 (HTML 변환 결과)</p>
      <div id="md-preview" class="output" style="background:#fff;line-height:1.7;"></div>
    `);

    const update = () => {
      const raw = $('#md-text', body).value;
      const html = DOMPurify.sanitize(marked.parse(raw));
      $('#md-preview', body).innerHTML = html;
    };

    $('#md-text', body).oninput = update;
    update();
    return;
  }

  // 6. Highlight.js (다국어 코드 하이라이트)
  if (id === 'highlight') {
    const snippets = {
      javascript: `// JavaScript 예시\nconst calculateTotal = (items) => {\n  return items.reduce((sum, item) => sum + item.price, 0);\n};\nconsole.log(calculateTotal([{ price: 1500 }, { price: 3000 }]));`,
      python: `# Python 예시\ndef fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nprint(list(fibonacci(7)))`,
      html: `<!-- HTML 예시 -->\n<div class="user-card">\n  <h3 class="name">홍길동</h3>\n  <button onclick="greet()">인사하기</button>\n</div>`,
      css: `/* CSS 예시 */\n.card-container {\n  display: flex;\n  justify-content: center;\n  border-radius: 12px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n}`,
      sql: `-- SQL 쿼리 예시\nSELECT u.name, COUNT(o.id) as order_count\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.created_at >= '2026-01-01'\nGROUP BY u.name;`,
      json: `{\n  "service": "JS Lab",\n  "version": "2.0.0",\n  "libraries": 20,\n  "status": "ready"\n}`
    };

    mount(`
      <div class="controls">
        <label>프로그래밍 언어
          <select id="code-lang">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="sql">SQL</option>
            <option value="json">JSON</option>
          </select>
        </label>
      </div>
      ${area('code-input', snippets.javascript)}
      <p class="badge">구문 강조 하이라이팅 결과</p>
      <pre class="code-box"><code id="hl-output" class="hljs"></code></pre>
    `);

    const update = () => {
      const lang = $('#code-lang', body).value;
      const text = $('#code-input', body).value;
      const out = $('#hl-output', body);
      try {
        const highlighted = hljs.highlight(text, { language: lang }).value;
        out.innerHTML = highlighted;
      } catch (err) {
        out.textContent = text;
      }
    };

    $('#code-lang', body).onchange = () => {
      const lang = $('#code-lang', body).value;
      if (snippets[lang]) $('#code-input', body).value = snippets[lang];
      update();
    };
    $('#code-input', body).oninput = update;
    update();
    return;
  }

  // 7. Fuse.js (오타 허용 퍼지 검색 엔진)
  if (id === 'fuse') {
    const dataset = [
      { name: 'Chart.js', tag: '시각화', desc: '반응형 막대 및 라인 차트' },
      { name: 'Anime.js', tag: '애니메이션', desc: '스프링 물리 마이크로 모션' },
      { name: 'GSAP', tag: '애니메이션', desc: '고성능 타임라인 시퀀스' },
      { name: 'SortableJS', tag: '인터랙션', desc: '드래그 앤 드롭 리스트 순서 정렬' },
      { name: 'Marked', tag: '에디터', desc: '마크다운 실시간 파서' },
      { name: 'Fuse.js', tag: '검색', desc: '오타 허용 클라이언트 퍼지 검색' },
      { name: 'Day.js', tag: '날짜', desc: '가벼운 날짜 포맷팅 및 D-day' },
      { name: 'Papa Parse', tag: '데이터', desc: '대용량 CSV와 JSON 상호 변환' },
      { name: 'SweetAlert2', tag: 'UI', desc: '모던 반응형 알림 팝업' }
    ];

    mount(`
      <div class="controls">
        ${input('fuse-input', '검색어 (오타를 쳐보세요: char, githb, papaprs)', 'chart')}
        <label>오타 허용 강도 (Threshold: <span id="th-val">0.35</span>)
          <input id="fuse-th" type="range" min="0.1" max="0.7" step="0.05" value="0.35">
        </label>
      </div>
      <p class="badge">검색 결과 목록</p>
      ${output()}
    `);

    const update = () => {
      const q = $('#fuse-input', body).value.trim();
      const th = Number($('#fuse-th', body).value);
      $('#th-val', body).textContent = th.toFixed(2);

      const f = new Fuse(dataset, {
        keys: ['name', 'tag', 'desc'],
        threshold: th,
        includeScore: true
      });

      const res = q ? f.search(q) : dataset.map(item => ({ item, score: 0 }));
      if (!res.length) {
        textOut(`'${q}'에 대한 일치 결과가 없습니다. 오타 허용 강도를 높여보세요.`);
        return;
      }

      const rows = res.map(r => `• ${r.item.name} [${r.item.tag}] - ${r.item.desc} (유사도 점수: ${(1 - (r.score || 0)).toFixed(2)})`);
      textOut(rows.join('\n'));
    };

    $('#fuse-input', body).oninput = update;
    $('#fuse-th', body).oninput = update;
    update();
    return;
  }

  // 8. Day.js (날짜 포맷팅 & D-day)
  if (id === 'dayjs') {
    mount(`
      <div class="controls">
        ${input('d-date', '날짜 선택', dayjs().add(30, 'day').format('YYYY-MM-DDTHH:mm'), 'datetime-local')}
        <label>포맷 형식
          <select id="d-format">
            <option value="YYYY년 MM월 DD일 (ddd) HH:mm:ss">한국어 표준 날짜 (YYYY년 MM월 DD일 HH:mm:ss)</option>
            <option value="YYYY-MM-DD">표준 날짜 (YYYY-MM-DD)</option>
            <option value="YYYY/MM/DD HH:mm">간결 날짜 (YYYY/MM/DD HH:mm)</option>
            <option value="MM월 DD일 D-day 계산">오늘 기준 D-day 및 차이 일수 계산</option>
          </select>
        </label>
        ${runButton('날짜 연산')}
      </div>
      ${output()}
    `);

    const update = () => {
      const val = $('#d-date', body).value;
      const d = dayjs(val);
      if (!d.isValid()) throw Error('올바른 날짜를 선택하세요.');

      const fmt = $('#d-format', body).value;
      const today = dayjs();
      const diff = d.startOf('day').diff(today.startOf('day'), 'day');
      const ddayStr = diff === 0 ? 'D-DAY (오늘!)' : diff > 0 ? `D-${diff}일 남음` : `D+${Math.abs(diff)}일 지남`;

      textOut(`[포맷 변환 결과]\n${d.format(fmt === 'MM월 DD일 D-day 계산' ? 'YYYY년 MM월 DD일' : fmt)}\n\n[D-day 계산]\n기준 일자: ${today.format('YYYY-MM-DD')}\n대상 일자: ${d.format('YYYY-MM-DD')}\n결과: ${ddayStr}\n\n[날짜 연산 팁]\n• 100일 뒤: ${d.add(100, 'day').format('YYYY-MM-DD')}\n• 1년 전: ${d.subtract(1, 'year').format('YYYY-MM-DD')}`);
    };

    bind(update);
    return;
  }

  // 9. Lodash (모던 데이터 가공)
  if (id === 'lodash') {
    mount(`
      <div class="controls">
        <label>작업 선택
          <select id="lo-mode">
            <option value="uniq">중복 제거 & 정렬 (_.uniq, _.sortBy)</option>
            <option value="group">팀별 데이터 그룹화 (_.groupBy)</option>
            <option value="shuffle">랜덤 셔플 & 2인 조 편성 (_.shuffle, _.chunk)</option>
          </select>
        </label>
        ${runButton('데이터 가공')}
      </div>
      ${area('lo-input', '5, 2, 8, 2, 1, 9, 5, 3, 1, 7')}
      ${output()}
    `);

    const samples = {
      uniq: '5, 2, 8, 2, 1, 9, 5, 3, 1, 7',
      group: '[{"name":"지민","team":"디자인"},{"name":"현우","team":"개발"},{"name":"수진","team":"디자인"},{"name":"민서","team":"기획"},{"name":"도윤","team":"개발"}]',
      shuffle: '김철수, 이영희, 박민수, 정수진, 최동훈, 강지우'
    };

    $('#lo-mode', body).onchange = () => {
      const mode = $('#lo-mode', body).value;
      $('#lo-input', body).value = samples[mode];
      update();
    };

    const update = () => {
      const mode = $('#lo-mode', body).value;
      const raw = $('#lo-input', body).value;

      if (mode === 'uniq') {
        const nums = raw.split(',').map(n => Number(n.trim())).filter(n => Number.isFinite(n));
        const result = _.sortBy(_.uniq(nums));
        textOut(`원본 개수: ${nums.length}개\n중복 제거 후: ${result.length}개\n정렬된 결과:\n${result.join(', ')}`);
      } else if (mode === 'group') {
        const parsed = JSON.parse(raw);
        const grouped = _.groupBy(parsed, 'team');
        textOut(JSON.stringify(grouped, null, 2));
      } else if (mode === 'shuffle') {
        const names = raw.split(',').map(s => s.trim()).filter(Boolean);
        const teams = _.chunk(_.shuffle(names), 2);
        const str = teams.map((team, idx) => `팀 ${idx + 1}: ${team.join(', ')}`).join('\n');
        textOut(`무작위 조 편성 결과:\n${str}`);
      }
    };

    bind(update);
    return;
  }

  // 10. Papa Parse (CSV ↔ JSON)
  if (id === 'papa') {
    mount(`
      <div class="controls">
        ${runButton('CSV → JSON 변환')}
        <button id="json-to-csv">JSON → CSV 변환</button>
        <button id="download-csv">엑셀용 CSV 다운로드</button>
      </div>
      ${area('csv-text', `이름,직무,연차,사용언어\n김철수,프론트엔드,3,JavaScript\n이영희,백엔드,5,Python\n박민수,디자이너,2,Figma\n정수진,풀스택,4,TypeScript`)}
      ${output()}
    `);

    const toJSON = () => {
      const text = $('#csv-text', body).value;
      const res = Papa.parse(text, { header: true, skipEmptyLines: true });
      if (res.errors.length) throw Error(res.errors.map(e => e.message).join('; '));
      textOut(res.data);
    };

    $('#json-to-csv', body).onclick = safeRun(() => {
      const current = $('#out', body).textContent;
      let data;
      try {
        data = JSON.parse(current);
      } catch {
        data = Papa.parse($('#csv-text', body).value, { header: true }).data;
      }
      const csv = Papa.unparse(data);
      $('#csv-text', body).value = csv;
      textOut('JSON 데이터를 CSV 형식으로 역변환했습니다.\n' + csv);
    });

    $('#download-csv', body).onclick = safeRun(() => {
      const csv = $('#csv-text', body).value;
      // UTF-8 BOM to prevent Korean distortion in Excel
      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'js-lab-export.csv';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      textOut('한글 깨짐 방지 UTF-8 BOM이 적용된 CSV 파일을 다운로드했습니다.');
    });

    bind(toJSON);
    return;
  }

  // 11. QRCode.js (한글 완벽 지원 QR 코드 생성기)
  if (id === 'qrcode') {
    mount(`
      <div class="controls">
        ${input('qr-text', 'QR 내용 (한글, 영문, URL 완벽 지원)', 'https://github.com/msleesky-arch/javascriptdemo1')}
        <label>오류 복원 레벨
          <select id="qr-level">
            <option value="M">보통 (M - 15% 복원)</option>
            <option value="L">낮음 (L - 7% 복원)</option>
            <option value="Q">높음 (Q - 25% 복원)</option>
            <option value="H">최고 (H - 30% 복원)</option>
          </select>
        </label>
        ${runButton('QR 코드 생성')}
      </div>
      <div class="qr" id="qr-box" style="min-height:190px;display:flex;align-items:center;justify-content:center;"></div>
      ${output()}
    `);

    const update = () => {
      const val = $('#qr-text', body).value.trim();
      if (!val) throw Error('QR 코드로 변환할 내용을 입력하세요.');

      const box = $('#qr-box', body);
      box.innerHTML = '';

      // Korean UTF-8 fix for QRCode.js
      const safeString = unescape(encodeURIComponent(val));
      const levelMap = { L: QRCode.CorrectLevel.L, M: QRCode.CorrectLevel.M, Q: QRCode.CorrectLevel.Q, H: QRCode.CorrectLevel.H };

      new QRCode(box, {
        text: safeString,
        width: 170,
        height: 170,
        correctLevel: levelMap[$('#qr-level', body).value] || QRCode.CorrectLevel.M
      });

      textOut(`QR 코드 생성 완료 (${new TextEncoder().encode(val).length}바이트)\n스마트폰 카메라로 스캔해 보세요!`);
    };

    bind(update);
    return;
  }

  // 12. JsBarcode (표준 1D 바코드)
  if (id === 'barcode') {
    mount(`
      <div class="controls">
        ${input('bc-text', '바코드 값 (영문/숫자/하이픈)', 'PRD-2026-X89')}
        ${runButton('바코드 생성')}
        <button id="sample-item">샘플: 쿠폰</button>
        <button id="sample-tracking">샘플: 송장</button>
      </div>
      <div style="background:#fff;padding:24px;border-radius:8px;text-align:center;border:1px solid #dce4d3;">
        <svg id="barcode-svg" style="max-width:100%;height:auto;"></svg>
      </div>
      ${output()}
    `);

    const update = () => {
      const val = $('#bc-text', body).value.trim();
      if (!val) throw Error('바코드 값을 입력하세요.');
      if (/[^\x20-\x7E]/.test(val)) {
        throw Error('바코드(CODE128)는 영문, 숫자 및 기호만 지원합니다. 한글은 입력할 수 없습니다.');
      }

      JsBarcode($('#barcode-svg', body), val, {
        format: 'CODE128',
        width: 2,
        height: 70,
        displayValue: true,
        fontSize: 15,
        margin: 10
      });

      textOut(`CODE128 바코드 렌더링 완료: ${val}`);
    };

    $('#sample-item', body).onclick = () => { $('#bc-text', body).value = 'SALE-50OFF'; update(); };
    $('#sample-tracking', body).onclick = () => { $('#bc-text', body).value = '9876543210'; update(); };

    bind(update);
    return;
  }

  // 13. Math.js (수식 계산 & 단위 변환)
  if (id === 'math') {
    mount(`
      <div class="controls">
        <label>작업 선택
          <select id="math-mode">
            <option value="eval">수식 계산기</option>
            <option value="unit">단위 변환기</option>
          </select>
        </label>
        ${input('math-expr', '수식 또는 단위 (예: sqrt(144) + 2^3)', 'sqrt(144) + 2^3')}
        ${runButton('계산하기')}
      </div>
      <p class="badge">추천 수식: sin(45 deg) * 2 | 100 cm to m | 5 kg to lb | 25 degC to degF</p>
      ${output()}
    `);

    $('#math-mode', body).onchange = () => {
      const mode = $('#math-mode', body).value;
      $('#math-expr', body).value = mode === 'eval' ? 'sqrt(144) + 2^3' : '100 cm to m';
      update();
    };

    const update = () => {
      const expr = $('#math-expr', body).value.trim();
      if (!expr) throw Error('수식을 입력하세요.');
      const res = math.evaluate(expr);
      textOut(`입력 수식: ${expr}\n계산 결과: = ${res.toString()}`);
    };

    bind(update);
    return;
  }

  // 14. Chroma.js (색상 팔레트 & 명도 대비 검사)
  if (id === 'chroma') {
    mount(`
      <div class="controls">
        ${input('c-start', '시작 색상', '#284937', 'color')}
        ${input('c-end', '끝 색상', '#d5f087', 'color')}
        <label>팔레트 개수
          <select id="c-count"><option>5</option><option selected>7</option><option>9</option></select>
        </label>
        ${runButton('팔레트 및 명도대비 계산')}
      </div>
      <div id="palette-box" class="palette" style="margin-bottom:14px;"></div>
      <div id="contrast-preview" class="contrast-sample" style="border:1px solid #dce4d3;">
        WCAG 2.1 가독성 텍스트 샘플
      </div>
      ${output()}
    `);

    const update = () => {
      const start = $('#c-start', body).value;
      const end = $('#c-end', body).value;
      const count = Number($('#c-count', body).value);

      const colors = chroma.scale([start, end]).mode('lch').colors(count);
      $('#palette-box', body).innerHTML = colors.map(c => `
        <div style="background:${c};color:${chroma.contrast(c, '#fff') > 4.5 ? '#fff' : '#111'};padding:10px 4px;text-align:center;">
          ${c}
        </div>
      `).join('');

      const contrast = chroma.contrast(start, end);
      const sample = $('#contrast-preview', body);
      sample.style.background = start;
      sample.style.color = end;

      textOut(`생성된 팔레트 (${count}단계):\n${colors.join(' → ')}\n\n[명도 대비율(Contrast Ratio) 검사]\n시작색(${start})과 끝색(${end}) 사이 대비율: ${contrast.toFixed(2)}:1\n• 일반 텍스트 기준 (4.5:1 이상): ${contrast >= 4.5 ? '✅ 통과 (가독성 우수)' : '❌ 미달 (글씨 식별 어려움)'}\n• 큰 텍스트 기준 (3.0:1 이상): ${contrast >= 3 ? '✅ 통과' : '❌ 미달'}`);
    };

    bind(update);
    return;
  }

  // 15. Canvas Confetti (축하 폭죽 & 파티클)
  if (id === 'confetti') {
    mount(`
      <div class="controls">
        <label>폭죽 모드
          <select id="conf-mode">
            <option value="center">🎉 중앙 폭죽 (Center Blast)</option>
            <option value="cannons">🎆 양쪽 대포 (Side Cannons)</option>
            <option value="stars">✨ 골드 스타 샤워 (Gold Stars)</option>
          </select>
        </label>
        ${runButton('축하 발사!')}
      </div>
      <div class="confetti-stage" id="conf-stage">
        <canvas class="confetti-canvas" id="stage-canvas"></canvas>
        <div style="position:relative;z-index:3;">
          <h3 style="margin:0 0 8px;font-size:22px;">목표 달성을 축하합니다! ✦</h3>
          <p style="margin:0;opacity:.85;font-size:14px;">모달 내부 캔버스에서 렉 없이 부드럽게 흩날리는 파티클 효과</p>
        </div>
      </div>
      ${output()}
    `);

    const stageCanvas = $('#stage-canvas', body);
    const myConfetti = confetti.create(stageCanvas, { resize: true, useWorker: false });
    cleanups.push(() => myConfetti.reset());

    const fire = () => {
      const mode = $('#conf-mode', body).value;
      if (mode === 'center') {
        myConfetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
        textOut('중앙 폭죽 발사 완료!');
      } else if (mode === 'cannons') {
        myConfetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } });
        myConfetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } });
        textOut('양쪽 대포 발사 완료!');
      } else if (mode === 'stars') {
        myConfetti({
          particleCount: 70,
          spread: 90,
          shapes: ['circle', 'square'],
          colors: ['#ffe259', '#ffa751', '#ffffff', '#c8f477'],
          origin: { y: 0.5 }
        });
        textOut('골드 스타 샤워 발사 완료!');
      }
    };

    bind(fire);
    return;
  }

  // 16. SweetAlert2 (모던 반응형 알림 팝업)
  if (id === 'swal') {
    mount(`
      <div class="controls">
        <label>팝업 타입
          <select id="swal-type">
            <option value="success">성공 알림 (Success)</option>
            <option value="confirm">삭제 재확인 (Confirm & Cancel)</option>
            <option value="input">텍스트 입력 (Prompt Input)</option>
            <option value="toast">자동 닫힘 토스트 (Toast)</option>
          </select>
        </label>
        ${runButton('알림창 띄우기')}
      </div>
      ${output()}
    `);

    const update = async () => {
      const type = $('#swal-type', body).value;
      if (type === 'success') {
        await Swal.fire({
          title: '저장 완료!',
          text: '작업 내용이 안전하게 저장되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
          confirmButtonColor: '#688c42'
        });
        textOut('성공 알림창을 닫았습니다.');
      } else if (type === 'confirm') {
        const res = await Swal.fire({
          title: '정말 삭제하시겠습니까?',
          text: '삭제한 데이터는 다시 복구할 수 없습니다.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '삭제하기',
          cancelButtonText: '취소',
          confirmButtonColor: '#c93b3b',
          cancelButtonColor: '#8a9482'
        });
        textOut(res.isConfirmed ? '삭제하기 버튼을 클릭했습니다.' : '삭제를 취소했습니다.');
      } else if (type === 'input') {
        const res = await Swal.fire({
          title: '닉네임을 입력하세요',
          input: 'text',
          inputPlaceholder: '예: 탐험가123',
          showCancelButton: true,
          confirmButtonText: '입력 완료',
          confirmButtonColor: '#688c42',
          inputValidator: v => !v ? '닉네임을 입력해야 합니다!' : null
        });
        if (res.isConfirmed) textOut(`입력된 닉네임: ${res.value}`);
      } else if (type === 'toast') {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: '클립보드에 복사되었습니다.',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
        textOut('우측 상단에 2초 후 자동 닫히는 토스트가 표시되었습니다.');
      }
    };

    bind(update, false);
    textOut('위 [알림창 띄우기] 버튼을 눌러 SweetAlert2 팝업을 직접 체험해 보세요.');
    return;
  }

  // 17. Flatpickr (경량 날짜/기간 선택 캘린더)
  if (id === 'flatpickr') {
    mount(`
      <div class="controls">
        <label>달력 모드
          <select id="fp-mode">
            <option value="range">숙박/예약 기간 선택 (Range)</option>
            <option value="single">단일 날짜 선택 (Single)</option>
          </select>
        </label>
      </div>
      <div style="display:flex;justify-content:center;margin:12px 0;">
        <input type="text" id="fp-calendar" style="display:none;">
      </div>
      ${output()}
    `);

    let fpInstance = null;

    const initCalendar = (mode) => {
      if (fpInstance) fpInstance.destroy();
      const inputEl = $('#fp-calendar', body);

      fpInstance = flatpickr(inputEl, {
        inline: true,
        mode,
        dateFormat: 'Y-m-d',
        defaultDate: mode === 'range' ? [dayjs().format('YYYY-MM-DD'), dayjs().add(4, 'day').format('YYYY-MM-DD')] : dayjs().format('YYYY-MM-DD'),
        onChange: (dates) => {
          if (mode === 'range') {
            if (dates.length === 2) {
              const diff = dayjs(dates[1]).diff(dayjs(dates[0]), 'day');
              textOut(`선택된 여행 기간: ${dayjs(dates[0]).format('YYYY-MM-DD')} ~ ${dayjs(dates[1]).format('YYYY-MM-DD')}\n총 ${diff}박 ${diff + 1}일 일정`);
            } else {
              textOut('종료일을 달력에서 선택해 주세요.');
            }
          } else {
            textOut(`선택된 일자: ${dayjs(dates[0]).format('YYYY-MM-DD')}`);
          }
        }
      });
    };

    cleanups.push(() => { if (fpInstance) fpInstance.destroy(); });

    $('#fp-mode', body).onchange = () => {
      initCalendar($('#fp-mode', body).value);
    };

    initCalendar('range');
    textOut(`기본 선택: ${dayjs().format('YYYY-MM-DD')} ~ ${dayjs().add(4, 'day').format('YYYY-MM-DD')} (4박 5일)\n달력 날짜를 클릭해 기간을 변경해 보세요.`);
    return;
  }

  // 18. DOMPurify (XSS 방지 HTML 보안 소독기)
  if (id === 'purify') {
    mount(`
      ${area('dirty-input', `<h3>환영합니다!</h3>
<p>이 문장과 <b>굵은 글씨</b>는 안전하게 보존됩니다.</p>
<!-- 악성 해킹 스크립트 시도 -->
<script>alert("XSS 공격 성공: " + document.cookie);</script>
<img src="invalid-url" onerror="alert('이미지 오류 XSS');">
<a href="javascript:alert('악성 링크')">위험한 링크</a>`)}
      <div class="controls">
        ${runButton('HTML 보안 소독 (Sanitize)')}
      </div>
      <p class="badge">소독된 안전한 HTML 미리보기</p>
      <div id="clean-preview" class="output" style="background:#fff;"></div>
      <p class="badge" style="margin-top:14px;">소독된 코드 (스크립트 및 악성 속성 제거됨)</p>
      ${output()}
    `);

    const update = () => {
      const dirty = $('#dirty-input', body).value;
      const clean = DOMPurify.sanitize(dirty);
      $('#clean-preview', body).innerHTML = clean;
      textOut(clean);
    };

    bind(update);
    return;
  }

  // 19. LZ-String (고효율 텍스트 압축 & 복원기)
  if (id === 'lz') {
    mount(`
      ${area('lz-input', 'JavaScript 20대 핵심 라이브러리 플레이그라운드와 실무 활용 가이드입니다. '.repeat(10))}
      <div class="controls">
        ${runButton('텍스트 압축 & 복원 검증')}
      </div>
      ${output()}
    `);

    const update = () => {
      const original = $('#lz-input', body).value;
      if (!original) throw Error('압축할 텍스트를 입력하세요.');

      const origBytes = new TextEncoder().encode(original).length;
      const compressed = LZString.compressToBase64(original);
      const compBytes = compressed.length;
      const restored = LZString.decompressFromBase64(compressed);

      const ratio = origBytes ? ((1 - compBytes / origBytes) * 100).toFixed(1) : 0;

      textOut(`[압축 결과 요약]
• 원본 크기: ${origBytes} 바이트
• 압축 크기 (Base64): ${compBytes} 바이트
• 용량 절감률: ${ratio}% 절약!
• 원본 일치 복원: ${restored === original ? '✅ 100% 완벽 복원 성공' : '❌ 복원 실패'}

[압축된 문자열 (LocalStorage/URL 공유 최적화)]:
${compressed}

[복원된 원본 첫 50자]:
${restored.slice(0, 50)}...`);
    };

    bind(update);
    return;
  }

  // 20. UUID (고유 식별자 생성기)
  if (id === 'uuid') {
    mount(`
      <div class="controls">
        <label>생성 수량
          <select id="uuid-count">
            <option value="1">1개 생성</option>
            <option value="5" selected>5개 생성</option>
            <option value="10">10개 생성</option>
          </select>
        </label>
        ${runButton('UUID 새로고침')}
        <button id="copy-uuid">📋 전체 복사하기</button>
      </div>
      ${output()}
    `);

    const update = () => {
      const count = Number($('#uuid-count', body).value);
      const list = Array.from({ length: count }, () => uuid.v4());
      const validation = list.every(id => uuid.validate(id)) ? '✅ RFC4122 v4 규격 유효성 검증 통과' : '검증 실패';
      textOut(`${validation}\n\n` + list.join('\n'));
    };

    $('#copy-uuid', body).onclick = async () => {
      const text = $('#out', body).textContent;
      try {
        await navigator.clipboard.writeText(text);
        $('#copy-uuid', body).textContent = '✅ 복사 완료!';
        setTimeout(() => { $('#copy-uuid', body).textContent = '📋 전체 복사하기'; }, 1500);
      } catch {
        $('#copy-uuid', body).textContent = '직접 드래그해 복사하세요';
      }
    };

    bind(update);
    return;
  }
}

render();
