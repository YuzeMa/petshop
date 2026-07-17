# Backlog

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Track prioritized work items as they are identified.

Phases are defined in [`roadmap.md`](./roadmap.md).

## Now

Phase 1 — High-level architecture design (docs only).

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P1-1 | ADRs 0001–0008 | Done | Stack/rendering, type boundary, REST vs GraphQL, server framework, tooling, testing, styling, CORS |
| P1-2 | Update coding-principles.md | Done | Architecture, strong typing, testing, error handling |
| P1-3 | Update context.md | Done | Background, goals, non-goals, cart-scoping assumption |
| P1-4 | Update roadmap.md + backlog.md | In progress | Phase breakdown recorded |

## Next

Phase 2 — Init hello-world for FE + BE (scaffolding).

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P2-1 | pnpm workspaces setup | Planned | Root `package.json`, `pnpm-workspace.yaml` |
| P2-2 | Shared tooling | Planned | Base `tsconfig`, ESLint + Prettier, Vitest, `.editorconfig` |
| P2-3 | `apps/api` hello | Planned | Express + TS health/hello endpoint, CORS allowlist |
| P2-4 | `apps/web` hello | Planned | Vite + React + TS page calling the API |
| P2-5 | `packages/contracts` skeleton | Planned | Build setup + a sample shared type |
| P2-6 | Root README | Planned | Run instructions |
| P2-7 | FE↔BE connectivity smoke test | Planned | Prove the SPA reaches the API |

## Later

Phase 3+ — Feature increments (each its own plan).

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P3-1 | API design conventions ADR | Planned | Resource paths, status codes, response envelope |
| P3-2 | Contracts DTOs + `ApiError` | Planned | Product, cart, structured error shapes |
| P3-3 | Product/cart endpoints + validation | Planned | Zod validation, structured 4xx errors |
| P3-4 | FE product list & cart view | Planned | API client, add/remove, totals |
| P3-5 | FE error-handling + state management | Planned | Surface errors (no silent failures); FE state ADR |
| P3-6 | Per-feature tests | Planned | Unit + integration + component |
