// ===================================================================
// CONSULTA DE ESTADO EN EL RPBA
// ===================================================================
// La app de Gestor corre como archivo local en el navegador, y desde ahí no
// se puede leer el contenido de otro sitio: lo prohíbe el navegador. Esta
// función hace esa consulta desde el servidor, donde esa restricción no
// existe, y le devuelve a la app sólo el resultado.
//
// Cómo se distingue el estado: el link que da el Registro, /firma/<hash>,
// redirige a un lado o a otro según cómo esté el trámite.
//
//   termina en /estadoTramite/...        sigue en el Registro
//   termina en /signature/consulta...    tiene salida (el documento está)
//   termina en /backups/                 el Registro está en mantenimiento
//
// Ese último caso es el que importa no confundir: un día de mantenimiento
// todos los links responden eso, y sin contemplarlo la app marcaría los
// trámites mal. Por eso se devuelve como estado propio y no como error.

// Sólo se consulta al Registro. Sin esta lista, cualquiera podría usar la
// función para pedir páginas a cualquier sitio desde tu dominio.
const HOSTS = [
  'servicios.rpba.gob.ar',   // Registro de la Propiedad
  'servicios.rpba.gov.ar',
  'www16.arba.gov.ar',       // ARBA / Catastro
  'www.arba.gov.ar',
];
const MAX_LINKS = 80;      // tope por pedido
const DE_A = 4;            // de a cuántos se consulta en paralelo
const TIMEOUT_MS = 15000;

function hostPermitido(u) {
  try {
    return HOSTS.includes(new URL(u).hostname.toLowerCase());
  } catch {
    return false;
  }
}

// El HTML del Registro es de los viejos, con tablas, y usa DOS formas
// distintas de presentar un dato:
//
//   Estado            ->  <td>Estado</td><td>:</td><td>EN PROCESO</td>
//   Número de Entrada ->  una fila de encabezados y abajo la de valores
//
// Por eso no alcanza con una expresión regular sobre el texto plano: se
// reconstruyen las filas y las celdas, y después se busca de las dos formas.
// El servidor recibe el HTML crudo, y ahí las tildes vienen codificadas:
// "Estado Tr&aacute;mite". En el navegador uno ve el texto ya decodificado y
// no se da cuenta. Si no se decodifican, las etiquetas con tilde —que en
// ARBA son justo las que importan— no se encuentran nunca.
const ENTIDADES = {
  nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  aacute: '\u00e1', eacute: '\u00e9', iacute: '\u00ed', oacute: '\u00f3', uacute: '\u00fa',
  Aacute: '\u00c1', Eacute: '\u00c9', Iacute: '\u00cd', Oacute: '\u00d3', Uacute: '\u00da',
  ntilde: '\u00f1', Ntilde: '\u00d1', uuml: '\u00fc', Uuml: '\u00dc',
  ordf: '\u00aa', ordm: '\u00ba', deg: '\u00b0', middot: '\u00b7',
  ndash: '\u2013', mdash: '\u2014',
};
function entidades(s) {
  return String(s)
    .replace(/&([a-zA-Z]+);/g, (todo, nombre) => {
      if (Object.prototype.hasOwnProperty.call(ENTIDADES, nombre)) return ENTIDADES[nombre];
      const bajo = nombre.toLowerCase();
      return Object.prototype.hasOwnProperty.call(ENTIDADES, bajo) ? ENTIDADES[bajo] : todo;
    })
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}


// Devuelve [[celda, celda, ...], ...] — una entrada por fila de tabla.
function aFilas(html) {
  const limpio = String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<\/t[dh]>/gi, '\u0001')      // fin de celda
    .replace(/<\/tr>/gi, '\u0002')         // fin de fila
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '');
  return entidades(limpio)
    .split('\u0002')
    .map((fila) =>
      fila.split('\u0001').map((c) => c.replace(/\s+/g, ' ').trim())
    )
    .filter((f) => f.some((c) => c));
}

// Al comparar etiquetas se ignoran tildes, mayúsculas, puntuación y los
// espacios de más. Así "Estado Trámite", "ESTADO TRAMITE" y "Estado  Tramite"
// son la misma etiqueta, y una entidad que se haya escapado no rompe nada.
const pelar = (s) =>
  String(s || '')
    .replace(/&[a-zA-Z]+;/g, ' ')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

