export interface Question {
  id: string;
  sectionIndex: number; // 0-8 maps to S1-S9
  text: string;
}

// Section 1: Infraestructura y Conectividad Digital (7 preguntas)
// Section 2: Digitalizacion de Procesos Operativos (8 preguntas)
// Section 3: Gestion y Madurez de Datos (8 preguntas)
// Section 4: Conocimiento y Habilidades Digitales (7 preguntas)
// Section 5: Uso Actual de Inteligencia Artificial (8 preguntas)
// Section 6: Cultura Organizacional e Innovacion (7 preguntas)
// Section 7: Recursos Financieros y Disposicion de Inversion (6 preguntas)
// Section 8: Identificacion de Oportunidades y Vision Estrategica (7 preguntas)
// Section 9: Gobernanza, Etica y Confianza en IA (5 preguntas)

export const QUESTIONS: Question[] = [
  // ========== SECCION 1: Infraestructura y Conectividad Digital ==========
  {
    id: "P1.1",
    sectionIndex: 0,
    text: "Mi empresa cuenta con conexión a internet (fibra óptica, cable o datos móviles) que funciona de manera estable durante el horario de operación.",
  },
  {
    id: "P1.2",
    sectionIndex: 0,
    text: "Los empleados que necesitan acceso a herramientas digitales cuentan con dispositivos adecuados (computadoras, tablets o smartphones) para trabajar.",
  },
  {
    id: "P1.3",
    sectionIndex: 0,
    text: "Mi empresa utiliza algún tipo de almacenamiento en la nube (Google Drive, Dropbox, OneDrive, iCloud) para guardar documentos o información del negocio.",
  },
  {
    id: "P1.4",
    sectionIndex: 0,
    text: "Tenemos correo electrónico empresarial (con dominio propio o al menos cuentas dedicadas al negocio) que se usa activamente para comunicaciones comerciales.",
  },
  {
    id: "P1.5",
    sectionIndex: 0,
    text: "La velocidad y calidad de mi conexión a internet permite realizar videollamadas, descargar archivos pesados y usar aplicaciones en línea sin interrupciones frecuentes.",
  },
  {
    id: "P1.6",
    sectionIndex: 0,
    text: "Mi empresa tiene página web propia, perfil de Google Business, o alguna presencia en internet más allá de redes sociales personales.",
  },
  {
    id: "P1.7",
    sectionIndex: 0,
    text: "Contamos con alguna medida de seguridad digital básica (antivirus, contraseñas seguras, respaldos de información).",
  },

  // ========== SECCION 2: Digitalizacion de Procesos Operativos ==========
  {
    id: "P2.1",
    sectionIndex: 1,
    text: "La gestión de ventas y facturación de mi negocio se realiza de forma digital.",
  },
  {
    id: "P2.2",
    sectionIndex: 1,
    text: "El control de inventario o stock de productos/insumos se lleva de forma digital.",
  },
  {
    id: "P2.3",
    sectionIndex: 1,
    text: "La contabilidad y el registro de ingresos/gastos se manejan de forma digital.",
  },
  {
    id: "P2.4",
    sectionIndex: 1,
    text: "La comunicación con clientes (consultas, pedidos, seguimiento, postventa) se gestiona de forma digital.",
  },
  {
    id: "P2.5",
    sectionIndex: 1,
    text: "La gestión de empleados (horarios, pagos, tareas) se realiza de forma digital.",
  },
  {
    id: "P2.6",
    sectionIndex: 1,
    text: "Las compras a proveedores y la gestión de la cadena de suministro se coordinan de forma digital.",
  },
  {
    id: "P2.7",
    sectionIndex: 1,
    text: "El marketing y la publicidad del negocio (redes sociales, promociones, campañas) se gestionan de forma digital.",
  },
  {
    id: "P2.8",
    sectionIndex: 1,
    text: "Los procesos principales del negocio están documentados por escrito o en un sistema, de forma que otra persona podría ejecutarlos sin depender de la memoria de una sola persona.",
  },

  // ========== SECCION 3: Gestion y Madurez de Datos ==========
  {
    id: "P3.1",
    sectionIndex: 2,
    text: "Registramos de forma sistemática los datos de cada venta (qué se vendió, cuánto, a quién, cuándo, medio de pago).",
  },
  {
    id: "P3.2",
    sectionIndex: 2,
    text: "Mantenemos una base de datos de clientes actualizada con información de contacto, historial de compras o preferencias.",
  },
  {
    id: "P3.3",
    sectionIndex: 2,
    text: "Nuestros datos están organizados de forma consistente (mismos formatos, sin duplicados excesivos, clasificados) y podemos encontrar información fácilmente cuando la necesitamos.",
  },
  {
    id: "P3.4",
    sectionIndex: 2,
    text: "Contamos con un historial de datos de al menos 6 meses que nos permite identificar tendencias (qué meses se vende más, qué productos son los más populares, etc.).",
  },
  {
    id: "P3.5",
    sectionIndex: 2,
    text: "Generamos reportes periódicos (semanal o mensual) sobre el desempeño del negocio (ventas, gastos, rentabilidad, clientes).",
  },
  {
    id: "P3.6",
    sectionIndex: 2,
    text: "Usamos los datos y reportes para tomar decisiones concretas del negocio (qué comprar, a qué precio vender, dónde invertir, qué promoción lanzar).",
  },
  {
    id: "P3.7",
    sectionIndex: 2,
    text: "Registramos y analizamos datos sobre la satisfacción de nuestros clientes (encuestas, reseñas, quejas, sugerencias).",
  },
  {
    id: "P3.8",
    sectionIndex: 2,
    text: "Tenemos claras políticas sobre quién puede acceder a los datos del negocio y cómo se respalda la información para evitar pérdidas.",
  },

  // ========== SECCION 4: Conocimiento y Habilidades Digitales del Equipo ==========
  {
    id: "P4.1",
    sectionIndex: 3,
    text: "Las personas en mi empresa manejan con comodidad herramientas básicas como correo electrónico, hojas de cálculo (Excel/Google Sheets), procesadores de texto y aplicaciones de celular.",
  },
  {
    id: "P4.2",
    sectionIndex: 3,
    text: "Las personas en mi empresa pueden usar herramientas de comunicación y colaboración digital (Zoom, Google Meet, WhatsApp Business, Slack, Trello).",
  },
  {
    id: "P4.3",
    sectionIndex: 3,
    text: "Las personas en mi empresa pueden aprender a usar una herramienta digital nueva de forma autónoma (con tutoriales, videos de YouTube o guías en línea).",
  },
  {
    id: "P4.4",
    sectionIndex: 3,
    text: "Alguien en mi empresa (puede ser yo) ha utilizado alguna herramienta de IA como ChatGPT, Gemini, Copilot, DALL-E, Midjourney, o asistentes de voz inteligentes para algún propósito.",
  },
  {
    id: "P4.5",
    sectionIndex: 3,
    text: "En los últimos 12 meses, alguien del equipo ha participado en algún curso, taller o capacitación sobre herramientas digitales, redes sociales, o tecnología aplicada al negocio.",
  },
  {
    id: "P4.6",
    sectionIndex: 3,
    text: "Podemos explicar en términos simples qué es la inteligencia artificial y dar al menos dos ejemplos de cómo se usa en los negocios.",
  },
  {
    id: "P4.7",
    sectionIndex: 3,
    text: "Tenemos identificada una persona dentro de la empresa (o un asesor externo) que lidera o puede liderar la adopción de nuevas herramientas tecnológicas.",
  },

  // ========== SECCION 5: Uso Actual de Inteligencia Artificial ==========
  {
    id: "P5.1",
    sectionIndex: 4,
    text: "Uso de IA para generación de contenido (textos para redes sociales, correos, descripciones de productos, propuestas comerciales).",
  },
  {
    id: "P5.2",
    sectionIndex: 4,
    text: "Uso de IA para atención al cliente (chatbots, respuestas automáticas, clasificación de consultas).",
  },
  {
    id: "P5.3",
    sectionIndex: 4,
    text: "Uso de IA para análisis de datos y reportes (analizar ventas, detectar patrones, generar gráficos o resúmenes).",
  },
  {
    id: "P5.4",
    sectionIndex: 4,
    text: "Uso de IA para marketing y ventas (segmentación de clientes, publicidad dirigida, recomendaciones de productos, predicción de demanda).",
  },
  {
    id: "P5.5",
    sectionIndex: 4,
    text: "Uso de IA para operaciones internas (automatización de tareas repetitivas, gestión de inventario inteligente, optimización de rutas, programación de horarios).",
  },
  {
    id: "P5.6",
    sectionIndex: 4,
    text: "Uso de IA para gestión financiera y contable (categorización de gastos, proyecciones de flujo de caja, detección de anomalías, preparación de reportes).",
  },
  {
    id: "P5.7",
    sectionIndex: 4,
    text: "Uso de IA para diseño e imagen (creación de logos, imágenes para redes, edición de fotos, generación de material gráfico).",
  },
  {
    id: "P5.8",
    sectionIndex: 4,
    text: "Uso de IA para traducción y comunicación multilingüe (traducir documentos, comunicarse con clientes en otros idiomas).",
  },

  // ========== SECCION 6: Cultura Organizacional, Innovacion y Disposicion al Cambio ==========
  {
    id: "P6.1",
    sectionIndex: 5,
    text: "Estoy convencido/a de que la tecnología y la inteligencia artificial pueden ayudar a mejorar mi negocio de forma concreta y medible.",
  },
  {
    id: "P6.2",
    sectionIndex: 5,
    text: "Estoy dispuesto/a a cambiar la forma en que hacemos las cosas en el negocio si una herramienta nueva demuestra que da mejores resultados.",
  },
  {
    id: "P6.3",
    sectionIndex: 5,
    text: "En mi empresa, cuando probamos algo nuevo y no funciona, lo vemos como un aprendizaje y no como un fracaso.",
  },
  {
    id: "P6.4",
    sectionIndex: 5,
    text: "Dedico tiempo (al menos una vez al mes) a informarme sobre nuevas herramientas, tendencias o formas de mejorar mi negocio.",
  },
  {
    id: "P6.5",
    sectionIndex: 5,
    text: "Los empleados de mi empresa (si los tengo) muestran interés y disposición positiva para aprender a usar nuevas herramientas tecnológicas.",
  },
  {
    id: "P6.6",
    sectionIndex: 5,
    text: "Participo en alguna red empresarial, gremio, cámara de comercio, o programa de apoyo donde intercambio experiencias con otros empresarios.",
  },
  {
    id: "P6.7",
    sectionIndex: 5,
    text: "He visto que mis competidores o negocios similares están usando herramientas digitales o de IA, y siento que necesito ponerme al día.",
  },

  // ========== SECCION 7: Recursos Financieros y Disposicion de Inversion ==========
  {
    id: "P7.1",
    sectionIndex: 6,
    text: "Actualmente pago por al menos un servicio digital para el negocio (internet comercial, hosting web, suscripción a software, publicidad en redes, plataforma de pago electrónico).",
  },
  {
    id: "P7.2",
    sectionIndex: 6,
    text: "Tengo un presupuesto definido (aunque sea pequeño) que destino específicamente a tecnología y herramientas digitales para el negocio.",
  },
  {
    id: "P7.3",
    sectionIndex: 6,
    text: "Podría destinar entre RD$1,000 y RD$5,000 mensuales (aprox. $20-$85 USD) a una herramienta tecnológica si me demuestra que mejora mi negocio.",
  },
  {
    id: "P7.4",
    sectionIndex: 6,
    text: "Conozco y/o he accedido a programas de financiamiento, subsidios o apoyos del gobierno, banca o cooperación internacional para que MiPyMEs inviertan en tecnología.",
  },
  {
    id: "P7.5",
    sectionIndex: 6,
    text: "Cuando he invertido en tecnología o herramientas digitales anteriormente, he podido medir si la inversión valió la pena (más ventas, menos tiempo, menos costos).",
  },
  {
    id: "P7.6",
    sectionIndex: 6,
    text: "Estaría dispuesto/a a invertir tiempo (capacitarme, asistir a talleres, ver tutoriales) para aprender a usar herramientas de IA, aun si las herramientas fueran gratuitas.",
  },

  // ========== SECCION 8: Identificacion de Oportunidades y Vision Estrategica ==========
  {
    id: "P8.1",
    sectionIndex: 7,
    text: "Puedo identificar al menos 3 tareas repetitivas en mi negocio que consumen mucho tiempo y que podrían hacerse de forma más rápida o eficiente con tecnología.",
  },
  {
    id: "P8.2",
    sectionIndex: 7,
    text: "Sé cuáles son los principales 'cuellos de botella' o problemas de eficiencia en mi negocio que la tecnología podría ayudar a resolver.",
  },
  {
    id: "P8.3",
    sectionIndex: 7,
    text: "He pensado concretamente en cómo la inteligencia artificial podría aplicarse en mi negocio (no en general, sino en MI negocio específico).",
  },
  {
    id: "P8.4",
    sectionIndex: 7,
    text: "Me beneficiaría poder predecir con mayor precisión la demanda de mis productos/servicios, gestionar mejor el inventario, o anticipar temporadas altas y bajas.",
  },
  {
    id: "P8.5",
    sectionIndex: 7,
    text: "Mi negocio genera o necesita generar contenido regularmente (publicaciones para redes, correos a clientes, descripciones de productos, propuestas) y me gustaría hacerlo de forma más rápida.",
  },
  {
    id: "P8.6",
    sectionIndex: 7,
    text: "Mi negocio recibe un volumen de interacciones con clientes (consultas, pedidos, quejas) que a veces es difícil atender a tiempo y con calidad.",
  },
  {
    id: "P8.7",
    sectionIndex: 7,
    text: "Tengo una visión clara de cómo quiero que mi negocio se vea en 2-3 años en términos de uso de tecnología e inteligencia artificial.",
  },

  // ========== SECCION 9: Gobernanza, Etica y Confianza en IA ==========
  {
    id: "P9.1",
    sectionIndex: 8,
    text: "Me preocupa la privacidad y protección de los datos de mis clientes cuando uso herramientas digitales o de IA, y tomo medidas para protegerlos.",
  },
  {
    id: "P9.2",
    sectionIndex: 8,
    text: "Cuando uso herramientas de IA (como ChatGPT), tengo cuidado de no compartir información confidencial del negocio o datos personales de clientes.",
  },
  {
    id: "P9.3",
    sectionIndex: 8,
    text: "Verifico y reviso el contenido generado por IA antes de usarlo (publicarlo, enviarlo a clientes, tomar decisiones basadas en él).",
  },
  {
    id: "P9.4",
    sectionIndex: 8,
    text: "Conozco (al menos a nivel básico) las regulaciones sobre protección de datos personales que aplican en República Dominicana (Ley 172-13).",
  },
  {
    id: "P9.5",
    sectionIndex: 8,
    text: "Entiendo que la IA puede generar información incorrecta o sesgada, y sé que no debo confiar ciegamente en sus resultados sin verificar.",
  },
];

export function getQuestionsBySection(sectionIndex: number): Question[] {
  return QUESTIONS.filter((q) => q.sectionIndex === sectionIndex);
}
