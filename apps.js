/* ==========================================================
   Mini-app chạy trực tiếp trên portfolio (mỗi app = 1 file HTML độc lập)
   ========================================================== */
const APP_BASE = `
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;color:#0d1a35;font:15px/1.6 "Be Vietnam Pro",system-ui,sans-serif;background:#f4f7fc;background-image:radial-gradient(circle at 85% 10%,#dceaff 0,transparent 35%),radial-gradient(circle at 10% 90%,#e6f0ff 0,transparent 30%)}
h1{font:700 28px/1.2 "Be Vietnam Pro",sans-serif;letter-spacing:-.02em;margin:0 0 4px}
h1 span{color:#1677ff}
.k{font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#1677ff;margin:0 0 8px}
.box{width:min(600px,100%);padding:32px;text-align:center;background:#fff;border:1px solid #e6e9f0;border-radius:24px;box-shadow:0 30px 60px -30px rgba(22,60,130,.25)}
button,.btn{font:600 14px/1 "Be Vietnam Pro",sans-serif;padding:13px 20px;border:1px solid #dfe4ee;background:#fff;color:#0d1a35;border-radius:999px;cursor:pointer;text-decoration:none;display:inline-block;transition:.2s}
button:hover,.btn:hover{border-color:#1677ff;color:#1677ff}
button.on,.primary{background:#1677ff;color:#fff!important;border-color:#1677ff}
button.primary:hover,.btn.primary:hover{background:#0f5fd6}
.row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:18px 0}
small,.muted{font-size:13px;color:#6b7891}
</style>`;
const appPage = (title, body, script = "") =>
  `<!doctype html><html lang="vi"><head><title>${title}</title>${APP_BASE}</head><body>${body}<script>${script}<\/script></body></html>`;

