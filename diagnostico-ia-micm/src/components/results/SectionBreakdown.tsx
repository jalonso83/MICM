"use client";

interface SectionData {
  label: string;
  shortLabel: string;
  normalizedScore: number;
  weight: number;
}

interface Props {
  sections: SectionData[];
}

function getBarColor(score: number): string {
  if (score < 20) return "bg-red-500";
  if (score < 40) return "bg-orange-500";
  if (score < 60) return "bg-yellow-500";
  if (score < 80) return "bg-lime-500";
  return "bg-green-500";
}

export default function SectionBreakdown({ sections }: Props) {
  return (
    <div className="space-y-3">
      {sections.map((s) => (
        <div key={s.shortLabel}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">{s.shortLabel}</span>
            <span className="text-gray-500">
              {s.normalizedScore.toFixed(1)}% (peso: {(s.weight * 100).toFixed(0)}%)
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all ${getBarColor(s.normalizedScore)}`}
              style={{ width: `${s.normalizedScore}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
