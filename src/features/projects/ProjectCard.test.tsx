import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Project } from '@/content/types'
import { renderWithRouter } from '@/test/router'
import { ProjectCard } from './ProjectCard'

const fixture: Project = {
  slug: 'test-project',
  title: 'Test Project Title',
  summary: 'A short summary.',
  problem: 'The problem statement.',
  approach: 'The approach taken.',
  outcome: 'The measured outcome.',
  tags: ['Tag A', 'Tag B'],
  metrics: [{ label: 'Accuracy', value: 90, unit: '%' }],
  repoUrl: 'https://example.com/repo',
  demoUrl: 'https://example.com/demo',
  notebookUrl: 'https://example.com/notebook',
  featured: true,
}

describe('ProjectCard', () => {
  it('wraps the title in a link to its detail route', () => {
    renderWithRouter(<ProjectCard project={fixture} />)

    const link = screen.getByRole('link', { name: fixture.title })
    expect(link).toHaveAttribute('href', '/projects/test-project')
  })

  it('still renders the existing footer links and problem/approach/outcome content', () => {
    renderWithRouter(<ProjectCard project={fixture} />)

    expect(screen.getByText(fixture.problem)).toBeInTheDocument()
    expect(screen.getByText(fixture.approach)).toBeInTheDocument()
    expect(screen.getByText(fixture.outcome)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Code' })).toHaveAttribute('href', fixture.repoUrl)
    expect(screen.getByRole('link', { name: 'Live demo' })).toHaveAttribute('href', fixture.demoUrl)
    expect(screen.getByRole('link', { name: 'Notebook' })).toHaveAttribute(
      'href',
      fixture.notebookUrl,
    )
  })
})
