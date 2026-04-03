import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function checkAuth(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  return token === process.env.ADMIN_TOKEN;
}

export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const totalDiagnostics = await prisma.diagnostic.count();

    const byLevel = await prisma.diagnostic.groupBy({
      by: ["maturityLevel"],
      _count: { id: true },
      _avg: { imiaScore: true },
    });

    const bySector = await prisma.$queryRaw`
      SELECT c.sector, COUNT(d.id)::int as count, AVG(d."imiaScore") as avg_imia
      FROM "Diagnostic" d
      JOIN "Company" c ON d."companyId" = c.id
      GROUP BY c.sector
      ORDER BY count DESC
    `;

    const byProvincia = await prisma.$queryRaw`
      SELECT c.provincia, COUNT(d.id)::int as count, AVG(d."imiaScore") as avg_imia
      FROM "Diagnostic" d
      JOIN "Company" c ON d."companyId" = c.id
      GROUP BY c.provincia
      ORDER BY count DESC
      LIMIT 10
    `;

    const avgScores = await prisma.diagnostic.aggregate({
      _avg: {
        imiaScore: true,
        normS1: true, normS2: true, normS3: true,
        normS4: true, normS5: true, normS6: true,
        normS7: true, normS8: true, normS9: true,
      },
    });

    // List of all diagnostics
    const diagnostics = await prisma.diagnostic.findMany({
      include: { company: true, roadmap: { select: { id: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      totalDiagnostics,
      byLevel,
      bySector,
      byProvincia,
      avgScores: avgScores._avg,
      diagnostics: diagnostics.map((d) => ({
        id: d.id,
        recoveryCode: d.recoveryCode,
        empresa: d.company.nombre || "Sin nombre",
        sector: d.company.sector,
        provincia: d.company.provincia,
        empleados: d.company.numEmpleados,
        ingresos: d.company.ingresosMensuales,
        formalizacion: d.company.formalizacion,
        imiaScore: d.imiaScore,
        maturityLevel: d.maturityLevel,
        maturityNumeric: d.maturityNumeric,
        tieneRoadmap: !!d.roadmap,
        fecha: d.createdAt,
        normS1: d.normS1, normS2: d.normS2, normS3: d.normS3,
        normS4: d.normS4, normS5: d.normS5, normS6: d.normS6,
        normS7: d.normS7, normS8: d.normS8, normS9: d.normS9,
      })),
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
