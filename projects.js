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
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Sriracha&family=Be+Vietnam+Pro:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:28px;color:#1a1814;font:15px/1.6 "Be Vietnam Pro",system-ui,sans-serif;
background:#f5efe3 radial-gradient(rgba(26,24,20,.08) 1px,transparent 1.2px) 0 0/22px 22px}
h1{font:400 46px/1 Fraunces,Georgia,serif;letter-spacing:-.03em;margin:0 0 6px}
h1 em{font-style:italic;font-weight:300;color:#2440d8}
.box{width:min(580px,100%);background:#fbf8f1;border:1.4px solid #1a1814;border-radius:20px;box-shadow:0 30px 60px -32px rgba(60,40,10,.4);padding:32px 30px;text-align:center}
button,.btn{font:500 14px/1 "Be Vietnam Pro",sans-serif;padding:12px 20px;border:1.5px solid #1a1814;background:transparent;color:#1a1814;border-radius:999px;cursor:pointer;text-decoration:none;display:inline-block;transition:transform .2s,background .2s,color .2s}
button:hover,.btn:hover{transform:translateY(-2px)}
button:active{transform:translateY(1px)}
button.on,.primary{background:#1a1814;color:#f5efe3}
.row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:16px 0}
.hand{font-family:Sriracha,cursive;color:#2440d8}
small{color:#8a8170}
</style>`;

const page = (title, body, script = "") =>
  `<!doctype html><html lang="vi"><head><title>${title}</title>${BASE}</head><body>${body}<script>${script}<\/script></body></html>`;

const APPS = {
  pomodoro: page("Đồng hồ cà chua", `
<div class="box">
  <h1>Đồng hồ <em>cà chua</em></h1><p class="hand" style="margin:0">giữ nhịp tập trung khi code 🍅</p>
  <div class="row">
    <button class="on" data-m="25">Tập trung 25'</button><button data-m="5">Nghỉ 5'</button><button data-m="15">Nghỉ dài 15'</button>
  </div>
  <div id="t" style="font:300 120px/1 Fraunces,serif;letter-spacing:-.04em;margin:14px 0 4px;font-variant-numeric:tabular-nums">25:00</div>
  <svg viewBox="0 0 300 20" width="100%" height="20" aria-hidden="true"><path id="bar" d="M4 10 C80 4 220 16 296 10" stroke="#e5452b" stroke-width="6" fill="none" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="0"/></svg>
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
  <h1>Hộp <em>màu</em></h1>
  <p class="hand" style="margin:0 0 18px">Nhấn <b>Space</b> hoặc nút bên dưới để trộn màu. Bấm vào ô để copy mã.</p>
  <div id="sw" style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px"></div>
  <div class="row"><button class="primary" id="mix">Trộn màu mới</button></div>
  <small class="hand" id="msg">&nbsp;</small>
</div>`, `
const sw=document.getElementById('sw'),msg=document.getElementById('msg');
const hsl=(h,s,l)=>{l/=100;const a=s*Math.min(l,1-l)/100,f=n=>{const k=(n+h/30)%12;return Math.round(255*(l-a*Math.max(Math.min(k-3,9-k,1),-1))).toString(16).padStart(2,'0')};return '#'+f(0)+f(8)+f(4)};
function mix(){const base=Math.random()*360,mode=[30,40,72,150][Math.floor(Math.random()*4)];sw.innerHTML='';
for(let i=0;i<5;i++){const c=hsl((base+i*mode)%360,55+Math.random()*30,45+Math.random()*35),d=document.createElement('button');
d.style.cssText='height:150px;background:'+c+';display:flex;align-items:flex-end;justify-content:center;padding-bottom:8px;border-radius:14px;border:1.4px solid #1a1814';
d.innerHTML='<span style="background:#fbf8f1;padding:3px 10px;border-radius:99px;font-size:13px;font-weight:500">'+c+'</span>';
d.onclick=()=>{const done=()=>{msg.textContent='Đã copy '+c+' ✓'};navigator.clipboard?navigator.clipboard.writeText(c).then(done,()=>{msg.textContent='Mã màu: '+c}):msg.textContent='Mã màu: '+c};sw.appendChild(d)}}
document.getElementById('mix').onclick=mix;addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();mix()}});mix();`),

  sketch: page("Giấy nháp", `
<div class="box" style="width:min(820px,100%);padding:20px">
  <h1>Giấy <em>nháp</em></h1>
  <div class="row" id="pens"></div>
  <canvas id="c" width="760" height="420" style="width:100%;touch-action:none;background:#fffefb;border:1.4px solid #1a1814;border-radius:14px;cursor:crosshair"></canvas>
  <div class="row"><button id="undo">↶ Hoàn tác</button><button id="clear">Xoá hết</button><button class="primary" id="save">Lưu ảnh PNG</button></div>
</div>`, `
const c=document.getElementById('c'),x=c.getContext('2d'),strokes=[];let cur=null,color='#23201b',size=4;
[['#1a1814',4],['#e5452b',4],['#2440d8',4],['#22a35a',4],['#ffd84d',18],['#fffefb',26]].forEach(([col,s],i)=>{const b=document.createElement('button');b.style.cssText='width:40px;height:40px;padding:0;border-radius:50%;background:'+col;b.title=i===5?'Tẩy':'Bút';if(i===5)b.textContent='⌫';if(i===0)b.classList.add('on');b.onclick=()=>{color=col;size=s;document.querySelectorAll('#pens button').forEach(z=>z.style.outline='');b.style.outline='2px solid #2440d8';b.style.outlineOffset='3px'};document.getElementById('pens').appendChild(b)});
document.querySelector('#pens button').style.cssText+=';outline:2px solid #2440d8;outline-offset:3px';
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
  <h1>Mật khẩu <em>nhanh</em></h1>
  <output id="out" style="display:block;margin-top:16px;font:400 26px/1.3 Fraunces,serif;word-break:break-all;padding:18px;border:1.4px solid #1a1814;border-radius:14px;background:#f5efe3;min-height:70px"></output>
  <label style="display:block;margin:18px 0 4px">Độ dài: <b id="lv">16</b></label>
  <input id="len" type="range" min="8" max="48" value="16" style="width:100%;accent-color:#1a1814">
  <div class="row" style="gap:18px">
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
  <div style="width:96px;height:96px;margin:0 auto 10px;border-radius:50%;background:#2440d8;color:#f5efe3;display:grid;place-items:center;font:italic 300 40px Fraunces,serif">TB</div>
  <h1 contenteditable="true" spellcheck="false">Tên bạn ở đây</h1>
  <p class="hand" contenteditable="true" style="margin:0 0 22px;font-size:17px">Designer · Dev · Người kể chuyện ✎</p>
  <div style="display:grid;gap:12px">
    <a class="btn" href="#">Website ↗</a><a class="btn" href="#">GitHub ↗</a><a class="btn" href="#">LinkedIn ↗</a><a class="btn primary" href="mailto:ban@email.com">Email cho mình ✦</a>
  </div>
  <p class="hand" style="margin:18px 0 0"><small>Mẹo: bấm vào tên & mô tả để sửa thử. Tải về rồi đổi link trong file .html.</small></p>
</div>`),
};


/* ---------- Minh hoạ vẽ tay cho dự án không có preview trực tiếp ---------- */
const ART = {
  exanh: `<svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <rect x="0" y="0" width="400" height="220" fill="#dfeedd" stroke="none"/>
    <path d="M40 60h120M40 82h90M40 104h104" stroke="#1a1814" opacity=".55"/>
    <path d="M40 140c10-4 70-4 80 0v22c-10 4-70 4-80 0Z" fill="#1a1814" stroke="#1a1814"/>
    <text x="80" y="156" text-anchor="middle" font-family="Be Vietnam Pro" font-size="11" fill="#f5efe3" stroke="none">Khám phá</text>
    <text x="40" y="44" font-family="Fraunces" font-size="26" fill="#1a1814" stroke="none" font-style="italic">eXanh</text>
    <path d="M250 180c0-70 40-120 110-128 4 76-40 124-110 128Z" fill="#9fd4a6" stroke="#1a1814" stroke-width="1.6"/>
    <path d="M250 180c30-34 60-70 92-108M290 132l-14-24M314 104l-16-20M296 126l26 0M320 98l22 2" stroke="#1a1814" stroke-width="1.4"/>
    <circle cx="232" cy="64" r="16" fill="#ffd84d" stroke="#1a1814" stroke-width="1.4"/>
    <path d="M210 196c40-10 120-8 170 0" stroke="#2440d8" stroke-width="1.6"/>
  </svg>`,
};

const PROJECTS = [
  { id: "exanh", title: "eXanh.online", type: "web", art: "exanh",
    desc: "Website cá nhân đầu tay, xây bằng HTML, CSS, JavaScript với AI hỗ trợ viết code, tìm lỗi và kiểm thử.",
    tags: ["HTML", "CSS", "JavaScript", "AI"], url: "https://exanh.online", note: "dự án đầu tay ✦" },
  { id: "contact-cv", title: "Contact + CV", type: "template", src: "index.html",
    desc: "Bộ trang liên hệ và CV phong cách Apple Glass. Deploy lên GitHub Pages chỉ với một lần push.",
    tags: ["Template", "GitHub Pages"], url: "index.html",
    download: "https://github.com/BanhKhuc04/contact.vanhkhuc/archive/refs/heads/main.zip" },
  { id: "pomodoro", title: "Đồng hồ cà chua", type: "tool", live: APPS.pomodoro,
    desc: "Pomodoro 25 / 5 / 15 phút với thanh tiến trình vẽ tay — giữ nhịp tập trung khi code.",
    tags: ["Năng suất", "JavaScript"] },
  { id: "palette", title: "Hộp màu", type: "tool", live: APPS.palette, note: "nhấn Space thử xem!",
    desc: "Sinh bảng 5 màu hài hoà, nhấn Space để trộn lại, bấm vào ô màu để copy mã HEX.",
    tags: ["Thiết kế", "Màu sắc"] },
  { id: "sketch", title: "Giấy nháp", type: "fun", live: APPS.sketch,
    desc: "Bảng vẽ nháp có bút, bút highlight, tẩy, hoàn tác và lưu thành ảnh PNG.",
    tags: ["Canvas", "Vẽ"] },
  { id: "password", title: "Mật khẩu nhanh", type: "tool", live: APPS.password,
    desc: "Tạo mật khẩu mạnh ngay trong trình duyệt bằng Web Crypto, không gửi dữ liệu đi đâu cả.",
    tags: ["Bảo mật", "Tiện ích"] },
  { id: "biolink", title: "Trang link cá nhân", type: "template", live: APPS.biolink,
    desc: "Template link-in-bio một file duy nhất — tải về, đổi tên và link là xong.",
    tags: ["Template", "1 file"] },
];

const TYPE_LABEL = { web: "website", tool: "công cụ", template: "template", fun: "vui vẻ" };
const SPANS = [7, 5, 4, 4, 4, 6, 6];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- Iframe xem trước, tự co theo khung ---------- */
const VIRTUAL_W = 760;
const ro = new ResizeObserver((entries) => {
  for (const { target } of entries) {
    const f = target.querySelector("iframe");
    if (!f) continue;
    const vw = +target.dataset.vw || VIRTUAL_W;
    const s = target.clientWidth / vw;
    f.style.width = vw + "px";
    f.style.height = target.clientHeight / s + "px";
    f.style.transform = `scale(${s})`;
  }
});
function mountPreview(el, { html, src }) {
  const f = document.createElement("iframe");
  f.setAttribute("tabindex", "-1");
  f.setAttribute("aria-hidden", "true");
  f.title = "";
  if (html) { f.setAttribute("sandbox", "allow-scripts"); f.srcdoc = html; } else f.src = src;
  el.appendChild(f);
  ro.observe(el);
}

/* ---------- Render bộ sưu tập ---------- */
const grid = document.getElementById("grid");
const empty = document.getElementById("empty");

function layout(n) {
  const spans = [];
  let row = 0;
  for (let i = 0; i < n; i++) {
    let s = SPANS[i % SPANS.length];
    if (row + s > 12) { spans[spans.length - 1] += 12 - row; row = 0; }
    spans.push(s);
    row = (row + s) % 12;
  }
  if (row) spans[spans.length - 1] += 12 - row;
  return spans;
}

function cardHTML(p, i, span) {
  const actions = [];
  if (p.live) actions.push(`<button class="btn ink small" data-play="${p.id}">Dùng ngay <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>`);
  if (p.url) actions.push(`<a class="btn ${p.live ? "ghost" : "ink"} small" href="${p.url}"${p.url.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>Mở web ↗</a>`);
  if (p.live) actions.push(`<button class="link-dl" data-dl="${p.id}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 19h14"/></svg>Tải .html</button>`);
  if (p.download) actions.push(`<a class="link-dl" href="${p.download}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 19h14"/></svg>Tải .zip</a>`);
  const host = p.url && p.url.startsWith("http") ? p.url.replace(/^https?:\/\//, "") : `${p.id}.html`;
  return `<article class="card${span >= 6 ? " wide" : ""}" style="--i:${i};--span:${span}" data-id="${p.id}">
    ${p.note ? `<p class="note pen">${esc(p.note)}</p>` : ""}
    <div class="preview">
      <div class="chrome"><i></i><i></i><i></i><span>${esc(host)}</span></div>
      ${p.art ? `<div class="art">${ART[p.art]}</div>` : `<div class="screen"></div>`}
    </div>
    <div class="meta"><span class="kind">${TYPE_LABEL[p.type]}${p.live ? " · chạy ngay" : ""}</span><span>№ ${String(PROJECTS.indexOf(p) + 1).padStart(2, "0")}</span></div>
    <h3>${esc(p.title)}</h3>
    <p class="desc">${esc(p.desc)}</p>
    <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    <div class="actions">${actions.join("")}</div>
  </article>`;
}

let filter = "all";
let query = "";
const cardObserver = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  const scr = e.target.querySelector(".screen");
  if (scr && !scr.firstChild) {
    const p = PROJECTS.find((x) => x.id === e.target.dataset.id);
    if (p) { if (p.src) scr.dataset.vw = 1280; mountPreview(scr, p.live ? { html: p.live } : { src: p.src }); }
  }
  cardObserver.unobserve(e.target);
}), { rootMargin: "0px 0px -60px 0px" });

function render() {
  const q = query.trim().toLowerCase();
  const list = PROJECTS.filter((p) =>
    (filter === "all" || p.type === filter) &&
    (!q || [p.title, p.desc, ...p.tags].join(" ").toLowerCase().includes(q)));
  const showSoon = filter === "all" && !q;
  const spans = layout(list.length);
  grid.innerHTML = list.map((p, i) => cardHTML(p, i, spans[i])).join("") + (showSoon ? `
    <article class="card soon" style="--i:${list.length};--span:12">
      <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 50 46 18l6 6-32 32H14ZM42 22l6 6M10 58c10-4 20 2 30-2"/></svg>
      <h3>Dự án tiếp theo…</h3>
      <p>đang được phác thảo trên giấy. Có ý tưởng? <a href="mailto:vanhkhuc2k5@gmail.com">Rủ mình làm cùng ✎</a></p>
    </article>` : "");
  empty.hidden = list.length > 0;
  grid.querySelectorAll(".card").forEach((c) => (reduced ? c.classList.add("in") : cardObserver.observe(c)));
  if (reduced) grid.querySelectorAll(".card").forEach((c) => cardObserver.observe(c));
}

document.querySelectorAll(".tabs button").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll(".tabs button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    filter = b.dataset.filter;
    render();
  }));
document.getElementById("search").addEventListener("input", (e) => { query = e.target.value; render(); });
document.getElementById("count").textContent = String(PROJECTS.length).padStart(2, "0");

/* ---------- Tải về & chạy trực tiếp ---------- */
function downloadHTML(p) {
  const url = URL.createObjectURL(new Blob([p.live], { type: "text/html;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: `${p.id}.html` });
  document.body.appendChild(a); a.click(); a.remove();
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
  } else if (dl) downloadHTML(PROJECTS.find((p) => p.id === dl.dataset.dl));
});
document.getElementById("playerDownload").addEventListener("click", () => playing && downloadHTML(playing));
document.getElementById("playerClose").addEventListener("click", () => player.close());
player.addEventListener("click", (e) => { if (e.target === player) player.close(); });
player.addEventListener("close", () => { frame.srcdoc = ""; });

/* ---------- Collage hero ---------- */
document.querySelectorAll(".collage .screen[data-app]").forEach((el) => { el.dataset.vw = 640; mountPreview(el, { html: APPS[el.dataset.app] }); });
const hero = document.getElementById("hero");
const finePointer = matchMedia("(pointer: fine)").matches;
if (finePointer && !reduced) {
  const layers = [...document.querySelectorAll("[data-depth]")];
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    layers.forEach((l) => { const d = +l.dataset.depth; l.style.transform = `translate(${x * d}px, ${y * d}px)`; });
  });
  hero.addEventListener("mouseleave", () => layers.forEach((l) => (l.style.transform = "")));
}

/* ---------- Vẽ mực lên hero (mờ dần) ---------- */
(() => {
  const cv = document.getElementById("ink");
  const ctx = cv.getContext("2d");
  const strokes = [];
  let cur = null, raf = 0;
  const LIFE = 2600, FADE = 1400;
  const size = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = hero.clientWidth * dpr; cv.height = hero.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size(); addEventListener("resize", size);
  const color = () => getComputedStyle(document.documentElement).getPropertyValue("--pen").trim() || "#2440d8";
  const pt = (e) => { const r = hero.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  function frameLoop() {
    const now = performance.now();
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.lineCap = ctx.lineJoin = "round";
    for (let i = strokes.length - 1; i >= 0; i--) {
      const s = strokes[i];
      const age = s === cur ? 0 : now - s.end;
      if (age > LIFE + FADE) { strokes.splice(i, 1); continue; }
      ctx.globalAlpha = age < LIFE ? 0.9 : 0.9 * (1 - (age - LIFE) / FADE);
      ctx.strokeStyle = s.color; ctx.lineWidth = 2.6;
      ctx.beginPath();
      s.p.forEach(([x, y], j) => (j ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
    }
    raf = strokes.length ? requestAnimationFrame(frameLoop) : 0;
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(frameLoop); };
  hero.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch" || e.button !== 0 || e.target.closest("a,button,input,label")) return;
    e.preventDefault();
    cur = { p: [pt(e)], color: color() };
    strokes.push(cur); kick();
    document.querySelector(".hint")?.classList.add("used");
  });
  addEventListener("pointermove", (e) => { if (cur) { cur.p.push(pt(e)); kick(); } });
  addEventListener("pointerup", () => { if (cur) { cur.end = performance.now(); cur = null; kick(); } });
})();

/* ---------- Reveal & nét tự vẽ khi cuộn tới ---------- */
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add(e.target.classList.contains("draw") ? "is-drawn" : "in");
  io.unobserve(e.target);
}), { threshold: 0.2 });
document.querySelectorAll(".reveal, .draw").forEach((el) => io.observe(el));

const nav = document.querySelector(".nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 8), { passive: true });

/* ---------- Sáng / tối ---------- */
const root = document.documentElement;
const store = {
  get: () => { try { return localStorage.getItem("vk-theme"); } catch { return null; } },
  set: (v) => { try { localStorage.setItem("vk-theme", v); } catch {} },
};
const saved = store.get();
if (saved) root.dataset.theme = saved;
document.getElementById("themeToggle").addEventListener("click", () => {
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  store.set(root.dataset.theme);
});

render();
