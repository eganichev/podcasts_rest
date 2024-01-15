import { Request, Response, NextFunction } from "express";
import { PodcastsQueryParams } from "../validation/podcast";
import { getPodcasts as getPodcastsService } from "../services/podcasts";
import { isAxiosError } from "axios";
import createError from "http-errors";

export const getPodcasts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.query as any as PodcastsQueryParams;
    const result = await getPodcastsService(query);
    res.json(result);
  } catch (e) {
    if (isAxiosError(e)) {
      if (e?.response?.status === 404) {
        return res.json([]).status(200);
      }
      if (e?.response?.status === 429) {
        return next(new createError.TooManyRequests());
      }
      return next(new createError.BadRequest());
    }
    next(e);
  }
};
