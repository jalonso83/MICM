export interface DiagnosticResult {
  id: string;
  company: {
    nombre?: string;
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
  scores: {
    sectionId: string;
    label: string;
    shortLabel: string;
    rawScore: number;
    maxScore: number;
    normalizedScore: number;
    weight: number;
  }[];
  imiaScore: number;
  maturityLevel: string;
  maturityNumeric: number;
  overridesApplied: {
    id: string;
    description: string;
    cappedLevel: number;
    cappedLevelName: string;
  }[];
}

export interface WizardState {
  currentStep: number;
  company: Record<string, string>;
  responses: Record<string, number>;
}
