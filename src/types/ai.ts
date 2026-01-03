export interface AIRequest {
  prompt?: string
  model?: string
}

export interface AISiteSpec {
  title?: string
  sections?: any[]
}

export type SiteGenerationRequest = {
  business: { name?: string; summary?: string }
  options?: { tone?: string; style?: string }
}

export type SiteGenerationResult = {
  pages: Array<{ slug: string; title: string; sections: any[] }>
  meta: { tone: string; style: string }
}

export type PageGenerationRequest = { page: any; context?: any }
export type PageGenerationResult = { page: any }

export type SectionGenerationRequest = { section: any; context?: any }
export type SectionGenerationResult = { section: any }

export type BrandGenerationRequest = { business: { name?: string } }
export type BrandGenerationResult = { name: string; tagline: string; tone: string; palette: string[] }

export type ContentGenerationRequest = { slot: string; context?: any }
export type ContentGenerationResult = { slot: string; text: string }
