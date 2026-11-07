/* ¿DÓNDE ESTÁ? · interfaz · HECHO POR @BYALVARO__ */
(function () {
  "use strict";
  const { db, AI, DEMO, newCode } = window.DE;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const COLORS = ["#8b5cf6", "#ef4444", "#f97316", "#f59e0b", "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6", "#ec4899", "#64748b"];
  const CACHE = "de_cache_v1";

  /* ---------- iconos ---------- */
  const P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    sparkles: '<path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    shelf: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    list: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="m3 6 1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17"/>',
    tag: '<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM21 14v.01M14 21h.01M17 21h4v-4"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
    settings: '<path d="M4 6h9M18 6h2M4 12h3M12 12h8M4 18h11M20 18h0"/><circle cx="15.5" cy="6" r="2.2"/><circle cx="9.5" cy="12" r="2.2"/><circle cx="17.5" cy="18" r="2.2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>', check: '<path d="m5 12 5 5L20 7"/>',
    edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    camera: '<path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/>',
    print: '<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M16 3.5a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>', upload: '<path d="M12 15V3M7 8l5-5 5 5M4 21h16"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/>',
    rotate: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 8.8-8.8M16 7l3 3M19 4l2 2"/>',
    move: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>'
  };
  const ic = (n, cls) => '<svg class="i ' + (cls || "") + '" viewBox="0 0 24 24">' + (P[n] || "") + "</svg>";

  /* ---------- estado ---------- */
  const S = {
    me: null, data: { shelves: [], boxes: [], items: [], notes: [], settings: {} },
    q: "", ai: null, aiLoading: false, mapEdit: false, mapSel: null, lblShelf: "all", lblSel: null, lblSize: "M", dirty: false
  };
  let IX = {};
  function index() {
    const d = S.data;
    IX = { shelf: {}, box: {}, boxByCode: {}, item: {}, itemsByBox: {}, boxesByShelf: {} };
    d.shelves.sort((a, b) => (a.created_at || "").localeCompare(b.created_at || ""));
    d.shelves.forEach(s => { IX.shelf[s.id] = s; IX.boxesByShelf[s.id] = []; });
    IX.boxesByShelf.none = [];
    d.boxes.forEach(b => { IX.box[b.id] = b; IX.boxByCode[b.code] = b; IX.itemsByBox[b.id] = []; (IX.boxesByShelf[b.shelf_id] || IX.boxesByShelf.none).push(b); });
    Object.values(IX.boxesByShelf).forEach(arr => arr.sort((a, b) => natCmp(a.label, b.label)));
    d.items.forEach(i => { IX.item[i.id] = i; (IX.itemsByBox[i.box_id] = IX.itemsByBox[i.box_id] || []).push(i); });
  }
  const natCmp = (a, b) => String(a).localeCompare(String(b), "es", { numeric: true, sensitivity: "base" });
  function saveCache() { try { localStorage.setItem(CACHE, JSON.stringify({ me: S.me, data: S.data })); } catch (e) { } }
  const isAdmin = () => S.me && S.me.role === "admin";
  const meName = () => (S.me && (S.me.name || S.me.username)) || "?";
  const shelfColor = s => (s && s.color) || "#64748b";
  const boxColor = b => (b && b.color) || shelfColor(IX.shelf[b && b.shelf_id]);

  /* ---------- texto / búsqueda ---------- */
  const strip = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function tokens(q) { return strip(q).split(/[\s,.;]+/).filter(t => t.length > 0); }
  function tokMatch(hay, t) {
    if (hay.includes(t)) return true;
    if (t.length > 4 && t.endsWith("es") && hay.includes(t.slice(0, -2))) return true;
    if (t.length > 3 && t.endsWith("s") && hay.includes(t.slice(0, -1))) return true;
    return false;
  }
  function localSearch(q) {
    const tk = tokens(q); if (!tk.length) return null;
    const items = [], boxes = [], shelves = [];
    for (const it of S.data.items) {
      const b = IX.box[it.box_id], s = b && IX.shelf[b.shelf_id];
      const name = strip(it.name), hay = name + " " + strip(it.description) + " " + strip(b && b.label) + " " + strip(b && b.notes) + " " + strip(s && s.name);
      if (tk.every(t => tokMatch(hay, t))) {
        let sc = 0; tk.forEach(t => { if (name.startsWith(t)) sc += 5; else if (name.includes(t)) sc += 3; else sc += 1; });
        if (it.qty <= 0) sc -= 2;
        items.push({ it, sc });
      }
    }
    for (const b of S.data.boxes) {
      const s = IX.shelf[b.shelf_id], hay = strip(b.label) + " " + strip(b.notes) + " " + strip(b.code) + " " + strip(s && s.name);
      if (tk.every(t => tokMatch(hay, t))) boxes.push(b);
    }
    for (const s of S.data.shelves) if (tk.every(t => tokMatch(strip(s.name), t))) shelves.push(s);
    items.sort((a, b) => b.sc - a.sc || natCmp(a.it.name, b.it.name));
    return { items: items.map(x => x.it), boxes, shelves };
  }
  const STOP = new Set("sacar coger buscar comprar traer meter para el la los las del de un una unos unas que y o en con por al mi mis tu su lo".split(" "));
  function guessItem(text) {
    const tk = tokens(text).filter(t => t.length > 2 && !STOP.has(t)); if (!tk.length) return null;
    let best = null, bs = 0;
    for (const it of S.data.items) { const hay = strip(it.name) + " " + strip(it.description); let sc = 0; tk.forEach(t => { if (tokMatch(hay, t)) sc++; }); if (sc > bs) { bs = sc; best = it; } }
    return best;
  }
  function hl(text, q) {
    const tk = tokens(q).filter(t => t.length > 1); text = String(text || "");
    if (!tk.length) return esc(text);
    let norm = "", map = [];
    for (let i = 0; i < text.length; i++) { const c = strip(text[i]); for (const ch of c) { norm += ch; map.push(i); } if (!c.length) { } }
    const marks = new Array(text.length).fill(false);
    tk.forEach(t => { let p = norm.indexOf(t); while (p >= 0) { for (let k = p; k < p + t.length; k++) marks[map[k]] = true; p = norm.indexOf(t, p + 1); } });
    let out = "", on = false;
    for (let i = 0; i < text.length; i++) { if (marks[i] && !on) { out += "<mark>"; on = true; } if (!marks[i] && on) { out += "</mark>"; on = false; } out += esc(text[i]); }
    return out + (on ? "</mark>" : "");
  }

  /* ---------- utilidades UI ---------- */
  function toast(msg, opt) {
    opt = opt || {};
    const el = document.createElement("div");
    el.className = "toast" + (opt.err ? " err" : "");
    el.innerHTML = (opt.wait ? '<span class="spin" style="width:16px;height:16px;border-width:2px"></span>' : opt.err ? ic("info") : ic("check")) + "<span>" + esc(msg) + "</span>" + (opt.undo ? '<button>Deshacer</button>' : "");
    if (opt.undo) el.querySelector("button").onclick = () => { opt.undo(); el.remove(); };
    $("#toasts").appendChild(el);
    setTimeout(() => el.remove(), opt.wait ? 30000 : opt.undo ? 5000 : 2600);
    return el;
  }
  const fail = e => { console.error(e); toast(e.message || String(e), { err: true }); };

  let modalStack = [];
  function openModal(o) {
    const ov = document.createElement("div"); ov.className = "overlay";
    ov.innerHTML = '<div class="modal ' + (o.wide ? "wide" : "") + '" role="dialog"><div class="modal-h"><h2>' + o.title + '</h2><button class="btn icon sm ghost" data-close>' + ic("x") + '</button></div><div class="modal-b">' + (o.body || "") + "</div>" + (o.foot ? '<div class="modal-f">' + o.foot + "</div>" : "") + "</div>";
    const close = () => { ov.remove(); modalStack = modalStack.filter(m => m !== ov); if (o.onClose) o.onClose(); if (!modalStack.length && S.dirty) { S.dirty = false; renderView(); } };
    ov.addEventListener("mousedown", e => { if (e.target === ov) ov._down = true; });
    ov.addEventListener("click", e => { if (e.target === ov && ov._down) close(); ov._down = false; if (e.target.closest("[data-close]")) close(); });
    document.body.appendChild(ov); modalStack.push(ov);
    ov.close = close;
    if (o.onMount) o.onMount(ov, close);
    const f = ov.querySelector("[autofocus]"); if (f && matchMedia("(min-width:621px)").matches) setTimeout(() => f.focus(), 50);
    return ov;
  }
  function confirmDlg(title, text, okLabel, danger) {
    return new Promise(res => {
      let ok = false;
      openModal({
        title: esc(title), body: '<p class="muted" style="margin:0">' + text + "</p>",
        foot: '<button class="btn ghost" data-close>Cancelar</button><button class="btn ' + (danger ? "danger" : "pri") + '" data-ok>' + esc(okLabel || "Aceptar") + "</button>",
        onMount: (ov, close) => { ov.querySelector("[data-ok]").onclick = () => { ok = true; close(); }; },
        onClose: () => res(ok)
      });
    });
  }
  function swatches(sel, allowNone) {
    return '<div class="swatches">' + (allowNone ? '<button type="button" data-c="" class="' + (!sel ? "on" : "") + '" style="--c:conic-gradient(#8b5cf6,#22d3ee,#ec4899,#8b5cf6)" title="Color de la estantería"></button>' : "") +
      COLORS.map(c => '<button type="button" data-c="' + c + '" class="' + (sel === c ? "on" : "") + '" style="--c:' + c + '"></button>').join("") + "</div>";
  }
  function bindSwatches(root) { let val = (root.querySelector(".swatches .on") || {}).dataset?.c || ""; $$(".swatches button", root).forEach(b => b.onclick = () => { $$(".swatches button", root).forEach(x => x.classList.remove("on")); b.classList.add("on"); val = b.dataset.c; }); return () => val; }

  function loc(b, small) {
    if (!b) return '<span class="chip">Sin caja</span>';
    const s = IX.shelf[b.shelf_id], c = boxColor(b);
    return '<span class="loc" role="link" data-go="#/c/' + esc(b.code) + '" style="cursor:pointer"><span class="s"><i class="sw chip" style="background:' + shelfColor(s) + ';width:9px;height:9px;padding:0;border:0;border-radius:50%"></i>' + esc(s ? s.name : "Sin estantería") + '</span><span class="b" style="background:' + c + '">' + esc(b.label) + "</span></span>";
  }
  // Fotos: en la nube se guardan como "photo:<id>" y se cargan aparte (rápido y gratis)
  function imgTag(url, attrs) {
    if (!url) return "";
    const ready = db.cachedPhoto ? db.cachedPhoto(url) : url;
    return ready ? '<img src="' + esc(ready) + '" ' + (attrs || "") + ' alt="">' : '<img data-photo="' + esc(url) + '" ' + (attrs || "") + ' alt="">';
  }
  function hydratePhotos(root) {
    $$("img[data-photo]", root || document).forEach(im => {
      const u = im.getAttribute("data-photo"); im.removeAttribute("data-photo");
      Promise.resolve(db.getPhoto ? db.getPhoto(u) : u).then(src => { if (src) im.src = src; });
    });
  }
  new MutationObserver(() => { if (document.querySelector("img[data-photo]")) hydratePhotos(); }).observe(document.body, { childList: true, subtree: true });
  function thumb(it) { return it.photo_url ? imgTag(it.photo_url, 'loading="lazy"') : esc((it.name || "?").trim()[0] || "?").toUpperCase(); }

  /* ---------- imágenes ---------- */
  function loadImage(file) { return new Promise((res, rej) => { const u = URL.createObjectURL(file), im = new Image(); im.onload = () => { URL.revokeObjectURL(u); res(im); }; im.onerror = () => rej(new Error("No se pudo leer la imagen")); im.src = u; }); }
  async function compress(file, max, q) {
    const im = await loadImage(file); const k = Math.min(1, max / Math.max(im.width, im.height));
    const c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
    c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
    const url = c.toDataURL("image/jpeg", q || 0.82);
    const blob = await new Promise(r => c.toBlob(r, "image/jpeg", q || 0.82));
    return { blob, url, b64: url.split(",")[1], mime: "image/jpeg" };
  }
  function pickFile(capture) {
    return new Promise(res => { const i = document.createElement("input"); i.type = "file"; i.accept = "image/*"; if (capture) i.capture = "environment"; i.onchange = () => res(i.files[0] || null); i.click(); });
  }
  async function uploadPhoto(file) {
    let img = await compress(file, 900, 0.72);
    if (img.url.length > 900000) img = await compress(file, 640, 0.6);
    return await db.uploadPhoto(img.blob);
  }

  /* ---------- mutaciones ---------- */
  function setRow(t, row) { const arr = S.data[t]; const i = arr.findIndex(x => x.id === row.id); if (i >= 0) arr[i] = row; else arr.push(row); index(); saveCache(); }
  function dropRow(t, id) {
    S.data[t] = S.data[t].filter(x => x.id !== id);
    if (t === "boxes") { const gone = new Set(S.data.items.filter(i => i.box_id === id).map(i => i.id)); S.data.items = S.data.items.filter(i => i.box_id !== id); S.data.notes.forEach(n => { if (gone.has(n.item_id)) n.item_id = null; }); }
    if (t === "shelves") S.data.boxes.forEach(b => { if (b.shelf_id === id) b.shelf_id = null; });
    if (t === "items") S.data.notes.forEach(n => { if (n.item_id === id) n.item_id = null; });
    index(); saveCache();
  }
  async function ins(t, row) { const r = await db.insert(t, row); setRow(t, r); return r; }
  async function upd(t, id, patch) { if (t === "items" || t === "boxes") patch.updated_at = new Date().toISOString(); const r = await db.update(t, id, patch); setRow(t, r); return r; }
  async function del(t, id) { await db.remove(t, id); dropRow(t, id); }

  /* ---------- arranque ---------- */
  async function boot() {
    if (DEMO) {
      $("#app").innerHTML = '<div class="auth"><div class="auth-card stack" style="text-align:center"><div class="brand"><span class="logo">' + ic("box") + '</span><span>¿Dónde está?</span></div>' +
        '<div class="err-box">Falta conectar la base de datos.</div><p class="muted" style="margin:0">Pega la configuración de tu proyecto de Firebase en <b>js/config.js</b> (README, paso 4) y recarga la página.</p><div class="byline">HECHO POR <span>@BYALVARO__</span></div></div></div>';
      return;
    }
    try { const c = JSON.parse(localStorage.getItem(CACHE)); if (c && c.me && c.data) { S.me = c.me; S.data = c.data; index(); render(); } } catch (e) { }
    try {
      S.me = await db.session();
      if (S.me && S.me.role !== "pendiente") { S.data = await db.loadAll(); index(); saveCache(); }
      render();
      db.onChange(liveReload);
    } catch (e) {
      if (!S.me) { $("#app").innerHTML = '<div class="auth"><div class="auth-card"><div class="err-box">No se pudo conectar: ' + esc(e.message) + '</div><p class="muted">Revisa la configuración de Firebase en js/config.js y tu conexión.</p><button class="btn pri" onclick="location.reload()">Reintentar</button></div></div>'; }
      else fail(e);
    }
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && S.me) reload(); });
    window.addEventListener("hashchange", () => { S.mapSel = null; renderView(); window.scrollTo(0, 0); });
  }
  function debounce(fn, ms) { let t; return () => { clearTimeout(t); t = setTimeout(fn, ms); }; }
  const liveReload = debounce(() => reload(), 400);
  async function reload() {
    if (!S.me) return;
    try {
      const me = await db.session(); if (!me) { S.me = null; render(); return; }
      const roleChanged = me.role !== S.me.role; S.me = me;
      if (me.role === "pendiente") { render(); return; }
      S.data = await db.loadAll(); index(); saveCache();
      if (roleChanged) return render();
      const a = document.activeElement;
      if (modalStack.length || (a && /INPUT|TEXTAREA|SELECT/.test(a.tagName))) S.dirty = true; else renderView(true);
    } catch (e) { console.warn(e); }
  }

  /* ---------- render ---------- */
  function route() { const h = location.hash.replace(/^#\/?/, ""); const [p, a] = h.split("?")[0].split("/"); return { p: p || "", a: a ? decodeURIComponent(a) : "" }; }
  function render() {
    if (!S.me) return renderAuth();
    if (S.me.role === "pendiente") return renderPending();
    const r = route(), pend = S.data.notes.filter(n => !n.done).length;
    const nav = [["", "home", "Inicio"], ["plano", "map", "Plano del bajo"], ["sacar", "list", "Para sacar", pend], ["etiquetas", "qr", "Etiquetas QR"], ["ajustes", "settings", "Ajustes"]];
    $("#app").innerHTML =
      '<div class="shell"><aside class="side">' + brand() +
      '<button class="nav-a" data-act="scan" style="background:var(--grad);color:#fff;margin-bottom:8px">' + ic("scan") + "Escanear QR</button>" +
      nav.map(n => '<a class="nav-a" data-nav="' + n[0] + '" href="#/' + n[0] + '">' + ic(n[1]) + n[2] + (n[3] ? '<span class="count">' + n[3] + "</span>" : "") + "</a>").join("") +
      '<div class="grow"></div><div class="me"><div class="avatar">' + esc(meName()[0].toUpperCase()) + '</div><div style="flex:1;min-width:0"><b>' + esc(meName()) + "</b><span>" + (isAdmin() ? "Administrador" : "Usuario") + '</span></div><button class="btn icon sm ghost" title="Cerrar sesión" data-act="logout">' + ic("logout") + '</button></div><div class="byline">HECHO POR <span>@BYALVARO__</span></div></aside>' +
      '<div class="topbar">' + brand() + '<div class="sp"></div><a class="btn icon sm ghost" href="#/etiquetas" title="Etiquetas QR">' + ic("qr") + '</a><a class="btn icon sm ghost" href="#/ajustes" title="Ajustes">' + ic("settings") + "</a></div>" +
      '<main class="main" id="view"></main></div>' +
      '<nav class="bottomnav"><a data-nav="" href="#/">' + ic("home") + 'Inicio</a><a data-nav="plano" href="#/plano">' + ic("map") + 'Plano</a><button class="scan" data-act="scan" aria-label="Escanear QR">' + ic("scan") + '</button><a data-nav="sacar" href="#/sacar">' + ic("list") + "Sacar" + (pend ? '<i class="dot"></i>' : "") + '</a><a data-nav="etiquetas" href="#/etiquetas">' + ic("qr") + "Etiquetas</a></nav>";
    renderView();
  }
  function brand() { return '<a class="brand" href="#/"><span class="logo">' + ic("box") + "</span><span>¿Dónde está?</span></a>"; }
  function renderView(soft) {
    if (!S.me || S.me.role === "pendiente") return render();
    const v = $("#view"); if (!v) return render();
    const r = route();
    $$("[data-nav]").forEach(a => a.classList.toggle("on", a.dataset.nav === r.p || (r.p === "e" || r.p === "c") && a.dataset.nav === ""));
    const pend = S.data.notes.filter(n => !n.done).length;
    $$('.nav-a[data-nav="sacar"] .count, .bottomnav .dot').forEach(x => x.remove());
    if (pend) { const a = $('.nav-a[data-nav="sacar"]'); if (a) a.insertAdjacentHTML("beforeend", '<span class="count">' + pend + "</span>"); const b = $('.bottomnav [data-nav="sacar"]'); if (b) b.insertAdjacentHTML("beforeend", '<i class="dot"></i>'); }
    const views = { "": vHome, e: vShelf, c: vBox, plano: vMap, sacar: vNotes, etiquetas: vLabels, ajustes: vSettings };
    const fn = views[r.p] || vHome;
    v.innerHTML = fn(r.a) + '<div class="foot-by">HECHO POR <span>@BYALVARO__</span></div>';
    const after = AFTER[r.p || "home"]; if (after) after(r.a, soft);
  }
  const AFTER = {};

  /* ================= AUTH ================= */
  function renderAuth(mode) {
    mode = mode || "in";
    $("#app").innerHTML = '<div class="auth"><form class="auth-card stack" autocomplete="on">' +
      '<div class="brand"><span class="logo">' + ic("box") + '</span><span>¿Dónde está?<small style="font-size:13px;margin-top:4px">Todo lo de tu bajo, a un toque</small></span></div>' +
      '<div class="tabs"><button type="button" class="' + (mode === "in" ? "on" : "") + '" data-m="in">Entrar</button><button type="button" class="' + (mode === "up" ? "on" : "") + '" data-m="up">Crear cuenta</button></div>' +
      '<div class="field"><label>Usuario</label><input class="inp" name="username" autocomplete="username" autocapitalize="none" required placeholder="p. ej. alvaro"></div>' +
      '<div class="field"><label>Contraseña</label><input class="inp" type="password" name="password" autocomplete="' + (mode === "in" ? "current-password" : "new-password") + '" required minlength="6" placeholder="Mínimo 6 caracteres"></div>' +
      (mode === "up" ? '<p class="hint" style="margin:0">Las cuentas nuevas tienen que ser aprobadas por el administrador (ByAlvaro).</p>' : "") +
      '<div class="err-box hidden"></div><button class="btn pri" style="height:50px">' + (mode === "in" ? "Entrar" : "Crear cuenta") + '</button>' +
      '<div class="byline">HECHO POR <span>@BYALVARO__</span></div></form></div>';
    const f = $(".auth-card");
    $$("[data-m]", f).forEach(b => b.onclick = () => renderAuth(b.dataset.m));
    f.onsubmit = async e => {
      e.preventDefault();
      const btn = f.querySelector(".btn.pri"), er = f.querySelector(".err-box");
      btn.disabled = true; er.classList.add("hidden");
      try {
        const u = f.username.value, p = f.password.value;
        S.me = mode === "in" ? await db.signIn(u, p) : await db.signUp(u, p);
        if (S.me && S.me.role !== "pendiente") { S.data = await db.loadAll(); index(); saveCache(); }
        db.onChange(liveReload);
        render();
      } catch (err) { er.textContent = err.message; er.classList.remove("hidden"); btn.disabled = false; }
    };
  }
  function renderPending() {
    $("#app").innerHTML = '<div class="auth"><div class="auth-card stack" style="text-align:center"><div class="brand"><span class="logo">' + ic("users") + '</span><span>Casi listo, ' + esc(meName()) + '</span></div>' +
      '<p class="muted" style="margin:0">Tu cuenta está <b>esperando aprobación</b>. Pide al administrador que te apruebe en <b>Ajustes → Usuarios</b>.</p>' +
      '<button class="btn pri" data-act="recheck">Ya me ha aprobado</button><button class="btn ghost" data-act="logout">Cerrar sesión</button><div class="byline">HECHO POR <span>@BYALVARO__</span></div></div></div>';
  }

  /* ================= INICIO ================= */
  function vHome() {
    const d = S.data, nItems = d.items.reduce((a, i) => a + (i.qty > 0 ? 1 : 0), 0);
    const pend = d.notes.filter(n => !n.done);
    return '<section class="hero"><h1>¿Qué estás <em>buscando</em>?</h1><p>Escribe lo que sea. Sin tildes ni mayúsculas, da igual cómo lo pongas.</p>' +
      '<div class="search">' + ic("search") + '<input id="q" type="search" enterkeyhint="search" autocomplete="off" placeholder="p. ej. linterna, cables, navidad…" value="' + esc(S.q) + '">' +
      '<button class="btn icon sm ghost x ' + (S.q ? "" : "hidden") + '" data-act="clearq" aria-label="Borrar">' + ic("x") + '</button>' +
      '<button class="aibtn ' + (S.aiLoading ? "loading" : "") + '" data-act="aisearch" title="Buscar con IA: describe lo que necesitas">' + ic("sparkles") + "<span>Buscar con IA</span></button></div>" +
      '<div class="stats"><div class="stat">' + ic("shelf") + "<b>" + d.shelves.length + "</b><span>estanterías</span></div><div class=\"stat\">" + ic("box") + "<b>" + d.boxes.length + "</b><span>cajas</span></div><div class=\"stat\">" + ic("tag") + "<b>" + nItems + "</b><span>objetos</span></div></div></section>" +
      '<div id="results"></div><div id="homebody">' +
      (!d.shelves.length && !d.boxes.length ? '<section class="sec welcome"><h2>Empieza en 3 pasos</h2><div class="steps"><div class="stepc"><b>1</b><span>Crea una estantería<small>«Estantería 1», «Roja», «Metálica»…</small></span></div><div class="stepc"><b>2</b><span>Añade sus cajas<small>Con número, letra o texto</small></span></div><div class="stepc"><b>3</b><span>Apunta lo que hay dentro<small>Escribiendo o con una foto (IA)</small></span></div></div><button class="btn pri" data-act="newshelf" style="height:50px;margin-top:6px">' + ic("plus") + "Crear mi primera estantería</button></section>" : "") +
      (pend.length ? '<section class="sec"><div class="sec-h"><h2>Para sacar · ' + pend.length + '</h2><a class="btn sm ghost" href="#/sacar">Ver lista</a></div><div class="stack" style="gap:8px">' + pend.slice(0, 3).map(noteRow).join("") + "</div></section>" : "") +
      '<section class="sec"><div class="sec-h"><h2>Estanterías</h2><a class="btn sm ghost" href="#/plano">' + ic("map") + "Ver plano</a></div><div class=\"shelves\">" +
      d.shelves.map(shelfCard).join("") +
      (IX.boxesByShelf.none.length ? shelfCard({ id: "none", name: "Cajas sin estantería", color: "#475569" }) : "") +
      '<button class="shelf add" data-act="newshelf"><span class="ic">' + ic("plus") + "</span>Nueva estantería</button></div></section></div>";
  }
  function shelfCard(s) {
    const bx = IX.boxesByShelf[s.id] || [];
    const n = bx.reduce((a, b) => a + (IX.itemsByBox[b.id] || []).length, 0);
    return '<a class="shelf" style="--c:' + shelfColor(s) + '" href="#/e/' + s.id + '"><div class="top"><span class="ic">' + ic("shelf") + '</span><div style="min-width:0"><h3>' + esc(s.name) + '</h3><div class="meta">' + bx.length + " caja" + (bx.length === 1 ? "" : "s") + " · " + n + " objeto" + (n === 1 ? "" : "s") + '</div></div></div><div class="minis">' +
      bx.slice(0, 8).map(b => '<span class="mini">' + esc(b.label) + "</span>").join("") + (bx.length > 8 ? '<span class="mini">+' + (bx.length - 8) + "</span>" : "") + "</div></a>";
  }
  AFTER.home = function () {
    const inp = $("#q");
    inp.addEventListener("input", () => { S.q = inp.value; S.ai = null; $(".search .x").classList.toggle("hidden", !S.q); renderResults(); });
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); const r = localSearch(S.q); if (S.q.trim() && r && !r.items.length && !r.boxes.length && !r.shelves.length) A.aisearch(); else inp.blur(); } });
    if (!matchMedia("(pointer:coarse)").matches && !S.q) inp.focus();
    renderResults();
  };
  function renderResults() {
    const box = $("#results"), body = $("#homebody"); if (!box) return;
    const q = S.q.trim();
    if (!q && !S.ai && !S.aiLoading) { box.innerHTML = ""; body.classList.remove("hidden"); return; }
    body.classList.add("hidden");
    let h = "";
    if (S.aiLoading) h += '<div class="ai-panel"><div class="ttl">' + ic("sparkles", "") + "Pensando qué puede ser «" + esc(q) + '»…</div><div class="shimmer" style="width:80%"></div><div class="shimmer" style="width:55%"></div><div class="shimmer" style="width:65%"></div></div>';
    else if (S.ai) {
      const a = S.ai;
      h += '<div class="ai-panel"><div class="row between"><div class="ttl">' + ic("sparkles") + 'Búsqueda con IA</div><button class="btn sm ghost" data-act="closeai">' + ic("x") + "</button></div>" +
        (a.interpretacion ? "<p>" + esc(a.interpretacion) + "</p>" : "") +
        (a.nombres.length ? '<div class="sugs">' + a.nombres.map(n => '<button class="chip" data-act="useq" data-q="' + esc(n) + '">' + ic("search") + esc(n) + "</button>").join("") + "</div>" : "") + "</div>";
      if (a.resultados.length) {
        h += '<div class="res-h">Lo que puede servirte · ' + a.resultados.length + '</div><div class="results" style="margin:0">' +
          a.resultados.map(r => { const it = IX.item[r.id]; return it ? itemRes(it, "", r.motivo) : ""; }).join("") + "</div>";
      } else h += '<div class="empty"><div class="big">' + ic("search") + "</div>La IA no ha encontrado nada parecido en tus cajas.</div>";
    }
    if (q && !S.ai && !S.aiLoading) {
      const r = localSearch(q);
      const total = r.items.length + r.boxes.length + r.shelves.length;
      if (!total) h += '<div class="empty"><div class="big">' + ic("sparkles") + '</div><h2 style="color:var(--text)">No hay nada llamado «' + esc(q) + '»</h2><p>Puede que lo guardaras con otro nombre. Describe lo que buscas y la IA lo encuentra.</p><button class="aibtn" data-act="aisearch" style="margin:auto">' + ic("sparkles") + "<span style=\"display:inline\">Buscar con IA</span></button></div>";
      else {
        const shelfIds = Array.from(new Set(r.items.map(i => IX.box[i.box_id] && IX.box[i.box_id].shelf_id).concat(r.boxes.map(b => b.shelf_id)).filter(Boolean)));
        if (r.items.length) h += '<div class="res-h">Objetos · ' + r.items.length + '</div><div class="results" style="margin:0">' + r.items.slice(0, 60).map(it => itemRes(it, q)).join("") + "</div>";
        if (r.boxes.length) h += '<div class="res-h">Cajas · ' + r.boxes.length + '</div><div class="results" style="margin:0">' + r.boxes.map(b => '<a class="res" href="#/c/' + esc(b.code) + '"><div class="th" style="background:' + boxColor(b) + ';color:#fff">' + ic("box") + '</div><div class="tx"><b>Caja ' + hl(b.label, q) + "</b><small>" + (IX.itemsByBox[b.id] || []).length + " objetos" + (b.notes ? " · " + hl(b.notes, q) : "") + "</small></div>" + loc(b) + "</a>").join("") + "</div>";
        if (r.shelves.length) h += '<div class="res-h">Estanterías</div><div class="results" style="margin:0">' + r.shelves.map(s => '<a class="res" href="#/e/' + s.id + '"><div class="th" style="background:' + shelfColor(s) + ';color:#fff">' + ic("shelf") + '</div><div class="tx"><b>' + hl(s.name, q) + "</b><small>" + (IX.boxesByShelf[s.id] || []).length + " cajas</small></div></a>").join("") + "</div>";
        if (shelfIds.length && S.data.shelves.length > 1) h += '<div class="res-h">En el plano</div><div class="map-mini">' + mapSVG({ hl: shelfIds, mini: true }) + "</div>";
        h += '<p class="muted" style="text-align:center;margin-top:18px">¿No es lo que buscabas? <button class="chip" data-act="aisearch">' + ic("sparkles") + "Prueba con IA</button></p>";
      }
    }
    box.innerHTML = h;
  }
  function itemRes(it, q, why) {
    const b = IX.box[it.box_id];
    return '<div class="res" data-act="openbox" data-code="' + esc(b ? b.code : "") + '" data-item="' + it.id + '"><div class="th">' + thumb(it) + '</div><div class="tx"><b>' + (q ? hl(it.name, q) : esc(it.name)) + '</b><small>' + (it.qty <= 0 ? "No queda ninguno" : "x" + it.qty) + (it.description ? " · " + (q ? hl(it.description, q) : esc(it.description)) : "") + "</small>" +
      (why ? '<div class="why">' + esc(why) + "</div>" : "") + '<div class="where">' + loc(b) + '</div></div><button class="btn icon sm" title="Añadir a «para sacar»" data-act="tonote" data-id="' + it.id + '">' + ic("list") + "</button></div>";
  }

  /* ================= ESTANTERÍA ================= */
  function vShelf(id) {
    const s = id === "none" ? { id: "none", name: "Cajas sin estantería", color: "#475569" } : IX.shelf[id];
    if (!s) return notFound("Esa estantería no existe");
    const bx = IX.boxesByShelf[s.id] || [];
    return '<div class="pagehead"><a class="btn icon" href="#/">' + ic("back") + '</a><span class="ic" style="width:46px;height:46px;border-radius:14px;background:' + shelfColor(s) + ';display:grid;place-items:center;box-shadow:0 8px 20px -8px ' + shelfColor(s) + '">' + ic("shelf") + '</span><div class="grow"><h1>' + esc(s.name) + "</h1><p>" + bx.length + " cajas</p></div>" +
      (s.id !== "none" ? '<a class="btn" href="#/plano">' + ic("map") + '<span>Plano</span></a><button class="btn" data-act="editshelf" data-id="' + s.id + '">' + ic("edit") + "Editar</button>" : "") +
      '<button class="btn pri" data-act="newbox" data-shelf="' + (s.id === "none" ? "" : s.id) + '">' + ic("plus") + "Caja</button></div>" +
      '<div class="boxes">' + bx.map(boxCard).join("") + '<button class="box add" data-act="newbox" data-shelf="' + (s.id === "none" ? "" : s.id) + '">' + ic("plus") + "Nueva caja</button></div>" +
      (s.id !== "none" && S.data.shelves.length > 1 ? '<section class="sec"><div class="sec-h"><h2>Dónde está en el bajo</h2></div><div class="map-mini">' + mapSVG({ hl: [s.id], mini: true }) + "</div></section>" : "");
  }
  function boxCard(b) {
    const its = IX.itemsByBox[b.id] || [];
    return '<a class="box" style="--c:' + boxColor(b) + '" href="#/c/' + esc(b.code) + '"><div class="lid"></div><div class="lab ' + (b.label.length > 6 ? "long" : "") + '">' + esc(b.label) + '</div><div class="cnt">' + its.length + " objeto" + (its.length === 1 ? "" : "s") + '</div><div class="prev">' + its.slice(0, 3).map(i => "<span>" + esc(i.name) + "</span>").join("") + (its.length > 3 ? '<span style="color:var(--dim)">y ' + (its.length - 3) + " más…</span>" : "") + "</div></a>";
  }

  /* ================= CAJA ================= */
  function vBox(code) {
    const b = IX.boxByCode[code];
    if (!b) return notFound("No hay ninguna caja con el código " + esc(code));
    const s = IX.shelf[b.shelf_id], its = (IX.itemsByBox[b.id] || []).slice().sort((x, y) => (y.qty > 0) - (x.qty > 0) || natCmp(x.name, y.name));
    return '<div class="pagehead" style="margin-bottom:14px"><a class="btn icon" href="' + (s ? "#/e/" + s.id : "#/e/none") + '">' + ic("back") + '</a><div class="grow"><span class="muted">' + esc(s ? s.name : "Sin estantería") + "</span></div></div>" +
      '<div class="bxhead"><div class="bxcard" style="--c:' + boxColor(b) + '"><div class="row between" style="align-items:flex-start"><div style="min-width:0"><div class="muted" style="font-weight:700;font-size:13px;margin-bottom:6px">CAJA</div><div class="big ' + (b.label.length > 6 ? "long" : "") + '">' + esc(b.label) + "</div></div>" +
      '<button class="qrmini" data-act="qr" data-id="' + b.id + '" title="Ver QR" style="width:64px;height:64px;border-radius:12px;overflow:hidden;background:#fff;flex:none;padding:4px">' + qrFor(b, 0) + "</button></div>" +
      (b.notes ? '<p style="margin:12px 0 0;color:#cdd3e3">' + esc(b.notes) + "</p>" : "") +
      '<div class="acts"><button class="btn sm" data-act="editbox" data-id="' + b.id + '">' + ic("edit") + 'Editar</button><button class="btn sm" data-act="qr" data-id="' + b.id + '">' + ic("qr") + 'QR</button><button class="btn sm" data-act="photoai" data-id="' + b.id + '">' + ic("camera") + "Rellenar con foto (IA)</button></div></div>" +
      '<div class="where-card"><div class="lbl">' + ic("pin") + " Dónde está</div>" + (s && S.data.shelves.length ? '<div class="map-mini">' + mapSVG({ hl: [s.id], mini: true }) + '</div><div class="row" style="justify-content:center">' + loc(b) + "</div>" : '<p class="muted" style="margin:0">Esta caja no está en ninguna estantería. Edítala para colocarla.</p>') + "</div></div>" +
      '<form class="addbar" id="addform"><input class="inp" id="addname" placeholder="Añadir objeto…" autocomplete="off" enterkeyhint="done"><input class="inp q" id="addqty" type="number" min="0" value="1" inputmode="numeric"><button class="btn icon" type="button" data-act="photoitem" data-id="' + b.id + '" title="Añadir objeto con foto">' + ic("camera") + '</button><button class="btn pri icon">' + ic("plus") + "</button></form>" +
      (its.length ? '<div class="items">' + its.map(itemRow).join("") + "</div>" : '<div class="empty"><div class="big">' + ic("box") + "</div>Caja vacía. Escribe arriba lo que metes o hazle una foto y la IA lo apunta por ti.</div>");
  }
  function itemRow(it) {
    return '<div class="item ' + (it.qty <= 0 ? "zero" : "") + '" id="it-' + it.id + '"><div class="th" data-act="' + (it.photo_url ? "viewphoto" : "itemphoto") + '" data-id="' + it.id + '" title="' + (it.photo_url ? "Ver foto" : "Hacer foto") + '">' + thumb(it) + '</div><div class="tx" data-act="edititem" data-id="' + it.id + '"><b>' + esc(it.name) + "</b><small>" + (it.qty <= 0 ? "Sacado todo · " : "") + esc(it.description || "") + "</small></div>" +
      '<div class="stepper"><button data-act="qty" data-id="' + it.id + '" data-d="-1" aria-label="Sacar uno">' + ic("minus") + '</button><span>' + it.qty + '</span><button data-act="qty" data-id="' + it.id + '" data-d="1" aria-label="Meter uno">' + ic("plus") + "</button></div></div>";
  }
  AFTER.c = function (code, soft) {
    const b = IX.boxByCode[code]; if (!b) return;
    const f = $("#addform");
    f.onsubmit = async e => {
      e.preventDefault();
      const name = $("#addname").value.trim(); if (!name) return;
      const qty = Math.max(0, parseInt($("#addqty").value) || 1);
      $("#addname").value = ""; $("#addqty").value = 1;
      try { await ins("items", { box_id: b.id, name, qty, description: "" }); renderView(); $("#addname").focus(); toast("Guardado «" + name + "»"); } catch (er) { fail(er); }
    };
    const want = sessionStorage.getItem("de_focus_item");
    if (want) { sessionStorage.removeItem("de_focus_item"); const el = $("#it-" + want); if (el) { el.scrollIntoView({ block: "center" }); el.classList.add("flash"); el.style.boxShadow = "0 0 0 2px var(--accent2)"; setTimeout(() => el.style.boxShadow = "", 2200); } }
    else if (sessionStorage.getItem("de_new_box") === b.id) { sessionStorage.removeItem("de_new_box"); $("#addname").focus(); }
  };

  /* ================= PLANO ================= */
  function mapSVG(o) {
    o = o || {};
    const st = S.data.settings || {}, W = +st.map_w || 800, H = +st.map_h || 500;
    const hlSet = new Set(o.hl || []);
    let g = "";
    for (let x = 50; x < W; x += 50) g += '<line class="gridl" x1="' + x + '" y1="0" x2="' + x + '" y2="' + H + '"/>';
    for (let y = 50; y < H; y += 50) g += '<line class="gridl" x1="0" y1="' + y + '" x2="' + W + '" y2="' + y + '"/>';
    const shs = S.data.shelves.map(s => {
      const c = shelfColor(s), n = (IX.boxesByShelf[s.id] || []).length;
      const vert = s.h > s.w * 1.4, fs = o.mini ? Math.min(52, (vert ? s.w : s.h) * 0.6) : Math.max(11, Math.min(22, (vert ? s.w : s.h) * 0.34));
      const label = o.mini ? s.name : s.name + " · " + n, fsFit = Math.min(fs, ((vert ? s.h : s.w) - 12) / (Math.max(3, label.length) * 0.6));
      const showTxt = !o.mini || !hlSet.size || hlSet.has(s.id);
      const cls = "sh" + (hlSet.size ? (hlSet.has(s.id) ? " hl" : " dim") : "") + (S.mapSel === s.id ? " sel" : "");
      const cx = s.w / 2, cy = s.h / 2;
      return '<g class="' + cls + '" data-shelf="' + s.id + '" transform="translate(' + s.x + " " + s.y + ')"><rect class="body" width="' + s.w + '" height="' + s.h + '" rx="8" fill="' + c + '" fill-opacity="' + (hlSet.has(s.id) ? 1 : .82) + '" stroke="' + (S.mapSel === s.id ? "#fff" : c) + '"/>' +
        (showTxt ? '<text x="' + cx + '" y="' + cy + '" text-anchor="middle" dominant-baseline="central" font-size="' + fsFit.toFixed(1) + '"' + (vert ? ' transform="rotate(-90 ' + cx + " " + cy + ')"' : "") + ">" + esc(label) + "</text>" : "") +
        (o.edit ? '<rect class="handle" data-h="1" x="' + (s.w - 9) + '" y="' + (s.h - 9) + '" width="18" height="18" rx="5"/>' : "") + "</g>";
    }).join("");
    return '<div class="mapwrap"><svg class="map ' + (o.edit ? "edit" : "") + '" id="' + (o.id || "") + '" viewBox="-10 -10 ' + (W + 20) + " " + (H + 20) + '" preserveAspectRatio="xMidYMid meet"><rect class="floor" x="0" y="0" width="' + W + '" height="' + H + '" rx="14"/>' + g + shs + "</svg></div>";
  }
  function vMap() {
    const st = S.data.settings || {};
    return '<div class="pagehead"><div class="grow"><h1>' + esc(st.map_name || "Mi bajo") + '</h1><p>' + (S.mapEdit ? "Arrastra las estanterías para colocarlas como en la realidad. Usa la esquina blanca para cambiar el tamaño." : "Toca una estantería para ver sus cajas.") + "</p></div>" +
      (S.mapEdit ? '<button class="btn" data-act="maprot" ' + (S.mapSel ? "" : "disabled") + ">" + ic("rotate") + 'Girar</button><button class="btn pri" data-act="mapedit">' + ic("check") + "Listo</button>" : '<button class="btn" data-act="newshelf">' + ic("plus") + 'Estantería</button><button class="btn pri" data-act="mapedit">' + ic("edit") + "Editar plano</button>") + "</div>" +
      (S.data.shelves.length ? mapSVG({ edit: S.mapEdit, id: "bigmap" }) : '<div class="empty card"><div class="big">' + ic("map") + '</div>Aún no hay estanterías.<br><br><button class="btn pri" data-act="newshelf">' + ic("plus") + "Crear la primera</button></div>") +
      '<section class="sec"><div class="shelves">' + S.data.shelves.map(shelfCard).join("") + "</div></section>";
  }
  AFTER.plano = function () {
    const svg = $("#bigmap"); if (!svg) return;
    const pt = e => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
    let drag = null;
    svg.addEventListener("pointerdown", e => {
      const g = e.target.closest("[data-shelf]"); if (!g) { if (S.mapEdit && S.mapSel) { S.mapSel = null; renderView(); } return; }
      const s = IX.shelf[g.dataset.shelf];
      if (!S.mapEdit) { location.hash = "#/e/" + s.id; return; }
      e.preventDefault(); svg.setPointerCapture(e.pointerId);
      if (S.mapSel !== s.id) { S.mapSel = s.id; $$(".sh", svg).forEach(x => { x.classList.toggle("sel", x === g); x.querySelector("rect.body").setAttribute("stroke", x === g ? "#fff" : shelfColor(IX.shelf[x.dataset.shelf])); }); const rb = $('[data-act="maprot"]'); if (rb) rb.disabled = false; }
      const p = pt(e);
      drag = { s, g, resize: !!e.target.dataset.h, p0: p, x0: s.x, y0: s.y, w0: s.w, h0: s.h, moved: false };
    });
    svg.addEventListener("pointermove", e => {
      if (!drag) return;
      const p = pt(e), dx = p.x - drag.p0.x, dy = p.y - drag.p0.y, st = S.data.settings || {}, W = +st.map_w || 800, H = +st.map_h || 500;
      const snap = v => Math.round(v / 10) * 10; drag.moved = true;
      const s = drag.s;
      if (drag.resize) { s.w = Math.max(30, Math.min(W - s.x, snap(drag.w0 + dx))); s.h = Math.max(30, Math.min(H - s.y, snap(drag.h0 + dy))); }
      else { s.x = Math.max(0, Math.min(W - s.w, snap(drag.x0 + dx))); s.y = Math.max(0, Math.min(H - s.h, snap(drag.y0 + dy))); }
      const tmp = document.createElement("div"); tmp.innerHTML = mapSVG({ edit: true });
      const ng = tmp.querySelector('[data-shelf="' + s.id + '"]'); drag.g.replaceWith(ng); drag.g = ng;
    });
    const end = async () => {
      if (!drag) return; const d = drag; drag = null;
      if (d.moved) try { await upd("shelves", d.s.id, { x: d.s.x, y: d.s.y, w: d.s.w, h: d.s.h }); } catch (e) { fail(e); }
    };
    svg.addEventListener("pointerup", end); svg.addEventListener("pointercancel", end);
  };

  /* ================= PARA SACAR ================= */
  function noteRow(n) {
    const it = n.item_id && IX.item[n.item_id];
    let where = "";
    if (it) where = loc(IX.box[it.box_id]);
    else if (!n.done) { const g = guessItem(n.text); if (g) where = '<span class="hint">¿Quizá ' + esc(g.name) + '?</span> ' + loc(IX.box[g.box_id]); }
    return '<div class="note ' + (n.done ? "done" : "") + '"><button class="check" data-act="togglenote" data-id="' + n.id + '" aria-label="Hecho">' + ic("check") + '</button><div class="nt"><b>' + esc(n.text) + '</b><div class="row wrap" style="gap:6px;margin-top:5px">' + where + (n.created_by ? '<span class="hint">' + esc(n.created_by) + "</span>" : "") + '</div></div><button class="btn icon sm ghost" data-act="delnote" data-id="' + n.id + '">' + ic("trash") + "</button></div>";
  }
  function vNotes() {
    const ns = S.data.notes.slice().sort((a, b) => (a.done - b.done) || (b.created_at || "").localeCompare(a.created_at || ""));
    const done = ns.filter(n => n.done).length;
    return '<div class="pagehead"><div class="grow"><h1>Para sacar</h1><p>Apunta lo que tienes que coger y, cuando bajes, sabrás en qué caja está.</p></div>' + (done ? '<button class="btn" data-act="cleardone">' + ic("trash") + "Borrar hechas (" + done + ")</button>" : "") + "</div>" +
      '<form class="addbar" id="noteform"><input class="inp" id="notetext" placeholder="Ej.: sacar la tienda de campaña, comprar pilas…" autocomplete="off" enterkeyhint="done"><button class="btn pri icon">' + ic("plus") + "</button></form>" +
      (ns.length ? '<div class="stack" style="gap:8px">' + ns.map(noteRow).join("") + "</div>" : '<div class="empty"><div class="big">' + ic("list") + "</div>Nada pendiente. Desde cualquier objeto pulsa " + ic("list") + " para añadirlo aquí.</div>");
  }
  AFTER.sacar = function () {
    $("#noteform").onsubmit = async e => {
      e.preventDefault(); const t = $("#notetext").value.trim(); if (!t) return;
      try { await ins("notes", { text: t, done: false, created_by: meName() }); renderView(); $("#notetext").focus(); } catch (er) { fail(er); }
    };
  };

  /* ================= ETIQUETAS QR ================= */
  function qrURL(b) { return location.origin + location.pathname + "#/c/" + b.code; }
  function qrFor(b, margin) { return window.qrSVG(qrURL(b), { ec: "M", margin: margin == null ? 2 : margin }); }
  function vLabels() {
    const boxes = S.data.boxes.filter(b => S.lblShelf === "all" || (b.shelf_id || "none") === S.lblShelf).sort((a, b) => natCmp((IX.shelf[a.shelf_id] || {}).name || "~", (IX.shelf[b.shelf_id] || {}).name || "~") || natCmp(a.label, b.label));
    if (!S.lblSel) S.lblSel = new Set(S.data.boxes.map(b => b.id));
    const n = boxes.filter(b => S.lblSel.has(b.id)).length;
    return '<div class="pagehead"><div class="grow"><h1>Etiquetas QR</h1><p>Imprime, recorta y pega en cada caja. Al escanear se abre directamente su contenido.</p></div><button class="btn pri" data-act="printlabels" ' + (n ? "" : "disabled") + ">" + ic("print") + "Imprimir " + n + "</button></div>" +
      '<div class="row wrap" style="margin-bottom:12px;gap:8px"><div class="tabs">' + [["S", "Pequeñas"], ["M", "Medianas"], ["L", "Grandes"]].map(t => '<button class="' + (S.lblSize === t[0] ? "on" : "") + '" data-act="lblsize" data-s="' + t[0] + '">' + t[1] + "</button>").join("") + "</div>" +
      '<select class="inp" id="lblshelf" style="width:auto;height:44px"><option value="all">Todas las estanterías</option>' + S.data.shelves.map(s => '<option value="' + s.id + '" ' + (S.lblShelf === s.id ? "selected" : "") + ">" + esc(s.name) + "</option>").join("") + (IX.boxesByShelf.none.length ? '<option value="none" ' + (S.lblShelf === "none" ? "selected" : "") + ">Sin estantería</option>" : "") + "</select>" +
      '<button class="btn sm" data-act="lblall" data-v="1">Marcar todas</button><button class="btn sm ghost" data-act="lblall" data-v="0">Ninguna</button></div>' +
      (boxes.length ? '<div class="lblsel">' + boxes.map(b => '<label class="lblrow"><input type="checkbox" data-lbl="' + b.id + '" ' + (S.lblSel.has(b.id) ? "checked" : "") + '><span class="qrp">' + qrFor(b, 1) + '</span><span style="flex:1;min-width:0"><b style="font-family:var(--mono);font-size:18px">' + esc(b.label) + '</b><br><span class="muted" style="font-size:13px">' + esc((IX.shelf[b.shelf_id] || {}).name || "Sin estantería") + " · " + b.code + "</span></span></label>").join("") + "</div>" : '<div class="empty"><div class="big">' + ic("qr") + "</div>No hay cajas todavía.</div>");
  }
  AFTER.etiquetas = function () {
    const sel = $("#lblshelf"); if (sel) sel.onchange = () => { S.lblShelf = sel.value; renderView(); };
    $$("[data-lbl]").forEach(c => c.onchange = () => { c.checked ? S.lblSel.add(c.dataset.lbl) : S.lblSel.delete(c.dataset.lbl); const btn = $('[data-act="printlabels"]'); const n = $$("[data-lbl]").filter(x => x.checked).length; btn.innerHTML = ic("print") + "Imprimir " + n; btn.disabled = !n; });
  };
  function printBoxes(boxes, size) {
    const cfg = { S: [4, "22mm", "16pt"], M: [3, "30mm", "24pt"], L: [2, "45mm", "36pt"] }[size || "M"];
    const pa = $("#print-area");
    pa.style.setProperty("--cols", cfg[0]); pa.style.setProperty("--qr", cfg[1]); pa.style.setProperty("--fs", cfg[2]);
    pa.innerHTML = boxes.map(b => '<div class="plabel">' + qrFor(b, 1) + '<div class="pt"><b class="' + (b.label.length > 4 ? "long" : "") + '">' + esc(b.label) + "</b><span>" + esc((IX.shelf[b.shelf_id] || {}).name || "") + "</span><small>¿Dónde está? · " + b.code + "</small></div></div>").join("");
    setTimeout(() => window.print(), 30);
  }

  /* ================= AJUSTES ================= */
  function vSettings() {
    const st = S.data.settings || {}, p = st.ai_provider || "gemini", adm = isAdmin();
    const dis = adm ? "" : "disabled";
    return '<div class="pagehead"><div class="grow"><h1>Ajustes</h1><p>Configuración común para todos los usuarios.</p></div></div><div class="settings">' +
      '<section class="set-sec"><h2>' + ic("user") + 'Tu cuenta</h2><div class="row"><div class="avatar" style="width:48px;height:48px;font-size:20px">' + esc(meName()[0].toUpperCase()) + '</div><div class="grow" style="flex:1"><b style="font-size:17px">' + esc(meName()) + '</b><br><span class="muted">' + (adm ? "Administrador" : "Usuario") + '</span></div><button class="btn" data-act="logout">' + ic("logout") + "Salir</button></div>" +
      '<p class="hint" style="margin:0">Consejo: en el móvil abre el menú del navegador → «Añadir a pantalla de inicio» y tendrás la app como una más.</p></section>' +
      '<section class="set-sec" id="aisec"><h2>' + ic("sparkles") + "Inteligencia artificial</h2>" + (adm ? "" : '<div class="ok-box">' + (st.ai_key || p === "compatible" ? "La IA está configurada por el administrador." : "Pide al administrador que configure la IA.") + "</div>") +
      '<div class="field"><label>Proveedor</label><select class="inp" id="ai_provider" ' + dis + ">" + Object.keys(AI.names).map(k => '<option value="' + k + '" ' + (k === p ? "selected" : "") + ">" + AI.names[k] + "</option>").join("") + "</select></div>" +
      '<div class="field"><label>Modelo</label><input class="inp" id="ai_model" ' + dis + ' value="' + esc(st.ai_model || "") + '" placeholder="' + esc(AI.defaults[p] || "nombre del modelo") + '"><span class="hint">Déjalo vacío para usar el recomendado.</span></div>' +
      '<div class="field ' + (p === "compatible" ? "" : "hidden") + '" id="baseurlf"><label>URL base</label><input class="inp" id="ai_base_url" ' + dis + ' value="' + esc(st.ai_base_url || "") + '" placeholder="https://api.groq.com/openai/v1"></div>' +
      (adm ? '<div class="field"><label>Clave API</label><div class="row"><input class="inp" type="password" id="ai_key" value="' + esc(st.ai_key || "") + '" placeholder="Pega aquí tu clave" autocomplete="off"><button class="btn icon" type="button" data-act="showkey">' + ic("key") + "</button></div>" +
        '<span class="hint">Gemini tiene clave gratis en <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener" style="color:var(--accent2)">aistudio.google.com/apikey</a>. La clave la ven solo los usuarios aprobados.</span></div>' +
        '<div class="row wrap"><button class="btn pri" data-act="saveai">' + ic("check") + 'Guardar</button><button class="btn" data-act="testai">' + ic("sparkles") + "Probar</button></div>" : "") + "</section>" +
      (adm ? '<section class="set-sec"><h2>' + ic("users") + 'Usuarios</h2><p class="hint" style="margin:0">Para añadir a alguien: que abra esta web y pulse «Crear cuenta». Aparecerá aquí y tú lo apruebas.</p><div class="stack" id="userlist" style="gap:8px"><div class="spin"></div></div></section>' : "") +
      '<section class="set-sec"><h2>' + ic("map") + 'Plano del bajo</h2><div class="field"><label>Nombre</label><input class="inp" id="map_name" ' + dis + ' value="' + esc(st.map_name || "Mi bajo") + '"></div><div class="grid2"><div class="field"><label>Ancho</label><input class="inp" type="number" id="map_w" ' + dis + ' value="' + (st.map_w || 800) + '"></div><div class="field"><label>Fondo</label><input class="inp" type="number" id="map_h" ' + dis + ' value="' + (st.map_h || 500) + '"></div></div><span class="hint">Proporción de la habitación (por ejemplo, en centímetros).</span>' + (adm ? '<button class="btn" data-act="savemap">' + ic("check") + "Guardar plano</button>" : "") + "</section>" +
      '<section class="set-sec"><h2>' + ic("download") + 'Copia de seguridad</h2><p class="hint" style="margin:0">Descarga todo (estanterías, cajas, objetos y notas) en un archivo.</p><div class="row wrap"><button class="btn" data-act="export">' + ic("download") + "Exportar</button>" + (adm ? '<button class="btn" data-act="import">' + ic("upload") + "Importar</button>" : "") + "</div></section>" +
      '<section class="set-sec" style="text-align:center"><div class="brand" style="justify-content:center;padding:0"><span class="logo">' + ic("box") + '</span><span>¿Dónde está?</span></div><div class="byline" style="font-size:12px">HECHO POR <span>@BYALVARO__</span></div></section></div>';
  }
  AFTER.ajustes = async function () {
    const prov = $("#ai_provider");
    if (prov) prov.onchange = () => { $("#baseurlf").classList.toggle("hidden", prov.value !== "compatible"); $("#ai_model").placeholder = AI.defaults[prov.value] || "nombre del modelo"; };
    if (isAdmin()) loadUsers();
  };
  async function loadUsers() {
    const box = $("#userlist"); if (!box) return;
    try {
      const us = await db.listProfiles();
      box.innerHTML = us.map(u => '<div class="user-row" style="' + (u.role === "pendiente" ? "border-color:rgba(251,191,36,.4)" : "") + '"><div class="avatar">' + esc((u.name || u.username)[0].toUpperCase()) + '</div><div class="grow"><b>' + esc(u.name || u.username) + "</b>" + (u.id === S.me.id ? ' <span class="hint">(tú)</span>' : "") + "<br>" + (u.role === "pendiente" ? '<span class="tag res">Pendiente</span>' : '<span class="hint">' + (u.role === "admin" ? "Administrador" : "Usuario") + "</span>") + "</div>" +
        (u.id === S.me.id ? "" : (u.role === "pendiente" ? '<button class="btn sm pri" data-act="setrole" data-id="' + u.id + '" data-role="usuario">' + ic("check") + "Aprobar</button>" : '<select class="inp" data-role-sel="' + u.id + '"><option value="usuario" ' + (u.role === "usuario" ? "selected" : "") + '>Usuario</option><option value="admin" ' + (u.role === "admin" ? "selected" : "") + '>Admin</option><option value="pendiente">Bloquear</option></select>') +
          '<button class="btn icon sm ghost" data-act="deluser" data-id="' + u.id + '" data-name="' + esc(u.name || u.username) + '">' + ic("trash") + "</button>") + "</div>").join("");
      $$("[data-role-sel]", box).forEach(s => s.onchange = async () => { try { await db.setRole(s.dataset.roleSel, s.value); toast("Rol actualizado"); loadUsers(); } catch (e) { fail(e); } });
    } catch (e) { box.innerHTML = '<div class="err-box">' + esc(e.message) + "</div>"; }
  }

  function notFound(msg) { return '<div class="empty"><div class="big">' + ic("search") + "</div><h2 style=\"color:var(--text)\">" + msg + '</h2><br><a class="btn pri" href="#/">Volver al inicio</a></div>'; }

  /* ================= MODALES DE EDICIÓN ================= */
  function shelfModal(s) {
    const isNew = !s;
    openModal({
      title: isNew ? "Nueva estantería" : "Editar estantería",
      body: '<div class="field"><label>Nombre</label><input class="inp" id="m_name" autofocus value="' + esc(s ? s.name : "") + '" placeholder="Estantería 1, Estantería roja, Metálica…"></div><div class="field"><label>Color</label>' + swatches(s ? s.color : COLORS[S.data.shelves.length % COLORS.length]) + "</div>",
      foot: (isNew ? "" : '<button class="btn danger" data-del style="margin-right:auto">' + ic("trash") + "Borrar</button>") + '<button class="btn ghost" data-close>Cancelar</button><button class="btn pri" data-ok>' + (isNew ? "Crear" : "Guardar") + "</button>",
      onMount(ov, close) {
        const col = bindSwatches(ov), nm = $("#m_name", ov);
        const go = async () => {
          const name = nm.value.trim(); if (!name) return nm.focus();
          try {
            if (isNew) {
              const n = S.data.shelves.length, st = S.data.settings || {}, W = +st.map_w || 800, H = +st.map_h || 500;
              const x = Math.min(W - 200, 40 + (n % 3) * 240), y = Math.min(H - 60, 40 + Math.floor(n / 3) * 110 % (H - 80));
              const r = await ins("shelves", { name, color: col() || COLORS[0], x, y, w: 200, h: 56, position: n });
              close(); location.hash = "#/e/" + r.id; toast("Estantería creada");
            } else { await upd("shelves", s.id, { name, color: col() || s.color }); close(); renderView(); }
          } catch (e) { fail(e); }
        };
        $("[data-ok]", ov).onclick = go; nm.onkeydown = e => { if (e.key === "Enter") go(); };
        const d = $("[data-del]", ov);
        if (d) d.onclick = async () => {
          const nb = (IX.boxesByShelf[s.id] || []).length;
          if (await confirmDlg("¿Borrar «" + s.name + "»?", nb ? "Sus " + nb + " cajas NO se borran: quedarán como «sin estantería»." : "La estantería está vacía.", "Borrar", true)) {
            try { await del("shelves", s.id); close(); location.hash = "#/"; toast("Estantería borrada"); } catch (e) { fail(e); }
          }
        };
      }
    });
  }
  function suggestLabel(shelfId) {
    const s = IX.shelf[shelfId], bx = IX.boxesByShelf[shelfId || "none"] || [];
    const letter = s ? (strip(s.name).replace(/estanteria|estante|de|la|el/g, "").trim()[0] || "C").toUpperCase() : "C";
    let n = bx.length + 1; const labels = new Set(S.data.boxes.map(b => b.label.toUpperCase()));
    while (labels.has(letter + n)) n++;
    return letter + n;
  }
  function shelfOptions(sel) { return '<option value="">Sin estantería</option>' + S.data.shelves.map(s => '<option value="' + s.id + '" ' + (s.id === sel ? "selected" : "") + ">" + esc(s.name) + "</option>").join(""); }
  function boxModal(b, shelfId) {
    const isNew = !b;
    openModal({
      title: isNew ? "Nueva caja" : "Editar caja",
      body: '<div class="field"><label>Etiqueta (número, letra, texto…)</label><input class="inp" id="m_label" autofocus value="' + esc(b ? b.label : suggestLabel(shelfId)) + '" style="font-family:var(--mono);font-size:20px;font-weight:700"></div>' +
        '<div class="field"><label>Estantería</label><select class="inp" id="m_shelf">' + shelfOptions(b ? b.shelf_id : shelfId) + "</select></div>" +
        '<div class="field"><label>Color de la caja</label>' + swatches(b ? b.color : "", true) + "</div>" +
        '<div class="field"><label>Nota (opcional)</label><input class="inp" id="m_notes" value="' + esc(b ? b.notes || "" : "") + '" placeholder="Ej.: ropa de invierno, frágil…"></div>',
      foot: (isNew ? "" : '<button class="btn danger" data-del style="margin-right:auto">' + ic("trash") + "Borrar</button>") + '<button class="btn ghost" data-close>Cancelar</button><button class="btn pri" data-ok>' + (isNew ? "Crear caja" : "Guardar") + "</button>",
      onMount(ov, close) {
        const col = bindSwatches(ov), lb = $("#m_label", ov);
        lb.select && setTimeout(() => lb.select(), 60);
        const go = async () => {
          const label = lb.value.trim(); if (!label) return lb.focus();
          const row = { label, shelf_id: $("#m_shelf", ov).value || null, color: col() || null, notes: $("#m_notes", ov).value.trim() };
          try {
            if (isNew) { let code; do { code = newCode(); } while (IX.boxByCode[code]); const r = await ins("boxes", Object.assign(row, { code, position: 0 })); close(); sessionStorage.setItem("de_new_box", r.id); location.hash = "#/c/" + code; toast("Caja creada. Ahora añade lo que tiene dentro"); }
            else { await upd("boxes", b.id, row); close(); renderView(); }
          } catch (e) { fail(e); }
        };
        $("[data-ok]", ov).onclick = go; lb.onkeydown = e => { if (e.key === "Enter") go(); };
        const d = $("[data-del]", ov);
        if (d) d.onclick = async () => {
          const n = (IX.itemsByBox[b.id] || []).length;
          if (await confirmDlg("¿Borrar la caja «" + b.label + "»?", n ? "Se borrarán también sus <b>" + n + " objetos</b>. No se puede deshacer." : "La caja está vacía.", "Borrar", true)) {
            const sid = b.shelf_id; try { await del("boxes", b.id); close(); location.hash = "#/e/" + (sid || "none"); toast("Caja borrada"); } catch (e) { fail(e); }
          }
        };
      }
    });
  }
  function boxOptions(sel) {
    let h = "";
    S.data.shelves.forEach(s => { const bx = IX.boxesByShelf[s.id] || []; if (bx.length) h += '<optgroup label="' + esc(s.name) + '">' + bx.map(b => '<option value="' + b.id + '" ' + (b.id === sel ? "selected" : "") + ">" + esc(b.label) + "</option>").join("") + "</optgroup>"; });
    if (IX.boxesByShelf.none.length) h += '<optgroup label="Sin estantería">' + IX.boxesByShelf.none.map(b => '<option value="' + b.id + '" ' + (b.id === sel ? "selected" : "") + ">" + esc(b.label) + "</option>").join("") + "</optgroup>";
    return h;
  }
  function itemModal(it) {
    let photo = it.photo_url, newFile = null;
    const pv = () => photo ? imgTag(photo) : ic("image");
    openModal({
      title: "Objeto",
      body: '<div class="field"><label>Nombre</label><input class="inp" id="m_name" value="' + esc(it.name) + '"></div>' +
        '<div class="grid2"><div class="field"><label>Cantidad</label><input class="inp" id="m_qty" type="number" min="0" inputmode="numeric" value="' + it.qty + '"></div><div class="field"><label>Caja</label><select class="inp" id="m_box">' + boxOptions(it.box_id) + "</select></div></div>" +
        '<div class="field"><label>Descripción (ayuda a encontrarlo)</label><textarea class="inp" id="m_desc" placeholder="Color, marca, talla, para qué sirve…">' + esc(it.description || "") + "</textarea></div>" +
        '<div class="field"><label>Foto</label><div class="photo-pick"><div class="pv" id="m_pv">' + pv() + '</div><div class="row wrap" style="gap:6px"><button class="btn sm" type="button" data-ph="cam">' + ic("camera") + 'Hacer foto</button><button class="btn sm" type="button" data-ph="gal">' + ic("image") + 'Galería</button><button class="btn sm ghost" type="button" data-ph="del">' + ic("trash") + "</button></div></div></div>",
      foot: '<button class="btn danger icon" data-del title="Borrar">' + ic("trash") + '</button><button class="btn" data-note style="margin-right:auto">' + ic("list") + 'Para sacar</button><button class="btn ghost" data-close>Cancelar</button><button class="btn pri" data-ok>Guardar</button>',
      onMount(ov, close) {
        $$("[data-ph]", ov).forEach(b => b.onclick = async () => {
          if (b.dataset.ph === "del") { photo = null; newFile = null; $("#m_pv", ov).innerHTML = pv(); return; }
          const f = await pickFile(b.dataset.ph === "cam"); if (!f) return;
          newFile = f; const c = await compress(f, 300, 0.7); photo = c.url; $("#m_pv", ov).innerHTML = pv();
        });
        $("[data-ok]", ov).onclick = async e => {
          const btn = e.currentTarget; btn.disabled = true;
          try {
            let url = photo;
            if (newFile) url = await uploadPhoto(newFile);
            if (it.photo_url && it.photo_url !== url) db.deletePhoto(it.photo_url);
            const patch = { name: $("#m_name", ov).value.trim() || it.name, qty: Math.max(0, parseInt($("#m_qty", ov).value) || 0), box_id: $("#m_box", ov).value, description: $("#m_desc", ov).value.trim(), photo_url: url || null };
            const moved = patch.box_id !== it.box_id;
            await upd("items", it.id, patch); close(); renderView();
            toast(moved ? "Movido a la caja " + IX.box[patch.box_id].label : "Guardado");
          } catch (er) { btn.disabled = false; fail(er); }
        };
        $("[data-note]", ov).onclick = async () => { await addNote(it); close(); };
        $("[data-del]", ov).onclick = async () => {
          if (!(await confirmDlg("¿Borrar «" + it.name + "»?", "Se quitará de la caja.", "Borrar", true))) return;
          const copy = Object.assign({}, it);
          try {
            await del("items", it.id); close(); renderView();
            toast("Borrado", { undo: async () => { try { delete copy.updated_at; await ins("items", copy); renderView(); } catch (e) { fail(e); } } });
          } catch (e) { fail(e); }
        };
      }
    });
  }
  async function addNote(it) {
    if (S.data.notes.some(n => !n.done && n.item_id === it.id)) return toast("Ya está en «para sacar»");
    try { await ins("notes", { text: it.name, item_id: it.id, done: false, created_by: meName() }); toast("Añadido a «para sacar»"); renderView(true); } catch (e) { fail(e); }
  }

  /* ---------- foto + IA ---------- */
  async function photoAI(boxId) {
    const b = IX.box[boxId];
    const f = await pickFile(true); if (!f) return;
    let img;
    try { img = await compress(f, 1280, 0.8); } catch (e) { return fail(e); }
    const ov = openModal({ title: ic("sparkles") + " La IA está mirando la foto…", wide: true, body: '<img src="' + img.url + '" style="width:100%;max-height:240px;object-fit:cover;border-radius:16px"><div class="shimmer"></div><div class="shimmer" style="width:70%"></div><div class="shimmer" style="width:50%"></div>' });
    let list;
    try { list = await AI.photo(S.data.settings || {}, img); } catch (e) { ov.close(); return fail(e); }
    ov.close();
    if (!list.length) return toast("La IA no ha reconocido objetos en la foto", { err: true });
    openModal({
      title: ic("sparkles") + " " + list.length + " objetos encontrados", wide: true,
      body: '<p class="muted" style="margin:0">Revisa, corrige nombres o cantidades y desmarca lo que no quieras. Se guardarán en la caja <b>' + esc(b.label) + '</b>.</p><div class="ai-list">' +
        list.map((o, i) => '<div class="ai-row"><input type="checkbox" checked data-i="' + i + '"><input type="text" value="' + esc(o.name) + '" data-n="' + i + '"><input type="number" min="1" value="' + o.qty + '" data-q="' + i + '"></div>').join("") + "</div>",
      foot: '<button class="btn ghost" data-close>Cancelar</button><button class="btn pri" data-ok>' + ic("plus") + "Añadir a la caja</button>",
      onMount(ov2, close) {
        $("[data-ok]", ov2).onclick = async e => {
          e.currentTarget.disabled = true; let n = 0;
          try {
            for (let i = 0; i < list.length; i++) {
              if (!$('[data-i="' + i + '"]', ov2).checked) continue;
              const name = $('[data-n="' + i + '"]', ov2).value.trim(); if (!name) continue;
              await ins("items", { box_id: b.id, name, qty: Math.max(1, parseInt($('[data-q="' + i + '"]', ov2).value) || 1), description: list[i].description || "" }); n++;
            }
            close(); renderView(); toast(n + " objetos añadidos");
          } catch (er) { fail(er); }
        };
      }
    });
  }

  /* ---------- QR de una caja ---------- */
  function qrModal(b) {
    openModal({
      title: "QR de la caja " + esc(b.label),
      body: '<div style="background:#fff;border-radius:20px;padding:14px;max-width:300px;margin:0 auto;width:100%">' + qrFor(b, 1) + '<div style="color:#000;text-align:center;font-family:var(--mono);font-weight:700;font-size:28px;margin-top:6px">' + esc(b.label) + '</div><div style="color:#555;text-align:center;font-size:13px">' + esc((IX.shelf[b.shelf_id] || {}).name || "") + '</div></div><p class="hint" style="text-align:center;margin:0">Código: <b>' + b.code + "</b> · Al escanearlo se abre esta caja al instante.</p>",
      foot: '<button class="btn" data-dl>' + ic("download") + 'Descargar</button><button class="btn pri" data-pr>' + ic("print") + "Imprimir</button>",
      onMount(ov) {
        $("[data-pr]", ov).onclick = () => printBoxes([b], "L");
        $("[data-dl]", ov).onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([qrFor(b, 2)], { type: "image/svg+xml" })); a.download = "caja-" + b.label.replace(/[^\w-]+/g, "_") + ".svg"; a.click(); };
      }
    });
  }

  /* ---------- escáner rápido ---------- */
  function scanner() {
    let stream = null, raf = 0, done = false;
    const ov = openModal({
      title: "Escanear caja",
      body: '<div class="scanner"><video playsinline muted autoplay></video><div class="frame"></div><div class="laser"></div></div><p class="hint" id="scanmsg" style="text-align:center;margin:0">Apunta al QR de la caja</p>' +
        '<form class="addbar" id="codeform" style="margin:0"><input class="inp" id="codein" placeholder="…o escribe el código / etiqueta" autocapitalize="characters" autocomplete="off"><button class="btn pri">Abrir</button></form>',
      onClose() { done = true; cancelAnimationFrame(raf); if (stream) stream.getTracks().forEach(t => t.stop()); }
    });
    const open = txt => {
      if (done) return;
      const m = String(txt).match(/#\/c\/([A-Z0-9]+)/i), code = (m ? m[1] : String(txt)).trim().toUpperCase();
      let b = IX.boxByCode[code] || S.data.boxes.find(x => strip(x.label) === strip(txt));
      if (!b) { $("#scanmsg", ov).innerHTML = '<span style="color:var(--bad)">No encuentro la caja «' + esc(code) + "»</span>"; return false; }
      if (navigator.vibrate) navigator.vibrate(40);
      ov.close(); location.hash = "#/c/" + b.code; return true;
    };
    $("#codeform", ov).onsubmit = e => { e.preventDefault(); open($("#codein", ov).value); };
    const video = $("video", ov), msg = $("#scanmsg", ov);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { msg.textContent = "Este navegador no deja usar la cámara aquí. Usa la cámara del móvil: el QR abre la caja directamente."; return; }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false }).then(async s => {
      if (done) { s.getTracks().forEach(t => t.stop()); return; }
      stream = s; video.srcObject = s; await video.play().catch(() => { });
      let detect;
      if ("BarcodeDetector" in window) {
        try { const bd = new BarcodeDetector({ formats: ["qr_code"] }); detect = async () => { const r = await bd.detect(video); return r[0] && r[0].rawValue; }; } catch (e) { }
      }
      if (!detect) {
        msg.textContent = "Preparando el lector…";
        try { await loadScript("https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js"); } catch (e) { msg.textContent = "No se pudo cargar el lector. Usa la cámara del móvil o escribe el código."; return; }
        const c = document.createElement("canvas"), ctx = c.getContext("2d", { willReadFrequently: true });
        detect = async () => { const w = 480, h = Math.round(w * video.videoHeight / video.videoWidth) || 360; c.width = w; c.height = h; ctx.drawImage(video, 0, 0, w, h); const r = window.jsQR(ctx.getImageData(0, 0, w, h).data, w, h, { inversionAttempts: "dontInvert" }); return r && r.data; };
        msg.textContent = "Apunta al QR de la caja";
      }
      let busy = false, last = 0;
      const loop = async t => {
        if (done) return; raf = requestAnimationFrame(loop);
        if (busy || t - last < 90 || video.readyState < 2) return; busy = true; last = t;
        try { const v = await detect(); if (v) open(v); } catch (e) { } busy = false;
      };
      raf = requestAnimationFrame(loop);
    }).catch(() => { msg.textContent = "No hay permiso para la cámara. Puedes escribir el código abajo o usar la cámara del móvil."; });
  }
  function loadScript(src) { return new Promise((res, rej) => { if ([...document.scripts].some(s => s.src === src)) return res(); const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }

  /* ================= ACCIONES ================= */
  const A = {
    async logout() { await db.signOut(); S.me = null; S.data = { shelves: [], boxes: [], items: [], notes: [], settings: {} }; localStorage.removeItem(CACHE); location.hash = "#/"; render(); },
    async recheck() { await reload(); if (S.me && S.me.role === "pendiente") toast("Todavía estás pendiente de aprobación", { err: true }); },
    scan: scanner,
    clearq() { S.q = ""; S.ai = null; renderView(); },
    useq(d) { S.q = d.q; S.ai = null; const i = $("#q"); i.value = S.q; renderResults(); },
    closeai() { S.ai = null; renderResults(); },
    async aisearch() {
      const q = S.q.trim();
      if (!q) { toast("Describe primero lo que buscas", { err: true }); $("#q").focus(); return; }
      if (S.aiLoading) return;
      S.aiLoading = true; S.ai = null; $(".aibtn") && $(".aibtn").classList.add("loading"); renderResults();
      try {
        const rows = S.data.items.filter(i => i.qty > 0).slice(0, 2500).map(i => { const b = IX.box[i.box_id], s = b && IX.shelf[b.shelf_id]; return { id: i.id, line: [i.name, i.description || "", b ? b.label : "", s ? s.name : ""].join("|") }; });
        S.ai = await AI.search(S.data.settings || {}, q, rows);
      } catch (e) { fail(e); }
      S.aiLoading = false; if (route().p === "") { $(".aibtn") && $(".aibtn").classList.remove("loading"); renderResults(); }
    },
    openbox(d) { if (!d.code) return; sessionStorage.setItem("de_focus_item", d.item); location.hash = "#/c/" + d.code; },
    tonote(d) { const it = IX.item[d.id]; if (it) addNote(it); },
    newshelf() { shelfModal(null); },
    editshelf(d) { shelfModal(IX.shelf[d.id]); },
    newbox(d) { if (!S.data.shelves.length && !d.shelf) return shelfModal(null); boxModal(null, d.shelf || ""); },
    editbox(d) { boxModal(IX.box[d.id]); },
    edititem(d) { const it = IX.item[d.id]; if (it) itemModal(it); },
    qr(d) { qrModal(IX.box[d.id]); },
    photoai(d) { photoAI(d.id); },
    async photoitem(d) {
      const b = IX.box[d.id]; const f = await pickFile(true); if (!f) return;
      const nameIn = $("#addname"), qtyIn = $("#addqty");
      let name = (nameIn && nameIn.value.trim()) || "", desc = "";
      const qty = Math.max(1, parseInt(qtyIn && qtyIn.value) || 1);
      const wt = toast("Guardando foto…", { wait: true });
      try {
        const st = S.data.settings || {};
        const [url, guess] = await Promise.all([uploadPhoto(f),
          (!name && (st.ai_key || st.ai_provider === "compatible")) ? compress(f, 768, 0.75).then(img => AI.photo(st, img)).catch(() => []) : Promise.resolve([])]);
        if (!name && guess.length) { name = guess[0].name; desc = guess[0].description || ""; }
        const r = await ins("items", { box_id: b.id, name: name || "Objeto nuevo", qty, description: desc, photo_url: url });
        wt.remove(); if (nameIn) { nameIn.value = ""; qtyIn.value = 1; }
        renderView();
        if (!name) itemModal(r); else toast("Guardado «" + name + "» con foto");
      } catch (e) { wt.remove(); fail(e); }
    },
    async itemphoto(d) {
      const it = IX.item[d.id]; const f = await pickFile(true); if (!f) return;
      const wt = toast("Guardando foto…", { wait: true });
      try { const old = it.photo_url, url = await uploadPhoto(f); await upd("items", it.id, { photo_url: url }); if (old) db.deletePhoto(old); wt.remove(); renderView(); toast("Foto guardada"); } catch (e) { wt.remove(); fail(e); }
    },
    viewphoto(d) {
      const it = IX.item[d.id];
      openModal({ title: esc(it.name), body: imgTag(it.photo_url, 'style="width:100%;border-radius:16px;max-height:65vh;object-fit:contain;background:#000"'),
        foot: '<button class="btn" data-ch>' + ic("camera") + 'Cambiar foto</button><button class="btn pri" data-ed>' + ic("edit") + "Editar</button>",
        onMount(ov, close) { $("[data-ch]", ov).onclick = () => { close(); A.itemphoto(d); }; $("[data-ed]", ov).onclick = () => { close(); itemModal(it); }; } });
    },
    async qty(d, el) {
      const it = IX.item[d.id]; if (!it) return;
      const q = Math.max(0, it.qty + (+d.d)); if (q === it.qty) return;
      it.qty = q;
      const row = $("#it-" + it.id), sp = row && row.querySelector(".stepper span");
      if (sp) { sp.textContent = q; sp.classList.remove("bump"); void sp.offsetWidth; sp.classList.add("bump"); row.classList.toggle("zero", q <= 0); }
      clearTimeout(it._t);
      it._t = setTimeout(async () => { try { const r = await db.update("items", it.id, { qty: it.qty, updated_at: new Date().toISOString() }); setRow("items", r); } catch (e) { fail(e); } }, 450);
    },
    async togglenote(d) { const n = S.data.notes.find(x => x.id === d.id); if (!n) return; try { await upd("notes", n.id, { done: !n.done }); renderView(true); } catch (e) { fail(e); } },
    async delnote(d) { const n = S.data.notes.find(x => x.id === d.id); try { await del("notes", d.id); renderView(true); toast("Nota borrada", { undo: async () => { await ins("notes", n); renderView(true); } }); } catch (e) { fail(e); } },
    async cleardone() { const ds = S.data.notes.filter(n => n.done); try { for (const n of ds) await del("notes", n.id); renderView(); toast(ds.length + " notas borradas"); } catch (e) { fail(e); } },
    mapedit() { S.mapEdit = !S.mapEdit; S.mapSel = null; renderView(); },
    async maprot() {
      const s = IX.shelf[S.mapSel]; if (!s) return;
      const st = S.data.settings || {}, W = +st.map_w || 800, H = +st.map_h || 500;
      const w = s.h, h = s.w; const x = Math.min(s.x, Math.max(0, W - w)), y = Math.min(s.y, Math.max(0, H - h));
      try { await upd("shelves", s.id, { w, h, x, y }); renderView(); } catch (e) { fail(e); }
    },
    lblsize(d) { S.lblSize = d.s; renderView(); },
    lblall(d) { S.data.boxes.filter(b => S.lblShelf === "all" || (b.shelf_id || "none") === S.lblShelf).forEach(b => d.v === "1" ? S.lblSel.add(b.id) : S.lblSel.delete(b.id)); renderView(); },
    printlabels() { const bs = $$("[data-lbl]").filter(c => c.checked).map(c => IX.box[c.dataset.lbl]).filter(Boolean); if (bs.length) printBoxes(bs, S.lblSize); },
    showkey() { const k = $("#ai_key"); k.type = k.type === "password" ? "text" : "password"; },
    async saveai() {
      const patch = { ai_provider: $("#ai_provider").value, ai_model: $("#ai_model").value.trim(), ai_key: $("#ai_key").value.trim(), ai_base_url: $("#ai_base_url").value.trim() };
      try { S.data.settings = Object.assign({}, S.data.settings, await db.saveSettings(patch)); saveCache(); toast("IA guardada para todos"); } catch (e) { fail(e); }
    },
    async testai(d, el) {
      const tmp = Object.assign({}, S.data.settings, { ai_provider: $("#ai_provider").value, ai_model: $("#ai_model").value.trim(), ai_key: $("#ai_key").value.trim(), ai_base_url: $("#ai_base_url").value.trim() });
      el.disabled = true; el.innerHTML = '<span class="spin" style="width:16px;height:16px;border-width:2px"></span>Probando…';
      try { await AI.test(tmp); toast("¡La IA responde correctamente!"); } catch (e) { fail(e); }
      el.disabled = false; el.innerHTML = ic("sparkles") + "Probar";
    },
    async savemap() {
      const patch = { map_name: $("#map_name").value.trim() || "Mi bajo", map_w: Math.max(100, +$("#map_w").value || 800), map_h: Math.max(100, +$("#map_h").value || 500) };
      try { S.data.settings = Object.assign({}, S.data.settings, await db.saveSettings(patch)); saveCache(); toast("Plano guardado"); } catch (e) { fail(e); }
    },
    async setrole(d) { try { await db.setRole(d.id, d.role); toast("Usuario aprobado"); loadUsers(); } catch (e) { fail(e); } },
    async deluser(d) {
      if (!(await confirmDlg("¿Quitar a " + d.name + "?", "Perderá el acceso. Sus cosas guardadas se quedan.", "Quitar", true))) return;
      try { await db.deleteProfile(d.id); toast("Usuario quitado"); loadUsers(); } catch (e) { fail(e); }
    },
    export() {
      const { shelves, boxes, items, notes } = S.data;
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify({ app: "donde-esta", v: 1, fecha: new Date().toISOString(), shelves, boxes, items, notes }, null, 1)], { type: "application/json" }));
      a.download = "donde-esta-copia-" + new Date().toISOString().slice(0, 10) + ".json"; a.click();
    },
    import() {
      const i = document.createElement("input"); i.type = "file"; i.accept = ".json,application/json";
      i.onchange = async () => {
        try {
          const j = JSON.parse(await i.files[0].text());
          if (j.app !== "donde-esta") throw new Error("Ese archivo no es una copia de ¿Dónde está?");
          if (!(await confirmDlg("¿Importar copia?", "Se añadirán o actualizarán " + j.shelves.length + " estanterías, " + j.boxes.length + " cajas y " + j.items.length + " objetos.", "Importar"))) return;
          const clean = r => { const o = Object.assign({}, r); delete o._t; return o; };
          await db.upsertMany("shelves", j.shelves.map(clean)); await db.upsertMany("boxes", j.boxes.map(clean)); await db.upsertMany("items", j.items.map(clean)); await db.upsertMany("notes", (j.notes || []).map(clean));
          S.data = await db.loadAll(); index(); saveCache(); renderView(); toast("Copia importada");
        } catch (e) { fail(e); }
      };
      i.click();
    }
  };

  document.addEventListener("click", e => {
    const el = e.target.closest("[data-act]"), go = e.target.closest("[data-go]");
    if (go && (!el || el.contains(go))) { e.preventDefault(); e.stopPropagation(); if (modalStack.length) modalStack.forEach(m => m.close()); location.hash = go.dataset.go; return; }
    if (el && A[el.dataset.act]) {
      e.preventDefault(); e.stopPropagation();
      Promise.resolve(A[el.dataset.act](Object.assign({}, el.dataset), el, e)).catch(fail);
    }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modalStack.length) modalStack[modalStack.length - 1].close();
    if (e.key === "/" && !modalStack.length && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || "")) { e.preventDefault(); if (route().p !== "") location.hash = "#/"; setTimeout(() => { const q = $("#q"); if (q) q.focus(); }, 30); }
  });

  boot();
})();
