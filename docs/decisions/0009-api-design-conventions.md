# 0009. API design conventions

- **Status:** accepted
- **Date:** 2026-07-18
- **Context:** The shopping-cart APIs in [`Requirement.md`](../../Requirement.md) need concrete REST paths, status codes, and an error shape before routes are built. Persistence for the prototype is in-memory behind store ports ([ADR 0013](0013-backend-layering.md)); cart identity must work without the client sending a cart id, while remaining ready for cookie-based current-cart later.
- **Decision:**
  - **Paths:** `GET /products`, `GET /cart`, `POST /cart/items`, `PATCH /cart/items/:productId`, `DELETE /cart/items/:productId`.
  - **Bodies:** JSON with `express.json()`. No envelope wrapper — the response body **is** the resource DTO.
  - **Success:** `200` + JSON for all endpoints. Mutations (`POST` / `PATCH` / `DELETE`) return the updated **cart** so the client can refresh totals in one round-trip.
  - **Quantity semantics:** `POST /cart/items` creates a line or **increments** an existing one; `PATCH /cart/items/:productId` **sets** absolute quantity. Quantity `<= 0` is rejected (`400`); remove a line with `DELETE`.
  - **Errors:** Structured `ApiError` `{ error: { code: string; message: string } }`. `404` for unknown product, missing cart, or missing cart line (`NOT_FOUND`). `400` for non-positive / non-integer quantity or malformed body (`VALIDATION_ERROR`). Unexpected failures → `500` (`INTERNAL_ERROR`).
  - **Dates:** ISO-8601 strings on the wire.
  - **Cart id:** Not accepted from the client on write/read paths. Server resolves the current cart via `resolveCurrentCartId(req)` (hardcoded `'1'` for the prototype; cookie later). `cartId` appears on `CartResponse` only.
  - **Persistence:** Models talk to store **ports**; default adapter is in-memory (`Map*Store`). `createModels()` **seeds** the in-memory store at process start (prototype hack — not a DB migration). Tests use the same path with a fresh in-memory store.
- **Consequences:**
  - Thin routes: resolve cart id → call services → map entities to `api-types` DTOs.
  - FE can omit cart id; swapping to cookies is localized to `resolveCurrentCartId`.
  - A real DB adapter plugs in at `createPersistence()` without changing route contracts.
  - Validation and error-handling detail is recorded in [ADR 0010](0010-validation-and-error-handling.md); this ADR locks the wire shape used by P3-3d.
