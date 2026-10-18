(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(n){if(n.ep)return;n.ep=!0;const l=a(n);fetch(n.href,l)}})();const j=["소설","시","수필","동화","시나리오","웹소설","논픽션","생활글"],S={생활글:"수기·독후감·백일장·편지"},q="./data.json",p=40,o={q:"",field:"",open:!0,anyone:!1,sort:"deadline",shown:p,items:[],meta:null,listScroll:0},f=document.getElementById("app"),r=t=>(t||"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),w=()=>{const t=new Date(Date.now()+324e5);return new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()))},m=t=>{const[e,a,s]=t.split("-").map(Number);return new Date(Date.UTC(e,a-1,s))},C=t=>Math.round((m(t).getTime()-w().getTime())/864e5),M=["일","월","화","수","목","금","토"],$=t=>{const e=m(t);return`${e.getUTCMonth()+1}.${String(e.getUTCDate()).padStart(2,"0")} (${M[e.getUTCDay()]})`},L=t=>{if(!t.deadline)return{d:"상시",cls:""};const e=C(t.deadline);return e<0?{d:"마감",cls:""}:e===0?{d:"오늘",cls:"urgent"}:{d:`D-${e}`,cls:e<=7?"urgent":""}};function _(t){const e=new Date(t.updated_at),a=new Date(e.getTime()+9*36e5),s=a.getUTCHours(),n=`${a.getUTCMonth()+1}월 ${a.getUTCDate()}일 ${s<12?"오전":"오후"} ${s%12||12}:${String(a.getUTCMinutes()).padStart(2,"0")}`,l=t.schedule.map(c=>{const d=+c.slice(0,2);return`${d<12?"오전":"오후"} ${d%12||12}시`}).join("·"),i=Date.now()-e.getTime()>15*36e5;return{when:n,sched:l,late:i}}function x(){const t=o.q.trim().toLowerCase();let e=o.items.filter(s=>o.open?!s.closed:!0);if(o.field&&(e=e.filter(s=>s.fields.includes(o.field))),o.anyone&&(e=e.filter(s=>s.aud.includes("누구나")&&!s.aud.includes("지역 한정"))),t){const s=t.split(/\s+/);e=e.filter(n=>{const l=[n.title,n.org,n.elig,n.theme,n.parts,n.fields.join(" ")].join(" ").toLowerCase();return s.every(i=>l.includes(i))})}const a=s=>(s.closed?"1":"0")+(s.deadline||"9999");return o.sort==="deadline"&&e.sort((s,n)=>a(s).localeCompare(a(n))),o.sort==="prize"&&e.sort((s,n)=>(n.prize_won||0)-(s.prize_won||0)||a(s).localeCompare(a(n))),o.sort==="new"&&e.sort((s,n)=>(n.first_seen||"").localeCompare(s.first_seen||"")||a(s).localeCompare(a(n))),e}function I(t){if(t.closed)return"마감됨";if(!t.deadline)return"상시·미정";const e=C(t.deadline),a=w(),s=(7-a.getUTCDay())%7;if(e<=s)return"이번 주";if(e<=s+7)return"다음 주";const n=m(t.deadline);return`${n.getUTCFullYear()!==a.getUTCFullYear()?`${n.getUTCFullYear()}년 `:""}${n.getUTCMonth()+1}월`}const O=t=>!!t.first_seen&&(w().getTime()-m(t.first_seen).getTime())/864e5<=2;function T(t){const e=L(t),a=t.fields.join(" · "),s=[["자격",t.elig],["방법",t.how],["상금",t.prize]].filter(([,n])=>n);return`<li class="item${t.closed?" closed":""}"><a class="row" href="#/c/${t.id}">
    <div class="when"><span class="d ${e.cls}">${e.d}</span>${t.deadline?`<span class="md">${$(t.deadline)}</span>`:""}</div>
    <div class="main-col">
      <h3 class="t">${r(t.title)}${O(t)&&!t.closed?'<span class="new">새로</span>':""}${t.expected?'<span class="new">공고 전</span>':""}</h3>
      <div class="sub"><span class="f">${r(a)}</span>${t.org?` · ${r(t.org)}`:""}</div>
    </div>
    ${s.length?`<dl class="facts">${s.map(([n,l])=>`<dt>${n}</dt><dd${n==="상금"?' class="money"':""}>${r(l)}</dd>`).join("")}</dl>`:'<dl class="facts"><dt></dt><dd>자세한 조건은 원문에서 확인</dd></dl>'}
  </a></li>`}function h(){const t=x(),e={},a=o.items.filter(c=>o.open?!c.closed:!0);for(const c of a)for(const d of c.fields)e[d]=(e[d]||0)+1;const s=t.slice(0,o.shown);let n="";if(o.sort==="deadline"){let c="",d=[];const v=()=>{d.length&&(n+=`<section class="group"><h2>${r(c)}<span>${d.length}건</span></h2><ul class="list">${d.join("")}</ul></section>`),d=[]};for(const b of s){const y=I(b);y!==c&&(v(),c=y),d.push(T(b))}v()}else n=`<ul class="list">${s.map(T).join("")}</ul>`;const l=o.meta,i=l?_(l):null;f.innerHTML=`
  <header class="mast"><div class="wrap">
    <div class="mast-row"><a class="logo" href="#/">글마감<small>글쓰기 공모전 모음</small></a>
      <nav class="mast-links"><button class="linkish" data-act="intro">이용 안내</button></nav></div>
    <p class="lede">소설·시·수필·동화·시나리오·웹소설 공모전을 마감이 가까운 순서로 모았습니다.</p>
    ${i?`<p class="stamp"><span>매일 <b>${i.sched}</b> 두 번 갱신</span><span>마지막 갱신 <b>${i.when}</b></span>${i.late?'<span class="late">· 갱신이 늦어지고 있어요</span>':""}</p>`:""}
  </div></header>
  <div class="wrap layout">
    <aside class="side"><div class="tools">
      <label class="search"><span class="sr">검색</span><input type="search" id="q" placeholder="제목·주최·자격으로 찾기" value="${r(o.q)}" enterkeyhint="search" autocomplete="off" /></label>
      <span class="lbl">분야</span>
      <div class="fields" role="group" aria-label="분야">
        <button aria-pressed="${!o.field}" data-field="">전체<span class="n">${a.length}</span></button>
        ${j.map(c=>`<button aria-pressed="${o.field===c}" data-field="${c}" title="${S[c]||""}">${c}<span class="n">${e[c]||0}</span></button>`).join("")}
      </div>
      <div class="opts">
        <span class="sort">정렬 <select id="sort" aria-label="정렬">
          <option value="deadline"${o.sort==="deadline"?" selected":""}>마감 임박순</option>
          <option value="prize"${o.sort==="prize"?" selected":""}>1등 상금 큰 순</option>
          <option value="new"${o.sort==="new"?" selected":""}>새로 올라온 순</option>
        </select></span>
        <label><input type="checkbox" id="anyone"${o.anyone?" checked":""} />일반인 응모 가능만</label>
        <label><input type="checkbox" id="closed"${o.open?"":" checked"} />마감된 것도 보기</label>
      </div>
      <p class="side-note">생활글은 수기·독후감·백일장·편지처럼 장르를 따로 두지 않는 글입니다. 상금순은 1등 상금을 알 수 있는 것만 위로 올립니다.</p>
    </div></aside>
    <main>
      <div class="count"><span><strong>${t.length}</strong>건${o.field?` · ${r(o.field)}`:""}</span><span>${o.open?"마감 전":"마감 포함"}</span></div>
      ${t.length?n:`<p class="empty">${o.items.length?"조건에 맞는 공모전이 없습니다.":"불러오는 중…"}</p>`}
      ${t.length>o.shown?`<button class="more" data-act="more">${Math.min(p,t.length-o.shown)}건 더 보기 <span style="font-weight:400;color:var(--muted)">(${o.shown} / ${t.length})</span></button>`:""}
      ${D()}
    </main>
  </div>`}function D(){const t=o.meta,e=t?Object.entries(t.stat).filter(([,a])=>a.kept>0).map(([a,s])=>`<span>${r(a)} ${s.kept}</span>`).join(""):"";return`<footer class="foot">
    <p>위비티·씽굿·씽유·콘테스트코리아·링커리어·더팀스·올콘·캠퍼스픽·요즘것들의 공개 목록과 주요 신문사·출판사 공고를 모아 글쓰기 공모전만 골랐습니다. 자격·방법·상금은 공고문에서 규칙으로 뽑은 요약이라 빠지거나 틀릴 수 있습니다. 응모 전에 꼭 원문을 확인하세요.</p>
    ${e?`<p class="srcs">출처별 건수 ${e}</p>`:""}
    <p>로그인·쿠키 없이 운영합니다.</p>
  </footer>`}function u(t,e,a=""){return`<div><dt>${t}</dt><dd class="${e?a:"none"}">${e?r(e):"공고문에서 찾지 못했어요. 원문을 확인하세요."}</dd></div>`}function F(t){var l;const e=o.items.find(i=>i.id===t);if(!e){f.innerHTML=`<div class="wrap"><button class="back" data-act="back">목록</button><p class="empty">${o.items.length?"찾는 공모전이 없습니다. 마감되어 내려갔을 수 있어요.":"불러오는 중…"}</p></div>`;return}const a=L(e),s=e.homepage||((l=e.sources[0])==null?void 0:l.url),n=[["부문",e.parts],["주제",e.theme],["심사",e.judge],["발표",e.announce],["접수 기간",e.period],["참가비",e.fee]].filter(([,i])=>i).map(([i,c])=>u(i,c)).join("");f.innerHTML=`
  <header class="mast"><div class="wrap"><div class="mast-row"><a class="logo" href="#/">글마감<small>글쓰기 공모전 모음</small></a></div></div></header>
  <div class="wrap"><article class="detail">
    <button class="back" data-act="back">목록으로</button>
    <p class="kicker">${r(e.fields.join(" · "))}</p>
    <h1>${r(e.title)}</h1>
    ${e.org?`<p class="org">${r(e.org)}</p>`:""}
    <div class="deadline-box"><span class="d ${a.cls}">${a.d}</span><span class="md">${e.deadline?`${$(e.deadline)} 마감`:"마감일 미정"}${e.start?` · ${$(e.start)} 접수 시작`:""}</span></div>
    ${e.note?`<p class="note">${r(e.note)}</p>`:""}
    <dl class="spec">
      ${u("응모 자격",e.elig)}
      ${u("참가 방법",e.how)}
      ${u("상금",e.prize,"money")}
      ${u("분량",e.length)}
      ${u("제출물",e.submit)}
      ${n}
    </dl>
    <div class="go">
      ${s?`<button class="ext primary" data-url="${r(s)}">${e.homepage?"주최 측 공고 보기":`${r(e.sources[0].name)}에서 원문 보기`}<span>↗</span></button>`:""}
      ${e.sources.filter(i=>i.url&&i.url!==s).map(i=>`<button class="ext src" data-url="${r(i.url)}">${r(i.name)}에서 보기<small>모음 사이트</small><span>↗</span></button>`).join("")}
    </div>
    <p class="caveat">위 내용은 공고문에서 자동으로 뽑은 요약입니다. 분량·제출 형식·발표일은 바뀌기 쉬우니 응모 전에 원문을 꼭 확인하세요.</p>
    ${D()}
  </article></div>`,window.scrollTo(0,0)}const E="gm-intro-1";function N(){try{return localStorage.getItem(E)==="1"}catch{return!1}}function U(){const t=document.createElement("div");t.className="intro-back",t.innerHTML=`<div class="intro" role="dialog" aria-modal="true" aria-labelledby="intro-h">
    <h2 id="intro-h">글마감은 이렇게 씁니다</h2>
    <section><h3>무엇을 모으나</h3><ul>
      <li>여러 공모전 사이트의 글쓰기 공모전을 한곳에 모읍니다.</li>
      <li>소설·시·수필·동화·시나리오·웹소설·논픽션이 대상입니다.</li>
      <li>하루 두 번, 오전 9시와 오후 9시에 새 공고를 모읍니다.</li>
    </ul></section>
    <section><h3>목록 보기</h3><ul>
      <li>마감이 가까운 것부터 보여 줍니다.</li>
      <li>줄마다 남은 날, 응모 자격, 참가 방법, 상금이 있습니다.</li>
      <li>마감이 지난 공고는 기본으로 숨깁니다.</li>
    </ul></section>
    <section><h3>좁혀 보기</h3><ul>
      <li>분야 탭으로 소설·시·수필 등을 고릅니다.</li>
      <li>‘일반인 응모 가능만’을 켜면 학생·지역 한정 공모를 뺍니다.</li>
      <li>정렬은 마감순, 1등 상금순, 새로 올라온 순이 있습니다.</li>
      <li>검색은 제목·주최·자격을 함께 찾습니다.</li>
    </ul></section>
    <section><h3>응모하기</h3><ul>
      <li>공고를 누르면 분량·제출물·심사·발표가 나옵니다.</li>
      <li>응모는 주최 측 원문 링크에서 합니다.</li>
    </ul></section>
    <button class="ok" data-act="intro-ok">알겠어요</button>
    <p class="fine">이 안내는 위쪽 ‘이용 안내’에서 다시 볼 수 있어요.</p>
  </div>`;const e=()=>{t.remove();try{localStorage.setItem(E,"1")}catch{}};t.addEventListener("click",a=>{const s=a.target;(s===t||s.dataset.act==="intro-ok")&&e()}),document.addEventListener("keydown",function a(s){s.key==="Escape"&&(e(),document.removeEventListener("keydown",a))}),document.body.appendChild(t),t.querySelector(".ok").focus()}async function z(t){window.open(t,"_blank","noopener")}function g(){const t=location.hash.match(/^#\/c\/([\w-]+)/);t?F(t[1]):(h(),requestAnimationFrame(()=>window.scrollTo(0,o.listScroll)))}let k;f.addEventListener("input",t=>{const e=t.target;e.id==="q"&&(clearTimeout(k),k=window.setTimeout(()=>{o.q=e.value,o.shown=p;const a=e.selectionStart;h();const s=document.getElementById("q");s.focus(),s.setSelectionRange(a,a)},160))});f.addEventListener("change",t=>{const e=t.target;if(e.id==="sort")o.sort=e.value;else if(e.id==="anyone")o.anyone=e.checked;else if(e.id==="closed")o.open=!e.checked;else return;o.shown=p,h()});f.addEventListener("click",t=>{const e=t.target.closest("[data-field],[data-act],[data-url],a.row");if(!e)return;if(e.matches("a.row")){o.listScroll=window.scrollY;return}if(e.dataset.url){t.preventDefault(),z(e.dataset.url);return}if("field"in e.dataset){o.field=e.dataset.field||"",o.shown=p,h();return}const a=e.dataset.act;a==="more"&&(o.shown+=p,h()),a==="intro"&&U(),a==="back"&&(history.length>1&&document.referrer!==""||history.state!==null?history.back():location.hash="#/")});window.addEventListener("hashchange",g);async function Y(){g(),N()||U();const t=[q];for(const e of t)try{const a=await fetch(e,{cache:"no-cache"});if(!a.ok)continue;const s=await a.json();o.items=s.items,o.meta=s.meta;break}catch{}g()}Y();
