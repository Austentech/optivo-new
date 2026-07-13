import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const session = await getSession(request)

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      )
    }

    const [
      totalLeads,
      newLeads,
      callbackLeads,
      enquiryLeads,
      readLeads,
      recentLeads,
    ] = await Promise.all([
      db.lead.count(),
      db.lead.count({ where: { isRead: false } }),
      db.lead.count({ where: { type: 'callback' } }),
      db.lead.count({ where: { type: 'enquiry' } }),
      db.lead.count({ where: { isRead: true } }),
      db.lead.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ])

    const readRate = totalLeads > 0 ? Math.round((readLeads / totalLeads) * 100) : 0
    const callbackShare = totalLeads > 0 ? Math.round((callbackLeads / totalLeads) * 100) : 0
    const enquiryShare = totalLeads > 0 ? Math.round((enquiryLeads / totalLeads) * 100) : 0

    return NextResponse.json({
      totalLeads,
      newLeads,
      callbackLeads,
      enquiryLeads,
      readRate,
      callbackShare,
      enquiryShare,
      recentLeads,
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 },
    )
  }
}