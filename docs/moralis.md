Wallet API
Select what you want to achieve:

Get Wallet History
Get Wallet Token Balances
Get Wallet Token Approvals
Get Wallet Token Swaps
Get Wallet NFT Balances
Get Wallet DeFi Positions
Get Wallet Net-worth
Get Wallet PnL
Get Wallet Details
Get Wallet Domains
Get Wallet History
No.	Method	Description	API Reference	URL
1	getWalletHistory	Get full wallet history	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/:address/history
2	getWalletTransactions	Get native transactions by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/:address
3	getWalletTransactionsVerbose	Get decoded transactions by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/:address/verbose
4	getWalletTokenTransfers	Get ERC20 transfers by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/:address/erc20/transfers
5	getWalletNFTTransfers	Get NFT transfers by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/:address/nft/transfers
6	getNFTTradesByWallet	Get NFT trades by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/:address/nfts/trades
Get Wallet Token Balances
No.	Method	Description	API Reference	URL
7	getWalletTokenBalances	Get ERC20 token balance by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/:address/erc20
8	getWalletTokenBalancesPrices	Get Native & ERC20 token balances & prices by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/:address/tokens
9	getNativeBalance	Get native balance by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/:address/balance
10	getNativeBalancesForAddresses	Get native balance for multiple wallets	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/balances
Get Wallet Token Approvals
No.	Method	Description	API Reference	URL
11	getWalletApprovals	Get ERC20 approvals by wallet	Method Documentation	https://deep-index.moralis.io/api-docs-2.2/#/Wallets/getWalletApprovals
Get Wallet Token Swaps
No.	Method	Description	API Reference	URL
12	getSwapsByWalletAddress	Get swaps by wallet address	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/:address/swaps
Get Wallet NFT Balances
No.	Method	Description	API Reference	URL
13	getWalletNFTs	Get NFTs by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/:address/nft
14	getWalletNFTCollections	Get NFT collections by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/:address/nft/collections
Get Wallet DeFi Positions
No.	Method	Description	API Reference	URL
15	getDefiSummary	Get DeFi protocols by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/:address/defi/summary
16	getDefiPositionsSummary	Get DeFi positions by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/:address/defi/positions
17	getDefiPositionsByProtocol	Get detailed DeFi positions by wallet and protocol	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/:address/defi/:protocol/positions
Get Wallet Net-worth
No.	Method	Description	API Reference	URL
18	getWalletNetWorth	Get wallet net-worth	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/:address/net-worth
Get Wallet PnL
No.	Method	Description	API Reference	URL
19	getWalletProfitabilitySummary	Get Wallet PnL Summary	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/:address/profitability/summary
20	getWalletProfitability	Get Wallet PnL Breakdown	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/:address/profitability
Get Wallet Details
No.	Method	Description	API Reference	URL
21	getWalletActiveChains	Get chain activity by wallet	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/:address/chains
22	getWalletStats	Get wallet stats	Method Documentation	https://deep-index.moralis.io/api/v2.2/wallets/:address/stats
Get Wallet Domains
No.	Method	Description	API Reference	URL
23	resolveAddress	ENS Lookup by Address	Method Documentation	https://deep-index.moralis.io/api/v2.2/resolve/:address/reverse
24	resolveENSDomain	ENS Lookup by Domain	Method Documentation	https://deep-index.moralis.io/api/v2.2/resolve/ens/:domain
25	resolveAddressToDomain	Unstoppable Lookup by Address	Method Documentation	https://deep-index.moralis.io/api/v2.2/resolve/:address/domain
26	resolveDomain	Unstoppable Lookup by Domain	Method Documentation	https://deep-index.moralis.io/api/v2.2/resolve/:domain
Need support?
Questions? Problems? Need more info? Contact our Support for assitance!

Help improve these docs!
Edit page
Request a change
Was this page helpful?

Previous
Overview
Next
Get wallet history
Get Wallet History
Get Wallet Token Balances
Get Wallet Token Approvals
Get Wallet Token Swaps
Get Wallet NFT Balances
Get Wallet DeFi Positions
Get Wallet Net-worth
Get Wallet PnL
Get Wallet Details
Get Wallet Domains


Get Wallet Transaction History
GET
https://deep-index.moralis.io/api/v2.2/wallets/:address/history
Get the complete decoded transaction history for a given wallet. All transactions are parsed, decoded, categorized and summarized into human-readable records.

