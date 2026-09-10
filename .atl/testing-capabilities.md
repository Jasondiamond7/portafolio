## Testing Capabilities

**Strict TDD Mode**: enabled
**Detected**: 2026-09-10
**Persistence**: engram save pending (backend was down at init)

### Projects

| Relative path | Stack                            | Test command              | Framework |
| ------------- | -------------------------------- | ------------------------- | --------- |
| `.`           | React 19 + Vite 8 + TypeScript 6 | `npm test` (`vitest run`) | Vitest 5  |

### Test Layers

| Relative path | Layer       | Available | Tool                                                   |
| ------------- | ----------- | --------- | ------------------------------------------------------ |
| `.`           | Unit        | ✅        | Vitest 5 (jsdom)                                       |
| `.`           | Integration | ✅        | @testing-library/react 16 + user-event 14 + jest-dom 7 |
| `.`           | E2E         | ❌        | —                                                      |

### Coverage

| Relative path | Available | Command                                                        |
| ------------- | --------- | -------------------------------------------------------------- |
| `.`           | ✅        | `npm run test:coverage` (`vitest run --coverage`, v8 provider) |

### Quality Tools

| Relative path | Tool         | Available | Command                                       |
| ------------- | ------------ | --------- | --------------------------------------------- |
| `.`           | Linter       | ✅        | `npm run lint` (`oxlint`)                     |
| `.`           | Type checker | ✅        | `npm run typecheck` (`tsc -b --noEmit`)       |
| `.`           | Formatter    | ✅        | `npm run format:check` (`prettier --check .`) |

### Notes

- Node.js is not on PATH; binary at `C:/Program Files/nodejs`. Prefix shell
  commands with `export PATH="/c/Program Files/nodejs:$PATH"`.
- `vitest` setup file `src/test/setup.ts` stubs `ResizeObserver` (Recharts) and
  `window.matchMedia` (ThemeProvider).
