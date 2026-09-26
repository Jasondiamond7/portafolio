export type SkillCategory =
  | 'Lenguajes y Frameworks'
  | 'Data Science'
  | 'Automatización y Testing'
  | 'Bases de Datos'
  | 'IA y Agentes'
  | 'Infraestructura y DevOps'

export type Skill = {
  name: string
  category: SkillCategory
}

export type ProjectMetric = {
  label: string
  value: number
  /** Optional unit shown after the value, e.g. "%", "ms". */
  unit?: string
}

export type ProjectMethodologyStep = {
  title: string
  detail: string
}

/**
 * Visual proof for a project: a demo/report video, or a static chart image
 * exported straight from a notebook. Renders only in the project's detail
 * page. Without a `coverImage`, the card thumbnail falls back to the first
 * entry here.
 */
export type ProjectMedia =
  | { type: 'video'; src: string; poster?: string; caption?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type Project = {
  slug: string
  title: string
  summary: string
  problem: string
  approach: string
  outcome: string
  tags: string[]
  metrics: ProjectMetric[]
  repoUrl?: string
  demoUrl?: string
  notebookUrl?: string
  /** Link to a written report (PDF) backing the project, when there's no repo to point to instead. */
  reportUrl?: string
  /** Shown as a highlighted badge when the project is backed by a formal credential, e.g. a diploma thesis. */
  credential?: string
  /** Designed cover thumbnail for the project card. Falls back to media[0] when omitted. */
  coverImage?: { src: string; alt: string }
  featured: boolean
  /** Long-form paragraphs for the detail page. Optional — omit to skip the section. */
  narrative?: string[]
  /** Ordered methodology steps shown on the detail page. Optional — omit to skip the section. */
  methodology?: ProjectMethodologyStep[]
  /** Bullet-style technical notes shown on the detail page. Optional — omit to skip the section. */
  technicalNotes?: string[]
  /** Video/image proof of the project. Optional — omit to skip the media section entirely. */
  media?: ProjectMedia[]
}

export type Certification = {
  name: string
  issuer: string
  year: number
  credentialUrl?: string
  /** Set when the certification hasn't been issued yet — shows "En curso" instead of a link. */
  inProgress?: boolean
}

export type WorkExperience = {
  company: string
  role: string
  startDate: string
  /** Use "Actualidad" for the current role. */
  endDate: string
  highlights: string[]
}

export type Profile = {
  name: string
  role: string
  tagline: string
  location: string
  email: string
  /** Full wa.me link, e.g. "https://wa.me/56900000000". */
  whatsapp: string
  summary: string
  socials: { label: string; url: string }[]
  resumeUrl: string
}
