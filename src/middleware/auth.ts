import type { NextFunction, Request, Response } from "express";
import { AppError } from "../helper/errors";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user)
    throw AppError.unauthorized("You are not authorized to access this route");

  // NOTE: Test
  // req.user = {
  //   id: "2",
  //   email: "i.amsameer2061@gmail.com",
  //   googleId: "108248729487354586310",
  //   first_name: "sameer",
  //   last_name: "pokharel",
  // };
  return next();
};
