import { IPodcast } from "@/common/types";

export async function getPodcasts(searchParams?: string): Promise<IPodcast[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REST_HOST}/podcasts${searchParams ? "?" + searchParams : ""}`,
    { cache: "no-cache" },
  );

  if (!res.ok) {
    throw new Error(`!Failed to fetch data, ${res?.statusText}`);
  }

  return await res.json();
}
