import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/Badge'
import { skills } from '@/content/skills'
import type { SkillCategory } from '@/content/types'
import { SkillsRadar } from './SkillsRadar'

const categoryOrder: SkillCategory[] = ['Languages', 'ML/DL', 'Data', 'MLOps', 'Visualization']

export function SkillsSection() {
  return (
    <Section
      id="skills"
      title="Skills"
      description="The tools I reach for across the model lifecycle."
      className="bg-slate-50 dark:bg-slate-900/40"
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <SkillsRadar />
        <div className="space-y-6">
          {categoryOrder.map((category) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{category}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <Badge key={skill.name}>{skill.name}</Badge>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
