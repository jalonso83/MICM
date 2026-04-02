import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  // Simple auth check
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (token !== process.env.ADMIN_TOKEN) {
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

    return NextResponse.json({
      totalDiagnostics,
      byLevel,
      bySector,
      byProvincia,
      avgScores: avgScores._avg,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
