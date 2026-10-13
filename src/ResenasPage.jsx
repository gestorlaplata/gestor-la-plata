import { useEffect, useMemo, useRef, useState } from "react";
import { Star, Search, X, MessageSquare, ArrowUpRight } from "lucide-react";
import { META_RESENAS, RESENAS_SEED } from "./data/resenas-seed";

/**
 * ResenasPage — las reseñas reales de Google de Gestor La Plata.
 *
 * Cómo carga (importa para el rendimiento):
 *   1. Pinta de entrada las reseñas del seed (src/data/resenas-seed.js, ~8 KB),
 *      que van en el HTML pre-renderizado: no hay pantalla vacía ni salto de
 *      layout, y Google ve contenido real sin ejecutar JavaScript.
 *   2. Después del primer pintado baja /resenas.json (las 436) y recién ahí se
 *      habilitan buscador, filtro y orden. Ese archivo no entra al bundle: se
 *      reemplaza sin tocar el código.
 *   3. La lista crece de a 20. Nunca se dibujan las 436 juntas.
 *
 * Las reseñas no se editan ni se recortan: las de 1 y 4 estrellas están y se
 * pueden ver con el filtro de puntuación.
 */

const NAVY = "#1D3557";
const NAVY_SOFT = "#3B6B8A";
const NARANJA = "#F4A261";
const BORDE = "#E9ECEF";
const GRIS = "#F8F9FA";
const TINTA = "#212529";

const POR_PAGINA = 20;
const GOOGLE_REVIEWS_URL =
  "https://search.google.com/local/reviews?placeid=ChIJC_1VIJTnopURA3KooOBAkiE";

// El número grande usa el mismo redondeo que muestra Google en la ficha.
// El valor exacto (4,98) es el que viaja en el structured data.
const PROMEDIO_VISIBLE = "5,0";

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const MESES_LARGOS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

const nf = new Intl.NumberFormat("es-AR");

