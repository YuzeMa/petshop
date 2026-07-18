import type { ApiError } from '@petcircle/api-types';
import type { NextFunction, Request, Response } from 'express';
import {
  NotFoundError,
  ValidationError,
} from '../services/errors.js';

export function toApiError(code: string, message: string): ApiError {
  return { error: { code, message } };
}

export function sendApiError(
  res: Response,
  status: number,
  code: string,
  message: string,
): void {
  res.status(status).json(toApiError(code, message));
}

export function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    void handler(req, res, next).catch(next);
  };
}

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  void req;
  void next;

  if (err instanceof NotFoundError) {
    sendApiError(res, 404, err.code, err.message);
    return;
  }

  if (err instanceof ValidationError) {
    sendApiError(res, 400, err.code, err.message);
    return;
  }

  console.error(err);
  sendApiError(res, 500, 'INTERNAL_ERROR', 'Internal server error');
}
