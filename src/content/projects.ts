import type { Project } from './types'

// Ejemplos de portafolio con tu stack real (Playwright, Selenium, Python, SQL, MCP,
// Docker, Digital Ocean, SSH). Los textos y métricas son ilustrativos — reemplázalos
// por tus proyectos y números reales cuando los tengas. Mantén la estructura
// problema/enfoque/resultado — se lee rápido.
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
    slug: 'proyecto-diplomado-data-science',
    title: 'Proyecto Final — Diplomado en Ciencia de Datos',
    // TODO: reemplaza summary/problem/approach/outcome con los de tu proyecto real de cierre.
    summary: 'TODO: resume en una línea qué predices o analizas y con qué datos.',
    problem:
      'TODO: describe el problema o pregunta de negocio que aborda tu proyecto de diplomado.',
    approach:
      'TODO: describe tu enfoque — el dataset usado, la limpieza/preprocesamiento aplicado y el o los modelos que entrenaste, y por qué los elegiste.',
    outcome:
      'TODO: reemplaza con el resultado real (tu métrica principal, ej. accuracy, R² o AUC, y qué significa en términos simples).',
    tags: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
    metrics: [
      { label: 'TODO: métrica principal (ej. Accuracy)', value: 0, unit: '%' },
      { label: 'TODO: métrica secundaria (ej. F1-score)', value: 0 },
    ],
    notebookUrl: 'https://nbviewer.org/github/tu-usuario/tu-repo/blob/main/notebook.ipynb',
    repoUrl: 'https://github.com/tu-usuario/proyecto-diplomado-data-science',
    featured: true,
    media: [
      {
        type: 'image',
        src: '/images/projects/ds-diplomado-chart-1.png',
        alt: 'TODO: describe este gráfico (ej. matriz de correlación entre variables)',
        caption: 'TODO: título del gráfico 1 (ej. "Matriz de correlación")',
      },
      {
        type: 'image',
        src: '/images/projects/ds-diplomado-chart-2.png',
        alt: 'TODO: describe este gráfico (ej. importancia de variables del modelo)',
        caption: 'TODO: título del gráfico 2 (ej. "Importancia de variables")',
      },
    ],
    narrative: [
      'TODO: cuenta el contexto del diplomado y por qué elegiste este dataset o problema en particular.',
      'TODO: cuenta qué fue lo más desafiante del proceso y qué aprendiste.',
    ],
    methodology: [
      {
        title: 'Exploración de datos (EDA)',
        detail:
          'TODO: describe el análisis exploratorio — qué patrones o problemas encontraste en los datos.',
      },
      {
        title: 'Preprocesamiento',
        detail: 'TODO: describe la limpieza, el feature engineering y el manejo de nulos/outliers.',
      },
      {
        title: 'Modelado y evaluación',
        detail:
          'TODO: describe qué modelos probaste, cómo los comparaste y por qué elegiste el final.',
      },
    ],
    technicalNotes: [
      'TODO: menciona el entorno usado (Jupyter, Google Colab, etc.) y las librerías clave.',
      'TODO: menciona cualquier limitación conocida del modelo o de los datos.',
    ],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
