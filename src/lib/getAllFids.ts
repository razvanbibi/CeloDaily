import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function getAllFids(): Promise<number[]> {

  const keys = await redis.keys(

    "basedaily:profile:*"

  );

  const fids: number[] = [];

  for (const key of keys) {

    const profile = await redis.hgetall(key);

    if (profile?.fid) {

      fids.push(Number(profile.fid));

    }

  }

  return fids;

}