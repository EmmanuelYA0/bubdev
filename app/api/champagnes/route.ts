//app/api/champagnes/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const champagnes = await prisma.product.findMany({
      where: {
        categoryId: 2,
      },
    });
    return NextResponse.json(champagnes, { status: 200 });
  } catch (error) {
    console.error("Error fetching champagnes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
