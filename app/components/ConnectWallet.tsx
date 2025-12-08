'use client'

import { useWallet } from '@/app/hooks/useWallet'
import { FaRegUserCircle } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'

interface ConnectWalletProps {
  variant?: 'button' | 'icon'
  className?: string
  dropdownPosition?: 'left' | 'right'
}

export function ConnectWallet({ variant = 'button', className = '', dropdownPosition = 'right' }: ConnectWalletProps) {
  const {
    isConnected,
    isConnecting,
    connect,
    disconnect,
    shortenAddress,
    balance,
    balanceSymbol,
    openModal
  } = useWallet()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (isConnecting) {
    return (
      <button
        disabled
        className={`text-xs md:text-sm bg-button-bg/70 px-4 py-2 rounded-md text-white font-semibold ${className}`}
      >
        Connecting...
      </button>
    )
  }

  if (!isConnected) {
    if (variant === 'icon') {
      return (
        <button
          onClick={connect}
          className={`text-xs cursor-pointer bg-button-bg px-3 py-1.5 rounded-md text-white font-semibold hover:bg-button-bg/90 transition-colors ${className}`}
        >
          Connect
        </button>
      )
    }
    return (
      <button
        onClick={connect}
        className={`text-xs md:text-sm cursor-pointer bg-button-bg px-4 py-2 rounded-md text-white font-semibold hover:bg-button-bg/90 transition-colors ${className}`}
      >
        Connect Wallet
      </button>
    )
  }

  // Connected state
  if (variant === 'icon') {
    return (
      <div className="relative" ref={dropdownRef}>
        <FaRegUserCircle
          size={38}
          className="cursor-pointer text-button-bg hover:text-button-bg/80 transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
          <div className={`absolute ${dropdownPosition === 'left' ? 'left-0' : 'right-0'} top-12 bg-[#F3E4D4] rounded-lg shadow-lg text-xs w-48 overflow-hidden z-50`}>
            <div className="px-4 py-3 border-b border-gray-300">
              <p className="font-semibold flex gap-2 items-center">
                <FaRegUserCircle size={16} />
                {shortenAddress}
              </p>
              {balance && (
                <p className="text-[10px] mt-2 text-gray-600">
                  Balance: {parseFloat(balance).toFixed(4)} {balanceSymbol}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                openModal('Account')
                setIsDropdownOpen(false)
              }}
              className="w-full px-4 py-2 text-left hover:bg-button-bg/10 transition-colors"
            >
              View Account
            </button>
            <button
              onClick={() => {
                openModal('Networks')
                setIsDropdownOpen(false)
              }}
              className="w-full px-4 py-2 text-left hover:bg-button-bg/10 transition-colors"
            >
              Switch Network
            </button>
            <button
              onClick={() => {
                disconnect()
                setIsDropdownOpen(false)
              }}
              className="w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 cursor-pointer transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    )
  }

  // Button variant when connected
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`text-xs md:text-sm cursor-pointer bg-button-bg px-4 py-2 rounded-md text-white font-semibold hover:bg-button-bg/90 transition-colors ${className}`}
      >
        {shortenAddress}
      </button>
      {isDropdownOpen && (
        <div className={`absolute ${dropdownPosition === 'left' ? 'left-0' : 'right-0'} top-12 bg-[#F3E4D4] rounded-lg shadow-lg text-xs w-48 overflow-hidden z-50`}>
          <div className="px-4 py-3 border-b border-gray-300">
            {balance && (
              <p className="text-gray-600">
                Balance: {parseFloat(balance).toFixed(4)} {balanceSymbol}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              openModal('Account')
              setIsDropdownOpen(false)
            }}
            className="w-full px-4 py-2 text-left hover:bg-button-bg/10 transition-colors"
          >
            View Account
          </button>
          <button
            onClick={() => {
              openModal('Networks')
              setIsDropdownOpen(false)
            }}
            className="w-full px-4 py-2 text-left hover:bg-button-bg/10 transition-colors"
          >
            Switch Network
          </button>
          <button
            onClick={() => {
              disconnect()
              setIsDropdownOpen(false)
            }}
            className="w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 cursor-pointer transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  )
}
