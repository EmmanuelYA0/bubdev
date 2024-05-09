// app/api/admin/getTotalSales/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const totalOrders = await prisma.order.count();

    return NextResponse.json({ totalOrders }, { status: 200 });

  } catch (error) {
    console.error('Error fetching total Orders:', error);
    return NextResponse.json({ error: 'Error fetching total Orders' }, { status: 500 });
  }
}