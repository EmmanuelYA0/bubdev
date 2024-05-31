import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";



export async function GET(request: Request) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        Orders: {
          include: {
            products: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userOrders = user.Orders.map((order) => ({
      order: order.id,
      products: order.products.length,
      amount: order.amount,
      date: order.createdAt,
      status: order.status,
    }));

    return NextResponse.json(userOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}