/* ==========================================================
   Xưởng Vanh — dữ liệu dự án + mini-app chạy trực tiếp
   Thêm dự án mới: thêm một object vào mảng PROJECTS.
   - live:  HTML đầy đủ của app → "Dùng ngay" chạy trong khung, "Tải về" xuất file .html
   - url:   link ngoài → nút "Mở web"
   - download: link file tải (zip, pdf…)
   ========================================================== */

// Khung CSS chung cho mọi mini-app (cùng phong cách vẽ tay)
const BASE = `
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Patrick+Hand&family=Be+Vietnam+Pro:wght@400;500;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;color:#23201b;font:16px/1.5 "Be Vietnam Pro",system-ui,sans-serif;
background:#fbf6ea;background-image:linear-gradient(rgba(66,112,190,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(66,112,190,.13) 1px,transparent 1px);background-size:28px 28px}
h1{font:700 44px/1 Caveat,cursive;margin:0 0 14px}
.box{width:min(560px,100%);background:#fffdf7;border:2.5px solid #23201b;border-radius:255px 14px 225px 16px/16px 225px 14px 255px;box-shadow:6px 7px 0 #23201b;padding:28px 26px;text-align:center}
button,.btn{font:700 22px/1 Caveat,cursive;padding:9px 18px;border:2.5px solid #23201b;background:#fffdf7;color:#23201b;border-radius:255px 14px 225px 16px/16px 225px 14px 255px;box-shadow:3px 4px 0 #23201b;cursor:pointer;text-decoration:none;display:inline-block}
button:active{transform:translate(2px,3px);box-shadow:1px 1px 0 #23201b}
button.on,.primary{background:#ff6a4d;color:#fff}
.row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:14px 0}
.hand{font-family:"Patrick Hand",cursive}
small{color:#5d574c}
</style>`;

const page = (title, body, script = "") =>
  `<!doctype html><html lang="vi"><head><title>${title}</title>${BASE}</head><body>${body}<script>${script}<\/script></body></html>`;

