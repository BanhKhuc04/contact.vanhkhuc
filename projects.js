/* ==========================================================
   Đài quan sát Vanh — vũ trụ dự án
   Thêm dự án: thêm 1 object vào PROJECTS (APPS nằm trong apps.js)
   - live: HTML của module → "Phóng ngay" + "Tải .html"
   - url: link ngoài/nội bộ → "Mở web"
   - download: link file (zip…) → "Tải .zip"
   - planet: màu (c1, c2), cỡ, vành đai, mặt trăng
   ========================================================== */
const PROJECTS = [
  { id: "exanh", title: "eXanh.online", type: "web", year: "05.2026", url: "https://exanh.online", art: true,
    desc: "Thiên thể đầu tiên của hệ: website cá nhân xây bằng HTML, CSS, JavaScript với AI hỗ trợ viết code, tìm lỗi và kiểm thử.",
    tags: ["HTML", "CSS", "JavaScript", "AI"], planet: { c1: "#7dffb0", c2: "#0f6b4a", size: 15, moon: true } },
  { id: "contact-cv", title: "Contact + CV", type: "template", year: "2026", url: "index.html", src: "index.html",
    download: "https://github.com/BanhKhuc04/contact.vanhkhuc/archive/refs/heads/main.zip",
    desc: "Bộ trang liên hệ và CV phong cách Apple Glass. Deploy lên GitHub Pages chỉ với một lần push.",
    tags: ["Template", "GitHub Pages"], planet: { c1: "#8fc0ff", c2: "#1b3a8f", size: 17, ring: true } },
  { id: "pomodoro", title: "Đồng hồ quỹ đạo", type: "tool", year: "2026", live: APPS.pomodoro,
    desc: "Pomodoro 25 / 5 / 15 phút: một vệ tinh chạy quanh quỹ đạo đếm ngược giúp bạn giữ nhịp tập trung.",
    tags: ["Năng suất", "JavaScript"], planet: { c1: "#ff9a6b", c2: "#8f2a1a", size: 11 } },
  { id: "palette", title: "Tinh vân màu", type: "tool", year: "2026", live: APPS.palette,
    desc: "Sinh bảng 5 màu hài hoà kèm tinh vân xem trước. Nhấn Space để trộn lại, bấm vào ngôi sao để copy mã HEX.",
    tags: ["Thiết kế", "Màu sắc"], planet: { c1: "#ff7ad9", c2: "#5a1a8f", size: 14, ring: true } },
  { id: "sketch", title: "Bảng chòm sao", type: "fun", year: "2026", live: APPS.sketch,
    desc: "Thả sao lên bầu trời, chúng tự nối thành chòm. Đặt tên cho chòm sao của bạn rồi lưu thành ảnh PNG.",
    tags: ["Canvas", "Sáng tạo"], planet: { c1: "#c8a6ff", c2: "#3a1f8f", size: 12, moon: true } },
  { id: "password", title: "Mã khoá lượng tử", type: "tool", year: "2026", live: APPS.password,
    desc: "Tạo mật khẩu mạnh bằng Web Crypto, có đo entropy. Mọi thứ chạy trong trình duyệt, không gửi đi đâu cả.",
    tags: ["Bảo mật", "Tiện ích"], planet: { c1: "#6cf0ff", c2: "#0b4a6b", size: 10 } },
  { id: "biolink", title: "Thẻ phi hành gia", type: "template", year: "2026", live: APPS.biolink,
    desc: "Template link-in-bio một file duy nhất. Tải về, đổi tên và đường link là có ngay thẻ định danh của riêng bạn.",
    tags: ["Template", "1 file"], planet: { c1: "#ffd27a", c2: "#8a5a12", size: 13, ring: true } },
];
const TYPE = { web: "Website", tool: "Công cụ", template: "Template", fun: "Thử nghiệm" };
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pad = (n) => String(n).padStart(2, "0");
const kb = (p) => (p.live ? (new Blob([p.live]).size / 1024).toFixed(1) + " KB" : p.download ? "repo .zip" : "web");

PROJECTS.forEach((p, i) => {
  p.no = pad(i + 1);
  p.orbit = i;
  p.speed = 0.22 / Math.pow(1 + i * 0.55, 1.1); // càng xa càng chậm
  p.phase = (i * 2.399) % (Math.PI * 2);        // góc vàng
});

