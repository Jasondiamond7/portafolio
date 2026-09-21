import type { Certification } from './types'

// TODO: reemplaza con tus credenciales reales. Pon el diplomado primero.
export const certifications: Certification[] = [
  {
    name: 'Diplomado de Posgrado en Ciencia de Datos',
    issuer: 'Pontificia Universidad Católica de Chile',
    year: 2026,
    inProgress: true,
  },
  {
    name: 'Título Universitario en Ingeniería en Informática',
    issuer: 'Duoc UC',
    year: 2020,
    credentialUrl: '/images/374645_Jaysson_Leon_Martinez.pdf',
  },
  {
    name: 'Certificación en Automatización de Pruebas (Playwright/Selenium)',
    issuer: 'Tu certificadora',
    year: 2024,
  },
]
