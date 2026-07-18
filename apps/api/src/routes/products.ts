import { Router } from 'express';
import type { ProductService } from '../services/product-service.js';
import { asyncHandler } from './errors.js';
import { toProductDto } from './mappers.js';

export function createProductsRouter(productService: ProductService): Router {
  const router = Router();

  router.get(
    '/products',
    asyncHandler(async (_req, res) => {
      const products = productService.listProducts().map(toProductDto);
      res.status(200).json(products);
    }),
  );

  return router;
}
