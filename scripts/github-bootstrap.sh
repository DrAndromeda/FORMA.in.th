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

log "Looking for an existing \"$PROJECT_TITLE\" project for ${PROJECT_OWNER}…"
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

log "Checking existing custom fields on project #${NUM}…"
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

# The built-in "Status" field itself can't be deleted/recreated —
# `gh project field-delete` refuses with "Only custom fields can be deleted."
# Its OPTIONS can be replaced via the API, though (confirmed against the live
# API: `updateProjectV2Field`'s `singleSelectOptions` takes a full replacement
# set of {name, color, description} — it does NOT accept updating an existing
# option by its `optionId` to rename it in place, only wholesale replacement).
# That replacement discards any items' existing Status values, so this only
# runs automatically when the options are still exactly GitHub's fresh
# default (Todo/In Progress/Done) — i.e. provably nothing has been assigned
# to them yet. Anything else is left alone with a warning.
TARGET_STATUS_OPTIONS="Backlog,Ready,In Progress,In Test,Done"
DEFAULT_STATUS_OPTIONS="Todo,In Progress,Done"
STATUS_FIELD_ID="$(gh project field-list "$NUM" --owner "$PROJECT_OWNER" --format json --jq '.fields[] | select(.name=="Status") | .id')"
STATUS_OPTIONS="$(gh project field-list "$NUM" --owner "$PROJECT_OWNER" --format json --jq '[.fields[] | select(.name=="Status") | .options[].name] | join(",")')"

if [[ "$STATUS_OPTIONS" == "$TARGET_STATUS_OPTIONS" ]]; then
  log "Status field options already match (Backlog/Ready/In Progress/In Test/Done) — skipping."
elif [[ "$STATUS_OPTIONS" == "$DEFAULT_STATUS_OPTIONS" ]]; then
  log "Replacing Status field's default options with Backlog/Ready/In Progress/In Test/Done…"
  if gh api graphql -f query="
    mutation {
      updateProjectV2Field(input: {
        fieldId: \"$STATUS_FIELD_ID\"
        singleSelectOptions: [
          {name: \"Backlog\", color: GRAY, description: \"\"},
          {name: \"Ready\", color: BLUE, description: \"\"},
          {name: \"In Progress\", color: YELLOW, description: \"\"},
          {name: \"In Test\", color: ORANGE, description: \"\"},
          {name: \"Done\", color: GREEN, description: \"\"}
        ]
      }) {
        projectV2Field { ... on ProjectV2SingleSelectField { id } }
      }
    }" >/dev/null; then
    log "Status field options updated."
  else
    warn "Could not update Status field options automatically — rename them by hand (Project → Status column → ⋯ → Edit field): Backlog, Ready, In Progress, In Test, Done."
  fi
else
  warn "Status field options are neither the GitHub default nor the target set (found: $STATUS_OPTIONS) — leaving as-is rather than risk discarding existing item assignments. Rename by hand if you want: Backlog, Ready, In Progress, In Test, Done."
fi

cat >&2 <<EOF

──────────────────────────────────────────────────────────────────────────
Bootstrap done. Project #$NUM ("$PROJECT_TITLE") is set up with labels,
the Priority/Phase fields, and Status renamed to Backlog/Ready/In
Progress/In Test/Done. Two things only a human can do, one time, in the
GitHub UI:

  1. Set up board automation, ideally via the Project's own Workflows tab
     first (Project → ⋯ → Workflows): "Item added → Backlog",
     "Pull request opened, linked → In Test", "Issue closed / PR merged →
     Done". If this repo's Projects UI doesn't offer a "Pull request
     opened" trigger, use the guaranteed alternative instead: the
     .github/workflows/project-status-sync.yml workflow already in this
     repo, which needs a PROJECT_TOKEN secret (a classic PAT with
     repo + project scopes — the default GITHUB_TOKEN can't write to
     Projects v2). Add it under Repo → Settings → Secrets and variables →
     Actions.

  2. Turn on branch protection requiring the CI workflow to pass before
     merge (Repo → Settings → Branches → Branch protection rules).

See docs/WORKFLOW.md for the full reference and docs/HowTo.md for the
day-to-day commands.
──────────────────────────────────────────────────────────────────────────
EOF
