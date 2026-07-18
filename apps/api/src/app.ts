import cors from 'cors';
import express from 'express';
import type { EnvConfig } from './config/env.js';
import { createModels, type Models } from './models/create-models.js';
import { createCartRouter } from './routes/cart.js';
import { errorMiddleware } from './routes/errors.js';
import { healthRouter } from './routes/health.js';
import { helloRouter } from './routes/hello.js';
import { createProductsRouter } from './routes/products.js';
import { CartService } from './services/cart-service.js';
import { ProductService } from './services/product-service.js';

export function createApp(config: EnvConfig, models: Models = createModels()) {
  const app = express();

  const productService = new ProductService(models.productModel);
  const cartService = new CartService(
    models.productModel,
    models.cartModel,
    models.cartItemModel,
  );

  app.use(
    cors({
      origin: config.corsAllowedOrigins,
    }),
  );
  app.use(express.json());

  app.use(healthRouter);
  app.use(helloRouter);
  app.use(createProductsRouter(productService));
  app.use(createCartRouter(cartService));

  app.use(errorMiddleware);

  return app;
}
