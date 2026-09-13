# Proposals

| Document | Status |
|---|---|
| [`proposal.md`](../proposal.md) (repo root) | Implemented (partially) — see `NOTES.md` for what's done vs. outstanding, and "History" below |

## History: why this used to be two files

For a period, this repo had both `proposal.md` and a second,
independently-growing `proposal(NEW2).md` — audit findings, a menu
restructure, pricing-table requirements, and three homepage-variant
requirements all landed in the second file rather than the first, so
`docs/epics/`/`docs/tasks/` (built from `proposal.md` alone) never saw them.

Both files have since been merged back into the single `proposal.md`, and
`proposal(NEW2).md` was deleted. The lesson, applied going forward (see
`docs/WORKFLOW.md` §1): **one proposal, one file.** If a brief adds to or
tightens an earlier one, edit `proposal.md` directly, or add a clearly
dated addendum section inside it — never start a second file for the same
brief.

`NOTES.md` → "Critical audit findings" documents the concrete, still-open
items that came out of the merged content (some already fixed — see that
section's own notes on what's been re-verified since).

## Adding a new proposal

Going forward, put new proposal/brief documents under
`docs/proposals/<slug>.md` (this directory already exists, currently empty)
— **don't** move `proposal.md` itself; it stays at the repo root as-is, just
noted in the table above.

Add a row to the table when you add a file. "Status" is a one-line summary
you keep updated by hand (`Draft`, `Approved — not started`, `In progress`,
`Implemented`, `Superseded by ...`) — this table doesn't drive anything
automated, it's purely for a human scanning what's been proposed and where
it stands.
