# 0003. REST vs GraphQL

- **Status:** accepted
- **Date:** 2026-07-17
- **Context:** The API exposes a small, well-defined set of operations (product list, cart read/write). We need to choose an API paradigm. GraphQL is attractive for flexible client-driven queries and avoiding over/under-fetching across many client types, which is valuable at enterprise scale.
- **Decision:** Use **REST** for the prototype.
- **Consequences:**
  - REST keeps the surface small and conventional: a handful of resource endpoints, standard HTTP status codes, and JSON bodies validated at the boundary.
  - Avoids GraphQL's added complexity for a prototype: schema definition, resolvers, and the associated client/server tooling would not pay for themselves with so few operations.
  - **Escape hatch:** if client query needs grow (many clients, varied data shapes, over/under-fetching pain), revisit GraphQL in a future ADR.
  - Detailed REST conventions (resource paths, status codes, response envelope) are intentionally deferred to a later feature phase, not decided here.
