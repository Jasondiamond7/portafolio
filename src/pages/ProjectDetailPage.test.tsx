import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { projects } from '@/content/projects'
import { renderRoute } from '@/test/router'

describe('ProjectDetailPage', () => {
  it('renders the resolved project content and narrative sections for a known slug', () => {
    const project = projects[0]
    renderRoute(`/projects/${project.slug}`)

    expect(screen.getByRole('heading', { level: 1, name: project.title })).toBeInTheDocument()
    for (const paragraph of project.narrative ?? []) {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    }
    for (const step of project.methodology ?? []) {
      expect(screen.getByText(step.title)).toBeInTheDocument()
    }
    for (const note of project.technicalNotes ?? []) {
      expect(screen.getByText(note)).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: /volver a proyectos/i })).toHaveAttribute(
      'href',
      '/#projects',
    )
  })

  it('renders the NotFoundPage for an unknown slug', () => {
    renderRoute('/projects/does-not-exist')

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
  })
})
