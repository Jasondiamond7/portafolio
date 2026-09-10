import { Section } from '@/components/layout/Section'
import { projects } from '@/content/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      title="Projects"
      description="Case studies framed as problem, approach and measurable outcome."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  )
}
