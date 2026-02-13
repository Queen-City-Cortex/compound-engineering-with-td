---
name: td
description: Use td as the single task and issue tracking system. Create, triage, prioritize, and complete work in td.
disable-model-invocation: true
---

# td Task Tracking Skill

Use `td` for all task tracking.

## Workflow

1. Ensure project is initialized:
   - `td init` (only if not initialized yet)
2. Create issues from findings:
   - `td new --type task --priority P1 --title "..." --description "..."`
3. Review and prioritize:
   - `td list --status open`
   - `td list --priority P1 --status open`
4. Set dependencies:
   - `td dep add <issue> <depends-on-issue>`
   - `td dep <issue>`
5. Start work:
   - `td start <issue-id>`
6. Track progress:
   - `td log <issue-id> "what changed"`
   - `td comment <issue-id> "notes for reviewers"`
7. Submit and close:
   - `td review <issue-id>`
   - `td approve <issue-id>` (when separate reviewer flow is used)
   - `td close <issue-id>` (when direct close is appropriate)

## Triage

For each finding:

1. Map severity to priority:
   - Critical -> `P1`
   - Important -> `P2`
   - Nice-to-have -> `P3`
2. Either:
   - create/update an issue in `td`, or
   - skip and document reason in session output
3. If approved for work now, keep it `open` and start it with `td start`.

## Parallel Resolution

1. Query candidate issues:
   - `td list --status open --priority P1`
2. Group by dependency:
   - foundational issues first
   - independent issues in parallel
3. Run parallel agents for independent issues.
4. Each agent updates status/logs through `td` only.

## Query Patterns

- Ready queue: `td ready`
- Highest priority next issue: `td next`
- Blocked issues: `td blocked`
- Issues in review: `td in-review`
- Detailed context: `td show <issue-id>`

## Rule

`td` is the source of truth for tasks. Do not use file-based todo files.
