'use client'

import { useState } from 'react'
import { Search, Clipboard } from 'lucide-react'

interface WalletInputProps {
  onAnalyze: (address: string) => void
  isLoading: boolean
  error: string | null
}

export default function WalletInput({ onAnalyze, isLoading, error }: WalletInputProps) {
  const [address, setAddress] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  const isValidAddress = (addr: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(addr)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setAddress(text.trim())
      setValidationError(null)
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedAddress = address.trim()

    if (!trimmedAddress) {
      setValidationError('Please enter a wallet address')
      return
    }

    if (!isValidAddress(trimmedAddress)) {
      setValidationError('Invalid address format. Must be 0x followed by 40 hex characters.')
      return
    }

    setValidationError(null)
    onAnalyze(trimmedAddress)
  }

  const displayError = validationError || error

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
                setValidationError(null)
              }}
              placeholder="Paste BSC Wallet Address (0x...)"
              className={`w-full px-4 py-3 pr-12 rounded-lg bg-[#F3E4D4] border ${
                displayError ? 'border-red-400' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#EE8923] focus:border-transparent transition-all text-sm sm:text-base`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-[#EE8923] transition-colors"
              title="Paste from clipboard"
              disabled={isLoading}
            >
              <Clipboard size={18} />
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !address.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#EE8923] text-white font-medium rounded-lg hover:bg-[#d67a1f] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
          >
            <Search size={18} />
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {displayError && (
          <p className="text-red-500 text-sm">{displayError}</p>
        )}

        <p className="text-gray-500 text-xs sm:text-sm text-center">
          Enter a BSC (BNB Chain) wallet address to analyze trading patterns
        </p>
      </div>
    </form>
  )
}
