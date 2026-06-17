import { NextResponse } from "next/server";
import { getProfiles } from "@/lib/profileStore";
export async function POST(req: Request) {

    try {

        const body = await req.json();

        const addresses: string[] = body.addresses || [];

        const profiles = await getProfiles(addresses);

        return NextResponse.json({
            ok: true,
            profiles,
        });

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            {
                ok: false,
            },
            {
                status: 500,
            }
        );
    }
}
