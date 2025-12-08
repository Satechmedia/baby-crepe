'use client'

import React from 'react'
import { useMarketBettors, useUserBet, MarketData } from '@/app/hooks/usePredictionMarket'
import { formatEther } from 'viem'

interface BettorItemProps {
  marketId: number
  address: `0x${string}`
  market: MarketData
}

const BettorItem: React.FC<BettorItemProps> = ({ marketId, address, market }) => {
  const { bet, isLoading } = useUserBet(marketId, address)

  if (isLoading || !bet) {
    return (
      <div className="flex justify-between items-center py-2 border-b border-gray-200 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    )
  }

  const isWinner = market.resolved && bet.position === market.outcome
  const shortenedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`

  return (
    <div className={`flex justify-between items-center py-2 border-b border-gray-200 ${isWinner ? 'bg-green-50' : ''}`}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono">{shortenedAddress}</span>
        {isWinner && market.resolved && (
          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            Winner
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-medium ${bet.position ? 'text-green-600' : 'text-red-600'}`}>
          {bet.position ? 'YES' : 'NO'}
        </span>
        <span className="text-xs font-bold">{formatEther(bet.amount)} BNB</span>
        {bet.claimed && (
          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            Claimed
          </span>
        )}
      </div>
    </div>
  )
}

interface BettorsListProps {
  marketId: number
  market: MarketData
}

const BettorsList: React.FC<BettorsListProps> = ({ marketId, market }) => {
  const { data: bettors, isLoading, error } = useMarketBettors(marketId)

  if (isLoading) {
    return (
      <div className="bg-[#F3E4D4] rounded-2xl p-6">
        <h3 className="font-bold mb-4">Participants</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#F3E4D4] rounded-2xl p-6">
        <h3 className="font-bold mb-4">Participants</h3>
        <p className="text-sm text-red-600">Failed to load participants</p>
      </div>
    )
  }

  const bettorAddresses = bettors as `0x${string}`[] | undefined

  if (!bettorAddresses || bettorAddresses.length === 0) {
    return (
      <div className="bg-[#F3E4D4] rounded-2xl p-6">
        <h3 className="font-bold mb-4">Participants</h3>
        <p className="text-sm text-gray-500">No bets placed yet</p>
      </div>
    )
  }

  return (
    <div className="bg-[#F3E4D4] rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Participants ({bettorAddresses.length})</h3>
        {market.resolved && (
          <span className="text-xs text-gray-500">
            Outcome: <span className={market.outcome ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
              {market.outcome ? 'YES' : 'NO'}
            </span>
          </span>
        )}
      </div>

      {/* Table Header */}
      <div className="flex justify-between items-center py-2 border-b-2 border-gray-300 text-xs font-semibold text-gray-600">
        <span>Address</span>
        <div className="flex items-center gap-3">
          <span>Position</span>
          <span>Amount</span>
        </div>
      </div>

      {/* Bettors List */}
      <div className="max-h-64 overflow-y-auto">
        {bettorAddresses.map((address) => (
          <BettorItem
            key={address}
            marketId={marketId}
            address={address}
            market={market}
          />
        ))}
      </div>

      {/* Summary */}
      {market.resolved && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-xs text-gray-500">
            Winners are highlighted in green and can claim their winnings.
          </p>
        </div>
      )}
    </div>
  )
}

export default BettorsList
