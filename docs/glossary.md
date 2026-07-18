# Glossary

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Define domain terms as they are introduced.

Backend layer terms follow [ADR 0013](./decisions/0013-backend-layering.md). API wire types follow [ADR 0009](./decisions/0009-api-design-conventions.md). Frontend terms follow [ADR 0011](./decisions/0011-frontend-state-management.md).

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
| ApiError | Structured API error body: `{ error: { code, message } }`. | `packages/api-types`, [ADR 0009](./decisions/0009-api-design-conventions.md), [ADR 0010](./decisions/0010-validation-and-error-handling.md) |
| ApiRequestError | Frontend error thrown by the HTTP client when a response is not OK; carries `message`, `code`, and `status` parsed from `ApiError` (or a fallback `UNKNOWN_ERROR`). | `apps/web/src/shared/http/http.ts`, [ADR 0010](./decisions/0010-validation-and-error-handling.md) |
| Controller (FE) | Thunk-style async functions `(dispatch, api)` that orchestrate fetch/mutation flow and are the **sole dispatcher**; own DTO→view-model mapping. No React imports. Shared across pages. | `apps/web/src/shared/controller/`, [ADR 0011](./decisions/0011-frontend-state-management.md) |
| Reducer (FE) | Pure function `(state, action) => state`; the single source of state transitions for a page, driven via `useReducer`. | `apps/web/src/pages/*/state/`, [ADR 0011](./decisions/0011-frontend-state-management.md) |
| State container (FE) | A page's React Context + `useReducer` provider; exposes `{ state, controller }` (not raw `dispatch`), one instance per page/request. | `apps/web/src/pages/*/state/`, [ADR 0011](./decisions/0011-frontend-state-management.md) |
| View model | Frontend-local display type mapped from an API DTO at the client boundary; kept separate from wire types. | `apps/web/src/shared/controller/*-mapper.ts`, [ADR 0002](./decisions/0002-type-boundary.md) |
| Page module | Frontend page under `pages/` with `state/`, `components/`, and the page entry; imports shared APIs/controllers from `shared/`. Isolated so it can later become its own MPA/SSR entry. | `apps/web/src/pages/`, [ADR 0011](./decisions/0011-frontend-state-management.md) |
