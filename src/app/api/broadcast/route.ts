import { NextResponse } from "next/server";

import { getAllFids } from "@/lib/getAllFids";

import { sendBroadcastNotification } from "@/lib/sendNotification";

export async function GET() {

  try {

    const fids = await getAllFids();

    console.log("fids:", fids);

    if (!fids.length) {

      return NextResponse.json({

        message: "no users found",

        success: false

      });

    }

    await sendBroadcastNotification(fids);

    return NextResponse.json({

      success: true,

      total: fids.length

    });

  } catch (err) {

    console.error("broadcast error:", err);

    return NextResponse.json(

      {

        error: "broadcast failed"

      },

      { status: 500 }

    );

  }

}