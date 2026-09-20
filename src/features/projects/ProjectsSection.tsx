import { Section } from '@/components/layout/Section'
import { projects } from '@/content/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      title="Proyectos"
      description="Casos de estudio en formato problema, enfoque y resultado medible."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  )
}