// Forma 1: la etiqueta y el valor están en la misma fila, separados por una
// celda con dos puntos. Ese ":" es lo que distingue una fila de dato de una
// fila de encabezados: sin exigirlo, "Número de Entrada" —que es un título
// de columna— se confundiría con una etiqueta y devolvería el título de al
// lado en vez del número.
// Devuelve null si la etiqueta no está, y '' si está pero sin valor. La
// diferencia importa: si devolviera '' en los dos casos, un campo vacío
// seguiría buscando por columna y terminaría trayendo la etiqueta de la
// fila de abajo como si fuera el dato.
function porEtiqueta(filas, etiqueta) {
  const buscada = pelar(etiqueta);
  for (const fila of filas) {
    const i = fila.findIndex((c) => pelar(c) === buscada);
    if (i < 0) continue;
    if (String(fila[i + 1] || '').trim() !== ':') continue;
    for (let j = fila.length - 1; j > i + 1; j--) {
      const v = fila[j].trim();
      if (v) return v;
    }
    return '';
  }
  return null;
}

// Forma 2: la etiqueta es un encabezado y el valor está en la fila siguiente,
// en la misma columna.
function porColumna(filas, etiqueta) {
  const buscada = pelar(etiqueta);
  for (let f = 0; f < filas.length - 1; f++) {
    const i = filas[f].findIndex((c) => pelar(c) === buscada);
    if (i < 0) continue;
    const abajo = filas[f + 1];
    if (abajo && abajo[i] && abajo[i].trim()) return abajo[i].trim();
  }
  return '';
}

function sacar(filas, etiqueta) {
  const r = porEtiqueta(filas, etiqueta);
  if (r !== null) return r;                 // estaba, con o sin valor
  return porColumna(filas, etiqueta);
}

// El Registro entrega una cookie de sesión en el primer salto y espera
// recibirla de vuelta en el siguiente. Si no la recibe, manda a su control
// de acceso (josso_security_check) y no se ve nada. El seguidor automático
// de redirecciones no guarda cookies, así que los saltos se hacen a mano.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

function sumarCookies(frasco, res) {
  let crudas = [];
  try {
    crudas = typeof res.headers.getSetCookie === 'function' ? res.headers.getSetCookie() : [];
  } catch { /* runtime sin soporte */ }
  if (!crudas.length) {
    const una = res.headers.get('set-cookie');
    if (una) crudas = [una];
  }
  for (const c of crudas) {
    const par = String(c).split(';')[0];
    const i = par.indexOf('=');
    if (i > 0) frasco.set(par.slice(0, i).trim(), par.slice(i + 1).trim());
  }
}

// ARBA sirve sus páginas en windows-1252, una codificación vieja donde la
// "á" es un solo byte. Si se la lee como UTF-8 —que es lo que hace res.text()
// por defecto— ese byte no significa nada y la tilde se convierte en un
// carácter roto: "Estado Trámite" queda ilegible y la etiqueta no se
// encuentra nunca. Por eso hay que leer los bytes y decodificarlos con la
// codificación que la propia página declara.
async function leerCuerpo(res) {
  const buf = Buffer.from(await res.arrayBuffer());
  let cs = '';
  const ct = res.headers.get('content-type') || '';
  const mCt = /charset=["']?([\w-]+)/i.exec(ct);
  if (mCt) cs = mCt[1];
  if (!cs) {
    // Si la cabecera no lo dice, lo dice el <meta> de las primeras líneas.
    const asomo = buf.subarray(0, 4096).toString('latin1');
    const mMeta = /charset=["']?([\w-]+)/i.exec(asomo);
    if (mMeta) cs = mMeta[1];
  }
  cs = String(cs || 'utf-8').toLowerCase();
  if (cs === 'utf-8' || cs === 'utf8') return buf.toString('utf8');
  try {
    return new TextDecoder(cs).decode(buf);
  } catch {
    // windows-1252 e ISO-8859-1 comparten las letras acentuadas, así que
    // esto alcanza para el castellano aunque el runtime no conozca el nombre.
    return buf.toString('latin1');
  }
}

async function seguir(url, signal) {
  const frasco = new Map();
  let actual = url;
  for (let salto = 0; salto < 10; salto++) {
    const cookies = [...frasco].map(([k, v]) => k + '=' + v).join('; ');
    const res = await fetch(actual, {
      redirect: 'manual',
      signal,
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
        'Accept-Language': 'es-AR,es;q=0.9',
        ...(cookies ? { Cookie: cookies } : {}),
      },
    });
    sumarCookies(frasco, res);
    const destino = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && destino) {
      actual = new URL(destino, actual).toString();
      if (!hostPermitido(actual)) return { final: actual, cuerpo: '', fuera: true };
      continue;
    }
    return { final: actual, cuerpo: await leerCuerpo(res), fuera: false };
  }
  return { final: actual, cuerpo: '', fuera: false };
}

