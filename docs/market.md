Let move to the Market page /dashboard/market

This is a bnb price prediction market built on the BNB chain

Here is the Contract Address = 0x88Ec1f30689787D6dd057b134C1de989735178fc

The Contract ABI = [{"inputs":[{"internalType":"address","name":"_priceFeed","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"marketId","type":"uint256"},{"indexed":true,"internalType":"address","name":"bettor","type":"address"},{"indexed":false,"internalType":"bool","name":"position","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BetPlaced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"marketId","type":"uint256"}],"name":"MarketCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"marketId","type":"uint256"},{"indexed":false,"internalType":"string","name":"question","type":"string"},{"indexed":false,"internalType":"uint256","name":"targetPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"resolutionTime","type":"uint256"}],"name":"MarketCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"marketId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"outcome","type":"bool"},{"indexed":false,"internalType":"uint256","name":"finalPrice","type":"uint256"}],"name":"MarketResolved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"marketId","type":"uint256"},{"indexed":true,"internalType":"address","name":"bettor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WinningsClaimed","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"bets","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"position","type":"bool"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketId","type":"uint256"}],"name":"cancelMarket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketId","type":"uint256"}],"name":"claimWinnings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_question","type":"string"},{"internalType":"uint256","name":"_targetPrice","type":"uint256"},{"internalType":"uint256","name":"_bettingDeadline","type":"uint256"},{"internalType":"uint256","name":"_resolutionTime","type":"uint256"}],"name":"createMarket","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketId","type":"uint256"},{"internalType":"address","name":"_bettor","type":"address"}],"name":"getBet","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"position","type":"bool"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLatestPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketId","type":"uint256"}],"name":"getMarket","outputs":[{"internalType":"string","name":"question","type":"string"},{"internalType":"uint256","name":"targetPrice","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"resolutionTime","type":"uint256"},{"internalType":"uint256","name":"totalYesStake","type":"uint256"},{"internalType":"uint256","name":"totalNoStake","type":"uint256"},{"internalType":"bool","name":"resolved","type":"bool"},{"internalType":"bool","name":"outcome","type":"bool"},{"internalType":"bool","name":"cancelled","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketId","type":"uint256"}],"name":"getMarketBettors","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketId","type":"uint256"}],"name":"getOdds","outputs":[{"internalType":"uint256","name":"yesOdds","type":"uint256"},{"internalType":"uint256","name":"noOdds","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketId","type":"uint256"},{"internalType":"bool","name":"_position","type":"bool"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getPotentialWinnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketId","type":"uint256"}],"name":"increaseBet","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"marketBettors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"markets","outputs":[{"internalType":"string","name":"question","type":"string"},{"internalType":"uint256","name":"targetPrice","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"resolutionTime","type":"uint256"},{"internalType":"uint256","name":"totalYesStake","type":"uint256"},{"internalType":"uint256","name":"totalNoStake","type":"uint256"},{"internalType":"bool","name":"resolved","type":"bool"},{"internalType":"bool","name":"outcome","type":"bool"},{"internalType":"bool","name":"cancelled","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minBet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketId","type":"uint256"},{"internalType":"bool","name":"_position","type":"bool"}],"name":"placeBet","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"platformFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketId","type":"uint256"}],"name":"resolveMarket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketId","type":"uint256"},{"internalType":"bool","name":"_outcome","type":"bool"}],"name":"resolveMarketManually","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minBet","type":"uint256"}],"name":"setMinBet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setPlatformFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFees","outputs":[],"stateMutability":"nonpayable","type":"function"}]

