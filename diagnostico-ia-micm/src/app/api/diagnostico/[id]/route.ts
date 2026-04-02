import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
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

    return NextResponse.json(diagnostic);
  } catch (error) {
    console.error("Error fetching diagnostic:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
