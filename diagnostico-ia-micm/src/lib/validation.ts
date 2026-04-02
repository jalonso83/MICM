import { z } from "zod";
import { SECTORES, PROVINCIAS, ZONAS, NUM_EMPLEADOS, ANOS_OPERACION, INGRESOS_MENSUALES, FORMALIZACION, GENEROS, EDADES, NIVELES_EDUCATIVOS } from "./constants";
import { QUESTIONS } from "./questions";

export const companySchema = z.object({
  nombre: z.string().optional(),
  sector: z.enum(SECTORES),
  provincia: z.enum(PROVINCIAS),
  zona: z.enum(ZONAS),
  numEmpleados: z.enum(NUM_EMPLEADOS),
  anosOperacion: z.enum(ANOS_OPERACION),
  ingresosMensuales: z.enum(INGRESOS_MENSUALES),
  formalizacion: z.enum(FORMALIZACION),
  genero: z.enum(GENEROS),
  edad: z.enum(EDADES),
  nivelEducativo: z.enum(NIVELES_EDUCATIVOS),
});

const questionIds = QUESTIONS.map((q) => q.id);

export const responsesSchema = z.record(
  z.string(),
  z.number().int().min(1).max(5)
).refine(
  (data) => {
    const keys = Object.keys(data);
    return questionIds.every((id) => keys.includes(id));
  },
  { message: "Todas las 63 preguntas deben ser respondidas" }
);

export const diagnosticSubmitSchema = z.object({
  company: companySchema,
  responses: responsesSchema,
});

export type CompanyInput = z.infer<typeof companySchema>;
export type ResponsesInput = z.infer<typeof responsesSchema>;
export type DiagnosticSubmitInput = z.infer<typeof diagnosticSubmitSchema>;