View all supported categories here.

PATH PARAMS
addressstringrequired
The address of the wallet
0xcB1C1FdE09f811B294172696404e88E658659905
QUERY PARAMS
chainstring
The chain to query

eth
from_blocknumber
The minimum block number from which to get the transactions

Provide the param 'from_block' or 'from_date'
If 'from_date' and 'from_block' are provided, 'from_block' will be used.
to_blocknumber
The maximum block number from which to get the transactions.

Provide the param 'to_block' or 'to_date'
If 'to_date' and 'to_block' are provided, 'to_block' will be used.
from_datestring
The start date from which to get the transactions (format in seconds or datestring accepted by momentjs)

Provide the param 'from_block' or 'from_date'
If 'from_date' and 'from_block' are provided, 'from_block' will be used.
to_datestring
Get the transactions up to this date (format in seconds or datestring accepted by momentjs)

Provide the param 'to_block' or 'to_date'
If 'to_date' and 'to_block' are provided, 'to_block' will be used.
include_internal_transactionsboolean
If the result should contain the internal transactions.

nft_metadataboolean
If the result should contain the nft metadata.

cursorstring
The cursor returned in the previous response (used for getting the next page).
orderstring
The order of the result, in ascending (ASC) or descending (DESC)

DESC
limitnumber
The desired page size of the result.
25
Responses
200
Returns wallet history of a wallet address
400
Bad Request
404
Not Found
429
Too Many Requests
500
Internal Server Error
API KEY
YOUR_API_KEY (Optional)
Test Live API
cURL
Node.js
Python
Go
PHP
// Node.js v18+ has native fetch support
// No additional dependencies required

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  },
};

