import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

export const handleErrors = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (createError.isHttpError(err)) {
    res.status(err.status).send(err.message);
  } else {
    console.log("unknown error:", err);
    res.status(500).send("Server Error");
  }
};
