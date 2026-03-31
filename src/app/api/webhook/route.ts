import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {

    const body = await req.json();

    console.log("miniapp webhook event:", body);

    /*
    event example:

    {
      type: "miniapp_added",
      data: {
        fid: 12345
      }
    }

    */

    const fid = body?.data?.fid;

    if (fid) {

      await fetch(
        process.env.APP_URL + "/api/store-fid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fid
          })
        }
      );

    }

    return NextResponse.json({
      ok: true
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "webhook failed" },
      { status: 500 }
    );

  }

}