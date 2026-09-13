#!/usr/bin/env bash
# Shared config and helpers for the GitHub Issues + Projects workflow scripts.
# Sourced by every script in scripts/ — not meant to be run directly.

set -euo pipefail

PROJECT_TITLE="${FORMA_PROJECT_TITLE:-FORMA Roadmap}"
PROJECT_OWNER="${FORMA_PROJECT_OWNER:-@me}"

log()  { printf '\033[1;34m→ %s\033[0m\n' "$*" >&2; }
warn() { printf '\033[1;33m⚠ %s\033[0m\n' "$*" >&2; }
err()  { printf '\033[1;31m✗ %s\033[0m\n' "$*" >&2; }

require_gh() {
  if ! command -v gh >/dev/null 2>&1; then
    err "gh CLI not found. Install: https://cli.github.com"
    exit 1
  fi
  if ! gh auth status >/dev/null 2>&1; then
    err "Not authenticated. Run: gh auth login"
    exit 1
  fi
}

# Prints the board's project number (an integer), or nothing if no project with
# PROJECT_TITLE exists yet for PROJECT_OWNER.
project_number() {
  gh project list --owner "$PROJECT_OWNER" --format json --limit 100 \
    --jq ".projects[] | select(.title == \"$PROJECT_TITLE\") | .number" \
    | head -n1
}

# require_project_number — like project_number, but fails loudly if the board
# doesn't exist yet, for scripts that need it to already be set up.
require_project_number() {
  local num
  num="$(project_number)"
  if [[ -z "$num" ]]; then
    err "No project titled \"$PROJECT_TITLE\" found for owner $PROJECT_OWNER."
    err "Run 'make board-setup' first."
    exit 1
  fi
  echo "$num"
}

# Best-effort: sets a single-select project field value for an issue/PR by URL.
# Never fails the calling script — a missing field/option (e.g. Status hasn't
# been manually renamed yet, see docs/WORKFLOW.md) is reported as a warning,
# not a hard error, since callers like create-epic-issues.sh must still
# succeed at creating the issue itself.
set_field_value() {
  local project_num="$1" item_url="$2" field_name="$3" field_value="$4"
  if gh project item-edit "$project_num" --owner "$PROJECT_OWNER" \
      --url "$item_url" --field "$field_name" --value "$field_value" >/dev/null 2>&1; then
    log "  set $field_name = $field_value"
  else
    warn "  could not set $field_name = \"$field_value\" (field/option may not exist yet — see docs/WORKFLOW.md)"
  fi
}

# Retries a gh invocation up to 3 times with increasing backoff when the
# output looks like a GraphQL secondary rate-limit error (not the hourly
# quota — a burst limit that shows up after rapid sequential item-edit calls).
retry_gh() {
  local attempt=1 max=3 delay=2
  local output status
  while true; do
    if output=$("$@" 2>&1); then
      printf '%s\n' "$output"
      return 0
    fi
    status=$?
    if [[ "$output" == *"rate limit"* || "$output" == *"RATE_LIMITED"* || "$output" == *"secondary rate limit"* ]] && (( attempt < max )); then
      warn "Rate limited, retrying in ${delay}s (attempt $attempt/$max)…"
      sleep "$delay"
      attempt=$((attempt + 1))
      delay=$((delay * 2))
      continue
    fi
    printf '%s\n' "$output" >&2
    return "$status"
  done
}

# Exact-match issue lookup by title (used to keep create-epic-issues.sh /
# create-task.sh safe to re-run). Prints the issue number, or nothing.
find_issue_by_title() {
  local title="$1"
  gh issue list --state all --search "\"$title\" in:title" --limit 100 \
    --json number,title --jq ".[] | select(.title == \"$title\") | .number" \
    | head -n1
}
