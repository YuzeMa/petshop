# Glossary

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Define domain terms as they are introduced.

Backend layer terms follow [ADR 0013](./decisions/0013-backend-layering.md).

| Term | Definition | See also |
| ---- | ---------- | -------- |
| Entity | A pure DB-row shape (data only) that maps 1:1 to a future DB table. Base class provides `id`, `createdAt`, `updatedAt`. | `apps/api/src/entities/`, [ADR 0013](./decisions/0013-backend-layering.md) |
| Product | Catalog item entity: `name`, `price`, `currency`, `category`, `description`, `imageUrls`. | [`Requirement.md`](../Requirement.md), `apps/api/src/entities/product.ts` |
| ProductCategory | Closed set of product categories: `dry-food`, `wet-food`, `treats`, `toys`, `healthcare`. | `apps/api/src/entities/product-category.ts` |
| Cart | Shopping cart container entity. Prototype uses a single global cart (`GLOBAL_CART_ID`). Line items are stored separately, not embedded. | `apps/api/src/entities/cart.ts` |
| CartItem | One line in a cart entity: references a `Product` via `productId`, belongs to a `Cart` via `cartId`, has a `quantity`. | `apps/api/src/entities/cart-item.ts` |
| Model | An ActiveRecord/ORM-style data-access class (`ProductModel`, `CartModel`, `CartItemModel`) exposing `findAll`/`findById`/`save`/`delete`; the class the app works with. Returns entities. | `apps/api/src/models/`, [ADR 0013](./decisions/0013-backend-layering.md) |
| Service | Business-logic layer (e.g. `CartService`: add/increment/remove, totals, validation). Calls models. | `apps/api/src/services/`, [ADR 0013](./decisions/0013-backend-layering.md) |
| In-memory store | The swappable persistence backend that models talk to; an in-memory `Map` isolated behind an interface so a real DB adapter can replace it. | `apps/api/src/persistence/in-memory/`, [ADR 0013](./decisions/0013-backend-layering.md) |
