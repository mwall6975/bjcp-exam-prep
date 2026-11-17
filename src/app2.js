/* ============ Shared question helpers ============ */
const LET='ABCDE';
function makePerm(q){return q.t==='TF'?null:shuffle(q.o.map((_,i)=>i))}
function isCorrect(q,sel){
  if(q.t==='TF')return sel===q.a;
  if(q.t==='MC')return sel===q.a;
  const s=(sel||[]).slice().sort().join(),a=q.a.slice().sort().join();return s===a;
}
function rec(q,ok){const h=S.q[q.id]||{n:0};h.n++;h.ok=ok;h.last=Date.now();S.q[q.id]=h;bump();}
function qLabel(q){return `${SUBS[q.sub][0]} &middot; ${TYPE_NAME[q.t]}`}
function ansText(q){
  if(q.t==='TF')return q.a?'True':'False';
  if(q.t==='MC')return q.o[q.a];
  return q.a.map(i=>q.o[i]).join('; ');
}

/* ============ Quiz ============ */
function renderQuizSetup(app){
  const subOpts=[['all','Everything'],['grp:Styles','All style sections'],['grp:Technical','All technical (characteristics + process)']].concat(Object.entries(SUBS).map(([k,v])=>[k,v[0]]));
  const miss=QALL.filter(q=>S.q[q.id]&&!S.q[q.id].ok).length,unseen=QALL.filter(q=>!S.q[q.id]).length;
  app.innerHTML=`<h1>Quiz</h1><p class="muted">Instant feedback with explanations. ${QALL.length} questions in the bank (${miss} missed, ${unseen} unseen).</p>
  <div class="card" style="max-width:640px"><div class="grid" style="gap:14px">
  <label>Topic<br><select id="qs" style="width:100%">${subOpts.map(o=>`<option value="${o[0]}">${esc(o[1])}</option>`).join('')}</select></label>
  <label>Question type<br><select id="qt" style="width:100%"><option value="any">Any</option><option value="TF">True/False</option><option value="MC">Multiple choice</option><option value="MA">Check all that apply</option></select></label>
  <label>Selection<br><select id="qm" style="width:100%"><option value="smart">Smart mix (missed and unseen first)</option><option value="random">Random</option><option value="missed">Only questions I missed</option><option value="unseen">Only unseen questions</option></select></label>
  <label>Number of questions<br><select id="qn" style="width:100%"><option>10</option><option selected>20</option><option>40</option><option value="999">All available</option></select></label>
  <div><button class="btn" id="go">Start quiz</button></div></div></div>`;
  $('#go').onclick=()=>startQuiz({sub:$('#qs').value,type:$('#qt').value,mode:$('#qm').value,n:+$('#qn').value});
}
function startQuiz(cfg){
  view='quiz';renderTabs();const app=$('#app');
  let pool=QALL.filter(q=>{
    if(cfg.sub.startsWith('grp:')){if(SUBS[q.sub][1]!==cfg.sub.slice(4))return false}
    else if(cfg.sub!=='all'&&q.sub!==cfg.sub)return false;
    return cfg.type==='any'||q.t===cfg.type});
  if(cfg.mode==='missed')pool=pool.filter(q=>S.q[q.id]&&!S.q[q.id].ok);
  else if(cfg.mode==='unseen')pool=pool.filter(q=>!S.q[q.id]);
  if(cfg.mode==='smart'){
    const w=q=>{const h=S.q[q.id];return (!h?1.0:h.ok?0.15:2.0)+Math.random()*0.9};
    pool=pool.map(q=>[w(q),q]).sort((a,b)=>b[0]-a[0]).map(x=>x[1]);
  }else pool=shuffle(pool);
  pool=pool.slice(0,cfg.n);
  if(!pool.length){app.innerHTML=`<h1>Quiz</h1><div class="card"><p>No questions match that selection yet.${cfg.mode==='missed'?' You have not missed any questions in this topic. Nice.':''}</p><button class="btn" id="b">Back</button></div>`;$('#b').onclick=()=>go('quiz');return}
  runQuiz(app,pool);
}
function runQuiz(app,items){
  let i=0,right=0;const log=[];
  function show(){
    const q=items[i],perm=makePerm(q);let sel=q.t==='MA'?[]:null,locked=false;
    const pct=Math.round(100*i/items.length);
    app.innerHTML=`<div class="row" style="justify-content:space-between"><span class="pill">${qLabel(q)}</span><span class="small muted">Question ${i+1} of ${items.length} &middot; ${right} correct</span></div>
    <div class="bar" style="margin:8px 0 14px"><i style="width:${pct}%"></i></div>
    <div class="card"><div class="qtext">${esc(q.q)}</div><div id="opts"></div><div id="fb"></div><div class="row" style="margin-top:12px"><button class="btn ghost" id="quit">End quiz</button><span style="flex:1"></span><button class="btn" id="chk" style="display:none">Check answer</button><button class="btn" id="nx" style="display:none">${i+1<items.length?'Next question':'See results'}</button></div></div>`;
    const O=$('#opts');
    function finish(){
      locked=true;const ok=isCorrect(q,sel);if(ok)right++;rec(q,ok);save();log.push({q,ok,sel});
      const fb=$('#fb');fb.className='feedback '+(ok?'good':'bad');
      fb.innerHTML=`<b>${ok?'Correct.':'Not quite.'}</b> ${ok?'':'Answer: <b>'+esc(ansText(q))+'</b>. '}${esc(q.e||'')}`;
      O.querySelectorAll('.opt').forEach(b=>{b.disabled=true;const v=b.dataset.v;
        if(q.t==='TF'){const val=v==='1';if(val===q.a)b.classList.add('right');else if(b.classList.contains('sel'))b.classList.add('wrong')}
        else{const idx=+v;const isAns=q.t==='MC'?idx===q.a:q.a.includes(idx);if(isAns)b.classList.add('right');else if(b.classList.contains('sel'))b.classList.add('wrong')}});
      $('#chk').style.display='none';$('#nx').style.display='';$('#nx').focus();
    }
    if(q.t==='TF'){
      O.className='tf';O.innerHTML=`<button class="opt" data-v="1">True</button><button class="opt" data-v="0">False</button>`;
      O.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(locked)return;sel=b.dataset.v==='1';b.classList.add('sel');finish()});
    }else{
      O.innerHTML=perm.map((oi,k)=>`<button class="opt" data-v="${oi}"><span class="k">${LET[k]}</span><span>${esc(q.o[oi])}</span></button>`).join('');
      if(q.t==='MA')$('#chk').style.display='';
      O.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(locked)return;const v=+b.dataset.v;
        if(q.t==='MC'){sel=v;b.classList.add('sel');finish()}
        else{const ix=sel.indexOf(v);if(ix>=0){sel.splice(ix,1);b.classList.remove('sel')}else{sel.push(v);b.classList.add('sel')}}});
      $('#chk').onclick=()=>{if(!locked)finish()};
    }
    $('#nx').onclick=()=>{i++;i<items.length?show():summary()};
    $('#quit').onclick=()=>{if(log.length)summary();else go('quiz')};
  }
  function summary(){
    const pct=log.length?Math.round(100*right/log.length):0;
    const missed=log.filter(l=>!l.ok);
    app.innerHTML=`<h1>Quiz complete</h1><div class="card"><div class="row" style="gap:24px"><div class="stat"><span class="muted small">Score</span><span class="big">${right}/${log.length}</span></div><div class="stat"><span class="muted small">Accuracy</span><span class="big" style="color:${pct>=64?'var(--good)':'var(--bad)'}">${pct}%</span></div></div>
    <p class="muted">${pct>=64?'Above the 64% pass line. Keep drilling the weak spots.':'Below the 64% pass line. Review the explanations below and retry.'}</p>
    <div class="row"><button class="btn" id="again">New quiz</button>${missed.length?'<button class="btn ghost" id="retry">Retry the '+missed.length+' I missed</button>':''}<button class="btn ghost" id="dash">Dashboard</button></div></div>
    ${missed.length?`<h2 style="margin-top:20px">Review missed questions</h2>`+missed.map(l=>`<div class="card" style="margin:10px 0"><div class="small muted">${qLabel(l.q)}</div><p><b>${esc(l.q.q)}</b></p><p class="small">Answer: <b>${esc(ansText(l.q))}</b><br>${esc(l.q.e||'')}</p></div>`).join(''):''}`;
    $('#again').onclick=()=>go('quiz');$('#dash').onclick=()=>go('home');const r=$('#retry');if(r)r.onclick=()=>runQuiz(app,shuffle(missed.map(l=>l.q)));
  }
  show();
}