/* ===================== BẦU TRỜI SAO ===================== */
(() => {
  const cv = document.getElementById("sky");
  const ctx = cv.getContext("2d");
  let w, h, dpr, stars = [], shoot = null, nextShoot = performance.now() + 3000, mx = 0, my = 0;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round((w * h) / 2600);
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h * 1.6, z: Math.random() ** 2,
      tw: Math.random() * Math.PI * 2, hue: Math.random() < 0.12 ? (Math.random() < 0.5 ? "#ffd9a8" : "#a8c8ff") : "#ffffff",
    }));
  };
  resize(); addEventListener("resize", resize);
  addEventListener("pointermove", (e) => { mx = e.clientX / w - 0.5; my = e.clientY / h - 0.5; }, { passive: true });
  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    const sy = scrollY;
    for (const s of stars) {
      const depth = 0.15 + s.z * 0.85;
      const x = (s.x - mx * 30 * depth + t * 0.004 * depth) % w;
      let y = (s.y - sy * 0.25 * depth - my * 20 * depth) % (h * 1.6);
      if (y < 0) y += h * 1.6;
      if (y > h) continue;
      const a = (0.35 + 0.65 * depth) * (reduced ? 1 : 0.65 + 0.35 * Math.sin(t / 700 + s.tw));
      const r = 0.4 + depth * 1.3;
      ctx.globalAlpha = a; ctx.fillStyle = s.hue;
      ctx.beginPath(); ctx.arc(x < 0 ? x + w : x, y, r, 0, 6.283); ctx.fill();
    }
    if (!reduced) {
      if (!shoot && t > nextShoot) {
        shoot = { x: Math.random() * w * 0.8 + w * 0.2, y: Math.random() * h * 0.4, vx: -(6 + Math.random() * 4), vy: 2.5 + Math.random() * 2, life: 0 };
      }
      if (shoot) {
        shoot.life++; shoot.x += shoot.vx; shoot.y += shoot.vy;
        const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.vx * 14, shoot.y - shoot.vy * 14);
        g.addColorStop(0, "rgba(255,255,255,.9)"); g.addColorStop(1, "rgba(108,240,255,0)");
        ctx.globalAlpha = Math.max(0, 1 - shoot.life / 70); ctx.strokeStyle = g; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x - shoot.vx * 14, shoot.y - shoot.vy * 14); ctx.stroke();
        if (shoot.life > 70) { shoot = null; nextShoot = t + 4000 + Math.random() * 6000; }
      }
    }
    ctx.globalAlpha = 1;
    if (!reduced) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* ===================== HỆ HÀNH TINH ===================== */
