import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateRoadmapStream } from "@/lib/claude";

export const maxDuration = 60;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const diagnostic = await prisma.diagnostic.findUnique({
      where: { id },
      include: { company: true, roadmap: true },
    });

    if (!diagnostic) {
      return NextResponse.json(
        { error: "Diagnostico no encontrado" },
        { status: 404 }
      );
    }

    // If roadmap already exists, return it
    if (diagnostic.roadmap) {
      return NextResponse.json({ content: diagnostic.roadmap.content });
    }

    const norms = [
      diagnostic.normS1, diagnostic.normS2, diagnostic.normS3,
      diagnostic.normS4, diagnostic.normS5, diagnostic.normS6,
      diagnostic.normS7, diagnostic.normS8, diagnostic.normS9,
    ];

    const stream = await generateRoadmapStream({
      company: diagnostic.company,
      imiaScore: diagnostic.imiaScore,
      maturityLevel: diagnostic.maturityLevel,
      maturityNumeric: diagnostic.maturityNumeric,
      norms,
      overridesApplied: diagnostic.overridesApplied as { id: string; description: string }[] | null,
    });

    // Create a ReadableStream for the response
    let fullContent = "";

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const text = event.delta.text;
              fullContent += text;
              controller.enqueue(new TextEncoder().encode(text));
            }
          }

          // Save the complete roadmap to the database
          await prisma.roadmap.create({
            data: {
              diagnosticId: id,
              content: fullContent,
              modelUsed: "claude-sonnet-4-20250514",
            },
          });

          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return NextResponse.json(
      { error: "Error generando la hoja de ruta" },
      { status: 500 }
    );
  }
}
