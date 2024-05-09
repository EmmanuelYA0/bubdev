// app/api/admin/getTotalSales/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const orderItems = await prisma.order_items.findMany({
      where: {
        orders: {
          author: {
            role: 'USER',
          },
        },
      },
      select: {
        quantity: true,
        products: {
          select: {
            price: true,
          },
        },
      },
    });

    const totalSalesAmount = orderItems.reduce((total, item) => {
      const productPrice = item.products?.price ?? 0;
      return total + item.quantity * productPrice;
    }, 0);

    return NextResponse.json({ totalSalesAmount });
  } catch (error) {
    console.error('Error fetching total sales:', error);
    return NextResponse.json({ error: 'Error fetching total sales' }, { status: 500 });
  }
}