const System = (() => {
  const hero = document.getElementById("hero");
  const cv = document.getElementById("system");
  const ctx = cv.getContext("2d");
  const tip = document.getElementById("tip");
  const avatar = new Image();
  avatar.src = "assets/avatar.jpg";
  let w, h, dpr, cx, cy, R, F, copyRight = -1;
  let yaw = 0.4, pitch = 0.36, vyaw = 0, t = 0, last = performance.now();
  let hover = null, linked = null, drag = null, visible = true, filterFn = () => true;
  let screen = [];

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const narrow = w < 860;
    cx = narrow ? w / 2 : w * 0.68;
    cy = narrow ? h * 0.5 : h * 0.5;
    R = narrow ? Math.min(w * 0.44, h * 0.9) : Math.min(w * 0.27, h * 0.8);
    F = R * 3.2;
    const copy = document.querySelector(".hero-copy");
    copyRight = narrow ? -1 : copy.getBoundingClientRect().right - cv.getBoundingClientRect().left;
  }
  resize(); addEventListener("resize", resize);

  const orbitR = (i) => R * (0.3 + (i / (PROJECTS.length - 1)) * 0.7);
  function project(x, z) {
    const xr = x * Math.cos(yaw) - z * Math.sin(yaw);
    const zr = x * Math.sin(yaw) + z * Math.cos(yaw);
    const depth = zr * Math.cos(pitch);
    const p = F / (F - depth);
    return { x: cx + xr * p, y: cy + zr * Math.sin(pitch) * p, depth, p };
  }

  function drawOrbit(i, front) {
    const r = orbitR(i);
    const p = PROJECTS[i];
    const on = filterFn(p);
    ctx.beginPath();
    let pen = false;
    for (let k = 0; k <= 120; k++) {
      const a = (k / 120) * Math.PI * 2;
      const q = project(Math.cos(a) * r, Math.sin(a) * r);
      if ((q.depth >= 0) === front) { pen ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y); pen = true; } else pen = false;
    }
    const hot = hover === p || linked === p;
    ctx.strokeStyle = hot ? "rgba(108,240,255,.6)" : `rgba(160,180,255,${on ? (front ? 0.2 : 0.1) : 0.04})`;
    ctx.lineWidth = hot ? 1.2 : 1;
    ctx.setLineDash(front ? [] : [2, 5]);
    ctx.stroke(); ctx.setLineDash([]);
  }

  function drawSun() {
    const sr = R * 0.15;
    const glow = ctx.createRadialGradient(cx, cy, sr * 0.6, cx, cy, sr * 3.6);
    glow.addColorStop(0, "rgba(255,190,90,.55)"); glow.addColorStop(0.35, "rgba(255,120,60,.16)"); glow.addColorStop(1, "rgba(255,120,60,0)");
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, sr * 3.6, 0, 6.283); ctx.fill();
    // corona
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.05);
    for (let k = 0; k < 48; k++) {
      const a = (k / 48) * Math.PI * 2, len = sr * (1.18 + 0.12 * Math.sin(k * 3.7 + t * 1.5));
      ctx.strokeStyle = `rgba(255,200,120,${0.12 + 0.1 * Math.sin(k + t)})`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(Math.cos(a) * sr * 1.04, Math.sin(a) * sr * 1.04); ctx.lineTo(Math.cos(a) * len, Math.sin(a) * len); ctx.stroke();
    }
    ctx.restore();
    // vòng HUD đo đạc
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t * 0.08);
    ctx.strokeStyle = "rgba(160,180,255,.25)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(0, 0, sr * 1.5, 0, Math.PI * 1.6); ctx.stroke();
    for (let k = 0; k < 60; k++) {
      const a = (k / 60) * Math.PI * 2, l = k % 5 ? 3 : 7;
      ctx.beginPath(); ctx.moveTo(Math.cos(a) * sr * 1.62, Math.sin(a) * sr * 1.62); ctx.lineTo(Math.cos(a) * (sr * 1.62 + l), Math.sin(a) * (sr * 1.62 + l)); ctx.stroke();
    }
    ctx.restore();
    // avatar
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, sr, 0, 6.283); ctx.closePath(); ctx.clip();
    if (avatar.complete && avatar.naturalWidth) {
      const s = Math.max((sr * 2) / avatar.naturalWidth, (sr * 2) / avatar.naturalHeight);
      ctx.drawImage(avatar, cx - (avatar.naturalWidth * s) / 2, cy - (avatar.naturalHeight * s) / 2, avatar.naturalWidth * s, avatar.naturalHeight * s);
    }
    const shade = ctx.createRadialGradient(cx - sr * 0.3, cy - sr * 0.3, sr * 0.2, cx, cy, sr);
    shade.addColorStop(0, "rgba(255,200,120,0)"); shade.addColorStop(1, "rgba(255,140,40,.45)");
    ctx.fillStyle = shade; ctx.fillRect(cx - sr, cy - sr, sr * 2, sr * 2);
    ctx.restore();
    ctx.strokeStyle = "rgba(255,200,130,.9)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, sr, 0, 6.283); ctx.stroke();
    ctx.font = "500 10px 'JetBrains Mono', monospace"; ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,200,130,.85)";
    ctx.fillText("☉ KHÚC VIỆT ANH · LỚP G2V", cx, cy + sr * 1.62 + 24);
    ctx.textAlign = "left";
  }

  function drawPlanet(s) {
    const { p, x, y, r } = s;
    const on = filterFn(p);
    const hot = hover === p || linked === p;
    const behind = x < copyRight + 30;
    ctx.globalAlpha = on ? (behind ? 0.35 : 1) : 0.18;
    // hướng sáng: về phía mặt trời
    const dx = cx - x, dy = cy - y, d = Math.hypot(dx, dy) || 1;
    const lx = x + (dx / d) * r * 0.45, ly = y + (dy / d) * r * 0.45;
    if (p.planet.ring) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(-0.35);
      ctx.strokeStyle = p.planet.c1 + "88"; ctx.lineWidth = Math.max(1, r * 0.12);
      ctx.beginPath(); ctx.ellipse(0, 0, r * 2, r * 0.6, 0, Math.PI, Math.PI * 2); ctx.stroke(); ctx.restore();
    }
    const halo = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * (hot ? 3.4 : 2.4));
    halo.addColorStop(0, p.planet.c1 + (hot ? "55" : "30")); halo.addColorStop(1, p.planet.c1 + "00");
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(x, y, r * (hot ? 3.4 : 2.4), 0, 6.283); ctx.fill();
    const g = ctx.createRadialGradient(lx, ly, r * 0.05, x, y, r);
    g.addColorStop(0, "#ffffff"); g.addColorStop(0.18, p.planet.c1); g.addColorStop(0.7, p.planet.c2); g.addColorStop(1, "#05060f");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
    if (p.planet.ring) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(-0.35);
      ctx.strokeStyle = p.planet.c1 + "cc"; ctx.lineWidth = Math.max(1, r * 0.12);
      ctx.beginPath(); ctx.ellipse(0, 0, r * 2, r * 0.6, 0, 0, Math.PI); ctx.stroke(); ctx.restore();
    }
    if (p.planet.moon) {
      const ma = t * 1.6 + p.phase;
      const mx = x + Math.cos(ma) * r * 2.1, my = y + Math.sin(ma) * r * 0.8;
      ctx.fillStyle = "#cfd6ff"; ctx.beginPath(); ctx.arc(mx, my, Math.max(1.4, r * 0.18), 0, 6.283); ctx.fill();
    }
    // nhãn
    const narrow = w < 860;
    if ((!narrow && !behind) || hot) {
      ctx.font = `${hot ? 500 : 400} 11px 'JetBrains Mono', monospace`;
      const label = `${p.no} ${p.title.toUpperCase()}`, tw = ctx.measureText(label).width;
      const side = x + r + 32 + tw > w - 16 ? -1 : 1;
      const lx2 = x + side * (r + 10), ly2 = y - r - 10;
      ctx.strokeStyle = hot ? "rgba(108,240,255,.8)" : "rgba(160,180,255,.3)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x + side * r * 0.7, y - r * 0.7); ctx.lineTo(lx2, ly2); ctx.lineTo(lx2 + side * 14, ly2); ctx.stroke();
      ctx.fillStyle = hot ? "#6cf0ff" : "rgba(180,188,220,.75)";
      ctx.fillText(label, side > 0 ? lx2 + 18 : lx2 - 18 - tw, ly2 + 4);
    }
    if (hot) { // khung ngắm
      const b = r + 9, l = 6;
      ctx.strokeStyle = "#6cf0ff"; ctx.lineWidth = 1.2;
      for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        ctx.beginPath(); ctx.moveTo(x + sx * b, y + sy * (b - l)); ctx.lineTo(x + sx * b, y + sy * b); ctx.lineTo(x + sx * (b - l), y + sy * b); ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (visible) {
      const slow = hover ? 0.15 : 1;
      if (!reduced) t += dt * slow;
      if (!drag) { yaw += vyaw; vyaw *= 0.94; if (!reduced) yaw += dt * 0.03 * slow; }
      ctx.clearRect(0, 0, w, h);
      screen = PROJECTS.map((p) => {
        const a = p.phase + t * p.speed, r = orbitR(p.orbit);
        const q = project(Math.cos(a) * r, Math.sin(a) * r);
        return { p, x: q.x, y: q.y, depth: q.depth, r: p.planet.size * (R / 420) * q.p };
      }).sort((a, b) => a.depth - b.depth);
      PROJECTS.forEach((_, i) => drawOrbit(i, false));
      screen.filter((s) => s.depth < 0).forEach(drawPlanet);
      drawSun();
      PROJECTS.forEach((_, i) => drawOrbit(i, true));
      screen.filter((s) => s.depth >= 0).forEach(drawPlanet);
      if (hover) placeTip();
    }
    requestAnimationFrame(frame);
  }

  function hit(e) {
    const r = cv.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    let best = null;
    for (let i = screen.length - 1; i >= 0; i--) {
      const s = screen[i];
      if (filterFn(s.p) && s.x > copyRight && Math.hypot(s.x - x, s.y - y) < Math.max(14, s.r + 8)) { best = s.p; break; }
    }
    return best;
  }
  function placeTip() {
    const s = screen.find((q) => q.p === hover);
    if (!s) return;
    tip.style.left = s.x + s.r + "px";
    tip.style.top = s.y + cv.offsetTop + "px";
  }
  function showTip(p) {
    if (!p) { tip.classList.remove("on"); return; }
    tip.innerHTML = `THIÊN THỂ №${p.no} · ${TYPE[p.type].toUpperCase()}<b>${esc(p.title)}</b>${p.live ? "<em>● sẵn sàng phóng</em>" : "<em>○ quan sát</em>"} · chạm để mở hồ sơ`;
    tip.classList.add("on");
  }

  cv.addEventListener("pointerdown", (e) => {
    drag = { x: e.clientX, y: e.clientY, moved: 0, id: e.pointerId };
    if (e.pointerType !== "touch") cv.setPointerCapture(e.pointerId);
  });
  cv.addEventListener("pointermove", (e) => {
    if (drag && e.pointerType !== "touch") {
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      drag.moved += Math.abs(dx) + Math.abs(dy);
      if (drag.moved > 4) {
        cv.classList.add("dragging");
        vyaw = dx * 0.004; yaw += vyaw;
        pitch = Math.min(1.15, Math.max(0.1, pitch + dy * 0.003));
      }
      drag.x = e.clientX; drag.y = e.clientY;
      return;
    }
    const p = hit(e);
    if (p !== hover) { hover = p; showTip(p); cv.classList.toggle("hovering", !!p); }
  });
  const end = (e) => {
    if (drag && drag.moved <= 6) { const p = hit(e); if (p) openDossier(p); }
    drag = null; cv.classList.remove("dragging");
  };
  cv.addEventListener("pointerup", end);
  cv.addEventListener("pointercancel", () => { drag = null; cv.classList.remove("dragging"); });
  cv.addEventListener("pointerleave", () => { if (!drag) { hover = null; showTip(null); cv.classList.remove("hovering"); } });

  new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(hero);
  requestAnimationFrame(frame);

  return {
    link: (p) => (linked = p),
    filter: (fn) => (filterFn = fn),
  };
})();

