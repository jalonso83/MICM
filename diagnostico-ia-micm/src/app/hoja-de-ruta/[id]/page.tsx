"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useStreamResponse } from "@/hooks/useStreamResponse";

export default function HojaDeRutaPage() {
  const params = useParams();
  const { content, isStreaming, error, startStream } = useStreamResponse();
  const hasStarted = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleDownloadPdf = useCallback(async () => {
    if (!contentRef.current) return;
    setDownloadingPdf(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20; // 10mm margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const totalPages = Math.ceil(imgHeight / (pdfHeight - 20));

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();
        const yOffset = -(page * (pdfHeight - 20));
        pdf.addImage(imgData, "PNG", 10, yOffset + 10, imgWidth, imgHeight);
      }

      pdf.save("Hoja-de-Ruta-MICM.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
      // Fallback to print
      window.print();
    } finally {
      setDownloadingPdf(false);
    }
  }, []);

  useEffect(() => {
    if (!hasStarted.current && params.id) {
      hasStarted.current = true;
      startStream(`/api/roadmap/${params.id}`);
    }
  }, [params.id, startStream]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 no-print">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo-micm.png"
              alt="MICM"
              width={100}
              height={100}
              className="h-11 w-auto"
            />
            <Image
              src="/logo-pucmm.png"
              alt="PUCMM"
              width={140}
              height={45}
              className="h-9 w-auto border-l-2 border-gray-300 pl-4"
            />
            <Image
              src="/logo-centro-mipymes.png"
              alt="Centro MiPyMEs"
              width={160}
              height={50}
              className="h-9 w-auto border-l-2 border-gray-300 pl-4"
            />
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
        {/* Print header - only visible when printing */}
        <div className="hidden print:block mb-8 text-center border-b-2 border-blue-800 pb-6">
          <h1 className="text-2xl font-bold text-blue-800 mb-1">
            Hoja de Ruta de Madurez en IA
          </h1>
          <p className="text-sm text-gray-500">
            Ministerio de Industria, Comercio y MiPyMEs (MICM) | PUCMM | Centro MiPyMEs Santiago
          </p>
        </div>

        {/* Status */}
        {isStreaming && (
          <div className="flex items-center gap-2 mb-6 text-sm text-blue-700 bg-blue-50 rounded-lg px-4 py-3 no-print">
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
          <div ref={contentRef} className="bg-white rounded-xl border p-6 md:p-10 shadow-sm">
            <div className="roadmap-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
            {isStreaming && (
              <span className="inline-block w-2 h-5 bg-blue-600 animate-pulse ml-1" />
            )}
          </div>
        )}

        {/* Actions after complete */}
        {!isStreaming && content && (
          <div className="mt-8 text-center space-y-4 no-print">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
              >
                {downloadingPdf ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Generando PDF...
                  </>
                ) : (
                  "Descargar PDF"
                )}
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 border-2 border-blue-700 text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Imprimir
              </button>
            </div>
            <div className="flex gap-4 justify-center pt-4">
              <Link
                href={`/resultado/${params.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Ver resultados
              </Link>
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
