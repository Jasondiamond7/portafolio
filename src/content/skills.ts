import type { Skill } from './types'

// TODO: tune levels to your real proficiency.
export const skills: Skill[] = [
  { name: 'Python', category: 'Languages', level: 92 },
  { name: 'SQL', category: 'Languages', level: 85 },
  { name: 'R', category: 'Languages', level: 60 },
  { name: 'scikit-learn', category: 'ML/DL', level: 88 },
  { name: 'PyTorch', category: 'ML/DL', level: 78 },
  { name: 'XGBoost / LightGBM', category: 'ML/DL', level: 82 },
  { name: 'pandas / NumPy', category: 'Data', level: 90 },
  { name: 'Spark', category: 'Data', level: 55 },
  { name: 'dbt', category: 'Data', level: 58 },
  { name: 'MLflow', category: 'MLOps', level: 70 },
  { name: 'Docker', category: 'MLOps', level: 72 },
  { name: 'FastAPI', category: 'MLOps', level: 75 },
  { name: 'Matplotlib / Plotly', category: 'Visualization', level: 84 },
  { name: 'D3 / Recharts', category: 'Visualization', level: 68 },
]

/** Aggregate mean level per category, for the radar chart. */
export function skillRadarData(source: Skill[] = skills) {
  const groups = new Map<string, number[]>()
  for (const skill of source) {
    const bucket = groups.get(skill.category) ?? []
    bucket.push(skill.level)
    groups.set(skill.category, bucket)
  }
  return [...groups.entries()].map(([category, levels]) => ({
    category,
    level: Math.round(levels.reduce((sum, n) => sum + n, 0) / levels.length),
  }))
}