/* ===================== DANH MỤC ===================== */
const rowsEl = document.getElementById("rows");
const emptyEl = document.getElementById("empty");
let filter = "all", query = "";
const matches = (p) => {
  const q = query.trim().toLowerCase();
  return (filter === "all" || p.type === filter) && (!q || [p.title, p.desc, ...p.tags].join(" ").toLowerCase().includes(q));
};
const orbStyle = (p) => `--c1:${p.planet.c1};--c2:${p.planet.c2}`;
const rowObserver = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("in"); rowObserver.unobserve(e.target); }
}), { rootMargin: "0px 0px -40px 0px" });

function renderRows() {
  const list = PROJECTS.filter(matches);
  rowsEl.innerHTML = `<div class="row-head" aria-hidden="true"><span>№</span><span></span><span>Thiên thể</span><span class="cls">Phân loại</span><span class="mass">Khối lượng</span><span>Trạng thái</span><span></span></div>` +
    list.map((p, i) => `<div role="listitem"><button class="row" type="button" data-id="${p.id}" style="--i:${i}" aria-label="Mở hồ sơ ${esc(p.title)}">
      <span class="no">№${p.no}</span>
      <span class="orb${p.planet.ring ? " ring" : ""}" style="${orbStyle(p)}" aria-hidden="true"></span>
      <span class="name">${esc(p.title)}<small>${esc(p.desc)}</small></span>
      <span class="cls">${TYPE[p.type]} · ${p.year}</span>
      <span class="mass">${kb(p)}</span>
      <span class="status${p.live ? " live" : ""}"><i></i>${p.live ? "Sẵn sàng phóng" : p.url && p.url.startsWith("http") ? "Đang hoạt động" : "Mã nguồn mở"}</span>
      <span class="go" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
    </button></div>`).join("");
  emptyEl.hidden = list.length > 0;
  rowsEl.querySelectorAll(".row").forEach((r) => (reduced ? r.classList.add("in") : rowObserver.observe(r)));
  System.filter(matches);
}
rowsEl.addEventListener("click", (e) => { const b = e.target.closest(".row"); if (b) openDossier(PROJECTS.find((p) => p.id === b.dataset.id)); });
rowsEl.addEventListener("pointerover", (e) => { const b = e.target.closest(".row"); System.link(b ? PROJECTS.find((p) => p.id === b.dataset.id) : null); });
rowsEl.addEventListener("pointerleave", () => System.link(null));
document.querySelectorAll(".filters button").forEach((b) => b.addEventListener("click", () => {
  document.querySelectorAll(".filters button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  filter = b.dataset.filter; renderRows();
}));
document.getElementById("search").addEventListener("input", (e) => { query = e.target.value; renderRows(); });
document.getElementById("mCount").textContent = pad(PROJECTS.length);
document.getElementById("mLive").textContent = pad(PROJECTS.filter((p) => p.live).length);

/* ===================== HỒ SƠ & PHÓNG ===================== */
const dossier = document.getElementById("dossier");
const player = document.getElementById("player");
const pFrame = document.getElementById("pFrame");
let current = null;

const EXANH_ART = `<svg viewBox="0 0 400 250" width="100%" height="100%" aria-hidden="true">
  <defs><radialGradient id="ea" cx="38%" cy="32%"><stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="#7dffb0"/><stop offset=".75" stop-color="#0f6b4a"/><stop offset="1" stop-color="#05060f"/></radialGradient>
  <radialGradient id="eb"><stop offset="0" stop-color="#7dffb055"/><stop offset="1" stop-color="#7dffb000"/></radialGradient></defs>
  <rect width="400" height="250" fill="#070818"/>
  <circle cx="200" cy="125" r="110" fill="url(#eb)"/>
  <ellipse cx="200" cy="125" rx="150" ry="40" fill="none" stroke="#a0b4ff33" stroke-dasharray="3 6"/>
  <circle cx="200" cy="125" r="62" fill="url(#ea)"/>
  <path d="M176 150c0-30 18-52 50-56 2 34-18 54-50 56Zm0 0c14-16 28-32 42-50" fill="none" stroke="#05060f" stroke-width="2.5" stroke-linecap="round" opacity=".55"/>
  <circle cx="338" cy="112" r="4" fill="#cfd6ff"/>
  <text x="20" y="232" fill="#7d86a8" font-family="JetBrains Mono" font-size="11" letter-spacing="2">EXANH.ONLINE · THIÊN THỂ №01</text>
</svg>`;

function mountScaled(box, { html, src, vw }) {
  const f = document.createElement("iframe");
  f.setAttribute("tabindex", "-1"); f.setAttribute("aria-hidden", "true"); f.title = "";
  if (html) { f.setAttribute("sandbox", "allow-scripts"); f.srcdoc = html; } else f.src = src;
  box.appendChild(f);
  const fit = () => { const s = box.clientWidth / vw; f.style.width = vw + "px"; f.style.height = box.clientHeight / s + "px"; f.style.transform = `scale(${s})`; };
  fit(); new ResizeObserver(fit).observe(box);
}

function openDossier(p) {
  current = p;
  document.getElementById("dCode").textContent = `HỒ SƠ THIÊN THỂ · №${p.no}`;
  const orb = document.getElementById("dOrb");
  orb.style.cssText = orbStyle(p); orb.className = "orb big" + (p.planet.ring ? " ring" : "");
  document.getElementById("dType").textContent = `${TYPE[p.type]} · phát hiện ${p.year}`;
  document.getElementById("dTitle").textContent = p.title;
  document.getElementById("dDesc").textContent = p.desc;
  document.getElementById("dTags").innerHTML = p.tags.map((t) => `<li>${esc(t)}</li>`).join("");
  const au = (0.6 + p.orbit * 0.72).toFixed(2), period = ((Math.PI * 2) / p.speed).toFixed(1);
  document.getElementById("dData").innerHTML = [
    ["Phân loại", TYPE[p.type]], ["Khối lượng", kb(p)],
    ["Bán kính quỹ đạo", `${au} AU`], ["Chu kỳ", `${period} giây`],
    ["Trạng thái", p.live ? "Sẵn sàng phóng" : "Đang hoạt động"], ["Giấy phép", "Miễn phí sử dụng"],
  ].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  const prev = document.getElementById("dPreview");
  prev.innerHTML = "";
  if (p.art) prev.innerHTML = `<div class="art">${EXANH_ART}</div>`;
  else if (p.live) mountScaled(prev, { html: p.live, vw: 760 });
  else if (p.src) mountScaled(prev, { src: p.src, vw: 1280 });
  prev.insertAdjacentHTML("beforeend", '<span class="scan"></span>');
  const acts = [];
  if (p.live) acts.push(`<button class="btn primary" data-act="launch">Phóng ngay <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M9 5h10v10"/></svg></button>`);
  if (p.url) acts.push(`<a class="btn ${p.live ? "ghost" : "primary"}" href="${p.url}"${p.url.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>Mở web ↗</a>`);
  if (p.live) acts.push(`<button class="btn ghost" data-act="download"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 19h14"/></svg>Tải .html</button>`);
  if (p.download) acts.push(`<a class="btn ghost" href="${p.download}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 19h14"/></svg>Tải .zip</a>`);
  document.getElementById("dActions").innerHTML = acts.join("");
  if (!dossier.open) dossier.showModal();
}

function download(p) {
  const url = URL.createObjectURL(new Blob([p.live], { type: "text/html;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: `${p.id}.html` });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function launch(p) {
  dossier.close();
  document.getElementById("pTitle").textContent = `${p.title} — module №${p.no}`;
  pFrame.srcdoc = p.live;
  player.showModal();
  const cd = document.getElementById("countdown");
  if (reduced) return;
  let n = 3;
  cd.classList.add("on");
  const b = cd.querySelector("b");
  const step = () => {
    if (n === 0) { cd.classList.remove("on"); return; }
    b.textContent = n; b.style.animation = "none"; void b.offsetWidth; b.style.animation = "";
    n--; setTimeout(step, 420);
  };
  step();
}

document.getElementById("dActions").addEventListener("click", (e) => {
  const a = e.target.closest("[data-act]");
  if (!a || !current) return;
  a.dataset.act === "launch" ? launch(current) : download(current);
});
document.getElementById("pDownload").addEventListener("click", () => current && download(current));
document.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", () => b.closest("dialog").close()));
[dossier, player].forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) d.close(); }));
player.addEventListener("close", () => { pFrame.srcdoc = ""; document.getElementById("countdown").classList.remove("on"); });
dossier.addEventListener("close", () => { document.getElementById("dPreview").innerHTML = ""; });

