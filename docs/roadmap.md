# Roadmap

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Track delivery phases and milestones as they are defined.

## Phases

| Phase | Goal | Status | Notes |
|-------|------|--------|-------|
| 1 | High-level architecture design | Complete | ADRs [0001–0008](./decisions/README.md), coding principles, context |
| 2 | Init hello-world for FE + BE | Complete | Monorepo, static FE, API `/health` + `/hello`, api-types skeleton, dotenv |
| 3 | Shopping cart features | In progress | Implements [`Requirement.md`](../Requirement.md); see deliverables below |
| 4 | Validation & error handling | Planned | [`Requirement.md`](../Requirement.md) § Validation and Errors (lines 59–63); P3 implements, P4 verifies |
| 5 | Production & cloud configuration | Planned | 12-factor env, validated config, CI/build-time vars (see P5-1, P5-2) |

### Phase 3 deliverables (planned order)

**Foundations** (P3-0 can run in parallel with P3-1/P3-2):

1. ESLint + Prettier at repo root (P3-0) — was P2-2a
2. API design conventions ADR (P3-1) — **ADR 0009**
3. Zod + api-types DTOs + `ApiError` (P3-2) — absorbs ex-P2-8

**Backend** (domain-first; unit tests with domain logic, integration tests with endpoints):

4. Domain entities — `Product`, `Cart`, `CartItem` (P3-3a)
5. Seed data + repository interfaces (P3-3b)
6. Cart domain logic + unit tests (P3-3c)
7. REST endpoints + integration tests (P3-3d)

**Frontend** (after backend endpoints exist):

8. API fetch layer + FE↔BE smoke — ex-P2-7 folded in (P3-4a)
9. UI components (P3-4b)
10. Pages + routing — Product List, Cart View (P3-4c)
11. State management ADR + implementation (P3-5) — **ADR 0011**
12. Wire pages to APIs (P3-4d)
13. Component/interaction tests (P3-6)

**API docs** (after endpoints stabilize):

14. OpenAPI spec + browsable `/docs` (P3-7) — Scalar or Swagger UI; generate from Zod after P3-2

Per-step design decisions (UI library, state library, exact REST paths) are made at implementation time, not upfront.

Phase 3 embeds validation as part of cart delivery. **Phase 4** is a separate, fine-grained track that explicitly verifies the Validation and Errors requirement end-to-end.

### Phase 4 deliverables (planned order)

Maps to [`Requirement.md`](../Requirement.md) lines 59–63. Runs after relevant Phase 3 slices (BE after P3-3d; FE after P3-4d/P3-5).

1. **Validation & errors ADR** (P4-1) — **ADR 0010**: `ApiError` shape, status codes (400 vs 404), response envelope; align with ADR 0009 and P3-2
2. **Unknown product IDs → 4xx** (P4-2) — BE domain + route mapping; supertest asserts status + `ApiError` body
3. **Non-positive quantities → 4xx** (P4-3) — BE Zod request validation + domain guard; supertest for invalid quantity cases
4. **FE error surfacing — no silent failures** (P4-4) — API client parses `ApiError`; visible user message on failed add/remove
5. **Requirement sign-off** (P4-5) — Component tests for error paths; checklist that Requirement.md 59–63 is satisfied

### Phase 5 deliverables (planned order)

1. **ADR 0012 — environment configuration** (P5-1) — precedence (defaults → `.env` local only → platform env), fail-fast validation, secrets policy
2. **API `loadConfig()`** (P5-1) — dotenv + Zod schema in `apps/api`; typed config; startup validation tests
3. **FE build-time env** (P5-2) — `VITE_*` injected in CI/cloud build; document Vite mode files (`.env.production`)
4. **Cloud deployment env** (P5-2) — platform env vars for API (no `.env` in container); document expected vars per environment
