import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/Badge'
import { skills } from '@/content/skills'
import type { SkillCategory } from '@/content/types'

const categoryOrder: SkillCategory[] = [
  'Lenguajes y Frameworks',
  'Data Science',
  'Automatización y Testing',
  'Bases de Datos',
  'IA y Agentes',
  'Infraestructura y DevOps',
]

export function SkillsSection() {
  return (
    <Section
      id="skills"
      title="Habilidades"
      description="Las herramientas que uso para conectar datos, automatización e IA."
      className="bg-slate-50 dark:bg-slate-900/40"
      background="neural"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryOrder.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
            className="rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60"
          >
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
              <h3 className="text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
                {category}
              </h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <Badge key={skill.name}>{skill.name}</Badge>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
