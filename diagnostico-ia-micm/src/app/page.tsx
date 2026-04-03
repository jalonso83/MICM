import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 relative">
        <div className="max-w-6xl mx-auto px-4 py-8 flex items-center gap-8">
          {/* Admin link */}
          <Link
            href="/admin"
            className="absolute right-4 top-6 text-xs text-gray-400 hover:text-blue-600 transition-colors"
          >
            Admin
          </Link>
          <Image
            src="/logo-micm.png"
            alt="Ministerio de Industria, Comercio y MiPyMEs"
            width={200}
            height={200}
            className="h-24 w-auto"
          />
          <div className="border-l-2 border-gray-300 pl-8">
            <Image
              src="/logo-pucmm.png"
              alt="PUCMM"
              width={340}
              height={110}
              className="h-20 w-auto"
            />
          </div>
          <div className="border-l-2 border-gray-300 pl-8">
            <Image
              src="/logo-centro-mipymes.png"
              alt="Centro MiPyMEs PUCMM Santiago"
              width={340}
              height={110}
              className="h-20 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Diagnóstico de Madurez
            <br />
            en Inteligencia Artificial
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-8">
            Descubra en qué nivel se encuentra su empresa para aprovechar la
            inteligencia artificial y reciba una hoja de ruta personalizada
            con acciones concretas para crecer.
          </p>
          <Link
            href="/diagnostico/0"
            className="inline-block bg-white text-blue-800 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Iniciar Diagnóstico
          </Link>
          <p className="text-sm text-blue-200 mt-4">
            Tiempo estimado: 20-30 minutos | Gratuito | Confidencial
          </p>
          <p className="mt-3">
            <Link
              href="/recuperar"
              className="text-sm text-blue-200 underline hover:text-white"
            >
              ¿Ya realizó el diagnóstico? Recupere sus resultados
            </Link>
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-12">
          ¿Cómo funciona?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-800">1</span>
            </div>
            <h4 className="font-semibold text-lg mb-2">
              Responda el cuestionario
            </h4>
            <p className="text-gray-600">
              63 preguntas organizadas en 9 dimensiones que evalúan la
              madurez digital y de IA de su empresa.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-700">2</span>
            </div>
            <h4 className="font-semibold text-lg mb-2">
              Reciba su diagnóstico
            </h4>
            <p className="text-gray-600">
              Obtenga su Índice de Madurez en IA (IMIA) con un gráfico
              radar que muestra sus fortalezas y áreas de mejora.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-orange-600">3</span>
            </div>
            <h4 className="font-semibold text-lg mb-2">
              Descargue su hoja de ruta
            </h4>
            <p className="text-gray-600">
              Reciba un plan personalizado con herramientas, costos,
              tiempos y programas de apoyo disponibles en RD.
            </p>
          </div>
        </div>
      </section>

      {/* Dimensiones */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-12">
            9 Dimensiones que evaluamos
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "🌐",
                title: "Infraestructura Digital",
                desc: "Conectividad, dispositivos y seguridad básica",
              },
              {
                icon: "⚙️",
                title: "Procesos Operativos",
                desc: "Nivel de digitalización de operaciones",
              },
              {
                icon: "📊",
                title: "Gestión de Datos",
                desc: "Recolección, organización y uso de datos",
              },
              {
                icon: "🧠",
                title: "Habilidades del Equipo",
                desc: "Competencias digitales y conocimiento de IA",
              },
              {
                icon: "🤖",
                title: "Uso Actual de IA",
                desc: "Herramientas de IA en uso en el negocio",
              },
              {
                icon: "💡",
                title: "Cultura e Innovación",
                desc: "Disposición al cambio y experimentación",
              },
              {
                icon: "💰",
                title: "Recursos Financieros",
                desc: "Capacidad de inversión en tecnología",
              },
              {
                icon: "🔭",
                title: "Visión Estratégica",
                desc: "Identificación de oportunidades con IA",
              },
              {
                icon: "🛡️",
                title: "Gobernanza y Ética",
                desc: "Uso responsable de IA y protección de datos",
              },
            ].map((dim) => (
              <div
                key={dim.title}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <span className="text-2xl">{dim.icon}</span>
                <h4 className="font-semibold mt-2">{dim.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Niveles */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-12">
          5 Niveles de Madurez
        </h3>
        <div className="flex flex-col md:flex-row gap-3">
          {[
            { level: 1, name: "Inicial", color: "bg-red-500" },
            { level: 2, name: "Exploratorio", color: "bg-orange-500" },
            { level: 3, name: "Emergente", color: "bg-yellow-500" },
            { level: 4, name: "Integrado", color: "bg-lime-500" },
            { level: 5, name: "Estratégico", color: "bg-green-500" },
          ].map((l) => (
            <div
              key={l.level}
              className="flex-1 rounded-lg overflow-hidden border border-gray-200"
            >
              <div className={`${l.color} h-2`} />
              <div className="p-4">
                <span className="text-sm text-gray-500">
                  Nivel {l.level}
                </span>
                <h4 className="font-semibold">{l.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-blue-800 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">
            ¿Listo para descubrir el potencial de su negocio?
          </h3>
          <p className="text-blue-200 mb-8">
            El diagnóstico es completamente gratuito y confidencial.
          </p>
          <Link
            href="/diagnostico/0"
            className="inline-block bg-white text-blue-800 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-colors"
          >
            Iniciar Diagnóstico
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm">
          <p>
            Ministerio de Industria, Comercio y MiPyMEs (MICM) -
            República Dominicana
          </p>
          <p className="mt-2">
            Herramienta de diagnóstico piloto | Versión 1.0
          </p>
        </div>
      </footer>
    </main>
  );
}
