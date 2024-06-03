//app/api/vins/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export  async function GET (req: Request){
        try {
            const vins = await prisma.product.findMany({
                where: {
                    categoryId: 1
                }
            });
            return NextResponse.json({vins, status: 200});
        } catch (error) {
            console.error("Error fetching vins:", error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    }
