# 0001. Stack and rendering

- **Status:** accepted
- **Date:** 2026-07-17
- **Context:** The PetCircle prototype needs a technology stack for both the backend API and the frontend UI. We must decide the languages, the frontend build/rendering approach (SSR vs client-side rendering), and how the codebase is organized. The spec values clean separation of concerns, code quality, and tests over extra features, and it is a prototype (no auth/payments/inventory).
- **Decision:**
  - Use a **single TypeScript monorepo** with workspaces.
  - **Backend:** Node + TypeScript, a standalone HTTP API.
  - **Frontend:** React + Vite + TypeScript, a **client-side rendered (CSR)** single-page app. **No SSR.**
  - Layout: `apps/api` (backend), `apps/web` (frontend), `packages/api-types` (shared REST types). See [0002-type-boundary.md](0002-type-boundary.md).
- **Consequences:**
  - CSR keeps the frontend and backend cleanly separated: the API owns domain logic and validation, the SPA owns UI. This directly supports the spec's "clean separation of concerns."
  - No SSR avoids hydration, server-render code paths, and the coupling that a full-stack framework (e.g. Next.js) would introduce. There are no SSR drivers here — no SEO requirement, no content-heavy public pages, no social previews — so the added complexity is not justified.
  - Testing stays simple: pure domain unit tests on the backend, component/interaction tests on the frontend, with no server-render paths to cover.
  - **Escape hatch:** nothing about a Vite SPA + Node API blocks a later SSR migration if a real need appears.
  - A monorepo adds some setup overhead for a small prototype, but is justified by the shared, strongly typed API contract (see 0002).
