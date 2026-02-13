---
name: triage
description: Triage findings into td issues
argument-hint: "[findings list or source type]"
disable-model-invocation: true
---

# Triage Findings into td

First set `/model` to Haiku.

Present findings one by one and decide whether to track each item in `td`.

IMPORTANT: do not implement code during triage.

## Workflow

### 1. Present each finding

Use this template:

---
Issue #X: [brief title]

Severity: P1 / P2 / P3
Category: [security/performance/architecture/bug/feature]
Location: [file:line]
Description: [what is wrong]
Proposed fix: [short plan]
Estimated effort: [small/medium/large]
---

Add this to `td`?
1. yes - create or update td issue
2. next - skip
3. custom - revise and re-review

### 2. User decision handling

When user says `yes`:

1. Create issue in `td`:
   - `td new --type task --priority P1 --title "..." --description "..."`
2. Add labels/tags if available:
   - `td update <issue-id> --labels "code-review,security"`
3. If it is immediately actionable, keep status `open` and optionally run:
   - `td start <issue-id>`
4. Confirm with issue ID.

When user says `next`:

1. Do not create an issue.
2. Record skip reason in summary.

When user says `custom`:

1. Ask what to adjust.
2. Re-present revised finding.
3. Ask again (`yes/next/custom`).

### 3. Continue through all findings

- Process sequentially.
- Keep results visible with issue IDs and decisions.

### 4. Final summary

Summarize:

- Total findings
- Created/updated td issues
- Skipped findings and reasons

Then recommend:

1. `td list --status open`
2. `/resolve_todo_parallel` to work approved issues in parallel