const APPS = {
  pomodoro: page("Đồng hồ cà chua", `
<div class="box">
  <h1>🍅 Đồng hồ cà chua</h1>
  <div class="row">
    <button class="on" data-m="25">Tập trung 25'</button><button data-m="5">Nghỉ 5'</button><button data-m="15">Nghỉ dài 15'</button>
  </div>
  <div id="t" style="font:700 110px/1 Caveat,cursive;margin:10px 0">25:00</div>
  <svg viewBox="0 0 300 20" width="100%" height="20" aria-hidden="true"><path id="bar" d="M4 10 C80 4 220 16 296 10" stroke="#ff6a4d" stroke-width="6" fill="none" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="0"/></svg>
  <div class="row"><button id="go" class="primary">Bắt đầu</button><button id="reset">Làm lại</button></div>
  <small class="hand" id="done">Đã xong 0 phiên hôm nay</small>
</div>`, `
let total=1500,left=1500,timer=null,count=0;const t=document.getElementById('t'),go=document.getElementById('go'),bar=document.getElementById('bar');
const draw=()=>{t.textContent=String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0');bar.style.strokeDashoffset=100-left/total*100;document.title=t.textContent+' · Cà chua'};
const stop=()=>{clearInterval(timer);timer=null;go.textContent='Bắt đầu'};
go.onclick=()=>{if(timer)return stop();go.textContent='Tạm dừng';timer=setInterval(()=>{left--;draw();if(left<=0){stop();count++;document.getElementById('done').textContent='Đã xong '+count+' phiên hôm nay 🎉';left=total;draw();try{new AudioContext().resume()}catch(e){}}},1000)};
document.getElementById('reset').onclick=()=>{stop();left=total;draw()};
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-m]').forEach(x=>x.classList.remove('on'));b.classList.add('on');stop();total=left=b.dataset.m*60;draw()});
draw();`),

  palette: page("Hộp màu", `
<div class="box" style="width:min(720px,100%)">
  <h1>🎨 Hộp màu ngẫu nhiên</h1>
  <p class="hand" style="margin:0 0 12px">Nhấn <b>Space</b> hoặc nút bên dưới để trộn màu. Bấm vào ô để copy mã.</p>
  <div id="sw" style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px"></div>
  <div class="row"><button class="primary" id="mix">Trộn màu mới</button></div>
  <small class="hand" id="msg">&nbsp;</small>
</div>`, `
const sw=document.getElementById('sw'),msg=document.getElementById('msg');
const hsl=(h,s,l)=>{l/=100;const a=s*Math.min(l,1-l)/100,f=n=>{const k=(n+h/30)%12;return Math.round(255*(l-a*Math.max(Math.min(k-3,9-k,1),-1))).toString(16).padStart(2,'0')};return '#'+f(0)+f(8)+f(4)};
function mix(){const base=Math.random()*360,mode=[30,40,72,150][Math.floor(Math.random()*4)];sw.innerHTML='';
for(let i=0;i<5;i++){const c=hsl((base+i*mode)%360,55+Math.random()*30,45+Math.random()*35),d=document.createElement('button');
d.style.cssText='height:150px;background:'+c+';display:flex;align-items:flex-end;justify-content:center;padding-bottom:8px;border-radius:'+(i%2?'14px 225px 16px 255px/255px 16px 225px 14px':'255px 14px 225px 16px/16px 225px 14px 255px');
d.innerHTML='<span style="background:#fffdf7;padding:2px 8px;border-radius:8px;font-size:18px">'+c+'</span>';
d.onclick=()=>{const done=()=>{msg.textContent='Đã copy '+c+' ✓'};navigator.clipboard?navigator.clipboard.writeText(c).then(done,()=>{msg.textContent='Mã màu: '+c}):msg.textContent='Mã màu: '+c};sw.appendChild(d)}}
document.getElementById('mix').onclick=mix;addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();mix()}});mix();`),

  sketch: page("Giấy nháp", `
<div class="box" style="width:min(820px,100%);padding:20px">
  <h1>✏️ Giấy nháp</h1>
  <div class="row" id="pens"></div>
  <canvas id="c" width="760" height="420" style="width:100%;touch-action:none;background:#fffefb;border:2px dashed #23201b;border-radius:10px;cursor:crosshair"></canvas>
  <div class="row"><button id="undo">↶ Hoàn tác</button><button id="clear">Xoá hết</button><button class="primary" id="save">Lưu ảnh PNG</button></div>
</div>`, `
const c=document.getElementById('c'),x=c.getContext('2d'),strokes=[];let cur=null,color='#23201b',size=4;
[['#23201b',4],['#ff6a4d',4],['#2f5fd8',4],['#22a35a',4],['#ffe27a',18],['#fffefb',26]].forEach(([col,s],i)=>{const b=document.createElement('button');b.style.cssText='width:44px;height:44px;padding:0;background:'+col;b.title=i===5?'Tẩy':'Bút';if(i===5)b.textContent='⌫';if(i===0)b.classList.add('on');b.onclick=()=>{color=col;size=s;document.querySelectorAll('#pens button').forEach(z=>z.style.outline='');b.style.outline='3px dashed #ff6a4d'};document.getElementById('pens').appendChild(b)});
document.querySelector('#pens button').style.outline='3px dashed #ff6a4d';
const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};
const paint=()=>{x.fillStyle='#fffefb';x.fillRect(0,0,c.width,c.height);x.lineCap=x.lineJoin='round';strokes.forEach(s=>{x.strokeStyle=s.color;x.lineWidth=s.size;x.globalAlpha=s.size>10&&s.color!=='#fffefb'?.55:1;x.beginPath();s.p.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.stroke()});x.globalAlpha=1};
c.onpointerdown=e=>{c.setPointerCapture(e.pointerId);cur={color,size,p:[pos(e)]};strokes.push(cur)};
c.onpointermove=e=>{if(!cur)return;cur.p.push(pos(e));paint()};
c.onpointerup=c.onpointercancel=()=>cur=null;
document.getElementById('undo').onclick=()=>{strokes.pop();paint()};
document.getElementById('clear').onclick=()=>{strokes.length=0;paint()};
document.getElementById('save').onclick=()=>{const a=document.createElement('a');a.download='giay-nhap.png';a.href=c.toDataURL('image/png');a.click()};
paint();`),

  password: page("Mật khẩu nhanh", `
<div class="box">
  <h1>🔐 Mật khẩu nhanh</h1>
  <output id="out" class="hand" style="display:block;font-size:28px;word-break:break-all;padding:14px;border:2px dashed #23201b;border-radius:10px;background:#fbf6ea;min-height:64px"></output>
  <label class="hand" style="display:block;margin:16px 0 4px;font-size:20px">Độ dài: <b id="lv">16</b></label>
  <input id="len" type="range" min="8" max="48" value="16" style="width:100%;accent-color:#ff6a4d">
  <div class="row hand" style="font-size:20px;gap:16px">
    <label><input type="checkbox" id="up" checked> A–Z</label><label><input type="checkbox" id="num" checked> 0–9</label><label><input type="checkbox" id="sym" checked> !@#</label>
  </div>
  <div class="row"><button class="primary" id="gen">Tạo mới</button><button id="copy">Copy</button></div>
  <small class="hand" id="msg">Tạo ngay trong trình duyệt, không gửi đi đâu cả.</small>
</div>`, `
const $=id=>document.getElementById(id);
function gen(){let s='abcdefghijkmnopqrstuvwxyz';if($('up').checked)s+='ABCDEFGHJKLMNPQRSTUVWXYZ';if($('num').checked)s+='23456789';if($('sym').checked)s+='!@#$%^&*-_=+?';
const a=new Uint32Array(+$('len').value);crypto.getRandomValues(a);$('out').textContent=Array.from(a,n=>s[n%s.length]).join('');$('lv').textContent=$('len').value}
['len','up','num','sym'].forEach(i=>$(i).oninput=gen);$('gen').onclick=gen;
$('copy').onclick=()=>{const v=$('out').textContent;(navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(()=>$('msg').textContent='Đã copy ✓',()=>{const r=document.createRange();r.selectNodeContents($('out'));getSelection().removeAllRanges();getSelection().addRange(r);$('msg').textContent='Đã bôi đen — nhấn Ctrl/Cmd + C'})};gen();`),

  biolink: page("Trang link cá nhân", `
<div class="box" style="width:min(420px,100%)">
  <div style="width:96px;height:96px;margin:0 auto 10px;border:2.5px solid #23201b;border-radius:50% 45% 55% 48%;background:#ffe27a;display:grid;place-items:center;font:700 44px Caveat,cursive">TB</div>
  <h1 contenteditable="true" spellcheck="false">Tên bạn ở đây</h1>
  <p class="hand" contenteditable="true" style="margin:-6px 0 18px;font-size:20px">Designer · Dev · Người kể chuyện ✎</p>
  <div style="display:grid;gap:12px">
    <a class="btn" href="#">🌐 Website</a><a class="btn" href="#">🐙 GitHub</a><a class="btn" href="#">💼 LinkedIn</a><a class="btn primary" href="mailto:ban@email.com">✉️ Email cho mình</a>
  </div>
  <p class="hand" style="margin:18px 0 0"><small>Mẹo: bấm vào tên & mô tả để sửa thử. Tải về rồi đổi link trong file .html.</small></p>
</div>`),
};

