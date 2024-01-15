import { IHeartbeat } from "@/common/types";

export async function heartbeat(): Promise<IHeartbeat> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_HOST}/heartbeat`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  return await res.json();
}
