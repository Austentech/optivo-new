#!/bin/bash
cd /home/z/my-project
while true; do
  npx next start -p 3000
  echo "[$(date)] Server exited, restarting in 1s..." >> /home/z/my-project/dev.log
  sleep 1
done
