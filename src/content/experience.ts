import type { WorkExperience } from './types'

// Orden cronológico inverso: el rol actual primero.
export const experience: WorkExperience[] = [
  {
    company: 'IMED',
    role: 'QA Automation Engineer',
    startDate: 'Octubre 2023',
    endDate: 'Actualidad',
    highlights: ['Automatización de pruebas end-to-end con Playwright y Selenium.'],
  },
  {
    company: 'Instituto de Previsión Social (IPS)',
    role: 'Automatizador QA & Operaciones',
    startDate: 'Noviembre 2021',
    endDate: 'Octubre 2023',
    highlights: [
      'Automatización de pruebas con Cypress.',
      'Operación de servidores en Digital Ocean, con administración vía SSH.',
      'Mantención de una plataforma web de inventarios en Python/Django, incluyendo control de usuarios.',
    ],
  },
  {
    company: 'Elipse.ai',
    role: 'Desarrollador Backend – IBM Watson (IA)',
    startDate: 'Febrero 2021',
    endDate: 'Julio 2021',
    highlights: [
      'Mantenedor de paneles administrativos de una red de salud con Framework Laravel.',
      'Creación de diálogos y sinónimos con IBM Watson para chatbot.',
      'Revisión de planillas de llamadas diarias e interacción con clientes.',
    ],
  },
  {
    company: 'Siaph SPA',
    role: 'Desarrollador Frontend',
    startDate: 'Marzo 2020',
    endDate: 'Noviembre 2020',
    highlights: [
      'Desarrollo de interfaces de plataformas web con JavaScript, usando la librería React JS.',
      'Diseño responsivo, optimización de sitios y estructura de plataformas.',
    ],
  },
  {
    company: 'Plasval Ltda.',
    role: 'Analista de Datos Operacionales (Access/Excel)',
    startDate: 'Marzo 2014',
    endDate: 'Febrero 2017',
    highlights: [
      'Levantamiento de datos cuantitativos de la empresa en las áreas de operación y recursos humanos.',
      'Horarios de trabajadores.',
      'Producción.',
      'Control de inventario.',
    ],
  },
]
