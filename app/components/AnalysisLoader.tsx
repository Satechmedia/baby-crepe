'use client'

import { Loader } from '@mantine/core'
import { AnalysisProgress } from '@/app/types/wallet'

interface AnalysisLoaderProps {
  progress: AnalysisProgress
}

export default function AnalysisLoader({ progress }: AnalysisLoaderProps) {
  const steps = [
    'Validating wallet address...',
    'Fetching transactions from BSCScan...',
    'Analyzing trading patterns...'
  ]

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-6">
      <Loader color="#EE8923" size="lg" />

      <div className="text-center">
        <p className="text-lg font-medium text-gray-800">{progress.step || 'Starting analysis...'}</p>
        <p className="text-sm text-gray-500 mt-1">
          Step {progress.current} of {progress.total}
        </p>
      </div>

      {/* Progress steps */}
      <div className="flex flex-col gap-2 w-full max-w-md">
        {steps.map((step, index) => {
          const stepNum = index + 1
          const isComplete = progress.current > stepNum
          const isCurrent = progress.current === stepNum

          return (
            <div
              key={step}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isComplete
                  ? 'bg-green-50 text-green-700'
                  : isCurrent
                  ? 'bg-orange-50 text-orange-700'
                  : 'bg-gray-50 text-gray-400'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isComplete
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-[#EE8923] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isComplete ? '✓' : stepNum}
              </div>
              <span className="text-sm">{step}</span>
            </div>
          )
        })}
      </div>

      {/* Skeleton placeholders */}
      <div className="w-full max-w-4xl mt-8 space-y-6">
        {/* Cards skeleton */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div className="w-full md:w-64 h-48 bg-gray-200 rounded-xl animate-pulse" />
          <div className="w-full md:w-64 h-48 bg-gray-200 rounded-xl animate-pulse" />
        </div>

        {/* Table skeleton */}
        <div className="w-full h-64 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    </div>
  )
}
