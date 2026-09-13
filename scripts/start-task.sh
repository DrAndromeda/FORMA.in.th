#!/usr/bin/env bash
# Creates a linked branch for an issue, checks it out, and moves the board
# card to "In Progress". This is the practical answer to "does dragging a
# card to In Progress create a branch automatically" — it doesn't (Project
# automations only react to issue/PR events, never the other way around);
# this script is the substitute.
#
# Usage: scripts/start-task.sh <issue-number>

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
source scripts/lib/common.sh

ISSUE="${1:-}"
if [[ -z "$ISSUE" ]]; then
  err "Usage: scripts/start-task.sh <issue-number>"
  exit 1
fi

require_gh
NUM="$(require_project_number)"

title="$(gh issue view "$ISSUE" --json title --jq '.title')"
url="$(gh issue view "$ISSUE" --json url --jq '.url')"
is_bug="$(gh issue view "$ISSUE" --json labels --jq '[.labels[].name] | index("type: bug") != null')"

slug="$(tr '[:upper:]' '[:lower:]' <<<"$title" \
  | sed -E 's/^\[(task|epic|bug)\][[:space:]]*//' \
  | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g' \
  | cut -c1-50 | sed -E 's/-+$//')"

if [[ -z "$slug" ]]; then
  err "Could not derive a branch slug from issue #$ISSUE's title."
  exit 1
fi

prefix="task"
[[ "$is_bug" == "true" ]] && prefix="fix"

branch="${prefix}/${ISSUE}-${slug}"
log "Creating and checking out branch: $branch"
gh issue develop "$ISSUE" --name "$branch" --checkout

set_field_value "$NUM" "$url" "Status" "In Progress"

log "Ready. Remember: your PR description needs 'Closes #$ISSUE' (or 'Part of #$ISSUE' for partial work)."
