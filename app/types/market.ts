export interface MarketOutcome {
  date: string
  change: string
}

// Legacy mock market item (for reference)
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

// Blockchain market data
export interface BlockchainMarket {
  id: number
  question: string
  targetPrice: bigint
  deadline: bigint
  resolutionTime: bigint
  totalYesStake: bigint
  totalNoStake: bigint
  resolved: boolean
  outcome: boolean
  cancelled: boolean
}

// User bet data
export interface UserBet {
  amount: bigint
  position: boolean // true = YES, false = NO
  claimed: boolean
}

// Market odds (in basis points, 10000 = 1x)
export interface MarketOdds {
  yesOdds: bigint
  noOdds: bigint
}

// Market status
export type MarketStatus = 'open' | 'closed' | 'resolved' | 'cancelled'

// Formatted market for display
export interface FormattedMarket {
  id: number
  question: string
  targetPrice: string // Formatted price (e.g., "$650.00")
  targetPriceRaw: bigint
  deadline: Date
  deadlineFormatted: string
  resolutionTime: Date
  resolutionFormatted: string
  totalYesStake: string // In BNB
  totalNoStake: string // In BNB
  totalVolume: string // In BNB
  yesPercentage: number // 0-100
  noPercentage: number // 0-100
  resolved: boolean
  outcome: boolean
  cancelled: boolean
  status: MarketStatus
  timeRemaining: string
}
