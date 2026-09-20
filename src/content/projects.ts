import type { Project } from './types'

// Ejemplos de portafolio con tu stack real (Playwright, Selenium, Python, SQL, MCP,
// Docker, Digital Ocean, SSH). Los textos y métricas son ilustrativos — reemplázalos
// por tus proyectos y números reales cuando los tengas. Mantén la estructura
// problema/enfoque/resultado — se lee rápido.
export const projects: Project[] = [
  {
    slug: 'framework-pruebas-ia',
    title: 'Framework de Automatización de Pruebas asistido por IA',
    summary:
      'Suite de pruebas end-to-end con Playwright y Selenium, potenciada con un agente de IA vía MCP que genera y mantiene casos de prueba automáticamente.',
    problem:
      'Los equipos de QA dedicaban demasiado tiempo a escribir y mantener casos de prueba manuales, con baja cobertura sobre los flujos más críticos del producto.',
    approach:
      'Diseñé un framework de pruebas E2E en Python con Playwright y Selenium, y lo conecté a un servidor MCP ' +
      'para que un agente de IA pudiera generar, priorizar y actualizar casos de prueba a partir de los flujos ' +
      'reales de la aplicación, en lugar de mantenerlos a mano.',
    outcome:
      'La cobertura de flujos críticos pasó de ser prácticamente inexistente a un 85%, y el tiempo dedicado ' +
      'a mantener pruebas rotas bajó cerca de un 30% al delegar esa tarea al agente.',
    tags: ['Playwright', 'Selenium', 'Python', 'MCP'],
    metrics: [
      { label: 'Cobertura de flujos críticos', value: 85, unit: '%' },
      { label: 'Reducción de mantenimiento', value: 30, unit: '%' },
    ],
    repoUrl: 'https://github.com/tu-usuario/framework-pruebas-ia',
    featured: true,
    media: [
      {
        type: 'video',
        src: '/videos/projects/allure-report-demo.mp4',
        poster: '/images/projects/allure-report-poster.jpg',
        caption:
          'TODO: describe qué se ve en el video (ej. corrida de la suite y recorrido por el reporte de Allure).',
      },
    ],
    narrative: [
      'El equipo de QA venía creciendo más rápido que su capacidad de escribir pruebas: cada release nuevo ' +
        'sumaba flujos sin cobertura y los casos existentes se volvían obsoletos apenas cambiaba la interfaz.',
      'En vez de sumar más gente escribiendo pruebas a mano, integré un agente de IA que consulta el estado ' +
        'real de la aplicación a través de un servidor MCP y propone, actualiza y prioriza los casos de prueba, ' +
        'dejando al equipo enfocado en revisar y validar en vez de escribir desde cero.',
    ],
    methodology: [
      {
        title: 'Diseño del framework',
        detail:
          'Page Objects reutilizables en Playwright y Selenium, con fixtures compartidas y ejecución en paralelo para mantener el feedback rápido.',
      },
      {
        title: 'Integración con MCP',
        detail:
          'Un servidor MCP expone los flujos de la aplicación y el historial de fallos como herramientas, para que el agente de IA decida qué casos generar o actualizar.',
      },
      {
        title: 'Despliegue',
        detail:
          'La suite corre en contenedores Docker dentro de un pipeline de CI, con los resultados publicados apenas termina cada corrida.',
      },
    ],
    technicalNotes: [
      'La suite completa corre en Docker sobre un droplet de Digital Ocean, administrado por SSH.',
      'Todo caso generado por el agente pasa por una revisión humana antes de entrar a la suite principal.',
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
