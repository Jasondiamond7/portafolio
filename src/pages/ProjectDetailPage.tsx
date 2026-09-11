import { useParams } from 'react-router-dom'
import { findProject } from '@/content/projects'
import { ProjectDetail } from '@/features/projects/ProjectDetail'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? findProject(slug) : undefined

  if (!project) return <NotFoundPage />

  return <ProjectDetail project={project} />
}
