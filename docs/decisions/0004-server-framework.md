# 0004. Server framework

- **Status:** accepted
- **Date:** 2026-07-17
- **Context:** The Node + TypeScript API (see [0001-stack-and-rendering.md](0001-stack-and-rendering.md)) needs an HTTP framework to define endpoints. Candidates considered: Express, Fastify, Hono, NestJS.
- **Decision:** Use **Express**.
- **Consequences:**
  - Express is kept as a **thin HTTP layer** over the domain logic and the Zod validation boundary — routing and request/response plumbing only, with business rules in the domain layer.
  - Minimal and ubiquitous: easy to read for any reviewer, huge ecosystem, and simple to test with `supertest` (see [0006-testing-strategy.md](0006-testing-strategy.md)).
  - Express is unopinionated, so structure (controllers, domain, mapping) is our responsibility — acceptable given the layering is already defined.
  - Not TypeScript-first (needs `@types/express`); acceptable for a prototype.
  - **Runner-up:** Fastify (modern, TS-friendly, built-in schema validation). NestJS was rejected as too heavyweight; Hono as less conventional for a demo.
