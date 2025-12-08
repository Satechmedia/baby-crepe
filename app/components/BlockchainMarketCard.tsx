'use client'

import React from 'react'
import Link from 'next/link'
import ChanceGauge from './ChanceGauge'
import {
  useMarket,
  useMarketOdds,
  formatPrice,
  calculateYesPercentage,
  getMarketStatus,
  formatTimeRemaining,
} from '@/app/hooks/usePredictionMarket'
import { formatEther } from 'viem'

interface BlockchainMarketCardProps {
  marketId: number
  statusFilter?: string
  searchTerm?: string
}

const BlockchainMarketCard: React.FC<BlockchainMarketCardProps> = ({
  marketId,
  statusFilter = 'All',
  searchTerm = ''
}) => {
  const { market, isLoading, error } = useMarket(marketId)
  const { odds } = useMarketOdds(marketId)

  if (isLoading) {
    return (
      <div className="border border-neutral-200 bg-[#F3E4D4] rounded-2xl p-4 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="flex gap-2 mb-3">
          <div className="flex-1 h-8 bg-gray-300 rounded"></div>
          <div className="flex-1 h-8 bg-gray-300 rounded"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    )
  }

  if (error || !market) {
    return null // Hide errored markets instead of showing error card
  }

  const status = getMarketStatus(market)

  // Apply status filter
  if (statusFilter !== 'All' && status.toLowerCase() !== statusFilter.toLowerCase()) {
    return null
  }

  // Apply search filter
  if (searchTerm && !market.question.toLowerCase().includes(searchTerm.toLowerCase())) {
    return null
  }

  const yesPercentage = calculateYesPercentage(market.totalYesStake, market.totalNoStake)
  const totalVolume = market.totalYesStake + market.totalNoStake
  const timeRemaining = formatTimeRemaining(market.deadline)
  const targetPriceFormatted = formatPrice(market.targetPrice)

  // Format odds for display (10000 = 1x, 20000 = 2x)
  const yesOddsFormatted = odds ? (Number(odds.yesOdds) / 10000).toFixed(2) : '1.00'
  const noOddsFormatted = odds ? (Number(odds.noOdds) / 10000).toFixed(2) : '1.00'

  return (
    <Link
      href={`/dashboard/market/${marketId}`}
      className="border border-neutral-200 bg-[#F3E4D4] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all block"
    >
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
            status === 'open'
              ? 'bg-green-100 text-green-700'
              : status === 'closed'
              ? 'bg-yellow-100 text-yellow-700'
              : status === 'resolved'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        {status === 'open' && (
          <span className="text-[10px] text-gray-500">{timeRemaining}</span>
        )}
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <h3
            className="font-bold text-xs md:text-sm mb-1 line-clamp-2"
            title={market.question}
          >
            {market.question} <span className="text-gray-900">${targetPriceFormatted}</span>
          </h3>
          <p className="text-[10px] md:text-xs text-gray-600 mb-2">
            Target: ${targetPriceFormatted}
          </p>
        </div>

        {/* Gauge */}
        <div className="flex flex-col items-center relative w-16">
          <div className="absolute top-3 left-0">
            <ChanceGauge percentage={yesPercentage} />
            <span className="text-[10px] md:text-xs font-semibold absolute top-4 left-4 md:left-3 flex flex-col items-center">
              {yesPercentage}%{' '}
              <span className="font-normal text-[8px] md:text-[10px]">
                Yes
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Betting Buttons with Odds */}
      <div className="flex gap-2 mb-3 mt-2">
        <button
          className={`flex-1 py-1.5 rounded-md text-[10px] md:text-xs font-medium flex flex-col items-center ${
            status === 'open'
              ? 'bg-[#C2EAC7] text-green-700 hover:bg-[#a8ddb0]'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          disabled={status !== 'open'}
        >
          <span>Yes</span>
          <span className="text-[8px] opacity-75">{yesOddsFormatted}x</span>
        </button>

        <button
          className={`flex-1 py-1.5 rounded-md text-[10px] md:text-xs font-medium flex flex-col items-center ${
            status === 'open'
              ? 'bg-[#F6ADA1] text-red-700 hover:bg-[#f09485]'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          disabled={status !== 'open'}
        >
          <span>No</span>
          <span className="text-[8px] opacity-75">{noOddsFormatted}x</span>
        </button>
      </div>

      {/* Volume and Stakes */}
      <div className="flex justify-between text-[10px] md:text-xs text-gray-600">
        <span>{formatEther(totalVolume)} BNB</span>
        <span>
          {formatEther(market.totalYesStake)} Yes / {formatEther(market.totalNoStake)} No
        </span>
      </div>

      {/* Resolution Info */}
      {market.resolved && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-[10px] text-center font-medium">
            Result:{' '}
            <span className={market.outcome ? 'text-green-600' : 'text-red-600'}>
              {market.outcome ? 'YES' : 'NO'}
            </span>
          </p>
        </div>
      )}
    </Link>
  )
}

export default BlockchainMarketCard
