# Skill Registry

**Project**: Proyecto-prueba
**Generated**: 2026-09-10
**Registry role**: index only — sub-agents receive exact paths and read the full `SKILL.md` source of truth.

## Scope

- User skills scanned: `~/.claude/skills/` (also mirrored at `~/.config/opencode/skills/` — deduplicated by name).
- Project skills scanned: `skills/`, `.claude/skills/`, `.opencode/skills/`, `.atl/skills/`, `.agent/skills/` — none present.
- Excluded per convention: `sdd-*`, `_shared`, `skill-registry`.

## Skills Index

| Skill                 | Triggers                                                                                                           | Scope | Path                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | ----- | ------------------------------------------------- |
| judgment-day          | judgment day, dual review, adversarial review, juzgar                                                              | user  | `~/.claude/skills/judgment-day/SKILL.md`          |
| go-testing            | Go tests, go test coverage, Bubbletea teatest, golden files                                                        | user  | `~/.claude/skills/go-testing/SKILL.md`            |
| gentle-ai-bench       | bench, journey, journeys, driven mode, journey corpus, j-numbers, bench axis                                       | user  | `~/.claude/skills/gentle-ai-bench/SKILL.md`       |
| skill-creator         | new skills, agent instructions, documenting AI usage patterns                                                      | user  | `~/.claude/skills/skill-creator/SKILL.md`         |
| skill-improver        | improve skills, audit skills, refactor skills, skill quality                                                       | user  | `~/.claude/skills/skill-improver/SKILL.md`        |
| branch-pr             | creating, opening, or preparing PRs for review                                                                     | user  | `~/.claude/skills/branch-pr/SKILL.md`             |
| issue-creation        | issue creation, bug reports, feature requests, issue approval                                                      | user  | `~/.claude/skills/issue-creation/SKILL.md`        |
| chained-pr            | PRs over 400 lines, stacked PRs, review slices                                                                     | user  | `~/.claude/skills/chained-pr/SKILL.md`            |
| cognitive-doc-design  | writing guides, READMEs, RFCs, onboarding, architecture, review-facing docs                                        | user  | `~/.claude/skills/cognitive-doc-design/SKILL.md`  |
| comment-writer        | PR feedback, issue replies, reviews, Slack messages, GitHub comments                                               | user  | `~/.claude/skills/comment-writer/SKILL.md`        |
| work-unit-commits     | implementation, commit splitting, chained PRs, keeping tests and docs with code                                    | user  | `~/.claude/skills/work-unit-commits/SKILL.md`     |
| rdd-defect-workflow   | RDD, receipt-driven development, review authority, receipt/lineage, correction/recovery, delivery gate/kill switch | user  | `~/.claude/skills/rdd-defect-workflow/SKILL.md`   |
| systemic-issue-triage | new issue, bug report, triage, backlog, issue flood, root cause, dead-end, blocked user                            | user  | `~/.claude/skills/systemic-issue-triage/SKILL.md` |

## SDD Phase Skills (orchestrator-managed, not matched by trigger)

`sdd-explore`, `sdd-research`, `sdd-propose`, `sdd-spec`, `sdd-design`, `sdd-tasks`, `sdd-apply`, `sdd-verify`, `sdd-archive`, `sdd-onboard` under `~/.claude/skills/`.

## Project Convention Files

None found. No root `README.md`, `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `GEMINI.md`, or `copilot-instructions.md` at the project root.
