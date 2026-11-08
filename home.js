/* ==========================================================
   Portfolio — Khúc Việt Anh
   Thêm dự án: thêm 1 object vào PROJECTS.
   - live: tên app trong apps.js → nút "Dùng ngay" + "Tải về"
   - url: link website · src: trang để xem trước · download: link tải (zip…)
   ========================================================== */
const PROJECTS = [
  { id: "exanh", title: "eXanh.online", type: "web", label: "Website", year: "05/2026",
    desc: "Website cá nhân đầu tay — xây dựng và hoàn thiện với HTML, CSS, JavaScript, có AI hỗ trợ viết code, tìm lỗi, chỉnh giao diện và kiểm thử.",
    tags: ["HTML", "CSS", "JavaScript", "AI"], url: "https://exanh.online", art: "exanh" },
  { id: "contact-cv", title: "Portfolio + CV trực tuyến", type: "template", label: "Template", year: "2026",
    desc: "Chính trang web bạn đang xem: portfolio và CV dựng hoàn toàn bằng HTML/CSS, tự động deploy lên GitHub Pages. Tải mã nguồn về để làm của riêng bạn.",
    tags: ["HTML", "CSS", "GitHub Pages"], src: "cv.html", url: "cv.html",
    repo: "https://github.com/BanhKhuc04/contact.vanhkhuc",
    download: "https://github.com/BanhKhuc04/contact.vanhkhuc/archive/refs/heads/main.zip" },
  { id: "pomodoro", title: "Pomodoro Timer", type: "tool", label: "Công cụ", year: "2026", live: "pomodoro",
    desc: "Đồng hồ tập trung 25 / 5 / 15 phút với vòng tiến trình trực quan.",
    tags: ["JavaScript", "SVG"] },
  { id: "palette", title: "Color Palette", type: "tool", label: "Công cụ", year: "2026", live: "palette",
    desc: "Tạo bảng 5 màu hài hoà, nhấn Space để đổi, bấm để sao chép mã HEX.",
    tags: ["JavaScript", "Thiết kế"] },
  { id: "password", title: "Password Generator", type: "tool", label: "Công cụ", year: "2026", live: "password",
    desc: "Sinh mật khẩu mạnh bằng Web Crypto, có thanh đo độ mạnh.",
    tags: ["Web Crypto", "Bảo mật"] },
  { id: "sketch", title: "Sketch Pad", type: "tool", label: "Công cụ", year: "2026", live: "sketch",
    desc: "Bảng vẽ nhanh với bút màu, highlight, tẩy, hoàn tác và lưu ảnh PNG. Vẽ bằng chuột hoặc cảm ứng.",
    tags: ["Canvas", "Pointer Events"] },
  { id: "biolink", title: "Link in Bio", type: "template", label: "Template", year: "2026", live: "biolink",
    desc: "Template trang giới thiệu cá nhân gói gọn trong một file HTML — tải về, đổi tên và link là dùng được ngay.",
    tags: ["HTML", "CSS", "1 file"] },
];
const WIDE = new Set(["exanh", "contact-cv", "sketch", "biolink"]);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const html = (p) => APPS[p.live];

