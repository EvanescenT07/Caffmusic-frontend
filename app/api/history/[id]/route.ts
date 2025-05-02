import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  const session = await getServerSession();
  let userId: string | null = null;

  if (session?.user?.id) {
    userId = session.user.id;
  } else {
    const myCookies = await cookies();
    const token = myCookies.get("token")?.value;
    if (token && JWT_SECRET) {
      try {
        const payload = jwt.verify(token, JWT_SECRET) as { id: string };
        userId = payload.id;
      } catch {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    }
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    fileName,
    genre,
    predictionId,
    confidence,
    chunkPredictions,
    finalPrediction,
    timestamp,
  } = body;

  const prediction = await prisma.prediction.create({
    data: {
      userId,
      fileName,
      genre,
      predictionId,
      confidence,
      chunkPredictions,
      finalPrediction,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: "Prediction updated successfully",
      prediction,
    },
    { status: 201 }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  let userId: string | null = null;

  if (session?.user?.id) {
    userId = session.user.id;
  } else {
    const myCookies = await cookies();
    const token = myCookies.get("token")?.value;
    if (token && JWT_SECRET) {
      try {
        const payload = jwt.verify(token, JWT_SECRET) as { id: string };
        userId = payload.id;
      } catch {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    }
  }

  const prediction = await prisma.prediction.findUnique({
    where: { id: params.id },
  });

  if (!prediction || prediction.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.prediction.delete({
    where: { id: params.id },
  });

  return NextResponse.json(
    { success: true, message: "Prediction deleted successfully" },
    { status: 200 }
  );
}
