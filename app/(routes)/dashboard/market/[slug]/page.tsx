'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FaChevronLeft } from 'react-icons/fa'
import { formatEther, parseEther } from 'viem'
import {
  useMarket,
  useMarketOdds,
  useUserBet,
  usePlaceBet,
  useIncreaseBet,
  useClaimWinnings,
  useResolveMarket,
  useMinBet,
  usePotentialWinnings,
  useLatestPrice,
  formatPrice,
  calculateYesPercentage,
  getMarketStatus,
  formatTimeRemaining,
} from '@/app/hooks/usePredictionMarket'
import { useWallet } from '@/app/hooks/useWallet'
import ChanceGauge from '@/app/components/ChanceGauge'
import BettorsList from '@/app/components/BettorsList'

export default function MarketDetailsPage() {
  const router = useRouter()
  const { slug } = useParams()
  const marketId = parseInt(slug as string, 10)

  const { address, isConnected, connect } = useWallet()
  const { market, isLoading, error, refetch } = useMarket(marketId)
  const { odds } = useMarketOdds(marketId)
  const { bet: userBet, refetch: refetchBet } = useUserBet(marketId, address as `0x${string}`)
  const { data: minBet } = useMinBet()
  const { data: latestPrice } = useLatestPrice()

  const [selectedPosition, setSelectedPosition] = useState<boolean | null>(null) // true = Yes, false = No
  const [betAmount, setBetAmount] = useState('')

  const { potentialWinnings } = usePotentialWinnings(
    marketId,
    selectedPosition ?? true,
    betAmount
  )

  const {
    placeBet,
    isPending: isPlacingBet,
    isConfirming: isConfirmingBet,
    isSuccess: betSuccess,
    error: betError,
  } = usePlaceBet()

  const {
    increaseBet,
    isPending: isIncreasingBet,
    isConfirming: isConfirmingIncrease,
    isSuccess: increaseSuccess,
  } = useIncreaseBet()

  const {
    claimWinnings,
    isPending: isClaiming,
    isConfirming: isConfirmingClaim,
    isSuccess: claimSuccess,
  } = useClaimWinnings()

  const {
    resolveMarket,
    isPending: isResolving,
    isConfirming: isConfirmingResolve,
    isSuccess: resolveSuccess,
  } = useResolveMarket()

  // Refetch data after successful transactions
  useEffect(() => {
    if (betSuccess || increaseSuccess || claimSuccess || resolveSuccess) {
      refetch()
      refetchBet()
      setBetAmount('')
    }
  }, [betSuccess, increaseSuccess, claimSuccess, resolveSuccess, refetch, refetchBet])

  const handlePlaceBet = async () => {
    if (!isConnected) {
      connect()
      return
    }
    if (selectedPosition === null || !betAmount) return

    // Check if user already has a bet
    if (userBet && userBet.amount > BigInt(0)) {
      // Increase existing bet
      await increaseBet(marketId, betAmount)
    } else {
      // Place new bet
      await placeBet(marketId, selectedPosition, betAmount)
    }
  }

  const handleClaimWinnings = async () => {
    await claimWinnings(marketId)
  }

  const handleResolveMarket = async () => {
    await resolveMarket(marketId)
  }

  if (isNaN(marketId)) {
    return (
      <div className="p-6">
        <button
          onClick={() => router.back()}
          className="text-orange-500 font-medium mb-4 flex items-center gap-2"
        >
          <FaChevronLeft /> Back
        </button>
        <p>Invalid market ID.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen animate-pulse">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="h-32 bg-gray-300 rounded"></div>
              <div className="h-32 bg-gray-300 rounded"></div>
            </div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !market) {
    return (
      <div className="p-6">
        <button
          onClick={() => router.back()}
          className="text-orange-500 font-medium mb-4 flex items-center gap-2"
        >
          <FaChevronLeft /> Back
        </button>
        <p className="text-red-600">Failed to load market. Please try again.</p>
      </div>
    )
  }

  const status = getMarketStatus(market)
  const yesPercentage = calculateYesPercentage(market.totalYesStake, market.totalNoStake)
  const totalVolume = market.totalYesStake + market.totalNoStake
  const timeRemaining = formatTimeRemaining(market.deadline)
  const targetPriceFormatted = formatPrice(market.targetPrice)
  const currentPriceFormatted = latestPrice ? formatPrice(latestPrice) : '--'

  const yesOddsFormatted = odds ? (Number(odds.yesOdds) / 10000).toFixed(2) : '1.00'
  const noOddsFormatted = odds ? (Number(odds.noOdds) / 10000).toFixed(2) : '1.00'

  const minBetFormatted = minBet ? formatEther(minBet) : '0.01'

  const canBet = status === 'open' && isConnected
  const hasExistingBet = userBet && userBet.amount > BigInt(0)
  const canClaim =
    market.resolved &&
    userBet &&
    userBet.amount > BigInt(0) &&
    !userBet.claimed &&
    userBet.position === market.outcome
  const canClaimRefund = market.cancelled && userBet && userBet.amount > BigInt(0) && !userBet.claimed
  const canResolve = status === 'closed' && Date.now() / 1000 >= Number(market.resolutionTime)

  const isTransacting = isPlacingBet || isConfirmingBet || isIncreasingBet || isConfirmingIncrease

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex gap-3 items-center mb-3 text-sm md:text-base relative">
          <button
            onClick={() => router.back()}
            className="cursor-pointer md:absolute -left-7"
          >
            <FaChevronLeft />
          </button>
          <h1 className="font-bold">{market.question}</h1>
        </div>

        {/* Market Status Badge */}
        <div className="flex items-center gap-4 mb-6">
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
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
            <span className="text-xs text-gray-500">Ends in {timeRemaining}</span>
          )}
          <span className="text-xs text-gray-500">
            Volume: {formatEther(totalVolume)} BNB
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT SECTION */}
          <div className="md:col-span-2 space-y-6">
            {/* Price Info Card */}
            <div className="bg-[#F3E4D4] rounded-2xl p-6">
              <h3 className="font-bold mb-4">Price Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Target Price</p>
                  <p className="text-xl font-bold">${targetPriceFormatted}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Current BNB Price</p>
                  <p className="text-xl font-bold">${currentPriceFormatted}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Resolution Time</p>
                  <p className="text-sm font-medium">
                    {new Date(Number(market.resolutionTime) * 1000).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Betting Deadline</p>
                  <p className="text-sm font-medium">
                    {new Date(Number(market.deadline) * 1000).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Market Stats */}
            <div className="bg-[#F3E4D4] rounded-2xl p-6">
              <h3 className="font-bold mb-4">Market Statistics</h3>
              <div className="flex items-center gap-8">
                <div className="flex-1">
                  {/* Progress Bar */}
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-green-600 font-medium">
                      Yes ({yesPercentage}%)
                    </span>
                    <span className="text-red-600 font-medium">
                      No ({100 - yesPercentage}%)
                    </span>
                  </div>
                  <div className="h-4 bg-[#F6ADA1] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C2EAC7] transition-all"
                      style={{ width: `${yesPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-2 text-gray-500">
                    <span>{formatEther(market.totalYesStake)} BNB</span>
                    <span>{formatEther(market.totalNoStake)} BNB</span>
                  </div>
                </div>
                <div className="w-24">
                  <ChanceGauge percentage={yesPercentage} />
                </div>
              </div>

              {/* Odds */}
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Yes Odds</p>
                  <p className="text-lg font-bold text-green-600">{yesOddsFormatted}x</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">No Odds</p>
                  <p className="text-lg font-bold text-red-600">{noOddsFormatted}x</p>
                </div>
              </div>
            </div>

            {/* Your Bet (if exists) */}
            {hasExistingBet && userBet && (
              <div className="bg-[#F3E4D4] rounded-2xl p-6">
                <h3 className="font-bold mb-4">Your Position</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Your Bet</p>
                    <p className="text-lg font-bold">{formatEther(userBet.amount)} BNB</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Position</p>
                    <span
                      className={`text-lg font-bold ${
                        userBet.position ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {userBet.position ? 'YES' : 'NO'}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`text-sm font-medium ${
                        userBet.claimed ? 'text-gray-500' : 'text-orange-600'
                      }`}
                    >
                      {userBet.claimed ? 'Claimed' : 'Active'}
                    </span>
                  </div>
                </div>

                {/* Claim Button */}
                {(canClaim || canClaimRefund) && (
                  <button
                    onClick={handleClaimWinnings}
                    disabled={isClaiming || isConfirmingClaim}
                    className="w-full mt-4 bg-green-600 text-white font-semibold py-3 rounded-full shadow-md hover:bg-green-700 transition-all disabled:opacity-50"
                  >
                    {isClaiming || isConfirmingClaim
                      ? 'Processing...'
                      : canClaimRefund
                      ? 'Claim Refund'
                      : 'Claim Winnings'}
                  </button>
                )}
              </div>
            )}

            {/* Resolution Info */}
            {market.resolved && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-bold mb-2 text-blue-800">Market Resolved</h3>
                <p className="text-sm text-blue-700">
                  The outcome was:{' '}
                  <span className="font-bold">
                    {market.outcome ? 'YES' : 'NO'}
                  </span>
                </p>
              </div>
            )}

            {/* Resolve Button */}
            {canResolve && (
              <button
                onClick={handleResolveMarket}
                disabled={isResolving || isConfirmingResolve}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-full shadow-md hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {isResolving || isConfirmingResolve
                  ? 'Resolving...'
                  : 'Resolve Market'}
              </button>
            )}

            {/* Participants / Bettors List */}
            <BettorsList marketId={marketId} market={market} />
          </div>

          {/* RIGHT SECTION - Betting Panel */}
          <div className="flex flex-col bg-[#F3E4D4] rounded-2xl p-6 shadow-sm h-fit">
            <h3 className="font-bold mb-4">
              {hasExistingBet ? 'Increase Your Bet' : 'Place Your Bet'}
            </h3>

            {/* Position Selection */}
            {!hasExistingBet && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Select Position</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPosition(true)}
                    className={`flex-1 py-3 rounded-md text-sm font-medium transition-all ${
                      selectedPosition === true
                        ? 'bg-green-600 text-white ring-2 ring-green-400'
                        : 'bg-[#C2EAC7] text-green-700 hover:bg-[#a8ddb0]'
                    }`}
                    disabled={!canBet}
                  >
                    Yes ({yesOddsFormatted}x)
                  </button>
                  <button
                    onClick={() => setSelectedPosition(false)}
                    className={`flex-1 py-3 rounded-md text-sm font-medium transition-all ${
                      selectedPosition === false
                        ? 'bg-red-600 text-white ring-2 ring-red-400'
                        : 'bg-[#F6ADA1] text-red-700 hover:bg-[#f09485]'
                    }`}
                    disabled={!canBet}
                  >
                    No ({noOddsFormatted}x)
                  </button>
                </div>
              </div>
            )}

            {hasExistingBet && userBet && (
              <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-xs text-gray-500">Your current position</p>
                <p className={`font-bold ${userBet.position ? 'text-green-600' : 'text-red-600'}`}>
                  {userBet.position ? 'YES' : 'NO'} - {formatEther(userBet.amount)} BNB
                </p>
              </div>
            )}

            {/* Amount Input */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">
                Amount (min: {minBetFormatted} BNB)
              </p>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min={minBetFormatted}
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-orange-400"
                  disabled={!canBet}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  BNB
                </span>
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex gap-2 mt-2">
                {['0.01', '0.05', '0.1', '0.5'].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount)}
                    className="flex-1 text-xs py-1 bg-gray-200 rounded hover:bg-gray-300 transition-all"
                    disabled={!canBet}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Potential Winnings */}
            {betAmount && selectedPosition !== null && (
              <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-xs text-gray-500">Potential Winnings</p>
                <p className="text-lg font-bold text-green-600">
                  {potentialWinnings} BNB
                </p>
              </div>
            )}

            {/* Error Message */}
            {betError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs text-red-600">
                  {betError.message || 'Transaction failed'}
                </p>
              </div>
            )}

            {/* Action Button */}
            {!isConnected ? (
              <button
                onClick={connect}
                className="w-full bg-button-bg text-white font-semibold py-3 rounded-full shadow-md hover:bg-button-bg/80 transition-all"
              >
                Connect Wallet
              </button>
            ) : status !== 'open' ? (
              <button
                disabled
                className="w-full bg-gray-400 text-white font-semibold py-3 rounded-full shadow-md cursor-not-allowed"
              >
                Betting Closed
              </button>
            ) : (
              <button
                onClick={handlePlaceBet}
                disabled={
                  isTransacting ||
                  !betAmount ||
                  parseFloat(betAmount) < parseFloat(minBetFormatted) ||
                  (!hasExistingBet && selectedPosition === null)
                }
                className="w-full bg-button-bg text-white font-semibold py-3 rounded-full shadow-md hover:bg-button-bg/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTransacting
                  ? 'Processing...'
                  : hasExistingBet
                  ? 'Increase Bet'
                  : 'Place Bet'}
              </button>
            )}

            {/* Info Text */}
            <p className="text-[10px] text-gray-500 mt-4 text-center">
              Platform fee: 2% • Results determined by Chainlink price oracle
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
