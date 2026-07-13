#!/bin/bash
cd /home/z/my-project
while true; do
  NODE_OPTIONS="--max-old-space-size=2048" bun run dev
  echo "[$(date)] Dev server exited, restarting in 2s..." >> /home/z/my-project/dev.log
  sleep 2
done
