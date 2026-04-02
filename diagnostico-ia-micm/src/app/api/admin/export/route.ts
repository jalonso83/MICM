import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (token !== process.env.ADMIN_TOKEN) {
    return new Response("No autorizado", { status: 401 });
  }

  try {
    const diagnostics = await prisma.diagnostic.findMany({
      include: { company: true },
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Código", "Fecha", "Empresa", "Sector", "Provincia", "Zona",
      "Empleados", "Años Operación", "Ingresos", "Formalización",
      "Género", "Edad", "Educación",
      "IMIA Score", "Nivel", "Nivel Num",
      "S1 Infraestructura", "S2 Procesos", "S3 Datos",
      "S4 Habilidades", "S5 Uso IA", "S6 Cultura",
      "S7 Recursos", "S8 Visión", "S9 Gobernanza",
    ];

    const rows = diagnostics.map((d) => [
      d.recoveryCode,
      new Date(d.createdAt).toISOString().split("T")[0],
      d.company.nombre || "Sin nombre",
      d.company.sector,
      d.company.provincia,
      d.company.zona,
      d.company.numEmpleados,
      d.company.anosOperacion,
      d.company.ingresosMensuales,
      d.company.formalizacion,
      d.company.genero,
      d.company.edad,
      d.company.nivelEducativo,
      d.imiaScore.toFixed(1),
      d.maturityLevel,
      d.maturityNumeric,
      d.normS1.toFixed(1),
      d.normS2.toFixed(1),
      d.normS3.toFixed(1),
      d.normS4.toFixed(1),
      d.normS5.toFixed(1),
      d.normS6.toFixed(1),
      d.normS7.toFixed(1),
      d.normS8.toFixed(1),
      d.normS9.toFixed(1),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="diagnosticos-micm-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting CSV:", error);
    return new Response("Error interno", { status: 500 });
  }
}
