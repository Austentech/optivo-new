import { db } from '../src/lib/db';
import { randomBytes, scryptSync } from 'crypto';

async function seed() {
  const username = 'info@optivo.in';
  const password = 'Optivo123@#';
  const salt = randomBytes(32).toString('hex');
  const passwordHash = scryptSync(password, salt, 64).toString('hex');

  // Upsert admin
  await db.admin.upsert({
    where: { username },
    update: { passwordHash, salt },
    create: { username, passwordHash, salt },
  });

  console.log('✅ Admin seeded:', username);
  console.log('   Password:', password);
  console.log('   Salt:', salt.slice(0, 16) + '...');
  console.log('   Hash:', passwordHash.slice(0, 16) + '...');
}

seed()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());