const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'http://localhost/',beforeParse(w){w.scrollTo=()=>{}}});
const w=dom.window;const errs=[];w.addEventListener('error',e=>errs.push(e.message));
w.confirm=()=>true;
setTimeout(()=>{
  const d=w.document;
  const out=[];
  out.push('home ok: '+!!d.querySelector('h1')+' '+d.querySelector('h1').textContent);
  const tabs=[...d.querySelectorAll('#tabs button')];
  for(const t of tabs){t.click();out.push(t.textContent+' -> '+(d.querySelector('#app h1')||{}).textContent+' len '+d.querySelector('#app').innerHTML.length)}
  // learn sections
  tabs[1].click();[...d.querySelectorAll('.side button')].forEach(b=>{b.click()});
  // quiz run
  tabs[3].click();d.querySelector('#go').click();
  for(let i=0;i<20;i++){const o=d.querySelector('#opts .opt');if(!o)break;o.click();const c=d.querySelector('#chk');if(c&&c.style.display!=='none')c.click();const n=d.querySelector('#nx');if(n)n.click()}
  out.push('after quiz: '+d.querySelector('#app h1').textContent);
  // mock
  tabs[4].click();d.querySelector('button[data-m=full]').click();
  const E=w.eval('examState');out.push('exam items '+E.items.length+' types '+JSON.stringify(E.items.reduce((a,x)=>(a[x.q.t]=(a[x.q.t]||0)+1,a),{})));
  const subs={};E.items.forEach(x=>subs[x.q.sub]=(subs[x.q.sub]||0)+1);out.push(JSON.stringify(subs));
  const uniq=new Set(E.items.map(x=>x.q.q)).size;out.push('unique '+uniq);
  // answer all correctly for half
  E.items.forEach((x,i)=>{x.touched=true;x.sel=x.q.t==='TF'?x.q.a:x.q.t==='MC'?x.q.a:x.q.a.slice()});
  w.eval('submitExam(false)');out.push('result '+JSON.stringify({s:E.result.score,t:E.result.total,need:E.result.need}));
  tabs[5].click();out.push('styles cards '+d.querySelectorAll('.sty').length);
  tabs[2].click();out.push('flash: '+d.querySelector('#fc').textContent.slice(0,60));
  console.log(out.join('\n'));console.log('ERRORS',errs);
  console.log('QALL',w.eval('QALL').length,'gen',w.eval('QALL').filter(q=>q.gen).length,'flash',w.eval('FLASH').length);
  const c={};w.eval('QALL').forEach(q=>{c[q.sub+q.t]=(c[q.sub+q.t]||0)+1});console.log(JSON.stringify(c));
  // validate data
  let bad=[];w.eval('QALL').forEach(q=>{if(q.t==='TF'&&typeof q.a!=='boolean')bad.push(q.q);if(q.t==='MC'&&(!q.o||q.a<0||q.a>=q.o.length))bad.push(q.q);if(q.t==='MA'&&(!Array.isArray(q.a)||q.a.some(i=>i>=q.o.length)))bad.push(q.q)});console.log('bad',bad);
  process.exit(0)},300);
