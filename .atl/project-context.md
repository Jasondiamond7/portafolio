# SDD Project Context — portafolio

> Persisted to Engram under topic key `sdd-init/portafolio` (project `portafolio`).
> This file is a local mirror for offline reference, not the source of truth.

**Detected**: 2026-09-10
**Persistence mode**: engram — saved (observation id 1)
**Workspace root**: `C:/Users/Jason Leon/Desktop/Proyecto-prueba`
**Git**: `main`, clean working tree except `.atl/skill-registry.md` (modified, out of scope) and `.atl/.skill-registry.cache.json` (untracked, out of scope)
**Strict TDD Mode**: enabled

## Project Type

Single-package greenfield project. `package.json` `name` is `portfolio`
(Engram-resolved project name: `portafolio`, resolved via git_remote). Personal
portfolio site for a Data Science / ML / AI professional.

## Tech Stack (verified against files)

| Concern         | Choice                                                                                         | Evidence                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Language        | TypeScript `~6.0.3`                                                                             | `package.json` devDependencies; `tsconfig.*.json`                                               |
| UI framework    | React `^19.3.0` + react-dom `^19.3.0`                                                          | `package.json`; `jsx: react-jsx` in `tsconfig.app.json`                                         |
| Build tool      | Vite `^8.3.0` (Rolldown-based; `rolldown` in node_modules)                                     | `vite.config.ts`, `package.json`                                                                |
| Routing         | react-router-dom `^7.18.3` (`createBrowserRouter`, `Outlet`)                                   | `src/app/router.tsx`, `src/app/App.tsx`                                                         |
| Styling         | Tailwind CSS `^4.3.3` via `@tailwindcss/vite` plugin                                           | `vite.config.ts`, `src/styles/index.css` (`@import 'tailwindcss'`, `@theme`, `@custom-variant`) |
| Charts          | Recharts `^3.10.1`, D3 `^7.9.0` (+ `@types/d3`)                                                | `package.json`; `src/features/dataviz/*`, `src/features/projects/*Chart.tsx`                    |
| Animation       | framer-motion `^13.2.0`                                                                        | `package.json`                                                                                  |
| Class utility   | `clsx` `^2.1.1` wrapped in `src/lib/cn.ts` (no tailwind-merge yet)                             | `src/lib/cn.ts`                                                                                 |
| Path alias      | `@/*` -> `./src/*`                                                                             | `tsconfig.app.json` paths + `vite.config.ts` resolve.alias                                      |
| Package manager | npm (lockfile-less here; `node_modules` present). Node not on PATH (`C:/Program Files/nodejs`) | environment note                                                                                |

## Testing & Quality

| Tool           | Command                                                                                             | Notes                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test runner    | `npm test` -> `vitest run` (`vitest ^5.0.0`)                                                        | `test:watch`, `test:coverage` also defined                                                                                                          |
| Test env       | jsdom (`jsdom ^30`), `globals: true`, setup `src/test/setup.ts`                                     | `vite.config.ts` `test` block                                                                                                                        |
| Integration/UI | `@testing-library/react ^16.3.3`, `@testing-library/jest-dom ^7`, `@testing-library/user-event ^14` | `src/test/setup.ts` imports jest-dom/vitest; ResizeObserver + matchMedia stubs                                                                       |
| E2E            | none                                                                                                | no playwright/cypress                                                                                                                                |
| Coverage       | `npm run test:coverage` -> `vitest run --coverage`, provider `v8` (`@vitest/coverage-v8`)           | reporters text+html; excludes `*.test.*`, `src/test/**`, `src/**/index.ts`                                                                           |
| Linter         | `npm run lint` -> `oxlint` (`oxlint ^1.82`)                                                         | `.oxlintrc.json` plugins react/typescript/oxc; rules-of-hooks error                                                                                  |
| Type checker   | `npm run typecheck` -> `tsc -b --noEmit`                                                            | project refs: `tsconfig.app.json`, `tsconfig.node.json`; strict linting flags (`noUnusedLocals`, `erasableSyntaxOnly`, `noFallthroughCasesInSwitch`) |
| Formatter      | `npm run format` / `format:check` -> `prettier` (`prettier ^3.9`)                                   | no explicit `.prettierrc` found (defaults)                                                                                                           |
| Build          | `npm run build` -> `tsc -b && vite build`                                                           |                                                                                                                                                      |

Existing tests (co-located `*.test.ts(x)`), re-confirmed present on disk:
`src/content/skills.test.ts`, `src/content/projects.test.ts`,
`src/components/ui/ThemeToggle.test.tsx`. Pattern: pure logic tests on content
modules + component behavior tests with Testing Library.

## Architecture (verified)

Feature-first / "screaming" architecture:

- `src/features/<feature>/` — self-contained feature slices: `about`, `skills`,
  `projects`, `dataviz`, `contact`, `hero`. Each holds its own section
  component, cards, charts, and local `data.ts` (e.g. `features/dataviz/data.ts`,
  `features/dataviz/ModelPerformanceChart.tsx`, `features/skills/SkillsRadar.tsx`).
- `src/content/` — typed content modules as the data layer: `types.ts` defines
  `Skill`, `Project`, `Certification`, `Profile`, `ProjectMetric`, `SkillCategory`;
  `profile.ts`, `skills.ts`, `projects.ts`, `certifications.ts` export typed data
  plus derived helpers (`featuredProjects`, `findProject`, `skillRadarData`).
- `src/components/` — shared UI split into `layout/` (`Container`, `Header`,
  `Footer`, `Section`) and `ui/` (`Badge`, `Button`, `ThemeToggle`).
- `src/app/` — application shell: `App.tsx` (layout + providers), `router.tsx`
  (route table), `providers/ThemeProvider.tsx` + `providers/theme-context.ts`.
- `src/pages/` — route-level components: `HomePage`, `NotFoundPage`.
- `src/lib/` — framework-agnostic helpers: `cn.ts`, `hooks/useTheme.ts`.
- `src/styles/index.css` — Tailwind v4 entry + design tokens (`@theme`),
  class-based dark mode via `.dark` on `<html>`.
- `src/main.tsx` — entry: `RouterProvider` with `router`.

Conventions observed: named exports (no default exports) for components;
`@/` absolute imports; co-located tests; class-based dark mode toggled by
`ThemeProvider`; comments are concise English.

## Strict TDD Resolution

Single project = workspace root (only one `package.json` found in the tree,
outside `node_modules`). Explicit workspace-level command `npm test`
(`vitest run`) covers the entire in-scope set. Result: **strict_tdd: true**.

## Session Preflight (cached for this SDD run)

- Execution mode (Pace): automatic
- Artifact store: engram
- PR / delivery strategy: ask-on-risk

## Persistence History

- 2026-09-10 (session 1): sdd-init ran; Engram was DOWN (`CONNECTION_CLOSED`).
  Wrote local fallback only to this file.
- 2026-09-10 (session 2): Engram confirmed reachable. Re-verified all detected
  facts above against the live repository (package.json scripts, config file
  presence, test file presence, single-package-workspace claim). No drift
  found. Persisted successfully to Engram (`sdd-init/portafolio`, observation
  id 1, project `portafolio`).

## Out-of-scope observations

- `.atl/skill-registry.md` is currently modified and `.atl/.skill-registry.cache.json`
  is untracked in git status. Not touched by this run; flagged for the user/orchestrator.
