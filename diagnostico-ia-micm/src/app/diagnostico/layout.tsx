import Link from "next/link";

export default function DiagnosticoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center text-white font-bold text-xs">
              MICM
            </div>
            <span className="text-sm font-semibold text-blue-800 hidden sm:inline">
              Diagnostico IA
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        {children}
      </main>
    </div>
  );
}
