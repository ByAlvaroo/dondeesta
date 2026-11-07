/* ¿DÓNDE ESTÁ? · datos en Firebase + IA · HECHO POR @BYALVARO__ */
(function () {
  "use strict";
  const CFG = window.DONDE_CONFIG || {};
  // Acepta también el bloque tal cual lo da Firebase: const firebaseConfig = {...}
  let pasted = null; try { pasted = typeof firebaseConfig !== "undefined" ? firebaseConfig : null; } catch (e) { }
  const FB = (CFG.FIREBASE && CFG.FIREBASE.apiKey) ? CFG.FIREBASE : (pasted || CFG.FIREBASE || {});
  const CONFIG_BROKEN = !window.DONDE_CONFIG && !pasted;
  const DEMO = !FB.apiKey || !FB.projectId;   // true = falta pegar la configuración de Firebase
  const EMAIL_DOMAIN = "dondeesta.app";
  const ADMIN_USER = "byalvaro";   // la única cuenta que es administradora (también en firestore.rules)
  const SDK = CFG.FIREBASE_SDK || "https://www.gstatic.com/firebasejs/11.0.2/";
  const COLS = ["shelves", "boxes", "items", "notes"];

  const uid = () => (crypto.randomUUID ? crypto.randomUUID()
    : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16); }));
  const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  function newCode() { let s = ""; const a = new Uint32Array(6); crypto.getRandomValues(a); for (const n of a) s += ALPHA[n % ALPHA.length]; return s; }
  function normUser(u) { return String(u || "").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9._-]/g, ""); }
  const now = () => new Date().toISOString();
  const DEFAULT_SETTINGS = { ai_provider: "gemini", ai_model: "", ai_key: "", ai_base_url: "", map_w: 800, map_h: 500, map_name: "Mi bajo" };
  function checkCreds(name, pass) {
    if (name.length < 3) throw new Error("El usuario debe tener al menos 3 letras o números");
    if (String(pass).length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres");
  }

  /* =================== FIREBASE (nube gratis, siempre activa) =================== */
  function FireBackend() {
    let F = null;                       // { A, S, auth, fs }
    const live = { started: false, ready: null, data: {}, settings: null, unsubs: [], cbs: [], initial: 0 };
    const photoCache = new Map();

    async function fb() {
      if (F) return F;
      const [mApp, mAuth, mFs] = await Promise.all([import(SDK + "firebase-app.js"), import(SDK + "firebase-auth.js"), import(SDK + "firebase-firestore.js")]);
      const app = mApp.initializeApp(FB);
      const auth = mAuth.getAuth(app);
      let fs;
      try { fs = mFs.initializeFirestore(app, { ignoreUndefinedProperties: true, localCache: mFs.persistentLocalCache({ tabManager: mFs.persistentMultipleTabManager() }) }); }
      catch (e) { fs = mFs.initializeFirestore(app, { ignoreUndefinedProperties: true }); }
      F = { A: mAuth, S: mFs, auth, fs };
      return F;
    }
    function tr(e) {
      const c = (e && e.code) || "", m = (e && e.message) || String(e);
      if (/invalid-credential|wrong-password|user-not-found|invalid-email/.test(c)) return new Error("Usuario o contraseña incorrectos");
      if (/email-already-in-use/.test(c)) return new Error("Ese usuario ya existe");
      if (/weak-password/.test(c)) return new Error("La contraseña debe tener al menos 6 caracteres");
      if (/too-many-requests/.test(c)) return new Error("Demasiados intentos, espera un momento");
      if (/operation-not-allowed/.test(c)) return new Error("En Firebase falta activar «Correo electrónico/contraseña» (README, paso 2)");
      if (/permission-denied/.test(c)) return new Error("No tienes permiso para hacer eso");
      if (/network-request-failed|unavailable/.test(c)) return new Error("Sin conexión con la nube. Revisa internet.");
      if (/api-key-not-valid|invalid-api-key/.test(c) || /api-key/.test(m)) return new Error("La configuración de Firebase en js/config.js no es correcta");
      return new Error(m);
    }
    const wrap = fn => async function () { try { return await fn.apply(this, arguments); } catch (e) { throw tr(e); } };
    const d = (t, id) => F.S.doc(F.fs, t, id);
    const clean = o => { const r = {}; for (const k in o) if (o[k] !== undefined && k[0] !== "_") r[k] = o[k]; return r; };

    async function profile(u) {
      const s = await F.S.getDoc(d("profiles", u.uid));
      return s.exists() ? Object.assign({ id: u.uid }, s.data()) : null;
    }
    // Crea el perfil: «byalvaro» es el administrador; el resto queda pendiente de aprobación.
    async function createProfile(u, name, display) {
      const p = { username: name, name: String(display || name).trim().slice(0, 40), role: name === ADMIN_USER ? "admin" : "pendiente", created_at: now() };
      await F.S.setDoc(d("profiles", u.uid), p);
      return Object.assign({ id: u.uid }, p);
    }

    function stopLive() { live.unsubs.forEach(u => { try { u(); } catch (e) { } }); Object.assign(live, { started: false, ready: null, data: {}, settings: null, unsubs: [], initial: 0 }); }
    function startLive() {
      if (live.started) return live.ready;
      live.started = true;
      let pending = COLS.length + 1, done;
      live.ready = new Promise((res, rej) => { done = res; live.fail = rej; });
      const fire = () => { live.cbs.forEach(cb => { try { cb(); } catch (e) { } }); };
      const first = () => { if (--pending === 0) done(); };
      COLS.forEach(t => {
        live.data[t] = new Map(); let init = true;
        live.unsubs.push(F.S.onSnapshot(F.S.collection(F.fs, t), snap => {
          snap.docChanges().forEach(ch => { if (ch.type === "removed") live.data[t].delete(ch.doc.id); else live.data[t].set(ch.doc.id, Object.assign({ id: ch.doc.id }, ch.doc.data())); });
          if (init) { init = false; first(); } else fire();
        }, err => { console.warn(t, err); if (init) { init = false; live.fail(tr(err)); } }));
      });
      let sInit = true;
      live.unsubs.push(F.S.onSnapshot(d("settings", "main"), snap => {
        live.settings = snap.exists() ? snap.data() : null;
        if (sInit) { sInit = false; first(); } else fire();
      }, err => { console.warn(err); if (sInit) { sInit = false; first(); } }));
      return live.ready;
    }
    const sortc = arr => arr.sort((a, b) => String(a.created_at || "").localeCompare(String(b.created_at || "")));

    const api = {
      demo: false,
      session: wrap(async function () {
        await fb(); await F.auth.authStateReady();
        const u = F.auth.currentUser; if (!u) return null;
        const p = await profile(u);
        if (p) return p;
        return await createProfile(u, normUser((u.email || "").split("@")[0]));
      }),
      signIn: wrap(async function (user, pass) {
        await fb();
        const r = await F.A.signInWithEmailAndPassword(F.auth, normUser(user) + "@" + EMAIL_DOMAIN, pass);
        return (await profile(r.user)) || (await createProfile(r.user, normUser(user), user));
      }),
      signUp: wrap(async function (user, pass) {
        const name = normUser(user); checkCreds(name, pass);
        await fb();
        const r = await F.A.createUserWithEmailAndPassword(F.auth, name + "@" + EMAIL_DOMAIN, pass);
        return await createProfile(r.user, name, user);
      }),
      signOut: wrap(async function () { await fb(); stopLive(); photoCache.clear(); await F.A.signOut(F.auth); }),
      loadAll: wrap(async function () {
        await fb(); await startLive();
        let st = live.settings;
        if (!st) { st = Object.assign({}, DEFAULT_SETTINGS); try { await F.S.setDoc(d("settings", "main"), st, { merge: true }); } catch (e) { /* solo el admin puede crearlo */ } }
        const out = { settings: Object.assign({ id: 1 }, DEFAULT_SETTINGS, st) };
        COLS.forEach(t => out[t] = sortc(Array.from(live.data[t].values()).map(x => Object.assign({}, x))));
        return out;
      }),
      insert: wrap(async function (t, row) {
        await fb();
        const r = clean(Object.assign({ id: uid(), created_at: now() }, row));
        await F.S.setDoc(d(t, r.id), r);
        return r;
      }),
      update: wrap(async function (t, id, patch) {
        await fb();
        patch = clean(patch);
        await F.S.updateDoc(d(t, id), patch);
        const cur = live.data[t] && live.data[t].get(id);
        return Object.assign({ id }, cur || (await F.S.getDoc(d(t, id))).data(), patch);
      }),
      remove: wrap(async function (t, id) {
        await fb();
        const b = F.S.writeBatch(F.fs); let n = 0;
        const add = fn => { fn(); n++; };
        const items = live.data.items ? Array.from(live.data.items.values()) : [];
        const notes = live.data.notes ? Array.from(live.data.notes.values()) : [];
        const dropItem = it => {
          add(() => b.delete(d("items", it.id)));
          if (it.photo_url && String(it.photo_url).startsWith("photo:")) add(() => b.delete(d("photos", it.photo_url.slice(6))));
          notes.filter(x => x.item_id === it.id).forEach(x => add(() => b.update(d("notes", x.id), { item_id: null })));
        };
        if (t === "items") { const it = live.data.items.get(id) || { id }; dropItem(it); }
        else {
          add(() => b.delete(d(t, id)));
          if (t === "boxes") items.filter(i => i.box_id === id).forEach(dropItem);
          if (t === "shelves") Array.from(live.data.boxes.values()).filter(x => x.shelf_id === id).forEach(x => add(() => b.update(d("boxes", x.id), { shelf_id: null })));
        }
        if (n > 480) throw new Error("Demasiados cambios a la vez; vacía la caja por partes");
        await b.commit();
      }),
      upsertMany: wrap(async function (t, rows) {
        await fb();
        for (let i = 0; i < rows.length; i += 400) {
          const b = F.S.writeBatch(F.fs);
          rows.slice(i, i + 400).forEach(r => b.set(d(t, r.id), clean(r)));
          await b.commit();
        }
      }),
      uploadPhoto: wrap(async function (blob) {
        await fb();
        const data = await blobToDataURL(blob);
        if (data.length > 950000) throw new Error("La foto es demasiado grande");
        const id = uid();
        await F.S.setDoc(d("photos", id), { data, created_at: now() });
        photoCache.set(id, data);
        return "photo:" + id;
      }),
      async getPhoto(url) {
        if (!url || !String(url).startsWith("photo:")) return url;
        const id = url.slice(6);
        if (photoCache.has(id)) return photoCache.get(id);
        const p = (async () => { await fb(); const s = await F.S.getDoc(d("photos", id)); return s.exists() ? s.data().data : ""; })();
        photoCache.set(id, p);
        const v = await p.catch(() => ""); photoCache.set(id, v); return v;
      },
      cachedPhoto(url) { if (!url || !String(url).startsWith("photo:")) return url; const v = photoCache.get(url.slice(6)); return typeof v === "string" ? v : null; },
      async deletePhoto(url) {
        if (!url || !String(url).startsWith("photo:")) return;
        try { await fb(); await F.S.deleteDoc(d("photos", url.slice(6))); photoCache.delete(url.slice(6)); } catch (e) { console.warn(e); }
      },
      listProfiles: wrap(async function () {
        await fb(); const s = await F.S.getDocs(F.S.collection(F.fs, "profiles"));
        return sortc(s.docs.map(x => Object.assign({ id: x.id }, x.data())));
      }),
      setRole: wrap(async function (id, role) { await fb(); await F.S.updateDoc(d("profiles", id), { role }); }),
      deleteProfile: wrap(async function (id) { await fb(); await F.S.deleteDoc(d("profiles", id)); }),
      saveSettings: wrap(async function (patch) {
        await fb(); await F.S.setDoc(d("settings", "main"), clean(patch), { merge: true });
        return Object.assign({ id: 1 }, DEFAULT_SETTINGS, live.settings || {}, patch);
      }),
      onChange(cb) { if (!live.cbs.includes(cb)) live.cbs.push(cb); }
    };
    return api;
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

  window.DE = { DEMO, CONFIG_BROKEN, db: FireBackend(), AI, uid, newCode, normUser, blobToDataURL };
})();
