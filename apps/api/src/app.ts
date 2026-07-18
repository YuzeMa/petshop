import cors from 'cors';
import express from 'express';
import type { EnvConfig } from './config/env.js';
import { healthRouter } from './routes/health.js';
import { helloRouter } from './routes/hello.js';

export function createApp(config: EnvConfig) {
  const app = express();

  app.use(
    cors({
      origin: config.corsAllowedOrigins,
    }),
  );

  app.use(healthRouter);
  app.use(helloRouter);

  return app;
}
