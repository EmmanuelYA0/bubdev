import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('searchTerm');

  if (!searchTerm || searchTerm.length < 3) {
    return NextResponse.json([]);
  }

  const suggestions = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm } },
        { description: { contains: searchTerm } },
      ],
    },
    take: 5,
  });

  return NextResponse.json(suggestions);
}