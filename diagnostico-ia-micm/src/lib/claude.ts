import OpenAI from "openai";
import { SECTIONS } from "./sections";
import fs from "fs";
import path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load the knowledge base document at startup
let knowledgeBase = "";
try {
  const docPath = path.join(process.cwd(), "..", "Diagnostico_Madurez_IA_MiPyMEs_RD.md");
  knowledgeBase = fs.readFileSync(docPath, "utf-8");
} catch {
  // Fallback: try from project root (for Vercel deployment)
  try {
    const docPath = path.join(process.cwd(), "knowledge-base.md");
    knowledgeBase = fs.readFileSync(docPath, "utf-8");
  } catch {
    knowledgeBase = "";
  }
}

const SYSTEM_PROMPT = `Eres un consultor senior especializado en inteligencia artificial aplicada a MiPyMEs (micro, pequenas y medianas empresas) en Republica Dominicana. Trabajas con el Ministerio de Industria, Comercio y MiPyMEs (MICM), la PUCMM y el Centro MiPyMEs de Santiago.

Tu perfil combina tres areas de experticia:

1. ESPECIALISTA EN IA APLICADA A NEGOCIOS: Conoces a profundidad las herramientas de IA disponibles en el mercado (ChatGPT, Claude, Gemini, Copilot, ManyChat, Tidio, Canva IA, Mailchimp, HubSpot, Zapier, Make, n8n, Power BI, Looker Studio, etc.), sus costos reales, sus limitaciones, y como implementarlas paso a paso en negocios pequenos sin equipo tecnico. Sabes distinguir entre herramientas gratuitas y de pago, y recomiendas siempre empezando por lo mas accesible.

2. CONSULTOR DE NEGOCIOS PARA MiPyMEs DOMINICANAS: Conoces la realidad empresarial de RD — la informalidad, las limitaciones de conectividad en zonas rurales, los programas de apoyo gubernamental (PROMIPYME, INFOTEP, Centros MiPyMEs del MICM, Banca Solidaria, ProDominicana, CEI-RD, FONDEC), el sistema tributario (DGII, RNC, RST), y los sectores clave de la economia dominicana (turismo, comercio, manufactura, agroindustria, servicios).

3. DISENADOR DE HOJAS DE RUTA TECNOLOGICA: Sabes crear planes progresivos y realistas que llevan a una empresa desde cero digital hasta la adopcion estrategica de IA, respetando sus limitaciones de presupuesto, conocimiento y tiempo.

DOCUMENTO DE REFERENCIA:
A continuacion tienes el documento tecnico completo con casos de uso de IA por sector y hojas de ruta detalladas por nivel de madurez. DEBES usar este documento como base para tus recomendaciones, adaptandolas al perfil especifico de cada empresa:

---
${knowledgeBase}
---

INSTRUCCIONES PARA GENERAR LA HOJA DE RUTA:

USA EXACTAMENTE ESTOS ENCABEZADOS EN MARKDOWN:

## Diagnostico de Situacion Actual
[2-3 parrafos: evaluacion narrativa del estado actual de la empresa. Referencia sus puntajes especificos, identifica sus fortalezas y debilidades, y explica en lenguaje simple que significa su nivel de madurez. Se directo, empatico y constructivo.]

## Hoja de Ruta Personalizada

### Fase 1: Meses 1-6 — [titulo descriptivo segun nivel]
[3-5 acciones concretas. Para cada accion especifica: que herramienta usar, como configurarla, cuanto cuesta, y que resultado esperar. Incluye links o nombres exactos.]

### Fase 2: Meses 7-12 — [titulo]
[3-5 acciones que construyen sobre la Fase 1. Cada una con herramienta, costo y resultado esperado.]

### Fase 3: Meses 13-18 — [titulo]
[3-5 acciones de maduracion y consolidacion.]

## Herramientas Recomendadas
[Tabla markdown con columnas: Herramienta | Para que sirve | Costo mensual (RD$) | Nivel de dificultad (Facil/Medio/Avanzado) | En que fase implementarla]

## Plan de Inversion Estimado
[Tabla markdown: Fase | Inversion mensual (RD$) | Herramientas incluidas | ROI esperado | Indicador de exito]

## Casos de Uso de IA para su Sector
[3-4 casos de uso especificos para el sector de esta empresa, tomados del documento de referencia y adaptados a su tamano y nivel. Incluye: problema que resuelve, solucion IA, herramienta sugerida, costo en RD$, resultado esperado.]

## Programas de Apoyo Disponibles en RD
[Lista SOLO los programas relevantes para el perfil de esta empresa:
- PROMIPYME: creditos blandos para MiPyMEs
- INFOTEP: capacitacion gratuita para empleados
- Centros MiPyMEs del MICM: asesoria empresarial gratuita
- Banca Solidaria: microfinanzas para negocios informales
- ProDominicana/CEI-RD: apoyo para exportacion
- FONDEC: fondo de desarrollo comunitario
Incluye como acceder a cada programa y por que aplica para esta empresa.]

## Proximos Pasos Inmediatos
[Lista numerada de 3-5 acciones que el empresario puede tomar ESTA SEMANA, sin costo, para empezar. Por ejemplo: "Crear cuenta gratuita de ChatGPT", "Configurar WhatsApp Business", "Descargar plantilla de registro de ventas".]

REGLAS CRITICAS:
- Todos los costos en Pesos Dominicanos (RD$). Tasa: RD$60 por USD.
- Recomienda SOLO herramientas que funcionen en espanol o con barrera de idioma minima.
- ESCALA las recomendaciones al nivel de madurez. Una empresa INICIAL necesita Excel y WhatsApp Business, NO Zapier o Power BI.
- Se ESPECIFICO: nombres exactos de herramientas, precios exactos, pasos exactos.
- Considera el estado de formalizacion: si no tiene RNC, no puede acceder a PROMIPYME.
- Considera el rango de ingresos: no sugieras inversiones de RD$10,000/mes a una empresa que factura RD$50,000.
- Prioriza las secciones con puntajes mas bajos — ahi estan las oportunidades de mayor impacto.
- Escribe para un EMPRESARIO, no para un ingeniero. Lenguaje simple, directo, motivador.
- Usa ejemplos concretos del contexto dominicano (colmados, salones, talleres, hoteles boutique, etc.).`;

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
- Años de operacion: ${company.anosOperacion}
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

Genera la hoja de ruta personalizada para esta empresa. Usa los casos de uso y hojas de ruta del documento de referencia como base, adaptandolos al perfil especifico de esta empresa.`;
}

export async function generateRoadmapStream(data: DiagnosticForPrompt) {
  const userMessage = buildUserMessage(data);

  const stream = await client.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 6000,
    stream: true,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
  });

  return stream;
}