/* ===================== HẰNG SỐ: dao động ký ===================== */
document.querySelectorAll(".osc").forEach((cv, i) => {
  const ctx = cv.getContext("2d");
  let on = false;
  new IntersectionObserver(([e]) => (on = e.isIntersecting)).observe(cv);
  const colors = ["#6cf0ff", "#c86bff", "#ffb547", "#8f9bff"];
  const draw = (t) => {
    if (on) {
      const dpr = Math.min(devicePixelRatio || 1, 2), w = cv.clientWidth, h = cv.clientHeight;
      if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = colors[i]; ctx.lineWidth = 1.2; ctx.globalAlpha = 0.85;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const k = x / w, tt = reduced ? 0 : t / 1000;
        const y = h / 2 + Math.sin(k * (8 + i * 3) + tt * (1.5 + i * 0.4)) * h * 0.22 * Math.sin(k * Math.PI) + Math.sin(k * 40 + tt * 6) * 1.5;
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke(); ctx.globalAlpha = 1;
    }
    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
});
const countIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  const el = e.target, to = +el.dataset.count;
  let n = 0;
  const tick = () => { el.textContent = pad(n); if (n++ < to) setTimeout(tick, reduced ? 0 : 110); };
  tick(); countIO.unobserve(el);
}), { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

/* ===================== HUD: đồng hồ, toạ độ, reveal ===================== */
const clock = document.getElementById("clock");
setInterval(() => { clock.textContent = "UTC " + new Date().toISOString().slice(11, 19); }, 1000);
const coords = document.getElementById("coords");
addEventListener("pointermove", (e) => {
  const ra = (e.clientX / innerWidth) * 24, dec = 90 - (e.clientY / innerHeight) * 180;
  const h = Math.floor(ra), m = Math.floor((ra - h) * 60), s = Math.floor(((ra - h) * 60 - m) * 60);
  const d = Math.floor(Math.abs(dec)), dm = Math.floor((Math.abs(dec) - d) * 60);
  coords.textContent = `RA ${pad(h)}h ${pad(m)}m ${pad(s)}s · DEC ${dec < 0 ? "−" : "+"}${pad(d)}° ${pad(dm)}′`;
}, { passive: true });
const revealIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => revealIO.observe(el));

renderRows();
