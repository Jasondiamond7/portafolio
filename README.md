# Data Science · ML · AI Portfolio

Personal portfolio built with **React 19 + Vite + TypeScript + Tailwind CSS v4 + Recharts** (with **D3** available for custom visualizations).

## Stack

| Concern       | Choice                                                       |
| ------------- | ------------------------------------------------------------ |
| Build / dev   | Vite 8                                                       |
| UI            | React 19, React Router 7                                     |
| Styling       | Tailwind CSS v4 (`@tailwindcss/vite`), class-based dark mode |
| Charts        | Recharts (declarative), D3 (custom/low-level)                |
| Animation     | Framer Motion                                                |
| Testing       | Vitest + Testing Library + jsdom                             |
| Lint / format | oxlint + Prettier                                            |
| Types         | TypeScript 6 (strict, `@/*` path alias → `src/`)             |

## Getting started

```bash
nvm use            # Node 24 (see .nvmrc)
npm install
npm run dev        # http://localhost:5173
```

## Scripts

```bash
npm run dev            # dev server
npm run build          # typecheck + production build
npm run preview        # serve the build locally
npm test               # run unit tests once
npm run test:watch     # watch mode (TDD)
npm run test:coverage  # coverage report
npm run typecheck      # tsc, no emit
npm run lint           # oxlint
npm run format         # prettier --write
```

## Project structure

```
src/
  app/           App shell, router, providers (ThemeProvider)
  pages/         Route-level components (HomePage, NotFoundPage)
  features/      One folder per portfolio section (hero, about, skills,
                 projects, dataviz, contact) — components + local data
  components/    Shared UI
    layout/      Header, Footer, Container, Section
    ui/          Badge, Button, ThemeToggle
  content/       Portfolio data as typed modules (profile, projects,
                 skills, certifications) + types.ts — edit these first
  lib/           cn() helper, hooks (useTheme)
  styles/        Tailwind entry + theme tokens
  test/          Vitest setup
```

The architecture is feature-first ("screaming"): each section is self-contained
under `features/`, and everything reads from the typed data in `content/`.

## Making it yours

1. Edit `src/content/profile.ts`, `projects.ts`, `skills.ts`, `certifications.ts`.
2. Add `public/resume.pdf` and `public/og-image.png` (see `public/README.md`).
3. Update the name and meta tags in `index.html`.
4. Adjust brand colors in `src/styles/index.css` (`@theme` block).

## Suggested next additions

- **Project detail routes** (`/projects/:slug`) with full case-study write-ups — the router and `findProject()` helper are already in place.
- **Blog / technical writing** section (MDX via `@mdx-js/rollup`) for notebooks turned into articles.
- **Confusion matrix / feature-importance** visualizations (great D3 use case).
- **i18n** (ES/EN) with `react-i18next` if you want a bilingual portfolio.
- **Contact form** backed by a serverless function or Formspree.
- **Deploy**: Vercel, Netlify or GitHub Pages. CI (`.github/workflows/ci.yml`) already runs lint + typecheck + tests + build.
- **Analytics**: Plausible or Umami (privacy-friendly).
- **Lighthouse / a11y budget** check in CI.

## Deployment

Any static host works. For GitHub Pages, set `base` in `vite.config.ts` to
`/<repo-name>/`. For Vercel/Netlify, no config needed — build command `npm run build`,
output `dist`.