/* ---------- Minh hoạ cho dự án không xem trước được ---------- */
const ART = {
  exanh: `<svg viewBox="0 0 640 372" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="exg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e7f8ee"/><stop offset="1" stop-color="#d3f0e0"/></linearGradient></defs>
    <rect width="640" height="372" fill="url(#exg)"/>
    <rect x="40" y="28" width="560" height="34" rx="17" fill="#fff"/>
    <circle cx="66" cy="45" r="9" fill="#16a34a"/><rect x="84" y="39" width="70" height="12" rx="6" fill="#0d1a35" opacity=".85"/>
    <rect x="420" y="39" width="44" height="12" rx="6" fill="#0d1a35" opacity=".25"/><rect x="474" y="39" width="44" height="12" rx="6" fill="#0d1a35" opacity=".25"/>
    <rect x="530" y="35" width="56" height="20" rx="10" fill="#16a34a"/>
    <text x="40" y="132" font-family="Be Vietnam Pro, sans-serif" font-size="40" font-weight="800" fill="#0d1a35" letter-spacing="-1.5">Sống xanh,</text>
    <text x="40" y="178" font-family="Be Vietnam Pro, sans-serif" font-size="40" font-weight="800" fill="#16a34a" letter-spacing="-1.5">sống khoẻ.</text>
    <rect x="40" y="200" width="250" height="10" rx="5" fill="#0d1a35" opacity=".2"/><rect x="40" y="218" width="200" height="10" rx="5" fill="#0d1a35" opacity=".2"/>
    <rect x="40" y="248" width="120" height="38" rx="19" fill="#0d1a35"/><text x="100" y="272" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="14" font-weight="600" fill="#fff">Khám phá</text>
    <circle cx="470" cy="210" r="112" fill="#bfe9cf"/>
    <path d="M410 290c0-92 52-150 140-160 6 96-52 156-140 160Z" fill="#22c55e"/>
    <path d="M410 290c38-44 78-90 120-140M462 232l-12-30M492 198l-14-26M470 224l34-2M500 190l30 2" stroke="#0d6b35" stroke-width="5" stroke-linecap="round" fill="none"/>
  </svg>`,
};

/* ---------- Iframe xem trước co theo khung ---------- */
const fitObserver = new ResizeObserver((entries) => entries.forEach(({ target }) => fit(target)));
function fit(box) {
  const f = box.querySelector("iframe");
  if (!f) return;
  const vw = +box.dataset.vw, s = box.clientWidth / vw;
  f.style.width = vw + "px";
  f.style.height = box.clientHeight / s + "px";
  f.style.transform = `scale(${s})`;
}
function mount(box, p) {
  const f = document.createElement("iframe");
  f.tabIndex = -1; f.setAttribute("aria-hidden", "true"); f.title = "";
  if (p.live) { f.setAttribute("sandbox", "allow-scripts"); f.srcdoc = html(p); box.dataset.vw = 820; }
  else { f.src = p.src; box.dataset.vw = 1280; }
  box.appendChild(f); fit(box); fitObserver.observe(box);
}

/* ---------- Render dự án ---------- */
const grid = document.getElementById("grid");
const DL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 19h14"/></svg>';
grid.innerHTML = PROJECTS.map((p) => {
  const host = p.url && p.url.startsWith("http") ? p.url.replace(/^https?:\/\//, "") : (p.live ? `${p.id}.html` : `vanhkhuc.id.vn/${p.url}`);
  const acts = [];
  if (p.live) acts.push(`<button class="btn btn-primary" type="button" data-play="${p.id}">Dùng ngay <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>`);
  if (p.url) acts.push(`<a class="btn ${p.live ? "btn-ghost" : "btn-primary"}" href="${p.url}"${p.url.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>${p.url.startsWith("http") ? "Truy cập website ↗" : "Xem trực tiếp"}</a>`);
  if (p.repo) acts.push(`<a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noreferrer">Mã nguồn</a>`);
  if (p.live) acts.push(`<button class="link-btn" type="button" data-dl="${p.id}">${DL}Tải về</button>`);
  if (p.download) acts.push(`<a class="link-btn" href="${p.download}">${DL}Tải .zip</a>`);
  return `<article class="card${WIDE.has(p.id) ? " wide" : ""}" data-id="${p.id}" data-type="${p.type}">
    <div class="preview">
      <div class="bar"><i></i><i></i><i></i><span>${esc(host)}</span></div>
      ${p.art ? `<div class="art">${ART[p.art]}</div>` : `<div class="screen"></div>`}
      ${p.live ? '<span class="badge">Dùng ngay trên web</span>' : ""}
    </div>
    <div class="card-body">
      <div class="card-meta"><span>${p.label}</span><span>${p.year}</span></div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <ul class="chips">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="actions">${acts.join("")}</div>
    </div>
  </article>`;
}).join("");

// Chỉ tải iframe xem trước khi thẻ sắp vào màn hình
const previewIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  const card = e.target, box = card.querySelector(".screen");
  if (box && !box.firstChild) mount(box, PROJECTS.find((p) => p.id === card.dataset.id));
  previewIO.unobserve(card);
}), { rootMargin: "300px 0px" });
grid.querySelectorAll(".card").forEach((c) => previewIO.observe(c));

