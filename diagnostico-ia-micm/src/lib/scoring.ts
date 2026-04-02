import { SECTIONS } from "./sections";
import { QUESTIONS } from "./questions";

export interface SectionScore {
  sectionId: string;
  label: string;
  shortLabel: string;
  rawScore: number;
  maxScore: number;
  normalizedScore: number;
  weight: number;
  weightedContribution: number;
}

export interface OverrideRule {
  id: string;
  description: string;
  cappedLevel: number;
  cappedLevelName: string;
}

export interface ScoringResult {
  sectionScores: SectionScore[];
  imiaScore: number;
  baseLevelFromIMIA: number;
  finalLevel: number;
  finalLevelName: string;
  overridesApplied: OverrideRule[];
}

const LEVEL_NAMES: Record<number, string> = {
  1: "INICIAL",
  2: "EXPLORATORIO",
  3: "EMERGENTE",
  4: "INTEGRADO",
  5: "ESTRATEGICO",
};

function getLevelFromIMIA(imia: number): number {
  if (imia <= 20) return 1;
  if (imia <= 40) return 2;
  if (imia <= 60) return 3;
  if (imia <= 80) return 4;
  return 5;
}

export function calculateScores(
  responses: Record<string, number>
): ScoringResult {
  // Step 1: Calculate raw and normalized scores per section
  const sectionScores: SectionScore[] = SECTIONS.map((section, index) => {
    const sectionQuestions = QUESTIONS.filter(
      (q) => q.sectionIndex === index
    );

    const rawScore = sectionQuestions.reduce((sum, q) => {
      const value = responses[q.id];
      return sum + (typeof value === "number" ? value : 0);
    }, 0);

    const normalizedScore =
      section.maxScore > 0 ? (rawScore / section.maxScore) * 100 : 0;

    const weightedContribution = normalizedScore * section.weight;

    return {
      sectionId: section.id,
      label: section.label,
      shortLabel: section.shortLabel,
      rawScore,
      maxScore: section.maxScore,
      normalizedScore: Math.round(normalizedScore * 100) / 100,
      weight: section.weight,
      weightedContribution:
        Math.round(weightedContribution * 100) / 100,
    };
  });

  // Step 2: Calculate IMIA
  const imiaScore =
    Math.round(
      sectionScores.reduce((sum, s) => sum + s.weightedContribution, 0) *
        100
    ) / 100;

  // Step 3: Determine base level from IMIA
  const baseLevelFromIMIA = getLevelFromIMIA(imiaScore);

  // Step 4: Apply override rules
  const overridesApplied: OverrideRule[] = [];
  let cappedLevel = 5; // Start with max possible

  // Get normalized scores by section ID for easy lookup
  const normBySection: Record<string, number> = {};
  sectionScores.forEach((s) => {
    normBySection[s.sectionId] = s.normalizedScore;
  });

  // Rule 1: Infrastructure minimum
  if (normBySection["S1"] < 30) {
    cappedLevel = Math.min(cappedLevel, 2);
    overridesApplied.push({
      id: "RULE_INFRA_MIN",
      description:
        "Infraestructura y Conectividad por debajo del 30%. Sin infraestructura basica no se puede avanzar en IA. Nivel maximo: EXPLORATORIO.",
      cappedLevel: 2,
      cappedLevelName: "EXPLORATORIO",
    });
  }

  // Rule 2: Data minimum
  if (normBySection["S3"] < 40) {
    cappedLevel = Math.min(cappedLevel, 3);
    overridesApplied.push({
      id: "RULE_DATA_MIN",
      description:
        "Gestion de Datos por debajo del 40%. La IA necesita datos para funcionar. Nivel maximo: EMERGENTE.",
      cappedLevel: 3,
      cappedLevelName: "EMERGENTE",
    });
  }

  // Rule 3: Real AI usage
  if (normBySection["S5"] < 20) {
    cappedLevel = Math.min(cappedLevel, 2);
    overridesApplied.push({
      id: "RULE_USO_REAL",
      description:
        "Uso Actual de IA por debajo del 20%. Se necesita evidencia de uso real de IA. Nivel maximo: EXPLORATORIO.",
      cappedLevel: 2,
      cappedLevelName: "EXPLORATORIO",
    });
  }

  // Rule 4: Governance requirement for ESTRATEGICO
  if (baseLevelFromIMIA >= 5 && normBySection["S9"] < 60) {
    cappedLevel = Math.min(cappedLevel, 4);
    overridesApplied.push({
      id: "RULE_GOBERNANZA",
      description:
        "Para alcanzar nivel ESTRATEGICO, Gobernanza y Etica debe estar al 60% o mas. Nivel maximo: INTEGRADO.",
      cappedLevel: 4,
      cappedLevelName: "INTEGRADO",
    });
  }

  // Step 5: Final level is the minimum of base level and capped level
  const finalLevel = Math.min(baseLevelFromIMIA, cappedLevel);
  const finalLevelName = LEVEL_NAMES[finalLevel];

  return {
    sectionScores,
    imiaScore,
    baseLevelFromIMIA,
    finalLevel,
    finalLevelName,
    overridesApplied,
  };
}

export function getTopSections(
  sectionScores: SectionScore[],
  count: number = 3
): SectionScore[] {
  return [...sectionScores]
    .sort((a, b) => b.normalizedScore - a.normalizedScore)
    .slice(0, count);
}

export function getBottomSections(
  sectionScores: SectionScore[],
  count: number = 3
): SectionScore[] {
  return [...sectionScores]
    .sort((a, b) => a.normalizedScore - b.normalizedScore)
    .slice(0, count);
}
