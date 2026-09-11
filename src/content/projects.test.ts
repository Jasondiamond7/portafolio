import { describe, expect, it } from 'vitest'
import { featuredProjects, findProject, projects } from './projects'

describe('projects content', () => {
  it('exposes only featured projects through featuredProjects', () => {
    expect(featuredProjects.length).toBeGreaterThan(0)
    expect(featuredProjects.every((project) => project.featured)).toBe(true)
  })

  it('finds a project by slug', () => {
    const slug = projects[0].slug
    expect(findProject(slug)?.slug).toBe(slug)
  })

  it('returns undefined for an unknown slug', () => {
    expect(findProject('does-not-exist')).toBeUndefined()
  })

  it('keeps slugs unique', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('populates narrative, methodology, and technicalNotes for every seed project', () => {
    for (const project of projects) {
      expect(Array.isArray(project.narrative)).toBe(true)
      expect(project.narrative!.length).toBeGreaterThan(0)
      expect(project.narrative!.every((paragraph) => typeof paragraph === 'string')).toBe(true)

      expect(Array.isArray(project.methodology)).toBe(true)
      expect(project.methodology!.length).toBeGreaterThan(0)
      expect(
        project.methodology!.every(
          (step) => typeof step.title === 'string' && typeof step.detail === 'string',
        ),
      ).toBe(true)

      expect(Array.isArray(project.technicalNotes)).toBe(true)
      expect(project.technicalNotes!.length).toBeGreaterThan(0)
      expect(project.technicalNotes!.every((note) => typeof note === 'string')).toBe(true)
    }
  })
})
