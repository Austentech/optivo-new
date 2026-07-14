import { config } from 'dotenv';
config();

// Dynamic import AFTER dotenv loads, since ES imports are hoisted
const { db } = await import('../src/lib/db');
const { randomBytes, scryptSync } = await import('crypto');

async function seed() {
  const username = 'info@optivo.in';
  const password = 'Optivo123@#';
  const salt = randomBytes(32).toString('hex');
  const passwordHash = scryptSync(password, salt, 64).toString('hex');

  await db.admin.upsert({
    where: { username },
    update: { passwordHash, salt },
    create: { username, passwordHash, salt },
  });

  console.log('✅ Admin seeded:', username);
  console.log('   Password:', password);
}

seed()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());