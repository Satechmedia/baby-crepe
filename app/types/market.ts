export interface MarketOutcome {
  date: string
  change: string
}

export interface MarketItem {
  id: number
  title: string
  description: string
  chance: number
  volume: string
  votes: number
  category: string
  slug: string
  outcomes: MarketOutcome[]
}
