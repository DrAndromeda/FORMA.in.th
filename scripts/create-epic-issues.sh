#!/usr/bin/env bash
# Turns every docs/epics/EPIC-*.md file into a GitHub Issue (type: epic) on the
# board. Safe to re-run: skips any epic whose issue title already exists, so
# you can add new epic files and re-run this without duplicating existing ones.
#
# This script always sets a freshly created epic's board Status to the
# "start" column (Backlog). If an epic file's own **Status:** line says
# something else (e.g. it documents already-completed work), run
# `make board-sync-status` right after this to correct it — see
# docs/epics/README.md and docs/WORKFLOW.md.
#
# Usage: scripts/create-epic-issues.sh

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
source scripts/lib/common.sh

require_gh
NUM="$(require_project_number)"

shopt -s nullglob
files=(docs/epics/EPIC-*.md)
shopt -u nullglob

if [[ ${#files[@]} -eq 0 ]]; then
  warn "No docs/epics/EPIC-*.md files found — nothing to do."
  exit 0
fi

for file in "${files[@]}"; do
  title="$(head -n1 "$file" | sed -E 's/^#+[[:space:]]*//')"
  if [[ -z "$title" ]]; then
    warn "Skipping $file — no '# Title' first line found."
    continue
  fi

  issue_title="[EPIC] $title"
  log "Epic: $title ($file)"

  existing="$(find_issue_by_title "$issue_title")"
  if [[ -n "$existing" ]]; then
    log "  already exists as #$existing — skipping creation."
    continue
  fi

  priority="$(grep -oE '\*\*Priority:\*\*\s*P[0-2]' "$file" | grep -oE 'P[0-2]' | head -n1 || true)"
  phase="$(grep -oE '\*\*Phase:\*\*\s*[0-9]+' "$file" | grep -oE '[0-9]+' | head -n1 || true)"

  body="$(cat "$file")
---
_Full spec: [\`$file\`](../../$file) in this repository._"

  # Built as a real array (not string interpolation) so a label value can
  # never be accidentally word-split or lose its embedded characters.
  args=(gh issue create --title "$issue_title" --body "$body" --label "type: epic" --project "$PROJECT_TITLE")
  [[ -n "$priority" ]] && args+=(--label "priority: $priority")
  [[ -n "$phase" ]] && args+=(--label "phase: $phase")

  url="$("${args[@]}")"
  log "  created: $url"

  set_field_value "$NUM" "$url" "Status" "Backlog"
  [[ -n "$priority" ]] && set_field_value "$NUM" "$url" "Priority" "$priority"
  [[ -n "$phase" ]] && set_field_value "$NUM" "$url" "Phase" "Phase $phase"
done

log "Done. Run 'make board-sync-status' to correct Status for any epic that isn't actually starting from Backlog."
