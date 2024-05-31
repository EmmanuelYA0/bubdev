// app/api/admin/getTotalSales/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    const totalSalesAmount = orders.reduce((total, order) => {
      const orderTotal = order.products.reduce((orderTotal, productOrder) => {
        const productPrice = productOrder.product.soldPrice || 0;
        return orderTotal + productOrder.quantity * productPrice;
      }, 0);

      return total + orderTotal;
    }, 0);

    return NextResponse.json({ totalSalesAmount });
  } catch (error) {
    console.error('Error fetching total sales:', error);
    return NextResponse.json({ error: 'Error fetching total sales' }, { status: 500 });
  }
}