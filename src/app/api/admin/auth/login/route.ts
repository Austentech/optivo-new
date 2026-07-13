import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyPassword, generateToken, SESSION_MAX_AGE } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 },
      )
    }

    const admin = await db.admin.findUnique({ where: { username } })

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      )
    }

    const valid = verifyPassword(password, admin.passwordHash, admin.salt)

    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      )
    }

    const token = generateToken()
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE)

    await db.session.create({
      data: {
        token,
        adminId: admin.id,
        expiresAt,
      },
    })

    const response = NextResponse.json({
      success: true,
      admin: { username: admin.username },
    })

    response.cookies.set('optivo_session', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE / 1000,
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 },
    )
  }
}