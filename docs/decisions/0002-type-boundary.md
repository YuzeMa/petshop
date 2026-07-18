# 0002. Type boundary between frontend and backend

- **Status:** accepted
- **Date:** 2026-07-17
- **Context:** Both sides are TypeScript, so it is tempting to share many types. But the FE↔BE boundary is JSON over HTTP, and over-sharing types couples frontend view concerns to backend domain concerns. We need to decide exactly what is shared and what stays local to each side.
- **Decision:**
  - Share **only the REST request/response types** plus the structured error shape, via `packages/api-types` (plain TypeScript types for now; Zod schemas planned in backlog P3-2).
  - **Frontend** view/props types stay in `apps/web`. **Backend** domain entities stay in `apps/api`.
  - Keep FE and BE internal types **separate even when they look similar**, and map to/from the api-types at the boundary (routes/controllers on the backend; the API client on the frontend).
  - The package is named `api-types` to make clear it holds REST request/response types only (renamed from the earlier `contracts` working name).
- **Consequences:**
  - Avoids coupling: a change to a UI prop or a backend entity does not ripple across the boundary unless the API types themselves change.
  - The api-types package is the single source of truth for the wire format; runtime validation with Zod is planned (see backlog P3-2).
  - Slight duplication where an entity and its DTO look alike; this is an accepted, deliberate trade-off for decoupling.
  - Requires discipline: contributors must map at the boundary rather than importing domain entities into the frontend or vice versa.
