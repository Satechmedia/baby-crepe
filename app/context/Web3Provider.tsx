'use client'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, type State } from 'wagmi'
import { ReactNode, useState, useEffect } from 'react'
import { wagmiConfig, projectId } from '@/app/config/web3'

// Initialize Web3Modal
if (projectId) {
  createWeb3Modal({
    wagmiConfig,
    projectId,
    enableAnalytics: false,
    enableOnramp: false,
    themeMode: 'light',
    themeVariables: {
      '--w3m-accent': '#D4A574',
      '--w3m-border-radius-master': '8px',
    }
  })
}

interface Web3ProviderProps {
  children: ReactNode
  initialState?: State
}

export function Web3Provider({ children, initialState }: Web3ProviderProps) {
  const [queryClient] = useState(() => new QueryClient())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {mounted ? children : null}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
