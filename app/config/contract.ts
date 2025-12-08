import { bsc, bscTestnet } from 'wagmi/chains'

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  [bsc.id]: '0x88Ec1f30689787D6dd057b134C1de989735178fc',
  [bscTestnet.id]: '0x88Ec1f30689787D6dd057b134C1de989735178fc', // Update if different on testnet
} as const

// Chainlink BNB/USD Price Feed addresses
export const PRICE_FEED_ADDRESSES = {
  [bsc.id]: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
  [bscTestnet.id]: '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526',
} as const

// Contract ABI
export const PREDICTION_MARKET_ABI = [
  {
    inputs: [{ internalType: 'address', name: '_priceFeed', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'marketId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'bettor', type: 'address' },
      { indexed: false, internalType: 'bool', name: 'position', type: 'bool' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'BetPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'uint256', name: 'marketId', type: 'uint256' }],
    name: 'MarketCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'marketId', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'question', type: 'string' },
      { indexed: false, internalType: 'uint256', name: 'targetPrice', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'resolutionTime', type: 'uint256' },
    ],
    name: 'MarketCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'marketId', type: 'uint256' },
      { indexed: false, internalType: 'bool', name: 'outcome', type: 'bool' },
      { indexed: false, internalType: 'uint256', name: 'finalPrice', type: 'uint256' },
    ],
    name: 'MarketResolved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'marketId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'bettor', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'WinningsClaimed',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'bets',
    outputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'position', type: 'bool' },
      { internalType: 'bool', name: 'claimed', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_marketId', type: 'uint256' }],
    name: 'cancelMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_marketId', type: 'uint256' }],
    name: 'claimWinnings',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: '_question', type: 'string' },
      { internalType: 'uint256', name: '_targetPrice', type: 'uint256' },
      { internalType: 'uint256', name: '_bettingDeadline', type: 'uint256' },
      { internalType: 'uint256', name: '_resolutionTime', type: 'uint256' },
    ],
    name: 'createMarket',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_marketId', type: 'uint256' },
      { internalType: 'address', name: '_bettor', type: 'address' },
    ],
    name: 'getBet',
    outputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'position', type: 'bool' },
      { internalType: 'bool', name: 'claimed', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLatestPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_marketId', type: 'uint256' }],
    name: 'getMarket',
    outputs: [
      { internalType: 'string', name: 'question', type: 'string' },
      { internalType: 'uint256', name: 'targetPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'uint256', name: 'resolutionTime', type: 'uint256' },
      { internalType: 'uint256', name: 'totalYesStake', type: 'uint256' },
      { internalType: 'uint256', name: 'totalNoStake', type: 'uint256' },
      { internalType: 'bool', name: 'resolved', type: 'bool' },
      { internalType: 'bool', name: 'outcome', type: 'bool' },
      { internalType: 'bool', name: 'cancelled', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_marketId', type: 'uint256' }],
    name: 'getMarketBettors',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_marketId', type: 'uint256' }],
    name: 'getOdds',
    outputs: [
      { internalType: 'uint256', name: 'yesOdds', type: 'uint256' },
      { internalType: 'uint256', name: 'noOdds', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_marketId', type: 'uint256' },
      { internalType: 'bool', name: '_position', type: 'bool' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'getPotentialWinnings',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_marketId', type: 'uint256' }],
    name: 'increaseBet',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'marketBettors',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'marketCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'markets',
    outputs: [
      { internalType: 'string', name: 'question', type: 'string' },
      { internalType: 'uint256', name: 'targetPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'uint256', name: 'resolutionTime', type: 'uint256' },
      { internalType: 'uint256', name: 'totalYesStake', type: 'uint256' },
      { internalType: 'uint256', name: 'totalNoStake', type: 'uint256' },
      { internalType: 'bool', name: 'resolved', type: 'bool' },
      { internalType: 'bool', name: 'outcome', type: 'bool' },
      { internalType: 'bool', name: 'cancelled', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minBet',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_marketId', type: 'uint256' },
      { internalType: 'bool', name: '_position', type: 'bool' },
    ],
    name: 'placeBet',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'platformFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'priceFeed',
    outputs: [{ internalType: 'contract AggregatorV3Interface', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_marketId', type: 'uint256' }],
    name: 'resolveMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_marketId', type: 'uint256' },
      { internalType: 'bool', name: '_outcome', type: 'bool' },
    ],
    name: 'resolveMarketManually',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_minBet', type: 'uint256' }],
    name: 'setMinBet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_fee', type: 'uint256' }],
    name: 'setPlatformFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
