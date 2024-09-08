import { type Response, type NextFunction, type Request } from "express";
import { AppError } from "../helper/errors";
import { HTTPStatusCode } from "../config/constant";

export class ErrorMiddleware {
  //* Dependency injection
  // constructor() {}

  public static handleError = (
    error: unknown,
    _: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (error instanceof AppError) {
      const { message, name, stack, validationErrors } = error;
      const statusCode = error.statusCode || HTTPStatusCode.InternalServerError;
      res.statusCode = statusCode;
      res.json({ name, message, validationErrors });
    } else {
      const name = "InternalServerError";
      const message = "An internal server error occurred";
      const statusCode = HTTPStatusCode.InternalServerError;
      res.statusCode = statusCode;
      res.json({ name, message });
    }
    next();
  };
}
