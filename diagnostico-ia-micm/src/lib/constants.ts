export const SECTORES = [
  "Turismo y hospitalidad",
  "Comercio minorista",
  "Comercio mayorista",
  "Manufactura",
  "Agroindustria",
  "Servicios profesionales",
  "Salud",
  "Educación",
  "Construcción",
  "Transporte y logística",
  "Tecnología",
  "Otro",
] as const;

export const PROVINCIAS = [
  "Azua",
  "Bahoruco",
  "Barahona",
  "Dajabón",
  "Distrito Nacional",
  "Duarte",
  "El Seibo",
  "Elías Piña",
  "Espaillat",
  "Hato Mayor",
  "Hermanas Mirabal",
  "Independencia",
  "La Altagracia",
  "La Romana",
  "La Vega",
  "María Trinidad Sánchez",
  "Monseñor Nouel",
  "Monte Cristi",
  "Monte Plata",
  "Pedernales",
  "Peravia",
  "Puerto Plata",
  "Samaná",
  "San Cristóbal",
  "San José de Ocoa",
  "San Juan",
  "San Pedro de Macorís",
  "Sánchez Ramírez",
  "Santiago",
  "Santiago Rodríguez",
  "Santo Domingo",
  "Valverde",
] as const;

export const ZONAS = ["Urbana", "Semiurbana", "Rural"] as const;

export const NUM_EMPLEADOS = [
  "1 (solo yo)",
  "2-5",
  "6-10",
  "11-25",
  "26-50",
  "51-100",
  "101-200",
] as const;

export const ANOS_OPERACION = [
  "Menos de 1 año",
  "1-3 años",
  "4-7 años",
  "8-15 años",
  "Más de 15 años",
] as const;

export const INGRESOS_MENSUALES = [
  "Menos de RD$50,000",
  "RD$50,000 - RD$150,000",
  "RD$150,001 - RD$500,000",
  "RD$500,001 - RD$1,500,000",
  "RD$1,500,001 - RD$5,000,000",
  "Más de RD$5,000,000",
] as const;

export const FORMALIZACION = [
  "Completamente formalizada (RNC, Registro Mercantil, TSS, licencia municipal)",
  "Tengo RNC y Registro Mercantil en Cámara de Comercio",
  "Solo tengo RNC en la DGII",
  "En proceso de formalización",
  "No estoy registrado en ninguna institución",
  "No estoy seguro de mi estatus de registro",
] as const;

export const GENEROS = [
  "Femenino",
  "Masculino",
  "Prefiero no decir",
] as const;

export const EDADES = [
  "18-25",
  "26-35",
  "36-45",
  "46-55",
  "56-65",
  "Mayor de 65",
] as const;

export const NIVELES_EDUCATIVOS = [
  "Primaria",
  "Secundaria",
  "Técnico",
  "Universitario",
  "Postgrado",
] as const;

export interface MaturityLevel {
  level: number;
  name: string;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  min: number;
  max: number;
}

export const MATURITY_LEVELS: MaturityLevel[] = [
  {
    level: 1,
    name: "INICIAL",
    label: "Conectarse y Digitalizarse",
    description:
      "La empresa opera de forma mayormente analógica. Necesita iniciar su camino de digitalización básica antes de poder considerar herramientas de IA.",
    color: "#EF4444",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
    min: 0,
    max: 20,
  },
  {
    level: 2,
    name: "EXPLORATORIO",
    label: "Descubrir la IA",
    description:
      "Existe una digitalización mínima y curiosidad por la tecnología. La empresa puede dar sus primeros pasos estructurados hacia herramientas digitales e iniciar contacto con IA generativa básica.",
    color: "#F97316",
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
    min: 21,
    max: 40,
  },
  {
    level: 3,
    name: "EMERGENTE",
    label: "Integrar la IA al Negocio",
    description:
      "La empresa tiene bases digitales funcionales. Puede comenzar a implementar herramientas de IA específicas para su negocio y a medir resultados.",
    color: "#EAB308",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
    min: 41,
    max: 60,
  },
  {
    level: 4,
    name: "INTEGRADO",
    label: "Escalar y Optimizar",
    description:
      "La empresa tiene una buena base tecnológica y de datos. Está lista para una adopción significativa de IA en múltiples áreas del negocio.",
    color: "#84CC16",
    bgColor: "bg-lime-100",
    textColor: "text-lime-700",
    min: 61,
    max: 80,
  },
  {
    level: 5,
    name: "ESTRATEGICO",
    label: "Liderar e Innovar",
    description:
      "La empresa opera con mentalidad data-driven y la IA es parte de su estrategia. Puede explorar soluciones avanzadas y desarrollar capacidades propias.",
    color: "#22C55E",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    min: 81,
    max: 100,
  },
];

export function getMaturityLevel(imiaScore: number): MaturityLevel {
  const level = MATURITY_LEVELS.find(
    (l) => imiaScore >= l.min && imiaScore <= l.max
  );
  return level ?? MATURITY_LEVELS[0];
}

export function getMaturityLevelByNumber(num: number): MaturityLevel {
  return MATURITY_LEVELS.find((l) => l.level === num) ?? MATURITY_LEVELS[0];
}
