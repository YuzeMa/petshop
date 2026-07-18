# Business Logic

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Document domain rules and behavioral specs as they are decided.

Canonical requirements: [`Requirement.md`](../Requirement.md)

Service implementation: `apps/api/src/services/cart-service.ts`.

## Rules

| ID     | Rule | Notes |
| ------ | ---- | ----- |
| BL-001 | Single global cart | Prototype uses `GLOBAL_CART_ID`; no per-user carts. |
| BL-002 | Add increments existing line | If a `CartItem` already exists for `(cartId, productId)`, increase `quantity` instead of creating a duplicate line. |
| BL-003 | Unknown product rejected | `addToCart` throws `NotFoundError` when `productId` is not in the catalog. |
| BL-004 | Non-positive quantity rejected | `addToCart` throws `ValidationError` when quantity is not a positive integer (`<= 0` or non-integer). |
| BL-005 | Remove deletes entire line | `removeFromCart(productId)` removes the cart line for that product entirely. |
| BL-006 | Remove missing line rejected | `removeFromCart` throws `NotFoundError` when no line exists for that product. |
| BL-007 | Line subtotal | `product.price * quantity` (computed in service; not stored on entity). |
| BL-008 | Grand total | Sum of line subtotals for the current cart. |
