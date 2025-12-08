'use client'
import React, { useState } from 'react'
import BlockchainMarketCard from '@/app/components/BlockchainMarketCard'
import { useMarketCount, useLatestPrice, formatPrice } from '@/app/hooks/usePredictionMarket'
import { useWallet } from '@/app/hooks/useWallet'

const statusFilters = ['All', 'Open', 'Closed', 'Resolved', 'Cancelled']

const MarketPage = () => {
  const [activeStatus, setActiveStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const { isConnected } = useWallet()

  const { data: marketCount, isLoading: isLoadingCount } = useMarketCount()
  const { data: latestPrice, isLoading: isLoadingPrice } = useLatestPrice()

  const count = marketCount ? Number(marketCount) : 0

  // Generate array of market IDs in reverse order (latest first)
  const marketIds = Array.from({ length: count }, (_, i) => count - 1 - i)

  return (
    <div>
      {/* BNB Price Banner */}
      <div className="bg-gradient-to-r from-[#F0B90B] to-[#D4A574] rounded-xl p-4 mb-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">BNB Price Prediction Market</h2>
            <p className="text-sm opacity-90">
              Predict BNB price movements and win rewards
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-75">Current BNB Price</p>
            <p className="text-2xl font-bold">
              {isLoadingPrice ? (
                <span className="animate-pulse">Loading...</span>
              ) : latestPrice ? (
                `$${formatPrice(latestPrice)}`
              ) : (
                '$--'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Connection Warning */}
      {!isConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-yellow-800">
            Connect your wallet to place bets on prediction markets
          </p>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-20 mb-6 items-center">
        <input
          type="text"
          placeholder="Search markets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-[#F3E4D4] border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="w-full md:w-1/2 flex gap-2 md:flex-wrap overflow-auto scrollbar-hide">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-6 py-1 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
                activeStatus === status
                  ? 'bg-orange-400 text-white'
                  : 'text-gray-700 hover:bg-button-bg/30 border border-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Market Stats */}
      <div className="flex gap-4 mb-4 text-sm">
        <div className="bg-[#F3E4D4] rounded-lg px-4 py-2">
          <span className="text-gray-600">Total Markets: </span>
          <span className="font-semibold">
            {isLoadingCount ? '...' : count}
          </span>
        </div>
      </div>

      {/* Cards */}
      {isLoadingCount ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-neutral-200 bg-[#F3E4D4] rounded-2xl p-4 shadow-sm animate-pulse"
            >
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="flex gap-2 mb-3">
                <div className="flex-1 h-8 bg-gray-300 rounded"></div>
                <div className="flex-1 h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : count === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-semibold mb-2">No Markets Yet</h3>
          <p className="text-gray-600 text-sm">
            No prediction markets have been created yet. Check back later!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
          {marketIds.map((id) => (
            <BlockchainMarketCard
              key={id}
              marketId={id}
              statusFilter={activeStatus}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MarketPage
