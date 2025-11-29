import {
  TokenTransfer,
  TokenBalance,
  TokenProfitability,
  getTokenBalances,
  getWalletProfitability
} from './bscProvider'
import {
  TokenHolding,
  ProcessedTransaction,
  PaperHandAnalysis,
  DiamondHandAnalysis,
  AnalysisMetrics,
  WalletAnalysis
} from '@/app/types/wallet'
import { generateRoast, generateKudos } from './roastGenerator'

// Group transfers by token contract
function groupByToken(transfers: TokenTransfer[]): Map<string, TokenTransfer[]> {
  const grouped = new Map<string, TokenTransfer[]>()

  for (const tx of transfers) {
    const key = tx.contractAddress.toLowerCase()
    if (!grouped.has(key)) {
      grouped.set(key, [])
    }
    grouped.get(key)!.push(tx)
  }

  return grouped
}

// Calculate token holdings from transfers with Moralis data
function calculateHoldings(
  transfers: TokenTransfer[],
  walletAddress: string,
  balances: TokenBalance[],
  profitability: TokenProfitability[]
): TokenHolding[] {
  const grouped = groupByToken(transfers)
  const holdings: TokenHolding[] = []
  const walletLower = walletAddress.toLowerCase()

  // Create lookup maps for quick access
  const balanceMap = new Map<string, TokenBalance>()
  for (const b of balances) {
    balanceMap.set(b.tokenAddress.toLowerCase(), b)
  }

  const profitMap = new Map<string, TokenProfitability>()
  for (const p of profitability) {
    profitMap.set(p.tokenAddress.toLowerCase(), p)
  }

  for (const [contractAddress, txs] of grouped) {
    let totalBought = 0
    let totalSold = 0
    let firstBuyDate: Date | null = null
    let lastActivityDate: Date | null = null
    const processedTxs: ProcessedTransaction[] = []

    const tokenName = txs[0]?.tokenName || 'Unknown'
    const tokenSymbol = txs[0]?.tokenSymbol || 'UNKNOWN'

    // Get price from balance data (Moralis provides USD prices)
    const balance = balanceMap.get(contractAddress.toLowerCase())
    const profit = profitMap.get(contractAddress.toLowerCase())
    const currentPrice = balance?.usdPrice || 0
    const avgBuyPrice = profit?.avgBuyPriceUsd || 0
    const avgSellPrice = profit?.avgSellPriceUsd || 0

    for (const tx of txs) {
      const amount = tx.formattedValue
      const date = new Date(tx.timestamp * 1000)
      const isBuy = tx.to.toLowerCase() === walletLower
      const isSell = tx.from.toLowerCase() === walletLower

      if (!lastActivityDate || date > lastActivityDate) {
        lastActivityDate = date
      }

      if (isBuy) {
        totalBought += amount
        if (!firstBuyDate) {
          firstBuyDate = date
        }

        processedTxs.push({
          id: tx.txHash,
          hash: tx.txHash,
          type: 'BUY',
          tokenSymbol,
          tokenName,
          contractAddress,
          amount,
          priceAtTime: avgBuyPrice,
          currentPrice,
          date,
          profitLoss: 0,
          profitLossPercent: 0
        })
      } else if (isSell) {
        totalSold += amount

        processedTxs.push({
          id: tx.txHash,
          hash: tx.txHash,
          type: 'SELL',
          tokenSymbol,
          tokenName,
          contractAddress,
          amount,
          priceAtTime: avgSellPrice,
          currentPrice,
          date,
          profitLoss: 0,
          profitLossPercent: 0
        })
      }
    }

    // Use balance from Moralis if available, otherwise calculate
    const currentBalance = balance?.balanceFormatted || Math.max(0, totalBought - totalSold)

    holdings.push({
      contractAddress,
      tokenName,
      tokenSymbol,
      totalBought: profit?.totalTokensBought || totalBought,
      totalSold: profit?.totalTokensSold || totalSold,
      currentBalance,
      avgBuyPrice,
      avgSellPrice,
      currentPrice,
      firstBuyDate,
      lastActivityDate,
      transactions: processedTxs
    })
  }

  return holdings
}

