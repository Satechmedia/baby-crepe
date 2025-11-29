import { NextRequest, NextResponse } from 'next/server'
import { isValidBscAddress, fetchAllTokenTransactions } from '@/app/lib/bscscan'
import { analyzeWallet, fetchTokenPrices } from '@/app/lib/walletAnalyzer'
import { WalletAnalysisResponse } from '@/app/types/wallet'

export async function POST(request: NextRequest): Promise<NextResponse<WalletAnalysisResponse>> {
  try {
    const body = await request.json()
    const { walletAddress } = body

    // Validate wallet address
    if (!walletAddress || !isValidBscAddress(walletAddress)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid BSC wallet address. Must be 0x followed by 40 hex characters.'
        },
        { status: 400 }
      )
    }

    // Get API key from environment (GoldRush/Covalent API)
    const apiKey = process.env.GOLDRUSH_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'GoldRush API key not configured. Please add GOLDRUSH_API_KEY to your .env.local file. Get a free key at https://goldrush.dev/'
        },
        { status: 500 }
      )
    }

    // Fetch all token transactions
    const transactions = await fetchAllTokenTransactions(walletAddress, apiKey)

    if (transactions.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          walletAddress,
          analyzedAt: new Date(),
          holdings: [],
          transactions: [],
          metrics: {
            totalRealizedGains: 0,
            totalRealizedLosses: 0,
            totalUnrealizedGains: 0,
            totalUnrealizedLosses: 0,
            paperHandScore: 0,
            diamondHandScore: 0,
            totalTransactions: 0,
            uniqueTokensTraded: 0,
            biggestMiss: null,
            bestHold: null
          },
          paperHandTokens: [],
          diamondHandTokens: []
        }
      })
    }

    // Get unique contract addresses
    const contractAddresses = [...new Set(transactions.map(tx => tx.contractAddress.toLowerCase()))]

    // Fetch current prices for tokens
    const prices = await fetchTokenPrices(contractAddresses)

    // Analyze wallet
    const analysis = await analyzeWallet(transactions, walletAddress, prices)

    return NextResponse.json({
      success: true,
      data: analysis
    })
  } catch (error) {
    console.error('Wallet analysis error:', error)

    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'

    // Handle specific BSCScan errors
    if (errorMessage.includes('rate limit') || errorMessage.includes('Max rate limit')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please wait a moment and try again.'
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage
      },
      { status: 500 }
    )
  }
}
