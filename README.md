# Dashboard App

Modern React dashboard that lists GitHub repositories, supports dynamic filtering/sorting, and ships with a light/dark theme toggle. This README documents setup, technical choices, AI involvement, and team practices for scaling the app.

## Features

- Repository table with search-as-you-type and alphabetical sorting.
- Auto-fetching data through a reusable `useFetch` hook.
- Theme switching powered by a simple `ThemeContext`.
- Component-level styling through CSS modules.
- Vitest and Testing Library coverage for the repo table.

## Tech Stack & Technical Choices

- **React 19 + hooks**: simple state and memo handling without external state managers.
- **Vite 7**: fast dev server and opinionated build pipeline that keeps configuration surface minimal.
- **CSS Modules**: scoped styles avoid naming collisions while keeping build simple (no CSS-in-JS runtime).
- **Testing Library + Vitest + `happy-dom`**: Jest-like ergonomics with fast, ESM-friendly runner.
- **Custom hooks/context**: `useFetch` encapsulates network logic, `ThemeContext` centralizes light/dark toggle without heavier solutions.
- **Happy DOM test environment** chosen over jsdom due to upstream ESM issues and lower maintenance overhead.

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev        # start the dev server
npm run build      # create a production build
npm run preview    # preview the production build
npm test           # run unit tests
```

> Note: Vite currently requires Node 20.19+; using 20.18 triggers a warning but still works locally.

## AI Usage

- GitHub Copilot and ChatGPT were **not** used for code generation in this repo.
- Vitest refactors, README copy, and troubleshooting steps were performed manually (refer to commit history for details).
- Any future AI assistance should be recorded in this section for transparency.

## Scaling & Team Practices

- **Branch strategy**: use short-lived feature branches merged via PR to `main`. Require CI (lint + vitest) before merge.
- **Coding standards**: keep components small, prefer hooks for shared logic, add RTL/Vitest coverage when changing UI behavior.
- **Environment parity**: document Node requirements and use `.nvmrc`/Volta when joining the project to avoid engine drift.
- **Monitoring growth**: if API complexity increases, consider adding React Query (for caching) and Storybook (for component snapshots).
- **Team onboarding**: start with `README` setup section, run `npm test`, review `RepoTable` + `ThemeProvider` to understand data flow, then iterate via issues labeled `good first issue`.

## Project Structure

- `src/components` – UI building blocks such as `RepoTable`.
- `src/context` – Theme provider, hook, and context definition.
- `src/hooks` – Custom hooks (`useFetch`) for data loading.
- `src/test` – Vitest suites and shared setup.

## Tests

`npm test` runs all Vitest suites using `happy-dom` and automatically loads matchers from `@testing-library/jest-dom/vitest`.
