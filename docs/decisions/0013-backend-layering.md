# 0013. Backend layered architecture

- **Status:** accepted
- **Date:** 2026-07-18
- **Context:** The backend (Express over Node + TypeScript, see [0004-server-framework.md](0004-server-framework.md)) needs an explicit, agreed layer structure before Phase 3 is built. Earlier ad-hoc naming (`domain/`, `repositories/`, `in-memory/`) was unclear: it conflated the database-row shape with the class the app works with, and the `InMemory`/`repository` naming did not read cleanly. We want a structure that looks close to a real, database-backed application so the in-memory prototype can be swapped for a real DB with minimal change.
- **Decision:** Organize `apps/api/src` into five backend layers with a single direction of dependency:

  ```mermaid
  flowchart TD
    routes["routes/ - API layer (thin HTTP plumbing)"]
    services["services/ - business logic (cart rules, totals)"]
    models["models/ - data-access classes (ProductModel, CartModel...)"]
    persistence["persistence/in-memory/ - swappable store"]
    entities["entities/ - DB-row shapes (Product, Cart, CartItem)"]
    routes --> services --> models --> persistence
    models -.returns.-> entities
  ```

  - **entities/** — pure DB-row shapes, data only: `Entity` (base), `Product`, `Cart`, `CartItem`, plus `product-category` and `constants`. Maps 1:1 to future DB tables.
  - **models/** — ActiveRecord/ORM-style data-access classes (`ProductModel`, `CartModel`, `CartItemModel`) exposing `findAll`/`findById`/`save`/`delete`. This is the class the rest of the app works with.
  - **persistence/in-memory/** — the swappable backend the models talk to. An in-memory `Map` for the prototype, isolated behind an interface so a real DB adapter can replace it with minimal change.
  - **services/** — business logic (`CartService`: add/increment/remove, totals, validation).
  - **routes/** — thin HTTP layer that calls services (request/response plumbing only), consistent with [0004-server-framework.md](0004-server-framework.md).

  Naming convention: an entity uses the plain name (`Product`); its model uses the `*Model` suffix (`ProductModel`) to keep the two concepts distinct.
- **Consequences:**
  - Clear separation of concerns: DB shape (entities) vs. data access (models) vs. business rules (services) vs. transport (routes).
  - The in-memory store is an explicit, isolated implementation detail. Swapping to a real database is localized to `persistence/`; entities, models' public surface, services, and routes are unaffected.
  - Slightly more indirection than folding storage directly into models, accepted because it mirrors a production database-backed design and keeps the prototype honest.
  - Supersedes the earlier `domain/` + `repositories/` + `in-memory/` naming. This ADR defines structure only; the code is built from scratch in Phase 3 (P3-3a/b/c).
  - **Runner-up:** models holding the in-memory `Map` directly (Rails-style, no separate persistence layer) — simpler, but a messier swap to a real DB, so rejected.
