# Project Context

> **Context tier:** L3 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Capture project background, goals, constraints, and current state.

## Background

PetCircle is a prototype shopping cart for a pet e-commerce store. Canonical requirements: [`Requirement.md`](../Requirement.md). It is a small, self-contained build (product list + cart) intended to demonstrate clean architecture and quality, not a full e-commerce platform.

## Goals

- Working shopping-cart functionality that meets the spec.
- Clean separation of concerns and defensible, production-quality architecture.
- Strong typing across frontend and backend, with runtime validation at the API boundary.
- Meaningful tests with clear rationale (favor domain logic and the validation/error boundary).

## Non-goals

- **No SSR** — client-side rendered SPA (see [ADR 0001](./decisions/0001-stack-and-rendering.md)).
- **No authentication, payments, or inventory** (per `Requirement.md` "Out of Scope").
- **No database** — a swappable in-memory store (`persistence/in-memory/`) with seeded products and a single shared cart is sufficient for the prototype; it is isolated behind an interface so a real DB can replace it later (see [ADR 0013](./decisions/0013-backend-layering.md)).
- No GraphQL (see [ADR 0003](./decisions/0003-rest-vs-graphql.md)).

## Assumptions

- **Cart scoping:** with no authentication, the prototype uses a single global cart id `'1'`. The client does not send a cart id; `resolveCurrentCartId` returns `'1'` (cookie wiring deferred). "Current cart" means this one shared cart.

## Current State

- Phase 1 (high-level architecture design) complete: ADRs [0001–0008](./decisions/README.md) (+ [0009](./decisions/0009-api-design-conventions.md), [0013](./decisions/0013-backend-layering.md)), coding principles, roadmap, and backlog.
- Phase 2 (hello-world scaffolding) complete: `apps/web` static SPA, `apps/api` with `/health` and `/hello`, `packages/api-types`, local dotenv config.
- **Phase 3 in progress** — backend layers (P3-3a–c) and REST APIs (P3-1/P3-2/P3-3d) done: products/cart endpoints, `ApiError`, in-memory seed-on-boot, supertest coverage. Frontend architecture decided ([ADR 0011](./decisions/0011-frontend-state-management.md)): per-page React Context + `useReducer`, thunk-style controllers as sole dispatcher, page-isolated modules that stay MPA/SSR-ready while remaining CSR now (consistent with [ADR 0001](./decisions/0001-stack-and-rendering.md) "No SSR"). **Now:** frontend implementation (P3-4a…).
- **Phase 4 planned** — dedicated validation & error-handling track for Requirement.md lines 59–63 (P4-1–P4-5). Phase 3 embeds validation in cart work; Phase 4 explicitly verifies the requirement end-to-end.
- **Phase 5 planned** — production & cloud configuration (P5-1, P5-2); was Phase 4.
- Per-step design decisions (UI library) are deferred until each backlog item is built; frontend state management is now decided ([ADR 0011](./decisions/0011-frontend-state-management.md)).
