// ============================================================
// generar-seed.mjs — genera src/data/resenas-seed.js
//
// Lee public/resenas.json (las 436 reseñas reales exportadas de
// Google Takeout) y escribe un módulo chico con el resumen y las
// primeras N reseñas.
//
// Para qué: la página /resenas pinta esas N al instante (van en el
// HTML pre-renderizado, así que Google las ve y el usuario no mira
// una pantalla vacía) y recién después, en segundo plano, baja el
// JSON completo para el buscador y los filtros.
//
// Se ejecuta solo con "npm run build" (hook prebuild). Cuando
// reemplaces public/resenas.json no tenés que tocar nada más.
// ============================================================

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ENTRADA = resolve(raiz, 'public/resenas.json');
const SALIDA = resolve(raiz, 'src/data/resenas-seed.js');
const CUANTAS = 18;

const datos = JSON.parse(readFileSync(ENTRADA, 'utf8'));

if (!datos?.meta || !Array.isArray(datos.resenas)) {
  throw new Error('public/resenas.json no tiene la forma { meta, resenas }');
}

// Las reseñas vienen de la más nueva a la más vieja. Tomamos las
// primeras con texto: una tarjeta sin texto no aporta nada arriba.
const seed = datos.resenas.filter((r) => r.texto).slice(0, CUANTAS);

const salida = `// ARCHIVO GENERADO — no editar a mano.
// Lo escribe scripts/generar-seed.mjs a partir de public/resenas.json
// en cada build. Si querés cambiar las reseñas, reemplazá ese JSON.

export const META_RESENAS = ${JSON.stringify(datos.meta, null, 2)};

export const RESENAS_SEED = ${JSON.stringify(seed, null, 2)};
`;

mkdirSync(dirname(SALIDA), { recursive: true });
writeFileSync(SALIDA, salida, 'utf8');

console.log(
  `[resenas] seed generado: ${seed.length} reseñas de ${datos.meta.total} · promedio ${datos.meta.promedio}`
);

// El schema de LocalBusiness vive en index.html (HTML estatico, no puede leer
// el JSON). Lo sincronizamos aca para que el reviewCount no quede viejo.
const INDEX = resolve(raiz, 'index.html');
const html = readFileSync(INDEX, 'utf8');
const htmlNuevo = html.replace(/("reviewCount":\s*")\d+(")/, `$1${datos.meta.total}$2`);
if (htmlNuevo !== html) {
  writeFileSync(INDEX, htmlNuevo, 'utf8');
  console.log(`[resenas] index.html: reviewCount -> ${datos.meta.total}`);
}
