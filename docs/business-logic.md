# Business Logic

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Document domain rules and behavioral specs as they are decided.

Canonical requirements: [`Requirement.md`](../Requirement.md)

Service implementation: `apps/api/src/services/cart-service.ts`. HTTP conventions: [ADR 0009](./decisions/0009-api-design-conventions.md).

## Rules

| ID     | Rule | Notes |
| ------ | ---- | ----- |
| BL-001 | Single global cart | Prototype cart id is `GLOBAL_CART_ID` (`'1'`). Client does not send cart id; `resolveCurrentCartId` supplies it to the service. |
| BL-002 | Add increments existing line | If a `CartItem` already exists for `(cartId, productId)`, increase `quantity` instead of creating a duplicate line. |
| BL-003 | Unknown product rejected | `addToCart` throws `NotFoundError` when `productId` is not in the catalog (HTTP 404). |
| BL-004 | Non-positive quantity rejected | `addToCart` throws `ValidationError` when quantity is not a positive integer (`<= 0` or non-integer) (HTTP 400). |
| BL-005 | Remove deletes entire line | `removeFromCart(cartId, productId)` removes the cart line for that product entirely. |
| BL-006 | Remove missing line rejected | `removeFromCart` throws `NotFoundError` when no line exists for that product (HTTP 404). |
| BL-007 | Line subtotal | `product.price * quantity` (computed in service; not stored on entity). |
| BL-008 | Grand total | Sum of line subtotals for the current cart. |
| BL-009 | Missing cart rejected | Service requires the cart row to exist (`cartModel.findById`); otherwise `NotFoundError`. |
| BL-010 | Set quantity (absolute) | `updateQuantity` sets the line quantity to the given positive integer (does not increment). |
| BL-011 | Update missing line rejected | `updateQuantity` throws `NotFoundError` when no cart line exists for that product (HTTP 404). |
