import { Request, Response, NextFunction } from "express";

/**
 * Async Handler Middleware
 * Wraps async route handlers to catch errors and pass them to error middleware
 * Eliminates need for try-catch in every controller function
 */

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void | Response>;

export const asyncHandler = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
