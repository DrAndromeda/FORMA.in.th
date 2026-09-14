#!/usr/bin/env bash
# Turns every docs/tasks/TASK-*.md file into a GitHub Issue (type: task),
# linked as a native sub-issue of the repo's one epic. Mirrors
# create-epic-issues.sh exactly, one level down.
#
# These are meant to be LARGE tasks — each representing a real work
# session, not a micro-step (see docs/tasks/README.md). Most day-to-day
# tasks don't need a committed file at all; use `make task-new` or the
# GitHub UI directly for those. Pre-write a docs/tasks/TASK-*.md file only
# for tasks substantial enough to deserve a spec before they exist as an
# issue — which, in this workflow, is most of them.
#
# Safe to re-run: skips any task whose issue title already exists.
#
# Usage: scripts/create-task-issues.sh [--epic <issue-number>]
#   Without --epic, auto-detects the epic: this workflow expects exactly
#   one open "type: epic" issue (one proposal = one epic). If there's zero
#   or more than one, pass --epic explicitly.

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
source scripts/lib/common.sh

EPIC=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --epic) EPIC="$2"; shift 2 ;;
    *) err "Unknown argument: $1"; exit 1 ;;
  esac
done

require_gh
NUM="$(require_project_number)"

if [[ -z "$EPIC" ]]; then
  # `while read` rather than `mapfile` — this repo's target `bash` may be the
  # system-default 3.2 on macOS (mapfile/readarray need bash 4+).
  epic_issues=()
  while IFS= read -r n; do
    [[ -n "$n" ]] && epic_issues+=("$n")
  done < <(gh issue list --state open --label "type: epic" --json number --jq '.[].number')
  if [[ ${#epic_issues[@]} -eq 0 ]]; then
    err "No open 'type: epic' issue found. Run 'make board-epics' first, or pass --epic <n>."
    exit 1
  elif [[ ${#epic_issues[@]} -gt 1 ]]; then
    err "More than one open 'type: epic' issue found (${epic_issues[*]}) — this workflow expects exactly one (one proposal = one epic). Pass --epic <n> to pick which one these tasks belong to."
    exit 1
  fi
  EPIC="${epic_issues[0]}"
  log "Auto-detected epic: #$EPIC"
fi

shopt -s nullglob
files=(docs/tasks/TASK-*.md)
shopt -u nullglob

if [[ ${#files[@]} -eq 0 ]]; then
  warn "No docs/tasks/TASK-*.md files found — nothing to do."
  exit 0
fi

for file in "${files[@]}"; do
  title="$(head -n1 "$file" | sed -E 's/^#+[[:space:]]*//')"
  if [[ -z "$title" ]]; then
    warn "Skipping $file — no '# Title' first line found."
    continue
  fi

  issue_title="[TASK] $title"
  log "Task: $title ($file)"

  existing="$(find_issue_by_title "$issue_title")"
  if [[ -n "$existing" ]]; then
    log "  already exists as #$existing — skipping creation."
    continue
  fi

  priority="$(grep -oE '\*\*Priority:\*\*\s*P[0-2]' "$file" | grep -oE 'P[0-2]' | head -n1 || true)"
  phase="$(grep -oE '\*\*Phase:\*\*\s*[0-9]+' "$file" | grep -oE '[0-9]+' | head -n1 || true)"
  status_line="$(grep -oE '\*\*Status:\*\*.*' "$file" | head -n1 || true)"

  board_status="Backlog"
  if [[ -n "$status_line" ]]; then
    status_lower="$(tr '[:upper:]' '[:lower:]' <<<"$status_line")"
    if [[ "$status_lower" == *"not started"* ]]; then
      board_status="Backlog"
    elif [[ "$status_lower" == *"done"* ]]; then
      board_status="Done"
    else
      board_status="In Progress"
    fi
  fi

  body="$(cat "$file")
---
_Full spec: [\`$file\`](../../$file) in this repository. Parent epic: #$EPIC._"

  args=(gh issue create --title "$issue_title" --body "$body" --label "type: task" --project "$PROJECT_TITLE" --parent "$EPIC")
  [[ -n "$priority" ]] && args+=(--label "priority: $priority")
  [[ -n "$phase" ]] && args+=(--label "phase: $phase")

  url="$("${args[@]}")"
  log "  created: $url (sub-issue of #$EPIC)"

  set_field_value "$NUM" "$url" "Status" "$board_status"
  [[ -n "$priority" ]] && set_field_value "$NUM" "$url" "Priority" "$priority"
  [[ -n "$phase" ]] && set_field_value "$NUM" "$url" "Phase" "Phase $phase"
done

log "Done."
