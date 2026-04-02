"use client";

import { getMaturityLevelByNumber } from "@/lib/constants";

interface Props {
  imiaScore: number;
  maturityNumeric: number;
  maturityLevel: string;
}

export default function ScoreCard({
  imiaScore,
  maturityNumeric,
  maturityLevel,
}: Props) {
  const level = getMaturityLevelByNumber(maturityNumeric);

  return (
    <div className="bg-white rounded-xl border-2 p-6 text-center" style={{ borderColor: level.color }}>
      <p className="text-sm text-gray-500 mb-2">
        Índice de Madurez en IA (IMIA)
      </p>
      <div className="text-6xl font-bold mb-2" style={{ color: level.color }}>
        {imiaScore.toFixed(1)}
      </div>
      <p className="text-sm text-gray-400 mb-4">de 100 puntos</p>
      <div
        className="inline-block px-4 py-2 rounded-full text-white font-semibold text-sm"
        style={{ backgroundColor: level.color }}
      >
        Nivel {maturityNumeric}: {maturityLevel}
      </div>
      <p className="text-sm text-gray-600 mt-4 max-w-md mx-auto">
        {level.label}
      </p>
      <p className="text-xs text-gray-500 mt-2 max-w-lg mx-auto">
        {level.description}
      </p>
    </div>
  );
}
