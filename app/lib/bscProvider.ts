import { ethers } from 'ethers'

// Moralis Wallet API - Free tier available
// Get your free API key at: https://moralis.io/
const MORALIS_API_URL = 'https://deep-index.moralis.io/api/v2.2'
// BSC chain identifier for Moralis
const BSC_CHAIN = 'bsc' // Use 'bsc' for most endpoints

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Validate BSC address
 */
export function isValidBscAddress(address: string): boolean {
  return ethers.isAddress(address)
}

// Token transfer event structure
export interface TokenTransfer {
  txHash: string
  blockNumber: number
  timestamp: number
  from: string
  to: string
  contractAddress: string
  tokenName: string
  tokenSymbol: string
  tokenDecimals: number
  tokenLogo: string | null
  value: string
  formattedValue: number
}

// Token balance with price
export interface TokenBalance {
  tokenAddress: string
  name: string
  symbol: string
  logo: string | null
  decimals: number
  balance: string
  balanceFormatted: number
  usdPrice: number
  usdValue: number
  possibleSpam: boolean
}

// Token profitability data
export interface TokenProfitability {
  tokenAddress: string
  name: string
  symbol: string
  logo: string | null
  avgBuyPriceUsd: number
  avgSellPriceUsd: number
  totalUsdInvested: number
  totalTokensBought: number
  totalTokensSold: number
  totalSoldUsd: number
  realizedProfitUsd: number
  realizedProfitPercentage: number
  totalBuys: number
  totalSells: number
  countOfTrades: number
  possibleSpam: boolean
}

// Swap transaction
export interface SwapTransaction {
  transactionHash: string
  transactionType: 'buy' | 'sell'
  blockTimestamp: string
  blockNumber: number
  pairLabel: string
  exchangeName: string
  totalValueUsd: number
}

// Moralis ERC20 Transfer response
interface MoralisERC20TransferItem {
  token_name: string
  token_symbol: string
  token_logo: string | null
  token_decimals: string
  transaction_hash: string
  address: string
  block_timestamp: string
  block_number: number
  block_hash: string
  to_address: string
  from_address: string
  value: string
  transaction_index: number
  log_index: number
  possible_spam: string | boolean
  verified_contract: string | boolean
}

interface MoralisERC20TransfersResponse {
  page: string
  page_size: string
  cursor: string | null
  result: MoralisERC20TransferItem[]
}

// Moralis Token Balance response
interface MoralisTokenBalanceItem {
  token_address: string
  name: string
  symbol: string
  logo: string | null
  thumbnail: string | null
  decimals: number
  balance: string
  possible_spam: boolean
  verified_contract: boolean
  usd_price: number | null
  usd_price_24hr_percent_change: number | null
  usd_value: number | null
  balance_formatted: string
  native_token: boolean
}

interface MoralisTokenBalancesResponse {
  result: MoralisTokenBalanceItem[]
  cursor: string | null
}

// Moralis Profitability response
interface MoralisProfitabilityItem {
  token_address: string
  avg_buy_price_usd: string
  avg_sell_price_usd: string
  total_usd_invested: string
  total_tokens_sold: string
  total_tokens_bought: string
  total_sold_usd: string
  avg_cost_of_quantity_sold: string
  count_of_trades: string
  realized_profit_usd: string
  realized_profit_percentage: string
  total_buys: string
  total_sells: string
  name: string
  symbol: string
  decimals: string
  logo: string | null
  possible_spam: boolean
}

interface MoralisProfitabilityResponse {
  result: MoralisProfitabilityItem[]
}

// Moralis Swaps response
interface MoralisSwapItem {
  transactionHash: string
  transactionIndex: number
  transactionType: 'buy' | 'sell'
  blockTimestamp: string
  blockNumber: number
  walletAddress: string
  pairAddress: string
  pairLabel: string
  exchangeAddress: string
  exchangeName: string
  exchangeLogo: string
  baseQuotePrice: string
  totalValueUsd: number
}

interface MoralisSwapsResponse {
  page: string
  page_size: string
  cursor: string | null
  result: MoralisSwapItem[]
}

/**
 * Get Moralis API key or throw error
 */
function getApiKey(): string {
  const apiKey = process.env.MORALIS_API_KEY
  if (!apiKey) {
    throw new Error('MORALIS_API_KEY not configured. Get a free key at https://moralis.io/')
  }
  return apiKey
}

/**
 * Make authenticated request to Moralis API
 */
async function moralisRequest<T>(url: string): Promise<T> {
  const apiKey = getApiKey()

  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'X-API-Key': apiKey
    }
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid Moralis API key. Get a free key at https://moralis.io/')
    }
    if (response.status === 429) {
      throw new Error('Rate limited. Please wait and try again.')
    }
    const errorText = await response.text()
    throw new Error(`Moralis API error: ${response.status} - ${errorText}`)
  }

  return response.json()
}

/**
 * Fetch ERC20 token transfers using Moralis API
 * Endpoint: GET /:address/erc20/transfers
 */
