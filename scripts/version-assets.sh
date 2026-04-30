#!/usr/bin/env bash
# Cache-bust site assets by appending a content-hash query string to the
# CSS/JS references in every HTML page. Run after editing site.css or
# site.js; idempotent — re-running with no asset changes leaves the tree
# clean.
#
# Why: GitHub Pages serves css/js with a 4h Cloudflare cache, so a
# straight push leaves users on stale assets long after the HTML
# refreshes. A content-hash query string forces a fresh fetch only when
# the asset's content changes.

set -euo pipefail

cd "$(dirname "$0")/.."

bump_root() {
  local root="$1"
  local css="$root/css/site.css"
  local js="$root/js/site.js"
  if [[ ! -f "$css" || ! -f "$js" ]]; then
    echo "  skip: $root (no css/site.css or js/site.js)"
    return
  fi

  local css_v js_v
  css_v=$(sha256sum "$css" | cut -c1-8)
  js_v=$(sha256sum "$js" | cut -c1-8)
  echo "  $root: css=$css_v  js=$js_v"

  local html
  for html in "$root"/*.html; do
    [[ -f "$html" ]] || continue
    sed -E -i \
      -e "s|(href=\"css/site\.css)(\?v=[^\"]*)?(\")|\1?v=$css_v\3|g" \
      -e "s|(src=\"js/site\.js)(\?v=[^\"]*)?(\")|\1?v=$js_v\3|g" \
      "$html"
  done
}

echo "Versioning site assets..."
bump_root "."
bump_root "sanctuary"
echo "Done."
