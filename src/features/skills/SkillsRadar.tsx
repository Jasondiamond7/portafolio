import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import { skillRadarData } from '@/content/skills'

export function SkillsRadar() {
  const data = skillRadarData()

  return (
    <div
      className="h-80 w-full"
      role="img"
      aria-label="Radar chart of average skill level per category"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="currentColor" className="text-slate-300 dark:text-slate-700" />
          <PolarAngleAxis dataKey="category" tick={{ fill: 'currentColor', fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 100]} tick={{ fill: 'currentColor', fontSize: 10 }} />
          <Radar
            name="Proficiency"
            dataKey="level"
            stroke="var(--color-primary)"
            fill="var(--color-primary)"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