the Contract Solidity code = // SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract BNBPredictionMarket {
    
    struct Market {
        string question;
        uint256 targetPrice;      // Target price in USD (8 decimals, e.g., 1000 * 1e8)
        uint256 deadline;         // Betting deadline
        uint256 resolutionTime;   // When the price is checked
        uint256 totalYesStake;
        uint256 totalNoStake;
        bool resolved;
        bool outcome;             // true = Yes won, false = No won
        bool cancelled;
    }

    struct Bet {
        uint256 amount;
        bool position;  // true = Yes, false = No
        bool claimed;
    }

    address public owner;
    uint256 public marketCount;
    uint256 public platformFee = 200;  // 2% fee (basis points)
    uint256 public minBet = 0.01 ether;
    
    AggregatorV3Interface public priceFeed;
    
    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => Bet)) public bets;
    mapping(uint256 => address[]) public marketBettors;
    
    event MarketCreated(uint256 indexed marketId, string question, uint256 targetPrice, uint256 resolutionTime);
    event BetPlaced(uint256 indexed marketId, address indexed bettor, bool position, uint256 amount);
    event MarketResolved(uint256 indexed marketId, bool outcome, uint256 finalPrice);
    event WinningsClaimed(uint256 indexed marketId, address indexed bettor, uint256 amount);
    event MarketCancelled(uint256 indexed marketId);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor(address _priceFeed) {
        owner = msg.sender;
        // BNB/USD on BSC Mainnet: 0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE
        // BNB/USD on BSC Testnet: 0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526
        priceFeed = AggregatorV3Interface(_priceFeed);
    }
    
    // ============ MARKET MANAGEMENT ============
    
    function createMarket(
        string calldata _question,
        uint256 _targetPrice,
        uint256 _bettingDeadline,
        uint256 _resolutionTime
    ) external onlyOwner returns (uint256) {
        require(_bettingDeadline > block.timestamp, "Deadline must be future");
        require(_resolutionTime > _bettingDeadline, "Resolution after deadline");
        require(_targetPrice > 0, "Invalid target price");
        
        uint256 marketId = marketCount++;
        
        markets[marketId] = Market({
            question: _question,
            targetPrice: _targetPrice,
            deadline: _bettingDeadline,
            resolutionTime: _resolutionTime,
            totalYesStake: 0,
            totalNoStake: 0,
            resolved: false,
            outcome: false,
            cancelled: false
        });
        
        emit MarketCreated(marketId, _question, _targetPrice, _resolutionTime);
        return marketId;
    }
    
    // ============ BETTING ============
    
    function placeBet(uint256 _marketId, bool _position) external payable {
        Market storage market = markets[_marketId];
        
        require(!market.cancelled, "Market cancelled");
        require(block.timestamp < market.deadline, "Betting closed");
        require(msg.value >= minBet, "Below minimum bet");
        require(bets[_marketId][msg.sender].amount == 0, "Already bet");
        
        bets[_marketId][msg.sender] = Bet({
            amount: msg.value,
            position: _position,
            claimed: false
        });
        
        marketBettors[_marketId].push(msg.sender);
        
        if (_position) {
            market.totalYesStake += msg.value;
        } else {
            market.totalNoStake += msg.value;
        }
        
        emit BetPlaced(_marketId, msg.sender, _position, msg.value);
    }
    
    function increaseBet(uint256 _marketId) external payable {
        Market storage market = markets[_marketId];
        Bet storage bet = bets[_marketId][msg.sender];
        
        require(!market.cancelled, "Market cancelled");
        require(block.timestamp < market.deadline, "Betting closed");
        require(bet.amount > 0, "No existing bet");
        require(msg.value > 0, "Must send BNB");
        
        bet.amount += msg.value;
        
        if (bet.position) {
            market.totalYesStake += msg.value;
        } else {
            market.totalNoStake += msg.value;
        }
        
        emit BetPlaced(_marketId, msg.sender, bet.position, msg.value);
    }
    
    // ============ RESOLUTION ============
    
    function resolveMarket(uint256 _marketId) external {
        Market storage market = markets[_marketId];
        
        require(!market.resolved, "Already resolved");
        require(!market.cancelled, "Market cancelled");
        require(block.timestamp >= market.resolutionTime, "Too early");
        
        uint256 currentPrice = getLatestPrice();
        bool outcome = currentPrice >= market.targetPrice;
        
        market.resolved = true;
        market.outcome = outcome;
        
        emit MarketResolved(_marketId, outcome, currentPrice);
    }
    
    // Manual resolution (backup if oracle fails)
    function resolveMarketManually(uint256 _marketId, bool _outcome) external onlyOwner {
        Market storage market = markets[_marketId];
        
        require(!market.resolved, "Already resolved");
        require(!market.cancelled, "Market cancelled");
        require(block.timestamp >= market.resolutionTime, "Too early");
        
        market.resolved = true;
        market.outcome = _outcome;
        
        emit MarketResolved(_marketId, _outcome, 0);
    }
    
    function cancelMarket(uint256 _marketId) external onlyOwner {
        Market storage market = markets[_marketId];
        require(!market.resolved, "Already resolved");
        market.cancelled = true;
        emit MarketCancelled(_marketId);
    }
    
    // ============ CLAIMING ============
    
    function claimWinnings(uint256 _marketId) external {
        Market storage market = markets[_marketId];
        Bet storage bet = bets[_marketId][msg.sender];
        
        require(bet.amount > 0, "No bet placed");
        require(!bet.claimed, "Already claimed");
        
        uint256 payout;
        
        if (market.cancelled) {
            // Refund on cancellation
            payout = bet.amount;
        } else {
            require(market.resolved, "Not resolved");
            require(bet.position == market.outcome, "You lost");
            
            uint256 totalPool = market.totalYesStake + market.totalNoStake;
            uint256 winningPool = market.outcome ? market.totalYesStake : market.totalNoStake;
            
            // Calculate share of total pool
            uint256 grossPayout = (bet.amount * totalPool) / winningPool;
            uint256 fee = (grossPayout * platformFee) / 10000;
            payout = grossPayout - fee;
        }
        
        bet.claimed = true;
        
        (bool success, ) = payable(msg.sender).call{value: payout}("");
        require(success, "Transfer failed");
        
        emit WinningsClaimed(_marketId, msg.sender, payout);
    }
    
    // ============ VIEW FUNCTIONS ============
    
    function getLatestPrice() public view returns (uint256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price");
        return uint256(price);
    }
    
    function getMarket(uint256 _marketId) external view returns (
        string memory question,
        uint256 targetPrice,
        uint256 deadline,
        uint256 resolutionTime,
        uint256 totalYesStake,
        uint256 totalNoStake,
        bool resolved,
        bool outcome,
        bool cancelled
    ) {
        Market storage m = markets[_marketId];
        return (
            m.question,
            m.targetPrice,
            m.deadline,
            m.resolutionTime,
            m.totalYesStake,
            m.totalNoStake,
            m.resolved,
            m.outcome,
            m.cancelled
        );
    }
    
    function getBet(uint256 _marketId, address _bettor) external view returns (
        uint256 amount,
        bool position,
        bool claimed
    ) {
        Bet storage b = bets[_marketId][_bettor];
        return (b.amount, b.position, b.claimed);
    }
    
    function getOdds(uint256 _marketId) external view returns (
        uint256 yesOdds,
        uint256 noOdds
    ) {
        Market storage m = markets[_marketId];
        uint256 total = m.totalYesStake + m.totalNoStake;
        if (total == 0) return (0, 0);
        
        // Returns odds in basis points (10000 = 1x)
        yesOdds = m.totalYesStake > 0 ? (total * 10000) / m.totalYesStake : 0;
        noOdds = m.totalNoStake > 0 ? (total * 10000) / m.totalNoStake : 0;
    }
    
    function getPotentialWinnings(uint256 _marketId, bool _position, uint256 _amount) external view returns (uint256) {
        Market storage m = markets[_marketId];
        uint256 totalPool = m.totalYesStake + m.totalNoStake + _amount;
        uint256 winningPool = _position ? (m.totalYesStake + _amount) : (m.totalNoStake + _amount);
        
        uint256 gross = (_amount * totalPool) / winningPool;
        uint256 fee = (gross * platformFee) / 10000;
        return gross - fee;
    }
    
    function getMarketBettors(uint256 _marketId) external view returns (address[] memory) {
        return marketBettors[_marketId];
    }
    
    // ============ ADMIN ============
    
    function setPlatformFee(uint256 _fee) external onlyOwner {
        require(_fee <= 1000, "Max 10%");
        platformFee = _fee;
    }
    
    function setMinBet(uint256 _minBet) external onlyOwner {
        minBet = _minBet;
    }
    
    function withdrawFees() external onlyOwner {
        // Only withdraw accumulated fees (be careful with this)
        (bool success, ) = payable(owner).call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }
    
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        owner = _newOwner;
    }
}.


