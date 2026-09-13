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

## Turning a proposal into its one epic

One proposal = one epic — see `docs/epics/README.md` for why. Deciding
what goes in it is a manual, human step, not something a script does.

1. Write `docs/epics/EPIC-XXX-<slug>.md` (there should only be one for
   this proposal), following the template in `docs/epics/README.md`.
2. `make board-epics` — creates its GitHub Issue (safe to re-run — it's a
   no-op if the issue already exists).
3. `make board-sync-status` — corrects Status if the file says it's
   already in progress, since step 2 always starts a new issue at Backlog.

## Breaking the epic into large tasks

This is where the actual planning happens. Write one
`docs/tasks/TASK-XXX-<slug>.md` per substantial chunk of work — sized to a
real work session, not a five-minute step (see `docs/tasks/README.md`).

```bash
$EDITOR docs/tasks/TASK-011-my-large-task.md   # write it, using the template
make board-tasks                               # creates its issue, linked as
                                                # a sub-issue of the epic
make board-sync-tasks                          # corrects Status if it's not
                                                # starting from Backlog
```

## Filing a small, ad-hoc task (the exception)

For something genuinely too small to deserve a written file:

**Via the GitHub UI**: Issues → New issue → "Task" template. Fill in the
parent epic (if any), what needs doing, acceptance criteria, priority.
Manually add it to the "FORMA Roadmap" project from the issue's sidebar
(the template alone doesn't do this — see the CLI option below if you want
that automatic).

**Via the CLI** (adds it to the board and sets Priority/Phase in one step):

```bash
make task-new TITLE="Fix a typo in the footer" EPIC=1 PRIORITY=P2
# or directly:
scripts/create-task.sh --title "..." --epic 1 --priority P2 --body "..."
```

`EPIC=` links it as a real GitHub sub-issue of that epic (not just a
checklist reference) — the epic issue will show it in its own sub-issues
list. If you find yourself using this for most of your work instead of
the large-task path above, that's a sign tasks are being cut too small —
see `docs/tasks/README.md`.

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

## Correcting the board after editing an epic file

```bash
make board-sync-status
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
# once per repo
make board-setup

# once per proposal
$EDITOR docs/epics/EPIC-001-my-proposal.md
make board-epics
make board-sync-status

# per large task (most of the actual planning happens here)
$EDITOR docs/tasks/TASK-011-my-large-task.md
make board-tasks
make board-sync-tasks

# per task, large or small
make task-start TASK=<n>
# ...do the work, commit, push...
gh pr create --title "..." --body "Closes #<n>

..."
# ...review, CI, merge...
```
