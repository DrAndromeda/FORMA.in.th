# Task files

With the one-epic-per-proposal model (see `../epics/README.md`), a task file
is where the actual work breakdown lives — **this is the normal case now,
not a rarity.** Each task should be **large**: a real work session's worth
of doing (e.g. "translate all 13 service pages to Russian," not "fix a
typo"), not a micro-step. If a proposal is big, expect its task list to be
long; that's fine — that's the point of breaking one epic into many tasks
instead of many epics.

## The ad-hoc-task exception

Small, quick, or one-off work doesn't need a committed file at all — use
`make task-new TITLE="..."` (optionally `EPIC=`/`PRIORITY=`/`PHASE=`/`BODY=`)
or the GitHub UI "Task" template directly. Reach for a `TASK-*.md` file
specifically when the work is substantial enough to deserve a written spec
*before* it exists as an issue — which, given this project's scale, is most
of the actual work.

## Format `scripts/create-task-issues.sh` parses

```markdown
# Task Title Here

**Priority:** P1
**Phase:** 7
**Status:** Not started

Free-form spec content from here down. This is what gets copied into the
created issue's body, plus a link back to this file and a note of which
epic it's a sub-issue of.
```

- **Line 1** (`# Title`) is **required** and is the exact-match key used for
  duplicate detection — `create-task-issues.sh` skips creating an issue if
  one already exists with the exact title `[TASK] <this title>`. Don't
  rename a task file's title after its issue exists, or you'll get a
  duplicate on the next run.
- **`**Priority:**`** is optional. Must be exactly `P0`, `P1`, or `P2`.
- **`**Phase:**`** is optional. Unlike epics (which no longer carry a Phase
  — see `../epics/README.md`), a task can carry one if the proposal has a
  numbered roadmap worth preserving as a reference (this repo's tasks map
  to `proposal.md`'s original 10-phase ROADMAP; see `docs/epics/EPIC-*.md`
  and `NOTES.md`). The first digit sequence found is used.
- **`**Status:**`** drives both the *initial* board status when
  `scripts/create-task-issues.sh` first creates the issue, and — if you
  edit it later — what `make board-sync-tasks` pushes onto the board.
  Written in plain English, mapped loosely: contains "not started" →
  Backlog; is (or contains) "Done" → Done; anything else ("Partial", "In
  progress", ...) → In Progress.
- Everything else is free-form — write the actual spec.

## Naming

`TASK-<NNN>-<slug>.md`, a sequential 3-digit number assigned when you write
the file (**before** the issue exists — unlike the ad-hoc-task exception,
where an issue is created directly with no file). This mirrors the epic
file convention one level down. There's no requirement to keep numbering
contiguous forever; if you delete/merge a task, don't renumber the rest.

## Turning a task file into an issue is still automatic — writing it isn't

`scripts/create-task-issues.sh` (`make board-tasks`) turns every
`TASK-*.md` file in this directory into a GitHub Issue, linked as a native
sub-issue of the repo's one epic (auto-detected, or pass `--epic <n>`
explicitly if there's ever more than one open epic). It does not write the
spec for you or decide how to break the proposal down — that's a human
judgment call, same as for epics.
