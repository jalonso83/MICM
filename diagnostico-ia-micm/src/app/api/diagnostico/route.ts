import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { diagnosticSubmitSchema } from "@/lib/validation";
import { calculateScores } from "@/lib/scoring";
import { generateUniqueRecoveryCode } from "@/lib/recovery-code";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = diagnosticSubmitSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { company: companyData, responses } = parsed.data;

    // Calculate scores
    const result = calculateScores(responses);

    // Generate unique recovery code
    const recoveryCode = await generateUniqueRecoveryCode();

    // Create company and diagnostic in a transaction
    const diagnostic = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          nombre: companyData.nombre,
          sector: companyData.sector,
          provincia: companyData.provincia,
          zona: companyData.zona,
          numEmpleados: companyData.numEmpleados,
          anosOperacion: companyData.anosOperacion,
          ingresosMensuales: companyData.ingresosMensuales,
          formalizacion: companyData.formalizacion,
          genero: companyData.genero,
          edad: companyData.edad,
          nivelEducativo: companyData.nivelEducativo,
        },
      });

      const diag = await tx.diagnostic.create({
        data: {
          companyId: company.id,
          recoveryCode,
          responses: responses,
          scoreS1: result.sectionScores[0].rawScore,
          scoreS2: result.sectionScores[1].rawScore,
          scoreS3: result.sectionScores[2].rawScore,
          scoreS4: result.sectionScores[3].rawScore,
          scoreS5: result.sectionScores[4].rawScore,
          scoreS6: result.sectionScores[5].rawScore,
          scoreS7: result.sectionScores[6].rawScore,
          scoreS8: result.sectionScores[7].rawScore,
          scoreS9: result.sectionScores[8].rawScore,
          normS1: result.sectionScores[0].normalizedScore,
          normS2: result.sectionScores[1].normalizedScore,
          normS3: result.sectionScores[2].normalizedScore,
          normS4: result.sectionScores[3].normalizedScore,
          normS5: result.sectionScores[4].normalizedScore,
          normS6: result.sectionScores[5].normalizedScore,
          normS7: result.sectionScores[6].normalizedScore,
          normS8: result.sectionScores[7].normalizedScore,
          normS9: result.sectionScores[8].normalizedScore,
          imiaScore: result.imiaScore,
          maturityLevel: result.finalLevelName,
          maturityNumeric: result.finalLevel,
          overridesApplied: JSON.parse(JSON.stringify(result.overridesApplied)),
        },
      });

      return diag;
    });

    return NextResponse.json({
      id: diagnostic.id,
      recoveryCode: diagnostic.recoveryCode,
      imiaScore: result.imiaScore,
      maturityLevel: result.finalLevelName,
      maturityNumeric: result.finalLevel,
    });
  } catch (error) {
    console.error("Error creating diagnostic:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
