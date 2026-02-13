---
name: resolve_parallel
description: Resolve TODO and FIXME code comments using parallel processing
argument-hint: "[optional: specific TODO pattern or file]"
disable-model-invocation: true
---

Resolve inline `TODO` and `FIXME` comments using parallel processing.

## Workflow

### 1. Analyze

Find unresolved comment markers in the requested scope:

- `TODO`
- `FIXME`
- `HACK` (when present and actionable)

Collect file path, line number, and the note text for each item.

### 2. Plan

Group items into:

1. **Quick-fix now** (safe to implement immediately)
2. **Deferred** (needs broader design or product decision)

Build a dependency-aware plan for quick-fix items and output a mermaid flow diagram showing:

- serial prerequisites
- independent items that can run in parallel

### 3. Implement (PARALLEL)

Spawn a `pr-comment-resolver` agent for each independent quick-fix item in parallel.

If there are 3 independent items, run:

1. Task pr-comment-resolver(comment1)
2. Task pr-comment-resolver(comment2)
3. Task pr-comment-resolver(comment3)

Always run all in parallel subagents/Tasks for each issue item.

### 4. Commit & Resolve

- Commit changes
- Push to remote

### 5. Defer Remaining Items to td

For deferred items, create `td` issues so they are tracked:

- `td new --type task --priority P2 --title "..." --description "..."`

Then hand off deferred tracked work to:

- `/resolve_todo_parallel` for td issue execution
