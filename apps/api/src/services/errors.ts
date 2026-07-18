export class NotFoundError extends Error {
  readonly code = 'NOT_FOUND' as const;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  readonly code = 'VALIDATION_ERROR' as const;

  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