// Identify paper hand tokens using Moralis profitability data
function identifyPaperHands(
  holdings: TokenHolding[],
  profitability: TokenProfitability[],
  balances: TokenBalance[]
): PaperHandAnalysis[] {
  const paperHands: PaperHandAnalysis[] = []

  // Create balance lookup for current prices
  const balanceMap = new Map<string, TokenBalance>()
  for (const b of balances) {
    balanceMap.set(b.tokenAddress.toLowerCase(), b)
  }

  for (const profit of profitability) {
    // Paper hand = sold tokens at a loss (negative realized profit)
    if (profit.totalTokensSold > 0 && profit.realizedProfitUsd < 0) {
      const balance = balanceMap.get(profit.tokenAddress.toLowerCase())
      const currentPrice = balance?.usdPrice || 0

      // Calculate what those sold tokens would be worth now
      const currentWorthOfSold = profit.totalTokensSold * currentPrice
      const soldFor = profit.totalSoldUsd
      const missedGains = Math.max(0, currentWorthOfSold - soldFor)

      if (missedGains > 1) { // Only show if missed gains > $1
        const holding = holdings.find(h =>
          h.contractAddress.toLowerCase() === profit.tokenAddress.toLowerCase()
        )

        const soldDate = holding?.transactions
          .filter(tx => tx.type === 'SELL')
          .sort((a, b) => b.date.getTime() - a.date.getTime())[0]?.date || new Date()

        paperHands.push({
          tokenSymbol: profit.symbol,
          tokenName: profit.name,
          contractAddress: profit.tokenAddress,
          soldAmount: profit.totalTokensSold,
          soldPrice: soldFor,
          currentWorth: currentWorthOfSold,
          missedGains,
          missedGainsPercent: soldFor > 0 ? (missedGains / soldFor) * 100 : 0,
          soldDate,
          roastMessage: generateRoast({
            tokenSymbol: profit.symbol,
            soldPrice: soldFor,
            currentWorth: currentWorthOfSold,
            missedGains
          }),
          hashtags: ['#BabyCREPE', '#PaperHands', '#BSC', `#${profit.symbol}`]
        })
      }
    }
  }

  // Also check holdings without profitability data
  for (const holding of holdings) {
    const hasProfitData = profitability.some(p =>
      p.tokenAddress.toLowerCase() === holding.contractAddress.toLowerCase()
    )

    if (!hasProfitData && holding.totalSold > 0 && holding.currentPrice > 0) {
      const currentWorthOfSold = holding.totalSold * holding.currentPrice
      const estimatedSoldPrice = holding.avgSellPrice > 0
        ? holding.totalSold * holding.avgSellPrice
        : currentWorthOfSold * 0.5
      const missedGains = Math.max(0, currentWorthOfSold - estimatedSoldPrice)

      if (missedGains > 1) {
        const soldDate = holding.transactions
          .filter(tx => tx.type === 'SELL')
          .sort((a, b) => b.date.getTime() - a.date.getTime())[0]?.date || new Date()

        paperHands.push({
          tokenSymbol: holding.tokenSymbol,
          tokenName: holding.tokenName,
          contractAddress: holding.contractAddress,
          soldAmount: holding.totalSold,
          soldPrice: estimatedSoldPrice,
          currentWorth: currentWorthOfSold,
          missedGains,
          missedGainsPercent: estimatedSoldPrice > 0 ? (missedGains / estimatedSoldPrice) * 100 : 0,
          soldDate,
          roastMessage: generateRoast({
            tokenSymbol: holding.tokenSymbol,
            soldPrice: estimatedSoldPrice,
            currentWorth: currentWorthOfSold,
            missedGains
          }),
          hashtags: ['#BabyCREPE', '#PaperHands', '#BSC', `#${holding.tokenSymbol}`]
        })
      }
    }
  }

  return paperHands.sort((a, b) => b.missedGains - a.missedGains)
}

// Identify diamond hand tokens using Moralis balance data
function identifyDiamondHands(
  holdings: TokenHolding[],
  balances: TokenBalance[],
  profitability: TokenProfitability[]
): DiamondHandAnalysis[] {
  const diamondHands: DiamondHandAnalysis[] = []
  const now = new Date()

  // Create profit lookup
  const profitMap = new Map<string, TokenProfitability>()
  for (const p of profitability) {
    profitMap.set(p.tokenAddress.toLowerCase(), p)
  }

  // Check balances for held tokens with positive value
  for (const balance of balances) {
    if (balance.balanceFormatted <= 0 || balance.usdValue <= 0) continue

    const holding = holdings.find(h =>
      h.contractAddress.toLowerCase() === balance.tokenAddress.toLowerCase()
    )
    const profit = profitMap.get(balance.tokenAddress.toLowerCase())

    const holdDuration = holding?.firstBuyDate
      ? Math.floor((now.getTime() - holding.firstBuyDate.getTime()) / (1000 * 60 * 60 * 24))
      : 7 // Default to 7 days if no history

    // Diamond hand = holding tokens with value > $1 for at least 7 days
    if (balance.usdValue > 1 && holdDuration >= 7) {
      const purchasePrice = profit?.totalUsdInvested || balance.usdValue * 0.5
      const unrealizedGains = balance.usdValue - purchasePrice
      const unrealizedGainsPercent = purchasePrice > 0
        ? (unrealizedGains / purchasePrice) * 100
        : 0

      diamondHands.push({
        tokenSymbol: balance.symbol,
        tokenName: balance.name,
        contractAddress: balance.tokenAddress,
        heldAmount: balance.balanceFormatted,
        purchasePrice,
        currentWorth: balance.usdValue,
        unrealizedGains,
        unrealizedGainsPercent,
        holdDuration,
        kudosMessage: generateKudos({
          tokenSymbol: balance.symbol,
          holdDuration,
          unrealizedGains,
          unrealizedGainsPercent
        }),
        hashtags: ['#BabyCREPE', '#DiamondHands', '#HODL', `#${balance.symbol}`]
      })
    }
  }

  return diamondHands.sort((a, b) => b.unrealizedGains - a.unrealizedGains)
}