fetch('https://deep-index.moralis.io/api/v2.2/wallets/0xcB1C1FdE09f811B294172696404e88E658659905/history?chain=eth&order=DESC&limit=25', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


Response Example

200 Returns wallet history of a wallet address
{
  "page": "2",
  "page_size": "100",
  "cursor": "",
  "result": [
    {
      "hash": "0x1ed85b3757a6d31d01a4d6677fc52fd3911d649a0af21fe5ca3f886b153773ed",
      "nonce": "1848059",
      "transaction_index": "108",
      "from_address_entity": "Opensea",
      "from_address_entity_logo": "https://opensea.io/favicon.ico",
      "from_address": "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
      "from_address_label": "Binance 1",
      "to_address_entity": "Beaver Build",
      "to_address_entity_logo": "https://beaverbuild.com/favicon.ico",
      "to_address": "0x003dde3494f30d861d063232c6a8c04394b686ff",
      "to_address_label": "Binance 2",
      "value": "115580000000000000",
      "gas": "30000",
      "gas_price": "52500000000",
      "input": "0x",
      "receipt_cumulative_gas_used": "4923073",
      "receipt_gas_used": "21000",
      "receipt_contract_address": "0x9869524fd160fe3adda6218883b6526c0977d3a5",
      "receipt_status": "1",
      "transaction_fee": "0.00000000000000063",
      "block_timestamp": "2021-05-07T11:08:35.000Z",
      "block_number": "12386788",
      "block_hash": "0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171",
      "internal_transactions": [
        {
          "transaction_hash": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
          "block_number": 12526958,
          "block_hash": "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86",
          "type": "CALL",
          "from": "0xd4a3BebD824189481FC45363602b83C9c7e9cbDf",
          "to": "0xa71db868318f0a0bae9411347cd4a6fa23d8d4ef",
          "value": "650000000000000000",
          "gas": "6721975",
          "gas_used": "6721975",
          "input": "0x",
          "output": "0x"
        }
      ],
      "category": "",
      "contract_interactions": [
        ""
      ],
      "possible_spam": "false",
      "method_label": "transfer",
      "summary": "transfer",
      "nft_transfers": [
        {
          "token_address": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
          "token_id": "15",
          "from_address_entity": "Opensea",
          "from_address_entity_logo": "https://opensea.io/favicon.ico",
          "from_address": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
          "from_address_label": "Binance 1",
          "to_address_entity": "Beaver Build",
          "to_address_entity_logo": "https://beaverbuild.com/favicon.ico",
          "to_address": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
          "to_address_label": "Binance 2",
          "value": "1000000000000000",
          "amount": "1",
          "contract_type": "ERC721",
          "transaction_type": "",
          "log_index": "",
          "operator": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
          "possible_spam": "false",
          "verified_collection": "false",
          "direction": "outgoing",
          "collection_logo": "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png",
          "collection_banner_image": "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png",
          "normalized_metadata": ""
        }
      ],
      "erc20_transfers": [
        {
          "token_name": "Tether USD",
          "token_symbol": "USDT",
          "token_logo": "https://cdn.moralis.io/images/325/large/Tether-logo.png?1598003707",
          "token_decimals": "6",
          "address": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
          "block_timestamp": "2021-04-02T10:07:54.000Z",
          "to_address_entity": "Beaver Build",
          "to_address_entity_logo": "https://beaverbuild.com/favicon.ico",
          "to_address": "0x62AED87d21Ad0F3cdE4D147Fdcc9245401Af0044",
          "to_address_label": "Binance 2",
          "from_address_entity": "Opensea",
          "from_address_entity_logo": "https://opensea.io/favicon.ico",
          "from_address": "0xd4a3BebD824189481FC45363602b83C9c7e9cbDf",
          "from_address_label": "Binance 1",
          "value": 650000000000000000,
          "value_formatted": "1.033",
          "log_index": 2,
          "possible_spam": "false",
          "verified_contract": "false"
        }
      ],
      "native_transfers": [
        {
          "from_address_entity": "Opensea",
          "from_address_entity_logo": "https://opensea.io/favicon.ico",
          "from_address": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
          "from_address_label": "Binance 1",
          "to_address_entity": "Beaver Build",
          "to_address_entity_logo": "https://beaverbuild.com/favicon.ico",
          "to_address": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
          "to_address_label": "Binance 2",
          "value": "1000000000000000",
          "value_formatted": "0.1",
          "direction": "outgoing",
          "internal_transaction": "false",
          "token_symbol": "ETH",
          "token_logo": "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png"
        }
      ],
      "logs": [
        {
          "log_index": "273",
          "transaction_hash": "0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5",
          "transaction_index": "204",
          "address": "0x3105d328c66d8d55092358cf595d54608178e9b5",
          "data": "0x00000000000000000000000000000000000000000000000de05239bccd4d537400000000000000000000000000024dbc80a9f80e3d5fc0a0ee30e2693781a443",
          "topic0": "0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a",
          "topic1": "0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391",
          "topic2": "0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9",
          "topic3": "",
          "block_timestamp": "2021-05-07T11:08:35.000Z",
          "block_number": "12386788",
          "block_hash": "0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171"
        }
      ]
    }
  ]
}


Get ERC20 token transfers by wallet
GET
https://deep-index.moralis.io/api/v2.2/:address/erc20/transfers
Get all ERC20 token transfers for a given wallet address, sorted by block number (newest first).

PATH PARAMS
addressstringrequired
The address of the wallet
0xcB1C1FdE09f811B294172696404e88E658659905
QUERY PARAMS
chainstring
The chain to query

eth
from_blocknumber
The minimum block number from which to get the transactions

Provide the param 'from_block' or 'from_date'
If 'from_date' and 'from_block' are provided, 'from_block' will be used.
to_blocknumber
The maximum block number from which to get the transactions.

Provide the param 'to_block' or 'to_date'
If 'to_date' and 'to_block' are provided, 'to_block' will be used.
from_datestring
The start date from which to get the transactions (format in seconds or datestring accepted by momentjs)

Provide the param 'from_block' or 'from_date'
If 'from_date' and 'from_block' are provided, 'from_block' will be used.
to_datestring
Get the transactions up to this date (format in seconds or datestring accepted by momentjs)

Provide the param 'to_block' or 'to_date'
If 'to_date' and 'to_block' are provided, 'to_block' will be used.
contract_addressesarray
List of contract addresses of transfers
No items in the array
Add Item
limitnumber
The desired page size of the result.
25
orderstring
The order of the result, in ascending (ASC) or descending (DESC)

DESC
cursorstring
The cursor returned in the previous response (used for getting the next page).
Responses
200
Returns a collection of token transactions.
400
Bad Request
404
Not Found
429
Too Many Requests
500
Internal Server Error
API KEY
YOUR_API_KEY (Optional)
Test Live API
cURL
Node.js
Python
Go
PHP
// Node.js v18+ has native fetch support
// No additional dependencies required

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  },
};

