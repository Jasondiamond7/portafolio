import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import type { Project } from '@/content/types'
import { ProjectMetricsChart } from './ProjectMetricsChart'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-5 rounded-xl border border-slate-200 p-6 dark:border-slate-800">
      <header>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{project.summary}</p>
      </header>

      <dl className="space-y-2 text-sm">
        <div>
          <dt className="text-xs font-semibold tracking-wide text-text-secondary uppercase">
            Problem
          </dt>
          <dd className="text-slate-600 dark:text-slate-400">{project.problem}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-wide text-text-secondary uppercase">
            Approach
          </dt>
          <dd className="text-slate-600 dark:text-slate-400">{project.approach}</dd>
        </div>
        <div className="border-l-2 border-primary pl-3">
          <dt className="text-xs font-semibold tracking-wide text-text-secondary uppercase">
            Outcome
          </dt>
          <dd className="text-slate-600 dark:text-slate-400">{project.outcome}</dd>
        </div>
      </dl>

      <ProjectMetricsChart metrics={project.metrics} />

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <footer className="flex flex-wrap gap-4 text-sm">
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            Code
          </a>
        ) : null}
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            Live demo
          </a>
        ) : null}
        {project.notebookUrl ? (
          <a
            href={project.notebookUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            Notebook
          </a>
        ) : null}
      </footer>
    </article>
  )
}
