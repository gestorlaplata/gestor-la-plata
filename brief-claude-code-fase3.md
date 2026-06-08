\# Brief técnico para Claude Code — GLP Fase 3 (consolidado)



\*\*Repo:\*\* `gestorlaplata/gestor-la-plata` (rama `main`)

\*\*Stack:\*\* Vite + React, SPA. Todo en `src/App.jsx` (\~1106 líneas, 235 KB). Sin react-router (navegación con state interno y objeto `SLUGS` hardcodeado, \~línea 850). Sin react-helmet (manipulación DOM directa via `useEffect`). Deploy en Vercel desde GitHub.

\*\*Hosting:\*\* Vercel (plan Hobby), proyecto `gestor-la-plata`. Cloudflare delante como CDN/proxy con rule `Apex a WWW` activa.



\*\*Contexto del proyecto:\*\* Sitio en producción (gestorlaplata.com), \~317 reseñas 5.0 en Google, +334% crecimiento Q1 2026. Drop de tráfico orgánico el 11 de abril por migración mal coordinada. Fase 3 de profesionalización digital en ejecución. Hitos ya completados al momento de este brief: redirects 301 en Cloudflare, redirect apex→www, robots.txt con URLs www, sitemap.xml con URLs www. Lo que sigue son los 4 cambios al código del SPA que requieren tu intervención.



\---



\## Resumen ejecutivo



Cuatro cambios encadenados al repo, en este orden:



1\. \*\*Activar pre-render del SPA\*\* — bloqueo crítico para SEO. Google indexa el shell vacío hoy.

2\. \*\*Mover canonical de apex a www\*\* — 1 string en una helper, afecta canonical + og:url + JSON-LD.

3\. \*\*Limpiar JSON-LD duplicado\*\* — hay dos `ProfessionalService` en producción (estático en index.html + inyectado por React).

4\. \*\*Verificación final\*\* — curl + view-source contra cada landing para confirmar que el HTML servido tiene title/description/h1 únicos.



Tiempo estimado total: 2-4 horas según opción de pre-render elegida.



\---



\## Cambio 1 — Pre-render del SPA (BLOQUEANTE)



\*\*Problema diagnosticado en Hito 3 (verificado con view-source):\*\*

\- El HTML servido por Vercel para CUALQUIER URL (`/alta-comercial`, `/informe-de-dominio`, etc.) es el mismo `index.html` estático.

\- `index.html` tiene `<title>` y `<meta description>` globales (genéricos para toda la web).

\- `index.html` tiene un solo `<div id="root"></div>` vacío.

\- NO hay `<h1>` en el HTML crudo.

\- Los titles únicos por landing los setea un `useEffect` en App.jsx que solo corre DESPUÉS de que JS se ejecute en el navegador.

\- Conclusión: Googlebot puede ejecutar JS, pero el contenido específico de cada landing llega tarde y de forma inconsistente. Los crawlers de IA (GPTBot, ClaudeBot) probablemente no ejecutan JS y solo ven el shell.



\*\*Si se pide reindexación a Google sin resolver esto:\*\* Google indexa 28 copias del shell de la home, no 28 landings distintas. SEO se mantiene roto.



\### Opciones evaluadas



\*\*Opción A — `vite-plugin-prerender` (recomendada)\*\*



\- Refactor mínimo: el SPA sigue siendo SPA en runtime, pero al buildear se genera un HTML pre-renderizado por cada ruta del array `SLUGS`.

\- Requiere agregar `react-router-dom` (o similar) para que el plugin pueda recorrer las rutas, O usar la opción `routes: \[...]` del plugin con paths estáticos.

\- Mantiene App.jsx como entry point.

\- Trabajo estimado: 1-2 horas.



\*\*Opción B — `vite-ssg`\*\*



\- Migra a static-site generation. Requiere cambiar `main.jsx` para usar el entry de vite-ssg.

\- Más limpio que A, pero implica reescribir el seteo de meta tags (de DOM directo via useEffect a un sistema declarativo, ej. `useHead` de @vueuse/head o similar).

\- Trabajo estimado: 3-5 horas.



\*\*Opción C — Migrar a Astro o Next.js\*\*



\- Solución a largo plazo más sólida, pero requiere reescribir parte importante del proyecto.

\- Trabajo estimado: 1-2 días.

\- Descartada para esta fase. Reevaluar en 6 meses.