const ICONS = {
  leaf: '<svg viewBox="0 0 64 64"><path d="M12 52C12 26 30 12 54 10c0 26-16 42-42 42Z"/><path d="M12 52 38 26"/></svg>',
  card: '<svg viewBox="0 0 64 64"><rect x="8" y="14" width="48" height="36" rx="4"/><circle cx="22" cy="30" r="6"/><path d="M14 44c2-5 14-5 16 0M36 26h14M36 34h10"/></svg>',
  timer: '<svg viewBox="0 0 64 64"><circle cx="32" cy="36" r="20"/><path d="M32 24v12l8 6M26 8h12M32 8v8"/></svg>',
  palette: '<svg viewBox="0 0 64 64"><path d="M32 8C18 8 8 18 8 31s10 25 22 25c4 0 5-3 3-6s0-6 4-6h7c7 0 12-5 12-12C56 18 46 8 32 8Z"/><circle cx="20" cy="30" r="3"/><circle cx="28" cy="19" r="3"/><circle cx="41" cy="20" r="3"/></svg>',
  pencil: '<svg viewBox="0 0 64 64"><path d="M14 50 46 18l6 6-32 32H14Z"/><path d="m42 22 6 6M10 58c10-4 20 2 30-2"/></svg>',
  lock: '<svg viewBox="0 0 64 64"><rect x="12" y="28" width="40" height="28" rx="5"/><path d="M20 28v-8a12 12 0 0 1 24 0v8M32 40v6"/></svg>',
  link: '<svg viewBox="0 0 64 64"><path d="M28 36a10 10 0 0 0 14 0l8-8a10 10 0 0 0-14-14l-4 4"/><path d="M36 28a10 10 0 0 0-14 0l-8 8a10 10 0 0 0 14 14l4-4"/></svg>',
};

