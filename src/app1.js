/* ============ Core ============ */
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const hash=s=>{let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36)};
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const rng=mulberry(20261117);
function shuffle(a,r=Math.random){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const SUBS={
 prog:['BJCP Program & Ethics','Program'],bsour:['Belgian & Sour Ales','Styles'],bdark:['Brown & Dark Ales','Styles'],
 eaale:['English & American Ales','Styles'],lager:['Lagers','Styles'],wheat:['Wheat Beers','Styles'],ipas:['IPAs & Strong Ales','Styles'],
 cpale:['Pale Ale Comparison','Styles'],cdark:['Dark Ale Comparison','Styles'],clager:['Lager Comparison','Styles'],cmixed:['Mixed Style Comparison','Styles'],
 chars:['Beer Characteristics','Technical'],proc:['Process & Ingredients','Technical']};
const BP=[['prog',{TF:20}],['bsour',{TF:4,MC:4}],['bdark',{TF:8,MC:4}],['eaale',{TF:4,MC:4}],['lager',{TF:8,MC:4}],['wheat',{TF:4}],['ipas',{TF:4}],
 ['cpale',{TF:6}],['cdark',{TF:6}],['clager',{TF:6}],['cmixed',{TF:6,MC:8,MA:12}],['chars',{TF:24,MC:12}],['proc',{TF:12,MC:8,MA:12}]];
const TYPE_NAME={TF:'True/False',MC:'Multiple choice',MA:'Check all that apply'};

/* ---- persistence (localStorage wrapped; falls back to memory) ---- */
const KEY='bjcpPrepV1';
let MEM=null;
function load(){
  try{const r=localStorage.getItem(KEY);if(r)return Object.assign({q:{},cards:{},exams:[],guide:{},days:{}},JSON.parse(r))}catch(e){}
  return MEM||{q:{},cards:{},exams:[],guide:{},days:{}};
}
let S=load();
function save(){MEM=S;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function exportProgress(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'}));a.download='bjcp-progress.json';a.click()}
function importProgress(f){if(!f)return;f.text().then(t=>{try{S=Object.assign(S,JSON.parse(t));save();toast('Progress imported');go(view)}catch(x){toast('Could not read that file')}})}
function today(){return new Date().toISOString().slice(0,10)}
function bump(n=1){S.days[today()]=(S.days[today()]||0)+n}
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2200)}

/* ---- style data + generated questions/cards ---- */
const STY=STYLEDATA.styles, CATS=STYLEDATA.cats;
const mid=(s,k)=>(s.stats[k][0]+s.stats[k][1])/2;
const fmt=(r,k)=>k==='OG'||k==='FG'?r[0].toFixed(3)+'-'+r[1].toFixed(3):(k==='ABV'?r[0]+'-'+r[1]+'%':r[0]+'-'+r[1]);
const GROUPS={
 cpale:['1C','1D','5B','11A','11B','11C','12A','12B','12C','18A','18B','19A','21A','21C','22A','24A','24B','25B'],
 cdark:['8A','8B','13A','13B','13C','14A','14B','14C','15A','15B','15C','16A','16B','16C','16D','17A','17B','17C','17D','19C','20A','20B','20C','26B','26D','9A','9C'],
 clager:['1A','1B','2A','2B','2C','3A','3B','3C','3D','4A','4B','4C','5A','5C','5D','6A','6B','6C','7A','8A','8B','9A','9B']};
const METRICS={ABV:{lbl:'ABV',t:1.2,hi:'stronger (higher ABV)'},IBU:{lbl:'IBU',t:14,hi:'more bitter (higher IBU range)'},SRM:{lbl:'SRM',t:7,hi:'darker (higher SRM)'}};
function genQs(){
  const out=[];
  const byCode={};STY.forEach(s=>{if(s.stats&&!s.name.startsWith('Specialty'))byCode[s.code]=s});
  for(const [sub,codes] of Object.entries(GROUPS)){
    const L=codes.map(c=>byCode[c]).filter(Boolean);const pairs=[];
    for(let i=0;i<L.length;i++)for(let j=0;j<L.length;j++)if(i<j)for(const m of Object.keys(METRICS)){
      const d=Math.abs(mid(L[i],m)-mid(L[j],m));if(d>=METRICS[m].t*1.4)pairs.push([L[i],L[j],m]);}
    const pick=shuffle(pairs,rng).slice(0,sub==='cpale'?22:20);
    pick.forEach(([a,b,m])=>{
      const [x,y]=rng()<.5?[a,b]:[b,a];const ans=mid(x,m)>mid(y,m);
      out.push({sub,t:'TF',gen:1,q:`${x.name} is typically ${METRICS[m].hi} than ${y.name}.`,a:ans,
        e:`${x.name} ${m} ${fmt(x.stats[m],m)}; ${y.name} ${m} ${fmt(y.stats[m],m)} (BJCP ranges).`});
    });
  }
  // "which has the highest" MC across mixed groups
  const pool=STY.filter(s=>s.stats&&!s.name.startsWith('Specialty')&&s.cat<=26);
  for(const m of ['ABV','IBU','SRM']){
    let made=0;
    for(let k=0;k<80&&made<7;k++){
      const four=shuffle(pool,rng).slice(0,4).sort((a,b)=>mid(b,m)-mid(a,m));
      const gaps=four.every((s,i)=>i===0||Math.abs(mid(four[i-1],m)-mid(s,m))>=METRICS[m].t*.8);
      if(!gaps)continue;
      const hi=rng()<.5;const o=shuffle(four,rng);const best=hi?four[0]:four[four.length-1];
      out.push({sub:'cmixed',t:'MC',gen:1,q:`Which of these styles typically has the ${hi?'highest':'lowest'} ${m==='SRM'?(hi?'SRM (darkest color)':'SRM (palest color)'):m}?`,
        o:o.map(s=>s.name),a:o.indexOf(best),
        e:four.map(s=>`${s.name}: ${fmt(s.stats[m],m)}`).join('; ')});made++;
    }
  }
  return out;
}
const QALL=(()=>{const seen=new Set();return QB.concat(genQs()).filter(q=>{const k=q.sub+'|'+q.q;if(seen.has(k))return false;seen.add(k);q.id=q.sub+':'+hash(q.q+(q.o?q.o.join('|'):''));return true})})();
const QBYID=Object.fromEntries(QALL.map(q=>[q.id,q]));
// flashcards from styles
STY.forEach(s=>{
  if(!s.stats)return;
  const st=['OG','FG','IBU','SRM','ABV'].map(k=>`${k} ${fmt(s.stats[k],k)}`).join(' | ');
  FLASH.push({deck:'styles',f:`Stats: ${s.name} (${s.code})`,b:st});
  const key=s.text.find(t=>/^Key:/.test(t))||s.text[0];
  const cmp=s.text.find(t=>/^Comparison:/.test(t));
  FLASH.push({deck:'styles',f:`Key traits: ${s.name} (${s.code})`,b:key.replace(/^Key:\s*/,'')+(cmp?'\n'+cmp:'')});
});
FLASH.forEach((c,i)=>c.id=c.deck+':'+hash(c.f));
const DECKS=[['all','All decks'],['program','BJCP Program'],['faults','Faults & flavors'],['process','Process & ingredients'],['judging','Judging'],['styles','Style stats & traits']];

function srmColor(s){const P=[[1,'#F8F753'],[2,'#F6F513'],[3,'#ECE61A'],[4,'#D5BC26'],[6,'#BF923B'],[8,'#BF813A'],[10,'#BC6733'],[13,'#8D4C32'],[17,'#5D341A'],[20,'#261716'],[24,'#0F0B0A'],[40,'#030403']];
  if(s<=P[0][0])return P[0][1];for(let i=1;i<P.length;i++)if(s<=P[i][0])return P[i][1];return P[P.length-1][1]}

/* ---- stats ---- */
function subStats(){
  const r={};for(const k of Object.keys(SUBS))r[k]={total:0,seen:0,ok:0,n:0};
  QALL.forEach(q=>{const x=r[q.sub];x.total++;const h=S.q[q.id];if(h){x.seen++;x.n+=h.n;if(h.ok)x.ok++}});
  return r;
}
function readiness(){
  const st=subStats();let exp=0,tot=0;
  const base={TF:.5,MC:.2,MA:0};
  for(const [sub,m] of BP){for(const [t,n] of Object.entries(m)){
    const qs=QALL.filter(q=>q.sub===sub&&q.t===t);let seen=0,ok=0;qs.forEach(q=>{const h=S.q[q.id];if(h){seen++;if(h.ok)ok++}});
    const w=Math.min(seen,6)/6;const p=seen?(w*(ok/seen)+(1-w)*base[t]):base[t];exp+=n*p;tot+=n;}}
  return {pct:exp/tot,have:Object.values(st).reduce((a,b)=>a+b.seen,0),total:QALL.length};
}
function dueCards(){const now=Date.now();return FLASH.filter(c=>{const s=S.cards[c.id];return !s||s.due<=now})}

/* ============ Router ============ */
const TABS=[['home','Dashboard'],['learn','Learn'],['cards','Flashcards'],['quiz','Quiz'],['exam','Mock Exam'],['styles','Styles'],['res','Resources']];
let view='home';
let examState=null;
function go(v,arg){
  if(examState&&examState.running&&v!=='exam'){if(!confirm('A mock exam is in progress. Leave it? (The timer keeps running and answers are kept until you reload.)'))return}
  view=v;renderTabs();const app=$('#app');app.innerHTML='';window.scrollTo(0,0);
  ({home:renderHome,learn:renderLearn,cards:renderCards,quiz:renderQuizSetup,exam:renderExam,styles:renderStyles,res:renderRes}[v])(app,arg);
}
function renderTabs(){const t=$('#tabs');t.innerHTML='';TABS.forEach(([k,l])=>{const b=document.createElement('button');b.textContent=l;if(k===view)b.className='on';b.onclick=()=>go(k);t.appendChild(b)})}
window.addEventListener('beforeunload',e=>{if(examState&&examState.running){e.preventDefault();e.returnValue=''}});

/* ============ Dashboard ============ */
function renderHome(app){
  const st=subStats(),rd=readiness();
  const pct=Math.round(rd.pct*100);const pass=64;
  const due=dueCards().length;
  const exams=S.exams.slice(-5).reverse();
  const streak=(()=>{let n=0;const d=new Date();for(;;){const k=d.toISOString().slice(0,10);if(S.days[k]){n++;d.setDate(d.getDate()-1)}else if(n===0&&k===today()){d.setDate(d.getDate()-1)}else break}return n})();
  let h=`<h1>Your path to the BJCP Entrance Exam</h1>
  <p class="muted">180 questions, 60 minutes, open book. You need <b>116 correct (64%)</b> to pass and unlock the Judging Exam. Wrong answers cost nothing, so answer every question.</p>
  <div class="grid g3" style="margin:16px 0">
    <div class="card stat"><span class="muted small">Estimated mock score</span><span class="big" style="color:${pct>=pass?'var(--good)':'var(--accent)'}">${pct}%</span>
      <div class="bar ${pct>=pass?'good':''}" style="margin-top:8px"><i style="width:${pct}%"></i><span class="mark" style="left:${pass}%"></span></div>
      <span class="small muted">${rd.have===0?'Answer practice questions to build an estimate.':`Based on ${rd.have} of ${rd.total} questions seen. Line = 64% pass mark.`}</span></div>
    <div class="card stat"><span class="muted small">Flashcards due</span><span class="big">${due}</span><span class="small muted">of ${FLASH.length} cards</span>
      <div style="margin-top:8px"><button class="btn sm" id="hCards">Review cards</button></div></div>
    <div class="card stat"><span class="muted small">Study streak</span><span class="big">${streak}<span style="font-size:1rem;font-weight:600"> day${streak===1?'':'s'}</span></span><span class="small muted">${S.days[today()]||0} items today</span>
      <div style="margin-top:8px"><button class="btn sm" id="hDaily">Daily 20 mix</button></div></div>
  </div>
  <div class="row" style="margin-bottom:18px">
    <button class="btn" id="hMock">Take a mock exam</button>
    <button class="btn ghost" id="hMiss">Review missed questions</button>
    <button class="btn ghost" id="hLearn">Open study guide</button>
  </div>
  <div class="grid g2">
  <div class="card"><h2>Progress by exam section</h2><p class="small muted">Accuracy of your most recent answer on each question you have seen. Coverage shows how much of the bank you have tried.</p>`;
  ['Program','Styles','Technical'].forEach(g=>{
    h+=`<h3 style="margin-top:.9em">${g==='Program'?'BJCP Program':g}</h3>`;
    Object.entries(SUBS).filter(([,v])=>v[1]===g).forEach(([k,v])=>{
      const x=st[k];const acc=x.seen?Math.round(100*x.ok/x.seen):0;
      h+=`<div style="margin:9px 0"><div class="row" style="justify-content:space-between"><span>${v[0]}</span><span class="small muted">${x.seen?acc+'% correct':'not started'} &middot; ${x.seen}/${x.total} seen</span></div>
      <div class="bar ${x.seen&&acc>=64?'good':''}"><i style="width:${x.seen?acc:0}%"></i></div></div>`;});
  });
  h+=`</div><div class="grid" style="align-content:start">
  <div class="card"><h2>Recent mock exams</h2>${exams.length?`<table><tr><th>Date</th><th>Mode</th><th>Score</th><th></th></tr>`+exams.map(e=>`<tr><td>${new Date(e.t).toLocaleDateString()}</td><td>${esc(e.mode)}</td><td>${e.score}/${e.total} (${Math.round(100*e.score/e.total)}%)</td><td><span class="pill ${e.pass?'good':'bad'}">${e.pass?'PASS':'not yet'}</span></td></tr>`).join('')+'</table>':'<p class="muted">No mock exams yet. Try a full 180-question run once you have covered the guide.</p>'}</div>
  <div class="card"><h2>5-week study plan</h2>${PLAN.map(p=>`<p style="margin:.5em 0"><b>${p[0]}:</b> ${esc(p[1])}</p>`).join('')}</div></div></div>
  <div class="card" style="margin-top:16px"><h2>How your progress is stored</h2>
  <ul class="tight small">
    <li><b>On this device only.</b> Your answers, flashcard schedule, mock exam scores and streak are saved in this browser&rsquo;s local storage. There is no account, no server and nothing is uploaded; the site host never sees your progress.</li>
    <li><b>Tied to one browser.</b> A different browser, a different device, or a private/incognito window starts with empty progress. Clearing site data for this page erases it. If your browser blocks storage, progress is kept only until you close the tab.</li>
    <li><b>Moving between devices:</b> choose <i>Export progress</i> here, send the file to your other device (email, cloud drive, AirDrop), and choose <i>Import</i> there. Import <b>replaces</b> that device&rsquo;s saved progress with the file&rsquo;s contents, so export from the device you used most recently.</li>
    <li><b>Back up before big changes.</b> Export a copy now and then, especially before clearing browser data or switching browsers.</li>
  </ul>
  <div class="row" style="margin-top:10px"><button class="btn ghost sm" id="hExp">Export progress</button><label class="btn ghost sm" style="cursor:pointer">Import progress<input type="file" id="hImp" accept="application/json" hidden></label></div></div>`;
  app.innerHTML=h;
  $('#hExp').onclick=exportProgress;$('#hImp').onchange=e=>importProgress(e.target.files[0]);
  $('#hCards').onclick=()=>go('cards');$('#hMock').onclick=()=>go('exam');$('#hLearn').onclick=()=>go('learn');
  $('#hDaily').onclick=()=>startQuiz({sub:'all',type:'any',n:20,mode:'smart'});
  $('#hMiss').onclick=()=>startQuiz({sub:'all',type:'any',n:20,mode:'missed'});
}

/* ============ Learn ============ */
function renderLearn(app,secId){
  const id=secId||'strategy';const sec=GUIDE.find(s=>s.id===id)||GUIDE[0];
  let h=`<div class="learn"><div class="side">`+GUIDE.map(s=>`<button data-s="${s.id}" class="${s.id===sec.id?'on':''}">${esc(s.title)}${S.guide[s.id]?'<span class="done">&#10003;</span>':''}</button>`).join('')+`</div><div>
  <div class="card"><div class="row" style="justify-content:space-between"><h1 style="margin:0">${esc(sec.title)}</h1>
  <label class="chk small"><input type="checkbox" id="done" ${S.guide[sec.id]?'checked':''}> Mark studied</label></div>
  <p class="muted">${esc(sec.blurb)}</p>`;
  sec.blocks.forEach(b=>{
    h+=`<h2 style="margin-top:1.1em">${esc(b.h)}</h2>`;
    if(b.table){h+=`<div class="tablewrap"><table><tr>${b.table[0].map(c=>`<th>${esc(c)}</th>`).join('')}</tr>`+b.table.slice(1).map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')+'</table></div>'}
    if(b.faults){h+=`<input type="search" id="fq" placeholder="Filter faults (e.g. butter, DMS, band-aid)..." style="width:100%;margin:6px 0"><div class="tablewrap"><table id="ft"><tr><th>Fault</th><th>Descriptors</th><th>Cause / fix</th><th>Where it is acceptable</th></tr>`+FAULTS.map(f=>`<tr><td><b>${esc(f[0])}</b></td><td>${esc(f[1])}</td><td>${esc(f[2])}</td><td>${esc(f[3])}</td></tr>`).join('')+'</table></div>'}
    if(b.list)h+=`<ul class="tight">${b.list.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  });
  h+=`<div class="row" style="margin-top:14px"><button class="btn" id="drill">Quiz me on this</button><button class="btn ghost" id="nextsec">Next section</button></div></div></div></div>`;
  app.innerHTML=h;
  app.querySelectorAll('.side button').forEach(b=>b.onclick=()=>go('learn',b.dataset.s));
  $('#done').onchange=e=>{S.guide[sec.id]=e.target.checked;save();renderLearn(app,sec.id)};
  const map={strategy:'prog',program:'prog',faults:'chars',water:'proc',hopsyeast:'proc',judging:'chars','styles-intro':'all'};
  $('#drill').onclick=()=>startQuiz({sub:map[sec.id]||'all',type:'any',n:15,mode:'smart'});
  $('#nextsec').onclick=()=>{const i=GUIDE.findIndex(s=>s.id===sec.id);go('learn',GUIDE[(i+1)%GUIDE.length].id)};
  const fq=$('#fq');if(fq)fq.oninput=()=>{const v=fq.value.toLowerCase();document.querySelectorAll('#ft tr').forEach((r,i)=>{if(i)r.style.display=r.textContent.toLowerCase().includes(v)?'':'none'})};
}

/* ============ Flashcards ============ */
const INT=[0,1,3,7,14,30];
function renderCards(app,opts){
  let deck=(opts&&opts.deck)||'all',mode=(opts&&opts.mode)||'due';
  const pool=()=>FLASH.filter(c=>deck==='all'||c.deck===deck);
  let queue=[],cur=null,flipped=false,done=0;
  function build(){const p=pool();let q=mode==='due'?p.filter(c=>{const s=S.cards[c.id];return !s||s.due<=Date.now()}):p;queue=shuffle(q).slice(0,40);done=0;next()}
  function next(){cur=queue.shift()||null;flipped=false;draw()}
  function draw(){
    const due=pool().filter(c=>{const s=S.cards[c.id];return !s||s.due<=Date.now()}).length;
    let h=`<h1>Flashcards</h1><div class="row" style="margin-bottom:12px">
    <select id="dk">${DECKS.map(d=>`<option value="${d[0]}" ${d[0]===deck?'selected':''}>${d[1]}</option>`).join('')}</select>
    <select id="md"><option value="due" ${mode==='due'?'selected':''}>Due cards (spaced repetition)</option><option value="all" ${mode==='all'?'selected':''}>Shuffle everything</option></select>
    <span class="muted small">${due} due in this deck</span></div>`;
    if(!cur){h+=`<div class="card"><h2>${done?'Session complete':'Nothing due here'}</h2><p class="muted">${done?`You reviewed ${done} cards.`:'Great work. Switch decks or choose "Shuffle everything" to practice more.'}</p><button class="btn" id="again">${done?'Start another round':'Practice anyway'}</button></div>`;app.innerHTML=h;
      $('#again').onclick=()=>{mode='all';build()}}
    else{
      h+=`<div class="flash"><div class="fc ${flipped?'back':''}" id="fc"><div>${esc(flipped?cur.b:cur.f).replace(/\n/g,'<br>')}<small>${flipped?'':'Tap or press Space to reveal'}</small></div></div></div>
      <div class="row" style="margin-top:12px;justify-content:center">${flipped?`<button class="btn bad" id="miss">Missed it (1)</button><button class="btn good" id="got">Got it (2)</button>`:`<button class="btn" id="flip">Show answer</button>`}</div>
      <p class="small muted" style="text-align:center">${queue.length} left in this round &middot; ${esc(DECKS.find(d=>d[0]===cur.deck)[1])}</p>`;app.innerHTML=h;
      $('#fc').onclick=()=>{flipped=!flipped;draw()};
      const f=$('#flip');if(f)f.onclick=()=>{flipped=true;draw()};
      const rate=ok=>{const s=S.cards[cur.id]||{box:0};s.box=ok?Math.min(5,s.box+1):0;s.due=Date.now()+(ok?INT[s.box]*864e5:6e4*5);S.cards[cur.id]=s;done++;bump();save();if(!ok)queue.push(cur);next()};
      if($('#got')){$('#got').onclick=()=>rate(true);$('#miss').onclick=()=>rate(false)}
    }
    $('#dk').onchange=e=>{deck=e.target.value;build()};$('#md').onchange=e=>{mode=e.target.value;build()};
  }
  cardKey=e=>{if(view!=='cards')return;if(e.code==='Space'&&cur&&!flipped){e.preventDefault();flipped=true;draw()}else if(flipped&&cur&&(e.key==='1'||e.key==='2')){(e.key==='2'?$('#got'):$('#miss')).click()}};
  build();
}
let cardKey=()=>{};document.addEventListener('keydown',e=>cardKey(e));