function docs. 
# BNB Prediction Market - Function Reference

## Write Functions

### createMarket (Owner Only)
Creates a new prediction market.

| Parameter | Type | Description |
|-----------|------|-------------|
| _question | string | The prediction question (e.g., "Will BNB reach $1000?") |
| _targetPrice | uint256 | Target price in USD with 8 decimals (e.g., 1000 * 1e8) |
| _bettingDeadline | uint256 | Unix timestamp when betting closes |
| _resolutionTime | uint256 | Unix timestamp when outcome is determined |

---

### placeBet
Place a new bet on a market. Send BNB with the transaction.

| Parameter | Type | Description |
|-----------|------|-------------|
| _marketId | uint256 | The market ID to bet on |
| _position | bool | `true` = YES, `false` = NO |

**Requirements:** Market open, not cancelled, above minimum bet, user hasn't bet before.

---

### increaseBet
Add more BNB to your existing bet. Send BNB with the transaction.

| Parameter | Type | Description |
|-----------|------|-------------|
| _marketId | uint256 | The market ID |

**Requirements:** Must have an existing bet, market still open.

---

### resolveMarket
Settles the market using Chainlink price feed. Anyone can call.

| Parameter | Type | Description |
|-----------|------|-------------|
| _marketId | uint256 | The market ID to resolve |

