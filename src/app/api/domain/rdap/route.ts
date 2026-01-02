import { NextResponse } from 'next/server'
import rdap from '@/lib/rdap'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const name = url.searchParams.get('name')
    if (!name) return NextResponse.json({ success: false, error: 'missing_name_query' }, { status: 400 })

    try {
      const raw = await rdap.fetchRdap(name)
      const normalized = rdap.normalizeToCanonical(raw)
      return NextResponse.json({ success: true, rdap: normalized })
    } catch (err: any) {
      return NextResponse.json({ success: false, error: 'rdap_error', message: String(err?.message || err) }, { status: 500 })
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'invalid_request', message: String(err?.message || err) }, { status: 400 })
  }
}
