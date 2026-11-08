/* ==========================================================
   Đài quan sát Vanh — mini-app chạy trực tiếp (mỗi app = 1 file HTML)
   ========================================================== */
const APP_BASE = `
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;color:#e8ecff;font:15px/1.6 "Space Grotesk",system-ui,sans-serif;
background:#05060f;background-image:radial-gradient(1px 1px at 12% 22%,#fff8,transparent),radial-gradient(1px 1px at 72% 12%,#fff6,transparent),radial-gradient(1.5px 1.5px at 42% 78%,#fff7,transparent),radial-gradient(1px 1px at 88% 66%,#fff5,transparent),radial-gradient(1px 1px at 22% 88%,#fff6,transparent),radial-gradient(60% 50% at 80% 0%,#3b1d6e55,transparent),radial-gradient(50% 40% at 0% 100%,#0e4a6b55,transparent)}
h1{font:600 30px/1.1 Unbounded,sans-serif;letter-spacing:-.02em;margin:0 0 4px}
h1 span{background:linear-gradient(90deg,#6cf0ff,#c86bff);-webkit-background-clip:text;background-clip:text;color:transparent}
.k{font:12px "JetBrains Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#7d86a8;margin:0 0 18px}
.box{width:min(600px,100%);padding:30px;text-align:center;border:1px solid #a0b4ff24;border-radius:22px;background:linear-gradient(180deg,#ffffff0d,#ffffff04);backdrop-filter:blur(10px);box-shadow:0 40px 80px -40px #000,inset 0 1px 0 #ffffff14}
button,.btn{font:500 13px/1 "JetBrains Mono",monospace;letter-spacing:.06em;text-transform:uppercase;padding:13px 18px;border:1px solid #a0b4ff40;background:#ffffff08;color:#e8ecff;border-radius:999px;cursor:pointer;text-decoration:none;display:inline-block;transition:.2s}
button:hover,.btn:hover{border-color:#6cf0ff;box-shadow:0 0 0 4px #6cf0ff14,0 0 24px #6cf0ff30}
button.on,.primary{background:linear-gradient(90deg,#6cf0ff,#8f9bff);color:#05060f;border-color:transparent}
.row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:16px 0}
small,.mono{font:12px "JetBrains Mono",monospace;color:#7d86a8}
</style>`;
const appPage = (title, body, script = "") =>
  `<!doctype html><html lang="vi"><head><title>${title}</title>${APP_BASE}</head><body>${body}<script>${script}<\/script></body></html>`;

