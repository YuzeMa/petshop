# Backlog

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Track prioritized work items as they are identified.

Phases are defined in [`roadmap.md`](./roadmap.md).

## Now

Phase 3 — Frontend remaining.

| ID    | Item                                         | Status  | Notes                                                                      |
| ----- | -------------------------------------------- | ------- | -------------------------------------------------------------------------- |
| P3-7  | OpenAPI spec + browsable API docs            | Planned | After P3-3d; Scalar or Swagger UI at `/docs`; generate from Zod after P5-3 |

## Later

Phase 4 — Validation & error handling ([`Requirement.md`](../Requirement.md) lines 59–63). P3 implements; P4 verifies explicitly.

| ID   | Item                                    | Status  | Notes                                                                                                  |
| ---- | --------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| P4-1 | Validation & errors ADR (0010)          | Planned | `ApiError` shape, 400 vs 404, response envelope; align with ADR 0009 and P3-2; depends on P3-1, P3-2   |
| P4-2 | Unknown product ID → 4xx                | Planned | BE domain + route mapping; supertest status + `ApiError` body; depends on P3-3d                        |
| P4-3 | Non-positive quantity → 4xx             | Planned | BE domain guard + request validation; supertest for `quantity <= 0`; depends on P3-3d                  |
| P4-4 | FE error surfacing — no silent failures | Planned | API client parses `ApiError`; error banner on failed add/remove; depends on P3-4a, P3-5                |
| P4-5 | Requirement sign-off                    | Planned | Component tests for error paths; checklist Requirement.md 59–63 satisfied; depends on P4-2, P4-3, P4-4 |

Phase 5 — Production & cloud configuration.

| ID   | Item                                   | Status  | Notes                                                                                                        |
| ---- | -------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| P5-1 | ADR 0012 + API `loadConfig()` with Zod | Planned | 12-factor precedence, fail-fast validation, `env.test.ts`; was P4-1                                          |
| P5-2 | Production & cloud env wiring          | Planned | CI `VITE_*` for web builds; platform env for API deploy; no `.env` in prod images; depends on P5-1; was P4-2 |
| P5-3 | Zod + api-types migration              | Planned | Add `zod`; schemas + `z.infer`; Vitest schema tests; wire `.parse()` at API boundary; was Zod P3-2           |

## Done

Phase 1 — High-level architecture design.

| ID   | Item                           | Status | Notes                                                                                              |
| ---- | ------------------------------ | ------ | -------------------------------------------------------------------------------------------------- |
| P1-1 | ADRs 0001–0008                 | Done   | Stack/rendering, type boundary, REST vs GraphQL, server framework, tooling, testing, styling, CORS |
| P1-2 | Update coding-principles.md    | Done   | Architecture, strong typing, testing, error handling                                               |
| P1-3 | Update context.md              | Done   | Background, goals, non-goals, cart-scoping assumption                                              |
| P1-4 | Update roadmap.md + backlog.md | Done   | Phase breakdown recorded                                                                           |

Phase 2 — hello-world scaffolding.

| ID   | Item                          | Status | Notes                                                                        |
| ---- | ----------------------------- | ------ | ---------------------------------------------------------------------------- |
| P2-1 | pnpm workspaces setup         | Done   | Root `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `.nvmrc`   |
| P2-2 | Shared tooling (Vitest)       | Done   | Vitest in `apps/web` and `apps/api`; ESLint/Prettier in P3-0                 |
| P2-3 | `apps/api` hello              | Done   | Express + TS `/health` and `/hello`, CORS allowlist, supertest               |
| P2-4 | `apps/web` hello (static)     | Done   | Vite + React + CSS Modules + Vitest smoke test; API client deferred to P3-4a |
| P2-5 | `packages/api-types` skeleton | Done   | Plain TS `HealthResponse` and `HelloResponse`; workspace exports             |
| P2-6 | Root README                   | Done   | Install, dev, build, test for web and api                                    |
| P2-9 | Local API `.env` via dotenv   | Done   | dotenv at boot; optional `.env` from `.env.example`; code defaults fallback  |

Phase 3 — foundations.

| ID   | Item                           | Status | Notes                                                                              |
| ---- | ------------------------------ | ------ | ---------------------------------------------------------------------------------- |
| P3-0 | ESLint + Prettier at repo root | Done   | `eslint.config.js`, `.prettierrc`; `lint` / `format` scripts; ban `any`; was P2-2a |

Phase 3 — Backend layers ([ADR 0013](./decisions/0013-backend-layering.md)).

| ID    | Item                             | Status | Notes                                                                                          |
| ----- | -------------------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| P3-3a | Entities                         | Done   | `Entity`, `Product`, `Cart`, `CartItem` in `apps/api/src/entities/`                            |
| P3-3b | Seed data + models + persistence | Done   | Factory seed (10 products); `*Model` over `Map*Store` in `persistence/in-memory/`; `createModels()` |
| P3-3c | Cart service logic + unit tests  | Done   | `ProductService` + `CartService`: add/increment/remove, totals, validation                     |

Phase 3 — API prep + REST ([ADR 0009](./decisions/0009-api-design-conventions.md)).

| ID    | Item                                 | Status | Notes                                                                 |
| ----- | ------------------------------------ | ------ | --------------------------------------------------------------------- |
| P3-1  | API design conventions ADR (0009)    | Done   | Paths, ApiError, current-cart resolver, in-memory seed-on-boot        |
| P3-2  | Plain TS api-types DTOs + `ApiError` | Done   | Product, cart, error wire types; no Zod                               |
| P3-3d | REST endpoints + integration tests   | Done   | `/products`, `/cart`, add/remove; supertest usage + 4xx scenarios     |

Phase 3 — Frontend ([ADR 0011](./decisions/0011-frontend-state-management.md)).

| ID    | Item                                         | Status | Notes                                                                 |
| ----- | -------------------------------------------- | ------ | --------------------------------------------------------------------- |
| P3-4a | API fetch layer + FE↔BE smoke                | Done   | `shared/http` transport; `shared/api` resource clients; controllers in `shared/controller` |
| P3-4b | UI components                                | Done   | Product card grid, cart line (+/−/Delete), total skeleton, error banner |
| P3-4c | Pages + routing                              | Done   | react-router; `/` products, `/cart`; AppShell nav                     |
| P3-5  | State management implementation (ADR 0011)   | Done   | Per-page Context + `useReducer`; thunk controllers in `shared/controller`; sole dispatcher |
| P3-4d | Wire pages to APIs                           | Done   | Add/remove/qty PATCH; BE `CartResponse` as source of truth            |
| P3-6  | Component/interaction tests                  | Done   | Reducer/controller unit tests + page smoke (list/cart/errors/skeleton)|

**Moved:** P2-7 → P3-4a; P2-8 Zod → P5-3.

## Future considerations

Not scheduled; captured so the current design stays compatible.

| Item | Notes |
| ---- | ----- |
| MPA + SSR migration | Promote page-isolated modules to per-page Vite entries and/or server rendering if SEO/perf needs appear; see [ADR 0001](./decisions/0001-stack-and-rendering.md), [ADR 0011](./decisions/0011-frontend-state-management.md) |
| GraphQL evaluation | Possible API-layer alternative to REST if client query needs grow; see [ADR 0003](./decisions/0003-rest-vs-graphql.md) |
