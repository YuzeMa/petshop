import type { Request } from 'express';
import { GLOBAL_CART_ID } from '../entities/constants.js';

/**
 * Resolves the caller's current cart id.
 * Today: always returns the prototype global cart (`GLOBAL_CART_ID` = '1').
 * Later: read from cookie (e.g. req.cookies.cartId) with fallback/create.
 */
export function resolveCurrentCartId(req: Request): string {
  // Cookie wiring deferred — hard-coded single cart for the prototype.
  // `req` is reserved for reading cookies later.
  void req;
  return GLOBAL_CART_ID;
}
