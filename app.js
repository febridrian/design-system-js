(function () {
  "use strict";
  var h = React.createElement;
  var F = React.Fragment;
  var J = window.Jobseeker || {};
  var DS = window.DS;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, useMemo = React.useMemo;

  /* ---------------- Icons (20px line set, currentColor) ---------------- */
  function svg(d, size) {
    size = size || 20;
    return h("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
      [].concat(d).map(function (p, i) { return h("path", { key: i, d: p }); }));
  }
  var I = {
    search: function (s) { return svg(["M21 21l-4.35-4.35", "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"], s); },
    arrow: function (s) { return svg(["M5 12h14", "M12 5l7 7-7 7"], s); },
    plus: function (s) { return svg(["M12 5v14", "M5 12h14"], s); },
    check: function (s) { return svg(["M20 6 9 17l-5-5"], s); },
    x: function (s) { return svg(["M18 6 6 18", "M6 6l12 12"], s); },
    brief: function (s) { return svg(["M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2", "M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z", "M3 13h18"], s); },
    pin: function (s) { return svg(["M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z", "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"], s); },
    bell: function (s) { return svg(["M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.7 21a2 2 0 0 1-3.4 0"], s); },
    heart: function (s) { return svg(["M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"], s); },
    share: function (s) { return svg(["M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7", "M16 6l-4-4-4 4", "M12 2v13"], s); },
    users: function (s) { return svg(["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M23 21v-2a4 4 0 0 0-3-3.9", "M16 3.1a4 4 0 0 1 0 7.8"], s); },
    palette: function (s) { return svg(["M12 22a10 10 0 1 1 10-10c0 2.8-2.2 4-4 4h-2a2 2 0 0 0-1.5 3.3A1.6 1.6 0 0 1 12 22z", "M7.5 10.5h.01", "M10.5 6.5h.01", "M15.5 7.5h.01"], s); },
    type: function (s) { return svg(["M4 7V4h16v3", "M9 20h6", "M12 4v16"], s); },
    grid: function (s) { return svg(["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"], s); },
    layers: function (s) { return svg(["M12 2 2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"], s); },
    cube: function (s) { return svg(["M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z", "M3.3 7 12 12l8.7-5", "M12 22V12"], s); },
    menu: function (s) { return svg(["M3 12h18", "M3 6h18", "M3 18h18"], s); },
    upload: function (s) { return svg(["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M17 8l-5-5-5 5", "M12 3v12"], s); },
    mail: function (s) { return svg(["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M22 6l-10 7L2 6"], s); },
    filter: function (s) { return svg(["M22 3H2l8 9.5V19l4 2v-8.5L22 3z"], s); },
    star: function (s) { return svg(["M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z"], s); },
    sun: function (s) { return svg(["M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z", "M12 1v2", "M12 21v2", "M4.2 4.2l1.4 1.4", "M18.4 18.4l1.4 1.4", "M1 12h2", "M21 12h2", "M4.2 19.8l1.4-1.4", "M18.4 5.6l1.4-1.4"], s); },
    code: function (s) { return svg(["M16 18l6-6-6-6", "M8 6l-6 6 6 6"], s); },
    zap: function (s) { return svg(["M13 2 3 14h9l-1 8 10-12h-9l1-8z"], s); },
    eye: function (s) { return svg(["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"], s); }
  };

  function reduceMotion() { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } }
  var lastPointer = { x: innerWidth - 80, y: 32 };
  window.addEventListener("pointerdown", function (e) { lastPointer = { x: e.clientX, y: e.clientY }; }, true);

  /* ---------------- Theme state ---------------- */
  var THEMES = [
    ["light", "Corporate", "Jobseeker corporate · navy", "brand"],
    ["dark", "Dark", "Mode gelap untuk semua produk", "brand"],
    ["app", "Jobseeker App", "Pink", "app"],
    ["academy", "Academy", "Hijau", "academy"],
    ["life", "Life", "Ungu", "life"],
    ["partners", "Partners", "Biru", "partners"],
    ["services", "Services", "Merah", "services"],
    ["software", "Software", "Indigo", "software"]
  ];
  var root = document.documentElement;
  var lastWritten = null;
  function systemMode() {
    var a = root.getAttribute("data-theme");
    if (a === "dark" || a === "light") return a;
    try { return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; } catch (e) { return "light"; }
  }
  function readStored() { try { return localStorage.getItem("jsds-theme"); } catch (e) { return null; } }
  function store(v) { try { if (v) localStorage.setItem("jsds-theme", v); else localStorage.removeItem("jsds-theme"); } catch (e) {} }

  /* ---------------- Helpers ---------------- */
  var comps = DS.comps;
  var compMap = {};
  comps.forEach(function (c) { compMap[c.name] = c; });
  var CAT_ORDER = ["Actions", "Buttons", "Forms", "Data display", "Feedback", "Navigation", "Media", "Layout", "Lainnya"];
  var CAT_COLOR = { "Actions": "blue", "Buttons": "indigo", "Forms": "green", "Data display": "purple", "Feedback": "orange", "Navigation": "blue-light", "Media": "pink", "Layout": "yellow", "Lainnya": "gray-blue" };
  function catVars(k) { var c = CAT_COLOR[k] || "brand"; return { "--c": "var(--utility-" + c + "-500)", "--c50": "var(--utility-" + c + "-50)", "--c100": "var(--utility-" + c + "-100)", "--c200": "var(--utility-" + c + "-200)", "--c700": "var(--utility-" + c + "-700)" }; }
  function catVars0(c) { return { "--c": "var(--utility-" + c + "-500)", "--c50": "var(--utility-" + c + "-50)", "--c100": "var(--utility-" + c + "-100)", "--c200": "var(--utility-" + c + "-200)", "--c700": "var(--utility-" + c + "-700)" }; }
  var CAT_ID = { "Actions": "Aksi", "Buttons": "Tombol", "Forms": "Formulir", "Data display": "Tampilan data", "Feedback": "Umpan balik", "Navigation": "Navigasi", "Media": "Media", "Layout": "Tata letak", "Lainnya": "Sub-komponen" };
  function toHex(c) {
    if (!c) return "";
    var m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return c;
    var p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);
    if (p.length > 3 && p[3] === 0) return "transparan";
    var hx = "#" + p.slice(0, 3).map(function (n) { return ("0" + Math.round(n).toString(16)).slice(-2); }).join("");
    if (p.length > 3 && p[3] < 1) hx += " · " + Math.round(p[3] * 100) + "%";
    return hx;
  }
  function inkFor(bg) {
    var m = (bg || "").match(/rgba?\(([^)]+)\)/); if (!m) return "#000";
    var p = m[1].split(/[ ,\/]+/).map(Number);
    var l = (0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]) / 255;
    if (p.length > 3 && p[3] < 0.4) return "currentColor";
    return l > 0.6 ? "#181d27" : "#ffffff";
  }
  var toastTimer;
  function toast(msg) {
    var el = document.getElementById("jsds-toast");
    if (!el) { el = document.createElement("div"); el.id = "jsds-toast"; el.className = "toast"; el.setAttribute("role", "status"); document.getElementById("app").appendChild(el); }
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.hidden = true; }, 1600);
  }
  function copy(text) {
    var done = function () { toast("Disalin: " + text); };
    try {
      navigator.clipboard.writeText(text).then(done, function () { toast(text); });
    } catch (e) { toast(text); }
  }

  /* Error boundary so one demo never takes the page down */
  class Safe extends React.Component {
    constructor(p) { super(p); this.state = { err: null }; }
    static getDerivedStateFromError(e) { return { err: e }; }
    componentDidUpdate(prev) { if (prev.k !== this.props.k && this.state.err) this.setState({ err: null }); }
    render() { return this.state.err ? h("div", { className: "err" }, "Pratinjau gagal dimuat: " + String(this.state.err.message || this.state.err)) : this.props.children; }
  }
  function C(name, props) {
    var Comp = J[name];
    if (!Comp) return h("span", { className: "err" }, name + " tidak ada di bundle");
    var kids = Array.prototype.slice.call(arguments, 2);
    return h.apply(null, [Comp, props || null].concat(kids));
  }
  function row() { return h.apply(null, ["div", { className: "demo-row" }].concat(Array.prototype.slice.call(arguments))); }
  function lbl(t) { return h("div", { className: "demo-lbl" }, t); }
  function wrap() { return h.apply(null, ["div", { className: "demo" }].concat(Array.prototype.slice.call(arguments))); }
  function narrow() { return h.apply(null, ["div", { className: "demo-narrow" }].concat(Array.prototype.slice.call(arguments))); }
  function mid() { return h.apply(null, ["div", { className: "demo-mid" }].concat(Array.prototype.slice.call(arguments))); }
  var noop = function () {};
  var people = [
    { name: "Rina Kartika" }, { name: "Bayu Pratama", status: "online" }, { name: "Dewi Lestari" },
    { name: "Arif Hidayat" }, { name: "Sari Wulandari" }, { name: "Fajar Nugroho" }, { name: "Maya Putri" }
  ];

  /* ---------------- Live demos (real Jobseeker components) ---------------- */
  var DEMOS = {
    Button: {
      thumb: function () { return row(C("Button", { size: "md" }, "Lamar sekarang"), C("Button", { size: "md", hierarchy: "secondary" }, "Simpan")); },
      full: function () {
        return wrap(
          lbl("Hierarki"),
          row(C("Button", {}, "Lamar sekarang"), C("Button", { hierarchy: "secondary" }, "Simpan lowongan"), C("Button", { hierarchy: "tertiary" }, "Batal"), C("Button", { hierarchy: "link-color" }, "Lihat detail"), C("Button", { hierarchy: "link-gray" }, "Lewati")),
          lbl("Ukuran"),
          row.apply(null, ["xs", "sm", "md", "lg", "xl"].map(function (s) { return C("Button", { key: s, size: s, iconTrailing: I.arrow() }, "Button " + s); })),
          lbl("Ikon, status & destruktif"),
          row(C("Button", { iconLeading: I.plus() }, "Buat lowongan"), C("Button", { hierarchy: "secondary", iconOnly: true, iconLeading: I.heart(), "aria-label": "Simpan" }), C("Button", { loading: true, loadingText: "Mengirim…" }, "Kirim"), C("Button", { disabled: true }, "Nonaktif"), C("Button", { destructive: true }, "Hapus lowongan"), C("Button", { destructive: true, hierarchy: "secondary" }, "Tarik lamaran"))
        );
      },
      dos: ["Satu tombol primary per area; aksi pendamping memakai secondary atau tertiary.", "Tulis label sebagai kata kerja yang jelas: “Lamar sekarang”, “Simpan lowongan”."],
      donts: ["Jangan menumpuk beberapa tombol primary berdampingan.", "Jangan memakai warna destruktif untuk aksi yang bisa dibatalkan."]
    },
    IconButton: {
      thumb: function () { return row(C("IconButton", { icon: I.heart(), "aria-label": "Simpan" }), C("IconButton", { icon: I.share(), hierarchy: "secondary", "aria-label": "Bagikan" }), C("IconButton", { icon: I.plus(), hierarchy: "tertiary", "aria-label": "Tambah" })); },
      full: function () {
        return wrap(lbl("Hierarki"), row(C("IconButton", { icon: I.plus(), "aria-label": "Tambah" }), C("IconButton", { icon: I.share(), hierarchy: "secondary", "aria-label": "Bagikan" }), C("IconButton", { icon: I.heart(), hierarchy: "tertiary", "aria-label": "Favorit" })),
          lbl("Ukuran"), row.apply(null, ["xs", "sm", "md", "lg", "xl", "2xl"].map(function (s) { return C("IconButton", { key: s, size: s, icon: I.plus(), "aria-label": "Tambah " + s }); })));
      }
    },
    ButtonGroup: {
      thumb: function () { return C("ButtonGroup", { defaultValue: "grid", items: [{ label: "Grid", value: "grid" }, { label: "Daftar", value: "list" }, { label: "Board", value: "board" }] }); },
      full: function () {
        return wrap(lbl("Pengganti tampilan"), C("ButtonGroup", { defaultValue: "grid", items: [{ label: "Grid", value: "grid", icon: I.grid() }, { label: "Daftar", value: "list", icon: I.menu() }, { label: "Board", value: "board", icon: I.layers() }] }),
          lbl("Filter jenis kerja (radio)"), C("ButtonGroup", { type: "radio", defaultValue: "ft", items: [{ label: "Full-time", value: "ft" }, { label: "Part-time", value: "pt" }, { label: "Kontrak", value: "ct" }] }));
      }
    },
    CloseButton: { thumb: function () { return row(C("CloseButton", { size: "sm" }), C("CloseButton", { size: "md" }), C("CloseButton", { size: "lg" })); }, full: function () { return wrap(row(C("CloseButton", { size: "sm" }), C("CloseButton", { size: "md" }), C("CloseButton", { size: "lg" }))); } },
    SocialButton: {
      thumb: function () { return C("SocialButton", { platform: "google", theme: "gray" }, "Masuk dengan Google"); },
      full: function () {
        return wrap(narrow(h("div", { style: { display: "grid", gap: 12 } }, C("SocialButton", { platform: "google", theme: "gray", fullWidth: true }, "Masuk dengan Google"), C("SocialButton", { platform: "apple", theme: "brand", fullWidth: true }, "Masuk dengan Apple"), C("SocialButton", { platform: "facebook", theme: "brand", fullWidth: true }, "Masuk dengan Facebook"))),
          lbl("Ikon saja"), row(C("SocialButton", { platform: "google", iconOnly: true, theme: "gray" }), C("SocialButton", { platform: "apple", iconOnly: true, theme: "gray" }), C("SocialButton", { platform: "x", iconOnly: true, theme: "gray" })));
      }
    },
    Badge: {
      thumb: function () { return row(C("Badge", { color: "success", dot: true }, "Aktif"), C("Badge", { color: "brand" }, "Remote"), C("Badge", { color: "warning" }, "Ditinjau")); },
      full: function () {
        var cs = ["gray", "brand", "error", "warning", "success", "info", "blue", "indigo", "purple", "pink", "orange"];
        return wrap(lbl("Pill · 11 warna utility"), row.apply(null, cs.map(function (c) { return C("Badge", { key: c, color: c }, c); })),
          lbl("Status lowongan"), row(C("Badge", { color: "success", dot: true, size: "md" }, "Dibuka"), C("Badge", { color: "warning", dot: true, size: "md" }, "Ditinjau"), C("Badge", { color: "error", dot: true, size: "md" }, "Ditutup"), C("Badge", { color: "gray", type: "modern", dot: true, size: "md" }, "Draf")),
          lbl("Tipe & ukuran"), row(C("Badge", { type: "pill", color: "brand", size: "lg" }, "Pill lg"), C("Badge", { type: "badge", color: "brand", size: "md" }, "Badge md"), C("Badge", { type: "modern", color: "brand", size: "sm", dot: true }, "Modern sm"), C("Badge", { color: "indigo", onRemove: noop }, "React.js")));
      }
    },
    BadgeGroup: {
      thumb: function () { return C("BadgeGroup", { badge: "Baru", color: "brand" }, "Fitur CV otomatis"); },
      full: function () { return wrap(C("BadgeGroup", { badge: "Baru", color: "brand", size: "md" }, "Buat CV otomatis dari profil kamu"), C("BadgeGroup", { badge: "Info", color: "warning", type: "modern" }, "Pemeliharaan sistem Sabtu 02.00 WIB"), C("BadgeGroup", { badge: "Lihat", color: "success", align: "trailing" }, "12 lowongan cocok dengan profilmu")); }
    },
    Tag: {
      thumb: function () { return row(C("Tag", { size: "md", onRemove: noop }, "Figma"), C("Tag", { size: "md", dot: true }, "Jakarta")); },
      full: function () { return wrap(lbl("Keahlian"), row(C("Tag", { size: "md", onRemove: noop }, "UI Design"), C("Tag", { size: "md", onRemove: noop }, "Figma"), C("Tag", { size: "md", count: 12 }, "React"), C("Tag", { size: "md", dot: true }, "Tersedia")), lbl("Filter dengan checkbox"), row(C("Tag", { size: "lg", checkbox: true, defaultChecked: true }, "Remote"), C("Tag", { size: "lg", checkbox: true }, "Hybrid"), C("Tag", { size: "lg", checkbox: true }, "On-site"))); }
    },
    Avatar: {
      thumb: function () { return row(C("Avatar", { name: "Rina Kartika", size: "lg" }), C("Avatar", { name: "Bayu Pratama", size: "lg", status: "online" }), C("Avatar", { size: "lg" })); },
      full: function () { return wrap(lbl("Ukuran"), row.apply(null, ["xs", "sm", "md", "lg", "xl", "2xl"].map(function (s) { return C("Avatar", { key: s, size: s, name: "Dewi Lestari" }); })), lbl("Status & placeholder"), row(C("Avatar", { size: "lg", name: "Bayu Pratama", status: "online" }), C("Avatar", { size: "lg", name: "Arif Hidayat", status: "offline" }), C("Avatar", { size: "lg" }), C("Avatar", { size: "lg", name: "Maya Putri", framed: true }))); }
    },
    AvatarGroup: {
      thumb: function () { return C("AvatarGroup", { size: "md", max: 4, avatars: people }); },
      full: function () { return wrap(lbl("Tim rekrutmen"), C("AvatarGroup", { size: "md", max: 5, avatars: people, onAdd: noop }), lbl("Ukuran kecil"), C("AvatarGroup", { size: "xs", max: 4, avatars: people })); }
    },
    AvatarLabelGroup: {
      thumb: function () { return C("AvatarLabelGroup", { name: "Rina Kartika", subtitle: "HR Manager · Jobseeker" }); },
      full: function () { return wrap.apply(null, ["sm", "md", "lg", "xl"].map(function (s) { return C("AvatarLabelGroup", { key: s, size: s, name: "Rina Kartika", subtitle: "rina@jobseeker.company", status: s === "md" ? "online" : undefined }); })); }
    },
    AvatarProfilePhoto: {
      thumb: function () { return C("AvatarProfilePhoto", { size: "sm", name: "Bayu Pratama", verified: true }); },
      full: function () { return wrap(row(C("AvatarProfilePhoto", { size: "sm", name: "Bayu Pratama", verified: true }), C("AvatarProfilePhoto", { size: "md", name: "Dewi Lestari" }), C("AvatarProfilePhoto", { size: "lg", name: "Rina Kartika", verified: true }))); }
    },
    FeaturedIcon: {
      thumb: function () { return row(C("FeaturedIcon", { icon: I.brief(), color: "brand", type: "light", size: "lg" }), C("FeaturedIcon", { icon: I.check(), color: "success", type: "light", size: "lg" }), C("FeaturedIcon", { icon: I.bell(), color: "gray", type: "modern", size: "lg" })); },
      full: function () {
        var types = ["light", "gradient", "dark", "outline", "modern"];
        return wrap.apply(null, types.map(function (t) { return h(F, { key: t }, lbl(t), row.apply(null, ["brand", "gray", "error", "warning", "success", "info"].map(function (c) { return C("FeaturedIcon", { key: c, type: t, color: c, size: "lg", icon: I.brief() }); }))); }));
      }
    },
    CheckItem: {
      thumb: function () { return C("CheckList", { color: "success" }, C("CheckItem", null, "Akses lowongan premium"), C("CheckItem", null, "CV tanpa batas")); },
      full: function () { return wrap(C("CheckList", { color: "brand", type: "light" }, C("CheckItem", null, "Lamar tanpa batas setiap bulan"), C("CheckItem", null, "Profil tampil di pencarian rekruter"), C("CheckItem", null, "Notifikasi lowongan instan")), C("CheckList", { color: "success", type: "solid", size: "sm" }, C("CheckItem", null, "Verifikasi email"), C("CheckItem", null, "Unggah CV"))); }
    },
    RatingStars: {
      thumb: function () { return C("RatingStars", { value: 4, size: "lg" }); },
      full: function () {
        function Live() { var s = useState(3); return h("div", { style: { display: "grid", gap: 8 } }, C("RatingStars", { value: s[0], onChange: s[1], size: "lg" }), h("span", { style: { color: "var(--text-tertiary)" } }, "Nilai: " + s[0] + " / 5")); }
        return wrap(lbl("Tampilan"), row(C("RatingStars", { value: 4.5, size: "sm" }), C("RatingStars", { value: 4, size: "md" }), C("RatingStars", { value: 3, size: "lg", shape: "heart" })), lbl("Input"), h(Live));
      }
    },
    Input: {
      thumb: function () { return narrow(C("Input", { label: "Posisi", placeholder: "cth. Product Designer", iconLeading: I.search(), size: "sm" })); },
      full: function () {
        return wrap(narrow(h("div", { style: { display: "grid", gap: 20 } },
          C("Input", { label: "Email", type: "email", placeholder: "nama@email.com", iconLeading: I.mail(), hint: "Kami tidak akan membagikan email kamu.", required: true }),
          C("Input", { label: "Ekspektasi gaji", prefix: "Rp", placeholder: "8.000.000", tooltip: "Gaji kotor per bulan" }),
          C("Input", { label: "Portofolio", addonLeading: "https://", placeholder: "behance.net/nama" }),
          C("Input", { label: "Kata sandi", type: "password", defaultValue: "rahasia", error: "Minimal 8 karakter." }),
          C("Input", { label: "Cari", placeholder: "Cari lowongan", iconLeading: I.search(), shortcut: "⌘K" }),
          C("Input", { label: "Nonaktif", placeholder: "Tidak bisa diubah", disabled: true }))));
      }
    },
    Textarea: {
      thumb: function () { return narrow(C("Textarea", { label: "Surat lamaran", placeholder: "Ceritakan dirimu…", rows: 2, size: "sm" })); },
      full: function () { return wrap(narrow(h("div", { style: { display: "grid", gap: 20 } }, C("Textarea", { label: "Deskripsi pekerjaan", placeholder: "Tulis tanggung jawab utama…", hint: "Maksimal 2.000 karakter.", rows: 4 }), C("Textarea", { label: "Catatan", error: "Wajib diisi.", rows: 3 })))); }
    },
    Select: {
      thumb: function () { return narrow(C("Select", { size: "sm", label: "Lokasi", placeholder: "Pilih kota", options: [{ value: "jkt", label: "Jakarta" }] })); },
      full: function () {
        var cities = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Medan", "Bali"].map(function (c) { return { value: c.toLowerCase(), label: c }; });
        return wrap(narrow(h("div", { style: { display: "grid", gap: 20 } },
          C("Select", { label: "Lokasi", placeholder: "Pilih kota", options: cities, iconLeading: I.pin() }),
          C("Select", { label: "Rekruter", placeholder: "Pilih anggota tim", options: people.slice(0, 5).map(function (p, i) { return { value: "p" + i, label: p.name, avatar: null, supportingText: "@" + p.name.split(" ")[0].toLowerCase() }; }) }),
          C("Select", { label: "Keahlian", multiple: true, defaultValue: ["figma", "ux"], options: [{ value: "figma", label: "Figma" }, { value: "ux", label: "UX Research" }, { value: "react", label: "React" }, { value: "sql", label: "SQL" }] }))));
      }
    },
    Checkbox: {
      thumb: function () { return h("div", { style: { display: "grid", gap: 10 } }, C("Checkbox", { label: "Remote", defaultChecked: true }), C("Checkbox", { label: "Hybrid" })); },
      full: function () { return wrap(h("div", { style: { display: "grid", gap: 14 } }, C("Checkbox", { label: "Ingat saya", defaultChecked: true }), C("Checkbox", { label: "Kirim notifikasi lowongan", hint: "Maks. satu email per hari.", size: "md" }), C("Checkbox", { label: "Pilih semua", indeterminate: true }), C("Checkbox", { label: "Nonaktif", disabled: true }))); }
    },
    Radio: {
      thumb: function () { return h("div", { style: { display: "grid", gap: 10 } }, C("Radio", { name: "t-r", label: "Full-time", defaultChecked: true }), C("Radio", { name: "t-r", label: "Kontrak" })); },
      full: function () { return wrap(h("div", { role: "radiogroup", "aria-label": "Jenis pekerjaan", style: { display: "grid", gap: 14 } }, C("Radio", { name: "jt", label: "Full-time", hint: "40 jam per minggu", defaultChecked: true, size: "md" }), C("Radio", { name: "jt", label: "Part-time", hint: "Kurang dari 30 jam", size: "md" }), C("Radio", { name: "jt", label: "Freelance", size: "md" }))); }
    },
    Toggle: {
      thumb: function () { return C("Toggle", { label: "Notifikasi", defaultChecked: true, size: "md" }); },
      full: function () { return wrap(h("div", { style: { display: "grid", gap: 16 } }, C("Toggle", { label: "Profil terlihat oleh rekruter", hint: "Rekruter dapat menemukanmu di pencarian.", defaultChecked: true, size: "md" }), C("Toggle", { label: "Notifikasi email" }), C("Toggle", { label: "Nonaktif", disabled: true }))); }
    },
    Slider: {
      thumb: function () { return h("div", { style: { width: 220 } }, C("Slider", { defaultValue: [6, 14], min: 0, max: 30, "aria-label": "Gaji" })); },
      full: function () { return wrap(mid(h("div", { style: { display: "grid", gap: 40, paddingBottom: 16 } }, C("Slider", { defaultValue: 5, min: 0, max: 15, labelPosition: "top", formatValue: function (v) { return v + " th"; }, "aria-label": "Pengalaman" }), C("Slider", { defaultValue: [8, 18], min: 0, max: 40, labelPosition: "bottom", formatValue: function (v) { return "Rp" + v + " jt"; }, "aria-label": "Rentang gaji" })))); }
    },
    NumberInput: {
      thumb: function () { return h("div", { style: { width: 180 } }, C("NumberInput", { defaultValue: 2, min: 1, size: "sm" })); },
      full: function () { return wrap(narrow(h("div", { style: { display: "grid", gap: 20 } }, C("NumberInput", { label: "Jumlah posisi", defaultValue: 3, min: 1, max: 50 }), C("NumberInput", { label: "Tahun pengalaman", variant: "chevrons", defaultValue: 2, min: 0 })))); }
    },
    VerificationCode: {
      thumb: function () { return C("VerificationCode", { length: 4, size: "sm", defaultValue: "28" }); },
      full: function () { return wrap(C("VerificationCode", { label: "Kode verifikasi", length: 6, separator: 3, hint: "Kode dikirim ke 0812-xxxx-1234." }), C("VerificationCode", { length: 4, variant: "large", defaultValue: "2841" })); }
    },
    TagInput: {
      thumb: function () { return narrow(C("TagInput", { size: "sm", defaultTags: ["Figma", "UX"] })); },
      full: function () { return wrap(narrow(C("TagInput", { label: "Keahlian", defaultTags: ["UI Design", "Figma", "Design System"], placeholder: "Tambah keahlian", hint: "Tekan Enter untuk menambah." }))); }
    },
    DatePicker: {
      thumb: function () { return C("DatePicker", { placeholder: "Pilih tanggal", size: "sm" }); },
      full: function () { return wrap(lbl("Tanggal tunggal"), C("DatePicker", { placeholder: "Pilih tanggal wawancara", locale: "id-ID" }), lbl("Rentang"), C("DatePicker", { mode: "range", placeholder: "Periode lowongan", locale: "id-ID" })); }
    },
    FileUpload: {
      thumb: function () { return h("div", { style: { width: 260 } }, C("FileUpload", { hint: "PDF maks. 5 MB" })); },
      full: function () { return wrap(mid(C("FileUpload", { hint: "PDF, DOCX maks. 5 MB", accept: ".pdf,.docx", files: [{ id: 1, name: "CV-Bayu-Pratama.pdf", size: "1.2 MB", progress: 100, state: "complete", type: "pdf" }, { id: 2, name: "Portofolio.pdf", size: "4.8 MB", progress: 45, state: "uploading", type: "pdf" }, { id: 3, name: "Sertifikat.docx", size: "7.1 MB", state: "error", type: "docx", errorText: "Ukuran melebihi 5 MB" }] }))); }
    },
    ChoiceCard: {
      thumb: function () { return h("div", { style: { width: 260 } }, C("ChoiceCard", { title: "Premium", supportingText: "Rp49rb/bulan", defaultChecked: true, type: "radio" })); },
      full: function () {
        return wrap(mid(C("ChoiceCardGroup", { type: "radio", name: "plan", defaultValue: "pro", "aria-label": "Paket" },
          C("ChoiceCard", { value: "basic", title: "Basic", supportingText: "Gratis", description: "5 lamaran per bulan." }),
          C("ChoiceCard", { value: "pro", title: "Premium", supportingText: "Rp49rb/bulan", description: "Lamaran tanpa batas dan profil disorot." }),
          C("ChoiceCard", { value: "biz", title: "Bisnis", supportingText: "Hubungi kami", description: "Untuk tim rekrutmen perusahaan." }))));
      }
    },
    Alert: {
      thumb: function () { return h("div", { style: { width: 300 } }, C("Alert", { color: "success", title: "Lamaran terkirim" })); },
      full: function () {
        return wrap(mid(h("div", { style: { display: "grid", gap: 16 } },
          C("Alert", { color: "brand", title: "Profilmu 80% lengkap", description: "Tambahkan pengalaman kerja agar lebih mudah ditemukan rekruter.", actions: [{ label: "Nanti saja" }, { label: "Lengkapi profil" }], onClose: noop }),
          C("Alert", { color: "success", variant: "filled", title: "Lamaran berhasil dikirim", description: "PT Maju Jaya akan meninjau lamaranmu dalam 3–5 hari kerja." }),
          C("Alert", { color: "warning", title: "Lowongan segera ditutup", description: "Batas akhir pendaftaran besok pukul 23.59 WIB." }),
          C("Alert", { color: "error", title: "Gagal mengunggah CV", description: "Periksa koneksi internet lalu coba lagi.", actions: [{ label: "Coba lagi" }] }))));
      }
    },
    Banner: {
      thumb: function () { return h("div", { style: { width: 320 } }, C("Banner", { color: "brand", variant: "filled", title: "Fitur baru" })); },
      full: function () { return wrap(C("Banner", { color: "brand", variant: "filled", title: "Jobseeker Academy kini tersedia", description: "Ikuti kelas gratis untuk meningkatkan peluang kerjamu.", actions: [{ label: "Pelajari" }], onClose: noop }), C("Banner", { color: "warning", title: "Pemeliharaan terjadwal", description: "Layanan tidak tersedia Sabtu, 02.00–04.00 WIB.", onClose: noop })); }
    },
    MessageBar: {
      thumb: function () { return C("MessageBar", { color: "success" }, "Perubahan disimpan"); },
      full: function () { return wrap(mid(h("div", { style: { display: "grid", gap: 12 } }, C("MessageBar", { color: "success", onClose: noop }, "Perubahan profil disimpan."), C("MessageBar", { color: "brand", variant: "solid" }, "3 lowongan baru sesuai filter kamu."), C("MessageBar", { color: "error", variant: "light" }, "Sesi berakhir. Masuk kembali untuk melanjutkan.")))); }
    },
    Notification: {
      thumb: function () { return h("div", { style: { width: 320 } }, C("Notification", { color: "success", title: "Wawancara dijadwalkan", onClose: noop })); },
      full: function () {
        return wrap(mid(h("div", { style: { display: "grid", gap: 16 } },
          C("Notification", { color: "success", title: "Wawancara dijadwalkan", description: "Kamis, 24 Oktober · 10.00 WIB bersama Rina Kartika.", actions: [{ label: "Tutup", hierarchy: "link-gray" }, { label: "Lihat jadwal", hierarchy: "link-color" }], onClose: noop }),
          C("Notification", { avatar: { name: "Bayu Pratama", time: "2 menit lalu", status: "online" }, title: "Bayu Pratama", description: "Mengirim pesan tentang posisi Product Designer.", onClose: noop }),
          C("Notification", { color: "brand", title: "Mengunggah portofolio", progress: 64, onClose: noop }))));
      }
    },
    ProgressBar: {
      thumb: function () { return h("div", { style: { width: 240 } }, C("ProgressBar", { value: 72, label: "right" })); },
      full: function () { return wrap(mid(h("div", { style: { display: "grid", gap: 36, paddingTop: 24 } }, C("ProgressBar", { value: 40, label: "right" }), C("ProgressBar", { value: 64, label: "bottom" }), C("ProgressBar", { value: 85, label: "top-floating" })))); }
    },
    ProgressCircle: {
      thumb: function () { return C("ProgressCircle", { value: 72, size: "xs", label: "Profil" }); },
      full: function () { return wrap(row(C("ProgressCircle", { value: 72, size: "sm", label: "Kekuatan profil" }), C("ProgressCircle", { value: 40, size: "xs" }), C("ProgressCircle", { value: 88, size: "sm", shape: "half", label: "Kuota" }))); }
    },
    LoadingIndicator: {
      thumb: function () { return C("LoadingIndicator", { label: "Memuat…" }); },
      full: function () { return wrap(row(C("LoadingIndicator", { type: "line-simple", size: "md", label: "Memuat" }), C("LoadingIndicator", { type: "line-spinner", size: "md", label: "Memuat" }), C("LoadingIndicator", { type: "gradient", size: "md", label: "Memuat" }))); }
    },
    EmptyState: {
      thumb: function () { return h("div", { style: { transform: "scale(.7)" } }, C("EmptyState", { size: "sm", title: "Belum ada lowongan" })); },
      full: function () { return wrap(C("EmptyState", { title: "Tidak ada lowongan yang cocok", description: "Coba ubah kata kunci atau hapus beberapa filter untuk melihat lebih banyak hasil.", actions: [{ label: "Hapus filter", hierarchy: "secondary" }, { label: "Buat notifikasi", iconLeading: I.bell() }] })); }
    },
    Tooltip: {
      thumb: function () { return C("Tooltip", { title: "Simpan lowongan", open: true, placement: "top" }, C("IconButton", { icon: I.heart(), hierarchy: "secondary", "aria-label": "Simpan" })); },
      full: function () { return wrap(h("div", { className: "demo-row", style: { paddingTop: 48, gap: 48 } }, C("Tooltip", { title: "Simpan lowongan", open: true }, C("IconButton", { icon: I.heart(), hierarchy: "secondary", "aria-label": "Simpan" })), C("Tooltip", { title: "Gaji terverifikasi", description: "Rentang gaji ini dikonfirmasi langsung oleh perusahaan.", placement: "right" }, C("Button", { hierarchy: "secondary" }, "Arahkan kursor ke sini")))); }
    },
    Tabs: {
      thumb: function () { return C("Tabs", { type: "underline", panels: false, defaultValue: "a", items: [{ value: "a", label: "Ringkasan" }, { value: "b", label: "Pelamar", badge: 12 }] }); },
      full: function () {
        var items = [{ value: "a", label: "Ringkasan" }, { value: "b", label: "Pelamar", badge: "12" }, { value: "c", label: "Wawancara" }, { value: "d", label: "Pengaturan" }];
        return wrap.apply(null, ["brand", "gray", "underline", "white", "minimal"].map(function (t) { return h(F, { key: t }, lbl(t), C("Tabs", { type: t, items: items, defaultValue: "a", panels: false, mobile: "scroll", id: "tb-" + t })); }));
      }
    },
    SegmentedControl: {
      thumb: function () { return C("SegmentedControl", { defaultValue: "w", items: [{ value: "d", label: "Hari" }, { value: "w", label: "Minggu" }, { value: "m", label: "Bulan" }] }); },
      full: function () { return wrap(C("SegmentedControl", { defaultValue: "w", items: [{ value: "d", label: "Hari ini" }, { value: "w", label: "Minggu ini" }, { value: "m", label: "Bulan ini" }, { value: "y", label: "Tahun ini" }] })); }
    },
    Breadcrumbs: {
      thumb: function () { return C("Breadcrumbs", { items: [{ icon: "home", label: "Beranda", href: "#" }, { label: "Lowongan", href: "#" }, { label: "Designer" }] }); },
      full: function () { var it = [{ icon: "home", label: "Beranda", href: "#home" }, { label: "Lowongan", href: "#home" }, { label: "Desain", href: "#home" }, { label: "Product Designer" }]; return wrap(C("Breadcrumbs", { items: it }), C("Breadcrumbs", { items: it, divider: "slash" }), C("Breadcrumbs", { items: it, type: "button" })); }
    },
    Pagination: {
      thumb: function () { return C("Pagination", { total: 10, defaultPage: 2, variant: "group" }); },
      full: function () { return wrap(C("Pagination", { total: 10, defaultPage: 1 }), C("Pagination", { total: 10, defaultPage: 3, variant: "text" }), C("Pagination", { total: 8, defaultPage: 2, variant: "group" })); }
    },
    PaginationDots: { thumb: function () { return C("PaginationDots", { count: 5, defaultCurrent: 1 }); }, full: function () { return wrap(row(C("PaginationDots", { count: 5, defaultCurrent: 1 }), C("PaginationDots", { count: 4, type: "line", defaultCurrent: 2 }), C("PaginationDots", { count: 5, framed: true, size: "lg" }))); } },
    ProgressSteps: {
      thumb: function () { return h("div", { style: { width: 300 } }, C("ProgressSteps", { orientation: "horizontal", current: 1, size: "sm", steps: [{ title: "Profil" }, { title: "CV" }, { title: "Kirim" }] })); },
      full: function () {
        var steps = [{ title: "Data diri", description: "Nama dan kontak" }, { title: "Unggah CV", description: "PDF maks. 5 MB" }, { title: "Pertanyaan", description: "3 pertanyaan singkat" }, { title: "Kirim lamaran", description: "Tinjau lalu kirim" }];
        return wrap(lbl("Horizontal"), C("ProgressSteps", { orientation: "horizontal", current: 1, steps: steps }), lbl("Vertikal · bernomor"), C("ProgressSteps", { orientation: "vertical", type: "number", current: 2, steps: steps }));
      }
    },
    Dropdown: {
      thumb: function () { return C("Button", { hierarchy: "secondary", iconTrailing: svg(["M6 9l6 6 6-6"]) }, "Urutkan"); },
      full: function () { return wrap(h("div", { style: { minHeight: 260 } }, C("Dropdown", { trigger: C("Button", { hierarchy: "secondary", iconTrailing: svg(["M6 9l6 6 6-6"]) }, "Urutkan"), items: [{ type: "heading", label: "Urutkan berdasarkan" }, { label: "Paling relevan" }, { label: "Terbaru" }, { label: "Gaji tertinggi" }, { type: "divider" }, { label: "Reset" }] }))); }
    },
    MetricCard: {
      thumb: function () { return h("div", { style: { width: 260 } }, C("MetricCard", { label: "Total pelamar", value: "1.284", change: "12%", trend: "positive" })); },
      full: function () {
        return wrap(h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, width: "100%" } },
          C("MetricCard", { label: "Total pelamar", value: "1.284", change: "12%", trend: "positive", changeContext: "vs bulan lalu", chart: [4, 6, 5, 8, 7, 10, 12] }),
          C("MetricCard", { label: "Lowongan aktif", value: "36", change: "3", trend: "negative", icon: I.brief(), iconType: "modern" }),
          C("MetricCard", { label: "Waktu rekrut rata-rata", value: "18 hari", change: "2 hari", trend: "positive", changeType: "arrow" })));
      }
    },
    Chart: {
      thumb: function () { return h("div", { style: { width: 280 } }, C("Chart", { height: 120, data: [{ label: "Jan", a: 30 }, { label: "Feb", a: 42 }, { label: "Mar", a: 38 }, { label: "Apr", a: 55 }], series: [{ key: "a", name: "Pelamar" }], legend: false })); },
      full: function () {
        var data = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt"].map(function (m, i) { return { label: m, lamaran: [120, 160, 150, 210, 260, 240, 310, 330, 300, 380][i], wawancara: [30, 42, 40, 55, 70, 66, 80, 92, 88, 104][i] }; });
        return wrap(h("div", { style: { width: "100%" } }, C("Chart", { type: "line", data: data, series: [{ key: "lamaran", name: "Lamaran" }, { key: "wawancara", name: "Wawancara" }], legend: "top", axisLabels: true, label: "Lamaran per bulan 2026", defaultActive: 6 })),
          h("div", { style: { width: "100%" } }, C("Chart", { type: "bar", data: data.slice(4), series: [{ key: "lamaran", name: "Lamaran" }, { key: "wawancara", name: "Wawancara" }], legend: "top", axisLabels: true, label: "Lamaran dan wawancara" })));
      }
    },
    PieChart: {
      thumb: function () { return C("PieChart", { size: "xs", data: [{ name: "Remote", value: 40 }, { name: "Hybrid", value: 35 }, { name: "On-site", value: 25 }] }); },
      full: function () { return wrap(C("PieChart", { size: "md", legend: "right", label: "Lowongan", value: "1.240", data: [{ name: "Remote", value: 420 }, { name: "Hybrid", value: 510 }, { name: "On-site", value: 310 }] })); }
    },
    RadialChart: {
      thumb: function () { return C("RadialChart", { size: "xs", data: [{ name: "Profil", value: 80 }, { name: "CV", value: 60 }] }); },
      full: function () { return wrap(C("RadialChart", { size: "md", legend: "right", label: "Kelengkapan", value: "76%", data: [{ name: "Profil", value: 90 }, { name: "CV", value: 70 }, { name: "Portofolio", value: 55 }] })); }
    },
    CodeSnippet: {
      thumb: function () { return h("div", { style: { width: 280 } }, C("CodeSnippet", { code: "<Button>Lamar</Button>", language: "jsx", lineNumbers: false })); },
      full: function () { return wrap(h("div", { style: { width: "100%" } }, C("CodeSnippet", { language: "bash", tabs: [{ label: "npm", code: "npm install @jobseeker/design", language: "bash" }, { label: "yarn", code: "yarn add @jobseeker/design", language: "bash" }] }))); }
    },
    ChatMessage: {
      thumb: function () { return h("div", { style: { width: 300 } }, C("ChatMessage", { name: "Rina", time: "10.24", size: "sm" }, "Halo, kapan kamu bisa wawancara?")); },
      full: function () { return wrap(mid(h("div", { style: { display: "grid", gap: 16 } }, C("ChatMessage", { name: "Rina Kartika", time: "10.24" }, "Halo Bayu, terima kasih sudah melamar. Kapan kamu bisa wawancara?"), C("ChatMessage", { outgoing: true, time: "10.26", status: "read" }, "Halo Bu Rina, saya bisa Kamis pagi."), C("ChatMessage", { name: "Rina Kartika", typing: true })))); }
    },
    CtaCard: {
      thumb: function () { return h("div", { style: { width: 300 } }, C("CtaCard", { title: "Upgrade ke Premium", actionSize: "sm", actions: [{ label: "Upgrade" }] })); },
      full: function () { return wrap(mid(C("CtaCard", { title: "Tingkatkan peluangmu dengan Premium", description: "Profil disorot ke rekruter dan lamaran tanpa batas setiap bulan.", actions: [{ label: "Nanti", hierarchy: "secondary" }, { label: "Coba gratis 7 hari" }] }))); }
    },
    SectionHeader: {
      thumb: function () { return h("div", { style: { width: 320 } }, C("SectionHeader", { title: "Lowongan saya" })); },
      full: function () { return wrap(h("div", { style: { width: "100%" } }, C("SectionHeader", { title: "Lowongan saya", description: "Kelola lowongan yang sedang dibuka dan arsip.", actions: [C("Button", { key: "a", hierarchy: "secondary" }, "Ekspor"), C("Button", { key: "b", iconLeading: I.plus() }, "Buat lowongan")] }))); }
    },
    ContentDivider: {
      thumb: function () { return h("div", { style: { width: 260 } }, C("ContentDivider", { label: "atau" })); },
      full: function () { return wrap(h("div", { style: { width: "100%", display: "grid", gap: 28 } }, C("ContentDivider", { label: "atau lanjutkan dengan" }), C("ContentDivider", { label: "Hari ini", variant: "background" }), C("ContentDivider", { align: "start", label: "Pengalaman kerja", labelStyle: "heading" }))); }
    },
    TreeView: {
      thumb: function () { return h("div", { style: { width: 220 } }, C("TreeView", { size: "sm", defaultExpanded: ["a"], items: [{ id: "a", label: "Rekrutmen", children: [{ id: "a1", label: "Desain" }, { id: "a2", label: "Engineering" }] }] })); },
      full: function () { return wrap(narrow(C("TreeView", { defaultExpanded: ["a", "b"], items: [{ id: "a", label: "Rekrutmen 2026", children: [{ id: "b", label: "Desain", children: [{ id: "b1", label: "Product Designer" }, { id: "b2", label: "UX Writer" }] }, { id: "c", label: "Engineering", children: [{ id: "c1", label: "Frontend" }] }] }, { id: "d", label: "Arsip" }] }))); }
    },
    ActivityFeed: {
      full: function () { return wrap(mid(C("ActivityFeed", { variant: "connector" }, C("FeedItem", { name: "Rina Kartika", time: "2 menit lalu", connector: true, unread: true }, "memindahkan lamaranmu ke ", h("strong", null, "Wawancara")), C("FeedItem", { name: "Bayu Pratama", time: "1 jam lalu", connector: true, file: { name: "CV-Bayu.pdf", size: "1.2 MB", type: "pdf" } }, "mengunggah CV baru"), C("FeedItem", { name: "Dewi Lestari", time: "Kemarin", labels: ["Desain", { children: "Senior", color: "brand" }] }, "menambahkan label")))); }
    },
    TableCard: {
      full: function () {
        var rows = [["Product Designer", "Jakarta", "success", "Dibuka", 48], ["Data Analyst", "Bandung", "warning", "Ditinjau", 31], ["Frontend Engineer", "Remote", "success", "Dibuka", 112], ["HR Generalist", "Surabaya", "gray", "Draf", 0]];
        return wrap(h("div", { style: { width: "100%" } }, C("TableCard", { title: "Lowongan aktif", badge: C("Badge", { color: "brand" }, "4 posisi"), footer: C("Pagination", { total: 3, defaultPage: 1, placement: "card" }) },
          C("Table", null, h("thead", null, h("tr", null, C("TableHeaderCell", null, "Posisi"), C("TableHeaderCell", null, "Lokasi"), C("TableHeaderCell", null, "Status"), C("TableHeaderCell", null, "Pelamar"))),
            h("tbody", null, rows.map(function (r) { return C("TableRow", { key: r[0] }, C("TableCell", { title: r[0], subtitle: "Full-time" }), C("TableCell", null, r[1]), C("TableCell", null, C("Badge", { color: r[2], dot: true }, r[3])), C("TableCell", null, String(r[4]))); }))))));
      }
    }
  };
  DEMOS.CheckList = DEMOS.CheckItem; DEMOS.ChoiceCardGroup = DEMOS.ChoiceCard; DEMOS.FeedItem = DEMOS.ActivityFeed;
  DEMOS.Table = DEMOS.TableCard; DEMOS.TableCell = DEMOS.TableCard; DEMOS.TableHeaderCell = DEMOS.TableCard; DEMOS.TableRow = DEMOS.TableCard;
  DEMOS.DropdownMenu = DEMOS.Dropdown; DEMOS.TooltipBubble = DEMOS.Tooltip; DEMOS.RatingStar = DEMOS.RatingStars;

  /* ---------------- Navigation model ---------------- */
  var NAV = [
    { title: "Mulai", items: [["home", "Beranda"], ["start", "Cara menggunakan"], ["themes", "Tema & brand"]] },
    { title: "Foundations", items: [["colors", "Warna"], ["typography", "Tipografi"], ["spacing", "Spacing"], ["radius", "Radius"], ["elevation", "Elevasi"], ["layout", "Layout & grid"]] }
  ];
  var byCat = {};
  comps.forEach(function (c) { (byCat[c.cat] = byCat[c.cat] || []).push(c); });
  var demoCount = comps.filter(function (c) { return DEMOS[c.name]; }).length;

  function useHash() {
    var get = function () { return (location.hash || "#home").slice(1) || "home"; };
    var s = useState(get());
    useEffect(function () {
      var on = function () { s[1](get()); window.scrollTo(0, 0); };
      window.addEventListener("hashchange", on);
      return function () { window.removeEventListener("hashchange", on); };
    }, []);
    return s[0];
  }

  /* ---------------- Shell ---------------- */
  function App() {
    var route = useHash();
    var stored = readStored();
    var ts = useState(stored || systemMode());
    var theme = ts[0], setThemeS = ts[1];
    var manual = useRef(!!stored);
    var sideOpen = useState(false);

    function apply(t) {
      lastWritten = t;
      root.setAttribute("data-theme", t);
    }
    useEffect(function () { apply(theme); }, [theme]);
    useEffect(function () {
      var mq; try { mq = window.matchMedia("(prefers-color-scheme: dark)"); } catch (e) {}
      var onMq = function () { if (!manual.current && !root.hasAttribute("data-theme-ext")) setThemeS(mq.matches ? "dark" : "light"); };
      if (mq && mq.addEventListener) mq.addEventListener("change", onMq);
      var mo = new MutationObserver(function () {
        var a = root.getAttribute("data-theme");
        if (a !== lastWritten && (a === "dark" || a === "light")) { manual.current = false; store(null); setThemeS(a); }
      });
      mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
      return function () { mo.disconnect(); if (mq && mq.removeEventListener) mq.removeEventListener("change", onMq); };
    }, []);
    function setTheme(t) {
      manual.current = true; store(t);
      if (document.startViewTransition && !reduceMotion() && t !== theme) {
        root.style.setProperty("--vt-x", lastPointer.x + "px");
        root.style.setProperty("--vt-y", lastPointer.y + "px");
        document.startViewTransition(function () { ReactDOM.flushSync(function () { setThemeS(t); }); lastWritten = t; root.setAttribute("data-theme", t); });
      } else setThemeS(t);
    }
    /* scroll progress + cursor spotlight on cards */
    useEffect(function () {
      var bar = document.getElementById("scroll-prog"), raf = 0;
      function onScroll() { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; var max = document.documentElement.scrollHeight - innerHeight; if (bar) bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, scrollY / max) : 0) + ")"; }); }
      function onMove(e) {
        var el = e.target.closest && e.target.closest(".lcard, .ccard, .brand, .tcard, .rad, .sh");
        if (!el) return;
        var b = el.getBoundingClientRect();
        el.style.setProperty("--sx", (e.clientX - b.left) + "px");
        el.style.setProperty("--sy", (e.clientY - b.top) + "px");
      }
      addEventListener("scroll", onScroll, { passive: true }); addEventListener("pointermove", onMove, { passive: true }); onScroll();
      return function () { removeEventListener("scroll", onScroll); removeEventListener("pointermove", onMove); };
    }, []);

    useEffect(function () { sideOpen[1](false); }, [route]);

    var section = route === "components" || route.indexOf("c-") === 0 ? "components" : (["colors", "typography", "spacing", "radius", "elevation", "layout"].indexOf(route) >= 0 ? "foundations" : (route === "themes" ? "themes" : "start"));

    var page;
    if (route.indexOf("c-") === 0 && compMap[route.slice(2)]) page = h(CompPage, { c: compMap[route.slice(2)], theme: theme });
    else page = ({ home: h(Home, { theme: theme, setTheme: setTheme }), start: h(Start), themes: h(Themes, { theme: theme, setTheme: setTheme }), colors: h(Colors, { theme: theme }), typography: h(Typography), spacing: h(Spacing), radius: h(Radius), elevation: h(Elevation), layout: h(Layout), components: h(CompIndex) })[route] || h(Home, { theme: theme, setTheme: setTheme });

    return h(F, null,
      h("div", { id: "scroll-prog", className: "scroll-prog", "aria-hidden": "true" }),
      h("header", { className: "topbar" }, h("div", { className: "topbar-in" },
        h("button", { className: "menu-btn", "aria-label": "Buka navigasi", "aria-expanded": sideOpen[0], onClick: function () { sideOpen[1](!sideOpen[0]); } }, I.menu()),
        h("a", { className: "logo", href: "#home", "aria-label": "Jobseeker Design, beranda" }, h("span", { className: "logo-mark", "aria-hidden": "true" }, h("i"), h("i"), h("i"), h("i")), h("span", { className: "logo-word" }, "jobseeker", h("span", null, "design"))),
        h("nav", { className: "topnav", "aria-label": "Bagian utama" },
          h("a", { href: "#start", className: section === "start" ? "on" : "" }, "Mulai"),
          h("a", { href: "#colors", className: section === "foundations" ? "on" : "" }, "Foundations"),
          h("a", { href: "#components", className: section === "components" ? "on" : "" }, "Komponen"),
          h("a", { href: "#themes", className: section === "themes" ? "on" : "" }, "Tema")),
        h("div", { className: "topbar-r" }, h(Search), h(ThemePick, { theme: theme, setTheme: setTheme })))),
      h("div", { className: "shell" },
        h("aside", { className: "side" + (sideOpen[0] ? " open" : ""), "aria-label": "Navigasi dokumentasi" }, h(Side, { route: route })),
        h("main", { id: "main" }, h("div", { className: "col" }, h("div", { key: route, className: "page-in" }, h(Safe, { k: route }, page)),
          h("footer", { className: "foot" }, h("span", null, "Jobseeker Design System · tokens disinkron dari Figma, 12 Okt 2026"), h("span", null, DS.count + " token warna · " + comps.length + " komponen"))))));
  }

  function ThemePick(p) {
    var ping = useState(false), first = useRef(true);
    useEffect(function () { if (first.current) { first.current = false; return; } ping[1](false); var t = setTimeout(function () { ping[1](true); }, 10); var t2 = setTimeout(function () { ping[1](false); }, 800); return function () { clearTimeout(t); clearTimeout(t2); }; }, [p.theme]);
    return h("label", { className: "theme-wrap" + (ping[0] ? " ping" : "") }, h("span", { className: "dot", "aria-hidden": "true" }), h("span", { hidden: true }, "Tema"),
      h("select", { id: "theme-pick", className: "theme-pick", value: p.theme, "aria-label": "Pilih tema", onChange: function (e) { p.setTheme(e.target.value); } },
        THEMES.map(function (t) { return h("option", { key: t[0], value: t[0] }, t[1]); })));
  }

  function Search() {
    var q = useState(""), act = useState(0), open = useState(false);
    var all = useMemo(function () {
      var a = [];
      NAV.forEach(function (g) { g.items.forEach(function (it) { a.push({ id: it[0], label: it[1], kind: g.title }); }); });
      comps.forEach(function (c) { a.push({ id: "c-" + c.name, label: c.name, kind: CAT_ID[c.cat] || c.cat }); });
      return a;
    }, []);
    var res = q[0] ? all.filter(function (x) { return x.label.toLowerCase().indexOf(q[0].toLowerCase()) >= 0; }).slice(0, 10) : [];
    function go(id) { location.hash = id; q[1](""); open[1](false); }
    return h("div", { className: "search" }, I.search(18),
      h("input", { id: "site-search", type: "search", placeholder: "Cari komponen…", value: q[0], "aria-label": "Cari komponen dan halaman",
        onChange: function (e) { q[1](e.target.value); act[1](0); open[1](true); },
        onBlur: function () { setTimeout(function () { open[1](false); }, 150); },
        onKeyDown: function (e) {
          if (e.key === "ArrowDown") { e.preventDefault(); act[1](Math.min(act[0] + 1, res.length - 1)); }
          if (e.key === "ArrowUp") { e.preventDefault(); act[1](Math.max(act[0] - 1, 0)); }
          if (e.key === "Enter" && res[act[0]]) go(res[act[0]].id);
          if (e.key === "Escape") q[1]("");
        } }),
      open[0] && q[0] ? h("div", { className: "search-res", role: "listbox" }, res.length ? res.map(function (r, i) { return h("a", { key: r.id, href: "#" + r.id, className: i === act[0] ? "act" : "", onMouseDown: function (e) { e.preventDefault(); go(r.id); } }, r.label, h("small", null, r.kind)); }) : h("div", { style: { padding: 10, color: "var(--text-tertiary)" } }, "Tidak ada hasil untuk “" + q[0] + "”.")) : null);
  }

  function Side(p) {
    var r = p.route;
    return h(F, null,
      NAV.map(function (g) { return h(F, { key: g.title }, h("h6", null, g.title), g.items.map(function (it) { return h("a", { key: it[0], href: "#" + it[0], className: r === it[0] ? "on" : "", "aria-current": r === it[0] ? "page" : undefined }, it[1]); })); }),
      h("h6", null, "Komponen"),
      h("a", { href: "#components", className: r === "components" ? "on" : "" }, "Semua komponen", h("span", { className: "ct" }, comps.length)),
      CAT_ORDER.filter(function (k) { return byCat[k]; }).map(function (k) {
        var list = byCat[k];
        var isOpen = list.some(function (c) { return r === "c-" + c.name; }) || k === "Actions";
        return h("details", { key: k, open: isOpen, style: catVars(k) }, h("summary", null, h("span", { className: "cdot" }), CAT_ID[k] || k, h("span", { className: "ct", style: { marginLeft: "auto", marginRight: 10 } }, list.length)),
          list.map(function (c) { return h("a", { key: c.name, href: "#c-" + c.name, className: r === "c-" + c.name ? "on" : "", "aria-current": r === "c-" + c.name ? "page" : undefined }, c.name); }));
      }));
  }

  function PH(p) {
    return h("div", { className: "ph" }, p.crumbs ? C("Breadcrumbs", { items: p.crumbs, size: "sm" }) : null, p.eyebrow ? h("p", { className: "eyebrow", style: { marginTop: p.crumbs ? 20 : 0 } }, p.eyebrow) : null, h("h1", null, p.title), p.lead ? h("p", { className: "lead" }, p.lead) : null, p.meta ? h("div", { className: "meta" }, p.meta) : null);
  }
  var crumbHome = { icon: "home", label: "Beranda", href: "#home" };

  /* ---------------- Home ---------------- */
  function Tiles() {
    var R = [["t-partners", 128, 28, 240, 180, 24], ["t-life", 384, 92, 176, 280, 24], ["t-academy", 64, 28, 48, 48, 12], ["t-services", 64, 92, 48, 116, 12], ["t-warm", 64, 224, 112, 48, 16], ["t-acc", 192, 224, 48, 48, 24], ["t-software", 256, 224, 112, 48, 12], ["t-warm", 384, 28, 48, 48, 12], ["t-acc", 448, 28, 48, 48, 12], ["t-academy", 128, 288, 48, 48, 12]];
    var lit = useState([5, 0]);
    useEffect(function () {
      if (reduceMotion()) return;
      var id = setInterval(function () {
        lit[1](function (prev) { var a; do { a = Math.floor(Math.random() * R.length); } while (a === prev[0] || a === prev[1]); return [a, prev[0]]; });
      }, 1400);
      return function () { clearInterval(id); };
    }, []);
    return h("svg", { className: "tiles", viewBox: "0 0 520 340", "aria-hidden": "true" }, h("g", { className: "par" },
      R.map(function (r, i) {
        var cls = r[0] + (i === lit[0][0] ? " lit" : i === lit[0][1] ? " lit2" : "");
        return h("g", { key: i, className: "fl", style: { "--f": (i * 0.53 % 3).toFixed(2) + "s", "--fd": (5 + (i % 4)) + "s" } },
          h("rect", { className: cls, x: r[1], y: r[2], width: r[3], height: r[4], rx: r[5], style: { "--d": (0.15 + i * 0.07).toFixed(2) + "s" } }));
      })));
  }
  function Hero(p) {
    function move(e) {
      var el = e.currentTarget, b = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - b.left) / b.width - 0.5).toFixed(3));
      el.style.setProperty("--my", ((e.clientY - b.top) / b.height - 0.5).toFixed(3));
    }
    function leave(e) { e.currentTarget.style.setProperty("--mx", 0); e.currentTarget.style.setProperty("--my", 0); }
    return h("section", { className: "hero", onMouseMove: move, onMouseLeave: leave }, p.children);
  }
  var ROT = [["app", "App"], ["academy", "Academy"], ["life", "Life"], ["partners", "Partners"], ["services", "Services"], ["software", "Software"]];
  function Rotator() {
    var i = useState(0);
    useEffect(function () {
      if (reduceMotion()) return;
      var id = setInterval(function () { i[1](function (v) { return (v + 1) % ROT.length; }); }, 2200);
      return function () { clearInterval(id); };
    }, []);
    var w = ROT[i[0]];
    return h("span", { className: "rot", "aria-live": "off" }, h("span", { key: w[0], className: "rot-w", "data-theme": w[0] }, "Jobseeker " + w[1]));
  }
  function Marquee() {
    var A = function (k) {
      return h("div", { className: "mq-set", key: k, "aria-hidden": k ? "true" : undefined },
        C("Badge", { color: "success", dot: true, size: "md" }, "Dibuka"), C("Button", { size: "sm" }, "Lamar sekarang"), C("Toggle", { defaultChecked: true, label: "Notifikasi" }),
        C("AvatarGroup", { size: "xs", max: 4, avatars: people }), C("Tag", { size: "md", onRemove: noop }, "Figma"), C("RatingStars", { value: 4, size: "sm" }),
        C("Badge", { color: "brand", size: "md" }, "Remote"), C("Checkbox", { defaultChecked: true, label: "Full-time" }), h("div", { style: { width: 140 } }, C("ProgressBar", { value: 72, label: "right" })),
        C("Button", { size: "sm", hierarchy: "secondary", iconLeading: I.heart() }, "Simpan"), C("Badge", { color: "warning", dot: true, size: "md" }, "Ditinjau"), C("AvatarLabelGroup", { size: "sm", name: "Rina Kartika", subtitle: "HR Manager" }),
        C("Tag", { size: "md", dot: true }, "Jakarta"), C("Badge", { color: "purple", size: "md" }, "Senior"));
    };
    var B = function (k) {
      return h("div", { className: "mq-set", key: k, "aria-hidden": k ? "true" : undefined },
        C("SegmentedControl", { defaultValue: "w", items: [{ value: "d", label: "Hari" }, { value: "w", label: "Minggu" }, { value: "m", label: "Bulan" }] }),
        C("Badge", { color: "indigo", size: "md" }, "React"), C("IconButton", { icon: I.share(), hierarchy: "secondary", size: "sm", "aria-label": "Bagikan" }), C("Radio", { defaultChecked: true, label: "Hybrid", name: "mq-" + k }),
        C("Avatar", { name: "Bayu Pratama", status: "online", size: "sm" }), C("Badge", { color: "pink", type: "modern", dot: true, size: "md" }, "Baru"), C("Button", { size: "sm", hierarchy: "link-color", iconTrailing: I.arrow(16) }, "Lihat detail"),
        C("Tag", { size: "md", count: 12 }, "UI Design"), C("PaginationDots", { count: 5, defaultCurrent: 2 }), C("Badge", { color: "blue-light", size: "md" }, "Data Analyst"), C("Toggle", { label: "Profil publik" }),
        C("Badge", { color: "orange", dot: true, size: "md" }, "Segera ditutup"), C("Button", { size: "sm", destructive: true, hierarchy: "secondary" }, "Tarik lamaran"));
    };
    return h("div", { className: "marquee", inert: "" },
      h("div", { className: "mq-row" }, h("div", { className: "mq-track" }, A(0), A(1))),
      h("div", { className: "mq-row rev" }, h("div", { className: "mq-track" }, B(0), B(1))));
  }
  function Count(p) {
    var s = useState(Math.round(p.n * 0.6));
    useEffect(function () {
      var reduce = false; try { reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
      if (reduce) { s[1](p.n); return; }
      var t0 = null, from = Math.round(p.n * 0.6), raf;
      function step(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / 1100); var e = 1 - Math.pow(1 - k, 3); s[1](Math.round(from + (p.n - from) * e)); if (k < 1) raf = requestAnimationFrame(step); }
      raf = requestAnimationFrame(step);
      return function () { cancelAnimationFrame(raf); };
    }, [p.n]);
    return h("b", null, s[0].toLocaleString("id-ID"));
  }
  function BrandPicker(p) {
    return h("div", { className: "brands" }, THEMES.map(function (t) {
      return h("button", { key: t[0], className: "brand" + (p.theme === t[0] ? " on" : ""), "data-theme": t[0], onClick: function () { p.setTheme(t[0]); }, "aria-pressed": p.theme === t[0], style: { background: "var(--bg-primary)", color: "var(--text-primary)" } },
        h("span", { className: "sw" }, h("i", { style: { background: "var(--bg-brand-solid)" } }), h("i", { style: { background: "var(--bg-brand-section)" } }), h("i", { style: { background: "var(--bg-brand-secondary)" } }), h("i", { style: { background: "var(--bg-brand-primary)" } })),
        h("b", null, t[1]), h("small", null, t[2]));
    }));
  }
  function Home(p) {
    var cards = [
      ["colors", I.palette(), "Foundations", "Warna, tipografi, spacing, radius, dan elevasi. Semua dalam token semantik yang berganti otomatis per tema."],
      ["components", I.cube(), "Komponen", comps.length + " komponen React siap pakai, dari Button sampai EventCalendar, lengkap dengan props dan contoh."],
      ["themes", I.layers(), "Tema & brand", "Satu sistem untuk delapan tema: Corporate, Dark, dan enam brand produk Jobseeker."]
    ];
    return h(F, null,
      h(Hero, null, h(Tiles), h("div", { className: "hero-txt" },
        h("p", { className: "eyebrow" }, "Design System · v1"),
        h("h1", null, "Jobseeker ", h("em", null, "Design")),
        h("p", null, "Satu bahasa desain untuk ", h(Rotator), h("br"), "dan setiap produk Jobseeker lainnya."),
        h("div", { className: "hero-acts" }, C("Button", { size: "lg", href: "#start", iconTrailing: I.arrow() }, "Mulai gunakan"), C("Button", { size: "lg", hierarchy: "secondary", href: "#components" }, "Lihat komponen")))),
      h("div", { className: "stats" },
        h("div", { style: catVars0("pink") }, h(Count, { n: comps.length }), h("span", null, "komponen")),
        h("div", { style: catVars0("blue") }, h(Count, { n: DS.count }), h("span", null, "token warna")),
        h("div", { style: catVars0("green") }, h(Count, { n: 8 }), h("span", null, "tema")),
        h("div", { style: catVars0("orange") }, h(Count, { n: 2360 }), h("span", null, "ikon line & solid"))),
      h(Marquee),
      h("h2", { className: "sec" }, "Jelajahi sistem"),
      h("p", { className: "sub" }, "Mulai dari foundations untuk memahami token, lalu rakit antarmuka dengan komponen."),
      h("div", { className: "cards3" }, cards.map(function (c) {
        var col = { colors: "pink", components: "blue", themes: "purple" }[c[0]];
        return h("a", { key: c[0], href: "#" + c[0], className: "lcard reveal tinted", style: catVars0(col) }, h("span", { className: "ficon" }, c[1]), h("h3", null, c[2]), h("p", null, c[3]), h("span", { className: "go" }, "Buka", I.arrow(16)));
      })),
      h("h2", { className: "sec" }, "Prinsip"),
      h("p", { className: "sub" }, "Tiga aturan yang membuat satu layar bisa dipakai ulang di semua brand."),
      h("div", { className: "principles" },
        h("div", { className: "reveal", style: catVars0("green") }, h("span", { className: "ficon sm" }, I.zap()), h("h4", null, "Semantik dulu, primitif tidak pernah"), h("p", null, "Bangun dengan text-*, fg-*, bg-*, dan border-*. Primitif seperti brand-600 hanya bahan baku tema.")),
        h("div", { className: "reveal", style: catVars0("orange") }, h("span", { className: "ficon sm" }, I.layers()), h("h4", null, "Satu layar, delapan tema"), h("p", null, "Atur data-theme pada elemen induk. Warna brand, focus ring, dan tombol berganti tanpa mengubah kode.")),
        h("div", { className: "reveal", style: catVars0("blue-light") }, h("span", { className: "ficon sm" }, I.eye()), h("h4", null, "Kontras terukur"), h("p", null, "Sebagian besar pasangan lolos WCAG AA. Pengecualian dicatat pada token, misalnya pink App di atas putih 3,6:1."))),
      h("h2", { className: "sec" }, "Coba tema brand"),
      h("p", { className: "sub" }, "Pilih brand untuk mengganti tema seluruh situs ini, termasuk semua pratinjau komponen."),
      h(BrandPicker, p),
      h("h2", { className: "sec" }, "Semua komponen"),
      h("p", { className: "sub" }, comps.length + " komponen, dikelompokkan per kategori. Pratinjau dirender langsung dari bundle Jobseeker, bukan gambar."),
      CAT_ORDER.filter(function (k) { return byCat[k]; }).map(function (k) {
        return h("section", { key: k, style: catVars(k) }, h("h3", { className: "ssec", style: { display: "flex", alignItems: "center", gap: 8 } }, h("span", { className: "cdot" }), CAT_ID[k] || k, h("span", { style: { color: "var(--text-quaternary)", fontWeight: 500, fontSize: 14 } }, byCat[k].length)),
          h("div", { className: "cgrid" }, byCat[k].map(function (c) { return h(CompCard, { key: c.name, c: c }); })));
      }));
  }

  /* ---------------- Getting started ---------------- */
  function Snip(p) { return h("div", { style: { margin: "12px 0 20px" } }, C("CodeSnippet", { code: p.code, language: p.lang || "jsx", lineNumbers: false, variant: "simple" })); }
  function Start() {
    return h(F, null,
      h(PH, { crumbs: [crumbHome, { label: "Cara menggunakan" }], eyebrow: "Mulai", title: "Cara menggunakan", lead: "Tiga file sudah cukup untuk memakai Jobseeker Design di halaman mana pun: token, stylesheet komponen, dan bundle React." }),
      h("h2", { className: "sec" }, "1. Muat token dan komponen"),
      h("div", { className: "prose" }, h("p", null, h("code", null, "tokens.css"), " berisi setiap token sebagai CSS variable. ", h("code", null, "bundle.css"), " membaca variabel tersebut. ", h("code", null, "bundle.js"), " mendefinisikan ", h("code", null, "window.Jobseeker"), " dan membutuhkan React 18.3.1 yang dimuat lebih dulu.")),
      h(Snip, { lang: "plain", code: '<link rel="stylesheet" href="tokens.css">\n<link rel="stylesheet" href="components/bundle.css">\n<script src="react.production.min.js"></script>\n<script src="react-dom.production.min.js"></script>\n<script src="components/bundle.js"></script>' }),
      h("h2", { className: "sec" }, "2. Pasang komponen"),
      h("div", { className: "prose" }, h("p", null, "Rakit UI dengan komponen yang tersedia. Jangan membuat ulang kontrol atau menggambar ikon yang sudah ada di sistem.")),
      h(Snip, { code: 'const { Button, Input, Badge } = window.Jobseeker;\n\nfunction ApplyForm() {\n  return (\n    <form>\n      <Input label="Email" type="email" placeholder="nama@email.com" required />\n      <Badge color="success" dot>Dibuka</Badge>\n      <Button hierarchy="primary">Lamar sekarang</Button>\n    </form>\n  );\n}' }),
      h("h2", { className: "sec" }, "3. Pilih tema"),
      h("div", { className: "prose" }, h("p", null, "Atur ", h("code", null, "data-theme"), " pada ", h("code", null, "<html>"), " atau container mana pun. Tanpa atribut, tema yang dipakai adalah ", h("code", null, "light"), " (Corporate).")),
      h(Snip, { lang: "plain", code: '<html data-theme="academy">   <!-- light · dark · app · academy · life · partners · services · software -->' }),
      h("h2", { className: "sec" }, "4. Tulis CSS dengan token"),
      h("div", { className: "prose" }, h("p", null, "Pilih token berdasarkan peran, lalu tingkat penekanan. Teks memakai ", h("code", null, "text-*"), ", ikon ", h("code", null, "fg-*"), ", isian ", h("code", null, "bg-*"), ", garis ", h("code", null, "border-*"), ".")),
      h(Snip, { lang: "plain", code: ".job-card {\n  background: var(--bg-primary);\n  border: 1px solid var(--border-secondary);\n  border-radius: var(--radius-xl);\n  padding: var(--spacing-3xl);\n  box-shadow: var(--shadow-sm);\n}\n.job-card h3 { color: var(--text-primary); }\n.job-card p  { color: var(--text-tertiary); }" }),
      h("div", { className: "dodont" },
        h("div", { className: "dd do" }, h("div", { className: "dd-top" }, I.check(16), "Lakukan"), h("p", null, "Pakai ", h("code", null, "var(--bg-brand-solid)"), " untuk tombol utama agar warnanya ikut berganti per brand.")),
        h("div", { className: "dd dont" }, h("div", { className: "dd-top" }, I.x(16), "Hindari"), h("p", null, "Menulis ", h("code", null, "#040668"), " atau ", h("code", null, "var(--brand-600)"), " langsung. Warna akan tetap navy di tema App dan Academy."))));
  }

  /* ---------------- Colours ---------------- */
  function Swatch(p) {
    var ref = useRef(null), hx = useState("");
    useEffect(function () { if (ref.current) { var cs = getComputedStyle(ref.current); hx[1](toHex(p.text ? cs.color : cs.backgroundColor)); } }, [p.theme, p.name]);
    var isText = p.text;
    return h("div", { className: "tok" + (isText ? " textrow" : "") },
      isText ? h("span", { ref: ref, className: "sw", style: { color: "var(--" + p.name + ")" } }, "Aa") : h("span", { ref: ref, className: "sw", style: { background: "var(--" + p.name + ")" } }),
      h("button", { className: "nm", title: "Salin var(--" + p.name + ")", onClick: function () { copy("var(--" + p.name + ")"); } }, p.name),
      h("span", { className: "us" }, p.usage.replace(/`/g, "")),
      h("span", { className: "hx" }, hx[0]));
  }
  var SEM_GROUPS = [["text", "Teks", "Untuk semua teks: judul, isi, label, placeholder.", true], ["fg", "Foreground", "Ikon dan tanda non-teks.", true], ["bg", "Background", "Isian permukaan, section, dan state.", false], ["border", "Border", "Garis kartu, tabel, input, dan divider.", false], ["focus", "Focus ring", "Cincin fokus keyboard.", false], ["alpha", "Alpha", "Overlay dan efek kaca; berbalik di mode gelap.", false], ["component", "Komponen", "Token khusus komponen: tombol, toggle, slider, ikon.", false]];
  function Colors(p) {
    var tab = useState("semantic");
    var tabs = [{ value: "semantic", label: "Semantik" }, { value: "primitive", label: "Primitif" }, { value: "utility", label: "Utility" }];
    var body;
    if (tab[0] === "semantic") {
      body = SEM_GROUPS.map(function (g) {
        var list = DS.sem[g[0]] || [];
        if (g[0] === "fg") list = list;
        return h("section", { key: g[0] }, h("h2", { className: "sec" }, g[1], h("span", { style: { color: "var(--text-quaternary)", fontWeight: 500, fontSize: 16, marginLeft: 10 } }, list.length)), h("p", { className: "sub" }, g[2]),
          h("div", { className: "tok-list" }, list.map(function (t) { return h(Swatch, { key: t[0], name: t[0], usage: t[1], theme: p.theme, text: g[3] && g[0] === "text" }); })));
      });
    } else if (tab[0] === "primitive") {
      var order = ["gray", "gray-dark", "brand", "brand-2", "app", "academy", "life", "partners", "services", "software", "error", "warning", "success", "info"];
      body = h("div", { className: "scales" }, h("p", { className: "sub", style: { marginTop: 8 } }, "Skala mentah yang menjadi sumber tema. Jangan dipakai langsung di UI. Klik sel untuk menyalin nama token."),
        order.map(function (k) { var list = DS.prim[k] || []; return h(Scale, { key: k, name: k, list: list, theme: p.theme }); }));
    } else {
      var keys = Object.keys(DS.util);
      body = h("div", { className: "scales" }, h("p", { className: "sub", style: { marginTop: 8 } }, "Dipakai badge, tag, avatar, dan chart: langkah 50 untuk isian, 200 untuk border, 700 untuk teks. utility-brand mengikuti tema aktif."),
        keys.map(function (k) { return h(Scale, { key: k, name: "utility-" + k, list: DS.util[k].map(function (n) { return [n, ""]; }), theme: p.theme }); }));
    }
    return h(F, null,
      h(PH, { crumbs: [crumbHome, { label: "Foundations", href: "#colors" }, { label: "Warna" }], eyebrow: "Foundations", title: "Warna", lead: "Pilih token berdasarkan peran, lalu tingkat penekanan: primary → secondary → tertiary → quaternary. Nilai di bawah dibaca langsung dari tema yang sedang aktif.", meta: [C("Badge", { key: 1, color: "brand", size: "md" }, DS.count + " token"), C("Badge", { key: 2, color: "gray", size: "md" }, "Tema aktif: " + (THEMES.filter(function (t) { return t[0] === p.theme; })[0] || THEMES[0])[1])] }),
      C("Tabs", { type: "underline", items: tabs, value: tab[0], onChange: tab[1], panels: false, mobile: "scroll", id: "color-tabs", className: "tabs-gap" }),
      h("div", { style: { marginTop: 24 } }, body));
  }
  function Scale(p) {
    var ref = useRef(null), vals = useState([]);
    useEffect(function () {
      if (!ref.current) return;
      var out = [].map.call(ref.current.children, function (el) { var b = getComputedStyle(el).backgroundColor; return [toHex(b), inkFor(b)]; });
      vals[1](out);
    }, [p.theme, p.name]);
    var cols = Math.max(1, p.list.length);
    return h("div", { className: "scale reveal" }, h("h4", null, p.name, h("small", null, p.list[0] && p.list[0][1] ? p.list[0][1].replace(/`/g, "") : "")),
      h("div", { className: "scale-row", ref: ref, style: { gridTemplateColumns: "repeat(" + (cols > 12 ? 12 : cols) + ", minmax(0, 1fr))" } }, p.list.map(function (t, i) {
        var step = t[0].replace(p.name + "-", "");
        var v = vals[0][i] || ["", "currentColor"];
        return h("button", { key: t[0], style: { background: "var(--" + t[0] + ")", color: v[1] }, title: t[0] + " " + v[0], onClick: function () { copy("var(--" + t[0] + ")"); } }, h("span", { style: { fontWeight: 600 } }, step), h("span", null, v[0]));
      })));
  }

  /* ---------------- Typography ---------------- */
  var SAMPLES = { "display-2xl": "Kerja impian", "display-xl": "Kerja impian dimulai", "display-lg": "Temukan pekerjaan impianmu", "display-md": "Temukan pekerjaan impianmu", "display-sm": "Lowongan untuk kamu", "display-xs": "Product Designer · Jakarta" };
  function Typography() {
    return h(F, null,
      h(PH, { crumbs: [crumbHome, { label: "Foundations", href: "#colors" }, { label: "Tipografi" }], eyebrow: "Foundations", title: "Tipografi", lead: "Plus Jakarta Sans untuk semuanya, di bobot 400, 500, 600, dan 700. Penekanan datang dari bobot, bukan ukuran." }),
      h("div", { className: "font-card" },
        h("div", null, h("div", { className: "aa" }, "Aa"), h("div", { className: "weights" }, [["400", "Regular"], ["500", "Medium"], ["600", "Semibold"], ["700", "Bold"]].map(function (w) { return h("span", { key: w[0], style: { fontWeight: +w[0] } }, w[1] + " " + w[0]); }))),
        h("div", null, h("p", { className: "eyebrow" }, "Plus Jakarta Sans"), h("div", { className: "glyphs" }, "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 Rp ! ? & @ # %"), h("p", { style: { color: "var(--text-tertiary)", lineHeight: "22px" } }, h("code", { className: "chip" }, "--font-display"), " dan ", h("code", { className: "chip" }, "--font-body"), " mengarah ke keluarga yang sama."))),
      DS.type.map(function (g) {
        return h("section", { key: g.name }, h("h2", { className: "sec" }, g.name === "Display" ? "Display" : g.name === "Text" ? "Teks" : "Teks dengan penekanan"),
          h("p", { className: "sub" }, g.name === "Display" ? "Untuk judul, semibold (600). Tiga ukuran terbesar hanya untuk marketing; UI produk maksimal display-sm." : g.name === "Text" ? "Untuk semua hal lain. Body default text-md (16/24); UI padat, tabel, dan tombol memakai text-sm (14/20)." : "Varian bobot untuk tombol, header tabel, label form, dan badge."),
          h("div", null, g.styles.map(function (s) {
            return h("div", { key: s.name, className: "type-row reveal" },
              h("div", { className: "spec" }, h("code", null, s.name), h("small", null, parseInt(s.fontSize) + "/" + parseInt(s.lineHeight) + " · " + s.fontWeight), h("em", null, s.usage)),
              h("div", { className: "sample", style: { fontSize: s.fontSize, lineHeight: s.lineHeight, fontWeight: +s.fontWeight, letterSpacing: g.name === "Display" ? "-0.02em" : 0 } }, SAMPLES[s.name] || "Lamaran kamu sedang ditinjau oleh tim rekrutmen."));
          })));
      }),
      h("h2", { className: "sec" }, "Lebar paragraf"),
      h("div", { className: "prose" }, h("p", null, "Jaga teks berjalan dalam ", h("code", null, "paragraph-max-width"), " (720px), sekitar 65–75 karakter per baris.")));
  }

  /* ---------------- Spacing / Radius / Elevation / Layout ---------------- */
  function Spacing() {
    var max = 160;
    return h(F, null,
      h(PH, { crumbs: [crumbHome, { label: "Foundations", href: "#colors" }, { label: "Spacing" }], eyebrow: "Foundations", title: "Spacing", lead: "Basis 4px dengan langkah setengah 2px dan 6px. Gunakan langkah bernama saja; jangan membuat nilai baru." }),
      h("div", { className: "tbl-wrap" }, h("table", { className: "t" }, h("thead", null, h("tr", null, h("th", null, "Token"), h("th", null, "Nilai"), h("th", { style: { width: "36%" } }, "Visual"), h("th", null, "Penggunaan"))),
        h("tbody", null, DS.spacing.map(function (s) { var px = parseInt(s[1]); return h("tr", { key: s[0] }, h("td", { className: "n" }, s[0]), h("td", { className: "v" }, s[1]), h("td", null, h("div", { className: "bar", style: { width: Math.max(2, px / max * 100) + "%" } })), h("td", null, s[2])); })))),
      h("h2", { className: "sec" }, "Ritme umum"),
      h("div", { className: "tbl-wrap" }, h("table", { className: "t" }, h("tbody", null,
        [["Antar item inline", "spacing-md", "8px"], ["Antar field form", "spacing-lg", "12px"], ["Padding kartu", "spacing-3xl", "24px"], ["Antar section produk", "spacing-4xl", "32px"], ["Padding section marketing", "spacing-7xl – 9xl", "64–96px"]].map(function (r) { return h("tr", { key: r[0] }, h("td", null, r[0]), h("td", { className: "n" }, r[1]), h("td", { className: "v" }, r[2])); })))));
  }
  function Radius() {
    return h(F, null,
      h(PH, { crumbs: [crumbHome, { label: "Foundations", href: "#colors" }, { label: "Radius" }], eyebrow: "Foundations", title: "Radius", lead: "radius-md untuk tombol dan input, radius-xl untuk kartu dan popover, radius-2xl untuk modal, radius-full untuk pill, avatar, dan toggle." }),
      h("div", { className: "rad-grid" }, DS.radius.map(function (r) { return h("div", { key: r[0], className: "rad reveal" }, h("div", { className: "box", style: { borderRadius: "var(--" + r[0] + ")" } }), h("b", null, r[0] + " · " + r[1]), h("small", null, r[2])); })));
  }
  function Elevation() {
    return h(F, null,
      h(PH, { crumbs: [crumbHome, { label: "Foundations", href: "#colors" }, { label: "Elevasi" }], eyebrow: "Foundations", title: "Elevasi", lead: "Tujuh token bayangan, dari shadow-xs sampai shadow-3xl. Naikkan elemen hanya setinggi ia mengambang. Di mode gelap bayangan menjadi none; pisahkan permukaan dengan border." }),
      h("div", { className: "sh-grid" }, DS.shadow.map(function (s) { return h("div", { key: s[0], className: "sh", style: { boxShadow: "var(--" + s[0] + ")" } }, h("b", null, s[0]), h("small", null, s[2])); })));
  }
  function Layout() {
    return h(F, null,
      h(PH, { crumbs: [crumbHome, { label: "Foundations", href: "#colors" }, { label: "Layout & grid" }], eyebrow: "Foundations", title: "Layout & grid", lead: "Container maksimal 1280px dengan gutter 16px di mobile dan 32px di desktop. Lebar tetap untuk overlay dan kolom diambil dari skala width." }),
      h("div", { className: "tbl-wrap" }, h("table", { className: "t" }, h("thead", null, h("tr", null, h("th", null, "Token"), h("th", null, "Nilai"), h("th", null, "Penggunaan"))),
        h("tbody", null, DS.width.concat(DS.spacing.filter(function (s) { return s[0].indexOf("container") === 0; })).map(function (s) { return h("tr", { key: s[0] }, h("td", { className: "n" }, s[0]), h("td", { className: "v" }, s[1]), h("td", null, s[2])); })))));
  }

  /* ---------------- Themes ---------------- */
  function Themes(p) {
    return h(F, null,
      h(PH, { crumbs: [crumbHome, { label: "Tema & brand" }], eyebrow: "Mulai", title: "Tema & brand", lead: "Enam tema produk adalah tema terang yang hanya mengganti token yang bergantung pada brand. Semua token lain diwarisi dari light. Dark memakai navy korporat." }),
      h("div", { className: "theme-cards" }, THEMES.map(function (t) {
        return h("div", { key: t[0], className: "tcard reveal", "data-theme": t[0] },
          h("div", { className: "tc-head" }, h("b", null, t[1]), h("code", null, 'data-theme="' + t[0] + '"')),
          h("div", { className: "tc-body" },
            row(C("Button", { size: "sm" }, "Lamar"), C("Button", { size: "sm", hierarchy: "secondary" }, "Simpan"), C("Badge", { color: "brand" }, "Baru")),
            C("Input", { size: "sm", placeholder: "Cari lowongan", iconLeading: I.search() }),
            row(C("Toggle", { defaultChecked: true, label: "Notifikasi" }), C("Checkbox", { defaultChecked: true, label: "Remote" })),
            C("ProgressBar", { value: 64, label: "right" }),
            C("Button", { size: "sm", hierarchy: "link-color", onClick: function () { p.setTheme(t[0]); } }, p.theme === t[0] ? "Tema aktif" : "Pakai tema ini")));
      })),
      h("h2", { className: "sec" }, "Catatan kontras"),
      h("div", { className: "prose" },
        h("p", null, "Pink Jobseeker App (", h("code", null, "app-600"), ") terlalu terang untuk teks putih: 3,6:1. Di tema App, set label tombol 16px semibold atau lebih besar, dan pakai ", h("code", null, "text-brand-secondary"), " untuk teks brand."),
        h("p", null, h("code", null, "text-warning-primary"), " (3,5:1) dan ", h("code", null, "text-success-primary"), " (3,9:1) di atas bg-primary berada di bawah 4,5:1. Pakai untuk teks 18px+ atau semibold, atau pasangkan dengan ikon."),
        h("p", null, "Di mode dark, ", h("code", null, "focus-ring"), " berwarna navy di atas latar hampir hitam (1,2:1). Gambar focus ring dengan offset 2px pada cincin dalam yang terang.")));
  }

  /* ---------------- Components index & page ---------------- */
  function CompCard(p) {
    var c = p.c, d = DEMOS[c.name];
    return h("a", { href: "#c-" + c.name, className: "ccard reveal", style: catVars(c.cat) },
      h("div", { className: "thumb", "aria-hidden": "true" }, d && d.thumb ? h("div", { className: "sc", inert: "" }, h(Safe, { k: c.name }, d.thumb())) : h("span", { className: "glyph" }, c.name.replace(/[a-z]/g, "").slice(0, 2) || c.name.slice(0, 2))),
      h("div", { className: "body" }, h("span", { className: "ccat" }, CAT_ID[c.cat] || c.cat), h("b", null, c.name), h("p", null, c.summary)));
  }
  function CompIndex() {
    var f = useState("all"), q = useState("");
    var cats = CAT_ORDER.filter(function (k) { return byCat[k]; });
    var list = comps.filter(function (c) { return (f[0] === "all" || c.cat === f[0]) && (!q[0] || (c.name + " " + c.summary).toLowerCase().indexOf(q[0].toLowerCase()) >= 0); });
    var groups = cats.filter(function (k) { return f[0] === "all" || k === f[0]; });
    return h(F, null,
      h(PH, { crumbs: [crumbHome, { label: "Komponen" }], eyebrow: "Komponen", title: "Semua komponen", lead: comps.length + " komponen React dari bundle window.Jobseeker. " + demoCount + " di antaranya punya pratinjau langsung; sisanya sub-komponen dengan referensi props lengkap." }),
      h("div", { style: { maxWidth: 400, marginBottom: 16 } }, C("Input", { id: "comp-filter", placeholder: "Filter nama atau deskripsi", iconLeading: I.filter(), value: q[0], onChange: function (e) { q[1](e.target.value); }, "aria-label": "Filter komponen" })),
      h("div", { className: "filter-row", role: "group", "aria-label": "Kategori" },
        h("button", { className: "fchip" + (f[0] === "all" ? " on" : ""), onClick: function () { f[1]("all"); } }, "Semua"),
        cats.map(function (k) { return h("button", { key: k, style: catVars(k), className: "fchip cat" + (f[0] === k ? " on" : ""), onClick: function () { f[1](k); } }, (CAT_ID[k] || k) + " · " + byCat[k].length); })),
      list.length === 0 ? C("EmptyState", { title: "Tidak ada komponen yang cocok", description: "Coba kata kunci lain atau pilih kategori Semua.", actions: [{ label: "Reset filter", hierarchy: "secondary", onClick: function () { q[1](""); f[1]("all"); } }] }) :
      groups.map(function (k) {
        var l = list.filter(function (c) { return c.cat === k; });
        if (!l.length) return null;
        return h("section", { key: k, style: catVars(k) }, h("h2", { className: "sec" }, h("span", { className: "cdot lg" }), CAT_ID[k] || k), h("p", { className: "sub" }, l.length + " komponen"), h("div", { className: "cgrid" }, l.map(function (c) { return h(CompCard, { key: c.name, c: c }); })));
      }));
  }
  function PropsTables(p) {
    var c = p.c;
    if (!c.tables.length) return h("p", { className: "sub" }, "Tidak ada props khusus.");
    return h(F, null, c.tables.map(function (t, i) {
      return h("section", { key: i }, h("h3", { className: "ssec" }, h("code", { className: "chip" }, t.title)),
        h("div", { className: "tbl-wrap" }, h("table", { className: "t" }, h("thead", null, h("tr", null, h("th", null, "Prop"), h("th", null, "Tipe"), h("th", null, "Catatan"))),
          h("tbody", null, t.rows.map(function (r) { return h("tr", { key: r[0] }, h("td", { className: "n" }, r[0], r[3] ? h("span", { className: "req", title: "Wajib" }, "*") : null), h("td", { className: "v" }, r[1]), h("td", null, r[2].replace(/`/g, ""))); })))));
    }), c.also ? h("p", { className: "sub", style: { marginTop: 16, fontSize: 14 } }, "Juga menerima: ", h("code", { className: "chip" }, c.also)) : null);
  }
  function CompPage(p) {
    var c = p.c, d = DEMOS[c.name];
    var tab = useState("preview");
    var bg = useState("dots");
    useEffect(function () { tab[1]("preview"); }, [c.name]);
    var idx = comps.indexOf(c), prev = comps[idx - 1], next = comps[idx + 1];
    var tabs = [{ value: "preview", label: "Pratinjau" }, { value: "props", label: "Props", badge: String(c.tables.reduce(function (a, t) { return a + t.rows.length; }, 0)) }, { value: "code", label: "Kode" }];
    var body;
    if (tab[0] === "preview") {
      body = h(F, null,
        h("div", { className: "canvas" },
          h("div", { className: "canvas-bar" }, h("span", null, "Jobseeker." + c.name + " · tema " + (THEMES.filter(function (t) { return t[0] === p.theme; })[0] || THEMES[0])[1]),
            h("div", { className: "seg", role: "group", "aria-label": "Latar pratinjau" }, h("button", { className: bg[0] === "dots" ? "on" : "", onClick: function () { bg[1]("dots"); } }, "Grid"), h("button", { className: bg[0] === "plain" ? "on" : "", onClick: function () { bg[1]("plain"); } }, "Polos"))),
          h("div", { className: "stage" + (bg[0] === "plain" ? " plain" : "") }, h(Safe, { k: c.name + p.theme }, d && d.full ? d.full() : h("div", { className: "no-demo" }, C("FeaturedIcon", { icon: I.code(), color: "gray", type: "modern", size: "lg" }), h("b", null, "Sub-komponen"), h("span", null, "Komponen ini dipakai di dalam komponen lain. Lihat tab Props dan Kode untuk cara pakainya."))))),
        d && (d.dos || d.donts) ? h(F, null, h("h2", { className: "sec" }, "Pedoman"), h("div", { className: "dodont" },
          h("div", { className: "dd do" }, h("div", { className: "dd-top" }, I.check(16), "Lakukan"), (d.dos || []).map(function (t, i) { return h("p", { key: i }, t); })),
          h("div", { className: "dd dont" }, h("div", { className: "dd-top" }, I.x(16), "Hindari"), (d.donts || []).map(function (t, i) { return h("p", { key: i }, t); })))) : null);
    } else if (tab[0] === "props") body = h(PropsTables, { c: c });
    else body = h(F, null, h("h3", { className: "ssec" }, "React"), h(Snip, { code: "const { " + c.name + " } = window.Jobseeker;\n\n" + c.jsx.replace("Jobseeker." + c.name, c.name).replace("Jobseeker." + c.name, c.name) }),
      h("h3", { className: "ssec" }, "Kanvas desain"), h(Snip, { lang: "plain", code: '<x-import component-from-global-scope="Jobseeker.' + c.name + '"></x-import>' }));
    return h("div", { style: catVars(c.cat), className: "cpage" },
      h(PH, { crumbs: [crumbHome, { label: "Komponen", href: "#components" }, { label: CAT_ID[c.cat] || c.cat, href: "#components" }, { label: c.name }], eyebrow: CAT_ID[c.cat] || c.cat, title: c.name, lead: c.summary,
        meta: [C("Badge", { key: 1, color: d ? "success" : "gray", dot: true, size: "md" }, d ? "Pratinjau langsung" : "Referensi props"), C("Badge", { key: 2, color: "gray", size: "md", type: "modern" }, "Jobseeker." + c.name)] }),
      C("Tabs", { type: "underline", items: tabs, value: tab[0], onChange: tab[1], panels: false, mobile: "scroll", id: "comp-tabs" }),
      h("div", { style: { marginTop: 24 } }, body),
      h("div", { style: { display: "flex", justifyContent: "space-between", gap: 12, marginTop: 48, flexWrap: "wrap" } },
        prev ? C("Button", { hierarchy: "secondary", href: "#c-" + prev.name }, "← " + prev.name) : h("span"),
        next ? C("Button", { hierarchy: "secondary", href: "#c-" + next.name }, next.name + " →") : h("span")));
  }

  ReactDOM.createRoot(document.getElementById("app")).render(h(App));
})();
