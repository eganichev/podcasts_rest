import z from "zod";

const podcastsQuerySchema = z.object({
  query: z
    .object({
      title: z.string().optional(),
      categoryName: z.string().optional(),
      search: z.string().optional(),
      page: z
        .string()
        .optional()
        .refine(
          (v) => {
            let n = Number(v);
            return !isNaN(n) && v!?.length > 0;
          },
          { message: "Invalid number" },
        )
        .default("1"),
      limit: z
        .string()
        .optional()
        .refine(
          (v) => {
            let n = Number(v);
            return !isNaN(n) && v!?.length > 0;
          },
          { message: "Invalid number" },
        )
        .default("100"),
      p: z.number().optional(),
      l: z.number().optional(),
    })
    .strict(),
});

export const podcastsGQLQuerySchema = z.object({
  query: z
    .object({
      title: z.string().optional(),
      categoryName: z.string().optional(),
      search: z.string().optional(),
      page: z.number().optional().default(1),
      limit: z.number().optional().default(100),
      p: z.number().optional(),
      l: z.number().optional(),
    })
    .strict(),
});

export type PodcastsQueryParams = z.infer<typeof podcastsQuerySchema>["query"];

export type PodcastsGQLQueryParams = z.infer<
  typeof podcastsGQLQuerySchema
>["query"];

export default podcastsQuerySchema;
