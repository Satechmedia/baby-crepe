'use client'

import { useState, useCallback } from 'react'
import {
  WalletAnalysis,
  WalletAnalysisResponse,
  AnalysisStatus,
  AnalysisProgress
} from '@/app/types/wallet'

interface UseWalletAnalysisReturn {
  status: AnalysisStatus
  data: WalletAnalysis | null
  error: string | null
  progress: AnalysisProgress
  analyze: (address: string) => Promise<void>
  reset: () => void
}

export function useWalletAnalysis(): UseWalletAnalysisReturn {
  const [status, setStatus] = useState<AnalysisStatus>('idle')
  const [data, setData] = useState<WalletAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<AnalysisProgress>({
    step: '',
    current: 0,
    total: 3
  })

  const analyze = useCallback(async (address: string) => {
    // Reset state
    setStatus('loading')
    setError(null)
    setData(null)

    try {
      // Step 1: Validating
      setProgress({ step: 'Validating wallet address...', current: 1, total: 3 })

      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 300))

      // Step 2: Fetching
      setProgress({ step: 'Fetching transactions from BSCScan...', current: 2, total: 3 })

      const response = await fetch('/api/wallet/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ walletAddress: address })
      })

      const result: WalletAnalysisResponse = await response.json()

      // Step 3: Analyzing
      setProgress({ step: 'Analyzing trading patterns...', current: 3, total: 3 })

      await new Promise(resolve => setTimeout(resolve, 500))

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Analysis failed')
      }

      // Convert date strings back to Date objects
      const analysisData: WalletAnalysis = {
        ...result.data,
        analyzedAt: new Date(result.data.analyzedAt),
        transactions: result.data.transactions.map(tx => ({
          ...tx,
          date: new Date(tx.date)
        })),
        holdings: result.data.holdings.map(h => ({
          ...h,
          firstBuyDate: h.firstBuyDate ? new Date(h.firstBuyDate) : null,
          lastActivityDate: h.lastActivityDate ? new Date(h.lastActivityDate) : null,
          transactions: h.transactions.map(tx => ({
            ...tx,
            date: new Date(tx.date)
          }))
        })),
        paperHandTokens: result.data.paperHandTokens.map(p => ({
          ...p,
          soldDate: new Date(p.soldDate)
        }))
      }

      setData(analysisData)
      setStatus('success')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      setStatus('error')
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setData(null)
    setError(null)
    setProgress({ step: '', current: 0, total: 3 })
  }, [])

  return {
    status,
    data,
    error,
    progress,
    analyze,
    reset
  }
}
