'use client'

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, type State } from 'wagmi'
import { ReactNode, useState, useEffect } from 'react'
import { metadata, networks, projectId } from '@/app/config/web3'

const wagmiAdapter = new WagmiAdapter({
  networks: networks as any,
  projectId,
  ssr: true,
})

if (projectId) {
  createAppKit({
    adapters: [wagmiAdapter],
    networks: [...networks],
    projectId,
    metadata,
    allWallets: 'ONLY_MOBILE',
    enableInjected: true,
    enableEIP6963: true,
    enableCoinbase: true,
    enableWallets: true,
    experimental_preferUniversalLinks: true,
    enableMobileFullScreen: true,
    features: {
      analytics: false,
      email: false,
      socials: false,
      onramp: false,
      swaps: false,
      history: false,
      allWallets: true,
    },
    customWallets: [
      {
        id: '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
        name: 'Trust Wallet',
        homepage: 'https://trustwallet.com/',
        mobile_link: 'trust://',
        app_store: 'https://apps.apple.com/app/apple-store/id1288339409',
        play_store: 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
      },
      {
        id: 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        name: 'MetaMask',
        homepage: 'https://metamask.io/',
        mobile_link: 'metamask://',
        app_store: 'https://apps.apple.com/us/app/metamask/id1438144202',
        play_store: 'https://play.google.com/store/apps/details?id=io.metamask',
      },
      {
        id: '0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150',
        name: 'SafePal',
        homepage: 'https://safepal.com/',
        mobile_link: 'safepalwallet://',
        app_store: 'https://apps.apple.com/app/safepal-wallet/id1548297139',
        play_store: 'https://play.google.com/store/apps/details?id=io.safepal.wallet',
      },
      {
        id: '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4',
        name: 'Binance Wallet',
        homepage: 'https://www.binance.com/en/web3wallet',
        mobile_link: 'bnc://app.binance.com/cedefi/',
        webapp_link: 'https://www.binance.com/en/web3wallet',
        app_store: 'https://www.binance.com/en/download',
        play_store: 'https://www.binance.com/en/download',
      },
      {
        id: '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
        name: 'OKX Wallet',
        homepage: 'https://www.okx.com/web3',
        mobile_link: 'okex://main',
        webapp_link: 'https://www.okx.com/web3',
        app_store: 'https://apps.apple.com/us/app/okx-buy-bitcoin-eth-crypto/id1327268470',
        play_store: 'https://play.google.com/store/apps/details?id=com.okinc.okex.gp',
      },
      {
        id: '5d9f1395b3a8e848684848dc4147cbd05c8d54bb737eac78fe103901fe6b01a1',
        name: 'OKX Wallet',
        homepage: 'https://www.okx.com/download',
        mobile_link: 'okxwallet://main',
        app_store: 'https://apps.apple.com/us/app/okx-wallet-portal-to-web3/id6743309484',
        play_store: 'https://play.google.com/store/apps/details?id=com.okx.wallet',
      },
    ],
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
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {mounted ? children : null}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