// Bộ lọc
document.querySelectorAll(".tabs button").forEach((b) => b.addEventListener("click", () => {
  document.querySelectorAll(".tabs button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  const f = b.dataset.filter;
  let i = 0;
  grid.querySelectorAll(".card").forEach((c) => {
    const show = f === "all" || c.dataset.type === f;
    c.classList.toggle("hidden", !show);
    c.classList.toggle("wide", f === "all" ? WIDE.has(c.dataset.id) : true);
    c.classList.remove("enter");
    if (show) { void c.offsetWidth; c.style.setProperty("--i", i++); c.classList.add("enter"); }
  });
  grid.querySelectorAll(".screen").forEach(fit);
}));

/* ---------- Modal & tải về ---------- */
const modal = document.getElementById("modal");
const frame = document.getElementById("modalFrame");
let current = null;
function download(p) {
  const url = URL.createObjectURL(new Blob([html(p)], { type: "text/html;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: `${p.id}.html` });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
grid.addEventListener("click", (e) => {
  const play = e.target.closest("[data-play]"), dl = e.target.closest("[data-dl]");
  if (play) {
    current = PROJECTS.find((p) => p.id === play.dataset.play);
    document.getElementById("modalTitle").textContent = current.title;
    frame.srcdoc = html(current);
    modal.showModal();
  } else if (dl) download(PROJECTS.find((p) => p.id === dl.dataset.dl));
});
document.getElementById("modalDl").addEventListener("click", () => current && download(current));
document.getElementById("modalClose").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
modal.addEventListener("close", () => { frame.srcdoc = ""; });

/* ---------- Chữ chạy ở hero ---------- */
const typed = document.getElementById("typed");
const ROLES = ["Full-stack Developer", "Sinh viên Kỹ thuật Phần mềm", "Người thích xây sản phẩm", "Front-end & UI lover"];
if (!reduced) {
  let r = 0, n = ROLES[0].length, del = true;
  const step = () => {
    const word = ROLES[r];
    if (del) { n--; if (n === 0) { del = false; r = (r + 1) % ROLES.length; } }
    else { n++; if (n === ROLES[r].length) { del = true; typed.textContent = ROLES[r]; return setTimeout(step, 2200); } }
    typed.textContent = (del ? word : ROLES[r]).slice(0, n);
    setTimeout(step, del ? 35 : 70);
  };
  setTimeout(step, 2600);
}

/* ---------- Đếm số ---------- */
const countIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  const el = e.target, to = +el.dataset.count;
  if (reduced) { el.textContent = to; return; }
  let n = 0;
  const tick = () => { el.textContent = n; if (n++ < to) setTimeout(tick, 600 / to); };
  tick(); countIO.unobserve(el);
}), { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

/* ---------- Hiện dần khi cuộn ---------- */
const revealIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("show"); revealIO.unobserve(e.target); }
}), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; revealIO.observe(el); });

/* ---------- Nav: nền khi cuộn, mục đang xem, menu mobile ---------- */
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 10);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
const navLinks = [...document.querySelectorAll(".links a")];
const sectionIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => sectionIO.observe(s));
const menuBtn = document.getElementById("menuBtn"), links = document.getElementById("links");
menuBtn.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") !== "true";
  menuBtn.setAttribute("aria-expanded", String(open)); links.classList.toggle("open", open);
});
links.addEventListener("click", (e) => { if (e.target.closest("a")) { menuBtn.setAttribute("aria-expanded", "false"); links.classList.remove("open"); } });

/* ---------- Ảnh chân dung nghiêng theo chuột ---------- */
const portrait = document.getElementById("portrait");
if (!reduced && matchMedia("(pointer: fine)").matches) {
  portrait.addEventListener("mousemove", (e) => {
    const r = portrait.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    portrait.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  portrait.addEventListener("mouseleave", () => { portrait.style.transform = ""; });
}
