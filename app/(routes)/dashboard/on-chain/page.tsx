'use client'

import React from 'react'
import { useWalletAnalysis } from '@/app/hooks/useWalletAnalysis'
import WalletInput from '@/app/components/WalletInput'
import AnalysisLoader from '@/app/components/AnalysisLoader'
import AnalysisSummaryCard from '@/app/components/AnalysisSummaryCard'
import TransactionHistoryTable from '@/app/components/TransactionHistoryTable'
import { RefreshCw } from 'lucide-react'

const OnChainPage = () => {
  const { status, data, error, progress, analyze, reset } = useWalletAnalysis()

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Wallet Analyzer
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Analyze any BSC wallet to discover paper hand moments and diamond hand wins
        </p>
      </div>

      {/* Wallet Input */}
      <div className="mb-10">
        <WalletInput
          onAnalyze={analyze}
          isLoading={status === 'loading'}
          error={status === 'error' ? error : null}
        />
      </div>

      {/* Loading State */}
      {status === 'loading' && <AnalysisLoader progress={progress} />}

      {/* Results */}
      {status === 'success' && data && (
        <div className="space-y-10">
          {/* Wallet Info & Reset */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F3E4D4] p-4 rounded-xl">
            <div>
              <p className="text-sm text-gray-600">Analyzing wallet:</p>
              <p className="font-mono text-sm md:text-base text-gray-800 break-all">
                {data.walletAddress}
              </p>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={16} />
              New Analysis
            </button>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#F3E4D4] p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-gray-800">{data.metrics.totalTransactions}</p>
              <p className="text-sm text-gray-600">Total Transactions</p>
            </div>
            <div className="bg-[#F3E4D4] p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-gray-800">{data.metrics.uniqueTokensTraded}</p>
              <p className="text-sm text-gray-600">Unique Tokens</p>
            </div>
            <div className="bg-[#F3E4D4] p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-orange-600">{data.metrics.paperHandScore}</p>
              <p className="text-sm text-gray-600">Paper Hand Score</p>
            </div>
            <div className="bg-[#F3E4D4] p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-green-600">{data.metrics.diamondHandScore}</p>
              <p className="text-sm text-gray-600">Diamond Hand Score</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
            <AnalysisSummaryCard
              type="paper_hand"
              data={data.paperHandTokens.length > 0 ? data.paperHandTokens[0] : null}
            />
            <AnalysisSummaryCard
              type="diamond_hand"
              data={data.diamondHandTokens.length > 0 ? data.diamondHandTokens[0] : null}
            />
          </div>

          {/* Transaction History */}
          <TransactionHistoryTable transactions={data.transactions} />
        </div>
      )}

      {/* Idle State - Show instructions */}
      {status === 'idle' && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Ready to Analyze
            </h2>
            <p className="text-gray-600 mb-6">
              Paste a BSC wallet address above to discover trading patterns,
              paper hand moments, and diamond hand wins.
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">📉</div>
                <h3 className="font-semibold text-orange-800">Paper Hands</h3>
                <p className="text-sm text-orange-600">
                  Tokens sold early that mooned later
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">💎</div>
                <h3 className="font-semibold text-green-800">Diamond Hands</h3>
                <p className="text-sm text-green-600">
                  Tokens held through volatility
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State with retry */}
      {status === 'error' && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto bg-red-50 p-6 rounded-xl">
            <div className="text-4xl mb-4">❌</div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Analysis Failed
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={reset}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OnChainPage
