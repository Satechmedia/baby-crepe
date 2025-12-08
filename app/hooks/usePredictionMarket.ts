'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { bsc } from 'wagmi/chains'
import { CONTRACT_ADDRESSES, PREDICTION_MARKET_ABI } from '@/app/config/contract'
import { useCallback, useState } from 'react'

// Types
export interface MarketData {
  id: number
  question: string
  targetPrice: bigint
  deadline: bigint
  resolutionTime: bigint
  totalYesStake: bigint
  totalNoStake: bigint
  resolved: boolean
  outcome: boolean
  cancelled: boolean
}

export interface BetData {
  amount: bigint
  position: boolean
  claimed: boolean
}

export interface OddsData {
  yesOdds: bigint
  noOdds: bigint
}

// Helper to get contract address based on chain
function useContractAddress() {
  const chainId = useChainId()
  return CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES] || CONTRACT_ADDRESSES[bsc.id]
}

// Hook to get market count
export function useMarketCount() {
  const address = useContractAddress()

  return useReadContract({
    address: address as `0x${string}`,
    abi: PREDICTION_MARKET_ABI,
    functionName: 'marketCount',
  })
}

// Hook to get a single market
export function useMarket(marketId: number) {
  const address = useContractAddress()

  const { data, isLoading, error, refetch } = useReadContract({
    address: address as `0x${string}`,
    abi: PREDICTION_MARKET_ABI,
    functionName: 'getMarket',
    args: [BigInt(marketId)],
  })

  const market: MarketData | null = data ? {
    id: marketId,
    question: data[0],
    targetPrice: data[1],
    deadline: data[2],
    resolutionTime: data[3],
    totalYesStake: data[4],
    totalNoStake: data[5],
    resolved: data[6],
    outcome: data[7],
    cancelled: data[8],
  } : null

  return { market, isLoading, error, refetch }
}

