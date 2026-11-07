# ¿Dónde está? 📦

Inventario de tu bajo: estanterías → cajas → objetos. Busca cualquier cosa (sin importar tildes ni mayúsculas), pregunta a la IA con tus palabras, escanea el QR de una caja y ve al instante lo que hay dentro.

**HECHO POR @BYALVARO__**

---

## Qué tiene

- **Estanterías y cajas** con etiqueta libre (`A1`, `3`, `Navidad`…) y colores.
- **Objetos** con cantidad (botones − / + para lo que sacas o metes), descripción y **foto**.
- **Buscador instantáneo** que ignora tildes y mayúsculas («calefaccion» encuentra «Calefacción»).
- **Búsqueda con IA**: describe lo que necesitas («bolsas para calentarse en invierno») y te propone qué objetos pueden ser y en qué caja están. Si el buscador normal no encuentra nada, al pulsar Enter salta la IA sola.
- **Foto → IA**: haz una foto al contenido de una caja y la IA lo apunta todo.
- **Foto de cada producto**: botón de cámara al añadir, o toca la miniatura de un objeto.
- **Plano del bajo**: coloca las estanterías como en la realidad; al buscar se ilumina dónde está.
- **QR por caja**: se crean al instante (sin internet), se imprimen en hoja (pequeñas, medianas o grandes) y al escanear se abre la caja directamente. También hay escáner dentro de la app.
- **Para sacar**: lista de notas; te dice en qué caja está cada cosa.
- **Usuarios con contraseña**: el primero es administrador y aprueba a los demás. La IA se configura una vez para todos.
- Se actualiza en **tiempo real** en todos los dispositivos. Copia de seguridad en JSON.

Si abres la web **sin configurar Supabase**, arranca en **modo demo** (con datos de ejemplo, guardados solo en ese navegador) para que lo pruebes.

---

## Puesta en marcha (unos 10 minutos, todo gratis)

### 1. Sube la web a GitHub

1. Entra en [github.com](https://github.com) → **New repository** → nombre `donde-esta` → **Public** → *Create repository*.
2. Pulsa **uploading an existing file** y arrastra **todo el contenido** de esta carpeta (`index.html`, `css/`, `js/`, `supabase/`, etc.). *Commit changes*.
3. En el repositorio: **Settings → Pages** → *Source*: **Deploy from a branch** → Branch **main** / **(root)** → *Save*.
4. En 1–2 minutos tendrás la web en `https://TU-USUARIO.github.io/donde-esta/`.

Ya funciona en modo demo. Para que los datos se compartan entre dispositivos, sigue:

### 2. Crea la base de datos en Supabase

1. Entra en [supabase.com](https://supabase.com) → *Start your project* (con tu cuenta de GitHub) → **New project** (región: *West EU*, pon una contraseña cualquiera a la base de datos).
2. Cuando termine, ve a **SQL Editor → New query**, pega **todo** el archivo `supabase/schema.sql` y pulsa **Run**. Debe decir *Success*.
3. Ve a **Project Settings → API** (o *Data API / API Keys*) y copia:
   - **Project URL** (`https://xxxx.supabase.co`)
   - **anon public key** (la larga que empieza por `eyJ…`, o la *publishable key* `sb_publishable_…`)

### 3. Quita la confirmación por email

Los usuarios entran con **usuario y contraseña** (sin email), así que hay que desactivarla:

**Authentication → Sign In / Providers → Email** → desactiva **Confirm email** → *Save*.

### 4. Conecta la web con Supabase

En GitHub, abre `js/config.js` → icono del lápiz ✏️ → pega tus datos:

```js
window.DONDE_CONFIG = {
  SUPABASE_URL: "https://xxxx.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOi..."
};
```

*Commit changes*. En un minuto la web se actualiza.

> La *anon key* es pública por diseño: la seguridad la ponen las reglas del SQL (solo los usuarios aprobados ven los datos). **Nunca** pongas la `service_role`.

### 5. Primer uso

1. Abre tu web → **Crear cuenta**. **El primer usuario es el administrador.**
2. Ve a **Ajustes → Inteligencia artificial**:
   - Lo más fácil y gratis: **Google Gemini**. Saca una clave en [aistudio.google.com/apikey](https://aistudio.google.com/apikey), pégala, **Guardar** y **Probar**.
   - También vale OpenAI, Claude o cualquier compatible (Groq, OpenRouter, Ollama…).
3. Para añadir a tu familia: que abran la web y pulsen **Crear cuenta**. Les apruebas en **Ajustes → Usuarios**.
4. En el móvil: menú del navegador → **Añadir a pantalla de inicio**, y queda como una app.

### 6. Etiquetas QR

**Etiquetas QR** → elige tamaño → **Imprimir** → recorta y pega en cada caja. Escanéalas con la cámara del móvil o con el botón central de la app: se abre la caja al momento.

---

## Preguntas rápidas

- **¿Cuánto cuesta?** GitHub Pages y el plan gratis de Supabase cubren de sobra un uso doméstico. Gemini tiene plan gratuito.
- **Supabase gratis "se duerme"** si no se usa en 1 semana: entra en supabase.com y pulsa *Restore*. No se pierde nada.
- **¿Las fotos son privadas?** Se guardan con nombres aleatorios imposibles de adivinar, pero quien tenga el enlace exacto de una foto podría verla.
- **La clave de la IA** solo la pueden leer los usuarios aprobados.
- **Copia de seguridad**: Ajustes → Exportar.

---

HECHO POR **@BYALVARO__**
