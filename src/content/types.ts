export type SkillCategory = 'Languages' | 'ML/DL' | 'Data' | 'MLOps' | 'Visualization'

export type Skill = {
  name: string
  category: SkillCategory
  /** Self-assessed proficiency, 0-100. Used by the skills radar chart. */
  level: number
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
  featured: boolean
  /** Long-form paragraphs for the detail page. Optional — omit to skip the section. */
  narrative?: string[]
  /** Ordered methodology steps shown on the detail page. Optional — omit to skip the section. */
  methodology?: ProjectMethodologyStep[]
  /** Bullet-style technical notes shown on the detail page. Optional — omit to skip the section. */
  technicalNotes?: string[]
}

export type Certification = {
  name: string
  issuer: string
  year: number
  credentialUrl?: string
}

export type Profile = {
  name: string
  role: string
  tagline: string
  location: string
  email: string
  summary: string
  socials: { label: string; url: string }[]
  resumeUrl: string
}
