import type { Certification } from './types'

// Títulos y diplomados — credenciales formales, se muestran destacadas.
export const degrees: Certification[] = [
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
]

// Cursos y certificaciones complementarias — se muestran en formato compacto.
export const courses: Certification[] = [
  {
    name: 'What is Data Science?',
    issuer: 'IBM · Coursera',
    year: 2024,
    credentialUrl: 'https://coursera.org/verify/2UX23DAH577N',
  },
  {
    name: 'Tools for Data Science',
    issuer: 'IBM · Coursera',
    year: 2024,
    credentialUrl: 'https://coursera.org/verify/IGGWT9TG80YS',
  },
  {
    name: 'Data Science Methodology',
    issuer: 'IBM · Coursera',
    year: 2024,
    credentialUrl: 'https://coursera.org/verify/ZJGBBOCCEVIS',
  },
  {
    name: 'Python for Data Science, AI & Development',
    issuer: 'IBM · Coursera',
    year: 2025,
    credentialUrl: 'https://coursera.org/verify/6JLSPDR77HI2',
  },
  {
    name: 'Databases and SQL for Data Science with Python',
    issuer: 'IBM · Coursera',
    year: 2025,
    credentialUrl: 'https://coursera.org/verify/6DZSTOQRUN5Q',
  },
  {
    name: 'Generative AI: Prompt Engineering Basics',
    issuer: 'IBM · Coursera',
    year: 2026,
    credentialUrl: 'https://coursera.org/verify/9QZ4XV8L6T2Y',
  },
]
