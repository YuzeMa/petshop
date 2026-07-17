# 0008. CORS access policy

- **Status:** accepted
- **Date:** 2026-07-17
- **Context:** In development the SPA (Vite dev server, e.g. `http://localhost:5173`) and the Express API run on different origins, so browsers block cross-origin requests by default. We need a way for the frontend to reach the API. Options considered: a Vite dev proxy (no CORS) vs enabling CORS on the API.
- **Decision:** Enable **CORS on Express with an origin allowlist**.
  - Only explicitly allowed origins (starting with the local FE origin, e.g. `http://localhost:5173`) are permitted.
  - The allowlist is sourced from config/env so production origins can be added without code changes.
  - The frontend calls the API by an env-configurable absolute base URL.
- **Consequences:**
  - Cross-origin access is explicit and least-privilege (allowlist, not `*`).
  - The same mechanism works in production when FE and BE are deployed on different origins — no dev-only shim to unwind later.
  - Slightly more setup than a Vite proxy (the `cors` middleware + config), accepted for the explicitness and production alignment.
  - Requires an env/config story for both the API allowlist and the FE base URL, wired up during the init phase.
