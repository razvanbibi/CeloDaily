import { NextResponse } from "next/server";

import { getAllFids }

from "@/lib/getAllFids";

import { sendBroadcastNotification }

from "@/lib/sendNotification";

export async function GET() {

  const fids = await getAllFids();

  console.log(

    "sending notification to",

    fids.length,

    "users"

  );

  await sendBroadcastNotification(

    fids

  );

  return NextResponse.json({

    success: true,

    total: fids.length

  });

}