export async function getTokenTransfers(
  walletAddress: string
): Promise<TokenTransfer[]> {
  const transfers: TokenTransfer[] = []

  // Calculate start date based on ANALYSIS_DAYS_HISTORY
  const daysToFetch = parseInt(process.env.ANALYSIS_DAYS_HISTORY || '30', 10)
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - daysToFetch)
  const fromDate = startDate.toISOString()

  console.log(`Fetching ${daysToFetch} days of ERC20 transfers from Moralis...`)

  let cursor: string | null = null
  let pageNum = 1
  const limit = 100

  do {
    try {
      if (pageNum > 1) {
        await delay(200)
      }

      let url = `${MORALIS_API_URL}/${walletAddress}/erc20/transfers?chain=${BSC_CHAIN}&order=DESC&limit=${limit}&from_date=${fromDate}`
      if (cursor) {
        url += `&cursor=${encodeURIComponent(cursor)}`
      }

      console.log(`Fetching transfers page ${pageNum}...`)
      const data = await moralisRequest<MoralisERC20TransfersResponse>(url)

      console.log(`Page ${pageNum}: fetched ${data.result?.length || 0} transfers`)

      if (!data.result || data.result.length === 0) {
        break
      }

      for (const tx of data.result) {
        // Skip spam tokens (check both string and boolean formats)
        if (tx.possible_spam === 'true' || tx.possible_spam === true) {
          continue
        }

        // Skip unverified contracts
        if (tx.verified_contract === 'false' || tx.verified_contract === false) {
          continue
        }

        const decimals = parseInt(tx.token_decimals, 10) || 18
        let formattedValue = 0
        try {
          formattedValue = parseFloat(ethers.formatUnits(tx.value || '0', decimals))
        } catch {
          continue
        }

        // Skip dust amounts
        if (formattedValue < 0.0001) continue

        // Skip tokens with suspicious names (common spam patterns)
        const tokenName = tx.token_name || ''
        const tokenSymbol = tx.token_symbol || ''
        if (
          tokenName.toLowerCase().includes('visit') ||
          tokenName.toLowerCase().includes('claim') ||
          tokenName.toLowerCase().includes('airdrop') ||
          tokenSymbol.length > 20 ||
          tokenName.includes('http')
        ) {
          continue
        }

        transfers.push({
          txHash: tx.transaction_hash,
          blockNumber: tx.block_number,
          timestamp: Math.floor(new Date(tx.block_timestamp).getTime() / 1000),
          from: tx.from_address,
          to: tx.to_address,
          contractAddress: tx.address?.toLowerCase() || '',
          tokenName: tokenName || 'Unknown',
          tokenSymbol: tokenSymbol || 'UNKNOWN',
          tokenDecimals: decimals,
          tokenLogo: tx.token_logo,
          value: tx.value || '0',
          formattedValue
        })
      }

      cursor = data.cursor
      pageNum++

      if (pageNum >= 50) {
        console.log('Reached maximum page limit')
        break
      }
    } catch (error) {
      console.error('Moralis transfers API error:', error)
      throw error
    }
  } while (cursor)

  // Sort by timestamp descending and remove duplicates
  transfers.sort((a, b) => b.timestamp - a.timestamp)
  const uniqueTransfers = transfers.filter((transfer, index, self) =>
    index === self.findIndex(t =>
      t.txHash === transfer.txHash && t.contractAddress === transfer.contractAddress
    )
  )

  console.log(`Total unique transfers found: ${uniqueTransfers.length}`)
  return uniqueTransfers
}

/**
 * Fetch token balances with USD prices
 * Endpoint: GET /wallets/:address/tokens
 */
export async function getTokenBalances(
  walletAddress: string
): Promise<TokenBalance[]> {
  console.log('Fetching token balances with prices from Moralis...')

  // Use all spam/unverified filters to get clean data
  const url = `${MORALIS_API_URL}/wallets/${walletAddress}/tokens?chain=${BSC_CHAIN}&exclude_spam=true&exclude_unverified_contracts=true&limit=100`
  const data = await moralisRequest<MoralisTokenBalancesResponse>(url)

  const balances: TokenBalance[] = []

  if (data.result) {
    for (const token of data.result) {
      // Double-check spam filter (API should already filter, but be safe)
      if (token.possible_spam) continue

      // Skip tokens with no value
      if (!token.usd_value || token.usd_value <= 0) continue

      balances.push({
        tokenAddress: token.token_address?.toLowerCase() || '',
        name: token.name || 'Unknown',
        symbol: token.symbol || 'UNKNOWN',
        logo: token.logo,
        decimals: token.decimals || 18,
        balance: token.balance || '0',
        balanceFormatted: parseFloat(token.balance_formatted || '0'),
        usdPrice: token.usd_price || 0,
        usdValue: token.usd_value || 0,
        possibleSpam: token.possible_spam
      })
    }
  }

  console.log(`Found ${balances.length} token balances (excluding spam & zero value)`)
  return balances
}

