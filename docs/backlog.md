# Backlog

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Track prioritized work items as they are identified.

Phases are defined in [`roadmap.md`](./roadmap.md).

## Now

Phase 2 — Init hello-world (in progress).

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P2-2 | Shared tooling | In progress | Vitest in `apps/web` and `apps/api` done; ESLint + Prettier at repo root remaining |
| P2-4 | `apps/web` hello | In progress | Static hello done; API client + fetch deferred to P2-7 |
| P2-7 | FE↔BE connectivity smoke test | Planned | Prove the SPA reaches the API |

## Next

Phase 2 — remaining scaffolding.

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P2-2a | ESLint + Prettier at repo root | Planned | Ban `any`, shared lint/format (remaining P2-2) |
| P2-8 | Add Zod to `packages/api-types` | Planned | Augment plain TS types with Zod schemas + `z.infer`; wire validation at API boundary |

## Later

Phase 3+ — Feature increments (each its own plan).

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P3-1 | API design conventions ADR | Planned | Resource paths, status codes, response envelope |
| P3-2 | api-types DTOs + `ApiError` | Planned | Product, cart, structured error shapes |
| P3-3 | Product/cart endpoints + validation | Planned | Zod validation, structured 4xx errors |
| P3-4 | FE product list & cart view | Planned | API client, add/remove, totals |
| P3-5 | FE error-handling + state management | Planned | Surface errors (no silent failures); FE state ADR |
| P3-6 | Per-feature tests | Planned | Unit + integration + component |
| P3-7 | OpenAPI spec + browsable API docs | Planned | After P3-3; hand-written `openapi.yaml` + Scalar or Swagger UI at `/docs`; generate spec from Zod once P2-8 lands |

Phase 4 — Production & cloud configuration.

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P4-1 | ADR 0009 + API `loadConfig()` with Zod | Planned | 12-factor precedence, fail-fast validation, `env.test.ts` |
| P4-2 | Production & cloud env wiring | Planned | CI `VITE_*` for web builds; platform env for API deploy; no `.env` in prod images; depends on P4-1 |

## Done

Phase 1 — High-level architecture design.

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P1-1 | ADRs 0001–0008 | Done | Stack/rendering, type boundary, REST vs GraphQL, server framework, tooling, testing, styling, CORS |
| P1-2 | Update coding-principles.md | Done | Architecture, strong typing, testing, error handling |
| P1-3 | Update context.md | Done | Background, goals, non-goals, cart-scoping assumption |
| P1-4 | Update roadmap.md + backlog.md | Done | Phase breakdown recorded |

Phase 2 — hello-world scaffolding (partial).

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P2-1 | pnpm workspaces setup | Done | Root `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `.nvmrc` |
| P2-3 | `apps/api` hello | Done | Express + TS `/health` and `/hello`, CORS allowlist, supertest |
| P2-4 | `apps/web` hello (static) | Done | Vite + React + CSS Modules + Vitest smoke test |
| P2-5 | `packages/api-types` skeleton | Done | Plain TS `HealthResponse` and `HelloResponse`; workspace exports |
| P2-6 | Root README | Done | Install, dev, build, test for web and api |
| P2-9 | Local API `.env` via dotenv | Done | dotenv at boot; optional `.env` from `.env.example`; code defaults fallback |
