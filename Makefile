.DEFAULT_GOAL := help

## ── App ──────────────────────────────────────────────────────────────────

dev: ## Start the Astro dev server — runs: npm run dev
	npm run dev

build: ## Production build to ./dist — runs: npm run build
	npm run build

preview: ## Serve the production build locally — runs: npm run preview
	npm run preview

check: ## Mirror CI: type check then build (this project has no lint/test script yet) — runs: npm run check && npm run build
	npm run check
	npm run build

qa-static: ## Static QA: broken links, H1/title/meta/canonical/alt, JSON-LD validity — runs after `make build`
	npm run qa:static

qa-browser: ## Real-browser QA: mobile menu interaction, horizontal-scroll, axe-core a11y — needs a preview server running (make preview)
	npm run qa:browser

qa: build qa-static ## Full static QA pass: build then qa-static
	@echo "Run 'make preview' in another terminal, then 'make qa-browser', for the real-browser pass."

## ── GitHub Project board ─────────────────────────────────────────────────

board-setup: ## One-time: labels, the Project board, Priority/Phase fields — runs: scripts/github-bootstrap.sh
	scripts/github-bootstrap.sh

board-epics: ## Create/update the (one) epic issue from docs/epics/EPIC-*.md — runs: scripts/create-epic-issues.sh
	scripts/create-epic-issues.sh

board-tasks: ## Create issues from docs/tasks/TASK-*.md, linked as sub-issues of the epic — runs: scripts/create-task-issues.sh
	scripts/create-task-issues.sh

board-sync-status: ## Push each epic file's Status line onto the board — runs: scripts/sync-epic-status.sh
	scripts/sync-epic-status.sh

board-sync-tasks: ## Push each task file's Status line onto the board — runs: scripts/sync-task-status.sh
	scripts/sync-task-status.sh

board-backfill: ## Force Status on every open issue (NOT idempotent; STATUS=Backlog by default) — runs: scripts/backfill-status.sh
	scripts/backfill-status.sh $(STATUS)

## ── Tasks ─────────────────────────────────────────────────────────────────

task-new: ## File a task issue: TITLE required, EPIC/PRIORITY/PHASE/BODY optional — runs: scripts/create-task.sh
	@if [ -z "$(TITLE)" ]; then echo "Usage: make task-new TITLE=\"...\" [EPIC=<n>] [PRIORITY=P0|P1|P2] [PHASE=<n>] [BODY=\"...\"]" >&2; exit 1; fi
	scripts/create-task.sh --title "$(TITLE)" $(if $(EPIC),--epic $(EPIC)) $(if $(PRIORITY),--priority $(PRIORITY)) $(if $(PHASE),--phase $(PHASE)) $(if $(BODY),--body "$(BODY)")

task-start: ## Create+checkout a task's branch and move it to In Progress: TASK=<issue-number> required — runs: scripts/start-task.sh
	@if [ -z "$(TASK)" ]; then echo "Usage: make task-start TASK=<issue-number>" >&2; exit 1; fi
	scripts/start-task.sh $(TASK)

## ── Help ──────────────────────────────────────────────────────────────────

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: dev build preview check qa-static qa-browser qa board-setup board-epics board-tasks board-sync-status board-sync-tasks board-backfill task-new task-start help
