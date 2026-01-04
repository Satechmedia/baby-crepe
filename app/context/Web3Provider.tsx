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
    allWallets: 'ONLY_MOBILE',
    featuredWalletIds: [
      '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
      'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
      '0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150', // SafePal
      '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4', // Binance Web3 Wallet
      '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709', // OKX
      '5d9f1395b3a8e848684848dc4147cbd05c8d54bb737eac78fe103901fe6b01a1', // OKX (Alt)
    ],
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
