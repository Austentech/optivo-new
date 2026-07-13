import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession, verifyPassword, hashPassword } from '@/lib/auth'

const PASSWORD_MIN_LENGTH = 8
const PASSWORD_VALIDATION = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
}

export async function POST(request: Request) {
  try {
    const session = await getSession(request)

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      )
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 },
      )
    }

    // Validate new password
    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      return NextResponse.json(
        { error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long` },
        { status: 400 },
      )
    }

    if (!PASSWORD_VALIDATION.uppercase.test(newPassword)) {
      return NextResponse.json(
        { error: 'Password must contain at least one uppercase letter' },
        { status: 400 },
      )
    }

    if (!PASSWORD_VALIDATION.lowercase.test(newPassword)) {
      return NextResponse.json(
        { error: 'Password must contain at least one lowercase letter' },
        { status: 400 },
      )
    }

    if (!PASSWORD_VALIDATION.number.test(newPassword)) {
      return NextResponse.json(
        { error: 'Password must contain at least one number' },
        { status: 400 },
      )
    }

    // Fetch current admin credentials
    const admin = await db.admin.findUnique({
      where: { id: session.adminId },
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin account not found' },
        { status: 404 },
      )
    }

    // Verify current password
    const valid = verifyPassword(currentPassword, admin.passwordHash, admin.salt)

    if (!valid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 },
      )
    }

    // Hash new password and update
    const { hash, salt } = hashPassword(newPassword)

    await db.admin.update({
      where: { id: session.adminId },
      data: { passwordHash: hash, salt },
    })

    // Delete all sessions to force re-login on all devices
    await db.session.deleteMany({
      where: { adminId: session.adminId },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 },
    )
  }
}