fetch('https://deep-index.moralis.io/api/v2.2/0xcB1C1FdE09f811B294172696404e88E658659905/erc20/transfers?chain=eth&limit=25&order=DESC', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


Response Example

200 Returns a collection of token transactions.
{
  "page": "2",
  "page_size": "100",
  "cursor": "",
  "result": [
    {
      "token_name": "Tether USD",
      "token_symbol": "USDT",
      "token_logo": "cdn.moralis.io/325/large/Tether-logo.png?1598003707",
      "token_decimals": "6",
      "transaction_hash": "0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09",
      "address": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
      "block_timestamp": "2021-04-02T10:07:54.000Z",
      "block_number": 12526958,
      "block_hash": "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86",
      "to_address_entity": "Beaver Build",
      "to_address_entity_logo": "https://beaverbuild.com/favicon.ico",
      "to_address": "0x62AED87d21Ad0F3cdE4D147Fdcc9245401Af0044",
      "to_address_label": "Binance 2",
      "from_address_entity": "Opensea",
      "from_address_entity_logo": "https://opensea.io/favicon.ico",
      "from_address": "0xd4a3BebD824189481FC45363602b83C9c7e9cbDf",
      "from_address_label": "Binance 1",
      "value": 650000000000000000,
      "transaction_index": 12,
      "log_index": 2,
      "possible_spam": "false",
      "verified_contract": "false"
    }
  ]
}


Get Native & ERC20 Token Balances by Wallet
GET
https://deep-index.moralis.io/api/v2.2/wallets/:address/tokens
Fetch ERC20 and native token balances for a given wallet address, including their USD prices. Each token returned includes on-chain metadata, as well as off-chain metadata, logos, spam status and more. Additional options to exclude spam tokens, low-liquidity tokens and inactive tokens.

PATH PARAMS
addressstringrequired
The address from which token balances will be checked
0xcB1C1FdE09f811B294172696404e88E658659905
QUERY PARAMS
chainstring
The chain to query

eth
to_blocknumber
The block number up to which the balances will be checked.
token_addressesarray
The addresses to get balances for (optional)
No items in the array
Add Item
exclude_spamboolean
Exclude spam tokens from the result

exclude_unverified_contractsboolean
Exclude unverified contracts from the result

cursorstring
The cursor returned in the previous response (used for getting the next page).
limitnumber
The desired page size of the result.
25
exclude_nativeboolean
Exclude native balance from the result

max_token_inactivitynumber
Exclude tokens inactive for more than the given amount of days
min_pair_side_liquidity_usdnumber
Exclude tokens with liquidity less than the specified amount in USD. This parameter refers to the liquidity on a single side of the pair.
Responses
200
Returns token balances with prices for a specific address
400
Bad Request
404
Not Found
429
Too Many Requests
500
Internal Server Error
API KEY
YOUR_API_KEY (Optional)
Test Live API
cURL
Node.js
Python
Go
PHP
// Node.js v18+ has native fetch support
// No additional dependencies required

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  },
};

