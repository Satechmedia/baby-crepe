import { NextRequest, NextResponse } from 'next/server'
import { isValidBscAddress, getTokenTransfers } from '@/app/lib/bscProvider'
import { analyzeWallet } from '@/app/lib/walletAnalyzer'
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

    console.log(`Starting wallet analysis for: ${walletAddress}`)

    // Fetch token transfers using Moralis API
    const transfers = await getTokenTransfers(walletAddress)

    if (transfers.length === 0) {
      console.log('No transfers found, returning empty analysis')
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

    console.log(`Found ${transfers.length} transfers, analyzing...`)

    // Analyze wallet using Moralis data (balances, profitability, etc.)
    const analysis = await analyzeWallet(transfers, walletAddress)

    console.log('Analysis complete!')
    return NextResponse.json({
      success: true,
      data: analysis
    })
  } catch (error) {
    console.error('Wallet analysis error:', error)

    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'

    // Handle Moralis API errors
    if (errorMessage.includes('MORALIS_API_KEY')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Moralis API key not configured. Please add MORALIS_API_KEY to your .env.local file.'
        },
        { status: 503 }
      )
    }

    if (errorMessage.includes('Rate limited')) {
      return NextResponse.json(
        {
          success: false,
          error: 'API rate limit reached. Please wait a moment and try again.'
        },
        { status: 429 }
      )
    }

    if (errorMessage.includes('Invalid Moralis API key')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid Moralis API key. Please check your MORALIS_API_KEY in .env.local'
        },
        { status: 401 }
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
