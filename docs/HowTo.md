# How to — the day-to-day commands

The reference doc (`docs/WORKFLOW.md`) explains *why* this workflow looks
the way it does. This is *what to actually type*, in order.

## One-time setup

```bash
gh auth login                                  # if not already logged in
gh auth refresh -s project,read:project        # if `gh auth status` doesn't already list `project`
make board-setup                               # labels + board + Priority/Phase fields
```

Then do the three manual steps `board-setup` prints (rename Status's
options, wire up board automation, turn on branch protection) — see
`docs/WORKFLOW.md` §3–4 and §7.

## Turning a proposal into one epic + its tasks

This is a manual, human step — deciding how to break a brief into tasks is
a judgment call, not something a script does for you. **One proposal = one
epic** (see `docs/epics/README.md`) — don't create a second epic for the
same brief; add more tasks under the existing one instead.

1. Write `docs/epics/EPIC-XXX-<slug>.md` — one file for the whole proposal
   (template in `docs/epics/README.md`).
2. `make board-epics` — creates the epic issue if it doesn't already exist.
3. Write `docs/tasks/TASK-XXX-<slug>.md` files — one per substantial chunk
   of work, each large enough to be a real work session (template in
   `docs/tasks/README.md`). Most of a proposal's actual work should end up
   as task files, not ad-hoc issues.
4. `make board-tasks` — creates an issue for every task file that doesn't
   already have one, linked as a native sub-issue of the epic (safe to
   re-run after adding more task files).
5. `make board-sync-status` and `make board-sync-tasks` — corrects Status
   for the epic/any tasks whose files say they're already Done/Partial/etc.
   (step 2 and step 4 always start new issues at Backlog).

## Filing a smaller, ad-hoc task

For quick or one-off work that doesn't deserve a pre-written file (see
`docs/tasks/README.md`'s "ad-hoc-task exception"):

**Via the GitHub UI**: Issues → New issue → "Task" template. Fill in the
parent epic (if any), what needs doing, acceptance criteria, priority,
phase. Manually add it to the "FORMA Roadmap" project from the issue's
sidebar (the template alone doesn't do this — see the CLI option below if
you want that automatic).

**Via the CLI** (adds it to the board and sets Priority/Phase in one step):

```bash
make task-new TITLE="Fix breadcrumb duplication on service pages" EPIC=1 PRIORITY=P0
# or directly:
scripts/create-task.sh --title "..." --epic 1 --priority P1 --phase 7 --body "..."
```

`EPIC=` links it as a real GitHub sub-issue (not just a checklist
reference) — the epic issue will show it in its own sub-issues list.

## Starting a task

```bash
make task-start TASK=42
```

This creates and checks out a branch named `task/42-<slug>` (or `fix/42-...`
if the issue is labeled `type: bug`), linked to the issue, and moves its
board card to `In Progress`. Do this the moment you actually start working
on it, not when you file it — filing goes to Backlog/Ready, starting goes to
In Progress.

## Doing the work

Normal commit/push. Nothing here is special until you open the PR.

## Opening the PR

```bash
gh pr create --title "..." --body "Closes #42

<what changed, screenshots if visual, checklist>"
```

The **`Closes #42`** line (or `Fixes`/`Resolves`; use `Part of #42` instead
for partial work) is what:

- makes GitHub auto-close the issue when the PR merges, and
- lets `.github/workflows/project-status-sync.yml` find the linked issue and
  move its board card — to `In Test` when the PR opens, to `Done` when it
  merges.

`.github/PULL_REQUEST_TEMPLATE.md` pre-fills this structure for you.

## Merging

Merge as normal (once CI passes and branch protection is satisfied). The
board card moves to `Done` automatically via whichever of the two §4
mechanisms in `docs/WORKFLOW.md` is active.

## Correcting the board after editing an epic or task file

```bash
make board-sync-status   # epic
make board-sync-tasks    # tasks
```

## One-off: force every open issue's Status to a specific value

Rare — only for fixing a board that's genuinely out of sync (this is **not**
idempotent, it touches every open issue every time):

```bash
make board-backfill STATUS=Backlog
# or, to skip the confirmation prompt:
FORCE=1 scripts/backfill-status.sh Backlog
```

---

## Quick reference: the whole loop

```bash
# once
make board-setup

# once per proposal (manual: write the files first)
$EDITOR docs/epics/EPIC-001-my-proposal.md
make board-epics
$EDITOR docs/tasks/TASK-001-first-chunk-of-work.md   # repeat per task
make board-tasks
make board-sync-status
make board-sync-tasks

# per task, day to day
make task-start TASK=<n>
# ...do the work, commit, push...
gh pr create --title "..." --body "Closes #<n>

..."
# ...review, CI, merge...
```
