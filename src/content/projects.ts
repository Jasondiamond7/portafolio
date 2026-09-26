import type { Project } from './types'

// Proyectos reales. Mantén la estructura problema/enfoque/resultado — se lee rápido.
export const projects: Project[] = [
  {
    slug: 'framework-pruebas-ia',
    title: 'Framework de Automatización E2E con Playwright, BDD y generación de tests desde Jira',
    summary:
      'Suite E2E en Playwright + TypeScript con reportes visuales en Allure (video de cada corrida incluido) y un generador que lee tarjetas de Jira y arma automáticamente los escenarios en Gherkin/BDD.',
    problem:
      'Escribir y mantener casos de prueba a mano es lento, y la trazabilidad entre lo que pide una tarjeta ' +
      'de Jira y lo que realmente queda automatizado se pierde fácil: nadie sabe con certeza qué está cubierto.',
    approach:
      'Construí un framework E2E con Playwright y TypeScript sobre Page Object Model, con Allure como ' +
      'reportería (captura y video automático de cada paso) y una capa BDD con playwright-bdd para escribir ' +
      'los flujos en Gherkin. Lo conecté además a la API REST de Jira: el generador toma una tarjeta, lee los ' +
      'casos de prueba vinculados a ella y arma el archivo .feature junto con los stubs de step definitions, ' +
      'respetando los pasos Given/When/Then que ya vienen escritos en la tarjeta.',
    outcome:
      'El generador elimina el trabajo de transcribir a mano cada tarjeta a código, y el estado del ticket ' +
      'se actualiza solo al terminar la corrida — pasa al estado configurado si el test pasó, o se agrega un ' +
      'comentario con el detalle del error si falló — así el equipo ve en la propia tarjeta de Jira qué quedó cubierto.',
    tags: ['Playwright', 'Allure', 'BDD/Gherkin', 'Jira API', 'TypeScript', 'MCP'],
    metrics: [
      { label: 'Tests E2E automatizados', value: 51 },
      { label: 'Navegadores soportados', value: 3 },
    ],
    repoUrl: 'https://github.com/Jasondiamond7/playwrightproject',
    demoUrl: 'https://jasondiamond7.github.io/playwrightproject/',
    featured: true,
    media: [
      {
        type: 'image',
        src: '/images/projects/allure-report-demoqa.png',
        alt: 'Árbol de suites del reporte de Allure, organizadas por dominio (alerts, bookstore, elements, forms, widgets)',
        caption:
          'Suites del reporte de Allure organizadas por dominio. El reporte completo incluye video de cada corrida — link abajo para explorarlo interactivo.',
      },
    ],
    narrative: [
      'El framework nació como práctica personal sobre demoqa.com, pero está armado como si fuera un ' +
        'proyecto de equipo real: Page Objects, fixtures compartidas, reportes en Allure y una capa BDD en ' +
        'Gherkin para que cualquiera pueda leer un escenario sin saber TypeScript.',
      'Lo que más valor le agregó fue la integración con Jira: en vez de copiar a mano cada criterio de ' +
        'aceptación al código, el generador lee la tarjeta y arma el .feature y los stubs de steps respetando ' +
        'lo que el analista ya escribió. El MCP de Playwright ayuda a explorar la app y confirmar selectores ' +
        'durante el desarrollo; la consulta a Jira y la ejecución en CI usan la API REST porque es más estable y auditable.',
    ],
    methodology: [
      {
        title: 'Diseño del framework',
        detail:
          'Page Objects reutilizables por dominio (alerts, forms, widgets, bookstore) con una BasePage que centraliza helpers y toma screenshot automático en cada paso.',
      },
      {
        title: 'Capa BDD',
        detail:
          'playwright-bdd traduce archivos .feature en Gherkin a specs de Playwright sin tocar los tests tradicionales — ambas capas conviven en el mismo proyecto.',
      },
      {
        title: 'Generación desde Jira',
        detail:
          'Un script en TypeScript consulta la API REST de Jira, toma los casos de prueba vinculados a una tarjeta y genera el .feature más los stubs de step definitions, dejando los pasos manuales existentes intactos.',
      },
      {
        title: 'Reportería',
        detail:
          'Allure agrupa los resultados por Epic → Feature → Story, con video completo de cada corrida y clasificación automática de fallos (timeout, assertion, red).',
      },
    ],
    technicalNotes: [
      'Soporta ejecución en Chromium, Firefox y WebKit, además de corridas en la nube vía BrowserStack.',
      'Al terminar una corrida vinculada a una tarjeta de Jira (tag @PROJ-XXX), el estado del ticket se ' +
        'actualiza solo: pasa al estado configurado si el test pasó, o se agrega un comentario con el detalle si falló.',
      'La consulta a Jira y la ejecución en CI usan la API REST; el MCP de Playwright se usa solo en ' +
        'desarrollo, para explorar la app y confirmar selectores.',
    ],
  },
  {
    slug: 'modelo-rendimiento-kiwi-chimbarongo',
    title: 'Modelo Predictivo de Rendimiento y Punto de Equilibrio en un Huerto de Kiwi',
    credential: 'Tesis — Diplomado en Data Science UC',
    summary:
      'Panel de datos climáticos, satelitales y productivos de un huerto de kiwi Hayward en Chimbarongo, con EDA completo y diseño de un modelo predictivo de rendimiento y punto de equilibrio económico. Proyecto grupal del Diplomado en Data Science UC.',
    problem:
      'La planificación del huerto se apoyaba solo en promedios históricos: el rendimiento varió hasta un ' +
      '59% entre temporadas consecutivas sin cambios de manejo que lo explicaran, y el promedio por cuartel ' +
      'osciló entre 23 y 45 ton/ha, casi el doble entre unidades del mismo huerto. Los costos, además, se ' +
      'planifican en una carta Gantt anual que no se vincula al rendimiento esperado de cada cuartel.',
    approach:
      'Con mi equipo integramos cuatro fuentes reales del huerto: registros productivos por cuartel (2019–2026), ' +
      'series climáticas diarias de la estación INIA de Chimbarongo, una señal satelital normalizada de canopia ' +
      'por cuartel y la carta Gantt de costos de la temporada. Yo construí el pipeline de datos y el EDA completo ' +
      'en Python: reestructuré la planilla productiva a un panel cuartel-temporada, calculé horas de frío y ' +
      'grados-día (bases 7°C y 10°C) con métodos agrometeorológicos estándar al no venir precalculados, agregué ' +
      'la señal de canopia a nivel de temporada y crucé todo en un panel integrado de 112 filas siguiendo ' +
      'CRISP-DM, complementado con aseguramiento de calidad de CRISP-ML(Q).',
    outcome:
      'El EDA mostró que la canopia media de la temporada es la variable con mayor asociación al rendimiento ' +
      '(r = 0,67 sobre 77 observaciones), y que el punto de equilibrio actual —6,9 ton/ha— queda muy por debajo ' +
      'incluso del escenario pesimista histórico (21,9 ton/ha), lo que sugiere margen operativo bajo la ' +
      'estructura de costos actual. Esta es la Entrega N.°1 (negocio, datos, preparación y EDA); el modelo ' +
      'predictivo (Ridge/Random Forest/Gradient Boosting) se entrena y valida en la Entrega N.°2.',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'EDA', 'CRISP-DM'],
    metrics: [
      { label: 'Correlación canopia–rendimiento (r)', value: 0.67 },
      { label: 'Punto de equilibrio (ton/ha)', value: 6.9 },
    ],
    notebookUrl: '/images/projects/datascience/kiwi-chimbarongo-eda.ipynb',
    reportUrl: '/images/projects/datascience/informe-1-kiwi-chimbarongo.pdf',
    featured: true,
    coverImage: {
      src: '/images/projects/kiwi-cover.svg',
      alt: 'Diplomado en Data Science UC — Tesis: Rendimiento de Kiwi Hayward en Chimbarongo, con las cifras clave del EDA',
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/kiwi-canopia-rendimiento.png',
        alt: 'Gráfico de dispersión: canopia media de la temporada vs. rendimiento en ton/ha, coloreado por año de cosecha',
        caption:
          'Canopia media de temporada vs. rendimiento (r = 0,67, n = 77): la variable con mayor asociación al rendimiento en el EDA.',
      },
      {
        type: 'image',
        src: '/images/projects/kiwi-punto-equilibrio.png',
        alt: 'Gráfico de punto de equilibrio por hectárea con escenarios pesimista, intermedio y optimista de rendimiento',
        caption:
          'Punto de equilibrio (6,9 ton/ha) frente a los escenarios pesimista (21,9), intermedio (33,8) y optimista (47,0 ton/ha) del rendimiento histórico.',
      },
    ],
    narrative: [
      'El huerto venía planificando la temporada solo con el criterio del equipo técnico y promedios ' +
        'históricos, sin poder explicar por qué un mismo cuartel rendía 27 ton/ha una temporada y 43 la ' +
        'siguiente. Con mi equipo —cinco integrantes del Diplomado en Data Science UC, con perfiles de ' +
        'ingeniería agronómica, agroindustrial y contable— propusimos integrar clima, señal satelital y ' +
        'registros productivos para evaluar si esa variabilidad se puede explicar y anticipar.',
      'Como no había un registro fenológico en terreno, tuve que calcular horas de frío y grados-día desde ' +
        'cero a partir de temperaturas mínimas y máximas diarias, usando una curva horaria sinusoidal estándar ' +
        'en agrometeorología, validando los resultados contra las cifras del informe antes de usarlos en el panel integrado.',
    ],
    methodology: [
      {
        title: 'Entendimiento del negocio y de los datos (CRISP-DM)',
        detail:
          'Definimos 9 preguntas de negocio (descriptivas, diagnósticas, predictivas y prescriptivas) y verificamos calidad e integridad de las cuatro fuentes antes de construir nada.',
      },
      {
        title: 'Preparación de datos',
        detail:
          'Reestructuré la planilla productiva (formato ancho, bloques de 4 filas por cuartel) a un panel largo cuartel-temporada, y calculé horas de frío, GDD base 7°C/10°C y métricas de canopia (media, integral, anomalía) por temporada.',
      },
      {
        title: 'Aseguramiento de calidad (CRISP-ML(Q))',
        detail:
          'Cada fase define un riesgo y su mitigación: corte temporal explícito para evitar fuga de información, validación agrupada por cuartel para el futuro modelo, y monitoreo de error para recalibrar entre temporadas.',
      },
      {
        title: 'Análisis exploratorio y económico',
        detail:
          'Estadísticas descriptivas, distribución del rendimiento, matriz de correlaciones y un modelo de punto de equilibrio que separa costos fijos por hectárea de costos variables ligados al volumen cosechado.',
      },
    ],
    technicalNotes: [
      'Esta es la primera de dos entregas: cubre entendimiento del negocio/datos, preparación y EDA (CRISP-DM ' +
        'pasos 1–4). El modelo predictivo y su validación temporal se desarrollan en la Entrega N.°2.',
      'Panel de 112 filas (14 cuarteles × 8 temporadas 2019–2026): 77 con señal de canopia y 56 con clima invernal completo.',
      'Las horas de frío y los grados-día no venían precalculados en las fuentes originales: se calcularon con métodos agrometeorológicos estándar y se validaron contra las cifras del informe.',
    ],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
