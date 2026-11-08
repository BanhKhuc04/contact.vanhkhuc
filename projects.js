/* ==========================================================
   Vũ trụ của Vanh — hành trình 3D qua các dự án
   Thêm dự án: thêm 1 object vào PROJECTS (mini-app nằm trong apps.js)
   ========================================================== */
import * as THREE from "three";

const PROJECTS = [
  { id: "exanh", title: "eXanh.online", kind: "Website", tagline: "Thế giới xanh đầu tiên", year: "2026",
    url: "https://exanh.online", size: "Web",
    desc: "Website cá nhân đầu tay — xây bằng HTML, CSS và JavaScript, với AI đồng hành viết code, tìm lỗi và kiểm thử từng chi tiết.",
    planet: { type: "jungle", r: 2.2, atmo: "#7fe0c0", clouds: true } },
  { id: "contact-cv", title: "Contact + CV", kind: "Template", tagline: "Gã khổng lồ băng giá", year: "2026",
    url: "index.html", download: "https://github.com/BanhKhuc04/contact.vanhkhuc/archive/refs/heads/main.zip", size: "Repo .zip",
    desc: "Bộ trang liên hệ và CV phong cách Apple Glass. Tải mã nguồn về, đổi thông tin và deploy lên GitHub Pages chỉ với một lần push.",
    planet: { type: "icegiant", r: 2.8, atmo: "#9cc8ff", ring: { inner: 1.45, outer: 2.2, tint: [190, 210, 235], tilt: 0.42 } } },
  { id: "pomodoro", title: "Pomodoro", kind: "Công cụ", tagline: "Hành tinh dung nham — nơi thời gian cháy", year: "2026",
    live: () => APPS.pomodoro,
    desc: "Đồng hồ tập trung 25 / 5 / 15 phút với vệ tinh chạy quanh quỹ đạo đếm ngược. Giữ nhịp làm việc sâu mà không cần cài gì.",
    planet: { type: "lava", r: 1.9, atmo: "#ff8a4a" } },
  { id: "palette", title: "Bảng màu", kind: "Công cụ", tagline: "Khổng lồ khí nhiều sắc màu", year: "2026",
    live: () => APPS.palette,
    desc: "Sinh bảng 5 màu hài hoà kèm tinh vân xem trước. Nhấn Space để trộn lại, bấm vào một màu để sao chép mã HEX.",
    planet: { type: "pastel", r: 2.5, atmo: "#f2b8c6" } },
  { id: "sketch", title: "Bảng chòm sao", kind: "Thử nghiệm", tagline: "Mặt trăng băng — một bầu trời để vẽ", year: "2026",
    live: () => APPS.sketch,
    desc: "Thả từng ngôi sao lên nền trời, chúng tự nối thành chòm. Đặt tên cho chòm sao của riêng bạn rồi lưu lại thành ảnh PNG.",
    planet: { type: "ice", r: 2.0, atmo: "#cfe6ff" } },
  { id: "password", title: "Tạo mật khẩu", kind: "Công cụ", tagline: "Thế giới lượng tử", year: "2026",
    live: () => APPS.password,
    desc: "Sinh mật khẩu mạnh bằng Web Crypto ngay trong trình duyệt, có đo entropy. Không có gì được gửi đi đâu cả.",
    planet: { type: "quantum", r: 1.8, atmo: "#7fe3ea" } },
  { id: "biolink", title: "Trang link cá nhân", kind: "Template", tagline: "Sa mạc vàng có vành đai", year: "2026",
    live: () => APPS.biolink,
    desc: "Template link-in-bio gói gọn trong một file. Tải về, đổi tên và các đường link là có ngay trang giới thiệu của riêng bạn.",
    planet: { type: "desert", r: 2.4, atmo: "#ffcf8a", ring: { inner: 1.4, outer: 2.6, tint: [225, 190, 140], tilt: -0.32 } } },
];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const pad = (n) => String(n).padStart(2, "0");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
PROJECTS.forEach((p, i) => {
  p.no = pad(i + 1);
  if (p.live) p.size = (new Blob([p.live()]).size / 1024).toFixed(1) + " KB";
});

