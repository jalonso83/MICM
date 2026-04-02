import OpenAI from "openai";
import { SECTIONS } from "./sections";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Eres un consultor experto en adopcion de inteligencia artificial para MiPyMEs (micro, pequenas y medianas empresas) en Republica Dominicana. Trabajas con el Ministerio de Industria, Comercio y MiPyMEs (MICM).

Vas a recibir los resultados de un diagnostico de madurez en IA de una empresa especifica. Tu trabajo es generar una hoja de ruta personalizada en espanol.

USA EXACTAMENTE ESTOS ENCABEZADOS EN MARKDOWN:

## Diagnostico de Situacion Actual
[2-3 parrafos: evaluacion narrativa del estado actual de la empresa, referenciando su sector, tamano y puntajes especificos. Se directo y constructivo.]

## Hoja de Ruta Personalizada

### Fase 1: Meses 1-6
[3-5 acciones concretas con herramientas especificas]

### Fase 2: Meses 7-12
[3-5 acciones que construyen sobre la Fase 1]

### Fase 3: Meses 13-18
[3-5 acciones de maduracion]

## Herramientas Recomendadas
[Tabla markdown con columnas: Herramienta | Proposito | Costo mensual (RD$) | Nivel de dificultad]

## Plan de Inversion Estimado
[Tabla markdown: Fase | Inversion mensual (RD$) | Herramientas incluidas | ROI esperado]

## Casos de Uso de IA para su Sector
[3-4 casos de uso especificos y concretos para el sector de la empresa, con costos en RD$]

## Programas de Apoyo Disponibles en RD
[Lista de programas relevantes: PROMIPYME, INFOTEP, Centros MiPyMEs del MICM, Banca Solidaria, ProDominicana, CEI-RD, etc. Solo los aplicables al perfil de esta empresa.]

REGLAS:
- Todos los costos en Pesos Dominicanos (RD$). Usa tasa aproximada RD$60 por USD.
- Recomienda solo herramientas que funcionen en espanol o con barrera de idioma minima.
- Escala las recomendaciones al nivel de madurez. NO recomiendes herramientas avanzadas a empresas INICIAL.
- Se especifico: nombres exactos de herramientas, precios exactos, pasos exactos.
- Considera el estado de formalizacion al recomendar programas gubernamentales.
- Considera el rango de ingresos al sugerir inversiones.
- Prioriza las secciones mas debiles (puntajes normalizados mas bajos).
- No uses jerga tecnica innecesaria. Escribe para un empresario, no para un ingeniero.`;

interface DiagnosticForPrompt {
  company: {
    nombre?: string | null;
    sector: string;
    provincia: string;
    zona: string;
    numEmpleados: string;
    anosOperacion: string;
    ingresosMensuales: string;
    formalizacion: string;
    genero: string;
    edad: string;
    nivelEducativo: string;
  };
  imiaScore: number;
  maturityLevel: string;
  maturityNumeric: number;
  norms: number[];
  overridesApplied: { id: string; description: string }[] | null;
}

function buildUserMessage(data: DiagnosticForPrompt): string {
  const { company, imiaScore, maturityLevel, maturityNumeric, norms } = data;

  const sectionLines = SECTIONS.map(
    (s, i) =>
      `| ${s.shortLabel} | ${norms[i].toFixed(1)}% | ${(s.weight * 100).toFixed(0)}% |`
  ).join("\n");

  const sorted = SECTIONS.map((s, i) => ({
    label: s.shortLabel,
    score: norms[i],
  })).sort((a, b) => b.score - a.score);

  const top3 = sorted.slice(0, 3).map((s) => `${s.label} (${s.score.toFixed(1)}%)`).join(", ");
  const bottom3 = sorted.slice(-3).map((s) => `${s.label} (${s.score.toFixed(1)}%)`).join(", ");

  const overrideText =
    data.overridesApplied && data.overridesApplied.length > 0
      ? data.overridesApplied.map((r) => r.description).join("; ")
      : "Ninguna";

  return `EMPRESA:
- Nombre: ${company.nombre || "No proporcionado"}
- Sector: ${company.sector}
- Provincia: ${company.provincia} | Zona: ${company.zona}
- Empleados: ${company.numEmpleados}
- Anos de operacion: ${company.anosOperacion}
- Ingresos mensuales: ${company.ingresosMensuales}
- Formalizacion: ${company.formalizacion}
- Propietario: ${company.genero}, ${company.edad}, educacion ${company.nivelEducativo}

RESULTADOS DEL DIAGNOSTICO:
- IMIA Score: ${imiaScore.toFixed(1)}/100
- Nivel de Madurez: ${maturityLevel} (Nivel ${maturityNumeric} de 5)

PUNTAJES POR SECCION (normalizados 0-100):
| Seccion | Puntaje | Peso |
|---------|---------|------|
${sectionLines}

FORTALEZAS (top 3): ${top3}
DEBILIDADES (bottom 3): ${bottom3}

REGLAS DE CLASIFICACION ACTIVADAS: ${overrideText}

Genera la hoja de ruta personalizada para esta empresa.`;
}

export async function generateRoadmapStream(data: DiagnosticForPrompt) {
  const userMessage = buildUserMessage(data);

  const stream = await client.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 4000,
    stream: true,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
  });

  return stream;
}
