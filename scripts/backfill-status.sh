#!/usr/bin/env bash
# Sets the board Status field to the same value for every OPEN issue.
#
# NOT idempotent by design — it unconditionally overwrites Status on every
# open issue, every time you run it. Use it for one-off resets (e.g. "the
# board wasn't set up right for the first N issues, force them all back to
# Backlog"), not as part of the regular workflow.
#
# Usage:
#   scripts/backfill-status.sh [status-value]   # defaults to "Backlog"
#   FORCE=1 scripts/backfill-status.sh Backlog   # skip the confirmation prompt

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
source scripts/lib/common.sh

STATUS_VALUE="${1:-Backlog}"

require_gh
NUM="$(require_project_number)"

log "Fetching open issues…"
# `while read` rather than `mapfile` — this repo's target `bash` may be the
# system-default 3.2 on macOS (mapfile/readarray need bash 4+).
issues=()
while IFS=$'\t' read -r n url; do
  [[ -n "$n" ]] && issues+=("$n"$'\t'"$url")
done < <(gh issue list --state open --limit 1000 --json number,url --jq '.[] | "\(.number)\t\(.url)"')

count="${#issues[@]}"
if [[ "$count" -eq 0 ]]; then
  log "No open issues found — nothing to do."
  exit 0
fi

log "This will set Status = \"$STATUS_VALUE\" on all $count open issue(s):"
for line in "${issues[@]}"; do
  printf '  #%s\n' "${line%%$'\t'*}" >&2
done

if [[ "${FORCE:-0}" != "1" ]]; then
  read -r -p "Continue? [y/N] " reply
  if [[ ! "$reply" =~ ^[Yy]$ ]]; then
    log "Aborted."
    exit 0
  fi
fi

failures=0
for line in "${issues[@]}"; do
  n="${line%%$'\t'*}"
  url="${line#*$'\t'}"
  log "Setting #$n → $STATUS_VALUE"
  if ! retry_gh gh project item-edit "$NUM" --owner "$PROJECT_OWNER" \
      --url "$url" --field "Status" --value "$STATUS_VALUE" >/dev/null; then
    err "Failed to update #$n — see error above."
    failures=$((failures + 1))
  fi
  sleep 1
done

if [[ "$failures" -gt 0 ]]; then
  err "$failures of $count update(s) failed."
  exit 1
fi

log "Done — $count issue(s) updated."
