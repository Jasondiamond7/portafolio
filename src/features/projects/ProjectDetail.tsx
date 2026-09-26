import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import type { Project } from '@/content/types'
import { ProjectMetricsChart } from './ProjectMetricsChart'

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <Container className="py-16 sm:py-24">
      <Link to="/#projects" className="block text-sm text-primary hover:underline">
        ← Volver a proyectos
      </Link>

      {project.credential ? (
        <span className="mt-4 block w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
          {project.credential}
        </span>
      ) : null}

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {project.title}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      {project.demoUrl || project.repoUrl || project.reportUrl || project.notebookUrl ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.demoUrl ? (
            <ButtonLink href={project.demoUrl} target="_blank" rel="noreferrer">
              Ver reporte interactivo ↗
            </ButtonLink>
          ) : null}
          {project.repoUrl ? (
            <ButtonLink href={project.repoUrl} target="_blank" rel="noreferrer" variant="secondary">
              Ver código en GitHub ↗
            </ButtonLink>
          ) : null}
          {project.reportUrl ? (
            <ButtonLink
              href={project.reportUrl}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              Ver informe completo (PDF) ↗
            </ButtonLink>
          ) : null}
          {project.notebookUrl ? (
            <ButtonLink
              href={project.notebookUrl}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              Descargar notebook (.ipynb) ↗
            </ButtonLink>
          ) : null}
        </div>
      ) : null}

      {project.media && project.media.length > 0 ? (
        <div className="mt-8 space-y-6">
          {project.media.map((item, index) =>
            item.type === 'video' ? (
              <figure key={index}>
                <video
                  controls
                  playsInline
                  poster={item.poster}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
                {item.caption ? (
                  <figcaption className="mt-2 text-sm text-text-secondary">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null,
          )}

          {project.media.some((item) => item.type === 'image') ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {project.media.map((item, index) =>
                item.type === 'image' ? (
                  <figure key={index}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800"
                    />
                    {item.caption ? (
                      <figcaption className="mt-2 text-sm text-text-secondary">
                        {item.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null,
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      <dl className="mt-8 space-y-4 text-base">
        <div>
          <dt className="text-xs font-semibold tracking-wide text-text-secondary uppercase">
            Problema
          </dt>
          <dd className="text-slate-600 dark:text-slate-400">{project.problem}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-wide text-text-secondary uppercase">
            Enfoque
          </dt>
          <dd className="text-slate-600 dark:text-slate-400">{project.approach}</dd>
        </div>
        <div className="border-l-2 border-primary pl-3">
          <dt className="text-xs font-semibold tracking-wide text-text-secondary uppercase">
            Resultado
          </dt>
          <dd className="text-slate-600 dark:text-slate-400">{project.outcome}</dd>
        </div>
      </dl>

      <div className="mt-8">
        <ProjectMetricsChart metrics={project.metrics} />
      </div>

      {project.narrative && project.narrative.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Narrativa</h2>
          <div className="mt-3 space-y-3 text-slate-600 dark:text-slate-400">
            {project.narrative.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}

      {project.methodology && project.methodology.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Metodología</h2>
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
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Notas técnicas</h2>
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
