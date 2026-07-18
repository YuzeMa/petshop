# Architecture Decision Records

> **Context tier:** L3 | **Index:** [../INDEX.md](../INDEX.md)
> **Purpose:** Record significant technical decisions as they are made.

<!-- Add ADRs when real decisions are made. Do not pre-fill. -->

## ADR Index

| #                                            | Title                                      | Status   | Summary                                                                            |
| -------------------------------------------- | ------------------------------------------ | -------- | ---------------------------------------------------------------------------------- |
| [0001](0001-stack-and-rendering.md)          | Stack and rendering                        | accepted | TypeScript monorepo; Node API + React/Vite SPA; client-side rendered, no SSR       |
| [0002](0002-type-boundary.md)                | Type boundary between frontend and backend | accepted | Share only REST types via `packages/api-types`; FE/BE keep separate internal types |
| [0003](0003-rest-vs-graphql.md)              | REST vs GraphQL                            | accepted | REST for the prototype; GraphQL deferred until client query needs grow             |
| [0004](0004-server-framework.md)             | Server framework                           | accepted | Express as a thin HTTP layer over domain + Zod boundary; easy to test              |
| [0005](0005-repository-and-build-tooling.md) | Repository and build tooling               | accepted | pnpm workspaces, ESM, Node 22 LTS, ESLint + Prettier, base tsconfig                |
| [0006](0006-testing-strategy.md)             | Testing strategy                           | accepted | Vitest across FE + BE, supertest for Express endpoints                             |
| [0007](0007-styling.md)                      | Styling                                    | accepted | CSS Modules — scoped, no runtime, no extra deps                                    |
| [0008](0008-cors-access-policy.md)           | CORS access policy                         | accepted | Express CORS with a config/env-driven origin allowlist                             |

## Planned ADRs

Reserved numbers for upcoming backlog items (create the file when the item is built):

| #    | Title                       | Backlog | Summary                                               |
| ---- | --------------------------- | ------- | ----------------------------------------------------- |
| 0009 | API design conventions      | P3-1    | Resource paths, status codes, response envelope       |
| 0010 | Validation & error handling | P4-1    | `ApiError` shape, 400 vs 404, response envelope       |
| 0011 | Frontend state management   | P3-5    | Server/client state approach for products and cart    |
| 0012 | Environment configuration   | P5-1    | 12-factor env precedence, fail-fast config validation |

## Template

Create `NNNN-short-title.md`:

```markdown
# NNNN. Title

- **Status:** proposed | accepted | deprecated | superseded by NNNN
- **Date:** YYYY-MM-DD
- **Context:** What is the issue or question?
- **Decision:** What was decided?
- **Consequences:** What are the trade-offs and follow-up actions?
```