// Calculate overall metrics using Moralis data
function calculateMetrics(
  holdings: TokenHolding[],
  paperHands: PaperHandAnalysis[],
  diamondHands: DiamondHandAnalysis[],
  profitability: TokenProfitability[]
): AnalysisMetrics {
  let totalRealizedGains = 0
  let totalRealizedLosses = 0
  let totalUnrealizedGains = 0
  let totalUnrealizedLosses = 0
  let totalTransactions = 0
  const uniqueTokens = new Set<string>()

  // Use Moralis profitability for accurate realized PnL
  for (const profit of profitability) {
    uniqueTokens.add(profit.tokenAddress)
    totalTransactions += profit.countOfTrades

    if (profit.realizedProfitUsd > 0) {
      totalRealizedGains += profit.realizedProfitUsd
    } else {
      totalRealizedLosses += Math.abs(profit.realizedProfitUsd)
    }
  }

  // Add holdings not in profitability
  for (const holding of holdings) {
    uniqueTokens.add(holding.contractAddress)
    if (!profitability.some(p => p.tokenAddress.toLowerCase() === holding.contractAddress.toLowerCase())) {
      totalTransactions += holding.transactions.length
    }
  }

  // Calculate unrealized from diamond hands
  for (const dh of diamondHands) {
    if (dh.unrealizedGains > 0) {
      totalUnrealizedGains += dh.unrealizedGains
    } else {
      totalUnrealizedLosses += Math.abs(dh.unrealizedGains)
    }
  }

  // Calculate scores
  const totalMissed = paperHands.reduce((sum, ph) => sum + ph.missedGains, 0)
  const totalHeld = diamondHands.reduce((sum, dh) => sum + Math.max(0, dh.unrealizedGains), 0)
  const total = totalMissed + totalHeld

  const paperHandScore = total > 0 ? Math.min(100, Math.round((totalMissed / total) * 100)) : 0
  const diamondHandScore = total > 0 ? Math.min(100, Math.round((totalHeld / total) * 100)) : 0

  const biggestMiss = paperHands.length > 0
    ? { token: paperHands[0].tokenSymbol, amount: paperHands[0].missedGains }
    : null

  const bestHold = diamondHands.length > 0
    ? {
        token: diamondHands[0].tokenSymbol,
        amount: diamondHands[0].unrealizedGains,
        percent: diamondHands[0].unrealizedGainsPercent
      }
    : null

  return {
    totalRealizedGains,
    totalRealizedLosses,
    totalUnrealizedGains,
    totalUnrealizedLosses,
    paperHandScore,
    diamondHandScore,
    totalTransactions,
    uniqueTokensTraded: uniqueTokens.size,
    biggestMiss,
    bestHold
  }
}

// Get all transactions as a flat list
function getAllTransactions(holdings: TokenHolding[]): ProcessedTransaction[] {
  const allTxs: ProcessedTransaction[] = []

  for (const holding of holdings) {
    allTxs.push(...holding.transactions)
  }

  return allTxs.sort((a, b) => b.date.getTime() - a.date.getTime())
}

// Main analysis function - now uses Moralis data
export async function analyzeWallet(
  transfers: TokenTransfer[],
  walletAddress: string
): Promise<WalletAnalysis> {
  console.log('Fetching additional Moralis data for analysis...')

  // Fetch token balances with prices and profitability data in parallel
  const [balances, profitability] = await Promise.all([
    getTokenBalances(walletAddress),
    getWalletProfitability(walletAddress, 'all')
  ])

  const holdings = calculateHoldings(transfers, walletAddress, balances, profitability)
  const paperHandTokens = identifyPaperHands(holdings, profitability, balances)
  const diamondHandTokens = identifyDiamondHands(holdings, balances, profitability)
  const metrics = calculateMetrics(holdings, paperHandTokens, diamondHandTokens, profitability)
  const allTransactions = getAllTransactions(holdings)

  return {
    walletAddress,
    analyzedAt: new Date(),
    holdings,
    transactions: allTransactions,
    metrics,
    paperHandTokens,
    diamondHandTokens
  }
}
