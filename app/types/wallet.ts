// Processed Transaction
export interface ProcessedTransaction {
  id: string
  hash: string
  type: 'BUY' | 'SELL'
  tokenSymbol: string
  tokenName: string
  contractAddress: string
  amount: number
  priceAtTime: number
  currentPrice: number
  date: Date
  profitLoss: number
  profitLossPercent: number
}

// Token Holding Summary
export interface TokenHolding {
  contractAddress: string
  tokenName: string
  tokenSymbol: string
  totalBought: number
  totalSold: number
  currentBalance: number
  avgBuyPrice: number
  avgSellPrice: number
  currentPrice: number
  firstBuyDate: Date | null
  lastActivityDate: Date | null
  transactions: ProcessedTransaction[]
}

// Paper Hand Analysis
export interface PaperHandAnalysis {
  tokenSymbol: string
  tokenName: string
  contractAddress: string
  soldAmount: number
  soldPrice: number
  currentWorth: number
  missedGains: number
  missedGainsPercent: number
  soldDate: Date
  roastMessage: string
  hashtags: string[]
}

// Diamond Hand Analysis
export interface DiamondHandAnalysis {
  tokenSymbol: string
  tokenName: string
  contractAddress: string
  heldAmount: number
  purchasePrice: number
  currentWorth: number
  unrealizedGains: number
  unrealizedGainsPercent: number
  holdDuration: number
  kudosMessage: string
  hashtags: string[]
}

// Analysis Metrics
export interface AnalysisMetrics {
  totalRealizedGains: number
  totalRealizedLosses: number
  totalUnrealizedGains: number
  totalUnrealizedLosses: number
  paperHandScore: number
  diamondHandScore: number
  totalTransactions: number
  uniqueTokensTraded: number
  biggestMiss: { token: string; amount: number } | null
  bestHold: { token: string; amount: number; percent: number } | null
}

// Main Wallet Analysis Response
export interface WalletAnalysis {
  walletAddress: string
  analyzedAt: Date
  holdings: TokenHolding[]
  transactions: ProcessedTransaction[]
  metrics: AnalysisMetrics
  paperHandTokens: PaperHandAnalysis[]
  diamondHandTokens: DiamondHandAnalysis[]
}

// API Request/Response
export interface WalletAnalysisRequest {
  walletAddress: string
}

export interface WalletAnalysisResponse {
  success: boolean
  data?: WalletAnalysis
  error?: string
}

// Analysis State
export type AnalysisStatus = 'idle' | 'loading' | 'success' | 'error'

export interface AnalysisProgress {
  step: string
  current: number
  total: number
}

export interface AnalysisState {
  status: AnalysisStatus
  data: WalletAnalysis | null
  error: string | null
  progress: AnalysisProgress
}

// Price Data
export interface TokenPrice {
  contractAddress: string
  price: number
  symbol: string
}
