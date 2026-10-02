'use strict';
const $ = (s, root = document) => root.querySelector(s);
const categories = [ ['전체','◫'], ['데이터 시각화','▥'], ['모션 & 인터랙션','✳'], ['텍스트 & 검색','⌕'], ['날짜 & 시간','◷'], ['데이터 & 계산','⌘'], ['생성 & 유틸리티','◇'] ];
const demos = [
 ['bar','막대 차트','Chart.js','데이터 시각화','데이터를 비교하는 가장 명확한 방법','bars','new Chart(canvas, { type: "bar", data });','https://www.chartjs.org/docs/latest/'],
 ['line','실시간 라인 차트','Chart.js','데이터 시각화','데이터 포인트를 추가하며 흐름 살펴보기','line','chart.data.datasets[0].data.push(value);\nchart.update();','https://www.chartjs.org/docs/latest/'],
 ['doughnut','도넛 차트','Chart.js','데이터 시각화','전체에서 각 항목이 차지하는 비율','ring','new Chart(canvas, { type: "doughnut", data });','https://www.chartjs.org/docs/latest/'],
 ['anime','스프링 애니메이션','Anime.js','모션 & 인터랙션','속도와 탄성을 바꿔 움직임 만들기','dots','anime({ targets: element, translateX: 220,\n  easing: "spring(1, 80, 10, 0)", duration: 1200 });','https://animejs.com/'],
 ['stagger','순차 애니메이션','Anime.js','모션 & 인터랙션','같은 움직임에 서로 다른 시작 시간','dots','anime({ targets: ".orb", translateY: -40,\n  delay: anime.stagger(120), direction: "alternate" });','https://animejs.com/'],
 ['gsap','타임라인 모션','GSAP','모션 & 인터랙션','이동·회전·확대를 하나의 흐름으로','dots','gsap.timeline().to(element, { x: 200 })\n  .to(element, { rotation: 180, scale: 1.5 });','https://gsap.com/docs/v3/'],
 ['textmotion','텍스트 등장 효과','GSAP','모션 & 인터랙션','글자 하나씩 부드럽게 등장시키기','text','gsap.fromTo(letters, { opacity: 0, y: 30 },\n  { opacity: 1, y: 0, stagger: 0.08 });','https://gsap.com/docs/v3/'],
 ['sort','드래그 정렬','SortableJS','모션 & 인터랙션','끌어서 바꾸는 나만의 우선순위','list','Sortable.create(list, { animation: 180, handle: ".handle" });','https://sortablejs.github.io/Sortable/'],
 ['markdown','마크다운 에디터','Marked','텍스트 & 검색','입력한 마크다운을 바로 미리보기','code','preview.innerHTML = DOMPurify.sanitize(marked.parse(text));','https://marked.js.org/'],
 ['highlight','코드 하이라이트','Highlight.js','텍스트 & 검색','코드에 색을 더해 읽기 쉽게','code','hljs.highlight(code, { language: "javascript" }).value;','https://highlightjs.org/'],
 ['fuzzy','유연한 검색','Fuse.js','텍스트 & 검색','철자가 조금 달라도 찾아주는 검색','search','const fuse = new Fuse(items, { keys: ["name", "tags"], threshold: 0.4 });\nfuse.search(query);','https://www.fusejs.io/'],
 ['date','날짜 포맷 변환','Day.js','날짜 & 시간','하나의 날짜, 다양한 표현 방식','date','dayjs(date).format("YYYY년 MM월 DD일 HH:mm");','https://day.js.org/'],
 ['dday','D-day 계산','Day.js','날짜 & 시간','특별한 날까지 남은 시간 확인하기','date','dayjs(target).startOf("day").diff(dayjs().startOf("day"), "day");','https://day.js.org/'],
 ['unique','중복 제거 & 정렬','Lodash','데이터 & 계산','어지러운 숫자 데이터를 깔끔하게','code','_.sortBy(_.uniq(numbers));','https://lodash.com/docs/4.17.21'],
 ['group','데이터 그룹화','Lodash','데이터 & 계산','같은 분류의 항목을 모아보기','list','_.groupBy(records, "team");','https://lodash.com/docs/4.17.21'],
 ['csv','CSV → JSON','Papa Parse','데이터 & 계산','표 데이터를 다루기 쉬운 형태로','code','Papa.parse(csv, { header: true, skipEmptyLines: true });','https://www.papaparse.com/docs'],
 ['csvexport','JSON → CSV','Papa Parse','데이터 & 계산','JSON 데이터를 CSV 파일로 저장하기','code','const csv = Papa.unparse(JSON.parse(text));','https://www.papaparse.com/docs'],
 ['qr','QR 코드 생성','QRCode.js','생성 & 유틸리티','텍스트와 링크를 QR 코드로','qr','new QRCode(element, { text, width: 160, height: 160 });','https://github.com/davidshimjs/qrcodejs'],
 ['barcode','바코드 생성','JsBarcode','생성 & 유틸리티','원하는 문자를 스캔 가능한 코드로','barcode','JsBarcode(svg, text, { format: "CODE128" });','https://github.com/lindell/JsBarcode'],
 ['math','수식 계산기','Math.js','데이터 & 계산','복잡한 수식도 입력 한 번으로','math','math.evaluate("sqrt(144) + 2^3");','https://mathjs.org/docs/'],
 ['unit','단위 변환기','Math.js','데이터 & 계산','길이·무게·온도를 다른 단위로','math','math.unit("100 cm").to("m").toString();','https://mathjs.org/docs/datatypes/units.html'],
 ['palette','컬러 팔레트','Chroma.js','데이터 시각화','두 색 사이에서 새로운 색 발견하기','palette','chroma.scale([start, end]).mode("lch").colors(5);','https://gka.github.io/chroma.js/'],
 ['contrast','색상 대비 확인','Chroma.js','데이터 시각화','배경과 글자의 가독성 비교하기','palette','chroma.contrast(background, foreground);','https://gka.github.io/chroma.js/'],
 ['confetti','축하 컨페티','Canvas Confetti','모션 & 인터랙션','작은 성공을 축하하는 특별한 순간','confetti','confetti({ particleCount: 100, spread: 75, origin: { y: 0.65 } });','https://github.com/catdad/canvas-confetti'],
 ['alert','알림 & 확인 창','SweetAlert2','모션 & 인터랙션','사용자에게 명확한 피드백 전달하기','alert','Swal.fire({ title: "저장할까요?", showCancelButton: true });','https://sweetalert2.github.io/'],
 ['picker','날짜 범위 선택','Flatpickr','날짜 & 시간','시작일과 종료일을 달력에서 선택','date','flatpickr(input, { mode: "range", dateFormat: "Y-m-d" });','https://flatpickr.js.org/'],
 ['sanitize','HTML 정리','DOMPurify','텍스트 & 검색','안전한 HTML만 남기는 필터','code','DOMPurify.sanitize(html);','https://github.com/cure53/DOMPurify'],
 ['compress','텍스트 압축','LZ-String','텍스트 & 검색','문자열 압축과 복원을 눈으로 확인','code','LZString.compressToBase64(text);\nLZString.decompressFromBase64(compressed);','https://pieroxy.net/blog/pages/lz-string/index.html'],
 ['uuid','고유 ID 생성','UUID','생성 & 유틸리티','데이터마다 중복 없는 이름표 만들기','code','uuid.v4();','https://github.com/uuidjs/uuid'],
 ['shuffle','랜덤 팀 추첨','Lodash','데이터 & 계산','명단을 섞고 공정하게 팀 나누기','list','_.chunk(_.shuffle(names), teamSize);','https://lodash.com/docs/4.17.21']
].map((a, index) => ({id:a[0],title:a[1],lib:a[2],category:a[3],desc:a[4],art:a[5],code:a[6],docs:a[7],num:index+1}));
let selected='전체', query='', cleanups=[], heroChart;
const escapeHTML = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fuse = new Fuse(demos,{keys:['title','lib','desc','category'],threshold:0.35,ignoreLocation:true});
function art(type){
 if(type==='bars')return '<div class="mini-bars">'+[28,49,38,65,52,76,45].map(h=>`<i style="height:${h}px"></i>`).join('')+'</div>';
 if(type==='line')return '<svg class="mini-line" viewBox="0 0 180 74" aria-hidden="true"><path d="M0 68 L25 43 L50 52 L80 18 L108 35 L135 10 L180 22 L180 74 L0 74" fill="#dce8c9"/><path d="M0 68 L25 43 L50 52 L80 18 L108 35 L135 10 L180 22" fill="none" stroke="#97b969" stroke-width="3"/></svg>';
 if(type==='ring')return '<div class="mini-ring"></div>';
 if(type==='dots')return '<div class="mini-dots"><i></i><i></i><i></i><i></i></div>';
 if(type==='palette')return '<div class="mini-palette">'+['#273e35','#567951','#92b36e','#c5da92','#e5eec9'].map(c=>`<i style="background:${c}"></i>`).join('')+'</div>';
 if(type==='list')return '<div class="mini-list"><span>⠿　Design a little</span><span>⠿　Build something</span><span>⠿　Make it yours</span></div>';
 const labels={text:'Hello, motion.',search:'⌕　Find your idea',date:'OCT / 02',qr:'▦',barcode:'▥ ▥ ▥',math:'ƒ(x) = possibility',confetti:'✦　✧　✦',alert:'✓　All set!'};
 return type==='code'?'<div class="mini-code">{ make: "something" }</div>':`<div class="mini-label" style="font-size:${type==='qr'?'75':type==='barcode'?'45':'24'}px">${labels[type]||'JS'}</div>`;
}
function render(){
 const matches=query?fuse.search(query).map(r=>r.item):demos;
 const items=matches.filter(d=>selected==='전체'||d.category===selected);
 $('#cards').innerHTML=items.map(d=>`<button class="card" data-demo="${d.id}" aria-label="${d.title} 체험하기"><div class="card-art ${['','art-purple','art-blue','art-peach','art-yellow'][categories.findIndex(c=>c[0]===d.category)%5]}"><span class="card-num">EXPERIMENT ${String(d.num).padStart(2,'0')}</span><span class="card-tag">${d.category.split(' & ')[0]}</span>${art(d.art)}</div><div class="card-text"><h3>${d.title}</h3><p>${d.desc}</p><div class="card-bottom"><span class="library-tag">${d.lib}</span><span class="try">체험하기 ↗</span></div></div></button>`).join('');
 $('#empty').hidden=items.length>0;$('#result-count').textContent=items.length;$('#section-title').firstChild.textContent=selected==='전체'?'모든 실험 ':selected+' ';
 $('#categories').innerHTML=categories.map(([c,icon])=>`<button data-category="${c}" class="${c===selected?'active':''}" ${c===selected?'aria-current="true"':''}><span class="nav-symbol">${icon}</span>${c==='전체'?'모든 실험':c}<span class="nav-count">${c==='전체'?30:demos.filter(d=>d.category===c).length}</span></button>`).join('');
 $('#quick-filters').innerHTML=categories.map(([c])=>`<button data-category="${c}" aria-pressed="${selected===c}" class="${selected===c?'active':''}">${c==='전체'?'전체':c}</button>`).join('');
}
function setCategory(c){selected=c;render()}
document.addEventListener('click',e=>{const card=e.target.closest('[data-demo]');const cat=e.target.closest('[data-category]');if(card)openDemo(card.dataset.demo);if(cat)setCategory(cat.dataset.category)});
$('#search').addEventListener('input',e=>{query=e.target.value.trim();render()});
$('#reset-search').onclick=()=>{selected='전체';query='';$('#search').value='';render()};
document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)&&!$('#demo-dialog').open){e.preventDefault();$('#search').focus()}});
const colors=['#98b965','#c4d895','#698e43','#dce7c9','#aaba88'];
function makeChart(canvas,type,values=[12,19,14,25,20,30,22]){return new Chart(canvas,{type,data:{labels:type==='doughnut'?['기획','디자인','개발','테스트','운영']:['월','화','수','목','금','토','일'],datasets:[{label:'실험 횟수',data:type==='doughnut'?values.slice(0,5):values,backgroundColor:type==='line'?'#b6cf8e44':colors,borderColor:type==='line'?'#98b965':'#fff',borderWidth:type==='line'?2:0,borderRadius:4,tension:.35,fill:type==='line'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:type==='doughnut',position:'bottom',labels:{font:{size:12},boxWidth:10}},tooltip:{enabled:true}},scales:type==='doughnut'?{}:{x:{grid:{display:false},border:{display:false},ticks:{color:'#a0a795',font:{size:11}}},y:{beginAtZero:true,border:{display:false},grid:{color:'#edf0e7'},ticks:{stepSize:10,color:'#b1b6aa',font:{size:10}}}}}})}
heroChart=makeChart($('#hero-chart'),'bar');
document.querySelectorAll('[data-chart]').forEach(b=>b.onclick=()=>{heroChart.destroy();heroChart=makeChart($('#hero-chart'),b.dataset.chart);document.querySelectorAll('[data-chart]').forEach(x=>x.classList.toggle('active',x===b))});
$('#featured-open').onclick=()=>openDemo('bar');
const body=$('#demo-body');
function mount(html){body.innerHTML=html}
const input=(id,label,value,type='text')=>`<label>${label}<input id="${id}" type="${type}" value="${escapeHTML(value)}"></label>`;
const area=(id,value)=>`<textarea id="${id}" aria-label="입력 데이터">${escapeHTML(value)}</textarea>`;
const output=()=>'<div id="out" class="output" role="status" aria-live="polite"></div>';
const runButton=(text='실행하기')=>`<button id="run">${text}</button>`;
function textOut(v){$('#out',body).textContent=typeof v==='string'?v:JSON.stringify(v,null,2);$('#out',body).classList.remove('error')}
function safeRun(fn){return()=>{try{fn()}catch(e){textOut('입력을 확인해 주세요: '+e.message);$('#out',body)?.classList.add('error')}}}
function bind(fn,initial=true){$('#run',body).onclick=safeRun(fn);if(initial)safeRun(fn)()}
function openDemo(id){
 cleanups.forEach(fn=>fn());cleanups=[];
 const d=demos.find(d=>d.id===id);if(!d)return;
 $('#demo-title').textContent=d.title;$('#demo-library').textContent=`EXPERIMENT ${String(d.num).padStart(2,'0')} / ${d.lib}`;$('#demo-description').textContent=d.desc;$('#demo-code').textContent=d.code;$('#demo-code').removeAttribute('data-highlighted');hljs.highlightElement($('#demo-code'));$('#demo-docs').href=d.docs;
 try{setup(d)}catch(e){mount('<div class="output error">기능을 불러오지 못했습니다. vendor 폴더의 라이브러리 파일을 확인해 주세요.</div>');console.error(e)}
 if(!$('#demo-dialog').open)$('#demo-dialog').showModal();$('#demo-dialog').scrollTop=0;
}
$('#close-dialog').onclick=()=>$('#demo-dialog').close();
$('#demo-dialog').addEventListener('close',()=>{cleanups.forEach(fn=>fn());cleanups=[];confetti.reset()});
$('#demo-dialog').addEventListener('click',e=>{if(e.target===$('#demo-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});
$('#help').onclick=()=>Swal.fire({title:'JS Lab 사용 안내',html:'카드를 선택해 입력값을 바꾸고 실행해 보세요.<br><br>카테고리와 검색으로 기능을 찾을 수 있으며,<br>각 데모 아래에서 사용 코드와 공식 문서를 확인할 수 있어요.<br><br>입력 데이터는 서버로 전송하지 않습니다.',confirmButtonText:'탐험 시작',confirmButtonColor:'#688c42'});
function setup(d){
 const id=d.id;
 if(['bar','line','doughnut'].includes(id)){
  mount(`<div class="controls">${input('values','숫자 데이터 (쉼표로 구분)',id==='doughnut'?'35, 25, 20, 12, 8':'12, 19, 14, 25, 20, 30, 22')}${runButton('차트 업데이트')}</div>${id==='line'?'<div class="controls"><button id="add">새 데이터 추가</button></div>':''}<div class="demo-canvas"><canvas id="chart"></canvas></div>${output()}`);
  const chart=makeChart($('#chart',body),id);cleanups.push(()=>chart.destroy());
  bind(()=>{const data=$('#values',body).value.split(',').map(v=>Number(v.trim()));if(!data.length||data.some(v=>!Number.isFinite(v)||v<0))throw Error('0 이상의 숫자를 입력하세요.');chart.data.datasets[0].data=data;chart.data.labels=data.map((_,i)=>id==='doughnut'?['기획','디자인','개발','테스트','운영'][i]||`항목 ${i+1}`:`${i+1}일`);chart.update();textOut(`${data.length}개 항목 · 합계 ${_.sum(data)}`)});
  if(id==='line')$('#add',body).onclick=()=>{chart.data.labels.push(`${chart.data.labels.length+1}일`);chart.data.datasets[0].data.push(_.random(5,40));$('#values',body).value=chart.data.datasets[0].data.join(', ');chart.update();textOut('새 데이터가 추가되었습니다.')};return;
 }
 if(['anime','stagger','gsap','textmotion'].includes(id)){
  mount(`<div class="controls">${id==='textmotion'?input('text','등장할 텍스트','Hello, JS Lab!'):input('speed','움직임 속도 (ms)','1200','number')}${runButton('재생하기')}</div><div class="animation-stage" id="stage">${id==='stagger'?Array(6).fill('<div class="orb"></div>').join(''):id==='textmotion'?'<div class="letters"></div>':'<div class="orb"></div>'}</div>${output()}`);
  let anim;const orbs=body.querySelectorAll('.orb');cleanups.push(()=>{anime.remove(orbs);gsap.killTweensOf(orbs);anim?.kill?.();gsap.killTweensOf(body.querySelectorAll('.letters span'))});
  bind(()=>{if(id==='textmotion'){const text=$('#text',body).value.slice(0,30);$('.letters',body).innerHTML=[...text].map(c=>`<span style="display:inline-block">${c===' '?'&nbsp;':escapeHTML(c)}</span>`).join('');anim?.kill?.();anim=gsap.fromTo(body.querySelectorAll('.letters span'),{opacity:0,y:30},{opacity:1,y:0,stagger:.055,duration:.6});textOut('텍스트가 순서대로 등장합니다.');return}const speed=_.clamp(Number($('#speed',body).value)||1200,200,5000);const distance=Math.max(0,$('#stage',body).clientWidth-100);anime.remove(orbs);gsap.killTweensOf(orbs);gsap.set(orbs,{x:0,y:0,rotation:0,scale:1});if(id==='anime')anime({targets:orbs,translateX:distance,rotate:180,easing:'spring(1, 80, 10, 0)',duration:speed,direction:'alternate',loop:2});if(id==='stagger')anime({targets:orbs,translateY:-35,rotate:90,delay:anime.stagger(100),duration:speed,easing:'easeInOutSine',direction:'alternate',loop:2});if(id==='gsap'){anim?.kill?.();anim=gsap.timeline().to(orbs,{x:distance,duration:speed/1000}).to(orbs,{rotation:180,scale:1.4,duration:.5}).to(orbs,{x:0,scale:1,duration:.7})}textOut('재생 중 · 다시 눌러 반복할 수 있어요.')},false);return;
 }
 if(id==='sort'){
  mount('<p class="badge">왼쪽 핸들을 끌거나 위·아래 버튼으로 순서를 바꾸세요.</p><div class="sort-list" id="sort-list"></div>'+output());let items=['아이디어 정리','화면 설계','기능 구현','사용성 테스트'];
  const update=()=>{textOut([...$('#sort-list',body).children].map((el,i)=>`${i+1}. ${el.dataset.name}`).join('\n'));[...$('#sort-list',body).children].forEach((el,i)=>{el.querySelector('[data-move="-1"]').disabled=i===0;el.querySelector('[data-move="1"]').disabled=i===items.length-1})};
  $('#sort-list',body).innerHTML=items.map(n=>`<div class="sort-item" data-name="${n}"><span class="handle">⠿</span><span>${n}</span><button data-move="-1" aria-label="${n} 위로">↑</button><button data-move="1" aria-label="${n} 아래로" style="margin-left:0!important">↓</button></div>`).join('');const sortable=Sortable.create($('#sort-list',body),{animation:180,handle:'.handle',onEnd:update});cleanups.push(()=>sortable.destroy());$('#sort-list',body).onclick=e=>{const b=e.target.closest('[data-move]');if(!b)return;const el=b.parentElement;if(b.dataset.move==='-1'&&el.previousElementSibling)el.parentElement.insertBefore(el,el.previousElementSibling);if(b.dataset.move==='1'&&el.nextElementSibling)el.parentElement.insertBefore(el.nextElementSibling,el);update()};update();return;
 }
 if(id==='markdown'){
  mount(area('text','# Hello, JS Lab!\n\n작은 아이디어를 **직접 구현**해 보세요.\n\n- HTML로 구조 만들기\n- CSS로 스타일 더하기\n- JavaScript로 움직이기\n\n> 오늘의 실험이 내일의 서비스가 됩니다.')+'<p class="badge">실시간 미리보기</p>'+output());const update=()=>{$('#out',body).innerHTML=DOMPurify.sanitize(marked.parse($('#text',body).value));$('#out',body).style.whiteSpace='normal'};$('#text',body).oninput=update;update();return;
 }
 if(id==='highlight'){
  mount(`<div class="controls"><label>언어<select id="lang"><option value="javascript">JavaScript</option><option value="python">Python</option><option value="css">CSS</option><option value="xml">HTML</option></select></label></div>${area('text','const greet = (name) => {\n  return `Hello, ${name}!`;\n};\nconsole.log(greet("JS Lab"));')}<pre><code id="highlight-output"></code></pre>`);const update=()=>{$('#highlight-output',body).className='hljs';$('#highlight-output',body).innerHTML=hljs.highlight($('#text',body).value,{language:$('#lang',body).value}).value};$('#text',body).oninput=update;$('#lang',body).onchange=update;update();return;
 }
 if(id==='fuzzy'){
  mount(`<div class="controls">${input('text','기능 또는 라이브러리 검색 (예: chart, markdwn)','chart')}</div>${output()}`);const update=()=>{const q=$('#text',body).value.trim();const results=q?fuse.search(q).map(x=>x.item):demos;$('#out',body).innerHTML=results.length?results.map(r=>`<div class="result-row"><b>${r.title}</b> · ${r.lib}</div>`).join(''):'검색 결과가 없습니다.'};$('#text',body).oninput=update;update();return;
 }
 if(id==='date'){
  mount(`<div class="controls">${input('date','날짜와 시간',dayjs().format('YYYY-MM-DDTHH:mm'),'datetime-local')}<label>출력 형식<select id="format"><option>YYYY년 MM월 DD일 HH:mm</option><option>YYYY-MM-DD</option><option>DD/MM/YYYY</option><option>YYYY.MM.DD HH:mm:ss</option></select></label>${runButton('변환하기')}</div>${output()}`);bind(()=>{const date=dayjs($('#date',body).value);if(!date.isValid())throw Error('날짜를 선택하세요.');textOut(date.format($('#format',body).value))});return;
 }
 if(id==='dday'){
  mount(`<div class="controls">${input('date','목표 날짜',dayjs().add(30,'day').format('YYYY-MM-DD'),'date')}${runButton('계산하기')}</div>${output()}`);bind(()=>{const date=dayjs($('#date',body).value);if(!date.isValid())throw Error('날짜를 선택하세요.');const diff=date.startOf('day').diff(dayjs().startOf('day'),'day');textOut(`${diff===0?'D-DAY':diff>0?'D-'+diff:'D+'+Math.abs(diff)}\n오늘: ${dayjs().format('YYYY-MM-DD')}\n목표: ${date.format('YYYY-MM-DD')}`)});return;
 }
 if(id==='unique'){
  mount(`<div class="controls">${input('text','숫자 목록 (쉼표로 구분)','7, 3, 7, 1, 9, 3, 5, 1')}${runButton('정리하기')}</div>${output()}`);bind(()=>{const arr=$('#text',body).value.split(',').map(v=>Number(v.trim()));if(arr.some(v=>!Number.isFinite(v)))throw Error('숫자만 입력하세요.');textOut(`원본: ${arr.length}개\n중복 제거: ${_.uniq(arr).length}개\n결과: ${_.sortBy(_.uniq(arr)).join(', ')}`)});return;
 }
 if(id==='group'){
  mount(area('text','[{"name":"지민","team":"디자인"},{"name":"현우","team":"개발"},{"name":"수진","team":"디자인"},{"name":"민서","team":"기획"}]')+`<div class="controls">${input('key','그룹 기준 필드','team')}${runButton('그룹화')}</div>`+output());bind(()=>{const records=JSON.parse($('#text',body).value);if(!Array.isArray(records))throw Error('JSON 배열을 입력하세요.');textOut(_.groupBy(records,$('#key',body).value))});return;
 }
 if(id==='csv'){
  mount(area('text','이름,분류,수량\n노트북,전자기기,12\n키보드,전자기기,25\n노트,문구,40')+`<div class="controls">${runButton('JSON으로 변환')}</div>`+output());bind(()=>{const result=Papa.parse($('#text',body).value,{header:true,skipEmptyLines:true});if(result.errors.length)throw Error(result.errors.map(x=>x.message).join('; '));textOut(result.data)});return;
 }
 if(id==='csvexport'){
  mount(area('text','[{"이름":"지민","점수":95},{"이름":"현우","점수":88},{"이름":"수진","점수":92}]')+`<div class="controls">${runButton('CSV로 변환')}<button id="download">CSV 다운로드</button></div>`+output());const convert=()=>{const data=JSON.parse($('#text',body).value);if(!Array.isArray(data)||!data.length)throw Error('데이터가 있는 JSON 배열을 입력하세요.');return Papa.unparse(data,{escapeFormulae:true})};bind(()=>textOut(convert()));$('#download',body).onclick=safeRun(()=>{const csv=convert();const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download='js-lab-data.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);textOut('CSV 파일을 다운로드했습니다.\n'+csv)});return;
 }
 if(id==='qr'){
  mount(`<div class="controls">${input('text','텍스트 또는 URL','https://example.com')}${runButton('QR 생성')}</div><div id="qr" class="qr"></div>${output()}`);bind(()=>{const text=$('#text',body).value.trim();if(!text)throw Error('텍스트를 입력하세요.');if(new TextEncoder().encode(text).length>800)throw Error('800바이트 이내의 텍스트를 입력하세요.');$('#qr',body).innerHTML='';new QRCode($('#qr',body),{text,width:180,height:180,correctLevel:QRCode.CorrectLevel.M});textOut('QR 코드가 생성되었습니다.')});return;
 }
 if(id==='barcode'){
  mount(`<div class="controls">${input('text','영문 또는 숫자 (최대 40자)','JS-LAB-2026')}${runButton('바코드 생성')}</div><div class="output"><svg id="barcode" style="max-width:100%;height:auto"></svg></div>${output()}`);bind(()=>{const text=$('#text',body).value;if(!text||text.length>40||!/^[\x20-\x7E]+$/.test(text))throw Error('40자 이하 영문·숫자·기호를 입력하세요.');JsBarcode($('#barcode',body),text,{format:'CODE128',height:70,width:2,margin:15,fontSize:16});textOut('CODE128 바코드')});return;
 }
 if(id==='math'){
  mount(`<div class="controls">${input('text','수식 (예: sqrt(144) + 2^3)','sqrt(144) + 2^3')}${runButton('계산하기')}</div><p class="badge">+, −, *, /, ^, sqrt, sin, cos, log를 사용할 수 있어요.</p>${output()}`);bind(()=>{const expr=$('#text',body).value;if(expr.length>300||!/^[-+*/^().,\d\sA-Za-z]+$/.test(expr))throw Error('300자 이하의 숫자·함수 수식을 입력하세요.');const node=math.parse(expr);node.traverse(n=>{if(!['OperatorNode','ConstantNode','ParenthesisNode','SymbolNode','FunctionNode'].includes(n.type))throw Error('일반 수식만 지원합니다.');if(n.isSymbolNode&&!['pi','e','sqrt','sin','cos','tan','log','log10','abs','round','floor','ceil','min','max','exp'].includes(n.name))throw Error('지원하지 않는 함수입니다.')});textOut('= '+node.compile().evaluate())});return;
 }
 if(id==='unit'){
  mount(`<div class="controls">${input('text','값과 단위','100 cm')}${input('target','변환할 단위','m')}${runButton('단위 변환')}</div><p class="badge">100 cm → m / 5 kg → lb / 25 degC → degF</p>${output()}`);bind(()=>textOut(math.unit($('#text',body).value).to($('#target',body).value).toString()));return;
 }
 if(id==='palette'){
  mount(`<div class="controls">${input('start','시작 색','#284937','color')}${input('end','끝 색','#d5f087','color')}<label>색상 개수<select id="count"><option>5</option><option>7</option><option>9</option></select></label>${runButton('팔레트 생성')}</div><div id="palette" class="palette"></div>${output()}`);bind(()=>{const arr=chroma.scale([$('#start',body).value,$('#end',body).value]).mode('lch').colors(Number($('#count',body).value));$('#palette',body).innerHTML=arr.map(c=>`<div style="background:${c};color:${chroma.contrast(c,'white')>4.5?'white':'#222'}">${c}</div>`).join('');textOut(arr.join(' · '))});return;
 }
 if(id==='contrast'){
  mount(`<div class="controls">${input('bg','배경 색','#eaf1df','color')}${input('fg','글자 색','#293825','color')}${runButton('대비 확인')}</div><div id="sample" class="contrast-sample">Readable by design.</div>${output()}`);bind(()=>{const bg=$('#bg',body).value,fg=$('#fg',body).value,ratio=chroma.contrast(bg,fg);$('#sample',body).style.background=bg;$('#sample',body).style.color=fg;textOut(`대비율 ${ratio.toFixed(2)} : 1\n일반 텍스트 4.5:1 기준: ${ratio>=4.5?'통과':'미달'}\n큰 텍스트 3:1 기준: ${ratio>=3?'통과':'미달'}`)});return;
 }
 if(id==='confetti'){
  mount(`<div class="controls"><label>효과<select id="mode"><option value="party">축하 파티</option><option value="burst">양쪽에서 터뜨리기</option></select></label>${runButton('축하하기!')}</div><div class="output">작은 성공도 크게 축하하세요. ✦</div>`);bind(()=>{if($('#mode',body).value==='burst'){confetti({particleCount:60,angle:60,spread:55,origin:{x:0,y:.6}});confetti({particleCount:60,angle:120,spread:55,origin:{x:1,y:.6}})}else confetti({particleCount:120,spread:85,origin:{y:.65},disableForReducedMotion:true})},false);return;
 }
 if(id==='alert'){
  mount(`<div class="controls"><label>알림 종류<select id="mode"><option value="success">성공 알림</option><option value="warning">확인 요청</option><option value="error">오류 알림</option></select></label>${runButton('알림 띄우기')}</div>${output()}`);bind(async()=>{const mode=$('#mode',body).value;const result=await Swal.fire({target:$('#demo-dialog'),title:mode==='success'?'저장 완료!':mode==='warning'?'변경 사항을 저장할까요?':'다시 시도해 주세요',text:mode==='error'?'예시 오류 알림입니다.':'SweetAlert2로 만드는 사용자 피드백',icon:mode,showCancelButton:mode==='warning',confirmButtonText:mode==='warning'?'저장하기':'확인',cancelButtonText:'취소',confirmButtonColor:'#688c42'});if($('#demo-dialog').open)textOut(result.isConfirmed?'확인 버튼을 선택했습니다.':'알림을 닫았습니다.')},false);return;
 }
 if(id==='picker'){
  mount(`<div class="controls">${input('range','여행 또는 일정 기간','')}</div><div id="calendar"></div>${output()}`);const fp=flatpickr($('#range',body),{mode:'range',inline:true,appendTo:$('#calendar',body),dateFormat:'Y-m-d',onChange:dates=>{if(dates.length===2)textOut(`${dayjs(dates[0]).format('YYYY-MM-DD')} ~ ${dayjs(dates[1]).format('YYYY-MM-DD')}\n총 ${dayjs(dates[1]).diff(dayjs(dates[0]),'day')+1}일 (시작일·종료일 포함)`);else textOut('종료일을 선택하세요.')}});cleanups.push(()=>fp.destroy());textOut('시작일과 종료일을 달력에서 선택해 주세요.');return;
 }
 if(id==='sanitize'){
  mount(area('text','<h3>안녕하세요!</h3>\n<p>이 문장은 <b>그대로 남아요.</b></p>\n<img src="x" onerror="alert(1)">\n<script>alert("unsafe")</script>')+`<div class="controls">${runButton('HTML 정리하기')}</div>`+output()+'<p class="badge">정리된 HTML 미리보기 (외부 이미지 제외)</p><div id="preview" class="output"></div>');bind(()=>{const clean=DOMPurify.sanitize($('#text',body).value,{FORBID_TAGS:['img','iframe','video','audio','style'],FORBID_ATTR:['style']});textOut(clean);$('#preview',body).innerHTML=clean});return;
 }
 if(id==='compress'){
  mount(area('text','JavaScript로 새로운 가능성을 만듭니다. '.repeat(12))+`<div class="controls">${runButton('압축 & 복원')}</div>`+output());bind(()=>{const text=$('#text',body).value,c=LZString.compressToBase64(text),restored=LZString.decompressFromBase64(c),bytes=new TextEncoder().encode(text).length; textOut(`원본 UTF-8: ${bytes}바이트\n압축 Base64: ${c.length}바이트\n${bytes?'크기 비율: '+(c.length/bytes*100).toFixed(1)+'%\n':''}복원 일치: ${restored===text?'성공':'실패'}\n\n압축 문자열:\n${c}\n\n복원 텍스트:\n${restored}`)});return;
 }
 if(id==='uuid'){
  mount(`<div class="controls"><label>생성 개수<select id="count"><option>1</option><option>5</option><option>10</option></select></label>${runButton('ID 생성')}<button id="copy">복사하기</button></div>${output()}`);bind(()=>textOut(Array.from({length:Number($('#count',body).value)},()=>uuid.v4()).join('\n')));$('#copy',body).onclick=async()=>{const text=$('#out',body).textContent;try{if(navigator.clipboard)await navigator.clipboard.writeText(text);else{const t=document.createElement('textarea');t.value=text;body.append(t);t.select();if(!document.execCommand('copy'))throw Error();t.remove()}$('#copy',body).textContent='복사 완료'}catch{$('#copy',body).textContent='직접 선택해 복사해 주세요'}};return;
 }
 if(id==='shuffle'){
  mount(area('text','지민\n현우\n수진\n민서\n지우\n서연\n도윤\n하준')+`<div class="controls">${input('size','팀당 인원','2','number')}${runButton('랜덤 팀 만들기')}</div>${output()}`);bind(()=>{const names=$('#text',body).value.split('\n').map(x=>x.trim()).filter(Boolean),size=Number($('#size',body).value);if(!names.length||!Number.isInteger(size)||size<1||size>100)throw Error('명단과 1~100 사이 팀 인원을 입력하세요.');textOut(_.chunk(_.shuffle(names),size).map((team,i)=>`팀 ${i+1}: ${team.join(', ')}`).join('\n'))});return;
 }
}
render();
