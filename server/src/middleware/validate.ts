import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import createError from "http-errors";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(error.issues);
      }
      next(new createError.BadRequest());
    }
  };

export default validate;
