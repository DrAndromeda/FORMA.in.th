#!/usr/bin/env bash
# One-time setup: labels, the Project (v2) board, and its custom fields.
# Safe to re-run — every step checks for the existing thing before creating it.
#
# Usage: scripts/github-bootstrap.sh

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
source scripts/lib/common.sh

require_gh

log "Creating labels (idempotent — safe to re-run)…"

create_label() { gh label create "$1" --color "$2" --description "$3" --force; }

create_label "type: epic" "5319E7" "A body of work spanning multiple tasks"
create_label "type: task" "0052CC" "A single, actionable unit of work"
create_label "type: bug"  "D73A4A" "Something is broken"

create_label "priority: P0" "B60205" "Must happen — blocking or critical"
create_label "priority: P1" "D93F0B" "Should happen soon"
create_label "priority: P2" "FBCA04" "Nice to have / not urgent"

# This project has a real numbered roadmap (proposal.md's ROADMAP section,
# 10 phases from brand shell through launch checklist) — see docs/epics/README.md.
for phase in 1 2 3 4 5 6 7 8 9 10; do
  create_label "phase: ${phase}" "BFD4F2" "Roadmap phase ${phase}"
done

log "Labels done."

log "Looking for an existing \"$PROJECT_TITLE\" project for $PROJECT_OWNER…"
NUM="$(project_number)"

if [[ -z "$NUM" ]]; then
  log "Not found — creating it…"
  NUM="$(gh project create --owner "$PROJECT_OWNER" --title "$PROJECT_TITLE" --format json --jq '.number')"
  log "Created project #$NUM."
else
  log "Found existing project #$NUM — reusing it."
fi

log "Linking project #$NUM to this repository…"
if gh project link "$NUM" --owner "$PROJECT_OWNER" >/dev/null 2>&1; then
  log "Linked."
else
  warn "Link failed or already linked — continuing."
fi

log "Checking existing custom fields on project #$NUM…"
EXISTING_FIELDS="$(gh project field-list "$NUM" --owner "$PROJECT_OWNER" --format json --jq '.fields[].name' || true)"

if grep -qx "Priority" <<<"$EXISTING_FIELDS"; then
  log "Priority field already exists — skipping."
else
  log "Creating Priority field (P0/P1/P2)…"
  gh project field-create "$NUM" --owner "$PROJECT_OWNER" --name "Priority" \
    --data-type SINGLE_SELECT --single-select-options "P0,P1,P2" >/dev/null
fi

if grep -qx "Phase" <<<"$EXISTING_FIELDS"; then
  log "Phase field already exists — skipping."
else
  log "Creating Phase field (Phase 1..10, per proposal.md's ROADMAP)…"
  PHASE_OPTIONS="Phase 1,Phase 2,Phase 3,Phase 4,Phase 5,Phase 6,Phase 7,Phase 8,Phase 9,Phase 10"
  gh project field-create "$NUM" --owner "$PROJECT_OWNER" --name "Phase" \
    --data-type SINGLE_SELECT --single-select-options "$PHASE_OPTIONS" >/dev/null
fi

# Deliberately NOT attempting to delete/recreate the built-in "Status" field —
# `gh project field-delete` refuses with "Only custom fields can be deleted."
# Its default options (Todo/In Progress/Done) must be renamed by hand, once.

cat >&2 <<EOF

──────────────────────────────────────────────────────────────────────────
Bootstrap done. Project #$NUM ("$PROJECT_TITLE") is set up with labels and
the Priority/Phase fields. Three things only a human can do, one time, in
the GitHub UI:

  1. Rename the built-in "Status" field's options to match docs/WORKFLOW.md:
     Backlog, Ready, In Progress, In Test, Done.
     (Project board → Status column header → ⋯ → Edit field)

  2. Set up board automation, ideally via the Project's own Workflows tab
     first (Project → ⋯ → Workflows): "Item added → Backlog",
     "Pull request opened, linked → In Test", "Issue closed / PR merged →
     Done". If this repo's Projects UI doesn't offer a "Pull request
     opened" trigger, use the guaranteed alternative instead: the
     .github/workflows/project-status-sync.yml workflow already in this
     repo, which needs a PROJECT_TOKEN secret (a classic PAT with
     repo + project scopes — the default GITHUB_TOKEN can't write to
     Projects v2). Add it under Repo → Settings → Secrets and variables →
     Actions.

  3. Turn on branch protection requiring the CI workflow to pass before
     merge (Repo → Settings → Branches → Branch protection rules).

See docs/WORKFLOW.md for the full reference and docs/HowTo.md for the
day-to-day commands.
──────────────────────────────────────────────────────────────────────────
EOF
