import { describe, expect, it } from 'vitest'
import { skillRadarData } from './skills'
import type { Skill } from './types'

describe('skillRadarData', () => {
  it('averages levels per category and rounds to an integer', () => {
    const source: Skill[] = [
      { name: 'A', category: 'Languages', level: 80 },
      { name: 'B', category: 'Languages', level: 91 },
      { name: 'C', category: 'ML/DL', level: 70 },
    ]

    const result = skillRadarData(source)

    expect(result).toEqual([
      { category: 'Languages', level: 86 },
      { category: 'ML/DL', level: 70 },
    ])
  })

  it('returns one entry per distinct category in the default skill set', () => {
    const categories = new Set(skillRadarData().map((entry) => entry.category))
    expect(categories.size).toBe(skillRadarData().length)
  })
})
