export interface Release {
  version: string
  notes?: string
}

export type ReleaseSummary = {
  version: string
  title: string
  date: string
}

export type ReleaseDetail = {
  version: string
  title?: string
  date?: string
  summary?: string
  highlights?: string[]
}
