import axios from "axios";
import { PodcastsQueryParams } from "../validation/podcast";
import querystring from "node:querystring";
import { Podcast } from "./types";

export const getPodcasts = async (queryParams: PodcastsQueryParams) => {
  const queryString = querystring.stringify(queryParams);
  const { data } = await axios.get<Podcast[]>(
    `${process.env.API_URL}/podcasts${queryString ? "?" + queryString : ""}`,
  );
  return data;
};
