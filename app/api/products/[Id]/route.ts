

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { Id: string } }) {
  try {
    const id = parseInt(params.Id, 10);
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!product) {
      return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
    }

    return NextResponse.json({ product, status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