/* ===================== HTML các cảnh ===================== */
const ICON_ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
document.getElementById("scenes").innerHTML = PROJECTS.map((p, i) => {
  const acts = [];
  if (p.live) acts.push(`<button class="btn solid" type="button" data-launch="${p.id}">Trải nghiệm ngay ${ICON_ARROW}</button>`);
  if (p.url) acts.push(`<a class="btn ${p.live ? "ghost" : "solid"}" href="${p.url}"${p.url.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>Mở website ${p.live ? "" : ICON_ARROW}</a>`);
  if (p.live) acts.push(`<button class="btn link" type="button" data-dl="${p.id}">Tải về .html</button>`);
  if (p.download) acts.push(`<a class="btn ghost" href="${p.download}">Tải mã nguồn</a>`);
  return `<section class="scene project" id="p${i + 1}" data-scene="${i + 1}" aria-labelledby="t${i + 1}">
    <div class="content">
      <p class="p-no"><b>${p.no}</b> / ${pad(PROJECTS.length)} · Hành tinh</p>
      <h2 class="p-title" id="t${i + 1}">${esc(p.title)}</h2>
      <p class="p-kind">${esc(p.tagline)}</p>
      <dl class="p-meta"><div><dt>Loại</dt><dd>${p.kind}</dd></div><div><dt>Kích thước</dt><dd>${p.size}</dd></div><div><dt>Năm</dt><dd>${p.year}</dd></div></dl>
      <p class="p-desc">${esc(p.desc)}</p>
      <div class="p-actions">${acts.join("")}</div>
    </div>
  </section>`;
}).join("");
document.getElementById("index").innerHTML = PROJECTS.map((p, i) =>
  `<li><a href="#p${i + 1}"><span class="n">${p.no}</span><span class="t">${esc(p.title)}</span><span class="k">${p.kind}</span></a></li>`).join("");

const scenes = [...document.querySelectorAll(".scene")];
const railNames = ["Khởi hành", ...PROJECTS.map((p) => p.title), "Hạ cánh"];
const rail = document.getElementById("rail");
rail.innerHTML = scenes.map((s, i) => `<a href="#${s.id}"><span>${pad(i)} · ${esc(railNames[i])}</span><i></i></a>`).join("");
const railLinks = [...rail.children];
const sceneIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  scenes.forEach((s) => s.classList.toggle("active", s === e.target));
  const i = scenes.indexOf(e.target);
  railLinks.forEach((a, k) => a.classList.toggle("on", k === i));
}), { threshold: 0.35 });
scenes.forEach((s) => sceneIO.observe(s));

