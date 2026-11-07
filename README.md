# ¿Dónde está? 📦

Inventario de tu bajo: estanterías → cajas → objetos. Busca cualquier cosa (sin importar tildes ni mayúsculas), pregunta a la IA con tus palabras, escanea el QR de una caja y ve al instante lo que hay dentro.

**HECHO POR @BYALVARO__**

La web vive en **GitHub Pages** y los datos en **Firebase** (de Google). Las dos cosas son **gratis, sin tarjeta y siempre activas**: no se duermen ni caducan por no usarlas.

---

## Qué tiene

- **Estanterías y cajas** con etiqueta libre (`A1`, `3`, `Navidad`…) y colores.
- **Objetos** con cantidad (botones − / + para lo que sacas o metes), descripción y **foto**.
- **Fotos de cada producto**: botón de cámara al añadir, o toca la miniatura de un objeto.
- **Buscador instantáneo** que ignora tildes y mayúsculas.
- **Búsqueda con IA**: describe lo que necesitas («bolsas para calentarse en invierno») y te dice qué objetos pueden ser y en qué caja están. Si el buscador normal no encuentra nada, al pulsar Enter salta la IA sola.
- **Foto → IA**: haz una foto al contenido de una caja y la IA lo apunta todo.
- **Plano del bajo**: coloca las estanterías como en la realidad; al buscar se ilumina dónde está.
- **QR por caja**: se crean al instante, se imprimen en hoja y al escanear se abre la caja directamente.
- **Para sacar**: lista de notas que te dice en qué caja está cada cosa.
- **Usuarios con contraseña**: el administrador es **ByAlvaro** y aprueba a los demás. La IA se configura una vez para todos.
- **Tiempo real**: lo que cambia uno aparece al momento en el resto de móviles y ordenadores.
- **Empieza vacía**: al crear tu cuenta no hay nada; tú creas tus estanterías.

---

## Puesta en marcha (unos 10 minutos)

### 1. Sube la web a GitHub

1. Entra en [github.com](https://github.com) → **New repository** → nombre `donde-esta` → **Public** → *Create repository*.
2. Pulsa **uploading an existing file** y arrastra **todo el contenido** de esta carpeta (`index.html`, `css/`, `js/`, `firestore.rules`…). *Commit changes*.
3. En el repositorio: **Settings → Pages** → *Source*: **Deploy from a branch** → Branch **main** / **(root)** → *Save*.
4. En 1–2 minutos tendrás la web en `https://TU-USUARIO.github.io/donde-esta/`.

### 2. Crea el proyecto de Firebase

1. Entra en [console.firebase.google.com](https://console.firebase.google.com) con tu cuenta de Google → **Crear un proyecto** → nombre `donde-esta` → puedes desactivar Google Analytics → *Crear*.
2. Menú izquierdo **Compilación → Authentication** → *Comenzar* → **Correo electrónico/contraseña** → actívalo (solo el primer interruptor) → *Guardar*.

### 3. Crea la base de datos y pon la seguridad

1. **Compilación → Firestore Database** → *Crear base de datos* → ubicación **eur3 (Europa)** → **Modo de producción** → *Crear*.
2. Pestaña **Reglas** → borra lo que hay, pega **todo** el archivo `firestore.rules` → **Publicar**.

### 4. Conecta la web con Firebase

1. Pulsa ⚙ (**Configuración del proyecto**) → abajo, **Tus apps** → icono **`</>`** (Web) → apodo `donde-esta` → *Registrar app* (no marques Hosting).
2. Te enseña un bloque `const firebaseConfig = { apiKey: "...", ... }`. Cópialo.
3. En GitHub abre `js/config.js` → lápiz ✏️ → rellena cada campo con lo que copiaste:

```js
window.DONDE_CONFIG = {
  FIREBASE: {
    apiKey: "AIzaSy...",
    authDomain: "donde-esta-xxxx.firebaseapp.com",
    projectId: "donde-esta-xxxx",
    storageBucket: "donde-esta-xxxx.firebasestorage.app",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef"
  }
};
```

*Commit changes*. En un minuto la web se actualiza.

> Estos datos son públicos por diseño (todas las webs con Firebase los llevan): la seguridad la ponen las reglas del paso 3, así que solo los usuarios que tú apruebes ven tus cosas.

### 5. Primer uso

1. Abre tu web → **Crear cuenta** con usuario **ByAlvaro** y tu contraseña. Esa cuenta es la **administradora** (solo ella puede serlo). Créala nada más publicar la web.
2. **Ajustes → Inteligencia artificial**: lo más fácil y gratis es **Google Gemini**. Saca una clave en [aistudio.google.com/apikey](https://aistudio.google.com/apikey), pégala, **Guardar** y **Probar**. (También vale OpenAI, Claude o cualquier compatible.)
3. Para añadir a tu familia: que abran la web y pulsen **Crear cuenta**. Les apruebas en **Ajustes → Usuarios**.
4. En el móvil: menú del navegador → **Añadir a pantalla de inicio**, y queda como una app.
5. **Etiquetas QR** → elige tamaño → **Imprimir** → recorta y pega en cada caja.

---

## Preguntas rápidas

- **¿Cuánto cuesta?** Nada. El plan gratis de Firebase (Spark) no pide tarjeta: 1 GB de datos y 50.000 lecturas al día, de sobra para casa.
- **¿Se apaga si no lo uso?** No. Ni GitHub Pages ni Firebase se duermen.
- **¿Dónde van las fotos?** Dentro de la propia base de datos, comprimidas (unos 100 KB cada una), así no hace falta ningún servicio de pago. Caben miles.
- **¿Funciona sin internet?** Para consultar y guardar necesita conexión (en el bajo, aunque sea con datos móviles). Al abrirla te enseña al instante lo último que viste mientras se conecta.
- **¿Y si abro la web sin configurar Firebase?** Te avisa de que falta el paso 4.
- **Copia de seguridad**: Ajustes → Exportar.

---

HECHO POR **@BYALVARO__**
