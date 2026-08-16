import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger';

export class HttpError extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction): void {
  next(new HttpError(404, 'Resource not found'));
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const error = err as Error & { status?: number };

  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message });
    return;
  }

  const status = error.status && error.status >= 400 && error.status < 600 ? error.status : 500;

  if (status >= 500) {
    logger.error(`[error] ${error.message}\n${error.stack ?? ''}`);
  }

  const message =
    status >= 500 && process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message || 'Internal server error';

  res.status(status).json({ error: message });
}
