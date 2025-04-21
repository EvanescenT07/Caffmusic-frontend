import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';


export async function GET() {
    const session = await getServerSession();
    if (!session?.user?.id) {
        return NextResponse.json([], {
            status: 401,
        });
    }

    const predictions = await prisma.prediction.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 50,
    });
    return NextResponse.json(predictions)
}