async function consultar(url) {
  const base = { url, estado: 'error', detalle: '', final: '' };
  if (!hostPermitido(url)) {
    return { ...base, detalle: 'Esa dirección no es del Registro.' };
  }
  const ac = new AbortController();
  const reloj = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const salto = await seguir(url, ac.signal);
    const final = salto.final || url;
    const r = { ...base, final };
    if (salto.fuera) return { ...r, detalle: 'El Registro redirigió fuera de su sitio.' };
    if (/josso|security_check/i.test(final)) {
      return { ...r, detalle: 'El Registro pidió iniciar sesión para ver este trámite.' };
    }

    if (/\/backups\//i.test(final)) {
      return { ...r, estado: 'mantenimiento', detalle: 'El Registro está en mantenimiento.' };
    }
    if (/\/signature\/consulta/i.test(final)) {
      return { ...r, estado: 'salida', detalle: 'El documento ya está disponible.' };
    }
    const esArba = /arba\.gov\.ar/i.test(final);
    if (!esArba && !/\/estadoTramite\//i.test(final)) {
      return { ...r, detalle: 'El Registro devolvió una pantalla que no reconozco.' };
    }

    const filas = aFilas(salto.cuerpo);
    // Cada organismo rotula la misma cosa distinto: el Registro pone
    // "Estado" y ARBA "Estado Trámite". Se prueban los dos.
    const oficial = sacar(filas, 'Estado') || sacar(filas, 'Estado Trámite');
    const entrada = sacar(filas, 'Número de Entrada') || sacar(filas, 'Oblea');
    const fecha = sacar(filas, 'Fecha') || sacar(filas, 'Fecha Alta');
    const tipoActo = sacar(filas, 'Tipo de Acto') || sacar(filas, 'Tipo Trámite');
    // El Registro sí distingue cómo salió, y lo escribe en el mismo campo:
    //   "CON SALIDA: 18/11/2026"      -> salió el informe
    //   "CON DEVOLUCION: 18/11/2026"  -> lo devolvieron
    // Los que se retiran en papel (comunicado, suspensión de plano) lo dicen
    // con esas mismas palabras, así que no hace falta tratarlos distinto.
    const texto = String(oficial || '').toUpperCase();
    const devuelto = /DEVOLUCI|DEVUELT/.test(texto);
    const salida = devuelto || /CON\s*SALIDA|FINALIZAD/.test(texto);
    return {
      ...r,
      estado: salida ? 'salida' : 'proceso',
      comoSalio: salida ? (devuelto ? 'DEVUELTO' : 'FINALIZADO') : '',
      salidaFecha: salida ? ((/(\d{2}\/\d{2}\/\d{4})/.exec(oficial) || [])[1] || '') : '',
      organismo: esArba ? 'arba' : 'rpba',
      oficial,                               // lo que dice el Registro, tal cual
      entrada,                               // el número de entrada: sirve para verificar
      fecha,
      tipoActo,
      detalle: oficial
        ? ((esArba ? 'ARBA dice: ' : 'El Registro dice: ') + oficial)
        : (esArba ? 'ARBA contestó pero no encontré el estado.' : 'Sigue en el Registro.'),
    };
  } catch (e) {
    const corte = e && e.name === 'AbortError';
    return {
      ...base,
      detalle: corte ? 'El Registro tardó demasiado en contestar.' : 'No se pudo consultar.',
    };
  } finally {
    clearTimeout(reloj);
  }
}

// De a tandas chicas: el Registro es un sitio del Estado y no tiene por qué
// aguantar ochenta pedidos de golpe.
async function enTandas(urls) {
  const salida = [];
  for (let i = 0; i < urls.length; i += DE_A) {
    const tanda = urls.slice(i, i + DE_A);
    const r = await Promise.all(tanda.map(consultar));
    salida.push(...r);
  }
  return salida;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Usá POST con { links: [...] }' });
  }

  let cuerpo = req.body;
  if (typeof cuerpo === 'string') {
    try { cuerpo = JSON.parse(cuerpo); } catch { cuerpo = null; }
  }
  const links = Array.isArray(cuerpo && cuerpo.links) ? cuerpo.links : null;
  if (!links || !links.length) {
    return res.status(400).json({ error: 'Faltan los links a consultar.' });
  }
  if (links.length > MAX_LINKS) {
    return res.status(400).json({ error: 'Son demasiados de una vez: máximo ' + MAX_LINKS + '.' });
  }

  try {
    const resultados = await enTandas(links.map(String));
    return res.status(200).json({ ok: true, consultados: resultados.length, resultados });
  } catch (e) {
    return res.status(500).json({ error: 'Falló la consulta: ' + (e && e.message ? e.message : e) });
  }
}
