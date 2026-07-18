# Roadmap

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Track delivery phases and milestones as they are defined.

## Phases

| Phase | Goal | Status | Notes |
|-------|------|--------|-------|
| 1 | High-level architecture design | Complete | ADRs [0001–0008](./decisions/README.md), coding principles, context |
| 2 | Init hello-world for FE + BE | In progress | FE + BE hello done; FE↔BE connectivity (P2-7) and Zod (P2-8) remaining |
| 3+ | Feature increments | Planned | API conventions, product/cart endpoints, api-types DTOs, FE views, per-feature tests; then OpenAPI browsable docs (P3-7) |
| 4 | Production & cloud configuration | Planned | 12-factor env, validated config, CI/build-time vars (see P4-1, P4-2) |

### Phase 3+ deliverables (planned order)

1. API design conventions ADR (P3-1)
2. api-types DTOs + `ApiError` (P3-2)
3. Product/cart endpoints + validation (P3-3)
4. FE product list & cart view (P3-4)
5. FE error-handling + state management (P3-5)
6. Per-feature tests (P3-6)
7. **OpenAPI spec + browsable API docs** (P3-7) — Scalar or Swagger UI at `/docs` for local API discovery; spec generated from Zod after P2-8

### Phase 4 deliverables (planned order)

1. **ADR 0009 — environment configuration** (P4-1) — precedence (defaults → `.env` local only → platform env), fail-fast validation, secrets policy
2. **API `loadConfig()`** (P4-1) — dotenv + Zod schema in `apps/api`; typed config; startup validation tests
3. **FE build-time env** (P4-2) — `VITE_*` injected in CI/cloud build; document Vite mode files (`.env.production`)
4. **Cloud deployment env** (P4-2) — platform env vars for API (no `.env` in container); document expected vars per environment
