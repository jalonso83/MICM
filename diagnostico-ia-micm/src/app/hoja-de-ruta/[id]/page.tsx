"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useStreamResponse } from "@/hooks/useStreamResponse";

export default function HojaDeRutaPage() {
  const params = useParams();
  const { content, isStreaming, error, startStream } = useStreamResponse();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!hasStarted.current && params.id) {
      hasStarted.current = true;
      startStream(`/api/roadmap/${params.id}`);
    }
  }, [params.id, startStream]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center text-white font-bold text-xs">
              MICM
            </div>
            <span className="text-sm font-semibold text-blue-800">
              Hoja de Ruta
            </span>
          </Link>
          <Link
            href={`/resultado/${params.id}`}
            className="text-sm text-blue-600 hover:underline"
          >
            Ver Resultados
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Status */}
        {isStreaming && (
          <div className="flex items-center gap-2 mb-6 text-sm text-blue-700 bg-blue-50 rounded-lg px-4 py-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700" />
            Generando su hoja de ruta personalizada...
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Roadmap content */}
        {content && (
          <div className="bg-white rounded-xl border p-6 md:p-8">
            <article className="prose prose-blue max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-table:text-sm prose-th:bg-gray-50 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-td:border prose-th:border">
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
            {isStreaming && (
              <span className="inline-block w-2 h-5 bg-blue-600 animate-pulse ml-1" />
            )}
          </div>
        )}

        {/* Actions after complete */}
        {!isStreaming && content && (
          <div className="mt-8 text-center space-y-4">
            <button
              onClick={() => window.print()}
              className="inline-block bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Imprimir / Guardar como PDF
            </button>
            <p className="text-sm text-gray-500">
              Use Ctrl+P o Cmd+P para guardar como PDF desde su navegador.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="text-sm text-blue-600 hover:underline"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
