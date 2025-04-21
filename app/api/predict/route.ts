import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
        return NextResponse.json({
            error: 'File is required',
            status: 400
        })
    }

    const fileName = file.name
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/x-mpeg-3', 'audio/mp3'];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({
            error: 'Invalid file type',
            status: 400
        })
    }

    if (file.size > maxSize) {
        return NextResponse.json({
            error: 'File too large',
            status: 400
        })
    }

    const backendForm = new FormData();
    backendForm.append('file', file);

    const response = await fetch(`${process.env.BACKEND_ENDPOINT_URL}/predict`, {
        method: 'POST',
        body: backendForm,
    });

    if (!response.ok) {
        return NextResponse.json({
            error: 'Failed to classify genre',
        }, {
            status: response.status
        })
    }

    const data = await response.json();

    // Session User
    const session = await getServerSession();
    if (session?.user?.id) {
        await prisma.prediction.create({
            data: {
                userId: session.user.id,
                fileName: fileName,
                genre: data.final_prediction,
                predictionId: data.prediction_id,
                confidence: data.confidence,
                chunkPredictions: data.chunk_predictions,
                finalPrediction: data.final_prediction,
                timestamp: new Date(data.timestamp),
            }
        })
    }

    return NextResponse.json(data)
}