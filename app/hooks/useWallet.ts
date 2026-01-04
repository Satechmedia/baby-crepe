'use client'

import { useAccount, useDisconnect, useBalance, useChainId } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { bsc } from 'wagmi/chains'
import { formatUnits } from 'viem'

export function useWallet() {
  const { address, isConnected, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useAppKit()
  const chainId = useChainId()

  const { data: balance } = useBalance({
    address: address,
  })

  const formattedBalance = balance ? formatUnits(balance.value, balance.decimals) : undefined

  const connect = () => {
    open({ view: 'Connect' })
  }

  const openModal = (view: 'Account' | 'Connect' | 'Networks' = 'Connect') => {
    open({ view })
  }

  const shortenAddress = (addr?: string) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const isCorrectChain = chainId === bsc.id

  return {
    address,
    isConnected,
    isConnecting,
    balance: formattedBalance,
    balanceSymbol: balance?.symbol,
    chainId,
    isCorrectChain,
    connect,
    disconnect,
    openModal,
    shortenAddress: shortenAddress(address),
  }
}