/* ============ Mock exam ============ */
const MODES={full:{lbl:'Full exam',f:1,sec:3600},half:{lbl:'Half exam',f:.5,sec:1800},quick:{lbl:'Quick check',f:.2,sec:720}};
function buildExam(f){
  const used=new Set(),items=[];
  const fresh=q=>{const h=S.q[q.id];return (!h?0:h.ok?2:1)+Math.random()};
  for(const [sub,m] of BP){
    for(const [t,c] of Object.entries(m)){
      const n=Math.max(f<1?1:0,Math.round(c*f));
      let pool=QALL.filter(q=>q.sub===sub&&q.t===t&&!used.has(q.q)).sort((a,b)=>fresh(a)-fresh(b));
      if(pool.length<n)pool=pool.concat(QALL.filter(q=>q.sub===sub&&q.t!==t&&!used.has(q.q)&&!pool.includes(q)));
      pool.slice(0,n).forEach(q=>{used.add(q.q);items.push({q,perm:makePerm(q),sel:q.t==='MA'?[]:null,touched:false,mark:false})});
    }
  }
  // order: program, styles, technical; shuffle within group
  const grp=g=>shuffle(items.filter(x=>SUBS[x.q.sub][1]===g));
  return [].concat(grp('Program'),grp('Styles'),grp('Technical'));
}
function renderExam(app){
  if(examState&&examState.running){drawExam();return}
  if(examState&&examState.result){drawResults();return}
  const last=S.exams.slice(-1)[0];
  app.innerHTML=`<h1>Mock exam</h1><p class="muted">Modeled on the real Beer Entrance Exam blueprint: Program & Ethics T/F, style questions (including comparison and mixed sets), beer characteristics, and process/ingredients, in True/False, Multiple Choice and Check-all-that-apply formats. All questions here are original practice items, not BJCP exam questions.</p>
  <div class="grid g3">${Object.entries(MODES).map(([k,m])=>{const n=BP.reduce((a,[,x])=>a+Object.values(x).reduce((p,c)=>p+Math.max(m.f<1?1:0,Math.round(c*m.f)),0),0);
   return `<div class="card"><h2>${m.lbl}</h2><div class="big">${n}<span style="font-size:1rem;font-weight:600"> questions</span></div><p class="muted">${m.sec/60} minutes &middot; pass mark ${Math.ceil(.64*n)}/${n} (64%)</p><button class="btn" data-m="${k}">Start ${m.lbl.toLowerCase()}</button></div>`}).join('')}</div>
  <div class="callout"><b>Tips for exam conditions.</b> The real exam is open book (style guidelines and study guide allowed) and runs a 60-minute clock that cannot be restarted. Here, practice closed-book first: if you can pass without notes you will have time to double-check with the guidelines. Unanswered and wrong answers score the same, so never leave a blank.</div>
  ${last?`<p class="muted small">Last attempt: ${last.score}/${last.total} (${Math.round(100*last.score/last.total)}%) on ${new Date(last.t).toLocaleDateString()}.</p>`:''}`;
  app.querySelectorAll('button[data-m]').forEach(b=>b.onclick=()=>{
    const m=MODES[b.dataset.m];examState={running:true,mode:m.lbl,items:buildExam(m.f),page:0,summary:false,left:m.sec,limit:m.sec,total:0};
    examState.total=examState.items.length;
    examState.timer=setInterval(()=>{examState.left--;const t=$('#tm');if(t){t.textContent=fmtT(examState.left);t.classList.toggle('low',examState.left<300)}if(examState.left<=0)submitExam(true)},1000);
    drawExam();});
}
const fmtT=s=>{s=Math.max(0,s);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
function drawExam(){
  const app=$('#app'),E=examState,PER=5,pages=Math.ceil(E.items.length/PER);
  const answered=E.items.filter(x=>x.touched&&(x.q.t!=='MA'||x.sel.length)).length;
  let h=`<div class="card" style="position:sticky;top:60px;z-index:5;margin-bottom:14px"><div class="row" style="justify-content:space-between"><span class="timer ${E.left<300?'low':''}" id="tm">${fmtT(E.left)}</span>
   <span class="small muted">${answered}/${E.items.length} answered &middot; ${E.mode}</span>
   <span class="row"><button class="btn ghost sm" id="sumb">${E.summary?'Back to questions':'Summary'}</button><button class="btn sm" id="sub">Submit exam</button></span></div></div>`;
  if(E.summary){
    h+=`<div class="card"><h3>Summary</h3><p class="small muted">Green = answered, red = unanswered, yellow outline = marked. Click a number to jump.</p><div class="sumgrid">`+E.items.map((x,i)=>{const a=x.touched&&(x.q.t!=='MA'||x.sel.length);return `<button data-i="${i}" class="${a?'ans':'un'} ${x.mark?'mk':''}">${i+1}</button>`}).join('')+`</div></div>`;
  }else{
    const s=E.page*PER;
    h+=`<div class="card">`+E.items.slice(s,s+PER).map((x,k)=>{const i=s+k,q=x.q;let o='';
      if(q.t==='TF')o=`<div class="tf"><button class="opt ${x.sel===true?'sel':''}" data-i="${i}" data-v="1">True</button><button class="opt ${x.sel===false&&x.touched?'sel':''}" data-i="${i}" data-v="0">False</button></div>`;
      else o=x.perm.map((oi,kk)=>{const on=q.t==='MC'?x.sel===oi:x.sel.includes(oi);return `<button class="opt ${on?'sel':''}" data-i="${i}" data-v="${oi}"><span class="k">${LET[kk]}</span><span>${esc(q.o[oi])}</span></button>`}).join('');
      return `<div class="examq"><div class="row" style="justify-content:space-between"><div class="qtext" style="margin:0"><span class="qnum">${i+1}.</span>${esc(q.q)}</div><label class="chk small mark"><input type="checkbox" data-mk="${i}" ${x.mark?'checked':''}> Mark</label></div><div class="small muted" style="margin:2px 0 4px">${TYPE_NAME[q.t]}</div>${o}</div>`}).join('')+`</div>
    <div class="row" style="justify-content:space-between;margin-top:14px"><button class="btn ghost" id="pv" ${E.page===0?'disabled':''}>Previous</button><span class="muted small">Page ${E.page+1} of ${pages}</span><button class="btn" id="nx" ${E.page===pages-1?'disabled':''}>Next</button></div>`;
  }
  app.innerHTML=h;
  $('#sumb').onclick=()=>{E.summary=!E.summary;drawExam()};
  $('#sub').onclick=()=>submitExam(false);
  app.querySelectorAll('.sumgrid button').forEach(b=>b.onclick=()=>{E.page=Math.floor(+b.dataset.i/PER);E.summary=false;drawExam();window.scrollTo(0,0)});
  app.querySelectorAll('input[data-mk]').forEach(c=>c.onchange=()=>{E.items[+c.dataset.mk].mark=c.checked});
  app.querySelectorAll('.examq .opt').forEach(b=>b.onclick=()=>{
    const x=E.items[+b.dataset.i],q=x.q,v=+b.dataset.v;x.touched=true;
    if(q.t==='TF')x.sel=v===1;else if(q.t==='MC')x.sel=v;else{const ix=x.sel.indexOf(v);ix>=0?x.sel.splice(ix,1):x.sel.push(v)}
    const y=window.scrollY;drawExam();window.scrollTo(0,y)});
  const pv=$('#pv'),nx=$('#nx');if(pv)pv.onclick=()=>{E.page--;drawExam();window.scrollTo(0,0)};if(nx)nx.onclick=()=>{E.page++;drawExam();window.scrollTo(0,0)};
}
function submitExam(auto){
  const E=examState;
  const un=E.items.filter(x=>!(x.touched&&(x.q.t!=='MA'||x.sel.length))).length;
  if(!auto&&!confirm(un?`You have ${un} unanswered question${un>1?'s':''} (they count as wrong). Submit anyway?`:'Submit your exam now?'))return;
  clearInterval(E.timer);E.running=false;
  let score=0;const by={};
  E.items.forEach(x=>{const ok=x.touched&&isCorrect(x.q,x.sel);x.ok=ok;if(ok)score++;rec(x.q,ok);
    const b=by[x.q.sub]||(by[x.q.sub]={c:0,n:0});b.n++;if(ok)b.c++});
  const need=Math.ceil(.64*E.items.length);
  E.result={score,total:E.items.length,need,pass:score>=need,by,used:E.limit-E.left};
  S.exams.push({t:Date.now(),mode:E.mode,score,total:E.items.length,pass:score>=need,by});save();
  if(auto)toast('Time is up. Exam submitted.');
  view='exam';renderTabs();drawResults();
}
function drawResults(){
  const E=examState,R=E.result,app=$('#app');const pct=Math.round(100*R.score/R.total);
  const miss=E.items.filter(x=>!x.ok);
  app.innerHTML=`<h1>${R.pass?'You passed this mock':'Not quite yet'}</h1>
  <div class="card"><div class="row" style="gap:28px"><div class="stat"><span class="muted small">Score</span><span class="big">${R.score}/${R.total}</span></div>
  <div class="stat"><span class="muted small">Percent</span><span class="big" style="color:${R.pass?'var(--good)':'var(--bad)'}">${pct}%</span></div>
  <div class="stat"><span class="muted small">Needed (64%)</span><span class="big">${R.need}</span></div>
  <div class="stat"><span class="muted small">Time used</span><span class="big">${fmtT(R.used)}</span></div></div>
  <p class="muted">${R.pass?'Solid. On the real exam you also get open-book access to the guidelines, which typically adds a few points. Keep reviewing the sections below 64%.':'Review the sections below 64% first, then retry. Remember the real exam is open book, but you need enough knowledge to find answers quickly.'}</p>
  <div class="row"><button class="btn" id="again">New mock exam</button>${miss.length?`<button class="btn ghost" id="retry">Drill my ${miss.length} misses</button>`:''}<button class="btn ghost" id="dash">Dashboard</button></div></div>
  <div class="card" style="margin-top:14px"><h2>Score by section</h2>${Object.entries(SUBS).filter(([k])=>R.by[k]).map(([k,v])=>{const b=R.by[k],p=Math.round(100*b.c/b.n);return `<div style="margin:9px 0"><div class="row" style="justify-content:space-between"><span>${v[0]}</span><span class="small muted">${b.c}/${b.n} (${p}%)</span></div><div class="bar ${p>=64?'good':'bad'}"><i style="width:${p}%"></i></div></div>`}).join('')}</div>
  <h2 style="margin-top:20px">Review</h2><div class="row" style="margin-bottom:8px"><label class="chk small"><input type="checkbox" id="onlyMiss" checked> Show only missed questions</label></div><div id="rev"></div>`;
  const draw=()=>{const only=$('#onlyMiss').checked;$('#rev').innerHTML=E.items.map((x,i)=>({x,i})).filter(o=>!only||!o.x.ok).map(({x,i})=>{const q=x.q;
    let mine='<i>no answer</i>';if(x.touched){mine=q.t==='TF'?(x.sel?'True':'False'):q.t==='MC'?esc(q.o[x.sel]):(x.sel.length?x.sel.map(j=>esc(q.o[j])).join('; '):'<i>no answer</i>')}
    return `<div class="card" style="margin:10px 0"><div class="small muted">${i+1}. ${qLabel(q)} <span class="pill ${x.ok?'good':'bad'}">${x.ok?'correct':'missed'}</span></div><p><b>${esc(q.q)}</b></p><p class="small">Your answer: ${mine}<br>Correct: <b>${esc(ansText(q))}</b><br>${esc(q.e||'')}</p></div>`}).join('')||'<p class="muted">Nothing to show.</p>'};
  draw();$('#onlyMiss').onchange=draw;
  $('#again').onclick=()=>{examState=null;go('exam')};$('#dash').onclick=()=>{examState=null;go('home')};
  const r=$('#retry');if(r)r.onclick=()=>{const items=miss.map(x=>x.q);examState=null;view='quiz';renderTabs();runQuiz($('#app'),shuffle(items))};
}

/* ============ Styles ============ */
function renderStyles(app){
  let cat='all',q='',hide=false;
  const cats=Object.entries(CATS).filter(([k])=>+k<=26);
  function draw(){
    const list=STY.filter(s=>s.cat<=26&&(cat==='all'||s.cat==+cat)&&(!q||(s.code+' '+s.name+' '+s.text.join(' ')).toLowerCase().includes(q)));
    $('#sl').innerHTML=list.map(s=>{
      const stat=s.stats?['OG','FG','IBU','SRM','ABV'].map(k=>`<div><b>${k}</b>${fmt(s.stats[k],k)}</div>`).join(''):'';
      const sw=s.stats?`<span class="sw" style="background:${srmColor(mid(s,'SRM'))}" title="Typical SRM ${fmt(s.stats.SRM,'SRM')}"></span>`:'';
      const txt=s.text.map(t=>`<li>${esc(t).replace(/^(Aroma|Flavor|Mouthfeel|Key|Comparison|Examples|Commercial|Category notes|Generic)\b:?/,'<b>$1</b>').replace(/ (Flavor|Mouthfeel): /g,' <b>$1:</b> ').replace(/^<b>Aroma<\/b>: ?/,'<b>Aroma:</b> ')}</li>`).join('');
      return `<div class="sty" data-code="${s.code}"><h3>${sw}<span>${esc(s.code)}. ${esc(s.name)}</span></h3><div class="small muted">${esc(CATS[s.cat])}</div><div class="stats">${stat}</div><div class="more"><ul>${txt}</ul></div></div>`}).join('')||'<p class="muted">No styles match.</p>';
    $('#cnt').textContent=list.length+' styles';
    document.querySelectorAll('.sty').forEach(el=>el.onclick=()=>{if(hide)el.classList.toggle('open')});
  }
  app.innerHTML=`<h1>Style reference (2021 guidelines, categories 1-26)</h1><p class="muted">Condensed from the BJCP Style Guidelines. Swatches show typical color. For exact wording use the official guidelines (see Resources).</p>
  <div class="row" style="margin-bottom:12px"><input type="search" id="sq" placeholder="Search styles, traits, examples..." style="flex:1;min-width:200px"><select id="sc"><option value="all">All categories</option>${cats.map(([k,v])=>`<option value="${k}">${k}. ${esc(v)}</option>`).join('')}</select>
  <label class="chk small"><input type="checkbox" id="hd"> Self-test (hide details; tap to reveal)</label><span class="muted small" id="cnt"></span></div><div class="grid g2" id="sl"></div>`;
  $('#sq').oninput=e=>{q=e.target.value.toLowerCase();draw()};$('#sc').onchange=e=>{cat=e.target.value;draw()};
  $('#hd').onchange=e=>{hide=e.target.checked;$('#app').classList.toggle('hide-details',hide);draw()};
  $('#app').classList.remove('hide-details');draw();
}

/* ============ Resources ============ */
function renderRes(app){
  const L=[['Online Beer Exam Study Guide (primary source for this app)','https://www.bjcp.org/exam-certification/program/studying/online-beer-exam-study-guide/'],
   ['BJCP Online Entrance Exam (buy/take the exam; a free practice exam is available)','https://app.bjcp.org/entrance-exams'],
   ['Online Exam overview and rules','https://www.bjcp.org/exam-certification/exam-program-overview/online-exam/'],
   ['BJCP Beer Exam Study Guide (includes the Program & Ethics T/F pool)','https://www.bjcp.org/exam-certification/program/studying/beer-exam-study-guide/'],
   ['2021 Beer Style Guidelines','https://www.bjcp.org/bjcp-style-guidelines/'],
   ['Beer Fault List','https://www.bjcp.org/education-training/education-resources/beer-faults/'],
   ['Judge Procedures Manual','https://www.bjcp.org/exam-certification/judge-procedures-manual/'],
   ['Sample scoresheets','https://www.bjcp.org/exam-certification/program/studying/sample-scoresheets/'],
   ['BJCP Beer Scoresheet (PDF)','https://legacy.bjcp.org/docs/SCP_BeerScoreSheet.pdf'],
   ['Exam structure and ranks','https://www.bjcp.org/exam-certification/exam-program-overview/bjcp-exam-structure/']];
  app.innerHTML=`<h1>Resources and settings</h1><div class="grid g2"><div class="card"><h2>Official BJCP links</h2><ul class="tight">${L.map(l=>`<li><a href="${l[1]}" target="_blank" rel="noopener">${esc(l[0])}</a></li>`).join('')}</ul>
  <div class="callout">Recommended reading from BJCP: <i>How to Brew</i> (John Palmer), <i>Dave Miller\'s Homebrewing Guide</i>, and for deeper technical study <i>Designing Great Beers</i> (Ray Daniels), <i>Brewing Better Beer</i> (Gordon Strong). Tasting and judging real beers against the guidelines is the best accelerator.</div>
  <p class="small muted">The BJCP question pool is copyrighted and may not be copied. Everything in this app is original practice material written from BJCP's public study resources. Always confirm details against the current official documents.</p></div>
  <div class="card"><h2>Your data</h2><p class="small muted">Progress is stored in this browser only.</p><div class="row"><button class="btn ghost sm" id="exp">Export progress</button><label class="btn ghost sm" style="cursor:pointer">Import<input type="file" id="imp" accept="application/json" hidden></label><button class="btn ghost sm" id="rst">Reset all progress</button></div>
  <h3 style="margin-top:1.2em">Theme</h3><div class="row"><button class="btn ghost sm" data-th="auto">Auto</button><button class="btn ghost sm" data-th="light">Light</button><button class="btn ghost sm" data-th="dark">Dark</button></div>
  <h3 style="margin-top:1.2em">Bank size</h3><p class="small muted">${QALL.length} practice questions (${QALL.filter(q=>q.gen).length} generated from style data) and ${FLASH.length} flashcards.</p></div></div>`;
  $('#exp').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'}));a.download='bjcp-progress.json';a.click()};
  $('#imp').onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{try{S=Object.assign(S,JSON.parse(t));save();toast('Progress imported')}catch(x){toast('Could not read that file')}})};
  $('#rst').onclick=()=>{if(confirm('Erase all progress in this browser?')){S={q:{},cards:{},exams:[],guide:{},days:{}};save();toast('Progress reset')}};
  app.querySelectorAll('[data-th]').forEach(b=>b.onclick=()=>{const t=b.dataset.th;if(t==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',t);try{localStorage.setItem(KEY+'t',t)}catch(e){}});
}
try{const t=localStorage.getItem(KEY+'t');if(t&&t!=='auto')document.documentElement.setAttribute('data-theme',t)}catch(e){}
renderTabs();go('home');
