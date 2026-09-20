import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Project } from '@/content/types'
import { renderWithRouter } from '@/test/router'
import { ProjectDetail } from './ProjectDetail'

const minimalFixture: Project = {
  slug: 'minimal-project',
  title: 'Minimal Project',
  summary: 'A minimal summary.',
  problem: 'The problem statement.',
  approach: 'The approach taken.',
  outcome: 'The measured outcome.',
  tags: ['Tag A'],
  metrics: [{ label: 'Accuracy', value: 90, unit: '%' }],
  featured: true,
  // narrative, methodology, technicalNotes intentionally omitted
}

const fullFixture: Project = {
  ...minimalFixture,
  slug: 'full-project',
  title: 'Full Project',
  narrative: ['First paragraph.', 'Second paragraph.'],
  methodology: [{ title: 'Step One', detail: 'Step one detail.' }],
  technicalNotes: ['Note one.', 'Note two.'],
}

describe('ProjectDetail', () => {
  it('renders the title and summary and omits optional sections when absent', () => {
    renderWithRouter(<ProjectDetail project={minimalFixture} />)

    expect(
      screen.getByRole('heading', { level: 1, name: minimalFixture.title }),
    ).toBeInTheDocument()
    expect(screen.getByText(minimalFixture.summary)).toBeInTheDocument()
    expect(screen.queryByText('Narrativa')).not.toBeInTheDocument()
    expect(screen.queryByText('Metodología')).not.toBeInTheDocument()
    expect(screen.queryByText('Notas técnicas')).not.toBeInTheDocument()
  })

  it('renders narrative, methodology, and technical notes when populated', () => {
    renderWithRouter(<ProjectDetail project={fullFixture} />)

    expect(screen.getByText('First paragraph.')).toBeInTheDocument()
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument()
    expect(screen.getByText('Step One')).toBeInTheDocument()
    expect(screen.getByText('Step one detail.')).toBeInTheDocument()
    expect(screen.getByText('Note one.')).toBeInTheDocument()
    expect(screen.getByText('Note two.')).toBeInTheDocument()
  })

  it('offers a back link to the homepage projects section', () => {
    renderWithRouter(<ProjectDetail project={minimalFixture} />)

    expect(screen.getByRole('link', { name: /volver a proyectos/i })).toHaveAttribute(
      'href',
      '/#projects',
    )
  })
})
