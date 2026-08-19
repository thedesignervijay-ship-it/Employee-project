// Central Error Handler Middleware
// Maps application errors to appropriate HTTP status codes
// Handles: Zod validation errors, custom AppErrors, and unknown errors

import { ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";

// Custom error interface with optional HTTP status code
interface AppError extends Error {
  statusCode?: number;
}

// Express error handler - must have 4 parameters to be recognized as error handler
export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Handle Zod validation errors (400 Bad Request)
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation error",
      details: err.errors.map((e) => ({ path: e.path, message: e.message })),
    });
    return;
  }

  // Handle custom errors with status code (e.g., 404, 409)
  if (err.statusCode) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Handle unknown errors (500 Internal Server Error)
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
