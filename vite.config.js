import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const prerender = require('vite-plugin-prerender')

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ROUTES = [
  '/',
  '/servicios-registrales',
  '/arba-y-catastro',
  '/actas-e-inscripciones',
  '/habilitaciones-comerciales',
  '/permisos-y-publicidad',
  '/informes-registrales',
  '/informe-de-dominio',
  '/indice-de-titularidad',
  '/anotaciones-personales',
  '/informe-de-frecuencia',
  '/copia-de-asiento',
  '/estudio-de-titulo',
  '/antecedentes-catastrales',
  '/copia-de-plano',
  '/valuacion-fiscal',
  '/servicio-agrimensores',
  '/actas-registro-civil',
  '/inscripcion-divorcio',
  '/apostilla-de-la-haya',
  '/alta-comercial',
  '/transferencia-comercial',
  '/baja-comercial',
  '/publicidad-la-plata',
  '/reba-la-plata',
  '/quienes-somos',
  '/politica-de-privacidad',
  '/politica-de-cookies',
]

export default defineConfig({
  plugins: [
    react(),
    prerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ROUTES,
      rendererOptions: { renderAfterTime: 1500 },
    }),
  ],
})
