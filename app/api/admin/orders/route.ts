import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const orders = await prisma.order.findMany({
        include: {
          author: true,
          products: {
            include: {
              product: true,
            },
          },
          reservation: true,
        },
      });
  
      const formattedOrders = orders.map((order) => ({
        id: order.id.toString(),
        order: `#${order.id}`,
        customer: order.author?.email || "N/A",
        products: order.products.length,
        amount: order.amount,
        date: order.createdAt,
        status: order.status,
      }));
  
      return NextResponse.json(formattedOrders, { status: 200 });
    } catch (err) {
      console.error("[orders_GET]", err);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }


  export async function PUT(req: Request) {
    try {
      const { id, status } = await req.json();
      const updatedOrder = await prisma.order.update({
        where: { id: Number(id) },
        data: { status },
      });
  
      return NextResponse.json(updatedOrder, { status: 200 });
    } catch (err) {
      console.error("[orders_PUT]", err);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }