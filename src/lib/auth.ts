import crypto from 'node:crypto'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000 // 7 days
const SCRYPT_KEY_LENGTH = 64
const SALT_LENGTH = 32
const TOKEN_LENGTH = 48

export function hashPassword(
  password: string,
  existingSalt?: string,
): { hash: string; salt: string } {
  const salt = existingSalt ?? crypto.randomBytes(SALT_LENGTH).toString('hex')
  const hash = crypto.scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString('hex')
  return { hash, salt }
}

export function verifyPassword(
  password: string,
  hash: string,
  salt: string,
): boolean {
  const { hash: computedHash } = hashPassword(password, salt)
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(computedHash, 'hex'))
}

export function generateToken(): string {
  return crypto.randomBytes(TOKEN_LENGTH).toString('hex')
}

export async function getSession(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('optivo_session')?.value

  if (!token) return null

  const session = await db.session.findUnique({
    where: { token },
    include: { admin: { select: { id: true, username: true } } },
  })

  if (!session) return null

  const now = new Date()
  if (session.expiresAt < now) {
    // Session expired – clean up
    await db.session.delete({ where: { id: session.id } }).catch(() => {})
    return null
  }

  return {
    id: session.id,
    token: session.token,
    adminId: session.adminId,
    expiresAt: session.expiresAt,
    admin: session.admin,
  }
}