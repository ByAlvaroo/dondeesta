/* ¿DÓNDE ESTÁ? · datos (Supabase o modo demo) + IA · HECHO POR @BYALVARO__ */
(function () {
  "use strict";
  const CFG = window.DONDE_CONFIG || {};
  const DEMO = !CFG.SUPABASE_URL || !CFG.SUPABASE_ANON_KEY;
  const EMAIL_DOMAIN = "dondeesta.app";

  const uid = () => (crypto.randomUUID ? crypto.randomUUID()
    : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16); }));
  const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  function newCode() { let s = ""; const a = new Uint32Array(6); crypto.getRandomValues(a); for (const n of a) s += ALPHA[n % ALPHA.length]; return s; }
  function normUser(u) { return String(u || "").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9._-]/g, ""); }
  const now = () => new Date().toISOString();

  /* =================== MODO DEMO (localStorage) =================== */
  function LocalBackend() {
    const KEY = "de_demo_v1", SKEY = "de_demo_session";
    let db;
    try { db = JSON.parse(localStorage.getItem(KEY)); } catch (e) { db = null; }
    if (!db) db = seed();
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { console.warn(e); } };
    save();
    const strip = u => u && ({ id: u.id, username: u.username, role: u.role, created_at: u.created_at });
    return {
      demo: true,
      async session() { const id = localStorage.getItem(SKEY); return strip(db.users.find(u => u.id === id)); },
      async signIn(user, pass) {
        const u = db.users.find(x => x.username === normUser(user));
        if (!u || u.pass !== pass) throw new Error("Usuario o contraseña incorrectos");
        localStorage.setItem(SKEY, u.id); return strip(u);
      },
      async signUp(user, pass) {
        const name = normUser(user);
        if (name.length < 3) throw new Error("El usuario debe tener al menos 3 letras o números");
        if (String(pass).length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres");
        if (db.users.some(x => x.username === name)) throw new Error("Ese usuario ya existe");
        const u = { id: uid(), username: name, pass, role: db.users.length ? "pendiente" : "admin", created_at: now() };
        db.users.push(u); save(); localStorage.setItem(SKEY, u.id); return strip(u);
      },
      async signOut() { localStorage.removeItem(SKEY); },
      async loadAll() {
        return JSON.parse(JSON.stringify({ shelves: db.shelves, boxes: db.boxes, items: db.items, notes: db.notes, settings: db.settings }));
      },
      async insert(t, row) { const r = Object.assign({ id: uid(), created_at: now() }, row); db[t].push(r); save(); return JSON.parse(JSON.stringify(r)); },
      async update(t, id, patch) {
        const r = db[t].find(x => x.id === id); if (!r) throw new Error("No encontrado");
        Object.assign(r, patch); save(); return JSON.parse(JSON.stringify(r));
      },
      async remove(t, id) {
        db[t] = db[t].filter(x => x.id !== id);
        if (t === "boxes") { const gone = new Set(db.items.filter(i => i.box_id === id).map(i => i.id)); db.items = db.items.filter(i => i.box_id !== id); db.notes.forEach(n => { if (gone.has(n.item_id)) n.item_id = null; }); }
        if (t === "shelves") db.boxes.forEach(b => { if (b.shelf_id === id) b.shelf_id = null; });
        if (t === "items") db.notes.forEach(n => { if (n.item_id === id) n.item_id = null; });
        save();
      },
      async upsertMany(t, rows) { const ids = new Set(rows.map(r => r.id)); db[t] = db[t].filter(r => !ids.has(r.id)).concat(rows); save(); },
      async uploadPhoto(blob) { return await blobToDataURL(blob); },
      async listProfiles() { return db.users.map(strip); },
      async setRole(id, role) { const u = db.users.find(x => x.id === id); if (u) u.role = role; save(); },
      async deleteProfile(id) { db.users = db.users.filter(u => u.id !== id); save(); },
      async saveSettings(patch) { Object.assign(db.settings, patch); save(); return db.settings; },
      onChange() {}
    };
  }

  function seed() {
    const S = (name, color, x, y, w, h) => ({ id: uid(), name, color, x, y, w, h, position: 0, created_at: now() });
    const roja = S("Estantería Roja", "#ef4444", 40, 40, 260, 60);
    const azul = S("Estantería Azul", "#3b82f6", 40, 400, 260, 60);
    const metal = S("Metálica del fondo", "#64748b", 700, 120, 60, 280);
    const B = (shelf, label, notes) => ({ id: uid(), shelf_id: shelf.id, label, code: newCode(), color: null, notes: notes || "", position: 0, updated_at: now(), created_at: now() });
    const b1 = B(roja, "A1", "Ropa de invierno"), b2 = B(roja, "A2"), b3 = B(roja, "Navidad"),
      b4 = B(azul, "B1", "Juegos y electrónica"), b5 = B(azul, "B2"), b6 = B(metal, "Herramientas"), b7 = B(metal, "C3");
    const I = (box, name, qty, description) => ({ id: uid(), box_id: box.id, name, qty, description: description || "", photo_url: null, updated_at: now(), created_at: now() });
    const items = [
      I(b1, "Calentadores de manos desechables", 12, "Sobres Thermopad, duran 8 h"),
      I(b1, "Bolsa de agua caliente", 2, "Una con funda de punto"),
      I(b1, "Bufandas", 4, "Lana, colores variados"),
      I(b1, "Guantes de esquí", 2, "Talla M"),
      I(b2, "Cables HDMI", 5, "1,5 m y 3 m"),
      I(b2, "Cargadores USB-C", 3), I(b2, "Ladrón / regleta", 2, "6 enchufes con interruptor"),
      I(b2, "Pilas AA", 16, "Recargables Eneloop"),
      I(b3, "Luces LED de Navidad", 3, "Tiras de 10 m, luz cálida"), I(b3, "Bolas del árbol", 40, "Rojas y doradas"), I(b3, "Belén", 1, "Figuras de cerámica"),
      I(b4, "Consola PS4 con mando", 1, "Con cables"),
      I(b4, "Juego de mesa Catan", 1, "Completo"),
      I(b4, "Cargador del patinete", 1),
      I(b5, "Tienda de campaña", 1, "4 personas, Quechua"), I(b5, "Sacos de dormir", 2), I(b5, "Linterna frontal", 2, "Con pilas AAA"),
      I(b6, "Taladro percutor", 1, "Bosch, con maletín"), I(b6, "Juego de destornilladores", 1), I(b6, "Cinta americana", 3),
      I(b7, "Bombillas E27", 6, "LED 9W"), I(b7, "Alargador de 10 m", 1)
    ];
    return {
      users: [], shelves: [roja, azul, metal], boxes: [b1, b2, b3, b4, b5, b6, b7], items,
      notes: [{ id: uid(), text: "Bolsa de agua caliente", item_id: items[1].id, done: false, created_by: "demo", created_at: now() },
        { id: uid(), text: "Sacar la tienda para el finde", item_id: null, done: false, created_by: "demo", created_at: now() }],
      settings: { id: 1, ai_provider: "gemini", ai_model: "", ai_key: "", ai_base_url: "", map_w: 800, map_h: 500, map_name: "Mi bajo" }
    };
  }

  /* =================== SUPABASE =================== */
  function SupaBackend() {
    let sb = null;
    async function client() {
      if (sb) return sb;
      const mod = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
      sb = mod.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true } });
      return sb;
    }
    const chk = r => { if (r.error) throw tr(r.error); return r.data; };
    function tr(e) {
      const m = (e && (e.message || e.error_description)) || String(e);
      if (/Invalid login/i.test(m)) return new Error("Usuario o contraseña incorrectos");
      if (/already registered|already exists/i.test(m)) return new Error("Ese usuario ya existe");
      if (/Password should be/i.test(m)) return new Error("La contraseña debe tener al menos 6 caracteres");
      if (/Email not confirmed/i.test(m)) return new Error("En Supabase tienes activado «Confirm email». Desactívalo (ver README, paso 3).");
      if (/row-level security|permission denied/i.test(m)) return new Error("No tienes permiso para hacer eso");
      if (/rate limit/i.test(m)) return new Error("Demasiados intentos, espera un momento");
      return new Error(m);
    }
    async function profile(id) {
      const c = await client();
      const r = await c.from("profiles").select("*").eq("id", id).maybeSingle();
      return chk(r);
    }
    return {
      demo: false,
      async session() {
        const c = await client();
        const { data } = await c.auth.getSession();
        if (!data.session) return null;
        const pr = await profile(data.session.user.id);
        if (!pr) await c.auth.signOut();
        return pr;
      },
      async signIn(user, pass) {
        const c = await client();
        const r = await c.auth.signInWithPassword({ email: normUser(user) + "@" + EMAIL_DOMAIN, password: pass });
        chk(r); const pr = await profile(r.data.user.id);
        if (!pr) { await c.auth.signOut(); throw new Error("Esta cuenta fue eliminada por el administrador"); }
        return pr;
      },
      async signUp(user, pass) {
        const name = normUser(user);
        if (name.length < 3) throw new Error("El usuario debe tener al menos 3 letras o números");
        const c = await client();
        const r = await c.auth.signUp({ email: name + "@" + EMAIL_DOMAIN, password: pass, options: { data: { username: name } } });
        chk(r);
        if (!r.data.session) throw new Error("Cuenta creada, pero Supabase pide confirmar el email. Desactiva «Confirm email» (README, paso 3) y entra.");
        return await profile(r.data.user.id);
      },
      async signOut() { const c = await client(); await c.auth.signOut(); },
      async loadAll() {
        const c = await client();
        const [s, b, i, n, st] = await Promise.all([
          c.from("shelves").select("*").order("created_at"),
          c.from("boxes").select("*").order("created_at"),
          c.from("items").select("*").order("created_at"),
          c.from("notes").select("*").order("created_at"),
          c.from("settings").select("*").eq("id", 1).maybeSingle()
        ]);
        return { shelves: chk(s), boxes: chk(b), items: chk(i), notes: chk(n), settings: chk(st) || {} };
      },
      async insert(t, row) { const c = await client(); return chk(await c.from(t).insert(row).select().single()); },
      async update(t, id, patch) { const c = await client(); return chk(await c.from(t).update(patch).eq("id", id).select().single()); },
      async remove(t, id) { const c = await client(); chk(await c.from(t).delete().eq("id", id)); },
      async upsertMany(t, rows) { if (!rows.length) return; const c = await client(); chk(await c.from(t).upsert(rows)); },
      async uploadPhoto(blob) {
        const c = await client(); const path = uid() + ".jpg";
        chk(await c.storage.from("fotos").upload(path, blob, { contentType: "image/jpeg", cacheControl: "31536000" }));
        return c.storage.from("fotos").getPublicUrl(path).data.publicUrl;
      },
      async listProfiles() { const c = await client(); return chk(await c.from("profiles").select("*").order("created_at")); },
      async setRole(id, role) { const c = await client(); chk(await c.from("profiles").update({ role }).eq("id", id)); },
      async deleteProfile(id) { const c = await client(); chk(await c.from("profiles").delete().eq("id", id)); },
      async saveSettings(patch) { const c = await client(); return chk(await c.from("settings").update(patch).eq("id", 1).select().single()); },
      async onChange(cb) {
        if (this._sub) return; this._sub = true;
        const c = await client();
        c.channel("cambios").on("postgres_changes", { event: "*", schema: "public" }, () => cb()).subscribe();
      }
    };
  }

  function blobToDataURL(blob) { return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(blob); }); }

  /* =================== IA =================== */
  const AI_DEFAULTS = { gemini: "gemini-flash-latest", openai: "gpt-4.1-mini", anthropic: "claude-haiku-5-5", compatible: "" };
  const AI_NAMES = { gemini: "Google Gemini (tiene plan gratis)", openai: "OpenAI (ChatGPT)", anthropic: "Anthropic (Claude)", compatible: "Compatible OpenAI (Groq, OpenRouter, Ollama…)" };

  async function aiCall(settings, system, user, image) {
    const p = settings.ai_provider || "gemini";
    const model = (settings.ai_model || "").trim() || AI_DEFAULTS[p];
    const key = (settings.ai_key || "").trim();
    if (!key && p !== "compatible") throw new Error("La IA no está configurada. Un administrador debe poner la clave en Ajustes.");
    if (!model) throw new Error("Falta el nombre del modelo en Ajustes → IA");
    let res, j;
    try {
      if (p === "gemini") {
        const parts = [{ text: user }];
        if (image) parts.push({ inline_data: { mime_type: image.mime, data: image.b64 } });
        res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent?key=" + encodeURIComponent(key), {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: "user", parts }], generationConfig: { temperature: 0.2, responseMimeType: "application/json" } })
        });
        j = await res.json();
        if (!res.ok) throw new Error((j.error && j.error.message) || res.statusText);
        return ((j.candidates || [])[0]?.content?.parts || []).map(x => x.text || "").join("");
      }
      if (p === "anthropic") {
        const content = [];
        if (image) content.push({ type: "image", source: { type: "base64", media_type: image.mime, data: image.b64 } });
        content.push({ type: "text", text: user });
        res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
          body: JSON.stringify({ model, max_tokens: 2500, temperature: 0.2, system, messages: [{ role: "user", content }] })
        });
        j = await res.json();
        if (!res.ok) throw new Error((j.error && j.error.message) || res.statusText);
        return (j.content || []).map(x => x.text || "").join("");
      }
      // openai y compatibles
      const base = p === "openai" ? "https://api.openai.com/v1" : (settings.ai_base_url || "").trim().replace(/\/+$/, "");
      if (!base) throw new Error("Falta la URL base en Ajustes → IA");
      const uc = image ? [{ type: "text", text: user }, { type: "image_url", image_url: { url: "data:" + image.mime + ";base64," + image.b64 } }] : user;
      const body = { model, temperature: 0.2, messages: [{ role: "system", content: system }, { role: "user", content: uc }] };
      if (p === "openai") body.response_format = { type: "json_object" };
      const headers = { "Content-Type": "application/json" };
      if (key) headers.Authorization = "Bearer " + key;
      res = await fetch(base + "/chat/completions", { method: "POST", headers, body: JSON.stringify(body) });
      j = await res.json();
      if (!res.ok) throw new Error((j.error && (j.error.message || j.error)) || res.statusText);
      return j.choices?.[0]?.message?.content || "";
    } catch (e) {
      if (e instanceof TypeError) throw new Error("No se pudo conectar con la IA (revisa la conexión o la URL)");
      throw new Error("IA: " + e.message);
    }
  }
  function parseJSON(t) {
    t = String(t || "").replace(/```json|```/g, "");
    const a = t.indexOf("{"), b = t.lastIndexOf("}");
    if (a < 0 || b < a) throw new Error("La IA no devolvió un formato válido");
    return JSON.parse(t.slice(a, b + 1));
  }

  const AI = {
    defaults: AI_DEFAULTS, names: AI_NAMES,
    async test(settings) {
      const t = await aiCall(settings, "Responde solo JSON.", 'Devuelve exactamente {"ok":true}');
      return parseJSON(t).ok === true;
    },
    async search(settings, query, rows) {
      // rows: [{id, line}] → usamos índices cortos para ahorrar
      const lines = rows.map((r, i) => i + "|" + r.line).join("\n");
      const system = "Eres el buscador inteligente de un inventario doméstico (un bajo/trastero con estanterías y cajas), en español de España. " +
        "Recibes la lista de objetos guardados (num|nombre|descripción|caja|estantería) y una descripción libre de lo que busca la persona. " +
        "Piensa en sinónimos, nombres comerciales, marcas, usos y objetos que sirvan para lo mismo (ej.: «bolsas para calentarse en invierno» → calentadores de manos, bolsa de agua caliente, mantas eléctricas…). " +
        'Responde SOLO con JSON: {"interpretacion":"frase corta sobre qué busca","nombres_posibles":["nombres con los que se suele llamar a eso, 3-8"],"resultados":[{"n":num,"motivo":"por qué encaja, máx 12 palabras","confianza":0-100}]}. ' +
        "Ordena por confianza, máximo 15 resultados y solo objetos que de verdad puedan servir. Si nada encaja, resultados vacío.";
      const out = parseJSON(await aiCall(settings, system, "Busco: " + query + "\n\nInventario:\n" + (lines || "(vacío)")));
      return {
        interpretacion: out.interpretacion || "",
        nombres: Array.isArray(out.nombres_posibles) ? out.nombres_posibles.slice(0, 10) : [],
        resultados: (out.resultados || []).map(r => ({ id: rows[+r.n]?.id, motivo: r.motivo || "", confianza: +r.confianza || 0 })).filter(r => r.id)
      };
    },
    async photo(settings, image) {
      const system = "Identificas los objetos de la foto del contenido de una caja de almacenaje doméstica. " +
        'Responde SOLO con JSON: {"objetos":[{"nombre":"nombre corto y claro en español, como lo buscaría una persona","cantidad":n,"descripcion":"detalle útil breve (color, marca, talla, tamaño) o cadena vacía"}]}. ' +
        "Agrupa los objetos iguales sumando la cantidad. Máximo 40 objetos. No inventes cosas que no se vean.";
      const out = parseJSON(await aiCall(settings, system, "¿Qué objetos hay en esta foto?", image));
      return (out.objetos || []).filter(o => o && o.nombre).map(o => ({ name: String(o.nombre).slice(0, 120), qty: Math.max(1, parseInt(o.cantidad) || 1), description: String(o.descripcion || "").slice(0, 200) }));
    }
  };

  window.DE = { DEMO, db: DEMO ? LocalBackend() : SupaBackend(), AI, uid, newCode, normUser, blobToDataURL };
})();
