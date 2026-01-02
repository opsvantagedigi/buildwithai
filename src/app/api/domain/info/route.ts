import { NextResponse } from 'next/server'
import validation from '@/lib/validation'
import rdap from '@/lib/rdap'
import { getPricingData } from '@/app/api/domain/pricing/route'
import openprovider from '@/lib/openprovider'
import computeDomainHealth from '@/lib/domainHealth'
import { generateDomainRecommendations, enrichRecommendationsWithAvailability } from '@/lib/domainRecommend'
import { analyzeDns } from '@/lib/dnsDiagnostics'
import { scoreDomainSeo } from '@/lib/domainSeoScore'

async function handleDomainInfo(domain: string) {
  const tasks: any = {}
    tasks.rdap = rdap.fetchRdap(domain).then((d: any) => rdap.normalizeToCanonical(d)).catch((e: any) => ({ error: 'rdap_error', message: String(e?.message || e) }))
  tasks.pricing = getPricingData().catch((e: any) => ({ error: 'pricing_error', message: String(e?.message || e) }))

  // availability uses RDAP (no OpenProvider dependency)
  tasks.availability = tasks.rdap.then((r: any) => {
    if (r && r.registered !== undefined) return { available: !r.registered }
    return { available: null }
  }).catch(() => ({ available: null }))

  const [rdapRes, pricingRes, availabilityRes] = await Promise.all([tasks.rdap, tasks.pricing, tasks.availability])
  // ensure pricing has a consistent shape
  let pricingFinal: any = pricingRes
  function buildFallbackPricing(domain: string) {
    return {
      currency: 'USD',
      estimated: true,
      notes: 'Fallback pricing estimate based on TLD; final price shown at checkout.',
      items: [{ type: 'register', price: 15, periodYears: 1 }],
    }
  }
  if (!pricingFinal || (Array.isArray(pricingFinal) && pricingFinal.length === 0)) {
    pricingFinal = buildFallbackPricing(domain)
  }

  const health = rdapRes && !(rdapRes as any).error ? computeDomainHealth(rdapRes) : { score: null }
  const recommendations = await generateDomainRecommendations(domain)
  const recommendationsEnriched = await enrichRecommendationsWithAvailability(recommendations)
  const dnsDiagnostics = rdapRes && !(rdapRes as any).error ? analyzeDns(rdapRes) : []
  const seo = scoreDomainSeo(domain)

  const res = NextResponse.json({ success: true, domain, rdap: rdapRes, pricing: pricingFinal, availability: availabilityRes, health, recommendations: recommendationsEnriched, dnsDiagnostics, seo })
  // set short cache header for clients
  res.headers.set('Cache-Control', 'public, max-age=60, s-maxage=300')
  return res
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const parse = validation.DomainCheckSchema.safeParse(body)
  if (!parse.success) {
    return NextResponse.json({ success: false, error: 'invalid_payload', details: parse.error.format() }, { status: 400 })
  }
  const domain = parse.data.domain
    return handleDomainInfo(domain)
}

import { z } from 'zod'
import { checkRateLimit } from '@/lib/rate-limit'
import { getRequestIdHeader } from '@/lib/request-id'

const InfoQuerySchema = z.object({ name: z.string().min(1).max(255) })

export async function GET(request: Request) {
  const requestId = request.headers.get('x-request-id') ?? getRequestIdHeader()
  try {
    const url = new URL(request.url)
    const params = Object.fromEntries(url.searchParams.entries())
    const parsed = InfoQuerySchema.safeParse(params)
    if (!parsed.success) {
      console.warn('[api/domain/info] invalid query', { requestId, params })
      return NextResponse.json({ success: false, error: 'invalid_query', details: parsed.error.flatten() }, { status: 400 })
    }

    const clientIp = (request.headers.get('x-forwarded-for') || '').split(',')[0] || request.headers.get('x-real-ip') || 'unknown'
    const rl = await checkRateLimit(`domain:info:${clientIp}`, { windowMs: 5 * 60 * 1000, max: 60, prefix: 'rl' })
    if (!rl.allowed) {
      console.warn('[api/domain/info] rate limited', { requestId, clientIp })
      return NextResponse.json({ success: false, error: 'rate_limited', resetAt: rl.resetAt }, { status: 429 })
    }

    console.log('[api/domain/info] request', { requestId, query: parsed.data, clientIp })
    return await handleDomainInfo(parsed.data.name)
  } catch (err: any) {
    console.error('[api/domain/info] unexpected error', { requestId, err })
    return NextResponse.json({ success: false, error: 'internal', requestId }, { status: 500 })
  }
}