/**
 * Fetch wallet profitability/PnL breakdown by token
 * Endpoint: GET /wallets/:address/profitability
 * Note: This endpoint may not be available for all chains (BSC support is limited)
 */
export async function getWalletProfitability(
  walletAddress: string,
  days: string = 'all'
): Promise<TokenProfitability[]> {
  console.log(`Fetching wallet profitability (${days} days) from Moralis...`)

  // Try with 'bsc' chain name first, then hex format
  const chainFormats = ['bsc', '0x38']

  for (const chain of chainFormats) {
    const url = `${MORALIS_API_URL}/wallets/${walletAddress}/profitability?chain=${chain}&days=${days}`

    try {
      const apiKey = getApiKey()
      const response = await fetch(url, {
        headers: {
          'accept': 'application/json',
          'X-API-Key': apiKey
        }
      })

      if (!response.ok) {
        const errorText = await response.text()
        // If chain not supported, try next format or return empty
        if (errorText.includes('not supported') || response.status === 400) {
          console.log(`Profitability endpoint not available for chain ${chain}, trying next...`)
          continue
        }
        throw new Error(`Moralis API error: ${response.status} - ${errorText}`)
      }

      const data: MoralisProfitabilityResponse = await response.json()
      const profitability: TokenProfitability[] = []

      if (data.result) {
        for (const token of data.result) {
          // Skip spam tokens
          if (token.possible_spam) continue

          profitability.push({
            tokenAddress: token.token_address?.toLowerCase() || '',
            name: token.name || 'Unknown',
            symbol: token.symbol || 'UNKNOWN',
            logo: token.logo,
            avgBuyPriceUsd: parseFloat(token.avg_buy_price_usd || '0'),
            avgSellPriceUsd: parseFloat(token.avg_sell_price_usd || '0'),
            totalUsdInvested: parseFloat(token.total_usd_invested || '0'),
            totalTokensBought: parseFloat(token.total_tokens_bought || '0'),
            totalTokensSold: parseFloat(token.total_tokens_sold || '0'),
            totalSoldUsd: parseFloat(token.total_sold_usd || '0'),
            realizedProfitUsd: parseFloat(token.realized_profit_usd || '0'),
            realizedProfitPercentage: parseFloat(token.realized_profit_percentage || '0'),
            totalBuys: parseInt(token.total_buys || '0', 10),
            totalSells: parseInt(token.total_sells || '0', 10),
            countOfTrades: parseInt(token.count_of_trades || '0', 10),
            possibleSpam: token.possible_spam
          })
        }
      }

      console.log(`Found profitability data for ${profitability.length} tokens`)
      return profitability
    } catch (error) {
      console.warn(`Profitability API error with chain ${chain}:`, error)
    }
  }

  // Profitability endpoint may not be available for BSC
  console.log('Profitability endpoint not available for BSC, continuing without PnL data')
  return []
}

/**
 * Fetch swap transactions (buy/sell)
 * Endpoint: GET /wallets/:address/swaps
 * Note: Data available only from September 2024 onwards
 */
export async function getWalletSwaps(
  walletAddress: string
): Promise<SwapTransaction[]> {
  console.log('Fetching swap transactions from Moralis...')

  const daysToFetch = parseInt(process.env.ANALYSIS_DAYS_HISTORY || '30', 10)
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - daysToFetch)
  const fromDate = startDate.toISOString()

  const swaps: SwapTransaction[] = []
  let cursor: string | null = null
  let pageNum = 1

  do {
    try {
      if (pageNum > 1) {
        await delay(200)
      }

      let url = `${MORALIS_API_URL}/wallets/${walletAddress}/swaps?chain=${BSC_CHAIN}&order=DESC&limit=100&fromDate=${fromDate}`
      if (cursor) {
        url += `&cursor=${encodeURIComponent(cursor)}`
      }

      console.log(`Fetching swaps page ${pageNum}...`)
      const data = await moralisRequest<MoralisSwapsResponse>(url)

      if (!data.result || data.result.length === 0) {
        break
      }

      for (const swap of data.result) {
        swaps.push({
          transactionHash: swap.transactionHash,
          transactionType: swap.transactionType,
          blockTimestamp: swap.blockTimestamp,
          blockNumber: swap.blockNumber,
          pairLabel: swap.pairLabel,
          exchangeName: swap.exchangeName,
          totalValueUsd: swap.totalValueUsd
        })
      }

      cursor = data.cursor
      pageNum++

      if (pageNum >= 20) {
        break
      }
    } catch (error) {
      console.warn('Swaps API error (may not have swap data):', error)
      break
    }
  } while (cursor)

  console.log(`Found ${swaps.length} swap transactions`)
  return swaps
}

/**
 * Get token metadata
 */
export async function getTokenMetadata(_tokenAddress: string): Promise<{
  name: string
  symbol: string
  decimals: number
}> {
  return { name: 'Unknown', symbol: 'UNKNOWN', decimals: 18 }
}

/**
 * Get current block number
 */
export async function getBlockNumber(): Promise<number> {
  return 0
}