const APPS = {
  pomodoro: appPage("Pomodoro Timer", `
<div class="box">
  <p class="k">Công cụ năng suất</p>
  <h1>Pomodoro <span>Timer</span></h1>
  <div class="row"><button class="on" data-m="25">Tập trung 25'</button><button data-m="5">Nghỉ 5'</button><button data-m="15">Nghỉ dài 15'</button></div>
  <div style="position:relative;width:240px;height:240px;margin:4px auto">
    <svg viewBox="0 0 200 200" width="240" height="240" style="transform:rotate(-90deg)">
      <circle cx="100" cy="100" r="88" fill="none" stroke="#edf1f7" stroke-width="10"/>
      <circle id="arc" cx="100" cy="100" r="88" fill="none" stroke="#1677ff" stroke-width="10" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="0" style="transition:stroke-dashoffset .4s"/>
    </svg>
    <div id="t" style="position:absolute;inset:0;display:grid;place-items:center;font:700 52px 'Be Vietnam Pro';letter-spacing:-.03em;font-variant-numeric:tabular-nums">25:00</div>
  </div>
  <div class="row"><button id="go" class="primary">Bắt đầu</button><button id="reset">Đặt lại</button></div>
  <small id="done">Hôm nay: 0 phiên hoàn thành</small>
</div>`, `
let total=1500,left=1500,timer=null,count=0;const $=i=>document.getElementById(i),t=$('t'),go=$('go'),arc=$('arc');
const draw=()=>{t.textContent=String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0');arc.style.strokeDashoffset=100-left/total*100;document.title=t.textContent+' · Pomodoro'};
const stop=()=>{clearInterval(timer);timer=null;go.textContent='Bắt đầu'};
go.onclick=()=>{if(timer)return stop();go.textContent='Tạm dừng';timer=setInterval(()=>{left--;draw();if(left<=0){stop();count++;$('done').textContent='Hôm nay: '+count+' phiên hoàn thành 🎉';left=total;draw()}},1000)};
$('reset').onclick=()=>{stop();left=total;draw()};
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-m]').forEach(x=>x.classList.remove('on'));b.classList.add('on');stop();total=left=b.dataset.m*60;draw()});draw();`),

  palette: appPage("Color Palette", `
<div class="box" style="width:min(720px,100%)">
  <p class="k">Công cụ thiết kế</p>
  <h1>Color <span>Palette</span></h1>
  <p class="muted" style="margin:4px 0 20px">Nhấn <b>Space</b> để tạo bảng màu mới · bấm vào một màu để sao chép mã</p>
  <div id="sw" style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px"></div>
  <div class="row"><button class="primary" id="mix">Tạo bảng màu mới</button></div>
  <small id="msg">&nbsp;</small>
</div>`, `
const sw=document.getElementById('sw'),msg=document.getElementById('msg');
const hsl=(h,s,l)=>{l/=100;const a=s*Math.min(l,1-l)/100,f=n=>{const k=(n+h/30)%12;return Math.round(255*(l-a*Math.max(Math.min(k-3,9-k,1),-1))).toString(16).padStart(2,'0')};return '#'+f(0)+f(8)+f(4)};
function mix(){const base=Math.random()*360,step=[24,36,60,150][Math.floor(Math.random()*4)];sw.innerHTML='';
for(let i=0;i<5;i++){const c=hsl((base+i*step)%360,55+Math.random()*30,40+Math.random()*35),d=document.createElement('button');
d.style.cssText='height:180px;padding:0 0 12px;display:flex;align-items:flex-end;justify-content:center;border-radius:16px;border:0;background:'+c;
d.innerHTML='<span style="background:#fff;padding:5px 10px;border-radius:99px;font-size:12px;font-weight:600;color:#0d1a35">'+c.toUpperCase()+'</span>';
d.onclick=()=>{const ok=()=>msg.textContent='Đã sao chép '+c.toUpperCase()+' ✓';navigator.clipboard?navigator.clipboard.writeText(c).then(ok,()=>msg.textContent='Mã màu: '+c):msg.textContent='Mã màu: '+c};sw.appendChild(d)}}
document.getElementById('mix').onclick=mix;addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();mix()}});mix();`),

  sketch: appPage("Sketch Pad", `
<div class="box" style="width:min(820px,100%);padding:24px">
  <p class="k">Canvas</p>
  <h1>Sketch <span>Pad</span></h1>
  <div class="row" id="pens" style="margin:14px 0"></div>
  <canvas id="c" width="760" height="400" style="width:100%;touch-action:none;background:#fff;border:1px solid #e6e9f0;border-radius:16px;cursor:crosshair;background-image:radial-gradient(#e3e8f1 1px,transparent 1px);background-size:20px 20px"></canvas>
  <div class="row"><button id="undo">↶ Hoàn tác</button><button id="clear">Xoá hết</button><button class="primary" id="save">Lưu ảnh PNG</button></div>
</div>`, `
const c=document.getElementById('c'),x=c.getContext('2d'),strokes=[];let cur=null,color='#0d1a35',size=4;
[['#0d1a35',4],['#1677ff',4],['#ef4444',4],['#22c55e',4],['#facc15',16],['#ffffff',24]].forEach(([col,s],i)=>{const b=document.createElement('button');b.style.cssText='width:38px;height:38px;padding:0;border-radius:50%;border:1px solid #dfe4ee;background:'+col;b.title=i===5?'Tẩy':'Bút';if(i===5)b.textContent='⌫';b.onclick=()=>{color=col;size=s;document.querySelectorAll('#pens button').forEach(z=>z.style.boxShadow='');b.style.boxShadow='0 0 0 3px #fff,0 0 0 5px #1677ff'};document.getElementById('pens').appendChild(b)});
document.querySelector('#pens button').style.boxShadow='0 0 0 3px #fff,0 0 0 5px #1677ff';
const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};
const paint=(bg)=>{x.clearRect(0,0,c.width,c.height);if(bg){x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height)}x.lineCap=x.lineJoin='round';strokes.forEach(s=>{x.strokeStyle=s.color;x.lineWidth=s.size;x.globalAlpha=s.size>10&&s.color!=='#ffffff'?.5:1;x.globalCompositeOperation=s.color==='#ffffff'&&!bg?'destination-out':'source-over';x.beginPath();s.p.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.stroke()});x.globalAlpha=1;x.globalCompositeOperation='source-over'};
c.onpointerdown=e=>{c.setPointerCapture(e.pointerId);cur={color,size,p:[pos(e)]};strokes.push(cur)};
c.onpointermove=e=>{if(!cur)return;cur.p.push(pos(e));paint()};
c.onpointerup=c.onpointercancel=()=>cur=null;
document.getElementById('undo').onclick=()=>{strokes.pop();paint()};
document.getElementById('clear').onclick=()=>{strokes.length=0;paint()};
document.getElementById('save').onclick=()=>{paint(true);const a=document.createElement('a');a.download='sketch.png';a.href=c.toDataURL('image/png');a.click();paint()};`),

  password: appPage("Password Generator", `
<div class="box">
  <p class="k">Bảo mật</p>
  <h1>Password <span>Generator</span></h1>
  <output id="out" style="display:block;margin:18px 0 8px;font:600 21px/1.4 ui-monospace,Menlo,Consolas,monospace;word-break:break-all;padding:18px;border-radius:16px;background:#f4f7fc;border:1px solid #e6e9f0;min-height:66px"></output>
  <div style="height:6px;border-radius:6px;background:#edf1f7;overflow:hidden"><div id="bar" style="height:100%;width:50%;background:linear-gradient(90deg,#ef4444,#f59e0b,#22c55e);transition:width .3s"></div></div>
  <p class="muted" style="margin:6px 0 18px">Độ mạnh ≈ <b id="ent" style="color:#0d1a35">0</b> bit entropy</p>
  <label class="muted" style="display:block;text-align:left">Độ dài: <b id="lv" style="color:#0d1a35">16</b></label>
  <input id="len" type="range" min="8" max="48" value="16" style="width:100%;accent-color:#1677ff">
  <div class="row" style="gap:18px"><label><input type="checkbox" id="up" checked> A–Z</label><label><input type="checkbox" id="num" checked> 0–9</label><label><input type="checkbox" id="sym" checked> !@#</label></div>
  <div class="row"><button class="primary" id="gen">Tạo mật khẩu mới</button><button id="copy">Sao chép</button></div>
  <small id="msg">Tạo ngẫu nhiên bằng Web Crypto ngay trong trình duyệt — không gửi đi đâu.</small>
</div>`, `
const $=i=>document.getElementById(i);
function gen(){let s='abcdefghijkmnopqrstuvwxyz';if($('up').checked)s+='ABCDEFGHJKLMNPQRSTUVWXYZ';if($('num').checked)s+='23456789';if($('sym').checked)s+='!@#$%^&*-_=+?';
const n=+$('len').value,a=new Uint32Array(n);crypto.getRandomValues(a);$('out').textContent=Array.from(a,v=>s[v%s.length]).join('');$('lv').textContent=n;const e=Math.round(n*Math.log2(s.length));$('ent').textContent=e;$('bar').style.width=Math.min(100,e/2.2)+'%'}
['len','up','num','sym'].forEach(i=>$(i).oninput=gen);$('gen').onclick=gen;
$('copy').onclick=()=>{const v=$('out').textContent;(navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(()=>$('msg').textContent='Đã sao chép ✓',()=>{const r=document.createRange();r.selectNodeContents($('out'));getSelection().removeAllRanges();getSelection().addRange(r);$('msg').textContent='Đã bôi đen — nhấn Ctrl/Cmd + C'})};gen();`),

  biolink: appPage("Link in Bio", `
<div class="box" style="width:min(420px,100%)">
  <div style="width:96px;height:96px;margin:0 auto 14px;border-radius:50%;background:linear-gradient(135deg,#1677ff,#61a8ff);display:grid;place-items:center;color:#fff;font:700 34px 'Be Vietnam Pro'">TB</div>
  <h1 contenteditable="true" spellcheck="false">Tên của bạn</h1>
  <p class="muted" contenteditable="true" style="margin:0 0 22px">Designer · Developer · Creator</p>
  <div style="display:grid;gap:10px"><a class="btn" href="#">🌐 Website</a><a class="btn" href="#">💻 GitHub</a><a class="btn" href="#">💼 LinkedIn</a><a class="btn primary" href="mailto:ban@email.com">✉️ Liên hệ với mình</a></div>
  <p style="margin:18px 0 0"><small>Mẹo: bấm vào tên & mô tả để sửa thử. Tải về rồi đổi link trong file .html.</small></p>
</div>`),
};
