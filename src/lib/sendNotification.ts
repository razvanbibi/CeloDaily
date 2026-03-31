import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const client = new NeynarAPIClient({

  apiKey: process.env.NEYNAR_API_KEY!

});

export async function sendBroadcastNotification(

  fids: number[]

) {

  try {

    await client.publishFrameNotifications({

      targetFids: fids,

      notification: {

        title: "🔥 BaseDaily is now Gasless",

        body: "All tx fees are now sponsored by 0xtxn",

        target_url:

          "https://basedaily-miniapp.vercel.app"

      }

    });

  } catch (err) {

    console.error("notification error:", err);

    throw err;

  }

}