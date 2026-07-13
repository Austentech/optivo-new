import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

// ── GET: Auth-protected leads listing ──────────────────────────────────────────
export async function GET(request: Request) {
  try {
    const session = await getSession(request)

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      )
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') ?? ''
    const type = searchParams.get('type') ?? 'all'
    const status = searchParams.get('status') ?? 'all'
    const page = Math.max(1, Number(searchParams.get('page')) || 1)
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 50))
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}

    // Search across name, phone, email
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
      ]
    }

    // Filter by type
    if (type !== 'all') {
      where.type = type
    }

    // Filter by read status
    if (status === 'read') {
      where.isRead = true
    } else if (status === 'unread') {
      where.isRead = false
    }

    const [leads, total] = await Promise.all([
      db.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.lead.count({ where }),
    ])

    return NextResponse.json({
      leads,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 },
    )
  }
}

// ── POST: Public lead submission (no auth) ────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, service, type, preferredDate, preferredTime, message } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 },
      )
    }

    if (type && type !== 'callback' && type !== 'enquiry') {
      return NextResponse.json(
        { error: 'Type must be "callback" or "enquiry"' },
        { status: 400 },
      )
    }

    const lead = await db.lead.create({
      data: {
        name,
        phone,
        email: email ?? '',
        service: service ?? '',
        type: type ?? 'enquiry',
        preferredDate: preferredDate ?? '',
        preferredTime: preferredTime ?? '',
        message: message ?? '',
      },
    })

    return NextResponse.json({ success: true, id: lead.id })
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 },
    )
  }
}