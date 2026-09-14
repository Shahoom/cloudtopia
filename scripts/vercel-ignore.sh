#!/bin/bash
# Vercel "Ignored Build Step": exit 0 = skip the build, exit 1 = build.
# Skips deploys when nothing outside docs/content folders changed since the
# last successful deployment — every build adds ~0.5 GB of deployment storage.

BASE="$VERCEL_GIT_PREVIOUS_SHA"

# No previous deployment, or its commit isn't in the shallow clone: build.
if [ -z "$BASE" ] || ! git cat-file -e "$BASE^{commit}" 2>/dev/null; then
  echo "No comparable previous deployment — building."
  exit 1
fi

if git diff --quiet "$BASE" HEAD -- . \
  ':(exclude)docs' \
  ':(exclude)content-deliverables' \
  ':(exclude)content-batch2' \
  ':(exclude)content-new-2026' \
  ':(exclude)scratchpad' \
  ':(exclude)README.md'; then
  echo "Only docs/content changed since $BASE — skipping build."
  exit 0
fi

echo "App changes since $BASE — building."
exit 1
