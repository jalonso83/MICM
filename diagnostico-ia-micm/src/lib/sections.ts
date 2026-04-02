export interface SectionConfig {
  id: string;
  key: string;
  prefix: string;
  numQuestions: number;
  maxScore: number;
  weight: number;
  label: string;
  shortLabel: string;
  scaleDescription: string[];
}

export const SECTIONS: SectionConfig[] = [
  {
    id: "S1",
    key: "scoreS1",
    prefix: "P1.",
    numQuestions: 7,
    maxScore: 35,
    weight: 0.10,
    label: "Infraestructura y Conectividad Digital",
    shortLabel: "Infraestructura",
    scaleDescription: [
      "No / No tenemos / No aplica",
      "Muy basico / Apenas funcional",
      "Aceptable / Funciona la mayor parte del tiempo",
      "Bueno / Confiable y suficiente",
      "Excelente / De alta calidad y actualizado",
    ],
  },
  {
    id: "S2",
    key: "scoreS2",
    prefix: "P2.",
    numQuestions: 8,
    maxScore: 40,
    weight: 0.15,
    label: "Digitalizacion de Procesos Operativos",
    shortLabel: "Procesos",
    scaleDescription: [
      "Totalmente manual (papel, cuaderno, memoria)",
      "Mayormente manual con algo digital",
      "Mixto: algunos procesos digitales, otros manuales",
      "Mayormente digital con herramientas especificas",
      "Completamente digital, integrado y automatizado",
    ],
  },
  {
    id: "S3",
    key: "scoreS3",
    prefix: "P3.",
    numQuestions: 8,
    maxScore: 40,
    weight: 0.15,
    label: "Gestion y Madurez de Datos",
    shortLabel: "Datos",
    scaleDescription: [
      "No / Nunca / No existe",
      "Muy poco / Rara vez / Apenas iniciando",
      "Parcialmente / A veces / En proceso",
      "En su mayoria / Frecuentemente / Bien establecido",
      "Completamente / Siempre / Totalmente integrado",
    ],
  },
  {
    id: "S4",
    key: "scoreS4",
    prefix: "P4.",
    numQuestions: 7,
    maxScore: 35,
    weight: 0.12,
    label: "Conocimiento y Habilidades Digitales del Equipo",
    shortLabel: "Habilidades",
    scaleDescription: [
      "Nadie en la empresa / Ninguno",
      "Solo una persona y con dificultad",
      "Algunas personas con habilidad basica",
      "La mayoria del equipo con buen nivel",
      "Todo el equipo con alto nivel de competencia",
    ],
  },
  {
    id: "S5",
    key: "scoreS5",
    prefix: "P5.",
    numQuestions: 8,
    maxScore: 40,
    weight: 0.18,
    label: "Uso Actual de Inteligencia Artificial",
    shortLabel: "Uso de IA",
    scaleDescription: [
      "No usamos IA para esto",
      "Lo hemos probado una o dos veces por curiosidad",
      "Lo usamos ocasionalmente cuando surge la necesidad",
      "Lo usamos regularmente como parte de nuestro flujo de trabajo",
      "Es una herramienta esencial integrada en nuestro proceso diario",
    ],
  },
  {
    id: "S6",
    key: "scoreS6",
    prefix: "P6.",
    numQuestions: 7,
    maxScore: 35,
    weight: 0.10,
    label: "Cultura Organizacional, Innovacion y Disposicion al Cambio",
    shortLabel: "Cultura",
    scaleDescription: [
      "Totalmente en desacuerdo",
      "En desacuerdo",
      "Ni de acuerdo ni en desacuerdo",
      "De acuerdo",
      "Totalmente de acuerdo",
    ],
  },
  {
    id: "S7",
    key: "scoreS7",
    prefix: "P7.",
    numQuestions: 6,
    maxScore: 30,
    weight: 0.08,
    label: "Recursos Financieros y Disposicion de Inversion",
    shortLabel: "Recursos",
    scaleDescription: [
      "No / Nada / Imposible",
      "Muy poco / Con mucha dificultad",
      "Algo / Con esfuerzo pero posible",
      "Si / Con capacidad razonable",
      "Definitivamente / Con holgura",
    ],
  },
  {
    id: "S8",
    key: "scoreS8",
    prefix: "P8.",
    numQuestions: 7,
    maxScore: 35,
    weight: 0.07,
    label: "Identificacion de Oportunidades y Vision Estrategica",
    shortLabel: "Vision",
    scaleDescription: [
      "No / Ninguna / No he pensado en eso",
      "Muy poco / Tengo una vaga idea",
      "Parcialmente / He identificado algunas posibilidades",
      "Si / Tengo ideas claras",
      "Completamente / Tengo un plan definido",
    ],
  },
  {
    id: "S9",
    key: "scoreS9",
    prefix: "P9.",
    numQuestions: 5,
    maxScore: 25,
    weight: 0.05,
    label: "Gobernanza, Etica y Confianza en IA",
    shortLabel: "Gobernanza",
    scaleDescription: [
      "No / Nunca he pensado en eso",
      "Muy poco / Tengo preocupaciones pero no se como manejarlas",
      "Parcialmente / He tomado algunas medidas basicas",
      "Si / Tenemos practicas claras al respecto",
      "Completamente / Tenemos politicas formales implementadas",
    ],
  },
];

export function getSectionByPrefix(prefix: string): SectionConfig | undefined {
  return SECTIONS.find((s) => s.prefix === prefix);
}

export function getSectionById(id: string): SectionConfig | undefined {
  return SECTIONS.find((s) => s.id === id);
}
