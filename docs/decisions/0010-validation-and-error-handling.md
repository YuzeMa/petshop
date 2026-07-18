# 0010. Validation and error handling

- **Status:** accepted
- **Date:** 2026-07-18
- **Context:** [`Requirement.md`](../../Requirement.md) lines 59–63 require rejecting unknown product IDs with a 4xx and structured message, rejecting non-positive quantities, and surfacing errors on the frontend with no silent failures. [ADR 0009](0009-api-design-conventions.md) locked the wire shape used by REST routes; this ADR records the validation and error-handling contract end-to-end (API + FE) so Phase 4 can sign off against an explicit decision.
- **Decision:**
  - **Error envelope:** Error responses use shared `ApiError` from `@petcircle/api-types`: `{ error: { code: string; message: string } }`. Success responses remain bare resource DTOs (no success envelope), per ADR 0009.
  - **Status codes:**
    - `404` + `NOT_FOUND` — unknown product id on add; missing cart; missing cart line on update/remove.
    - `400` + `VALIDATION_ERROR` — non-positive or non-integer quantity; malformed / missing quantity in the body (non-number).
    - `500` + `INTERNAL_ERROR` — unexpected failures (generic message; details logged server-side).
  - **Where validation lives:** Domain services own business guards (`NotFoundError`, `ValidationError` in `apps/api/src/services/`). Routes perform light request-shape checks (e.g. `typeof quantity === 'number'`) and map domain errors to HTTP via `errorMiddleware`.
  - **Frontend:** The HTTP client parses `ApiError` into `ApiRequestError` (message + code + status). Controllers catch failures and dispatch error actions; pages show a visible `ErrorBanner` (`role="alert"`). Load and mutation failures both surface — no silent swallow except aborted requests after unmount.
- **Consequences:**
  - BE and FE share one wire contract; Zod/runtime schema hardening can refine parsing later (P5-3) without changing codes or the `ApiError` shape.
  - Phase 4 sign-off is checklist + tests against this ADR and Requirement.md 59–63, not a redesign of ADR 0009.
  - Supersedes the “detail deferred to 0010” note in ADR 0009 for validation/error semantics.
