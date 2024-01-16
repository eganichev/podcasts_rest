import {
  podcastsGQLQuerySchema,
  PodcastsGQLQueryParams,
} from "../validation/podcast";
import { ZodError } from "zod";
import { getPodcasts as getPodcastsService } from "../services/podcasts";
import { isAxiosError } from "axios";
import { UserInputError, ApolloError } from "apollo-server-express";

const podcasts = async (
  parent: any,
  args: { query: PodcastsGQLQueryParams },
) => {
  try {
    await podcastsGQLQuerySchema.parseAsync(args);

    const result = await getPodcastsService(args.query);

    return result;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new UserInputError("Validation error", {
        error,
        issues: error.issues,
      });
    }

    if (isAxiosError(error)) {
      if (error?.response?.status === 404) {
        return [];
      }
      if (error?.response?.status === 429) {
        throw new ApolloError("Too many requests", "TOO MANY REQUESTS");
      }

      throw new UserInputError("Bad request");
    }

    console.error("Error fetching podcasts:", error);
    throw new ApolloError("Unable to fetch podcasts");
  }
};

export default {
  Query: {
    podcasts: podcasts,
    heartbeat: () => ({ status: "OK", message: "API Gateway is alive!" }),
  },
};
