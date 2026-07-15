// Self-contained ESM seed script — no TypeScript, no tsx needed
// Run with: node prisma/seed.mjs
// Works on Windows, Mac, and Linux

import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { randomBytes, scryptSync } from 'crypto';

const databaseUrl = process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!databaseUrl) {
  console.error('ERROR: DATABASE_URL environment variable is not set.');
  console.error('');
  console.error('For Turso (production):');
  console.error('  set DATABASE_URL=libsql://your-db-name-your-org.turso.io');
  console.error('  set TURSO_AUTH_TOKEN=your-auth-token');
  console.error('');
  console.error('For local SQLite:');
  console.error('  set DATABASE_URL=file:./db/custom.db');
  process.exit(1);
}

console.log('Connecting to:', databaseUrl.startsWith('libsql') ? 'Turso (cloud)' : 'Local SQLite');

const adapter = new PrismaLibSql({
  url: databaseUrl,
  authToken: authToken || undefined,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const username = 'info@optivo.in';
  const password = 'Optivo123@#';
  const salt = randomBytes(32).toString('hex');
  const passwordHash = scryptSync(password, salt, 64).toString('hex');

  const admin = await prisma.admin.upsert({
    where: { username },
    update: { passwordHash, salt },
    create: { username, passwordHash, salt },
  });

  console.log('');
  console.log('✅ Admin user seeded successfully!');
  console.log('   Username:', username);
  console.log('   Password:', password);
  console.log('   ID:', admin.id);
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());