# Roadmap

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Track delivery phases and milestones as they are defined.

<!-- Add phases when planned. Do not pre-fill. -->

## Phases

| Phase | Goal | Status | Notes |
|-------|------|--------|-------|
| 1 | High-level architecture design | In progress | ADRs [0001–0008](./decisions/README.md), coding principles, context — docs only, no code |
| 2 | Init hello-world for FE + BE | Planned | pnpm workspaces; `apps/api` Express hello + CORS; `apps/web` Vite/React hello calling the API; `packages/contracts` skeleton; shared tooling; root README; FE↔BE smoke test |
| 3+ | Feature increments | Planned | Each its own plan: API conventions + product/cart endpoints + validation; real `contracts` DTOs + `ApiError`; FE product list & cart view + API client + error handling; per-feature tests |
