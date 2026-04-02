import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            MICM
          </div>
          <div>
            <h1 className="text-sm font-semibold text-blue-800">
              Ministerio de Industria, Comercio y MiPyMEs
            </h1>
            <p className="text-xs text-gray-500">Republica Dominicana</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Diagnostico de Madurez
            <br />
            en Inteligencia Artificial
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-8">
            Descubra en que nivel se encuentra su empresa para aprovechar la
            inteligencia artificial y reciba una hoja de ruta personalizada
            con acciones concretas para crecer.
          </p>
          <Link
            href="/diagnostico/0"
            className="inline-block bg-white text-blue-800 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Iniciar Diagnostico
          </Link>
          <p className="text-sm text-blue-200 mt-4">
            Tiempo estimado: 20-30 minutos | Gratuito | Confidencial
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-12">
          ¿Como funciona?
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
              63 preguntas organizadas en 9 dimensiones que evaluan la
              madurez digital y de IA de su empresa.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-700">2</span>
            </div>
            <h4 className="font-semibold text-lg mb-2">
              Reciba su diagnostico
            </h4>
            <p className="text-gray-600">
              Obtenga su Indice de Madurez en IA (IMIA) con un grafico
              radar que muestra sus fortalezas y areas de mejora.
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
                desc: "Conectividad, dispositivos y seguridad basica",
              },
              {
                icon: "⚙️",
                title: "Procesos Operativos",
                desc: "Nivel de digitalizacion de operaciones",
              },
              {
                icon: "📊",
                title: "Gestion de Datos",
                desc: "Recoleccion, organizacion y uso de datos",
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
                title: "Cultura e Innovacion",
                desc: "Disposicion al cambio y experimentacion",
              },
              {
                icon: "💰",
                title: "Recursos Financieros",
                desc: "Capacidad de inversion en tecnologia",
              },
              {
                icon: "🔭",
                title: "Vision Estrategica",
                desc: "Identificacion de oportunidades con IA",
              },
              {
                icon: "🛡️",
                title: "Gobernanza y Etica",
                desc: "Uso responsable de IA y proteccion de datos",
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
            { level: 5, name: "Estrategico", color: "bg-green-500" },
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
            El diagnostico es completamente gratuito y confidencial.
          </p>
          <Link
            href="/diagnostico/0"
            className="inline-block bg-white text-blue-800 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-colors"
          >
            Iniciar Diagnostico
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm">
          <p>
            Ministerio de Industria, Comercio y MiPyMEs (MICM) -
            Republica Dominicana
          </p>
          <p className="mt-2">
            Herramienta de diagnostico piloto | Version 1.0
          </p>
        </div>
      </footer>
    </main>
  );
}