/* ===================== Trải nghiệm & tải về ===================== */
const launch = document.getElementById("launch");
const frame = document.getElementById("launchFrame");
let current = null;
function download(p) {
  const url = URL.createObjectURL(new Blob([p.live()], { type: "text/html;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: `${p.id}.html` });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
document.addEventListener("click", (e) => {
  const l = e.target.closest("[data-launch]"), d = e.target.closest("[data-dl]");
  if (l) {
    current = PROJECTS.find((p) => p.id === l.dataset.launch);
    document.getElementById("launchNo").textContent = current.no;
    document.getElementById("launchTitle").textContent = current.title;
    frame.srcdoc = current.live();
    launch.showModal();
  } else if (d) download(PROJECTS.find((p) => p.id === d.dataset.dl));
});
document.getElementById("launchDl").addEventListener("click", () => current && download(current));
document.getElementById("launchClose").addEventListener("click", () => launch.close());
launch.addEventListener("close", () => { frame.srcdoc = ""; });

/* ===================== Bề mặt procedural (chạy trong Web Worker) ===================== */
function surfaceWorker() {
  const perm = new Uint8Array(512);
  { let s = 1337; const p = [...Array(256).keys()];
    for (let i = 255; i > 0; i--) { s = (s * 16807) % 2147483647; const j = s % (i + 1); [p[i], p[j]] = [p[j], p[i]]; }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255]; }
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + (b - a) * t;
  const grad = (h, x, y, z) => { h &= 15; const u = h < 8 ? x : y, v = h < 4 ? y : h === 12 || h === 14 ? x : z; return ((h & 1) ? -u : u) + ((h & 2) ? -v : v); };
  function perlin(x, y, z) { // Perlin noise cải tiến, trả về ~[0,1]
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
    const u = fade(x), v = fade(y), w = fade(z);
    const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z, B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;
    const n = lerp(lerp(lerp(grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z), u), lerp(grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z), u), v),
      lerp(lerp(grad(perm[AA + 1], x, y, z - 1), grad(perm[BA + 1], x - 1, y, z - 1), u), lerp(grad(perm[AB + 1], x, y - 1, z - 1), grad(perm[BB + 1], x - 1, y - 1, z - 1), u), v), w);
    return n * 0.5 + 0.5;
  }
  function fbm(x, y, z, oct = 6) {
    let s = 0, a = 0.5, f = 1, n = 0;
    for (let i = 0; i < oct; i++) { s += a * perlin(x * f, y * f, z * f); n += a; a *= 0.5; f *= 2.02; }
    return Math.min(1, Math.max(0, (s / n - 0.5) * 1.9 + 0.5));
  }
  const ridge = (x, y, z, oct) => 1 - Math.abs(2 * fbm(x, y, z, oct) - 1);
  const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const mix3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
  const ramp = (st, t) => { t = Math.min(0.9999, Math.max(0, t)) * (st.length - 1); const i = Math.floor(t); return mix3(st[i], st[i + 1], t - i); };

  const S = {
    home(x, y, z, lat) {
      const n = fbm(x * 1.5 + 3, y * 1.5, z * 1.5);
      const ice = smooth(0.8, 0.92, Math.abs(lat) / (Math.PI / 2) + (n - 0.5) * 0.25);
      let c, e = null;
      if (n < 0.53) c = mix3([4, 14, 38], [18, 58, 102], smooth(0.25, 0.53, n));
      else {
        const h = smooth(0.53, 0.85, n);
        c = ramp([[46, 70, 34], [82, 92, 48], [124, 104, 74], [168, 156, 140]], h + (fbm(x * 9, y * 9, z * 9, 3) - 0.5) * 0.25);
        const cluster = smooth(0.55, 0.75, fbm(x * 6 + 7, y * 6, z * 6, 3));
        const spark = smooth(0.62, 0.8, perlin(x * 140, y * 140, z * 140));
        const lit = cluster * spark * (1 - h) * 0.85;
        if (lit > 0.01) e = [255 * lit, 172 * lit, 96 * lit];
      }
      return { c: mix3(c, [232, 236, 242], ice), e };
    },
    jungle(x, y, z, lat) {
      const n = fbm(x * 1.9 + 9, y * 1.9, z * 1.9);
      const ice = smooth(0.86, 0.96, Math.abs(lat) / (Math.PI / 2));
      const c = n < 0.5 ? mix3([3, 34, 46], [10, 86, 92], smooth(0.28, 0.5, n))
        : ramp([[22, 78, 40], [46, 112, 50], [92, 128, 66], [150, 146, 108]], smooth(0.5, 0.82, n) + (fbm(x * 10, y * 10, z * 10, 3) - 0.5) * 0.2);
      return { c: mix3(c, [228, 238, 236], ice) };
    },
    icegiant(x, y, z, lat) {
      const warp = fbm(x * 2, y * 2, z * 2, 5);
      const band = (Math.sin(lat * 10 + warp * 4.5) + 1) / 2;
      const fine = fbm(x * 4, y * 26, z * 4, 4);
      const c = ramp([[26, 54, 118], [70, 118, 186], [150, 186, 224], [222, 232, 242]], band * 0.75 + fine * 0.25);
      return { c };
    },
    lava(x, y, z) {
      const n = fbm(x * 2.2, y * 2.2, z * 2.2);
      const r = ridge(x * 2.8 + 5, y * 2.8, z * 2.8, 5);
      const crack = smooth(0.88, 0.975, r);
      const c = mix3([22, 17, 15], [70, 54, 44], n);
      return { c: mix3(c, [140, 56, 20], crack), e: [255 * crack, 98 * crack, 26 * crack] };
    },
    pastel(x, y, z, lat) {
      const warp = fbm(x * 1.7, y * 1.7, z * 1.7, 5);
      const band = (Math.sin(lat * 8 + warp * 4) + 1) / 2;
      return { c: ramp([[128, 94, 136], [204, 140, 152], [234, 190, 166], [246, 224, 204]], band * 0.8 + fbm(x * 4, y * 22, z * 4, 4) * 0.2) };
    },
    ice(x, y, z) {
      const n = fbm(x * 2.6, y * 2.6, z * 2.6);
      const line = smooth(0.9, 0.985, ridge(x * 4.5 + 2, y * 4.5, z * 4.5, 5));
      const c = mix3([168, 188, 208], [236, 240, 244], n);
      return { c: mix3(c, [146, 98, 76], line * 0.7) };
    },
    quantum(x, y, z, lat) {
      const n = fbm(x * 2.6, y * 2.6, z * 2.6);
      const lon = Math.atan2(z, x);
      const gx = Math.abs(((lon / Math.PI) * 18 % 1 + 1) % 1 - 0.5), gy = Math.abs(((lat / Math.PI) * 18 % 1 + 1) % 1 - 0.5);
      const grid = smooth(0.47, 0.5, Math.max(gx, gy)) * smooth(0.5, 0.62, n);
      const dots = smooth(0.78, 0.9, perlin(x * 90, y * 90, z * 90));
      const g = Math.max(grid * 0.55, dots * 0.8);
      return { c: mix3([14, 22, 30], [58, 74, 84], n), e: [104 * g, 222 * g, 232 * g] };
    },
    desert(x, y, z, lat) {
      const n = fbm(x * 1.8, y * 1.8, z * 1.8);
      const dune = (Math.sin(Math.atan2(z, x) * 26 + n * 12 + lat * 5) + 1) / 2;
      return { c: ramp([[120, 74, 38], [178, 124, 72], [218, 170, 112], [240, 208, 158]], n * 0.78 + dune * 0.22) };
    },
    clouds(x, y, z) {
      const n = fbm(x * 2.2 + 20, y * 3.4, z * 2.2, 7);
      return { a: smooth(0.56, 0.86, n) * 0.95 };
    },
  };

  self.onmessage = ({ data: { id, type, W, H } }) => {
    const fn = S[type];
    const c = new Uint8Array(W * H * 4);
    let e = null;
    for (let j = 0; j < H; j++) {
      const lat = ((j + 0.5) / H - 0.5) * Math.PI, cl = Math.cos(lat), sl = Math.sin(lat); // hàng 0 = cực nam (DataTexture)
      for (let i = 0; i < W; i++) {
        const lon = ((i + 0.5) / W) * Math.PI * 2;
        const o = fn(cl * Math.cos(lon), sl, -cl * Math.sin(lon), lat), k = (j * W + i) * 4;
        if (o.a !== undefined) { c[k] = c[k + 1] = c[k + 2] = o.a * 255; c[k + 3] = 255; continue; } // alphaMap đọc kênh G
        c[k] = o.c[0]; c[k + 1] = o.c[1]; c[k + 2] = o.c[2]; c[k + 3] = 255;
        if (o.e) { if (!e) { e = new Uint8Array(W * H * 4); } e[k] = o.e[0]; e[k + 1] = o.e[1]; e[k + 2] = o.e[2]; e[k + 3] = 255; }
      }
    }
    self.postMessage({ id, c, e }, e ? [c.buffer, e.buffer] : [c.buffer]);
  };
}

const workerURL = URL.createObjectURL(new Blob([`(${surfaceWorker.toString()})()`], { type: "text/javascript" }));
const pool = Array.from({ length: Math.max(2, Math.min(4, (navigator.hardwareConcurrency || 4) - 1)) }, () => new Worker(workerURL));
let jobId = 0;
const queue = [], waiting = new Map(), idle = [...pool];
pool.forEach((w) => (w.onmessage = ({ data }) => { waiting.get(data.id)(data); waiting.delete(data.id); idle.push(w); pump(); }));
function pump() { while (idle.length && queue.length) { const job = queue.shift(); idle.pop().postMessage(job); } }
function bake(type, W, H) {
  return new Promise((resolve) => {
    const id = ++jobId;
    waiting.set(id, ({ c, e }) => {
      const tex = (arr) => { const t = new THREE.DataTexture(arr, W, H, THREE.RGBAFormat); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = THREE.RepeatWrapping; t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearMipmapLinearFilter; t.generateMipmaps = true; t.anisotropy = 8; t.needsUpdate = true; return t; };
      resolve({ map: tex(c), emissive: e ? tex(e) : null });
    });
    queue.push({ id, type, W, H }); pump();
  });
}
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const hash1 = (n) => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); };

