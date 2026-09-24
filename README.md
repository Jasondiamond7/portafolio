# Portafolio — Jaysson Leon Martinez

Portafolio personal orientado a Data Science, Machine Learning e IA, con base en mi
experiencia real en automatización de pruebas y desarrollo de software. Construido con
**React 19 + TypeScript + Vite + Tailwind CSS v4**.

## Stack

| Área          | Herramienta                                                |
| ------------- | ---------------------------------------------------------- |
| Build / dev   | Vite 8                                                     |
| UI            | React 19, React Router 7                                   |
| Estilos       | Tailwind CSS v4 (`@tailwindcss/vite`), dark mode por clase |
| Gráficos      | Recharts                                                   |
| Animación     | Framer Motion                                              |
| Testing       | Vitest + Testing Library + jsdom                           |
| Lint / format | oxlint + Prettier                                          |
| Tipos         | TypeScript, alias `@/*` → `src/`                           |

## Cómo correrlo

```bash
nvm use            # Node 24 (ver .nvmrc)
npm install
npm run dev        # http://localhost:5173
```

## Scripts

```bash
npm run dev            # servidor de desarrollo
npm run build          # typecheck + build de producción
npm run preview        # sirve el build localmente
npm test                # corre los tests una vez
npm run test:watch      # tests en modo watch
npm run test:coverage   # reporte de cobertura
npm run typecheck       # tsc, sin emitir archivos
npm run lint            # oxlint
npm run format           # prettier --write
npm run format:check     # prettier --check
```

Estos mismos comandos (lint, format:check, typecheck, test, build) son los que corre el
CI en `.github/workflows/ci.yml` en cada push/PR contra `main`.

## Estructura del proyecto

```
src/
  app/            Shell de la app: router, providers (ThemeProvider), scroll a hash
  pages/           Componentes de ruta (HomePage, ProjectDetailPage, NotFoundPage)
  features/        Una carpeta por sección del portafolio (hero, about, skills,
                   projects, contact) — cada una con sus componentes
  components/
    layout/        Header, Footer, Container, Section, WhatsAppButton
    ui/             Badge, Button, ThemeToggle, icons
  content/         Datos del portafolio como módulos tipados (profile, projects,
                   skills, certifications, experience) + types.ts
  lib/             Helper cn() y hooks (useTheme)
  styles/          Entrada de Tailwind + tokens de color (paleta Deep Teal / Amber)
  test/            Setup de Vitest
```

La idea central es "content-first": casi todo el texto y los datos del sitio viven en
`src/content/*.ts` como objetos tipados, no hardcodeados dentro de los componentes. Para
actualizar el portafolio (nuevo proyecto, nueva skill, nueva certificación) normalmente
alcanza con editar el archivo correspondiente en `content/`, sin tocar JSX.

## Cómo editar el contenido

- **`profile.ts`** — nombre, rol, tagline, resumen, contacto (email, WhatsApp), redes,
  link al CV.
- **`experience.ts`** — historial laboral, en orden cronológico inverso (el trabajo
  actual primero).
- **`projects.ts`** — cada proyecto tiene resumen corto (para la tarjeta), y el detalle
  completo (problema/enfoque/resultado, métricas, narrativa, metodología) para la
  página `/projects/:slug`. El campo `media` acepta video o imágenes de evidencia.
- **`skills.ts`** — lista plana de `{ name, category }`, agrupada por categoría en la UI.
- **`certifications.ts`** — separado en `degrees` (título universitario y diplomados,
  se muestran destacados) y `courses` (certificaciones de cursos individuales, en
  formato de grilla compacta).

## Decisiones de diseño que vale la pena conocer

- **El Header es global** (vive fuera del `<Outlet>` en `App.tsx`), así que aparece en
  todas las rutas — incluida la página de detalle de un proyecto. Por eso los links de
  navegación usan `<Link to="/#seccion">` en vez de un simple `<a href="#seccion">`: si
  no, al hacer clic desde una ruta distinta al home el enlace no llevaría a ningún lado.
  El scroll suave hasta la sección se hace a mano en un `useEffect` en `App.tsx`.
- **El fondo de red neuronal** (`NeuralNetworkBackground.tsx`) es un canvas 2D dibujado
  a mano con `requestAnimationFrame`, sin ninguna librería externa. Tiene dos variantes:
  `active` (la del Hero, reacciona al mouse) y `ambient` (versión tenue y más liviana
  que se usa de fondo en otras secciones).
- **Accesibilidad de movimiento**: todo el sitio respeta `prefers-reduced-motion`. En
  Framer Motion se hace una sola vez vía `MotionConfig` en `App.tsx`; en el canvas y en
  algunos componentes SVG se chequea `matchMedia` a mano porque no pasan por Framer Motion.
- **Modo oscuro** persiste en `localStorage` y usa la preferencia del sistema
  (`prefers-color-scheme`) solo como valor inicial si el usuario nunca lo tocó.

## Testing

Los tests con Vitest + Testing Library cubren sobre todo componentes con lógica no
trivial (theme toggle, tarjetas de proyecto, contenido de skills) y no buscan cobertura
del 100% en componentes puramente presentacionales.

## Despliegue

El sitio se despliega en Vercel a partir de `main` (build command `npm run build`,
output `dist`). Cualquier otro host estático (Netlify, GitHub Pages) también funciona
sin configuración adicional — para GitHub Pages hay que setear `base` en `vite.config.ts`.
