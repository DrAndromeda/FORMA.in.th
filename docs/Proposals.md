# Proposals

Every brief we've built or are building against. **One proposal = one
epic** — see [`epics/README.md`](./epics/README.md) for how a proposal
becomes an epic (and its large tasks).

| Document | Status |
|---|---|
| [`proposal.md`](../proposal.md) | In progress — see `EPIC-001` and `NOTES.md` |

## History note

`proposal.md` used to be split across two files — this one, and a
`proposal(NEW2).md` that described itself as "Part 2: additional, stricter
requirements." They've been merged into this single file (Part 2's content
now lives under its own heading below Part 1's) so there's one
authoritative document, not two competing ones. A dated audit that had been
bundled into that second file (concrete bugs found on a live deployment,
not a spec change) was moved to `NOTES.md` → "Critical audit findings"
instead, since it's current status, not a requirement.

**Going forward: don't split a proposal into multiple files.** If a brief
needs to add to or tighten an already-proposed spec, edit `proposal.md`
directly (or add a dated addendum section within it) rather than creating
`proposal-v2.md` / `proposal(NEW).md` / etc. — that's exactly the mistake
being corrected above.

## Adding a new proposal

Put it under `docs/proposals/<slug>.md`, add a row to the table above, and
write its epic per `docs/epics/README.md`.
