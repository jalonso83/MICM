import Link from "next/link";
import Image from "next/image";

export default function DiagnosticoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center gap-6">
          <Link href="/" className="flex items-center gap-6">
            <Image
              src="/logo-micm.png"
              alt="MICM"
              width={160}
              height={160}
              className="h-16 w-auto"
            />
            <Image
              src="/logo-pucmm.png"
              alt="PUCMM"
              width={240}
              height={80}
              className="h-14 w-auto border-l-2 border-gray-300 pl-6"
            />
            <Image
              src="/logo-centro-mipymes.png"
              alt="Centro MiPyMEs"
              width={240}
              height={80}
              className="h-14 w-auto border-l-2 border-gray-300 pl-6"
            />
          </Link>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        {children}
      </main>
    </div>
  );
}
