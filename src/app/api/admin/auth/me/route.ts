import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getSession(new Request('http://localhost'))

    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 },
      )
    }

    return NextResponse.json({
      authenticated: true,
      admin: { username: session.admin.username },
    })
  } catch {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 },
    )
  }
}