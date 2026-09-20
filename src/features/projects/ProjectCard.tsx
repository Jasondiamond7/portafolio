import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { GitHubIcon } from '@/components/ui/icons'
import type { Project } from '@/content/types'

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const cover = project.media?.[0]

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
      className="flex flex-col overflow-hidden rounded-xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl dark:border-slate-800"
    >
      {cover ? (
        <Link
          to={`/projects/${project.slug}`}
          className="group relative block aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900"
        >
          <img
            src={cover.type === 'video' ? cover.poster : cover.src}
            alt={cover.type === 'video' ? project.title : cover.alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {cover.type === 'video' ? (
            <span className="absolute inset-0 flex items-center justify-center bg-slate-900/20 transition-colors duration-300 group-hover:bg-slate-900/30">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110 dark:bg-slate-950/90">
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-primary">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          ) : null}
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            <Link to={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Ver caso completo
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
              <path d="M7.5 4.5a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06L11.94 10 7.5 5.56a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </Link>
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Ver código en GitHub"
              className="text-slate-400 transition-colors hover:text-primary dark:text-slate-500"
            >
              <GitHubIcon className="h-5 w-5 fill-current" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
