"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RadarChart from "@/components/results/RadarChart";
import ScoreCard from "@/components/results/ScoreCard";
import SectionBreakdown from "@/components/results/SectionBreakdown";
import { SECTIONS } from "@/lib/sections";

interface DiagnosticData {
  id: string;
  recoveryCode: string;
  imiaScore: number;
  maturityLevel: string;
  maturityNumeric: number;
  normS1: number;
  normS2: number;
  normS3: number;
  normS4: number;
  normS5: number;
  normS6: number;
  normS7: number;
  normS8: number;
  normS9: number;
  overridesApplied: { id: string; description: string }[] | null;
  company: {
    nombre?: string;
    sector: string;
    provincia: string;
  };
}

export default function ResultadoPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<DiagnosticData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCodeBanner, setShowCodeBanner] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if we just came from submitting (show recovery code banner)
    const savedCode = sessionStorage.getItem("recoveryCode");
    if (savedCode) {
      setShowCodeBanner(true);
      sessionStorage.removeItem("recoveryCode");
    }

    async function fetchData() {
      try {
        const res = await fetch(`/api/diagnostico/${params.id}`);
        if (!res.ok) throw new Error("Not found");
        const json = await res.json();
        setData(json);
      } catch {
        router.push("/");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.id, router]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700" />
      </div>
    );
  }

  const norms = [
    data.normS1, data.normS2, data.normS3, data.normS4,
    data.normS5, data.normS6, data.normS7, data.normS8, data.normS9,
  ];

  const radarData = SECTIONS.map((s, i) => ({
    dimension: s.shortLabel,
    score: norms[i],
    fullMark: 100,
  }));

  const sectionData = SECTIONS.map((s, i) => ({
    label: s.label,
    shortLabel: s.shortLabel,
    normalizedScore: norms[i],
    weight: s.weight,
  }));

  const overrides = data.overridesApplied as { id: string; description: string }[] | null;

  function handleCopy() {
    navigator.clipboard.writeText(data!.recoveryCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4">
            <Image src="/logo-micm.png" alt="MICM" width={100} height={100} className="h-11 w-auto" />
            <Image src="/logo-pucmm.png" alt="PUCMM" width={140} height={45} className="h-9 w-auto border-l-2 border-gray-300 pl-4" />
            <Image src="/logo-centro-mipymes.png" alt="Centro MiPyMEs" width={160} height={50} className="h-9 w-auto border-l-2 border-gray-300 pl-4" />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Recovery Code Banner */}
        {showCodeBanner && data.recoveryCode && (
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center">
            <p className="text-green-800 font-semibold mb-2">
              ¡Diagnóstico completado! Guarde este código para recuperar sus resultados:
            </p>
            <div className="flex items-center justify-center gap-3 my-3">
              <span className="text-3xl font-bold text-green-700 tracking-widest bg-white px-6 py-3 rounded-lg border-2 border-green-200">
                {data.recoveryCode}
              </span>
              <button
                onClick={handleCopy}
                className="px-4 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                {copied ? "¡Copiado!" : "Copiar"}
              </button>
            </div>
            <p className="text-sm text-green-600">
              Con este código puede volver a consultar sus resultados y hoja de ruta en cualquier momento.
            </p>
          </div>
        )}

        {/* Recovery code (always visible, smaller) */}
        {!showCodeBanner && data.recoveryCode && (
          <div className="flex items-center justify-between bg-white border rounded-lg px-4 py-3">
            <span className="text-sm text-gray-500">
              Código de recuperación: <strong className="text-gray-800 tracking-wider">{data.recoveryCode}</strong>
            </span>
            <button onClick={handleCopy} className="text-sm text-blue-600 hover:underline">
              {copied ? "¡Copiado!" : "Copiar"}
            </button>
          </div>
        )}

        {/* Company info */}
        {data.company && (
          <div className="text-center">
            {data.company.nombre && (
              <h1 className="text-2xl font-bold">{data.company.nombre}</h1>
            )}
            <p className="text-gray-500">
              {data.company.sector} | {data.company.provincia}
            </p>
          </div>
        )}

        {/* Score Card */}
        <ScoreCard
          imiaScore={data.imiaScore}
          maturityNumeric={data.maturityNumeric}
          maturityLevel={data.maturityLevel}
        />

        {/* Radar Chart */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Perfil por Dimensión
          </h3>
          <RadarChart data={radarData} />
        </div>

        {/* Section Breakdown */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">
            Desglose por Sección
          </h3>
          <SectionBreakdown sections={sectionData} />
        </div>

        {/* Override Rules */}
        {overrides && overrides.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-amber-800">
              Reglas de clasificación aplicadas
            </h3>
            <div className="space-y-2">
              {overrides.map((rule) => (
                <p key={rule.id} className="text-sm text-amber-700">
                  {rule.description}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center space-y-4">
          <Link
            href={`/hoja-de-ruta/${data.id}`}
            className="inline-block bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-blue-800 transition-colors"
          >
            Generar Hoja de Ruta Personalizada
          </Link>
          <p className="text-sm text-gray-500">
            Un asistente de IA generará un plan de acción específico para su
            empresa, basado en estos resultados.
          </p>
        </div>
      </main>
    </div>
  );
}
