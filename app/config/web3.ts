import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

if (!projectId) {
  console.warn('WalletConnect Project ID is not set. Please set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in your .env.local file')
}

const metadata = {
  name: 'Baby Crepe',
  description: 'BNB Price Prediction Market',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://babycrepe.com',
  icons: ['/images/logo.png']
}

// Configure chains - BNB Chain (mainnet and testnet)
const chains = [bsc, bscTestnet] as const

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
})
