"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import RadarChart from "@/components/results/RadarChart";
import ScoreCard from "@/components/results/ScoreCard";
import SectionBreakdown from "@/components/results/SectionBreakdown";
import { SECTIONS } from "@/lib/sections";

interface DiagnosticData {
  id: string;
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

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center text-white font-bold text-xs">
              MICM
            </div>
            <span className="text-sm font-semibold text-blue-800">
              Resultados del Diagnostico
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
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
            Perfil por Dimension
          </h3>
          <RadarChart data={radarData} />
        </div>

        {/* Section Breakdown */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">
            Desglose por Seccion
          </h3>
          <SectionBreakdown sections={sectionData} />
        </div>

        {/* Override Rules */}
        {overrides && overrides.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-amber-800">
              Reglas de clasificacion aplicadas
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
            Un asistente de IA generara un plan de accion especifico para su
            empresa basado en estos resultados.
          </p>
        </div>
      </main>
    </div>
  );
}
