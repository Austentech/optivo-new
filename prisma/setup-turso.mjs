// One-command Turso setup: creates tables + seeds admin user
// Run: node prisma/setup-turso.mjs
// No Prisma CLI needed — connects to Turso directly via @libsql/client

import { createClient } from '@libsql/client';
import { randomBytes, scryptSync } from 'crypto';

const databaseUrl = process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!databaseUrl) {
  console.error('ERROR: DATABASE_URL is not set.');
  console.error('');
  console.error('In CMD:');
  console.error('  set DATABASE_URL=libsql://your-db-name-your-org.turso.io');
  console.error('  set TURSO_AUTH_TOKEN=your-auth-token');
  console.error('  node prisma/setup-turso.mjs');
  process.exit(1);
}

const turso = createClient({
  url: databaseUrl,
  authToken: authToken || undefined,
});

async function setup() {
  console.log('Connecting to Turso...');

  // Test connection
  await turso.execute('SELECT 1');
  console.log('✅ Connected to Turso\n');

  // Create tables
  console.log('Creating tables...');

  await turso.executeMultiple(`
    CREATE TABLE IF NOT EXISTS "Admin" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "username" TEXT NOT NULL,
      "passwordHash" TEXT NOT NULL,
      "salt" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "Session" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "token" TEXT NOT NULL,
      "adminId" TEXT NOT NULL,
      "expiresAt" DATETIME NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Session_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "Lead" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "phone" TEXT NOT NULL,
      "email" TEXT NOT NULL DEFAULT '',
      "service" TEXT NOT NULL DEFAULT '',
      "type" TEXT NOT NULL DEFAULT 'enquiry',
      "preferredDate" TEXT NOT NULL DEFAULT '',
      "preferredTime" TEXT NOT NULL DEFAULT '',
      "message" TEXT NOT NULL DEFAULT '',
      "isRead" BOOLEAN NOT NULL DEFAULT 0,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "Admin_username_key" ON "Admin"("username");
    CREATE UNIQUE INDEX IF NOT EXISTS "Session_token_key" ON "Session"("token");
  `);

  console.log('✅ Tables created\n');

  // Seed admin user
  console.log('Seeding admin user...');
  const username = 'info@optivo.in';
  const password = 'Optivo123@#';
  const salt = randomBytes(32).toString('hex');
  const passwordHash = scryptSync(password, salt, 64).toString('hex');

  // Generate a CUID-like ID
  const adminId = 'c' + Date.now().toString(36) + Math.random().toString(36).substring(2, 10);

  // Check if admin already exists
  const existing = await turso.execute({
    sql: 'SELECT id FROM "Admin" WHERE username = ?',
    args: [username],
  });

  if (existing.rows.length > 0) {
    // Update existing admin
    await turso.execute({
      sql: 'UPDATE "Admin" SET passwordHash = ?, salt = ?, "updatedAt" = CURRENT_TIMESTAMP WHERE username = ?',
      args: [passwordHash, salt, username],
    });
    console.log('✅ Admin user updated (already existed)\n');
  } else {
    // Create new admin
    await turso.execute({
      sql: 'INSERT INTO "Admin" (id, username, passwordHash, salt, "createdAt", "updatedAt") VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      args: [adminId, username, passwordHash, salt],
    });
    console.log('✅ Admin user created\n');
  }

  console.log('=== SETUP COMPLETE ===');
  console.log('Username:', username);
  console.log('Password:', password);
  console.log('');
  console.log('You can now login at your-site.vercel.app/admin');
}

setup()
  .catch((e) => {
    console.error('❌ Setup failed:', e.message);
    process.exit(1);
  })
  .finally(() => turso.close());