/* ===================== Cảnh 3D ===================== */
const canvas = document.getElementById("space");
const loader = document.getElementById("loader");
const loadPct = document.getElementById("loadPct");
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
} catch (err) {
  document.body.classList.add("no-webgl");
  loader.classList.add("done");
}

if (renderer) {
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 5000);
  const LIGHT_DIR = new THREE.Vector3(-1, 0.42, -0.18).normalize();
  const sun = new THREE.DirectionalLight(0xfff0dc, 3.1);
  sun.position.copy(LIGHT_DIR);
  scene.add(sun, new THREE.AmbientLight(0x1a2233, 0.2));

  /* --- sao --- */
  function starLayer(count, size, opacity, spread) {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3), col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      let v;
      if (spread === "band") { // dải Ngân Hà
        const a = Math.random() * Math.PI * 2, r = 900 + Math.random() * 500, h = (Math.random() + Math.random() + Math.random() - 1.5) * 90;
        v = new THREE.Vector3(Math.cos(a) * r, h, Math.sin(a) * r).applyAxisAngle(new THREE.Vector3(1, 0, 0.4).normalize(), 1.1);
      } else {
        v = new THREE.Vector3().randomDirection().multiplyScalar(700 + Math.random() * 800);
      }
      pos.set([v.x, v.y, v.z - 250], i * 3);
      const t = Math.random();
      c.setRGB(...(t < 0.1 ? [1, 0.82, 0.62] : t < 0.2 ? [0.7, 0.8, 1] : [1, 1, 1]));
      col.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const m = new THREE.PointsMaterial({ size, sizeAttenuation: false, vertexColors: true, transparent: true, opacity, depthWrite: false });
    scene.add(new THREE.Points(g, m));
  }
  starLayer(5200, 1.3, 0.75);
  starLayer(500, 2.4, 0.95);
  starLayer(9000, 1.0, 0.35, "band");

  /* --- tinh vân & mặt trời (sprite) --- */
  function glowTexture(stops) {
    const c = document.createElement("canvas"); c.width = c.height = 256;
    const x = c.getContext("2d"), g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
    stops.forEach(([o, col]) => g.addColorStop(o, col));
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  function sprite(tex, pos, scale, opacity) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }));
    s.position.copy(pos); s.scale.setScalar(scale); scene.add(s); return s;
  }
  const neb = (r, g, b) => glowTexture([[0, `rgba(${r},${g},${b},.55)`], [0.4, `rgba(${r},${g},${b},.18)`], [1, "rgba(0,0,0,0)"]]);
  sprite(neb(120, 60, 40), new THREE.Vector3(600, 200, -900), 1400, 0.5);
  sprite(neb(40, 70, 130), new THREE.Vector3(-700, -250, -600), 1300, 0.45);
  sprite(neb(90, 50, 110), new THREE.Vector3(200, -400, -1300), 1600, 0.35);
  sprite(neb(140, 90, 50), new THREE.Vector3(-300, 300, 300), 1200, 0.25);
  const sunPos = new THREE.Vector3(-300, 170, -330);
  sprite(glowTexture([[0, "rgba(255,250,240,1)"], [0.06, "rgba(255,236,200,.95)"], [0.18, "rgba(255,190,120,.35)"], [0.5, "rgba(255,140,60,.08)"], [1, "rgba(0,0,0,0)"]]), sunPos, 520, 1);
  sprite(glowTexture([[0, "rgba(255,200,140,.25)"], [1, "rgba(0,0,0,0)"]]), sunPos, 1600, 0.8);

  /* --- khí quyển --- */
  const atmoVert = `varying vec3 vN; varying vec3 vV;
    void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`;
  const atmoFrag = `uniform vec3 color; uniform vec3 lightDir; uniform float intensity; varying vec3 vN; varying vec3 vV;
    void main(){ float rim = pow(1.0 - max(dot(vN, vV), 0.0), 2.6); float lit = smoothstep(-0.35, 0.6, dot(vN, lightDir));
    float a = rim * lit * intensity; gl_FragColor = vec4(color * a, a); }`;
  const atmos = [];
  function atmosphere(color, radius, intensity = 1.4) {
    const m = new THREE.ShaderMaterial({
      uniforms: { color: { value: new THREE.Color(color) }, lightDir: { value: new THREE.Vector3() }, intensity: { value: intensity } },
      vertexShader: atmoVert, fragmentShader: atmoFrag, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 96, 96), m);
    atmos.push(m); return mesh;
  }

  /* --- vành đai --- */
  function ring({ inner, outer, tint, tilt }, r) {
    const c = document.createElement("canvas"); c.width = 512; c.height = 1;
    const x = c.getContext("2d"), d = x.createImageData(512, 1);
    for (let i = 0; i < 512; i++) {
      const t = i / 511;
      const band = 0.5 + 0.5 * Math.sin(t * 90 + Math.sin(t * 23) * 3), gap = hash1(Math.floor(t * 14)) > 0.25 ? 1 : 0.2;
      const a = (0.3 + 0.7 * band * (0.6 + 0.4 * hash1(Math.floor(t * 160)))) * gap * smooth(0, 0.08, t) * smooth(1, 0.85, t);
      d.data.set([tint[0], tint[1], tint[2], a * 210], i * 4);
    }
    x.putImageData(d, 0, 0);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.ShaderMaterial({
      uniforms: { tex: { value: tex }, inner: { value: inner * r }, outer: { value: outer * r }, lightDir: { value: LIGHT_DIR } },
      vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform sampler2D tex; uniform float inner; uniform float outer; varying vec3 vP;
        void main(){ float t = (length(vP.xy) - inner) / (outer - inner); vec4 c = texture2D(tex, vec2(t, 0.5)); gl_FragColor = vec4(c.rgb * 1.1, c.a); }`,
      side: THREE.DoubleSide, transparent: true, depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.RingGeometry(inner * r, outer * r, 160, 1), m);
    mesh.rotation.x = Math.PI / 2 - 0.28; mesh.rotation.y = tilt;
    return mesh;
  }

  /* --- hành tinh --- */
  const planets = [];
  function addPlanet({ type, r, atmo, clouds, ringCfg, pos, res }) {
    const group = new THREE.Group(); group.position.copy(pos);
    const mat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.92, metalness: 0 });
    const body = new THREE.Mesh(new THREE.SphereGeometry(r, 128, 128), mat);
    body.rotation.z = 0.32;
    group.add(body);
    group.add(atmosphere(atmo, r * 1.045, type === "home" ? 1.8 : 1.3));
    let cloud = null;
    if (clouds) {
      cloud = new THREE.Mesh(new THREE.SphereGeometry(r * 1.012, 128, 128), new THREE.MeshStandardMaterial({ transparent: true, opacity: 0, depthWrite: false, roughness: 1 }));
      cloud.rotation.z = 0.32; group.add(cloud);
    }
    if (ringCfg) group.add(ring(ringCfg, r));
    scene.add(group);
    const pl = { group, body, cloud, mat, type, res, r };
    planets.push(pl);
    return pl;
  }
  async function texturePlanet(pl) {
    const { map, emissive } = await bake(pl.type, pl.res, pl.res / 2);
    pl.mat.map = map; pl.mat.color.set(0xffffff);
    if (emissive) { pl.mat.emissiveMap = emissive; pl.mat.emissive.set(0xffffff); pl.mat.emissiveIntensity = pl.type === "home" ? 0.9 : pl.type === "lava" ? 1.1 : 1.4; }
    if (["lava", "ice", "desert"].includes(pl.type)) { pl.mat.bumpMap = map; pl.mat.bumpScale = 0.6; }
    pl.mat.needsUpdate = true;
    if (pl.cloud) {
      const c = await bake("clouds", Math.min(pl.res, 1024), Math.min(pl.res, 1024) / 2);
      pl.cloud.material.alphaMap = c.map; pl.cloud.material.color.set(0xffffff); pl.cloud.material.opacity = pl.type === "home" ? 0.8 : 0.7; pl.cloud.material.needsUpdate = true;
    }
  }

  const HERO = { pos: new THREE.Vector3(16, -11.5, 14), r: 12 };
  const home = addPlanet({ type: "home", r: HERO.r, atmo: "#8fb8ff", clouds: true, pos: HERO.pos, res: 1024 });
  const XS = [12, 40, -34, 44, -38, 34, -28], YS = [6, 16, -12, 18, -14, 12, -6];
  PROJECTS.forEach((p, i) => {
    p.pos = new THREE.Vector3(XS[i], YS[i], -70 - i * 75);
    p.pl = addPlanet({ type: p.planet.type, r: p.planet.r, atmo: p.planet.atmo, clouds: p.planet.clouds, ringCfg: p.planet.ring, pos: p.pos, res: 512 });
  });

  /* --- khung hình camera cho từng cảnh --- */
  let keys = [];
  function buildKeys() {
    const mobile = innerWidth / innerHeight < 0.8;
    camera.fov = mobile ? 58 : 40; camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
    keys = [{ pos: new THREE.Vector3(0, 2, 46), look: new THREE.Vector3(mobile ? 12 : 2, mobile ? -25 : 0, 10) }];
    PROJECTS.forEach((p) => {
      const r = p.planet.r * (p.planet.ring ? 1.25 : 1);
      if (mobile) {
        const look = p.pos.clone().add(new THREE.Vector3(0, -r * 1.15, 0));
        keys.push({ pos: look.clone().add(new THREE.Vector3(0, 0, r * 4.6)), look });
      } else {
        const look = p.pos.clone().add(new THREE.Vector3(-r * 1.25, 0, 0));
        keys.push({ pos: look.clone().add(new THREE.Vector3(0, r * 0.14, r * 4.4)), look });
      }
    });
    keys.push({ pos: new THREE.Vector3(mobile ? 70 : 120, 60, -170), look: new THREE.Vector3(mobile ? 0 : -30, -6, -300) });
  }
  let tops = [];
  const measure = () => { tops = scenes.map((s) => s.offsetTop); };

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    buildKeys(); measure();
  }
  resize();
  addEventListener("resize", resize);
  addEventListener("load", measure);

  const camPos = keys[0].pos.clone(), camLook = keys[0].look.clone();
  camera.position.copy(camPos); camera.lookAt(camLook);
  const target = { pos: new THREE.Vector3(), look: new THREE.Vector3() };
  let mx = 0, my = 0;
  addEventListener("pointermove", (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; }, { passive: true });

  let sceneIdx = 0;
  function computeTarget() {
    const y = scrollY;
    let i = 0;
    while (i < tops.length - 1 && y >= tops[i + 1]) i++;
    sceneIdx = i + ((y - tops[i]) / Math.max(1, (tops[i + 1] ?? tops[i] + innerHeight) - tops[i]));
    if (i >= keys.length - 1) { target.pos.copy(keys[keys.length - 1].pos); target.look.copy(keys[keys.length - 1].look); return; }
    const span = Math.max(1, tops[i + 1] - tops[i]);
    const f = smooth(0.18, 0.92, (y - tops[i]) / span);
    target.pos.lerpVectors(keys[i].pos, keys[i + 1].pos, f);
    target.look.lerpVectors(keys[i].look, keys[i + 1].look, f);
    // vòng cung nhẹ khi bay để tránh đi xuyên hành tinh
    target.pos.y += Math.sin(f * Math.PI) * 4;
  }

  const v3 = new THREE.Vector3();
  let last = performance.now();
  function tick(now) {
    const dt = Math.min(0.25, (now - last) / 1000); last = now;
    if (!document.hidden) {
      computeTarget();
      const k = reduced ? 1 : 1 - Math.exp(-dt * 3.2);
      camPos.lerp(target.pos, k); camLook.lerp(target.look, k);
      const dist = camPos.distanceTo(camLook);
      camera.position.copy(camPos).add(v3.set(mx * dist * 0.035, -my * dist * 0.025, 0));
      camera.lookAt(camLook);
      planets.forEach((p) => { p.group.visible = p.type === "home" ? camPos.distanceTo(p.group.position) < 140 : camPos.distanceTo(p.group.position) < (sceneIdx > keys.length - 1.6 ? 2000 : 72); });
      if (!reduced) planets.forEach((p) => { p.body.rotation.y += dt * (p.type === "home" ? 0.012 : 0.05); if (p.cloud) p.cloud.rotation.y += dt * (p.type === "home" ? 0.018 : 0.07); });
      const ld = v3.copy(LIGHT_DIR).transformDirection(camera.matrixWorldInverse);
      atmos.forEach((m) => m.uniforms.lightDir.value.copy(ld));
      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Nung kết cấu song song trong Web Worker; ẩn loader khi hành tinh nhà + hành tinh đầu tiên xong
  {
    const order = [home, ...PROJECTS.map((p) => p.pl)];
    let done = 0;
    const jobs = order.map((pl) => texturePlanet(pl).then(() => { done++; loadPct.textContent = ` ${Math.round((done / order.length) * 100)}%`; }));
    Promise.all(jobs.slice(0, 2)).then(() => loader.classList.add("done"));
    setTimeout(() => loader.classList.add("done"), 6000);
  }
}
