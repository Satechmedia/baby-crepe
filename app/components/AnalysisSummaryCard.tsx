'use client'

import { FaXTwitter } from 'react-icons/fa6'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { PaperHandAnalysis, DiamondHandAnalysis } from '@/app/types/wallet'
import { generateTweetText, getNoPaperHandMessage, getNoDiamondHandMessage } from '@/app/lib/roastGenerator'

interface AnalysisSummaryCardProps {
  type: 'paper_hand' | 'diamond_hand'
  data: PaperHandAnalysis | DiamondHandAnalysis | null
}

export default function AnalysisSummaryCard({ type, data }: AnalysisSummaryCardProps) {
  const [copied, setCopied] = useState(false)

  const isPaperHand = type === 'paper_hand'

  // Get the message to display
  const getMessage = (): string => {
    if (!data) {
      return isPaperHand ? getNoPaperHandMessage() : getNoDiamondHandMessage()
    }
    return isPaperHand
      ? (data as PaperHandAnalysis).roastMessage
      : (data as DiamondHandAnalysis).kudosMessage
  }

  // Get hashtags
  const getHashtags = (): string[] => {
    if (!data) {
      return ['#BabyCREPE', '#BSC', isPaperHand ? '#PaperHands' : '#DiamondHands']
    }
    return data.hashtags
  }

  // Get metric value
  const getMetricValue = (): string => {
    if (!data) return '-'

    if (isPaperHand) {
      const ph = data as PaperHandAnalysis
      return `$${ph.missedGains.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    } else {
      const dh = data as DiamondHandAnalysis
      return `$${dh.unrealizedGains.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    }
  }

  // Get metric label
  const getMetricLabel = (): string => {
    return isPaperHand ? 'Missed Gains' : 'Unrealized Gains'
  }

  // Get secondary metric
  const getSecondaryMetric = (): { label: string; value: string } | null => {
    if (!data) return null

    if (isPaperHand) {
      const ph = data as PaperHandAnalysis
      return {
        label: 'Would be worth',
        value: `$${ph.currentWorth.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      }
    } else {
      const dh = data as DiamondHandAnalysis
      return {
        label: 'Days held',
        value: dh.holdDuration.toString()
      }
    }
  }

  const message = getMessage()
  const hashtags = getHashtags()
  const secondaryMetric = getSecondaryMetric()

  // Handle tweet
  const handleTweet = () => {
    const tweetText = generateTweetText(type, message, hashtags)
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(tweetUrl, '_blank')
  }

  // Handle copy
  const handleCopy = async () => {
    const copyText = `${message}\n\n${hashtags.join(' ')}`
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Card gradient based on type
  const gradientClass = isPaperHand
    ? 'bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#CD853F]'
    : 'bg-gradient-to-br from-[#2E8B57] via-[#3CB371] to-[#90EE90]'

  const headerBgClass = isPaperHand
    ? 'bg-gradient-to-r from-[#D2691E] to-[#F4A460]'
    : 'bg-gradient-to-r from-[#228B22] to-[#32CD32]'

  return (
    <div className={`w-full md:w-[280px] rounded-xl overflow-hidden shadow-lg ${gradientClass}`}>
      {/* Header */}
      <div className={`px-4 py-3 ${headerBgClass}`}>
        <h3 className="text-white font-bold text-lg">
          {isPaperHand ? 'Paper Hands' : 'Diamond Hands'}
        </h3>
        {data && (
          <p className="text-white/80 text-sm">
            {isPaperHand
              ? (data as PaperHandAnalysis).tokenSymbol
              : (data as DiamondHandAnalysis).tokenSymbol}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Message */}
        <p className="text-white text-sm leading-relaxed min-h-[80px]">
          {message}
        </p>

        {/* Metrics */}
        {data && (
          <div className="flex justify-between items-center bg-black/20 rounded-lg p-3">
            <div>
              <p className="text-white/70 text-xs">{getMetricLabel()}</p>
              <p className="text-white font-bold text-lg">{getMetricValue()}</p>
            </div>
            {secondaryMetric && (
              <div className="text-right">
                <p className="text-white/70 text-xs">{secondaryMetric.label}</p>
                <p className="text-white font-bold text-lg">{secondaryMetric.value}</p>
              </div>
            )}
          </div>
        )}

        {/* Hashtags */}
        <p className="text-white/70 text-xs truncate">
          {hashtags.join(' ')}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleTweet}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <FaXTwitter size={14} />
            Tweet
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 px-3 py-2 border-2 border-white/50 text-white rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}
