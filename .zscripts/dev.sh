#!/bin/bash
# Production-ready startup script for Optivo Solutions
# Uses next start (production build) instead of next dev (Turbopack)
# This is ~10x more memory-efficient and doesn't crash in constrained environments

set -e
cd /home/z/my-project

echo "[DEV] === Optivo Solutions - Production Server ==="

# Step 1: Install dependencies
echo "[DEV] Installing dependencies..."
bun install --frozen-lockfile 2>/dev/null || bun install

# Step 2: Push database schema
echo "[DEV] Syncing database schema..."
bun run db:push 2>/dev/null || npx prisma db push --skip-generate 2>/dev/null || true

# Step 3: Seed admin user if needed
echo "[DEV] Ensuring admin user exists..."
npx tsx prisma/seed.ts 2>/dev/null || true

# Step 4: Build production bundle
echo "[DEV] Building production bundle..."
NODE_OPTIONS="--max-old-space-size=2560" npx next build

# Step 5: Start production server with auto-restart
echo "[DEV] Starting production server on port 3000..."
while true; do
  echo "[DEV] $(date '+%Y-%m-%d %H:%M:%S') Starting next start..."
  NODE_OPTIONS="--max-old-space-size=1024" npx next start -p 3000
  EXIT_CODE=$?
  echo "[DEV] $(date '+%Y-%m-%d %H:%M:%S') Server exited with code $EXIT_CODE, restarting in 2s..."
  sleep 2
done