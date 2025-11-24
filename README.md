# Dashboard App

Modern React dashboard that lists GitHub repositories, supports dynamic filtering/sorting, and ships with a light/dark theme toggle. This README documents setup, technical choices, and team practices for scaling the app.

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
Below is a ready-to-use README section specifically for your RepoTable application, covering:

Decisions & trade-offs

Scaling to a 3–5 engineer frontend team

Team practices (reviews, CI/CD, quality)

You can paste this directly into your README.md.

📌 README – System Overview
🧠 Decisions & Trade-offs

1. React + Custom Hook for Data Fetching

The app uses a lightweight custom useFetch hook for calling the GitHub API.

Why?

Keeps logic isolated and reusable

Avoids adding heavy libraries (React Query, Axios, SWR)

Trade-off:

Lacks caching, refetch policies, retries, and request deduplication

For larger apps, switching to React Query would improve performance and maintainability

2. Theme Management via Context API

Dark/Light mode is handled with React Context instead of global state libraries.

Why?

Theme state is small and used across the entire app

No need for external dependencies like Redux or Zustand

Trade-off:

Context re-renders the entire tree when theme changes

With more global logic, a dedicated state manager may scale better

3. CSS Modules Instead of Tailwind

The UI was migrated from Tailwind to CSS Modules.

Why?

Keeps styles scoped per component

More readable for teams preferring traditional CSS

Easier to manage when components move/change owners

Trade-off:

Tailwind offers faster prototyping

CSS Modules require more manual naming and structure

4. Vitest + React Testing Library

Vitest was chosen for testing because:

Integrates natively with Vite

Faster test runs than Jest

Practically the same API

Tests focus on:

Rendering behavior

Search filtering

Sorting functionality

Theme class application

📈 Scaling to a Team of 3–5 Engineers

If the RepoTable application grows, the following directory structure helps scale cleanly:

src/
├ api/ # All API functions in one place
│ └ github.js
│
├ components/
│ ├ RepoTable/
│ │ ├ RepoTable.jsx
│ │ ├ RepoTable.module.css
│ │ └ RepoTable.test.jsx
│ ├ ThemeToggle/
│ └ Shared/ # Common UI components (Button, Input, etc.)
│
├ context/
│ ├ ThemeContext.jsx
│ └ useTheme.js
│
├ hooks/
│ ├ useFetch.js
│ └ useDebounce.js # Example for scalable search handling
│
├ pages/
│ └ Dashboard.jsx
│
├ utils/
│ └ helpers.js
│
├ styles/
│ └ global.css
│
└ tests/
├ integration/
└ e2e/

Why this structure works

✔ Clear separation of concerns
✔ Each component owns its CSS and tests
✔ Easy for new engineers to navigate
✔ Features can be developed in parallel without stepping on each other

Possible Team Role Breakdown

Engineer 1: UI components and accessibility

Engineer 2: Data fetching, API integrations

Engineer 3: Testing & developer tooling

Engineer 4–5: Feature development and refactoring

👥 Team Practices

1. Code Reviews

Every PR should:

Include a short summary: “What changed and why”

Stay under ~300–400 lines when possible

Include screenshots or GIFs for visual changes

Include or update tests

Reviewers should check for:

Readability

Maintainability

Performance considerations

Accessibility (focus states, labels, etc.)

Avoid personal preference wars.

If the code is clean, consistent, and tested, it should be approved— even if different engineers would have implemented it differently.

2. CI/CD Pipeline

A typical GitHub Actions workflow should:

On every PR:

Install dependencies

Run linting (eslint)

Run unit tests (vitest)

Build the project (vite build)

If any step fails → PR blocked.

On merge to main:

Deploy automatically to staging environment

Optionally run integration or snapshot tests

Manual approval for production release

Tools recommended:

GitHub Actions

Vercel / Netlify / Render for deployment

Lighthouse CI for performance monitoring

3. Ensuring Code Quality

Automations:

ESLint

Prettier

Husky + lint-staged for pre-commit checks

Vitest coverage thresholds

Component-level tests in each folder

Coding rules:

No unused imports or variables

Prefer small, modular components

Separate UI from business logic

Consistent naming (PascalCase components, camelCase functions)

🚀 Future Enhancements

If the app keeps growing, consider:

Moving to React Query for caching and refetch control

Introducing a design system (Storybook + a shared component library)

Adding performance profiling

Switching to SSR if SEO becomes important

🎯 Summary

This project aims to balance:

Simplicity

Maintainability

Modern best practices

Team scalability

With the structure and workflow above, a 3–5 person frontend team can work efficiently without code rot or slowing velocity.
