import { getPodcasts } from "@/services/products";
import List from "@/app/components/List";
import HeartbeatChecker from "@/app/components/Hearbeat";
import { IPodcast } from "@/common/types";

export default async function Podcasts() {
  let podcasts: IPodcast[] = [];

  try {
    podcasts = await getPodcasts("page=1&limit=5");
  } catch (e) {
    console.log("err on server initial data load", e);
  }

  return (
    <>
      <List podcasts={podcasts} />
      <HeartbeatChecker />
    </>
  );
}
