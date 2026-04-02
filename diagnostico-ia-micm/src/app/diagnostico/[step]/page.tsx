"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useWizardState } from "@/hooks/useWizardState";
import DemographicsForm from "@/components/wizard/DemographicsForm";
import SectionForm from "@/components/wizard/SectionForm";
import { SECTIONS } from "@/lib/sections";
import { getQuestionsBySection } from "@/lib/questions";

const TOTAL_STEPS = 10; // 0=demographics, 1-9=sections

const REQUIRED_COMPANY_FIELDS = [
  "sector",
  "provincia",
  "zona",
  "numEmpleados",
  "anosOperacion",
  "ingresosMensuales",
  "formalizacion",
  "genero",
  "edad",
  "nivelEducativo",
];

export default function WizardStepPage() {
  const params = useParams();
  const router = useRouter();
  const step = Number(params.step);
  const { state, isLoaded, setCompanyField, setResponse, reset } =
    useWizardState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" />
      </div>
    );
  }

  if (isNaN(step) || step < 0 || step > TOTAL_STEPS) {
    router.push("/diagnostico/0");
    return null;
  }

  const progress = ((step + 1) / (TOTAL_STEPS + 1)) * 100;

  function canGoNext(): boolean {
    if (step === 0) {
      return REQUIRED_COMPANY_FIELDS.every(
        (f) => state.company[f] && state.company[f].length > 0
      );
    }
    if (step >= 1 && step <= 9) {
      const sectionIndex = step - 1;
      const questions = getQuestionsBySection(sectionIndex);
      return questions.every(
        (q) =>
          state.responses[q.id] !== undefined &&
          state.responses[q.id] >= 1
      );
    }
    return true;
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      router.push(`/diagnostico/${step + 1}`);
      window.scrollTo(0, 0);
    }
  }

  function handleBack() {
    if (step > 0) {
      router.push(`/diagnostico/${step - 1}`);
      window.scrollTo(0, 0);
    }
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: state.company,
          responses: state.responses,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar el diagnostico");
      }
      const data = await res.json();
      reset();
      router.push(`/resultado/${data.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al enviar el diagnostico"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Summary step
  if (step === TOTAL_STEPS) {
    const answeredCount = Object.keys(state.responses).length;
    return (
      <div>
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Resumen</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Resumen del Diagnostico</h2>
        <p className="text-gray-600 mb-6">
          Revise sus respuestas antes de enviar.
        </p>

        <div className="space-y-3 mb-6">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold text-sm text-gray-500 mb-2">
              Datos de la Empresa
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {state.company.nombre && (
                <div>
                  <span className="text-gray-500">Nombre:</span>{" "}
                  {state.company.nombre}
                </div>
              )}
              <div>
                <span className="text-gray-500">Sector:</span>{" "}
                {state.company.sector}
              </div>
              <div>
                <span className="text-gray-500">Provincia:</span>{" "}
                {state.company.provincia}
              </div>
              <div>
                <span className="text-gray-500">Empleados:</span>{" "}
                {state.company.numEmpleados}
              </div>
            </div>
          </div>

          {SECTIONS.map((section, idx) => {
            const questions = getQuestionsBySection(idx);
            const answered = questions.filter(
              (q) => state.responses[q.id] !== undefined
            ).length;
            return (
              <div
                key={section.id}
                className="bg-white border rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-sm">{section.shortLabel}</h3>
                  <p className="text-xs text-gray-500">
                    {answered}/{questions.length} respondidas
                  </p>
                </div>
                <button
                  onClick={() => router.push(`/diagnostico/${idx + 1}`)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Editar
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>{answeredCount}/63</strong> preguntas respondidas
            {answeredCount < 63 && (
              <span className="text-red-600 ml-2">
                (Faltan {63 - answeredCount} por responder)
              </span>
            )}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleBack}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
          >
            Anterior
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || answeredCount < 63}
            className="flex-1 py-3 px-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando..." : "Enviar Diagnostico"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>
            {step === 0
              ? "Datos Generales"
              : `Seccion ${step} de 9`}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Form content */}
      {step === 0 ? (
        <DemographicsForm
          values={state.company}
          onChange={setCompanyField}
        />
      ) : (
        <SectionForm
          sectionIndex={step - 1}
          responses={state.responses}
          onResponse={setResponse}
        />
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8 pb-8 sticky bottom-0 bg-gray-50 pt-4">
        {step > 0 && (
          <button
            onClick={handleBack}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 bg-white"
          >
            Anterior
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canGoNext()}
          className="flex-1 py-3 px-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === TOTAL_STEPS - 1 ? "Revisar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
