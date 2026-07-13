import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('optivo_session')?.value

    if (token) {
      await db.session.deleteMany({ where: { token } }).catch(() => {})
    }

    const response = NextResponse.json({ success: true })

    response.cookies.set('optivo_session', '', {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })

    return response
  } catch {
    const response = NextResponse.json({ success: true })
    response.cookies.set('optivo_session', '', {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })
    return response
  }
}