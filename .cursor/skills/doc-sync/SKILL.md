---
name: doc-sync
description: >-
  Sync PetCircle documentation with recent code or product changes. Use when the
  user says "update docs" or asks to sync/update documentation.
---

# Doc Sync

Sync project documentation with recent code or product changes.

## Hard Rules

1. `Requirement.md` is canonical. Do not duplicate requirements in other docs.
2. Do not commit documentation files unless the user explicitly approves after reviewing the Doc review summary.
3. Default to separate commits for code and docs unless the user asks for a single commit after review.

## Workflow

1. Run `git status` and `git diff` to understand recent changes.
2. Read `docs/INDEX.md` and use its maintenance triggers to decide which docs apply.
3. Edit only the applicable docs, matching each file's existing tone and structure.
4. Skip docs that do not apply and explain why in the summary.
5. End with the Doc review summary below, then stop and wait for the user.

## Maintenance Triggers

Use the table in `docs/INDEX.md` as the source of truth. Common mappings:

| Event | Update |
|-------|--------|
| New requirement | `Requirement.md` |
| New domain rule | `docs/business-logic.md` |
| Architectural choice | New ADR in `docs/decisions/` |
| New task | `docs/backlog.md` |
| New phase | `docs/roadmap.md` |
| New term | `docs/glossary.md` |
| New standard | `docs/coding-principles.md` |
| New doc | `docs/INDEX.md` |
| AI workflow change | `AGENTS.md` |

## Doc Review Summary

End every doc sync with this block:

```markdown
## Doc review (please approve before commit)

**Triggered by:** [what was built or changed]

**Files changed:**
- [path] — [brief description]

**Skipped (and why):**
- [path or doc type] — [reason]

**Ready to commit docs?** Review the diffs above, then tell me to commit or request edits.
```

Do not commit after posting the summary. Wait for the user to approve, request edits, or leave the changes uncommitted.
