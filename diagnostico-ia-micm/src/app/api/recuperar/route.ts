import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Código requerido" },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();

    const diagnostic = await prisma.diagnostic.findUnique({
      where: { recoveryCode: cleanCode },
      select: { id: true, recoveryCode: true },
    });

    if (!diagnostic) {
      return NextResponse.json(
        { error: "No se encontró ningún diagnóstico con ese código" },
        { status: 404 }
      );
    }

    return NextResponse.json({ id: diagnostic.id });
  } catch (error) {
    console.error("Error recovering diagnostic:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