\*\*Recomendación:\*\* Opción A. Mínimo refactor, máximo retorno. Documentar como "pre-render Vite + plugin" en README.



\### Implementación Opción A — guía técnica



```bash

npm install -D vite-plugin-prerender

```



En `vite.config.js`:

```js

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import prerender from 'vite-plugin-prerender'

import path from 'path'



const ROUTES = \[

&#x20; '/',

&#x20; '/servicios-registrales',

&#x20; '/arba-y-catastro',

&#x20; '/actas-e-inscripciones',

&#x20; '/habilitaciones-comerciales',

&#x20; '/permisos-y-publicidad',

&#x20; '/informes-registrales',

&#x20; '/informe-de-dominio',

&#x20; '/indice-de-titularidad',

&#x20; '/anotaciones-personales',

&#x20; '/informe-de-frecuencia',

&#x20; '/copia-de-asiento',

&#x20; '/estudio-de-titulo',

&#x20; '/antecedentes-catastrales',

&#x20; '/copia-de-plano',

&#x20; '/valuacion-fiscal',

&#x20; '/servicio-agrimensores',

&#x20; '/actas-registro-civil',

&#x20; '/inscripcion-divorcio',

&#x20; '/apostilla-de-la-haya',

&#x20; '/alta-comercial',

&#x20; '/transferencia-comercial',

&#x20; '/baja-comercial',

&#x20; '/eventos-la-plata',

&#x20; '/publicidad-la-plata',

&#x20; '/reba-la-plata',

&#x20; '/quienes-somos',

&#x20; '/politica-de-privacidad',

&#x20; '/politica-de-cookies',

];



export default defineConfig({

&#x20; plugins: \[

&#x20;   react(),

&#x20;   prerender({

&#x20;     staticDir: path.join(\_\_dirname, 'dist'),

&#x20;     routes: ROUTES,

&#x20;     renderer: '@prerenderer/renderer-puppeteer',

&#x20;     rendererOptions: {

&#x20;       renderAfterTime: 1500,

&#x20;     },

&#x20;   }),

&#x20; ],

})

```



\*\*El array `ROUTES` debe sincronizarse con el array de URLs en `public/sitemap.xml`.\*\* Si la URL existe en el sitemap, debe estar pre-renderizada. Considerar exportar una constante compartida.



\*\*Verificación post-build (local antes de deploy):\*\*

```bash

npm run build

ls dist/alta-comercial/index.html

cat dist/alta-comercial/index.html | grep -i '<title>'

```



\*\*Verificación post-deploy (en Vercel):\*\*

```bash

curl -s https://www.gestorlaplata.com/alta-comercial | grep -i '<title>'

curl -s https://www.gestorlaplata.com/alta-comercial | grep -i '<h1'

```



\---



\## Cambio 2 — Canonical apex → www



\*\*Diagnóstico:\*\* todo el canonical y og:url se generan desde una helper en `src/App.jsx:935-937` con URL hardcodeada al apex. Sitemap y robots.txt ya están con www, pero el canonical contradice eso → Google ve dos versiones del sitio y divide el equity.



\### Cambios exactos



\*\*Cambio 2.1 — `src/App.jsx`, línea 936:\*\*



```jsx

// ❌ ANTES

function getCanonical(path) {

&#x20; return "https://gestorlaplata.com" + (path === "/" ? "" : path);

}



// ✅ DESPUÉS

function getCanonical(path) {

&#x20; return "https://www.gestorlaplata.com" + (path === "/" ? "/" : path);

}

```



\*\*Cambio 2.2 — `src/App.jsx`, línea \~1025 (dentro del JSON-LD inyectado):\*\*



```jsx

"url": "https://gestorlaplata.com",        // → "https://www.gestorlaplata.com"

"image": "https://gestorlaplata.com/logo.png",  // → "https://www.gestorlaplata.com/logo.png"

```



\*\*Cambio 2.3 — `index.html`, líneas 49-51 (JSON-LD estático):\*\*



```html

"url": "https://gestorlaplata.com",

"logo": "https://gestorlaplata.com/android-chrome-512x512.png",

"image": "https://gestorlaplata.com/android-chrome-512x512.png",

```



Cambiar las tres a `https://www.gestorlaplata.com/...`.



\---



\## Cambio 3 — Limpiar JSON-LD duplicado