**Requirements:** Resolution time reached, not already resolved or cancelled.

---

### resolveMarketManually (Owner Only)
Backup resolution if oracle fails.

| Parameter | Type | Description |
|-----------|------|-------------|
| _marketId | uint256 | The market ID |
| _outcome | bool | `true` = YES wins, `false` = NO wins |

**Requirements:** Resolution time reached, not already resolved or cancelled.

---

### cancelMarket (Owner Only)
Cancels a market. Users can reclaim their bets.

| Parameter | Type | Description |
|-----------|------|-------------|
| _marketId | uint256 | The market ID to cancel |

**Requirements:** Market not already resolved.

---

### claimWinnings
Claim your payout after resolution (or refund if cancelled).

| Parameter | Type | Description |
|-----------|------|-------------|
| _marketId | uint256 | The market ID |

**Requirements:** Must have placed a bet, must have won (or market cancelled), not already claimed.

---

### setPlatformFee (Owner Only)
Update the platform fee percentage.

| Parameter | Type | Description |
|-----------|------|-------------|
| _fee | uint256 | Fee in basis points (200 = 2%, max 1000 = 10%) |

---

### setMinBet (Owner Only)
Update the minimum bet amount.

| Parameter | Type | Description |
|-----------|------|-------------|
| _minBet | uint256 | Minimum bet in wei |

---

### withdrawFees (Owner Only)
Withdraw accumulated platform fees from the contract.

---

### transferOwnership (Owner Only)
Transfer contract ownership to a new address.

| Parameter | Type | Description |
|-----------|------|-------------|
| _newOwner | address | New owner address |

---

## Read Functions

### getMarket
Get all details for a specific market.

| Parameter | Type | Description |
|-----------|------|-------------|
| _marketId | uint256 | The market ID |

**Returns:** question, targetPrice, deadline, resolutionTime, totalYesStake, totalNoStake, resolved, outcome, cancelled

---

### getBet
Get a user's bet details for a market.

| Parameter | Type | Description |
|-----------|------|-------------|
| _marketId | uint256 | The market ID |
| _bettor | address | User's wallet address |

**Returns:** amount, position, claimed

---

### getOdds
Get current odds for a market in basis points.

| Parameter | Type | Description |
|-----------|------|-------------|
| _marketId | uint256 | The market ID |

**Returns:** yesOdds, noOdds (10000 = 1x, 20000 = 2x, etc.)

---

### getPotentialWinnings
Calculate potential payout before placing a bet.

| Parameter | Type | Description |
|-----------|------|-------------|
| _marketId | uint256 | The market ID |
| _position | bool | `true` = YES, `false` = NO |
| _amount | uint256 | Bet amount in wei |

**Returns:** Potential payout after fees

---

### getLatestPrice
Get current BNB/USD price from Chainlink.

**Returns:** Price with 8 decimals (e.g., 65000000000 = $650.00)

---

### getMarketBettors
Get list of all addresses that bet on a market.

| Parameter | Type | Description |
|-----------|------|-------------|
| _marketId | uint256 | The market ID |

**Returns:** Array of bettor addresses

---

## Public Variables

| Variable | Type | Description |
|----------|------|-------------|
| owner | address | Contract owner |
| marketCount | uint256 | Total markets created |
| platformFee | uint256 | Fee in basis points (default: 200 = 2%) |
| minBet | uint256 | Minimum bet amount (default: 0.01 BNB) |
| priceFeed | address | Chainlink oracle address |

