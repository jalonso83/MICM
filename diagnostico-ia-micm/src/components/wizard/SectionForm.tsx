"use client";

import { getQuestionsBySection } from "@/lib/questions";
import { SECTIONS } from "@/lib/sections";
import LikertScale from "./LikertScale";

interface Props {
  sectionIndex: number;
  responses: Record<string, number>;
  onResponse: (questionId: string, value: number) => void;
}

export default function SectionForm({
  sectionIndex,
  responses,
  onResponse,
}: Props) {
  const section = SECTIONS[sectionIndex];
  const questions = getQuestionsBySection(sectionIndex);

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">{section.label}</h2>
      <p className="text-sm text-gray-500 mb-6">
        Seccion {sectionIndex + 1} de 9 | {questions.length} preguntas
      </p>

      {/* Scale legend */}
      <div className="bg-gray-50 rounded-lg p-3 mb-6 text-xs">
        <p className="font-semibold mb-2">Escala de respuesta:</p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-1">
          {section.scaleDescription.map((desc, i) => (
            <div key={i} className="flex items-start gap-1">
              <span className="font-bold text-blue-700 shrink-0">
                {i + 1} =
              </span>
              <span className="text-gray-600">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <p className="text-sm font-medium text-gray-800 mb-2">
              <span className="text-gray-400 mr-1">
                {idx + 1}.
              </span>
              {q.text}
            </p>
            <LikertScale
              questionId={q.id}
              value={responses[q.id]}
              onChange={onResponse}
              scaleLabels={section.scaleDescription}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