const PROJECTS = [
  { id: "exanh", title: "eXanh.online", type: "web", color: "c-mint", icon: "leaf",
    desc: "Website cá nhân xây bằng HTML, CSS, JS với AI hỗ trợ viết code, tìm lỗi và kiểm thử.",
    tags: ["HTML", "CSS", "JavaScript", "AI"], url: "https://exanh.online" },
  { id: "contact-cv", title: "Contact + CV", type: "template", color: "c-sky", icon: "card",
    desc: "Bộ trang liên hệ + CV phong cách Apple Glass, deploy GitHub Pages chỉ với một lần push.",
    tags: ["Template", "GitHub Pages"], url: "index.html",
    download: "https://github.com/BanhKhuc04/contact.vanhkhuc/archive/refs/heads/main.zip" },
  { id: "pomodoro", title: "Đồng hồ cà chua", type: "tool", color: "c-pink", icon: "timer",
    desc: "Pomodoro 25/5/15 phút với thanh tiến trình vẽ tay — giữ nhịp tập trung khi code.",
    tags: ["Năng suất", "JS"], live: APPS.pomodoro },
  { id: "palette", title: "Hộp màu", type: "tool", color: "c-yellow", icon: "palette",
    desc: "Sinh bảng 5 màu hài hoà, nhấn Space để trộn lại, bấm ô màu để copy mã HEX.",
    tags: ["Thiết kế", "Màu sắc"], live: APPS.palette },
  { id: "sketch", title: "Giấy nháp", type: "fun", color: "c-lilac", icon: "pencil",
    desc: "Bảng vẽ nháp có bút, highlight, tẩy, hoàn tác và lưu thành ảnh PNG.",
    tags: ["Canvas", "Vẽ"], live: APPS.sketch },
  { id: "password", title: "Mật khẩu nhanh", type: "tool", color: "c-mint", icon: "lock",
    desc: "Tạo mật khẩu mạnh ngay trong trình duyệt bằng crypto API, không gửi dữ liệu đi đâu.",
    tags: ["Bảo mật", "Tiện ích"], live: APPS.password },
  { id: "biolink", title: "Trang link cá nhân", type: "template", color: "c-sky", icon: "link",
    desc: "Template link-in-bio vẽ tay một file duy nhất — tải về, đổi tên và link là xong.",
    tags: ["Template", "1 file"], live: APPS.biolink },
];

const TYPE_LABEL = { web: "Website", tool: "Công cụ", template: "Template", fun: "Vui vẻ" };

