import type { HelloResponse } from '@petcircle/api-types';
import { Router } from 'express';

export const helloRouter = Router();

helloRouter.get('/hello', (_req, res) => {
  const body: HelloResponse = { message: 'Hello from PetCircle API' };
  res.json(body);
});
