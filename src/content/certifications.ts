import type { Certification } from './types'

// TODO: reemplaza con tus credenciales reales. Pon el diplomado primero.
export const certifications: Certification[] = [
  {
    name: 'Diplomado de Posgrado en Ciencia de Datos',
    issuer: 'Pontificia Universidad Católica de Chile',
    year: 2026,
    credentialUrl: 'https://example.com/credential',
  },
  {
    name: 'Especialización en Machine Learning',
    issuer: 'DeepLearning.AI / Coursera',
    year: 2024,
    credentialUrl: 'https://coursera.org/verify/tu-id',
  },
  {
    name: 'Certificación en Automatización de Pruebas (Playwright/Selenium)',
    issuer: 'Tu certificadora',
    year: 2024,
  },
]
