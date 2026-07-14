#!/bin/bash
# Persistent dev server wrapper for sandbox environment
# Restarts the server automatically if it crashes

cd /home/z/my-project

while true; do
  echo "[$(date)] Starting Next.js dev server..."
  bun run dev 2>&1
  EXIT_CODE=$?
  echo "[$(date)] Server exited with code $EXIT_CODE, restarting in 2s..."
  sleep 2
done