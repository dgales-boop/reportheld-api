import { Request, Response, NextFunction } from "express";

/**
 * Error Response Interface
 */
interface ErrorResponse {
  success: false;
  error: {
    message: string;
    statusCode: number;
    timestamp: string;
    stack?: string;
  };
}

/**
 * Centralized Error Handling Middleware
 * Catches all errors and returns consistent JSON response format
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Get status code from response or default to 500
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      statusCode,
      timestamp: new Date().toISOString(),
      // Include stack trace only in development
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  };

  res.status(statusCode).json(errorResponse);
};

/**
 * 404 Not Found Handler
 * Handles requests to non-existent routes
 */
export const notFoundHandler = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404);
  const error = new Error(`Not Found - ${_req.originalUrl}`);
  next(error);
};
