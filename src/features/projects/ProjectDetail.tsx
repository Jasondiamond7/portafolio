import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/layout/Container'
import type { Project } from '@/content/types'
import { ProjectMetricsChart } from './ProjectMetricsChart'

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <Container className="py-16 sm:py-24">
      <Link to="/#projects" className="text-sm text-brand-600 hover:underline dark:text-brand-300">
        ← Back to projects
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {project.title}
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <dl className="mt-8 space-y-4 text-sm">
        <div>
          <dt className="font-medium text-slate-900 dark:text-white">Problem</dt>
          <dd className="text-slate-600 dark:text-slate-400">{project.problem}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-900 dark:text-white">Approach</dt>
          <dd className="text-slate-600 dark:text-slate-400">{project.approach}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-900 dark:text-white">Outcome</dt>
          <dd className="text-slate-600 dark:text-slate-400">{project.outcome}</dd>
        </div>
      </dl>

      <div className="mt-8">
        <ProjectMetricsChart metrics={project.metrics} />
      </div>

      {project.narrative && project.narrative.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Narrative</h2>
          <div className="mt-3 space-y-3 text-slate-600 dark:text-slate-400">
            {project.narrative.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}

      {project.methodology && project.methodology.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Methodology</h2>
          <div className="mt-3 space-y-4">
            {project.methodology.map((step) => (
              <div key={step.title}>
                <h3 className="font-medium text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {project.technicalNotes && project.technicalNotes.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Technical Notes</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-400">
            {project.technicalNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </Container>
  )
}
