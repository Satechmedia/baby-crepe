// Roast messages for paper hands
interface RoastParams {
  tokenSymbol: string
  soldPrice: number
  currentWorth: number
  missedGains: number
}

const paperHandRoasts = [
  "You bought {token} and paper-handed for ${sold}. It's now worth ${current}. That's ${missed} you left on the table! Classic paper hands move.",
  "Sold {token} early? Cute. It did a {multiplier}x without you. Your weak hands cost you ${missed}.",
  "Congrats! You turned diamond into dust. {token} went to the moon and you watched from Earth. ${missed} gone!",
  "You panic sold {token} for ${sold}. Now it's ${current}. That's not a loss, that's a masterclass in bad timing!",
  "{token} said 'see you later' and you said 'bye'. ${missed} in missed gains. NGMI.",
  "Paper hands detected! You sold {token} at ${sold}, now worth ${current}. The {multiplier}x gains are crying without you.",
  "You really sold {token} before it mooned? That ${missed} is living rent-free in your 'what if' folder.",
  "Breaking: Local trader sells {token} for ${sold}, misses out on ${missed}. In other news, water is wet.",
]

const noPaperHandMessages = [
  "No paper hands detected! You haven't rage-sold any winners... yet.",
  "Clean record! No premature selling found. Diamond hands in training?",
  "No paper hand activity. Either you're HODLing strong or just haven't sold anything!",
  "Paper hands? Not you! No early sells detected in this wallet.",
]

// Kudos messages for diamond hands
interface KudosParams {
  tokenSymbol: string
  holdDuration: number
  unrealizedGains: number
  unrealizedGainsPercent: number
}

const diamondHandKudos = [
  "Holding {token} for {days} days! You've weathered the storms and still standing. True diamond hands!",
  "You bought {token} and HELD. {days} days later, you're up ${gains} ({percent}%). This is the way!",
  "While others panic sold, you held {token} for {days} days. Unrealized gains: ${gains}. Legend status unlocked!",
  "{days} days of HODLing {token}! Your hands are forged in pure diamond. ${gains} in unrealized gains!",
  "Diamond hands alert! {token} held for {days} days. That's {percent}% gains just from NOT selling.",
  "You've been holding {token} through thick and thin for {days} days. Gains: ${gains}. Respect!",
  "{token} holder for {days} days strong! ${gains} unrealized gains. The paper hands could never!",
  "True believer status: Held {token} for {days} days. Sitting on ${gains} in gains. We salute you!",
]

const noDiamondHandMessages = [
  "No diamond hands detected! Time to start HODLing something.",
  "No long-term holds found. Are you a trader or a holder? Jury's still out!",
  "Diamond hands? Not yet! No tokens held for 30+ days detected.",
  "No HODLing activity found. Remember: fortune favors the patient!",
]

// Format currency
function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(2)}K`
  }
  return `$${amount.toFixed(2)}`
}

// Generate a roast message for paper hands
export function generateRoast(params: RoastParams): string {
  const template = paperHandRoasts[Math.floor(Math.random() * paperHandRoasts.length)]
  const multiplier = params.currentWorth > 0 && params.soldPrice > 0
    ? (params.currentWorth / params.soldPrice).toFixed(1)
    : '?'

  return template
    .replace('{token}', params.tokenSymbol)
    .replace('{sold}', formatCurrency(params.soldPrice))
    .replace('{current}', formatCurrency(params.currentWorth))
    .replace('{missed}', formatCurrency(params.missedGains))
    .replace('{multiplier}', multiplier)
}

// Generate a kudos message for diamond hands
export function generateKudos(params: KudosParams): string {
  const template = diamondHandKudos[Math.floor(Math.random() * diamondHandKudos.length)]

  return template
    .replace('{token}', params.tokenSymbol)
    .replace('{days}', params.holdDuration.toString())
    .replace('{gains}', formatCurrency(params.unrealizedGains))
    .replace('{percent}', params.unrealizedGainsPercent.toFixed(1))
}

// Get a random "no paper hands" message
export function getNoPaperHandMessage(): string {
  return noPaperHandMessages[Math.floor(Math.random() * noPaperHandMessages.length)]
}

// Get a random "no diamond hands" message
export function getNoDiamondHandMessage(): string {
  return noDiamondHandMessages[Math.floor(Math.random() * noDiamondHandMessages.length)]
}

// Generate tweet text for sharing
export function generateTweetText(
  type: 'paper_hand' | 'diamond_hand',
  message: string,
  hashtags: string[]
): string {
  const prefix = type === 'paper_hand'
    ? "My paper hands moment:"
    : "Diamond hands flexin':"

  const hashtagStr = hashtags.join(' ')
  const maxMsgLength = 280 - prefix.length - hashtagStr.length - 4 // 4 for spaces and newlines

  const truncatedMsg = message.length > maxMsgLength
    ? message.slice(0, maxMsgLength - 3) + '...'
    : message

  return `${prefix}\n\n${truncatedMsg}\n\n${hashtagStr}`
}
