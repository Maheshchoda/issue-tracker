import prisma from '@/app/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json('An error occured');
  }
}
