import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(req: Request) {

  const body = await req.json();

  if (body.type === "frame_notification") {

    const fid = body.data.fid;
    const token = body.data.notification_token;

    await redis.set(
      `basedaily:notificationToken:${fid}`,
      token
    );

  }

  return new Response("ok");

}