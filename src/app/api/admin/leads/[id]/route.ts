import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

// ── PATCH: Mark lead as read/unread ────────────────────────────────────────────
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession(request)

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      )
    }

    const { id } = await params
    const body = await request.json()
    const { action } = body

    if (action !== 'mark_read' && action !== 'mark_unread') {
      return NextResponse.json(
        { error: 'Invalid action. Use "mark_read" or "mark_unread"' },
        { status: 400 },
      )
    }

    const lead = await db.lead.findUnique({ where: { id } })

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 },
      )
    }

    await db.lead.update({
      where: { id },
      data: { isRead: action === 'mark_read' },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 },
    )
  }
}

// ── DELETE: Remove a lead ─────────────────────────────────────────────────────
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession(request)

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      )
    }

    const { id } = await params

    const lead = await db.lead.findUnique({ where: { id } })

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 },
      )
    }

    await db.lead.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 },
    )
  }
}