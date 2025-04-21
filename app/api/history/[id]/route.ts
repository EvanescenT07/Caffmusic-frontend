import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function DELETE (
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession();
    if (!session?.user?.id) {
        return NextResponse.json({
            error: "Unauthorized",
        }, {
            status: 401,
        })
    }

    const prediction = await prisma.prediction.findUnique({
        where: {
            id: params.id
        },
    });

    if (!prediction || prediction.userId !== session.user.id) {
        return NextResponse.json({
            error: "Forbidden"
        }, {
            status: 403,
        });
    }

    await prisma.prediction.delete({
        where: {
            id: params.id
        },
    })

    return NextResponse.json({
        success: true,
        message: "Prediction deleted successfully"
    }, {
        status: 200,
    })
}