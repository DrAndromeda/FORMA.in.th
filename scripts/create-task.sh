#!/usr/bin/env bash
# CLI equivalent of filing a [TASK] issue via the GitHub issue template.
#
# Usage:
#   scripts/create-task.sh --title "Translate villa-design to RU" \
#     [--epic 12] [--priority P1] [--phase 7] [--body "Longer description..."]
#
# --epic links the new issue as a native GitHub sub-issue of the given epic
# (via `gh issue create --parent`), not just a markdown checklist reference.

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
source scripts/lib/common.sh

TITLE=""
EPIC=""
PRIORITY=""
PHASE=""
BODY=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --title) TITLE="$2"; shift 2 ;;
    --epic) EPIC="$2"; shift 2 ;;
    --priority) PRIORITY="$2"; shift 2 ;;
    --phase) PHASE="$2"; shift 2 ;;
    --body) BODY="$2"; shift 2 ;;
    *) err "Unknown argument: $1"; exit 1 ;;
  esac
done

if [[ -z "$TITLE" ]]; then
  err "Usage: scripts/create-task.sh --title \"...\" [--epic N] [--priority P0|P1|P2] [--phase N] [--body \"...\"]"
  exit 1
fi

require_gh
NUM="$(require_project_number)"

BODY="${BODY:-_No additional description provided._}"
[[ -n "$EPIC" ]] && BODY="Parent epic: #$EPIC

$BODY"

args=(gh issue create --title "[TASK] $TITLE" --body "$BODY" --label "type: task" --project "$PROJECT_TITLE")
[[ -n "$EPIC" ]] && args+=(--parent "$EPIC")
[[ -n "$PRIORITY" ]] && args+=(--label "priority: $PRIORITY")
[[ -n "$PHASE" ]] && args+=(--label "phase: $PHASE")

url="$("${args[@]}")"
log "Created: $url"

set_field_value "$NUM" "$url" "Status" "Backlog"
[[ -n "$PRIORITY" ]] && set_field_value "$NUM" "$url" "Priority" "$PRIORITY"
[[ -n "$PHASE" ]] && set_field_value "$NUM" "$url" "Phase" "Phase $PHASE"
