import { Router } from 'express';
import { resolveCurrentCartId } from '../http/current-cart.js';
import type { CartService } from '../services/cart-service.js';
import { asyncHandler, sendApiError } from './errors.js';
import { toCartResponse } from './mappers.js';

function parseAddToCartBody(body: unknown):
  | { ok: true; productId: string; quantity: number }
  | { ok: false; message: string } {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, message: 'Request body must be a JSON object' };
  }

  const record = body as Record<string, unknown>;
  const { productId, quantity } = record;

  if (typeof productId !== 'string' || productId.length === 0) {
    return { ok: false, message: 'productId must be a non-empty string' };
  }

  if (typeof quantity !== 'number' || Number.isNaN(quantity)) {
    return { ok: false, message: 'quantity must be a number' };
  }

  return { ok: true, productId, quantity };
}

function parseUpdateQuantityBody(body: unknown):
  | { ok: true; quantity: number }
  | { ok: false; message: string } {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, message: 'Request body must be a JSON object' };
  }

  const { quantity } = body as Record<string, unknown>;

  if (typeof quantity !== 'number' || Number.isNaN(quantity)) {
    return { ok: false, message: 'quantity must be a number' };
  }

  return { ok: true, quantity };
}

export function createCartRouter(cartService: CartService): Router {
  const router = Router();

  router.get(
    '/cart',
    asyncHandler(async (req, res) => {
      const cartId = resolveCurrentCartId(req);
      const cart = cartService.getCart(cartId);
      res.status(200).json(toCartResponse(cart));
    }),
  );

  router.post(
    '/cart/items',
    asyncHandler(async (req, res) => {
      const parsed = parseAddToCartBody(req.body);
      if (!parsed.ok) {
        sendApiError(res, 400, 'VALIDATION_ERROR', parsed.message);
        return;
      }

      const cartId = resolveCurrentCartId(req);
      cartService.addToCart(cartId, parsed.productId, parsed.quantity);
      const cart = cartService.getCart(cartId);
      res.status(200).json(toCartResponse(cart));
    }),
  );

  router.patch(
    '/cart/items/:productId',
    asyncHandler(async (req, res) => {
      const productId = req.params.productId;
      if (typeof productId !== 'string' || productId.length === 0) {
        sendApiError(res, 400, 'VALIDATION_ERROR', 'productId is required');
        return;
      }

      const parsed = parseUpdateQuantityBody(req.body);
      if (!parsed.ok) {
        sendApiError(res, 400, 'VALIDATION_ERROR', parsed.message);
        return;
      }

      const cartId = resolveCurrentCartId(req);
      cartService.updateQuantity(cartId, productId, parsed.quantity);
      const cart = cartService.getCart(cartId);
      res.status(200).json(toCartResponse(cart));
    }),
  );

  router.delete(
    '/cart/items/:productId',
    asyncHandler(async (req, res) => {
      const productId = req.params.productId;
      if (typeof productId !== 'string' || productId.length === 0) {
        sendApiError(res, 400, 'VALIDATION_ERROR', 'productId is required');
        return;
      }

      const cartId = resolveCurrentCartId(req);
      cartService.removeFromCart(cartId, productId);
      const cart = cartService.getCart(cartId);
      res.status(200).json(toCartResponse(cart));
    }),
  );

  return router;
}