// Hook to get multiple markets
export function useMarkets(count: number) {
  const address = useContractAddress()
  const [markets, setMarkets] = useState<MarketData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchMarkets = useCallback(async () => {
    if (count === 0) {
      setMarkets([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Note: In production, you'd want to use multicall for efficiency
      // For now, we'll fetch markets individually
      const marketPromises = Array.from({ length: count }, (_, i) => i)
      setMarkets([]) // Will be populated by individual useMarket hooks
      setIsLoading(false)
    } catch (err) {
      setError(err as Error)
      setIsLoading(false)
    }
  }, [count])

  return { markets, isLoading, error, refetch: fetchMarkets }
}

// Hook to get user's bet on a market
export function useUserBet(marketId: number, userAddress?: `0x${string}`) {
  const address = useContractAddress()

  const { data, isLoading, error, refetch } = useReadContract({
    address: address as `0x${string}`,
    abi: PREDICTION_MARKET_ABI,
    functionName: 'getBet',
    args: userAddress ? [BigInt(marketId), userAddress] : undefined,
    query: {
      enabled: !!userAddress,
    },
  })

  const bet: BetData | null = data ? {
    amount: data[0],
    position: data[1],
    claimed: data[2],
  } : null

  return { bet, isLoading, error, refetch }
}

// Hook to get market odds
export function useMarketOdds(marketId: number) {
  const address = useContractAddress()

  const { data, isLoading, error, refetch } = useReadContract({
    address: address as `0x${string}`,
    abi: PREDICTION_MARKET_ABI,
    functionName: 'getOdds',
    args: [BigInt(marketId)],
  })

  const odds: OddsData | null = data ? {
    yesOdds: data[0],
    noOdds: data[1],
  } : null

  return { odds, isLoading, error, refetch }
}

// Hook to get latest BNB price
export function useLatestPrice() {
  const address = useContractAddress()

  return useReadContract({
    address: address as `0x${string}`,
    abi: PREDICTION_MARKET_ABI,
    functionName: 'getLatestPrice',
  })
}

// Hook to get minimum bet
export function useMinBet() {
  const address = useContractAddress()

  return useReadContract({
    address: address as `0x${string}`,
    abi: PREDICTION_MARKET_ABI,
    functionName: 'minBet',
  })
}

// Hook to get platform fee
export function usePlatformFee() {
  const address = useContractAddress()

  return useReadContract({
    address: address as `0x${string}`,
    abi: PREDICTION_MARKET_ABI,
    functionName: 'platformFee',
  })
}

// Hook to get potential winnings
export function usePotentialWinnings(marketId: number, position: boolean, amount: string) {
  const address = useContractAddress()
  const amountWei = amount ? parseEther(amount) : BigInt(0)

  const { data, isLoading, error } = useReadContract({
    address: address as `0x${string}`,
    abi: PREDICTION_MARKET_ABI,
    functionName: 'getPotentialWinnings',
    args: [BigInt(marketId), position, amountWei],
    query: {
      enabled: amountWei > BigInt(0),
    },
  })

  return {
    potentialWinnings: data ? formatEther(data) : '0',
    potentialWinningsRaw: data,
    isLoading,
    error
  }
}

// Hook to place a bet
export function usePlaceBet() {
  const address = useContractAddress()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const placeBet = async (marketId: number, position: boolean, amountInBnb: string) => {
    const value = parseEther(amountInBnb)

    writeContract({
      address: address as `0x${string}`,
      abi: PREDICTION_MARKET_ABI,
      functionName: 'placeBet',
      args: [BigInt(marketId), position],
      value,
    })
  }

  return {
    placeBet,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Hook to increase bet
export function useIncreaseBet() {
  const address = useContractAddress()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const increaseBet = async (marketId: number, amountInBnb: string) => {
    const value = parseEther(amountInBnb)

    writeContract({
      address: address as `0x${string}`,
      abi: PREDICTION_MARKET_ABI,
      functionName: 'increaseBet',
      args: [BigInt(marketId)],
      value,
    })
  }

  return {
    increaseBet,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Hook to claim winnings
export function useClaimWinnings() {
  const address = useContractAddress()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const claimWinnings = async (marketId: number) => {
    writeContract({
      address: address as `0x${string}`,
      abi: PREDICTION_MARKET_ABI,
      functionName: 'claimWinnings',
      args: [BigInt(marketId)],
    })
  }

  return {
    claimWinnings,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Hook to resolve market (anyone can call after resolution time)
export function useResolveMarket() {
  const address = useContractAddress()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const resolveMarket = async (marketId: number) => {
    writeContract({
      address: address as `0x${string}`,
      abi: PREDICTION_MARKET_ABI,
      functionName: 'resolveMarket',
      args: [BigInt(marketId)],
    })
  }

  return {
    resolveMarket,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Hook to get market bettors
export function useMarketBettors(marketId: number) {
  const address = useContractAddress()

  return useReadContract({
    address: address as `0x${string}`,
    abi: PREDICTION_MARKET_ABI,
    functionName: 'getMarketBettors',
    args: [BigInt(marketId)],
  })
}

// Hook to get contract owner
export function useContractOwner() {
  const address = useContractAddress()

  return useReadContract({
    address: address as `0x${string}`,
    abi: PREDICTION_MARKET_ABI,
    functionName: 'owner',
  })
}

// ============ ADMIN HOOKS ============

// Hook to create market (owner only)
export function useCreateMarket() {
  const address = useContractAddress()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createMarket = async (
    question: string,
    targetPrice: string, // Price in USD (e.g., "700" for $700)
    bettingDeadline: number, // Unix timestamp
    resolutionTime: number // Unix timestamp
  ) => {
    // Convert target price to 8 decimals (Chainlink format)
    const targetPriceWei = BigInt(Math.floor(parseFloat(targetPrice) * 1e8))

    writeContract({
      address: address as `0x${string}`,
      abi: PREDICTION_MARKET_ABI,
      functionName: 'createMarket',
      args: [question, targetPriceWei, BigInt(bettingDeadline), BigInt(resolutionTime)],
    })
  }

  return {
    createMarket,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Hook to cancel market (owner only)
export function useCancelMarket() {
  const address = useContractAddress()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const cancelMarket = async (marketId: number) => {
    writeContract({
      address: address as `0x${string}`,
      abi: PREDICTION_MARKET_ABI,
      functionName: 'cancelMarket',
      args: [BigInt(marketId)],
    })
  }

  return {
    cancelMarket,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Hook to resolve market manually (owner only)
export function useResolveMarketManually() {
  const address = useContractAddress()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const resolveMarketManually = async (marketId: number, outcome: boolean) => {
    writeContract({
      address: address as `0x${string}`,
      abi: PREDICTION_MARKET_ABI,
      functionName: 'resolveMarketManually',
      args: [BigInt(marketId), outcome],
    })
  }

  return {
    resolveMarketManually,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Hook to set platform fee (owner only)
export function useSetPlatformFee() {
  const address = useContractAddress()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setPlatformFee = async (feeInBasisPoints: number) => {
    writeContract({
      address: address as `0x${string}`,
      abi: PREDICTION_MARKET_ABI,
      functionName: 'setPlatformFee',
      args: [BigInt(feeInBasisPoints)],
    })
  }

  return {
    setPlatformFee,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Hook to set minimum bet (owner only)
export function useSetMinBet() {
  const address = useContractAddress()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setMinBet = async (minBetInBnb: string) => {
    const value = parseEther(minBetInBnb)

    writeContract({
      address: address as `0x${string}`,
      abi: PREDICTION_MARKET_ABI,
      functionName: 'setMinBet',
      args: [value],
    })
  }

  return {
    setMinBet,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Hook to withdraw fees (owner only)
export function useWithdrawFees() {
  const address = useContractAddress()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const withdrawFees = async () => {
    writeContract({
      address: address as `0x${string}`,
      abi: PREDICTION_MARKET_ABI,
      functionName: 'withdrawFees',
    })
  }

  return {
    withdrawFees,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Hook to transfer ownership (owner only)
export function useTransferOwnership() {
  const address = useContractAddress()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const transferOwnership = async (newOwner: string) => {
    writeContract({
      address: address as `0x${string}`,
      abi: PREDICTION_MARKET_ABI,
      functionName: 'transferOwnership',
      args: [newOwner as `0x${string}`],
    })
  }

  return {
    transferOwnership,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Utility functions
export function formatPrice(price: bigint): string {
  // Price has 8 decimals from Chainlink
  return (Number(price) / 1e8).toFixed(2)
}

export function formatStake(stake: bigint): string {
  return formatEther(stake)
}

export function calculateYesPercentage(totalYesStake: bigint, totalNoStake: bigint): number {
  const total = totalYesStake + totalNoStake
  if (total === BigInt(0)) return 50
  return Number((totalYesStake * BigInt(100)) / total)
}

export function getMarketStatus(market: MarketData): 'open' | 'closed' | 'resolved' | 'cancelled' {
  if (market.cancelled) return 'cancelled'
  if (market.resolved) return 'resolved'
  if (Date.now() / 1000 > Number(market.deadline)) return 'closed'
  return 'open'
}

export function formatTimeRemaining(deadline: bigint): string {
  const now = Date.now() / 1000
  const remaining = Number(deadline) - now

  if (remaining <= 0) return 'Ended'

  const days = Math.floor(remaining / 86400)
  const hours = Math.floor((remaining % 86400) / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}
