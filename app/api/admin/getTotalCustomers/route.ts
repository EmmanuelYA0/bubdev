// app/api/admin/getTotalSales/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const totalCustomers = await prisma.user.count({
        where: {
          role: 'USER',
        }
    });

    return NextResponse.json({ totalCustomers }, { status: 200 });

  } catch (error) {
    console.error('Error fetching total customers:', error);
    return NextResponse.json({ error: 'Error fetching total customers' }, { status: 500 });
  }
}