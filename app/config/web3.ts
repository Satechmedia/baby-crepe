import { bsc } from '@reown/appkit/networks'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

if (!projectId) {
  console.warn('WalletConnect Project ID is not set. Please set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in your .env.local file')
}

const metadata = {
  name: 'Baby Crepe',
  description: 'BNB Price Prediction Market',
  url:
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'https://www.babycrepe.xyz'),
  icons: ['/images/logo.png']
}

// Configure networks - BNB Chain (mainnet only)
export const networks = [bsc] as const

export { metadata }
