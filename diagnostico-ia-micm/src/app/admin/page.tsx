"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
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
  normS1: number;
  normS2: number;
  normS3: number;
  normS4: number;
  normS5: number;
  normS6: number;
  normS7: number;
  normS8: number;
  normS9: number;
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

const SECTION_LABELS = [
  { key: "normS1", short: "Infraestructura" },
  { key: "normS2", short: "Procesos" },
  { key: "normS3", short: "Datos" },
  { key: "normS4", short: "Habilidades" },
  { key: "normS5", short: "Uso IA" },
  { key: "normS6", short: "Cultura" },
  { key: "normS7", short: "Recursos" },
  { key: "normS8", short: "Visión" },
  { key: "normS9", short: "Gobernanza" },
];

function getHeatColor(score: number): string {
  if (score <= 20) return "#FEE2E2";
  if (score <= 40) return "#FED7AA";
  if (score <= 60) return "#FEF9C3";
  if (score <= 80) return "#D9F99D";
  return "#BBF7D0";
}

function getHeatTextColor(score: number): string {
  if (score <= 20) return "#991B1B";
  if (score <= 40) return "#9A3412";
  if (score <= 60) return "#854D0E";
  if (score <= 80) return "#3F6212";
  return "#166534";
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSector, setFilterSector] = useState("");
  const [filterProvincia, setFilterProvincia] = useState("");
  const [filterNivel, setFilterNivel] = useState("");
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticItem | null>(null);

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
          <h1 className="text-xl font-bold text-center mb-2">Panel de Administración</h1>
          <p className="text-sm text-gray-500 text-center mb-6">Diagnóstico de Madurez en IA - MICM</p>
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

  // Pie chart data
  const pieData = data.byLevel.map((l) => ({
    name: l.maturityLevel,
    value: l._count.id,
    color: LEVEL_COLORS[l.maturityLevel] || "#6B7280",
  }));

  // Bar chart data
  const sectorData = data.bySector.map((s) => ({
    name: s.sector.length > 20 ? s.sector.substring(0, 18) + "..." : s.sector,
    fullName: s.sector,
    count: s.count,
    promedio: Number(Number(s.avg_imia).toFixed(1)),
  }));

  // Radar nacional promedio
  const radarNacional = SECTION_LABELS.map((s) => ({
    dimension: s.short,
    score: data.avgScores[s.key] ? Number(Number(data.avgScores[s.key]!).toFixed(1)) : 0,
    fullMark: 100,
  }));

  // Unique values for filters
  const sectores = [...new Set(data.diagnostics.map((d) => d.sector))].sort();
  const provincias = [...new Set(data.diagnostics.map((d) => d.provincia))].sort();
  const niveles = [...new Set(data.diagnostics.map((d) => d.maturityLevel))];

  // Filtered diagnostics
  const filteredDiagnostics = data.diagnostics.filter((d) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      d.empresa.toLowerCase().includes(term) ||
      d.sector.toLowerCase().includes(term) ||
      d.provincia.toLowerCase().includes(term) ||
      d.recoveryCode.toLowerCase().includes(term);
    const matchesSector = !filterSector || d.sector === filterSector;
    const matchesProvincia = !filterProvincia || d.provincia === filterProvincia;
    const matchesNivel = !filterNivel || d.maturityLevel === filterNivel;
    return matchesSearch && matchesSector && matchesProvincia && matchesNivel;
  });

  // Province heatmap data
  const provinciaHeatmap = data.byProvincia.map((p) => ({
    name: String(p.provincia),
    count: p.count,
    avgImia: Number(Number(p.avg_imia).toFixed(1)),
  }));

  // Individual radar for selected diagnostic
  const selectedRadar = selectedDiagnostic
    ? SECTION_LABELS.map((s) => ({
        dimension: s.short,
        score: Number((selectedDiagnostic as unknown as Record<string, number>)[s.key]?.toFixed(1) || 0),
        fullMark: 100,
      }))
    : null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Panel de Administración</h1>
            <p className="text-sm text-blue-200">Diagnóstico de Madurez en IA - MICM</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
            >
              Ir al Sitio
            </Link>
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Diagnósticos</p>
            <p className="text-3xl font-bold text-blue-800">{data.totalDiagnostics}</p>
          </div>
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <p className="text-sm text-gray-500">IMIA Promedio</p>
            <p className="text-3xl font-bold text-blue-800">{avgImia.toFixed(1)}</p>
          </div>
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <p className="text-sm text-gray-500">Sectores</p>
            <p className="text-3xl font-bold text-blue-800">{data.bySector.length}</p>
          </div>
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <p className="text-sm text-gray-500">Provincias</p>
            <p className="text-3xl font-bold text-blue-800">{data.byProvincia.length}</p>
          </div>
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <p className="text-sm text-gray-500">Con Hoja de Ruta</p>
            <p className="text-3xl font-bold text-green-600">
              {data.diagnostics.filter((d) => d.tieneRoadmap).length}
            </p>
          </div>
        </div>

        {/* Row 1: Pie + Radar Nacional */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Distribución por Nivel de Madurez</h3>
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

          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Radar Promedio Nacional</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarNacional} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: "#4b5563" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} tickCount={6} />
                <Radar name="Promedio" dataKey="score" stroke="#1e40af" fill="#1e40af" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, "Promedio"]} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Bar Sector + Heatmap Provincias */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">IMIA Promedio por Sector</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value) => [`${Number(value)}`, "IMIA"]}
                  labelFormatter={(label) => {
                    const item = sectorData.find((s) => s.name === label);
                    return item ? `${item.fullName} (${item.count} empresas)` : label;
                  }}
                />
                <Bar dataKey="promedio" fill="#1e40af" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Province Heatmap */}
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Mapa de Calor por Provincia</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
              {provinciaHeatmap.map((p) => (
                <div
                  key={p.name}
                  className="rounded-lg p-2 text-center border"
                  style={{
                    backgroundColor: getHeatColor(p.avgImia),
                    color: getHeatTextColor(p.avgImia),
                  }}
                >
                  <p className="text-xs font-semibold truncate" title={p.name}>{p.name}</p>
                  <p className="text-lg font-bold">{p.avgImia}</p>
                  <p className="text-xs opacity-75">{p.count} emp.</p>
                </div>
              ))}
            </div>
            {/* Legend */}
            <div className="flex gap-1 mt-3 justify-center text-xs">
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#FEE2E2" }} /> 0-20</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#FED7AA" }} /> 21-40</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#FEF9C3" }} /> 41-60</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#D9F99D" }} /> 61-80</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#BBF7D0" }} /> 81-100</div>
            </div>
          </div>
        </div>

        {/* Individual Diagnostic Detail (modal-like) */}
        {selectedDiagnostic && selectedRadar && (
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Detalle: {selectedDiagnostic.empresa}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedDiagnostic.sector} | {selectedDiagnostic.provincia} | Código: {selectedDiagnostic.recoveryCode}
                </p>
              </div>
              <button
                onClick={() => setSelectedDiagnostic(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={selectedRadar} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} tickCount={6} />
                    <Radar dataKey="score" stroke={LEVEL_COLORS[selectedDiagnostic.maturityLevel] || "#1e40af"} fill={LEVEL_COLORS[selectedDiagnostic.maturityLevel] || "#1e40af"} fillOpacity={0.2} strokeWidth={2} />
                    <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, "Puntaje"]} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">IMIA Score</span>
                  <span className="text-2xl font-bold" style={{ color: LEVEL_COLORS[selectedDiagnostic.maturityLevel] }}>
                    {selectedDiagnostic.imiaScore.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Nivel</span>
                  <span className="px-3 py-1 rounded-full text-white text-sm font-semibold" style={{ backgroundColor: LEVEL_COLORS[selectedDiagnostic.maturityLevel] }}>
                    {selectedDiagnostic.maturityLevel}
                  </span>
                </div>
                <div className="flex justify-between"><span className="text-sm text-gray-500">Empleados</span><span className="text-sm">{selectedDiagnostic.empleados}</span></div>
                <div className="flex justify-between"><span className="text-sm text-gray-500">Ingresos</span><span className="text-sm">{selectedDiagnostic.ingresos}</span></div>
                <div className="flex justify-between"><span className="text-sm text-gray-500">Formalización</span><span className="text-sm text-right max-w-[200px]">{selectedDiagnostic.formalizacion}</span></div>
                <div className="flex justify-between"><span className="text-sm text-gray-500">Fecha</span><span className="text-sm">{new Date(selectedDiagnostic.fecha).toLocaleDateString("es-DO")}</span></div>
                <div className="flex gap-2 pt-2">
                  <Link href={`/resultado/${selectedDiagnostic.id}`} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                    Ver Resultado
                  </Link>
                  {selectedDiagnostic.tieneRoadmap && (
                    <Link href={`/hoja-de-ruta/${selectedDiagnostic.id}`} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200">
                      Ver Hoja de Ruta
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Diagnostics Table with Filters */}
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Todos los Diagnósticos</h3>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar empresa o código..."
              className="px-3 py-2 border rounded-lg text-sm"
            />
            <select
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm bg-white"
            >
              <option value="">Todos los sectores</option>
              {sectores.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={filterProvincia}
              onChange={(e) => setFilterProvincia(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm bg-white"
            >
              <option value="">Todas las provincias</option>
              {provincias.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              value={filterNivel}
              onChange={(e) => setFilterNivel(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm bg-white"
            >
              <option value="">Todos los niveles</option>
              {niveles.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <p className="text-xs text-gray-500 mb-3">
            Mostrando {filteredDiagnostics.length} de {data.totalDiagnostics} diagnósticos
          </p>

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
                  <tr
                    key={d.id}
                    className="border-b hover:bg-blue-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedDiagnostic(d)}
                  >
                    <td className="px-3 py-2 font-mono text-xs">{d.recoveryCode}</td>
                    <td className="px-3 py-2 font-medium">{d.empresa}</td>
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
                        onClick={(e) => e.stopPropagation()}
                      >
                        Ver
                      </Link>
                      {d.tieneRoadmap && (
                        <Link
                          href={`/hoja-de-ruta/${d.id}`}
                          className="text-green-600 hover:underline text-xs"
                          onClick={(e) => e.stopPropagation()}
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
              No se encontraron diagnósticos con esos filtros.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
