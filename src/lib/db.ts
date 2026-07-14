import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL || 'file:/home/z/my-project/db/custom.db'

  // PrismaLibSql is a factory that takes a libsql config object
  // It creates the libsql client internally on connect()
  // Supports both file: URLs (local SQLite) and libsql: URLs (Turso cloud)
  const adapter = new PrismaLibSql({
    url: databaseUrl,
    authToken: process.env.TURSO_AUTH_TOKEN || undefined,
  })

  return new PrismaClient({ adapter })
}

export const db =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db