const normalizar = (s) =>
  (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const iniciales = (nombre) =>
  (nombre || "?").trim().split(/\s+/).slice(0, 2).map((p) => p[0] || "").join("").toUpperCase();

const partes = (iso) => (iso || "").split("-").map(Number);
const fechaCorta = (iso) => { const [a, m, d] = partes(iso); return a ? `${d} ${MESES[m - 1]} ${a}` : ""; };
const fechaLarga = (iso) => { const [a, m, d] = partes(iso); return a ? `${d} de ${MESES_LARGOS[m - 1]} de ${a}` : ""; };

const conBusqueda = (r) => ({ ...r, _b: normalizar(`${r.cliente} ${r.texto || ""}`) });

export default function ResenasPage() {
  const [todas, setTodas] = useState(null);
  const [estado, setEstado] = useState("cargando"); // cargando | listo | error
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState(0);
  const [orden, setOrden] = useState("recientes");
  const [visibles, setVisibles] = useState(POR_PAGINA);

  const seed = useMemo(() => RESENAS_SEED.map(conBusqueda), []);

  useEffect(() => {
    document.title = "Reseñas reales de clientes | Gestor La Plata";
  }, []);

  useEffect(() => {
    let vivo = true;
    fetch("/resenas.json")
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((d) => { if (!vivo) return; setTodas(d.resenas.map(conBusqueda)); setEstado("listo"); })
      .catch(() => vivo && setEstado("error"));
    return () => { vivo = false; };
  }, []);

  const datos = todas || seed;
  const listo = estado === "listo";
  const qn = normalizar(q.trim());

  const lista = useMemo(() => {
    let base = datos;
    if (filtro) base = base.filter((r) => r.estrellas === filtro);
    if (qn) base = base.filter((r) => r._b.includes(qn));
    return orden === "antiguas" ? [...base].reverse() : base;
  }, [datos, filtro, qn, orden]);

  useEffect(() => { setVisibles(POR_PAGINA); }, [q, filtro, orden, estado]);

  const centinela = useRef(null);
  useEffect(() => {
    const el = centinela.current;
    if (!el || visibles >= lista.length) return;
    const obs = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) setVisibles((v) => v + POR_PAGINA); },
      { rootMargin: "400px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [visibles, lista.length]);

  const mostradas = lista.slice(0, visibles);
  const hayFiltro = Boolean(qn) || Boolean(filtro);
  const limpiar = () => { setQ(""); setFiltro(0); };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(construirSchema()) }}
      />

      <section style={{ padding: "130px 24px 72px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Cabecera, con el mismo patrón que el resto del sitio */}
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <p style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: NAVY, margin: "0 0 18px" }}>
              <span>Reseñas</span>
              <span style={{ flexGrow: 1, height: 1, background: NAVY, opacity: 0.25, maxWidth: 240 }} />
            </p>
            <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(30px,4vw,42px)", color: NAVY, margin: "0 0 12px", lineHeight: 1.15 }}>
              Lo que dicen quienes ya confiaron en nosotros.
            </h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: NAVY_SOFT, lineHeight: 1.6, margin: 0 }}>
              Las {nf.format(META_RESENAS.total)} reseñas publicadas en nuestro perfil de Google, sin
              recortes. Podés buscarlas por trámite y leerlas completas, con nuestra respuesta.
            </p>
          </div>

          <Resumen filtro={filtro} onFiltrar={setFiltro} />

          {/* Controles */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center", flex: "1 1 280px" }}>
              <Search size={16} strokeWidth={2} color={NAVY_SOFT} style={{ position: "absolute", left: 13, pointerEvents: "none" }} aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                disabled={!listo}
                aria-label="Buscar en las reseñas"
                placeholder={listo ? "Buscar por trámite: informe de dominio, habilitación…" : "Cargando reseñas…"}
                style={{ width: "100%", padding: "12px 38px", fontFamily: "'Inter',sans-serif", fontSize: 15, color: TINTA, background: listo ? "#fff" : GRIS, border: `1px solid ${BORDE}`, borderRadius: 10, outline: "none", WebkitAppearance: "none" }}
              />
              {q && (
                <button type="button" onClick={() => setQ("")} aria-label="Borrar la búsqueda"
                  style={{ position: "absolute", right: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, background: "none", border: "none", borderRadius: "50%", color: NAVY_SOFT, cursor: "pointer" }}>
                  <X size={15} strokeWidth={2.5} aria-hidden="true" />
                </button>
              )}
            </div>

            <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: NAVY_SOFT }}>Orden</span>
              <select value={orden} onChange={(e) => setOrden(e.target.value)} disabled={!listo}
                style={{ padding: "12px 14px", fontFamily: "'Inter',sans-serif", fontSize: 14, color: TINTA, background: "#fff", border: `1px solid ${BORDE}`, borderRadius: 10, cursor: "pointer" }}>
                <option value="recientes">Más recientes</option>
                <option value="antiguas">Más antiguas</option>
              </select>
            </label>
          </div>

          {/* Contador */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 10, margin: "18px 0 14px" }}>
            <p style={{ margin: 0, fontFamily: "'Inter',sans-serif", fontSize: 13, color: NAVY_SOFT }}>
              {hayFiltro
                ? `${nf.format(lista.length)} ${lista.length === 1 ? "reseña" : "reseñas"}`
                : `Mostrando ${nf.format(mostradas.length)} de ${nf.format(lista.length)}`}
              {filtro ? ` de ${filtro} ${filtro === 1 ? "estrella" : "estrellas"}` : ""}
              {qn ? ` con «${q.trim()}»` : ""}
            </p>
            {hayFiltro && <BotonTexto onClick={limpiar}>Ver todas</BotonTexto>}
          </div>

          {estado === "error" && (
            <p style={{ margin: "0 0 18px", padding: "14px 16px", background: GRIS, border: `1px solid ${BORDE}`, borderRadius: 12, fontFamily: "'Inter',sans-serif", fontSize: 14, color: NAVY_SOFT }}>
              No pudimos cargar el listado completo. Estas son algunas de las {nf.format(META_RESENAS.total)};{" "}
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" style={{ color: NAVY }}>
                podés verlas todas en Google
              </a>.
            </p>
          )}

          {mostradas.length === 0 ? (
            <p style={{ margin: "0 0 18px", padding: "14px 16px", background: GRIS, border: `1px solid ${BORDE}`, borderRadius: 12, fontFamily: "'Inter',sans-serif", fontSize: 14, color: NAVY_SOFT }}>
              No hay reseñas que digan «{q.trim()}». <BotonTexto onClick={limpiar}>Ver todas</BotonTexto>
            </p>
          ) : (
            <ol style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, listStyle: "none", margin: 0, padding: 0 }}>
              {mostradas.map((r, i) => <Tarjeta key={`${r.fecha}-${r.cliente}-${i}`} r={r} />)}
            </ol>
          )}

          {visibles < lista.length && (
            <div ref={centinela} style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
              <button type="button" className="glp-res-mas" onClick={() => setVisibles((v) => v + POR_PAGINA)}
                style={{ padding: "12px 26px", background: "#fff", border: `1px solid ${NAVY}`, borderRadius: 8, fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: NAVY, cursor: "pointer" }}>
                Ver más reseñas
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─── Resumen ────────────────────────────────────────────────────────────────

function Resumen({ filtro, onFiltrar }) {
  const { total, distribucion } = META_RESENAS;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28, alignItems: "center", padding: "26px 28px", background: GRIS, border: `1px solid ${BORDE}`, borderRadius: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textAlign: "center" }}>
        <p style={{ margin: 0, fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 42, lineHeight: 1, color: NAVY }}>
          {PROMEDIO_VISIBLE}
        </p>
        <Estrellas n={5} tam={18} etiqueta={`Promedio ${PROMEDIO_VISIBLE} de 5`} />
        <p style={{ margin: "2px 0 0", fontFamily: "'Inter',sans-serif", fontSize: 13, color: NAVY_SOFT }}>
          {nf.format(total)} reseñas en Google
        </p>
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8, fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: NAVY, textDecoration: "none", borderBottom: `1px solid ${NAVY}`, paddingBottom: 1 }}>
          Verlas en el perfil de Google
          <ArrowUpRight size={14} strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>

      <ul style={{ display: "flex", flexDirection: "column", gap: 5, listStyle: "none", margin: 0, padding: 0 }}>
        {[5, 4, 3, 2, 1].map((n) => {
          const cant = distribucion[n] || 0;
          const pct = total ? (cant / total) * 100 : 0;
          const activo = filtro === n;
          return (
            <li key={n}>
              <button type="button" onClick={() => onFiltrar(activo ? 0 : n)} disabled={cant === 0} aria-pressed={activo}
                className="glp-res-dist"
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "3px 6px", background: activo ? "#fff" : "none", border: `1px solid ${activo ? NAVY : "transparent"}`, borderRadius: 6, cursor: cant === 0 ? "default" : "pointer", opacity: cant === 0 ? 0.55 : 1, fontFamily: "'Inter',sans-serif" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 3, minWidth: 34, fontSize: 13, fontWeight: 500, color: NAVY_SOFT }}>
                  {n} <Star size={12} strokeWidth={0} fill={NARANJA} color={NARANJA} aria-hidden="true" />
                </span>
                <span style={{ flex: 1, height: 7, borderRadius: 999, background: BORDE, overflow: "hidden" }} aria-hidden="true">
                  <span style={{ display: "block", height: "100%", width: `${pct}%`, borderRadius: 999, background: NAVY }} />
                </span>
                <span style={{ minWidth: 36, textAlign: "right", fontSize: 12, color: NAVY_SOFT, fontVariantNumeric: "tabular-nums" }}>
                  {nf.format(cant)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Tarjeta ────────────────────────────────────────────────────────────────

const LARGO_CORTE = 340;

function Tarjeta({ r }) {
  const [abierta, setAbierta] = useState(false);
  const texto = r.texto || "";
  const larga = texto.length > LARGO_CORTE;

  return (
    <li style={{ display: "flex", flexDirection: "column", gap: 12, padding: 20, background: "#fff", border: `1px solid ${BORDE}`, borderRadius: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: "50%", background: NAVY, color: "#F1F3F5", fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
          {iniciales(r.cliente)}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: TINTA, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {r.cliente}
          </p>
          <time dateTime={r.fecha} title={fechaLarga(r.fecha)} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: NAVY_SOFT }}>
            {fechaCorta(r.fecha)}
          </time>
        </div>
        <Estrellas n={r.estrellas} />
      </div>

      {texto && (
        <>
          <p className={larga && !abierta ? "glp-res-clamp" : undefined}
            style={{ margin: 0, fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.65, color: "#4A4A4A", whiteSpace: "pre-line" }}>
            {texto}
          </p>
          {larga && (
            <BotonTexto onClick={() => setAbierta((v) => !v)}>
              {abierta ? "Mostrar menos" : "Leer completa"}
            </BotonTexto>
          )}
        </>
      )}

      {r.respuesta && (
        <div style={{ padding: "14px 16px", background: GRIS, borderLeft: `2px solid ${NARANJA}`, borderRadius: "0 8px 8px 0" }}>
          <p style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, margin: "0 0 6px", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: NAVY }}>
            <MessageSquare size={13} strokeWidth={2} aria-hidden="true" />
            Respuesta de Gestor La Plata
            {r.fechaRespuesta && (
              <time dateTime={r.fechaRespuesta} style={{ fontWeight: 400, color: NAVY_SOFT }}>
                {fechaCorta(r.fechaRespuesta)}
              </time>
            )}
          </p>
          <p style={{ margin: 0, fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.6, color: "#4A4A4A", whiteSpace: "pre-line" }}>
            {r.respuesta}
          </p>
        </div>
      )}
    </li>
  );
}

function Estrellas({ n, tam = 14, etiqueta }) {
  return (
    <span aria-label={etiqueta || `${n} de 5 estrellas`} style={{ display: "inline-flex", gap: 1, flexShrink: 0 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={tam} strokeWidth={0} fill={i <= n ? NARANJA : BORDE} color={i <= n ? NARANJA : BORDE} aria-hidden="true" />
      ))}
    </span>
  );
}

function BotonTexto({ children, onClick }) {
  return (
    <button type="button" onClick={onClick}
      style={{ alignSelf: "flex-start", padding: 0, background: "none", border: "none", fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: NAVY, textDecoration: "underline", textUnderlineOffset: 2, cursor: "pointer" }}>
      {children}
    </button>
  );
}

// ─── Structured data ────────────────────────────────────────────────────────

function construirSchema() {
  const { total } = META_RESENAS;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Gestor La Plata",
    url: "https://www.gestorlaplata.com",
    image: "https://www.gestorlaplata.com/isotipo-glp.png",
    telephone: "+54-221-488-6197",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle 49 N° 1295",
      addressLocality: "La Plata",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    // Sin aggregateRating a proposito: el index.html del sitio ya declara uno
    // para el negocio y dos valores distintos en la misma pagina se pisan.
    // Aca van las reseñas una por una; el promedio lo aporta aquel bloque.
    review: RESENAS_SEED.filter((r) => r.texto).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.cliente },
      datePublished: r.fecha,
      reviewRating: { "@type": "Rating", ratingValue: String(r.estrellas), bestRating: "5", worstRating: "1" },
      reviewBody: r.texto,
    })),
  };
}
