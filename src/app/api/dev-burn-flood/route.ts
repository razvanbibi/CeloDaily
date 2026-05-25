import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";

const RPC = process.env.CELO_RPC!;
const PRIVATE_KEY = process.env.RELAYER_PRIVATE_KEY!;

const TOKEN_ADDRESS =
    "YOUR_TOKEN_ADDRESS";

const TOKEN_ABI = [
    "function burn(uint256 amount) external"
];

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const amount = body.amount;
        const count = Number(body.count);

        if (!amount || !count) {
            return NextResponse.json(
                { error: "Missing params" },
                { status: 400 }
            );
        }

        const provider =
            new ethers.JsonRpcProvider(RPC);

        const wallet =
            new ethers.Wallet(
                PRIVATE_KEY,
                provider
            );

        const token =
            new ethers.Contract(
                TOKEN_ADDRESS,
                TOKEN_ABI,
                wallet
            );

        // =========================
        // NONCE START
        // =========================

        let nonce =
            await provider.getTransactionCount(
                wallet.address,
                "pending"
            );

        const hashes: string[] = [];

        // how many tx at once
        const BATCH_SIZE = 20;

        for (
            let i = 0;
            i < count;
            i += BATCH_SIZE
        ) {

            const batch = [];

            for (
                let j = 0;
                j < BATCH_SIZE &&
                i + j < count;
                j++
            ) {

                const txPromise =
                    token.burn(
                        amount,
                        {
                            nonce: nonce++,
                        }
                    );

                batch.push(txPromise);
            }

            const results =
                await Promise.allSettled(batch);

            for (const r of results) {

                if (
                    r.status === "fulfilled"
                ) {

                    hashes.push(
                        r.value.hash
                    );

                    console.log(
                        "TX:",
                        r.value.hash
                    );

                } else {

                    console.error(
                        "TX failed:",
                        r.reason
                    );
                }
            }

            // tiny cooldown
            await new Promise(
                (r) => setTimeout(r, 400)
            );
        }

        return NextResponse.json({
            success: true,
            total: hashes.length,
            hashes,
        });

    } catch (err: any) {

        console.error(err);

        return NextResponse.json(
            {
                error:
                    err?.message ||
                    "Relayer failed",
            },
            { status: 500 }
        );
    }
}