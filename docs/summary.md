# Baby Crepe - Codebase Summary

## Overview

**Baby Crepe** is a Next.js-based prediction market application designed for managing cryptocurrency predictions and trading insights. Users can browse prediction markets across different categories, convert small coin balances ("dust") into BNB tokens, and view on-chain transaction history.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.0.1 |
| Language | TypeScript 5 |
| UI Library | React 19.2.0 |
| Styling | Tailwind CSS 4 |
| Components | Mantine UI 8.3.6 |
| Icons | Lucide React, React Icons |

---

## Directory Structure

```
baby-crepe/
├── app/
│   ├── (routes)/
│   │   └── dashboard/
│   │       ├── page.tsx              # Redirects to /market
│   │       ├── layout.tsx            # Dashboard shell (sidebar + navbar)
│   │       ├── market/
│   │       │   ├── page.tsx          # Market listings with filtering
│   │       │   └── [slug]/page.tsx   # Individual market details
│   │       ├── dust-converter/
│   │       │   └── page.tsx          # Dust to BNB conversion tool
│   │       └── on-chain/
│   │           └── page.tsx          # On-chain wallet data & transactions
│   ├── components/
│   │   ├── Navbar.tsx               # Top navigation with wallet connection
│   │   ├── MarketCard.tsx           # Card for market items
│   │   ├── OnChainCard.tsx          # Card for on-chain statistics
│   │   └── ChanceGauge.tsx          # SVG probability gauge
│   ├── context/
│   │   └── UserContext.tsx          # User context provider
│   ├── types/
│   │   ├── user.ts                  # User interface
│   │   ├── market.ts                # Market item interfaces
│   │   ├── dust.ts                  # Dust coin interface
│   │   ├── onChainCard.ts           # On-chain card props
│   │   └── transaction.ts           # Transaction interface
│   ├── data/
│   │   ├── user.ts                  # Mock user data
│   │   ├── marketData.ts            # Market predictions (15+)
│   │   ├── dustData.ts              # Sample dust tokens
│   │   ├── onChainCardsData.ts      # On-chain insight cards
│   │   └── transactionsData.ts      # Transaction history
│   ├── fonts/fonts.ts               # Google Fonts configuration
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Landing page
│   ├── provider.tsx                 # App providers (Mantine, UserContext)
│   └── globals.css                  # Global styles & Tailwind config
├── public/
│   └── images/logo.png              # Baby Crepe logo
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## Routing Structure

| Route | Description |
|-------|-------------|
| `/` | Landing page with CTA |
| `/dashboard` | Redirects to `/dashboard/market` |
| `/dashboard/market` | Market listing page with search & filtering |
| `/dashboard/market/[slug]` | Individual market details page |
| `/dashboard/dust-converter` | Dust to BNB conversion tool |
| `/dashboard/on-chain` | On-chain transaction history |

---

## Core Components

### Navbar.tsx
- Fixed header with logo, navigation, and user profile
- Responsive: hamburger menu (mobile), full navbar (desktop)
- User dropdown showing: username, status, tweets, followers, points
- Wallet connection/disconnect functionality

### MarketCard.tsx
- Displays individual prediction market item
- Shows: title, description, probability gauge, volume, votes
- "Yes" and "No" buttons (green/red)
- Links to detailed market page via slug

### ChanceGauge.tsx
- SVG circular progress gauge
- Shows probability percentage visually
- Green arc = yes chance, red arc = no chance

### OnChainCard.tsx
- Gradient card (brown/orange) for on-chain insights
- Contains: title, description, hashtags
- Action buttons: Tweet, Copy

---

## State Management

### UserContext (`/app/context/UserContext.tsx`)
- React Context API for user data
- Custom hook: `useUser()` for accessing context
- Currently returns mock user data

### Local Component State
- `useState` for UI interactions (filters, selections, toggles)
- Mantine `useDisclosure()` for drawer open/close

---

## Data Types

### User
```typescript
interface User {
  id: string
  username: string
  email: string
  fullName: string
  avatar: string
  bio?: string
  location?: string
  website?: string
  joinedAt: Date
  followers: number
  following: number
  tweets: number
  verified: boolean
  status?: 'active' | 'inactive' | 'suspended'
  points: number
}
```

### MarketItem
```typescript
interface MarketItem {
  id: number
  title: string
  description: string
  chance: number           // Probability %
  volume: string          // Trading volume
  votes: number           // Community votes
  category: string        // Crypto, Politics, Stock, Technology
  slug: string            // URL slug
  outcomes: MarketOutcome[]
}
```

### DustItem
```typescript
interface DustItem {
  id: number
  coin: string
  balance: number
  bnbValue: number
  usdValue: number
}
```

### Transaction
```typescript
interface Transaction {
  id: number
  name: string
  date: string
  initial: string
  sold: string
  current: string
}
```

---

## Key Features

### 1. Prediction Markets
- Browse markets across 5 categories: All, Crypto, Politics, Stock, Technology
- Search functionality
- Category filtering
- Individual market details with:
  - Probability change history
  - Yes/No outcome buttons
  - Buy/Sell tabs
  - Trade amount input

### 2. Dust Converter
- List of small balance tokens ("dust")
- Multi-select checkboxes for token selection
- Real-time BNB value calculation
- Fee calculation (0.001 BNB)
- Shows: coin name, balance, BNB value, USD value

### 3. On-Chain Analytics
- Wallet address input field
- On-chain insight cards (trading stories)
- Transaction history table with:
  - Coin name, purchase date
  - Initial worth, sold worth, current worth

### 4. User Authentication (Mock)
- Mock wallet connection (no real Web3 integration)
- User profile dropdown with stats
- Disconnect functionality

---

## Styling

### Theme Colors
| Purpose | Color |
|---------|-------|
| Background | `#F3ECE3` (warm beige) |
| Primary | `#000000` (black) |
| Accent/Button | `#EE8923` (orange) |
| Success | `#16a34a` (green) |
| Error | `#ef4444` (red) |

### Approach
- Tailwind CSS utility classes (primary)
- CSS custom properties for theming
- Mantine component styling
- Mobile-first responsive design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## Development

### Scripts
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Setup
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

---

## Current Status

- **Frontend-Only**: All data is mocked (no backend API)
- **No Web3 Integration**: Wallet connection is simulated
- **Design-Focused**: Project replicates a specific UI design
- **Type-Safe**: Full TypeScript coverage
- **Responsive**: Mobile-first design approach

---

## Future Integration Points

1. **Backend API**: Replace mock data with real API calls
2. **Web3 Wallet**: Integrate Ethers.js or Web3.js for real wallet connection
3. **Database**: Connect to a database for persistent data
4. **Blockchain Queries**: Fetch real on-chain transaction data
5. **Authentication**: Implement real wallet-based authentication
