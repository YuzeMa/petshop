# Glossary

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Define domain terms as they are introduced.

Backend layer terms follow [ADR 0013](./decisions/0013-backend-layering.md). API wire types follow [ADR 0009](./decisions/0009-api-design-conventions.md).

| Term | Definition | See also |
| ---- | ---------- | -------- |
| Entity | A pure DB-row shape (data only) that maps 1:1 to a future DB table. Base class provides `id`, `createdAt`, `updatedAt`. | `apps/api/src/entities/`, [ADR 0013](./decisions/0013-backend-layering.md) |
| Product | Catalog item entity: `name`, `price`, `currency`, `category`, `description`, `imageUrls`. | [`Requirement.md`](../Requirement.md), `apps/api/src/entities/product.ts` |
| ProductCategory | Closed set of product categories: `dry-food`, `wet-food`, `treats`, `toys`, `healthcare`. | `apps/api/src/entities/product-category.ts` |
| Cart | Shopping cart container entity. Prototype uses a single global cart (`GLOBAL_CART_ID` = `'1'`). Line items are stored separately, not embedded. | `apps/api/src/entities/cart.ts` |
| CartItem | One line in a cart entity: references a `Product` via `productId`, belongs to a `Cart` via `cartId`, has a `quantity`. | `apps/api/src/entities/cart-item.ts` |
| Model | An ActiveRecord/ORM-style data-access class (`ProductModel`, `CartModel`, `CartItemModel`) exposing `findAll`/`findById`/`save`/`delete`; the class the app works with. Returns entities. | `apps/api/src/models/`, [ADR 0013](./decisions/0013-backend-layering.md) |
| Service | Business-logic layer (e.g. `CartService`: add/increment/remove, totals, validation). Methods take `cartId`. Calls models. | `apps/api/src/services/`, [ADR 0013](./decisions/0013-backend-layering.md) |
| In-memory store | The swappable persistence adapter (`Map*Store`) behind store ports; used for the prototype and all tests (no real DB). | `apps/api/src/persistence/in-memory/`, [ADR 0013](./decisions/0013-backend-layering.md) |
| Persistence port | Store interface (`ProductStore`, `CartStore`, `CartItemStore`) that models depend on; adapters implement these. | `apps/api/src/persistence/`, `createPersistence()` |
| Seed-on-boot | Prototype hack: `createModels()` loads 10 products + cart `'1'` into the in-memory store when the app (or a test) starts. | `apps/api/src/models/create-models.ts`, [ADR 0009](./decisions/0009-api-design-conventions.md) |
| Current cart resolver | `resolveCurrentCartId(req)` — decides which cart is “current”. Hardcoded `'1'` today; cookie later. | `apps/api/src/http/current-cart.ts`, [ADR 0009](./decisions/0009-api-design-conventions.md) |
| ApiError | Structured API error body: `{ error: { code, message } }`. | `packages/api-types`, [ADR 0009](./decisions/0009-api-design-conventions.md) |
