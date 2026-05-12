import { Redis } from "@upstash/redis";
export async function POST(req: Request) {
  const body = await req.json();
  return new Response("ok");
}