/* ---------- Render ---------- */
const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function cardHTML(p, i) {
  const live = Boolean(p.live);
  const actions = [];
  if (live) actions.push(`<button class="sketch-btn small primary" data-play="${p.id}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5 19 12 7 19.5Z"/></svg>Dùng ngay</button>`);
  if (p.url) actions.push(`<a class="sketch-btn small${live ? "" : " primary"}" href="${p.url}"${p.url.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>Mở web ↗</a>`);
  if (live || p.download) actions.push(`<${p.download ? `a href="${p.download}"` : `button data-dl="${p.id}"`} class="sketch-btn small"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 19h14"/></svg>Tải về</${p.download ? "a" : "button"}>`);
  return `<article class="card" style="--i:${i}" data-type="${p.type}">
    <span class="tape" aria-hidden="true"></span>
    <div class="thumb ${p.color}" aria-hidden="true">
      <span class="badge${live ? " live" : ""}">${live ? "chạy ngay" : TYPE_LABEL[p.type]}</span>
      ${ICONS[p.icon]}
    </div>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.desc)}</p>
    <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    <div class="card-actions">${actions.join("")}</div>
  </article>`;
}

let filter = "all";
let query = "";
function render() {
  const q = query.trim().toLowerCase();
  const list = PROJECTS.filter((p) =>
    (filter === "all" || p.type === filter) &&
    (!q || [p.title, p.desc, ...p.tags].join(" ").toLowerCase().includes(q)));
  const soon = filter === "all" && !q ? `<article class="card soon" style="--i:${list.length}">
    <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 50 46 18l6 6-32 32H14Z"/><path d="m42 22 6 6M10 58c10-4 20 2 30-2"/></svg>
    <h3>Dự án tiếp theo…</h3>
    <p>đang được phác thảo trên giấy.<br />Có ý tưởng? <a href="mailto:vanhkhuc2k5@gmail.com">Rủ mình làm cùng ✎</a></p>
  </article>` : "";
  grid.innerHTML = list.map(cardHTML).join("") + soon;
  empty.hidden = list.length > 0;
}

document.querySelectorAll(".chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    filter = chip.dataset.filter;
    render();
  }));
document.getElementById("search").addEventListener("input", (e) => { query = e.target.value; render(); });

/* ---------- Tải về & chạy trực tiếp ---------- */
function downloadHTML(p) {
  const url = URL.createObjectURL(new Blob([p.live], { type: "text/html;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: `${p.id}.html` });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const player = document.getElementById("player");
const frame = document.getElementById("playerFrame");
let playing = null;

grid.addEventListener("click", (e) => {
  const play = e.target.closest("[data-play]");
  const dl = e.target.closest("[data-dl]");
  if (play) {
    playing = PROJECTS.find((p) => p.id === play.dataset.play);
    document.getElementById("playerTitle").textContent = playing.title;
    frame.srcdoc = playing.live;
    player.showModal();
  } else if (dl) {
    downloadHTML(PROJECTS.find((p) => p.id === dl.dataset.dl));
  }
});
document.getElementById("playerDownload").addEventListener("click", () => playing && downloadHTML(playing));
document.getElementById("playerClose").addEventListener("click", () => player.close());
player.addEventListener("click", (e) => { if (e.target === player) player.close(); });
player.addEventListener("close", () => { frame.srcdoc = ""; });

/* ---------- Số liệu hero (đếm lên) ---------- */
function countUp(el, to) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = to; return; }
  let n = 0;
  const tick = () => { el.textContent = n; if (n++ < to) setTimeout(tick, 90); };
  tick();
}
countUp(document.getElementById("statCount"), PROJECTS.length);
countUp(document.getElementById("statLive"), PROJECTS.filter((p) => p.live).length);

/* ---------- Giấy trắng / bảng đen ---------- */
const root = document.documentElement;
const store = { get: () => { try { return localStorage.getItem("vk-theme"); } catch { return null; } },
  set: (v) => { try { localStorage.setItem("vk-theme", v); } catch {} } };
const saved = store.get();
if (saved) root.dataset.theme = saved;
document.getElementById("themeToggle").addEventListener("click", () => {
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  store.set(root.dataset.theme);
});

render();
