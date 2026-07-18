# 0006. Testing strategy

- **Status:** accepted
- **Date:** 2026-07-17
- **Context:** The spec weights tests and code quality heavily: unit tests at a minimum, integration/edge cases welcome, and coverage choices and rationale matter. We need one testing approach that works across both the backend and the frontend.
- **Decision:**
  - Use **Vitest** as the single test runner across `apps/api`, `apps/web`, and `packages/api-types` (native TS/ESM, aligns with Vite).
  - Use **supertest** for HTTP-level integration tests of the Express endpoints.
  - **What to test:**
    - **Unit tests** for domain logic (cart calculations, add/increment/remove rules, validation) — the highest-value, most defensible tests.
    - **Integration tests** for API endpoints via supertest (happy paths + structured 4xx error cases).
    - **Component/interaction tests** for key frontend behavior (rendering lists, add/remove, surfacing errors).
- **Consequences:**
  - One tool and one mental model across the monorepo reduces configuration and context switching.
  - Rationale over raw coverage: prioritize domain logic and the validation/error boundary, which is where correctness matters most for this spec.
  - Vitest's Vite alignment keeps frontend test setup minimal.