fetch('https://deep-index.moralis.io/api/v2.2/wallets/0xcB1C1FdE09f811B294172696404e88E658659905/tokens?chain=eth&limit=25', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


Response Example

200 Returns token balances with prices for a specific address
{
  "page": "2",
  "page_size": "100",
  "block_number": "13680123",
  "cursor": "",
  "result": [
    {
      "token_address": "",
      "name": "",
      "symbol": "",
      "logo": "",
      "thumbnail": "",
      "decimals": "",
      "balance": "",
      "possible_spam": "",
      "verified_contract": "",
      "usd_price": "",
      "usd_price_24hr_percent_change": "",
      "usd_price_24hr_usd_change": "",
      "usd_value_24hr_usd_change": "",
      "usd_value": "",
      "portfolio_percentage": "",
      "balance_formatted": "",
      "native_token": "",
      "total_supply": "",
      "total_supply_formatted": "",
      "percentage_relative_to_total_supply": ""
    }
  ]
}


Need support?
Questions? Problems? Need more info? Contact our Support for assitance!

Help improve these docs!
Edit page
Request a change
Was this page helpful?

Get Swaps by Wallet Address Mainnet Only
Solana Logo
Looking for swaps by wallet address on Solana?
Access swaps by wallet address data using our powerful Solana API

Explore Solana API
GET
https://deep-index.moralis.io/api/v2.2/wallets/:address/swaps
List all swap transactions (buy/sell) for a specific wallet. Optionally filter by tokenAddress for specific token swaps.

Note
Swaps data is synced and available only from September 2024 onwards. Data prior to this date is not included.

PATH PARAMS
addressstringrequired
The wallet address token-transactions are to be retrieved for.
0xcB1C1FdE09f811B294172696404e88E658659905
QUERY PARAMS
chainstring
The chain to query

eth
tokenAddressstring
The token address to get transaction for (optional)
cursorstring
The cursor returned in the previous response (used for getting the next page).
limitnumber
The desired page size of the result.
25
fromBlocknumber
The minimum block number from which to get the token transactions

Provide the param 'from_block' or 'from_date'
If 'from_date' and 'from_block' are provided, 'from_block' will be used.
toBlockstring
The block number to get the token transactions from
fromDatestring
The start date from which to get the token transactions (format in seconds or datestring accepted by momentjs)

Provide the param 'from_block' or 'from_date'
If 'from_date' and 'from_block' are provided, 'from_block' will be used.
toDatestring
The end date from which to get the token transactions (format in seconds or datestring accepted by momentjs)

Provide the param 'to_block' or 'to_date'
If 'to_date' and 'to_block' are provided, 'to_block' will be used.
orderstring
The order of the result, in ascending (ASC) or descending (DESC)

DESC
transactionTypesstring
Array of transaction types. Allowed values are 'buy', 'sell'.
Responses
200
Returns swap transactions by wallet address.
400
Bad Request
404
Not Found
429
Too Many Requests
500
Internal Server Error
API KEY
YOUR_API_KEY (Optional)
Test Live API
cURL
Node.js
Python
Go
PHP
// Node.js v18+ has native fetch support
// No additional dependencies required

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  },
};

fetch('https://deep-index.moralis.io/api/v2.2/wallets/0xcB1C1FdE09f811B294172696404e88E658659905/swaps?chain=eth&limit=25&order=DESC', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


Response Example

200 Returns swap transactions by wallet address.
{
  "page": "2",
  "page_size": "100",
  "cursor": "",
  "result": [
    {
      "transactionHash": "0x2bfcba4715774420936669cd0ff2241d70e9abecab76c9db813602015b3134ad",
      "transactionIndex": 1,
      "transactionType": "buy",
      "blockTimestamp": "2022-02-22T00:00:00Z",
      "blockNumber": 21093423,
      "subCategory": "accumulation",
      "walletAddress": "0x2bfcba4715774420936669cd0ff2241d70e9abec",
      "walletAddressLabel": "Murad Wallet",
      "entity": "Murad",
      "entityLogo": "https://entities-logos.s3.us-east-1.amazonaws.com/murad.png",
      "pairAddress": "0x36a46dff597c5a444bbc521d26787f57867d2214",
      "pairLabel": "BRETT/WETH",
      "exchangeAddress": "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f",
      "exchangeName": "Uniswap v2",
      "exchangeLogo": "https://entities-logos.s3.us-east-1.amazonaws.com/uniswap.png",
      "baseQuotePrice": "0.00003376480687",
      "totalValueUsd": 1165
    }
  ]
}

Get wallet net worth
GET
https://deep-index.moralis.io/api/v2.2/wallets/:address/net-worth
Calculate the total net worth of a wallet in USD, with options to exclude spam tokens for accuracy. Options to query cross-chain using the chains parameter, as well as additional options to exclude spam tokens, low-liquidity tokens and inactive tokens.

Note
We recommend to filter out spam tokens and unverified contracts to get a more accurate result.
Endpoint only works on the Mainnet chains.

PATH PARAMS
addressstringrequired
The wallet address
0xcB1C1FdE09f811B294172696404e88E658659905
QUERY PARAMS
chainsarray
The chains to query
No items in the array
Add Item
exclude_spamboolean
Exclude spam tokens from the result

true
exclude_unverified_contractsboolean
Exclude unverified contracts from the result

true
max_token_inactivitynumber
Exclude tokens inactive for more than the given amount of days
1
min_pair_side_liquidity_usdnumber
Exclude tokens with liquidity less than the specified amount in USD. This parameter refers to the liquidity on a single side of the pair.
1000
Responses
200
Returns the net worth of a wallet in USD
400
Bad Request
404
Not Found
429
Too Many Requests
500
Internal Server Error
API KEY
YOUR_API_KEY (Optional)
Test Live API
cURL
Node.js
Python
Go
PHP
// Node.js v18+ has native fetch support
// No additional dependencies required

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  },
};