\*\*Diagnóstico:\*\* hay DOS bloques JSON-LD `ProfessionalService` en producción:

1\. Uno estático en `index.html` (líneas \~40-60).

2\. Uno inyectado por React via useEffect en `src/App.jsx:1020-1030`.



\*\*Decisión recomendada:\*\* eliminar el JSON-LD inyectado por React (en App.jsx) y dejar solo el estático en `index.html`, ampliándolo:



```html

<script type="application/ld+json">

{

&#x20; "@context": "https://schema.org",

&#x20; "@type": \["ProfessionalService", "LocalBusiness"],

&#x20; "name": "Gestor La Plata",

&#x20; "description": "Gestoría administrativa y judicial en La Plata y Provincia de Buenos Aires. Matrícula 10001.",

&#x20; "url": "https://www.gestorlaplata.com",

&#x20; "telephone": "+54-221-488-6197",

&#x20; "email": "info@gestorlaplata.com",

&#x20; "logo": "https://www.gestorlaplata.com/android-chrome-512x512.png",

&#x20; "image": "https://www.gestorlaplata.com/android-chrome-512x512.png",

&#x20; "priceRange": "$$",

&#x20; "areaServed": {

&#x20;   "@type": "AdministrativeArea",

&#x20;   "name": "La Plata, Provincia de Buenos Aires"

&#x20; },

&#x20; "aggregateRating": {

&#x20;   "@type": "AggregateRating",

&#x20;   "ratingValue": "5.0",

&#x20;   "reviewCount": "317"

&#x20; },

&#x20; "employee": {

&#x20;   "@type": "Person",

&#x20;   "name": "Santiago A. Ippolito",

&#x20;   "jobTitle": "Gestor Administrativo y Judicial",

&#x20;   "identifier": "Matrícula 10001 PBA"

&#x20; }

}

</script>

```



\---



\## Cambio 4 — Verificación final post-deploy



\*\*Antes de mergear / deployar:\*\*



```bash

npm run build

find dist -name "index.html" | wc -l

```



Debe dar \~29.



\*\*Después de deployar a Vercel:\*\*



```bash

curl -s https://www.gestorlaplata.com/robots.txt | head -3

curl -s https://www.gestorlaplata.com/sitemap.xml | head -10



for path in / alta-comercial informe-de-dominio apostilla-de-la-haya; do

&#x20; echo "=== $path ==="

&#x20; curl -s "https://www.gestorlaplata.com$path" | grep -i 'rel="canonical"'

done

```



\*\*Criterios de éxito:\*\*

\- 29 archivos pre-renderizados en `dist/`.

\- Cada `curl` devuelve `<title>` y `<h1>` específicos de la landing.

\- `<link rel="canonical">` apunta siempre a `https://www.gestorlaplata.com/...`.

\- Solo UN bloque JSON-LD `ProfessionalService` en cada HTML.



\---



\## Notas y riesgos



\- No mergear los 4 cambios en commits separados. PR único con los 4 cambios.

\- Vercel.json no requiere cambios.

\- Después de mergear: NO pedir reindexación a Google todavía. Esperar 24-48hs.



\---



\## Checklist final para Claude Code



```

\[ ] 1. Instalar vite-plugin-prerender

\[ ] 2. Modificar vite.config.js con array ROUTES sincronizado con sitemap

\[ ] 3. Verificar que el useEffect de App.jsx termina antes de renderAfterTime

\[ ] 4. Cambio 2.1 — getCanonical() línea 936: apex → www

\[ ] 5. Cambio 2.2 — JSON-LD inyectado en App.jsx \~1025: apex → www

\[ ] 6. Cambio 2.3 — JSON-LD estático en index.html líneas 49-51: apex → www

\[ ] 7. Cambio 3 — Eliminar bloque schemaScript en App.jsx \~1015-1035

\[ ] 8. Cambio 3 — Ampliar JSON-LD estático en index.html con todos los campos

\[ ] 9. npm run build local — verificar 29 archivos pre-renderizados

\[ ] 10. Spot-check con curl en build local

\[ ] 11. Commit único: "feat(seo): pre-render + canonical www + JSON-LD limpio"

\[ ] 12. Push a main → Vercel deploya automáticamente

\[ ] 13. Verificación post-deploy con curl

\[ ] 14. Avisar a Santi para que cargue sitemap nuevo en GSC y solicite indexación

```

