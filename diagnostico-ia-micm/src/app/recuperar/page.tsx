"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RecuperarPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Código no encontrado");
      }

      router.push(`/resultado/${data.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al buscar el diagnóstico"
      );
    } finally {
      setLoading(false);
    }
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

      <main className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-xl border p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold mb-2">Recuperar Diagnóstico</h1>
          <p className="text-gray-600 mb-8">
            Ingrese el código que recibió al completar su diagnóstico para
            ver sus resultados y hoja de ruta.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Ej: MICM-A7K9X2"
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-center text-xl font-mono tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={11}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="w-full py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Buscando..." : "Buscar Diagnóstico"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">¿No tiene un código?</p>
            <Link
              href="/diagnostico/0"
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Iniciar nuevo diagnóstico
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
