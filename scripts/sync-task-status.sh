#!/usr/bin/env bash
# Reads each docs/tasks/TASK-*.md file's **Status:** line and pushes it onto
# the board. Mirrors sync-epic-status.sh exactly, one level down — run this
# after editing a task's Status line, instead of also hand-editing the board.
#
# Mapping:
#   "Done"                       -> Done
#   contains "not started"       -> Backlog
#   anything else (Partial, "In progress", "Mostly done", ...) -> In Progress
#
# Usage: scripts/sync-task-status.sh

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
source scripts/lib/common.sh

require_gh
NUM="$(require_project_number)"

shopt -s nullglob
files=(docs/tasks/TASK-*.md)
shopt -u nullglob

if [[ ${#files[@]} -eq 0 ]]; then
  warn "No docs/tasks/TASK-*.md files found — nothing to do."
  exit 0
fi

for file in "${files[@]}"; do
  title="$(head -n1 "$file" | sed -E 's/^#+[[:space:]]*//')"
  [[ -z "$title" ]] && { warn "Skipping $file — no '# Title' first line found."; continue; }

  status_line="$(grep -oE '\*\*Status:\*\*.*' "$file" | head -n1 || true)"
  if [[ -z "$status_line" ]]; then
    warn "Skipping \"$title\" — no **Status:** line found in $file."
    continue
  fi

  status_lower="$(tr '[:upper:]' '[:lower:]' <<<"$status_line")"
  if [[ "$status_lower" == *"not started"* ]]; then
    board_status="Backlog"
  elif [[ "$status_lower" == *"done"* ]]; then
    board_status="Done"
  else
    board_status="In Progress"
  fi

  issue_title="[TASK] $title"
  issue_num="$(find_issue_by_title "$issue_title")"
  if [[ -z "$issue_num" ]]; then
    warn "No issue found titled \"$issue_title\" — run 'make board-tasks' first? Skipping."
    continue
  fi

  url="$(gh issue view "$issue_num" --json url --jq '.url')"
  log "\"$title\" (#$issue_num): $status_line → $board_status"
  set_field_value "$NUM" "$url" "Status" "$board_status"
done

log "Done."
