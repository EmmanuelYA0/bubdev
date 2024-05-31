// app/api/admin/getSalesByMonth/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const salesByMonth = await prisma.$queryRaw<
      Array<{ month: string; totalSales: number }>
    >`
    SELECT DATE_FORMAT(o.createdAt, '%Y-%m') AS month, SUM(po.quantity * p.soldPrice) AS totalSales
      FROM \`Order\` o
      JOIN \`ProductOrder\` po ON o.id = po.orderId
      JOIN \`Product\` p ON po.productId = p.id
      WHERE o.authorId IS NOT NULL
      GROUP BY month
      ORDER BY month;
    `;

    return NextResponse.json(salesByMonth, { status: 200 });
  } catch (error) {
    console.error('Error fetching sales by month:', error);
    return NextResponse.json({ error: 'Error fetching sales by month' }, { status: 500 });
  }
}