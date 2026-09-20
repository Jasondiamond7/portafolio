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

  it('renders a compact teaser: summary, tags, a link to the full case, and the repo icon', () => {
    renderWithRouter(<ProjectCard project={fixture} />)

    expect(screen.getByText(fixture.summary)).toBeInTheDocument()
    expect(screen.getByText('Tag A')).toBeInTheDocument()
    expect(screen.getByText('Tag B')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver caso completo/i })).toHaveAttribute(
      'href',
      '/projects/test-project',
    )
    expect(screen.getByRole('link', { name: 'Ver código en GitHub' })).toHaveAttribute(
      'href',
      fixture.repoUrl,
    )

    // the full problem/approach/outcome breakdown now lives only on the detail page
    expect(screen.queryByText(fixture.problem)).not.toBeInTheDocument()
    expect(screen.queryByText(fixture.approach)).not.toBeInTheDocument()
    expect(screen.queryByText(fixture.outcome)).not.toBeInTheDocument()
  })
})
