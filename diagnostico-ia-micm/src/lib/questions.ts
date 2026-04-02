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
    text: "Mi empresa cuenta con conexion a internet (fibra optica, cable o datos moviles) que funciona de manera estable durante el horario de operacion.",
  },
  {
    id: "P1.2",
    sectionIndex: 0,
    text: "Los empleados que necesitan acceso a herramientas digitales cuentan con dispositivos adecuados (computadoras, tablets o smartphones) para trabajar.",
  },
  {
    id: "P1.3",
    sectionIndex: 0,
    text: "Mi empresa utiliza algun tipo de almacenamiento en la nube (Google Drive, Dropbox, OneDrive, iCloud) para guardar documentos o informacion del negocio.",
  },
  {
    id: "P1.4",
    sectionIndex: 0,
    text: "Tenemos correo electronico empresarial (con dominio propio o al menos cuentas dedicadas al negocio) que se usa activamente para comunicaciones comerciales.",
  },
  {
    id: "P1.5",
    sectionIndex: 0,
    text: "La velocidad y calidad de mi conexion a internet permite realizar videollamadas, descargar archivos pesados y usar aplicaciones en linea sin interrupciones frecuentes.",
  },
  {
    id: "P1.6",
    sectionIndex: 0,
    text: "Mi empresa tiene pagina web propia, perfil de Google Business, o alguna presencia en internet mas alla de redes sociales personales.",
  },
  {
    id: "P1.7",
    sectionIndex: 0,
    text: "Contamos con alguna medida de seguridad digital basica (antivirus, contrasenas seguras, respaldos de informacion).",
  },

  // ========== SECCION 2: Digitalizacion de Procesos Operativos ==========
  {
    id: "P2.1",
    sectionIndex: 1,
    text: "La gestion de ventas y facturacion de mi negocio se realiza de forma digital.",
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
    text: "La comunicacion con clientes (consultas, pedidos, seguimiento, postventa) se gestiona de forma digital.",
  },
  {
    id: "P2.5",
    sectionIndex: 1,
    text: "La gestion de empleados (horarios, pagos, tareas) se realiza de forma digital.",
  },
  {
    id: "P2.6",
    sectionIndex: 1,
    text: "Las compras a proveedores y la gestion de la cadena de suministro se coordinan de forma digital.",
  },
  {
    id: "P2.7",
    sectionIndex: 1,
    text: "El marketing y la publicidad del negocio (redes sociales, promociones, campanas) se gestionan de forma digital.",
  },
  {
    id: "P2.8",
    sectionIndex: 1,
    text: "Los procesos principales del negocio estan documentados por escrito o en un sistema, de forma que otra persona podria ejecutarlos sin depender de la memoria de una sola persona.",
  },

  // ========== SECCION 3: Gestion y Madurez de Datos ==========
  {
    id: "P3.1",
    sectionIndex: 2,
    text: "Registramos de forma sistematica los datos de cada venta (que se vendio, cuanto, a quien, cuando, medio de pago).",
  },
  {
    id: "P3.2",
    sectionIndex: 2,
    text: "Mantenemos una base de datos de clientes actualizada con informacion de contacto, historial de compras o preferencias.",
  },
  {
    id: "P3.3",
    sectionIndex: 2,
    text: "Nuestros datos estan organizados de forma consistente (mismos formatos, sin duplicados excesivos, clasificados) y podemos encontrar informacion facilmente cuando la necesitamos.",
  },
  {
    id: "P3.4",
    sectionIndex: 2,
    text: "Contamos con un historial de datos de al menos 6 meses que nos permite identificar tendencias (que meses se vende mas, que productos son los mas populares, etc.).",
  },
  {
    id: "P3.5",
    sectionIndex: 2,
    text: "Generamos reportes periodicos (semanal o mensual) sobre el desempeno del negocio (ventas, gastos, rentabilidad, clientes).",
  },
  {
    id: "P3.6",
    sectionIndex: 2,
    text: "Usamos los datos y reportes para tomar decisiones concretas del negocio (que comprar, a que precio vender, donde invertir, que promocion lanzar).",
  },
  {
    id: "P3.7",
    sectionIndex: 2,
    text: "Registramos y analizamos datos sobre la satisfaccion de nuestros clientes (encuestas, resenas, quejas, sugerencias).",
  },
  {
    id: "P3.8",
    sectionIndex: 2,
    text: "Tenemos claras politicas sobre quien puede acceder a los datos del negocio y como se respalda la informacion para evitar perdidas.",
  },

  // ========== SECCION 4: Conocimiento y Habilidades Digitales del Equipo ==========
  {
    id: "P4.1",
    sectionIndex: 3,
    text: "Las personas en mi empresa manejan con comodidad herramientas basicas como correo electronico, hojas de calculo (Excel/Google Sheets), procesadores de texto y aplicaciones de celular.",
  },
  {
    id: "P4.2",
    sectionIndex: 3,
    text: "Las personas en mi empresa pueden usar herramientas de comunicacion y colaboracion digital (Zoom, Google Meet, WhatsApp Business, Slack, Trello).",
  },
  {
    id: "P4.3",
    sectionIndex: 3,
    text: "Las personas en mi empresa pueden aprender a usar una herramienta digital nueva de forma autonoma (con tutoriales, videos de YouTube o guias en linea).",
  },
  {
    id: "P4.4",
    sectionIndex: 3,
    text: "Alguien en mi empresa (puede ser yo) ha utilizado alguna herramienta de IA como ChatGPT, Gemini, Copilot, DALL-E, Midjourney, o asistentes de voz inteligentes para algun proposito.",
  },
  {
    id: "P4.5",
    sectionIndex: 3,
    text: "En los ultimos 12 meses, alguien del equipo ha participado en algun curso, taller o capacitacion sobre herramientas digitales, redes sociales, o tecnologia aplicada al negocio.",
  },
  {
    id: "P4.6",
    sectionIndex: 3,
    text: "Podemos explicar en terminos simples que es la inteligencia artificial y dar al menos dos ejemplos de como se usa en los negocios.",
  },
  {
    id: "P4.7",
    sectionIndex: 3,
    text: "Tenemos identificada una persona dentro de la empresa (o un asesor externo) que lidera o puede liderar la adopcion de nuevas herramientas tecnologicas.",
  },

  // ========== SECCION 5: Uso Actual de Inteligencia Artificial ==========
  {
    id: "P5.1",
    sectionIndex: 4,
    text: "Uso de IA para generacion de contenido (textos para redes sociales, correos, descripciones de productos, propuestas comerciales).",
  },
  {
    id: "P5.2",
    sectionIndex: 4,
    text: "Uso de IA para atencion al cliente (chatbots, respuestas automaticas, clasificacion de consultas).",
  },
  {
    id: "P5.3",
    sectionIndex: 4,
    text: "Uso de IA para analisis de datos y reportes (analizar ventas, detectar patrones, generar graficos o resumenes).",
  },
  {
    id: "P5.4",
    sectionIndex: 4,
    text: "Uso de IA para marketing y ventas (segmentacion de clientes, publicidad dirigida, recomendaciones de productos, prediccion de demanda).",
  },
  {
    id: "P5.5",
    sectionIndex: 4,
    text: "Uso de IA para operaciones internas (automatizacion de tareas repetitivas, gestion de inventario inteligente, optimizacion de rutas, programacion de horarios).",
  },
  {
    id: "P5.6",
    sectionIndex: 4,
    text: "Uso de IA para gestion financiera y contable (categorizacion de gastos, proyecciones de flujo de caja, deteccion de anomalias, preparacion de reportes).",
  },
  {
    id: "P5.7",
    sectionIndex: 4,
    text: "Uso de IA para diseno e imagen (creacion de logos, imagenes para redes, edicion de fotos, generacion de material grafico).",
  },
  {
    id: "P5.8",
    sectionIndex: 4,
    text: "Uso de IA para traduccion y comunicacion multilingue (traducir documentos, comunicarse con clientes en otros idiomas).",
  },

  // ========== SECCION 6: Cultura Organizacional, Innovacion y Disposicion al Cambio ==========
  {
    id: "P6.1",
    sectionIndex: 5,
    text: "Estoy convencido/a de que la tecnologia y la inteligencia artificial pueden ayudar a mejorar mi negocio de forma concreta y medible.",
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
    text: "Los empleados de mi empresa (si los tengo) muestran interes y disposicion positiva para aprender a usar nuevas herramientas tecnologicas.",
  },
  {
    id: "P6.6",
    sectionIndex: 5,
    text: "Participo en alguna red empresarial, gremio, camara de comercio, o programa de apoyo donde intercambio experiencias con otros empresarios.",
  },
  {
    id: "P6.7",
    sectionIndex: 5,
    text: "He visto que mis competidores o negocios similares estan usando herramientas digitales o de IA, y siento que necesito ponerme al dia.",
  },

  // ========== SECCION 7: Recursos Financieros y Disposicion de Inversion ==========
  {
    id: "P7.1",
    sectionIndex: 6,
    text: "Actualmente pago por al menos un servicio digital para el negocio (internet comercial, hosting web, suscripcion a software, publicidad en redes, plataforma de pago electronico).",
  },
  {
    id: "P7.2",
    sectionIndex: 6,
    text: "Tengo un presupuesto definido (aunque sea pequeno) que destino especificamente a tecnologia y herramientas digitales para el negocio.",
  },
  {
    id: "P7.3",
    sectionIndex: 6,
    text: "Podria destinar entre RD$1,000 y RD$5,000 mensuales (aprox. $20-$85 USD) a una herramienta tecnologica si me demuestra que mejora mi negocio.",
  },
  {
    id: "P7.4",
    sectionIndex: 6,
    text: "Conozco y/o he accedido a programas de financiamiento, subsidios o apoyos del gobierno, banca o cooperacion internacional para que MiPyMEs inviertan en tecnologia.",
  },
  {
    id: "P7.5",
    sectionIndex: 6,
    text: "Cuando he invertido en tecnologia o herramientas digitales anteriormente, he podido medir si la inversion valio la pena (mas ventas, menos tiempo, menos costos).",
  },
  {
    id: "P7.6",
    sectionIndex: 6,
    text: "Estaria dispuesto/a a invertir tiempo (capacitarme, asistir a talleres, ver tutoriales) para aprender a usar herramientas de IA, aun si las herramientas fueran gratuitas.",
  },

  // ========== SECCION 8: Identificacion de Oportunidades y Vision Estrategica ==========
  {
    id: "P8.1",
    sectionIndex: 7,
    text: "Puedo identificar al menos 3 tareas repetitivas en mi negocio que consumen mucho tiempo y que podrian hacerse de forma mas rapida o eficiente con tecnologia.",
  },
  {
    id: "P8.2",
    sectionIndex: 7,
    text: "Se cuales son los principales 'cuellos de botella' o problemas de eficiencia en mi negocio que la tecnologia podria ayudar a resolver.",
  },
  {
    id: "P8.3",
    sectionIndex: 7,
    text: "He pensado concretamente en como la inteligencia artificial podria aplicarse en mi negocio (no en general, sino en MI negocio especifico).",
  },
  {
    id: "P8.4",
    sectionIndex: 7,
    text: "Me beneficiaria poder predecir con mayor precision la demanda de mis productos/servicios, gestionar mejor el inventario, o anticipar temporadas altas y bajas.",
  },
  {
    id: "P8.5",
    sectionIndex: 7,
    text: "Mi negocio genera o necesita generar contenido regularmente (publicaciones para redes, correos a clientes, descripciones de productos, propuestas) y me gustaria hacerlo de forma mas rapida.",
  },
  {
    id: "P8.6",
    sectionIndex: 7,
    text: "Mi negocio recibe un volumen de interacciones con clientes (consultas, pedidos, quejas) que a veces es dificil atender a tiempo y con calidad.",
  },
  {
    id: "P8.7",
    sectionIndex: 7,
    text: "Tengo una vision clara de como quiero que mi negocio se vea en 2-3 anos en terminos de uso de tecnologia e inteligencia artificial.",
  },

  // ========== SECCION 9: Gobernanza, Etica y Confianza en IA ==========
  {
    id: "P9.1",
    sectionIndex: 8,
    text: "Me preocupa la privacidad y proteccion de los datos de mis clientes cuando uso herramientas digitales o de IA, y tomo medidas para protegerlos.",
  },
  {
    id: "P9.2",
    sectionIndex: 8,
    text: "Cuando uso herramientas de IA (como ChatGPT), tengo cuidado de no compartir informacion confidencial del negocio o datos personales de clientes.",
  },
  {
    id: "P9.3",
    sectionIndex: 8,
    text: "Verifico y reviso el contenido generado por IA antes de usarlo (publicarlo, enviarlo a clientes, tomar decisiones basadas en el).",
  },
  {
    id: "P9.4",
    sectionIndex: 8,
    text: "Conozco (al menos a nivel basico) las regulaciones sobre proteccion de datos personales que aplican en Republica Dominicana (Ley 172-13).",
  },
  {
    id: "P9.5",
    sectionIndex: 8,
    text: "Entiendo que la IA puede generar informacion incorrecta o sesgada, y se que no debo confiar ciegamente en sus resultados sin verificar.",
  },
];

export function getQuestionsBySection(sectionIndex: number): Question[] {
  return QUESTIONS.filter((q) => q.sectionIndex === sectionIndex);
}
