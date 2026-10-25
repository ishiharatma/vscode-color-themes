#!/usr/bin/env bash
# Shell script sample for checking theme colors.
set -euo pipefail

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly MAX_RETRIES=3
LOG_FILE="${LOG_FILE:-/tmp/deploy.log}"

declare -A ENVIRONMENTS=(
  [dev]="https://dev.example.com"
  [prod]="https://example.com"
)

log() {
  local level="$1"; shift
  printf '[%s] %-5s %s\n' "$(date +%H:%M:%S)" "${level}" "$*" | tee -a "${LOG_FILE}"
}

deploy() {
  local env="${1:?environment is required}"
  local url="${ENVIRONMENTS[$env]:-}"

  if [[ -z "${url}" ]]; then
    log ERROR "Unknown environment: ${env}"
    return 1
  fi

  for ((i = 1; i <= MAX_RETRIES; i++)); do
    if curl -fsS "${url}/health" > /dev/null 2>&1; then
      log INFO "Deployed to ${env} (attempt ${i})"
      return 0
    fi
    log WARN "Retrying... (${i}/${MAX_RETRIES})"
    sleep $((i * 2))
  done
  return 1
}

case "${1:-}" in
  dev | prod) deploy "$1" ;;
  -h | --help)
    cat <<EOF
Usage: $(basename "$0") <dev|prod>
EOF
    ;;
  *) log ERROR "Invalid argument: '${1:-}'"; exit 2 ;;
esac

find "${SCRIPT_DIR}" -name '*.log' -mtime +7 -print0 | xargs -0 rm -f