fetch('https://deep-index.moralis.io/api/v2.2/wallets/0xcB1C1FdE09f811B294172696404e88E658659905/net-worth?exclude_spam=true&exclude_unverified_contracts=true&max_token_inactivity=1&min_pair_side_liquidity_usd=1000', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


Response Example

200 Returns the net worth of a wallet in USD
{
  "total_networth_usd": "3879851.41",
  "chains": [
    {
      "chain": "eth",
      "native_balance": "1085513807021271641379",
      "native_balance_formatted": "1085.513807021271641379",
      "native_balance_usd": "3158392.48",
      "token_balance_usd": "721458.93",
      "networth_usd": "3879851.41"
    }
  ],
  "unsupported_chain_ids": [
    ""
  ],
  "unavailable_chains": [
    {
      "chain_id": "0x1"
    }
  ]
}


Get Wallet PnL Summary
GET
https://deep-index.moralis.io/api/v2.2/wallets/:address/profitability/summary
Get a profit and loss summary for a given wallet, over a specified timeframe (days).

PATH PARAMS
addressstringrequired
The wallet address for which profitability summary is to be retrieved.
0xcB1C1FdE09f811B294172696404e88E658659905
QUERY PARAMS
daysstring
Timeframe in days for the profitability summary. Options include 'all', '7', '30', '60', '90' default is 'all'.
chainstring
The chain to query

eth
Responses
200
Successful response with the profitability summary.
400
Bad Request
404
Not Found
429
Too Many Requests
500
Internal Server Error
API KEY
YOUR_API_KEY (Optional)
Test Live API
cURL
Node.js
Python
Go
PHP
// Node.js v18+ has native fetch support
// No additional dependencies required

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  },
};

fetch('https://deep-index.moralis.io/api/v2.2/wallets/0xcB1C1FdE09f811B294172696404e88E658659905/profitability/summary?chain=eth', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


Response Example

200 Successful response with the profitability summary.
Empty

Get Wallet PnL Breakdown
GET
https://deep-index.moralis.io/api/v2.2/wallets/:address/profitability
Get a detailed profit and loss breakdown by token for a given wallet, over a specified timeframe (days). Optionally filter by token_addresses for specific tokens.

PATH PARAMS
addressstringrequired
The wallet address for which profitability is to be retrieved.
0xcB1C1FdE09f811B294172696404e88E658659905
QUERY PARAMS
daysstring
Timeframe in days for which profitability is calculated, Options include 'all', '7', '30', '60', '90' default is 'all'.
chainstring
The chain to query

eth
token_addressesarray
The token addresses list to filter the result with
No items in the array
Add Item
Responses
200
Successful response with profitability data.
400
Bad Request
404
Not Found
429
Too Many Requests
500
Internal Server Error
API KEY
YOUR_API_KEY (Optional)
Test Live API
cURL
Node.js
Python
Go
PHP
// Node.js v18+ has native fetch support
// No additional dependencies required

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  },
};

fetch('https://deep-index.moralis.io/api/v2.2/wallets/0xcB1C1FdE09f811B294172696404e88E658659905/profitability?chain=eth', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


Response Example

200 Successful response with profitability data.
{
  "result": [
    {
      "token_address": "",
      "avg_buy_price_usd": "",
      "avg_sell_price_usd": "",
      "total_usd_invested": "",
      "total_tokens_sold": "",
      "total_tokens_bought": "",
      "total_sold_usd": "",
      "avg_cost_of_quantity_sold": "",
      "count_of_trades": "",
      "realized_profit_usd": "",
      "realized_profit_percentage": "",
      "total_buys": "",
      "total_sells": "",
      "name": "",
      "symbol": "",
      "decimals": "",
      "logo": "",
      "possible_spam": ""
    }
  ]
}