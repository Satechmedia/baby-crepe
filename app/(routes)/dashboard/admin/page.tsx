'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { formatEther } from 'viem'
import { useAdmin } from '@/app/hooks/useAdmin'
import { useWallet } from '@/app/hooks/useWallet'
import {
  useMarketCount,
  useMarket,
  useLatestPrice,
  useMinBet,
  usePlatformFee,
  useCreateMarket,
  useCancelMarket,
  useResolveMarket,
  useResolveMarketManually,
  useSetPlatformFee,
  useSetMinBet,
  useWithdrawFees,
  formatPrice,
  getMarketStatus,
} from '@/app/hooks/usePredictionMarket'
import { FaPlus, FaTimes, FaCheck, FaCog, FaWallet } from 'react-icons/fa'

// Market Management Card Component
function MarketManagementCard({ marketId, onRefresh }: { marketId: number; onRefresh: () => void }) {
  const { market, isLoading, refetch } = useMarket(marketId)
  const { cancelMarket, isPending: isCancelling, isSuccess: cancelSuccess } = useCancelMarket()
  const { resolveMarket, isPending: isResolving, isSuccess: resolveSuccess } = useResolveMarket()
  const { resolveMarketManually, isPending: isResolvingManually, isSuccess: resolveManualSuccess } = useResolveMarketManually()

  const [showManualResolve, setShowManualResolve] = useState(false)

  useEffect(() => {
    if (cancelSuccess || resolveSuccess || resolveManualSuccess) {
      refetch()
      onRefresh()
    }
  }, [cancelSuccess, resolveSuccess, resolveManualSuccess, refetch, onRefresh])

  if (isLoading || !market) {
    return (
      <div className="bg-white rounded-lg p-4 shadow animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    )
  }

  const status = getMarketStatus(market)
  const canCancel = !market.resolved && !market.cancelled
  const canResolve = status === 'closed' && Date.now() / 1000 >= Number(market.resolutionTime)

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold text-gray-500">Market #{marketId}</span>
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
          {status.toUpperCase()}
        </span>
      </div>

      <h4 className="font-semibold text-sm mb-2 line-clamp-2">{market.question}</h4>

      <div className="text-xs text-gray-600 space-y-1 mb-3">
        <p>Target: ${formatPrice(market.targetPrice)}</p>
        <p>Volume: {formatEther(market.totalYesStake + market.totalNoStake)} BNB</p>
        <p>Deadline: {new Date(Number(market.deadline) * 1000).toLocaleString()}</p>
      </div>

      {market.resolved && (
        <p className="text-xs mb-3">
          Result: <span className={market.outcome ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
            {market.outcome ? 'YES' : 'NO'}
          </span>
        </p>
      )}

      <div className="flex gap-2 flex-wrap">
        {canCancel && (
          <button
            onClick={() => cancelMarket(marketId)}
            disabled={isCancelling}
            className="text-xs px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
          >
            {isCancelling ? 'Cancelling...' : 'Cancel'}
          </button>
        )}

        {canResolve && (
          <>
            <button
              onClick={() => resolveMarket(marketId)}
              disabled={isResolving}
              className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
            >
              {isResolving ? 'Resolving...' : 'Auto Resolve'}
            </button>
            <button
              onClick={() => setShowManualResolve(!showManualResolve)}
              className="text-xs px-3 py-1.5 bg-orange-100 text-orange-700 rounded hover:bg-orange-200"
            >
              Manual
            </button>
          </>
        )}
      </div>

      {showManualResolve && canResolve && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Manually set outcome:</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                resolveMarketManually(marketId, true)
                setShowManualResolve(false)
              }}
              disabled={isResolvingManually}
              className="flex-1 text-xs px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              YES Wins
            </button>
            <button
              onClick={() => {
                resolveMarketManually(marketId, false)
                setShowManualResolve(false)
              }}
              disabled={isResolvingManually}
              className="flex-1 text-xs px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              NO Wins
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminPage() {
  const router = useRouter()
  const { isConnected, connect, address } = useWallet()
  const { isAdmin, isContractOwner, isLoading: isLoadingAdmin } = useAdmin()

  const { data: marketCount, refetch: refetchCount } = useMarketCount()
  const { data: latestPrice } = useLatestPrice()
  const { data: minBet, refetch: refetchMinBet } = useMinBet()
  const { data: platformFee, refetch: refetchFee } = usePlatformFee()

  // Create Market State
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newMarket, setNewMarket] = useState({
    question: '',
    targetPrice: '',
    bettingDeadline: '',
    resolutionTime: '',
  })

  // Settings State
  const [showSettings, setShowSettings] = useState(false)
  const [newMinBet, setNewMinBet] = useState('')
  const [newFee, setNewFee] = useState('')

  // Hooks for admin actions
  const { createMarket, isPending: isCreating, isSuccess: createSuccess, error: createError } = useCreateMarket()
  const { setPlatformFee, isPending: isSettingFee, isSuccess: feeSuccess } = useSetPlatformFee()
  const { setMinBet, isPending: isSettingMinBet, isSuccess: minBetSuccess } = useSetMinBet()
  const { withdrawFees, isPending: isWithdrawing, isSuccess: withdrawSuccess } = useWithdrawFees()

  // Refresh after successful actions
  useEffect(() => {
    if (createSuccess) {
      setShowCreateForm(false)
      setNewMarket({ question: '', targetPrice: '', bettingDeadline: '', resolutionTime: '' })
      refetchCount()
    }
  }, [createSuccess, refetchCount])

  useEffect(() => {
    if (feeSuccess) refetchFee()
    if (minBetSuccess) refetchMinBet()
  }, [feeSuccess, minBetSuccess, refetchFee, refetchMinBet])

  const handleCreateMarket = () => {
    if (!newMarket.question || !newMarket.targetPrice || !newMarket.bettingDeadline || !newMarket.resolutionTime) {
      return
    }

    const deadlineTimestamp = Math.floor(new Date(newMarket.bettingDeadline).getTime() / 1000)
    const resolutionTimestamp = Math.floor(new Date(newMarket.resolutionTime).getTime() / 1000)

    createMarket(newMarket.question, newMarket.targetPrice, deadlineTimestamp, resolutionTimestamp)
  }

  // Loading state
  if (isLoadingAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    )
  }

  // Not connected
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-[#F3E4D4] rounded-2xl p-8 max-w-md">
          <FaWallet className="text-4xl text-orange-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Connect Wallet</h2>
          <p className="text-gray-600 mb-4">Please connect your wallet to access the admin panel.</p>
          <button
            onClick={connect}
            className="bg-button-bg text-white px-6 py-2 rounded-full font-semibold hover:bg-button-bg/80"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    )
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md">
          <FaTimes className="text-4xl text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2 text-red-800">Access Denied</h2>
          <p className="text-red-600 mb-4">
            Your wallet address is not authorized to access the admin panel.
          </p>
          <p className="text-xs text-gray-500 break-all">
            Connected: {address}
          </p>
        </div>
      </div>
    )
  }

  const count = marketCount ? Number(marketCount) : 0
  const marketIds = Array.from({ length: count }, (_, i) => i).reverse() // Show newest first

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-600">
            {isContractOwner ? 'Contract Owner' : 'Admin'} • {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            <FaCog /> Settings
          </button>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 px-4 py-2 bg-button-bg text-white rounded-lg hover:bg-button-bg/80"
          >
            <FaPlus /> Create Market
          </button>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#F3E4D4] rounded-xl p-4">
          <p className="text-xs text-gray-500">Total Markets</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
        <div className="bg-[#F3E4D4] rounded-xl p-4">
          <p className="text-xs text-gray-500">BNB Price</p>
          <p className="text-2xl font-bold">${latestPrice ? formatPrice(latestPrice) : '--'}</p>
        </div>
        <div className="bg-[#F3E4D4] rounded-xl p-4">
          <p className="text-xs text-gray-500">Min Bet</p>
          <p className="text-2xl font-bold">{minBet ? formatEther(minBet) : '--'} BNB</p>
        </div>
        <div className="bg-[#F3E4D4] rounded-xl p-4">
          <p className="text-xs text-gray-500">Platform Fee</p>
          <p className="text-2xl font-bold">{platformFee ? Number(platformFee) / 100 : '--'}%</p>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && isContractOwner && (
        <div className="bg-[#F3E4D4] rounded-2xl p-6 mb-6">
          <h3 className="font-bold mb-4">Contract Settings (Owner Only)</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Set Min Bet */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Minimum Bet (BNB)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.001"
                  value={newMinBet}
                  onChange={(e) => setNewMinBet(e.target.value)}
                  placeholder="0.01"
                  className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm"
                />
                <button
                  onClick={() => setMinBet(newMinBet)}
                  disabled={isSettingMinBet || !newMinBet}
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
                >
                  {isSettingMinBet ? '...' : 'Set'}
                </button>
              </div>
            </div>

            {/* Set Platform Fee */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Platform Fee (%)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  max="10"
                  value={newFee}
                  onChange={(e) => setNewFee(e.target.value)}
                  placeholder="2"
                  className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm"
                />
                <button
                  onClick={() => setPlatformFee(Math.floor(parseFloat(newFee) * 100))}
                  disabled={isSettingFee || !newFee}
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
                >
                  {isSettingFee ? '...' : 'Set'}
                </button>
              </div>
            </div>

            {/* Withdraw Fees */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Withdraw Fees</label>
              <button
                onClick={() => withdrawFees()}
                disabled={isWithdrawing}
                className="w-full px-4 py-2 bg-green-600 text-white rounded text-sm disabled:opacity-50"
              >
                {isWithdrawing ? 'Withdrawing...' : 'Withdraw All Fees'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Market Form */}
      {showCreateForm && (
        <div className="bg-[#F3E4D4] rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Create New Market</h3>
            <button onClick={() => setShowCreateForm(false)} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Question</label>
              <input
                type="text"
                value={newMarket.question}
                onChange={(e) => setNewMarket({ ...newMarket, question: e.target.value })}
                placeholder="Will BNB reach $700 by end of month?"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Target Price (USD)</label>
                <input
                  type="number"
                  value={newMarket.targetPrice}
                  onChange={(e) => setNewMarket({ ...newMarket, targetPrice: e.target.value })}
                  placeholder="700"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">Betting Deadline</label>
                <input
                  type="datetime-local"
                  value={newMarket.bettingDeadline}
                  onChange={(e) => setNewMarket({ ...newMarket, bettingDeadline: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">Resolution Time</label>
                <input
                  type="datetime-local"
                  value={newMarket.resolutionTime}
                  onChange={(e) => setNewMarket({ ...newMarket, resolutionTime: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                />
              </div>
            </div>

            {createError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs text-red-600">{createError.message || 'Failed to create market'}</p>
              </div>
            )}

            <button
              onClick={handleCreateMarket}
              disabled={isCreating || !newMarket.question || !newMarket.targetPrice}
              className="w-full bg-button-bg text-white py-3 rounded-lg font-semibold hover:bg-button-bg/80 disabled:opacity-50"
            >
              {isCreating ? 'Creating Market...' : 'Create Market'}
            </button>
          </div>
        </div>
      )}

      {/* Markets List */}
      <div>
        <h3 className="font-bold mb-4">Manage Markets ({count})</h3>
        {count === 0 ? (
          <div className="text-center py-12 bg-[#F3E4D4] rounded-2xl">
            <p className="text-gray-500">No markets created yet. Click "Create Market" to get started.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketIds.map((id) => (
              <MarketManagementCard key={id} marketId={id} onRefresh={refetchCount} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
