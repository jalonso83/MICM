"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

interface DiagnosticItem {
  id: string;
  recoveryCode: string;
  empresa: string;
  sector: string;
  provincia: string;
  empleados: string;
  ingresos: string;
  formalizacion: string;
  imiaScore: number;
  maturityLevel: string;
  maturityNumeric: number;
  tieneRoadmap: boolean;
  fecha: string;
}

interface StatsData {
  totalDiagnostics: number;
  byLevel: { maturityLevel: string; _count: { id: number }; _avg: { imiaScore: number } }[];
  bySector: { sector: string; count: number; avg_imia: number }[];
  byProvincia: { provincia: string; count: number; avg_imia: number }[];
  avgScores: Record<string, number | null>;
  diagnostics: DiagnosticItem[];
}

const LEVEL_COLORS: Record<string, string> = {
  INICIAL: "#EF4444",
  EXPLORATORIO: "#F97316",
  EMERGENTE: "#EAB308",
  INTEGRADO: "#84CC16",
  ESTRATEGICO: "#22C55E",
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(async (authToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.status === 401) {
        setAuthenticated(false);
        throw new Error("Token inválido");
      }
      if (!res.ok) throw new Error("Error al cargar datos");
      const json = await res.json();
      setData(json);
      setAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchData(token);
  }

  async function handleExportCSV() {
    const res = await fetch("/api/admin/export", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagnosticos-micm-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl border p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-center mb-6">Panel de Administración</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Token de acceso"
              className="w-full px-4 py-3 border rounded-lg"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Acceder"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const avgImia = data.totalDiagnostics > 0
    ? data.diagnostics.reduce((sum, d) => sum + d.imiaScore, 0) / data.totalDiagnostics
    : 0;

  const pieData = data.byLevel.map((l) => ({
    name: l.maturityLevel,
    value: l._count.id,
    color: LEVEL_COLORS[l.maturityLevel] || "#6B7280",
  }));

  const sectorData = data.bySector.map((s) => ({
    name: s.sector.length > 20 ? s.sector.substring(0, 18) + "..." : s.sector,
    count: s.count,
    promedio: Number(Number(s.avg_imia).toFixed(1)),
  }));

  const filteredDiagnostics = data.diagnostics.filter((d) => {
    const term = searchTerm.toLowerCase();
    return (
      d.empresa.toLowerCase().includes(term) ||
      d.sector.toLowerCase().includes(term) ||
      d.provincia.toLowerCase().includes(term) ||
      d.recoveryCode.toLowerCase().includes(term) ||
      d.maturityLevel.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Panel de Administración</h1>
            <p className="text-sm text-blue-200">Diagnóstico de Madurez en IA - MICM</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
            >
              Exportar CSV
            </button>
            <button
              onClick={() => fetchData(token)}
              className="px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
            >
              Actualizar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">Total Diagnósticos</p>
            <p className="text-3xl font-bold text-blue-800">{data.totalDiagnostics}</p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">IMIA Promedio</p>
            <p className="text-3xl font-bold text-blue-800">{avgImia.toFixed(1)}</p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">Sectores</p>
            <p className="text-3xl font-bold text-blue-800">{data.bySector.length}</p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">Provincias</p>
            <p className="text-3xl font-bold text-blue-800">{data.byProvincia.length}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pie: Distribution by level */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-semibold mb-4">Distribución por Nivel</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar: By sector */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-semibold mb-4">IMIA Promedio por Sector</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${Number(value)}`, "IMIA Promedio"]} />
                <Bar dataKey="promedio" fill="#1e40af" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Provinces */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Top Provincias</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {data.byProvincia.map((p) => (
              <div key={String(p.provincia)} className="border rounded-lg p-3 text-center">
                <p className="text-sm font-medium">{String(p.provincia)}</p>
                <p className="text-lg font-bold text-blue-800">{p.count}</p>
                <p className="text-xs text-gray-500">IMIA: {Number(p.avg_imia).toFixed(1)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostics Table */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h3 className="text-lg font-semibold">Todos los Diagnósticos</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por empresa, sector, código..."
              className="w-full sm:w-72 px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left px-3 py-2 font-semibold">Código</th>
                  <th className="text-left px-3 py-2 font-semibold">Empresa</th>
                  <th className="text-left px-3 py-2 font-semibold">Sector</th>
                  <th className="text-left px-3 py-2 font-semibold">Provincia</th>
                  <th className="text-right px-3 py-2 font-semibold">IMIA</th>
                  <th className="text-left px-3 py-2 font-semibold">Nivel</th>
                  <th className="text-left px-3 py-2 font-semibold">Fecha</th>
                  <th className="text-center px-3 py-2 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredDiagnostics.map((d) => (
                  <tr key={d.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 font-mono text-xs">{d.recoveryCode}</td>
                    <td className="px-3 py-2">{d.empresa}</td>
                    <td className="px-3 py-2 text-xs">{d.sector}</td>
                    <td className="px-3 py-2 text-xs">{d.provincia}</td>
                    <td className="px-3 py-2 text-right font-bold">{d.imiaScore.toFixed(1)}</td>
                    <td className="px-3 py-2">
                      <span
                        className="inline-block px-2 py-1 rounded text-xs font-semibold text-white"
                        style={{ backgroundColor: LEVEL_COLORS[d.maturityLevel] || "#6B7280" }}
                      >
                        {d.maturityLevel}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-500">
                      {new Date(d.fecha).toLocaleDateString("es-DO")}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <Link
                        href={`/resultado/${d.id}`}
                        className="text-blue-600 hover:underline text-xs mr-2"
                      >
                        Ver
                      </Link>
                      {d.tieneRoadmap && (
                        <Link
                          href={`/hoja-de-ruta/${d.id}`}
                          className="text-green-600 hover:underline text-xs"
                        >
                          Ruta
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDiagnostics.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No se encontraron diagnósticos.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
