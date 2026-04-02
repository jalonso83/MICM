"use client";

interface Props {
  questionId: string;
  value: number | undefined;
  onChange: (questionId: string, value: number) => void;
  scaleLabels: string[];
}

export default function LikertScale({
  questionId,
  value,
  onChange,
  scaleLabels,
}: Props) {
  return (
    <div className="flex gap-2 mt-2">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onChange(questionId, num)}
          className={`flex-1 min-h-[48px] rounded-lg border-2 text-sm font-semibold transition-all ${
            value === num
              ? "border-blue-600 bg-blue-600 text-white shadow-md"
              : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"
          }`}
          title={scaleLabels[num - 1] || `${num}`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
