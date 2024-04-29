//app/api/spiritueux/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export  async function GET (){
        try {
            const spiritueux = await prisma.product.findMany({
                where: {
                    categoryId: 3
                }
            });
            return NextResponse.json({spiritueux, status: 200});
        } catch (error) {
            console.error("Error fetching spiritueux:", error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    }
