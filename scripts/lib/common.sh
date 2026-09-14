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
  # `gh project ...` subcommands accept --owner @me almost everywhere, but
  # `gh project link` fails a literal string comparison between --owner and
  # the resolved --repo's owner when --owner is left as the literal string
  # "@me" (confirmed: "'stoianov46/Forma' has different owner from '@me'").
  # Resolve it to the real login once, here, so every script/command below
  # uses a concrete owner consistently instead of hitting that quirk.
  if [[ "$PROJECT_OWNER" == "@me" ]]; then
    PROJECT_OWNER="$(gh api user --jq '.login')"
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
  # Wrapped in retry_gh (defined below) with a small fixed pause after every
  # call — confirmed in practice that a run of ~15 back-to-back item-edit
  # calls (one epic + 12 tasks, twice over via create + sync) reliably trips
  # GitHub's GraphQL secondary rate limit ("API rate limit exceeded"),
  # distinct from and much more aggressive than the hourly quota.
  if retry_gh gh project item-edit "$project_num" --owner "$PROJECT_OWNER" \
      --url "$item_url" --field "$field_name" --value "$field_value" >/dev/null; then
    log "  set $field_name = $field_value"
  else
    warn "  could not set $field_name = \"$field_value\" (field/option may not exist yet, or rate-limited — see docs/WORKFLOW.md)"
  fi
  sleep 0.5
}

# Retries a gh invocation with increasing backoff when the output looks like
# a GraphQL secondary rate-limit error (not the hourly quota — a burst limit
# that shows up after rapid sequential item-edit calls). Confirmed in
# practice that GitHub's secondary limit does NOT reliably clear within 15s
# of a single trigger — starting at 15s and doubling (15/30/60, ~105s total
# across 4 attempts) is deliberately generous rather than optimistic.
retry_gh() {
  local attempt=1 max=4 delay=15
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
