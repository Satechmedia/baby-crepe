'use client'

import { useWallet } from './useWallet'
import { useContractOwner } from './usePredictionMarket'

// Get admin wallets from environment variable
const getAdminWallets = (): string[] => {
  const adminWalletsEnv = process.env.NEXT_PUBLIC_ADMIN_WALLETS || ''
  return adminWalletsEnv
    .split(',')
    .map((addr) => addr.trim().toLowerCase())
    .filter((addr) => addr.length > 0)
}

export function useAdmin() {
  const { address, isConnected } = useWallet()
  const { data: contractOwner, isLoading: isLoadingOwner } = useContractOwner()

  const adminWallets = getAdminWallets()
  const userAddress = address?.toLowerCase() || ''
  const ownerAddress = (contractOwner as string)?.toLowerCase() || ''

  // User is admin if:
  // 1. They are the contract owner, OR
  // 2. Their address is in the NEXT_PUBLIC_ADMIN_WALLETS env variable
  const isAdmin =
    isConnected &&
    userAddress &&
    (userAddress === ownerAddress || adminWallets.includes(userAddress))

  const isContractOwner = isConnected && userAddress && userAddress === ownerAddress

  return {
    isAdmin,
    isContractOwner,
    isLoading: isLoadingOwner,
    adminWallets,
    contractOwner: ownerAddress,
  }
}
