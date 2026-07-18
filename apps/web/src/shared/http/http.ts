import type { ApiError } from '@petcircle/api-types';

const DEFAULT_BASE_URL = 'http://localhost:3000';

export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL;
}

export class ApiRequestError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.code = code;
    this.status = status;
  }
}

function isApiErrorBody(value: unknown): value is ApiError {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  const record = value as Record<string, unknown>;
  const error = record.error;
  if (error === null || typeof error !== 'object') {
    return false;
  }
  const errorRecord = error as Record<string, unknown>;
  return (
    typeof errorRecord.code === 'string' &&
    typeof errorRecord.message === 'string'
  );
}

export type HttpOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  signal?: AbortSignal;
};

export async function http<T>(path: string, options: HttpOptions = {}): Promise<T> {
  const { method = 'GET', body, signal } = options;
  const url = `${getApiBaseUrl()}${path}`;

  const response = await fetch(url, {
    method,
    signal,
    headers:
      body === undefined
        ? undefined
        : {
            'Content-Type': 'application/json',
          },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  let payload: unknown = null;
  const text = await response.text();
  if (text.length > 0) {
    try {
      payload = JSON.parse(text) as unknown;
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    if (isApiErrorBody(payload)) {
      throw new ApiRequestError(
        payload.error.message,
        payload.error.code,
        response.status,
      );
    }
    throw new ApiRequestError(
      `Request failed with status ${response.status}`,
      'UNKNOWN_ERROR',
      response.status,
    );
  }

  return payload as T;
}

export function toErrorMessage(error: unknown): string {
  if (error instanceof ApiRequestError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong';
}
