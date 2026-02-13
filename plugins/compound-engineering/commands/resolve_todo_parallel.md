---
name: resolve_todo_parallel
description: Resolve td issues in parallel
argument-hint: "[optional: specific td issue ID or filter]"
---

Resolve queued `td` issues using parallel processing.

## Workflow

### 1. Analyze

Gather unresolved issues from `td`:

- `td list --status open`
- `td list --status blocked`
- Filter by argument when provided (ID, priority, or text)

If an issue recommends deleting, removing, or gitignoring files in `docs/plans/` or `docs/solutions/`, skip it and close with a note because those are protected artifacts.

### 2. Plan

Build an execution plan from `td` data:

- identify dependencies (`td dep <issue-id>`)
- run prerequisites first
- run independent issues in parallel

Output a mermaid flow diagram that shows dependency order and parallel lanes.

### 3. Implement (PARALLEL)

For each ready independent issue, spawn a parallel resolver:

1. `Task pr-comment-resolver(td-issue-1 details)`
2. `Task pr-comment-resolver(td-issue-2 details)`
3. `Task pr-comment-resolver(td-issue-3 details)`

Each resolver must:

- `td start <issue-id>` when beginning
- implement and test the fix
- `td review <issue-id>` or `td close <issue-id>` with notes

### 4. Commit and close

- Commit code changes with clear messages.
- Push to remote.
- Ensure all resolved issues are no longer open:
  - `td list --status open`

If work remains, repeat from step 1.
