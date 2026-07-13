import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

const CSV_HEADERS = [
  'Name',
  'Phone',
  'Email',
  'Service',
  'Type',
  'Preferred Date',
  'Preferred Time',
  'Message',
  'Created',
  'Status',
]

function escapeCsvField(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function buildCsv(leads: Record<string, string | boolean | Date>[]): string {
  const headerRow = CSV_HEADERS.map(escapeCsvField).join(',')
  const dataRows = leads.map((lead) =>
    [
      lead.name,
      lead.phone,
      lead.email,
      lead.service,
      lead.type,
      lead.preferredDate,
      lead.preferredTime,
      lead.message,
      lead.createdAt instanceof Date ? lead.createdAt.toISOString() : String(lead.createdAt),
      lead.isRead ? 'Read' : 'Unread',
    ]
      .map((v) => escapeCsvField(String(v)))
      .join(','),
  )
  return [headerRow, ...dataRows].join('\n')
}

// ── Minimal PDF generation (plain text table) ─────────────────────────────────
function buildSimplePdf(leads: Record<string, string | boolean | Date>[]): Buffer {
  // Basic PDF structure with a simple table layout
  const lines: string[] = []

  // Title
  lines.push('Optivo Solutions — Leads Export')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push(`Total Leads: ${leads.length}`)
  lines.push('')

  // Column widths (approximate character widths)
  const headers = ['Name', 'Phone', 'Email', 'Service', 'Type', 'Date', 'Status']
  const colWidths = [25, 18, 25, 20, 10, 20, 8]

  // Header row
  const headerLine = headers
    .map((h, i) => h.padEnd(colWidths[i]))
    .join(' | ')
  lines.push(headerLine)
  lines.push('-'.repeat(headerLine.length))

  // Data rows
  for (const lead of leads) {
    const row = [
      String(lead.name ?? '').substring(0, colWidths[0]).padEnd(colWidths[0]),
      String(lead.phone ?? '').substring(0, colWidths[1]).padEnd(colWidths[1]),
      String(lead.email ?? '').substring(0, colWidths[2]).padEnd(colWidths[2]),
      String(lead.service ?? '').substring(0, colWidths[3]).padEnd(colWidths[3]),
      String(lead.type ?? '').substring(0, colWidths[4]).padEnd(colWidths[4]),
      lead.createdAt instanceof Date
        ? lead.createdAt.toLocaleDateString().padEnd(colWidths[5])
        : String(lead.createdAt).padEnd(colWidths[5]),
      (lead.isRead ? 'Read' : 'Unread').padEnd(colWidths[6]),
    ]
    lines.push(row.join(' | '))
  }

  const content = lines.join('\n')

  // Build a minimal PDF buffer
  const objects: Buffer[] = []
  const offsets: number[] = []

  const pdfHeader = Buffer.from('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n')

  // Object 1: Catalog
  objects.push(Buffer.from('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n'))

  // Object 2: Pages
  objects.push(Buffer.from('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n'))

  // Object 3: Page
  objects.push(
    Buffer.from(
      '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792]\n   /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n',
    ),
  )

  // Object 4: Content stream — draw text line by line
  const streamLines: string[] = []
  streamLines.push('BT')
  streamLines.push('/F1 9 Tf')
  let y = 750
  const lineHeight = 12
  for (const line of content.split('\n')) {
    const escaped = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
    streamLines.push(`1 0 0 1 40 ${y} Tm`)
    streamLines.push(`(${escaped}) Tj`)
    y -= lineHeight
    if (y < 40) break // Page limit
  }
  streamLines.push('ET')
  const streamContent = streamLines.join('\n')
  const streamBuf = Buffer.from(streamContent, 'utf-8')

  objects.push(
    Buffer.from(
      `4 0 obj\n<< /Length ${streamBuf.length} >>\nstream\n${streamContent}\nendstream\nendobj\n`,
    ),
  )

  // Object 5: Font
  objects.push(
    Buffer.from('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>\nendobj\n'),
  )

  // Assemble PDF
  const buffers: Buffer[] = [pdfHeader]
  let position = pdfHeader.length

  for (let i = 0; i < objects.length; i++) {
    offsets.push(position)
    buffers.push(objects[i])
    position += objects[i].length
  }

  // Cross-reference table
  const xrefOffset = position
  const xrefHeader = `xref\n0 ${objects.length + 1}\n`
  const xrefEntry = '0000000000 65535 f \n'
  const xrefEntries = objects
    .map((_, i) => `${String(offsets[i]).padStart(10, '0')} 00000 n \n`)
    .join('')

  buffers.push(Buffer.from(xrefHeader))
  buffers.push(Buffer.from(xrefEntry))
  buffers.push(Buffer.from(xrefEntries))

  // Trailer
  buffers.push(
    Buffer.from(
      `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`,
    ),
  )

  return Buffer.concat(buffers)
}

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
    const format = searchParams.get('format') ?? 'csv'
    const type = searchParams.get('type') ?? 'all'
    const status = searchParams.get('status') ?? 'all'

    const where: Record<string, unknown> = {}

    if (type !== 'all') {
      where.type = type
    }

    if (status === 'read') {
      where.isRead = true
    } else if (status === 'unread') {
      where.isRead = false
    }

    const leads = await db.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    if (format === 'pdf') {
      const pdfBuffer = buildSimplePdf(leads as unknown as Record<string, string | boolean | Date>[])
      return new NextResponse(new Uint8Array(pdfBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="leads.pdf"',
        },
      })
    }

    // Default: CSV
    const csv = buildCsv(leads as unknown as Record<string, string | boolean | Date>[])
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="leads.csv"',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to export leads' },
      { status: 500 },
    )
  }
}