const APPS = {
  /* ---------- Đồng hồ quỹ đạo (Pomodoro) ---------- */
  pomodoro: appPage("Đồng hồ quỹ đạo", `
<div class="box">
  <p class="k">Module · 03 — Pomodoro</p>
  <h1>Đồng hồ <span>quỹ đạo</span></h1>
  <div class="row"><button class="on" data-m="25">Tập trung 25'</button><button data-m="5">Nghỉ 5'</button><button data-m="15">Nghỉ dài 15'</button></div>
  <div style="position:relative;width:250px;height:250px;margin:6px auto">
    <svg viewBox="0 0 200 200" width="250" height="250" style="position:absolute;inset:0;transform:rotate(-90deg)">
      <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#6cf0ff"/><stop offset="1" stop-color="#c86bff"/></linearGradient></defs>
      <circle cx="100" cy="100" r="86" fill="none" stroke="#a0b4ff22" stroke-width="2" stroke-dasharray="2 6"/>
      <circle id="arc" cx="100" cy="100" r="86" fill="none" stroke="url(#g)" stroke-width="4" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="0"/>
    </svg>
    <div id="sat" style="position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px;border-radius:50%;background:#ffb547;box-shadow:0 0 16px #ffb547"></div>
    <div id="t" style="position:absolute;inset:0;display:grid;place-items:center;font:400 52px Unbounded,sans-serif;letter-spacing:-.03em;font-variant-numeric:tabular-nums">25:00</div>
  </div>
  <div class="row"><button id="go" class="primary">Khởi động</button><button id="reset">Đặt lại</button></div>
  <small id="done">Đã hoàn thành 0 vòng quỹ đạo</small>
</div>`, `
let total=1500,left=1500,timer=null,count=0;const $=i=>document.getElementById(i),t=$('t'),go=$('go'),arc=$('arc'),sat=$('sat');
const draw=()=>{t.textContent=String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0');const f=left/total;arc.style.strokeDashoffset=100-f*100;const a=(f*360-90)*Math.PI/180;sat.style.transform='translate('+Math.cos(a)*107.5+'px,'+Math.sin(a)*107.5+'px)';document.title=t.textContent+' · Quỹ đạo'};
const stop=()=>{clearInterval(timer);timer=null;go.textContent='Khởi động'};
go.onclick=()=>{if(timer)return stop();go.textContent='Tạm dừng';timer=setInterval(()=>{left--;draw();if(left<=0){stop();count++;$('done').textContent='Đã hoàn thành '+count+' vòng quỹ đạo ✦';left=total;draw()}},1000)};
$('reset').onclick=()=>{stop();left=total;draw()};
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-m]').forEach(x=>x.classList.remove('on'));b.classList.add('on');stop();total=left=b.dataset.m*60;draw()});draw();`),

  /* ---------- Tinh vân màu (palette) ---------- */
  palette: appPage("Tinh vân màu", `
<div class="box" style="width:min(720px,100%)">
  <p class="k">Module · 04 — Palette</p>
  <h1>Tinh vân <span>màu</span></h1>
  <p class="mono" style="margin:6px 0 18px">[SPACE] trộn tinh vân mới · bấm một ngôi sao để copy mã</p>
  <div id="neb" style="height:120px;border-radius:16px;margin-bottom:14px;transition:background .6s"></div>
  <div id="sw" style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px"></div>
  <div class="row"><button class="primary" id="mix">Trộn tinh vân</button></div>
  <small id="msg">&nbsp;</small>
</div>`, `
const sw=document.getElementById('sw'),msg=document.getElementById('msg'),neb=document.getElementById('neb');
const hsl=(h,s,l)=>{l/=100;const a=s*Math.min(l,1-l)/100,f=n=>{const k=(n+h/30)%12;return Math.round(255*(l-a*Math.max(Math.min(k-3,9-k,1),-1))).toString(16).padStart(2,'0')};return '#'+f(0)+f(8)+f(4)};
function mix(){const base=Math.random()*360,step=[24,36,60,150][Math.floor(Math.random()*4)],cs=[];sw.innerHTML='';
for(let i=0;i<5;i++){const c=hsl((base+i*step)%360,60+Math.random()*30,40+Math.random()*30);cs.push(c);const d=document.createElement('button');
d.style.cssText='height:110px;padding:0 0 10px;display:flex;align-items:flex-end;justify-content:center;border-radius:14px;border:1px solid #ffffff22;background:radial-gradient(circle at 35% 30%,#ffffffaa,'+c+' 30%,#05060f 120%)';
d.innerHTML='<span style="background:#05060fcc;padding:4px 8px;border-radius:99px;font-size:11px">'+c+'</span>';
d.onclick=()=>{const ok=()=>msg.textContent='Đã copy '+c+' ✦';navigator.clipboard?navigator.clipboard.writeText(c).then(ok,()=>msg.textContent='Mã màu: '+c):msg.textContent='Mã màu: '+c};sw.appendChild(d)}
neb.style.background='radial-gradient(40% 80% at 20% 50%,'+cs[0]+'cc,transparent),radial-gradient(40% 90% at 50% 40%,'+cs[2]+'bb,transparent),radial-gradient(40% 80% at 80% 60%,'+cs[4]+'cc,transparent),#05060f'}
document.getElementById('mix').onclick=mix;addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();mix()}});mix();`),

  /* ---------- Bảng chòm sao (vẽ) ---------- */
  sketch: appPage("Bảng chòm sao", `
<div class="box" style="width:min(820px,100%);padding:22px">
  <p class="k">Module · 05 — Constellation</p>
  <h1>Bảng <span>chòm sao</span></h1>
  <p class="mono" style="margin:4px 0 12px">bấm để thả sao · các ngôi sao tự nối thành chòm · giữ Shift để bắt đầu chòm mới</p>
  <canvas id="c" width="760" height="400" style="width:100%;touch-action:none;border-radius:14px;border:1px solid #a0b4ff24;background:radial-gradient(70% 70% at 70% 20%,#1b1440,#05060f);cursor:crosshair"></canvas>
  <div class="row"><input id="name" placeholder="Đặt tên chòm sao…" style="flex:1;min-width:180px;padding:12px 16px;border-radius:999px;border:1px solid #a0b4ff40;background:#ffffff08;color:#e8ecff;font:14px 'Space Grotesk'"><button id="undo">Hoàn tác</button><button id="clear">Xoá</button><button class="primary" id="save">Lưu PNG</button></div>
</div>`, `
const c=document.getElementById('c'),x=c.getContext('2d');let groups=[[]],dust=[];for(let i=0;i<160;i++)dust.push([Math.random()*760,Math.random()*400,Math.random()*1.2]);
const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};
function paint(t=0){x.fillStyle='#070818';x.fillRect(0,0,c.width,c.height);const g=x.createRadialGradient(540,80,0,540,80,420);g.addColorStop(0,'#2a1a5e');g.addColorStop(1,'#07081800');x.fillStyle=g;x.fillRect(0,0,c.width,c.height);
dust.forEach(([a,b,s],i)=>{x.globalAlpha=.4+.4*Math.sin(t/600+i);x.fillStyle='#fff';x.fillRect(a,b,s,s)});x.globalAlpha=1;
groups.forEach(gr=>{x.strokeStyle='#6cf0ff88';x.lineWidth=1;x.setLineDash([4,4]);x.beginPath();gr.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.stroke();x.setLineDash([]);
gr.forEach(([a,b])=>{const h=x.createRadialGradient(a,b,0,a,b,14);h.addColorStop(0,'#fff');h.addColorStop(.25,'#cfe9ff');h.addColorStop(1,'#6cf0ff00');x.fillStyle=h;x.beginPath();x.arc(a,b,14,0,7);x.fill()})});
const n=document.getElementById('name').value;if(n){x.font='500 14px JetBrains Mono';x.fillStyle='#ffb547';x.fillText('✦ '+n.toUpperCase(),18,c.height-18)}requestAnimationFrame(paint)}
c.onpointerdown=e=>{if(e.shiftKey&&groups.at(-1).length)groups.push([]);groups.at(-1).push(pos(e))};
document.getElementById('undo').onclick=()=>{const g=groups.at(-1);g.pop();if(!g.length&&groups.length>1)groups.pop()};
document.getElementById('clear').onclick=()=>{groups=[[]]};
document.getElementById('save').onclick=()=>{const a=document.createElement('a');a.download='chom-sao.png';a.href=c.toDataURL('image/png');a.click()};
[[120,120],[200,90],[280,140],[340,110],[300,220],[200,240]].forEach(p=>groups[0].push(p));paint();`),

  /* ---------- Mã khoá lượng tử (password) ---------- */
  password: appPage("Mã khoá lượng tử", `
<div class="box">
  <p class="k">Module · 06 — Crypto</p>
  <h1>Mã khoá <span>lượng tử</span></h1>
  <output id="out" style="display:block;margin:18px 0 6px;font:500 22px/1.4 'JetBrains Mono',monospace;word-break:break-all;padding:18px;border-radius:14px;border:1px solid #6cf0ff40;background:#6cf0ff0a;min-height:68px;color:#6cf0ff;text-shadow:0 0 12px #6cf0ff66"></output>
  <div style="height:4px;border-radius:4px;background:#ffffff10;overflow:hidden"><div id="bar" style="height:100%;width:50%;background:linear-gradient(90deg,#ff5d7a,#ffb547,#6cf0ff);transition:width .3s"></div></div>
  <p class="mono" style="margin:6px 0 16px">Entropy ≈ <b id="ent" style="color:#e8ecff">0</b> bit</p>
  <label class="mono" style="display:block;text-align:left">Độ dài: <b id="lv" style="color:#e8ecff">16</b></label>
  <input id="len" type="range" min="8" max="48" value="16" style="width:100%;accent-color:#6cf0ff">
  <div class="row mono" style="gap:18px"><label><input type="checkbox" id="up" checked> A–Z</label><label><input type="checkbox" id="num" checked> 0–9</label><label><input type="checkbox" id="sym" checked> !@#</label></div>
  <div class="row"><button class="primary" id="gen">Tạo khoá mới</button><button id="copy">Copy</button></div>
  <small id="msg">Sinh ngẫu nhiên bằng Web Crypto ngay trong trình duyệt — không gửi đi đâu.</small>
</div>`, `
const $=i=>document.getElementById(i);
function gen(){let s='abcdefghijkmnopqrstuvwxyz';if($('up').checked)s+='ABCDEFGHJKLMNPQRSTUVWXYZ';if($('num').checked)s+='23456789';if($('sym').checked)s+='!@#$%^&*-_=+?';
const n=+$('len').value,a=new Uint32Array(n);crypto.getRandomValues(a);$('out').textContent=Array.from(a,v=>s[v%s.length]).join('');$('lv').textContent=n;const e=Math.round(n*Math.log2(s.length));$('ent').textContent=e;$('bar').style.width=Math.min(100,e/2.2)+'%'}
['len','up','num','sym'].forEach(i=>$(i).oninput=gen);$('gen').onclick=gen;
$('copy').onclick=()=>{const v=$('out').textContent;(navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(()=>$('msg').textContent='Đã copy ✦',()=>{const r=document.createRange();r.selectNodeContents($('out'));getSelection().removeAllRanges();getSelection().addRange(r);$('msg').textContent='Đã bôi đen — nhấn Ctrl/Cmd + C'})};gen();`),

  /* ---------- Thẻ phi hành gia (link-in-bio) ---------- */
  biolink: appPage("Thẻ phi hành gia", `
<div class="box" style="width:min(420px,100%)">
  <p class="k">Thẻ định danh · Phi hành đoàn</p>
  <div style="width:104px;height:104px;margin:0 auto 14px;border-radius:50%;padding:3px;background:conic-gradient(#6cf0ff,#c86bff,#ffb547,#6cf0ff)"><div style="width:100%;height:100%;border-radius:50%;background:#0b0d1f;display:grid;place-items:center;font:600 34px Unbounded">TB</div></div>
  <h1 contenteditable="true" spellcheck="false">Tên bạn</h1>
  <p class="mono" contenteditable="true" style="margin:0 0 22px">Designer · Dev · Nhà thám hiểm</p>
  <div style="display:grid;gap:10px"><a class="btn" href="#">Website ↗</a><a class="btn" href="#">GitHub ↗</a><a class="btn" href="#">LinkedIn ↗</a><a class="btn primary" href="mailto:ban@email.com">Gửi tín hiệu ✦</a></div>
  <p style="margin:18px 0 0"><small>Bấm vào tên & mô tả để sửa thử. Tải về rồi đổi link trong file .html.</small></p>
</div>`),
};
