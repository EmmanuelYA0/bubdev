// app/api/admin/getSalesByMonth/route.ts

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const salesByMonth = await prisma.$queryRaw<
            Array<{ month: string; totalSales: number }>
        >`
            SELECT
                DATE_FORMAT(o.createdAt, '%Y-%m') AS month,
                SUM(oi.quantity * p.price) AS totalSales
            FROM \`Order\` o
            JOIN Order_items oi ON o.id = oi.orderId
            JOIN Product p ON oi.productId = p.id
            JOIN User u ON o.authorId = u.id
            WHERE u.role = 'USER'
            GROUP BY month
            ORDER BY month;
    `;

        return NextResponse.json(salesByMonth, { status: 200 });
    } catch (error) {
        console.error('Error fetching sales by month:', error);
        return NextResponse.json({ error: 'Error fetching sales by month' }, { status: 500 });
    }
}