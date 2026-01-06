'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  Wallet,
  TrendingUp,
  Zap,
  BarChart3,
  ArrowRight,
  ChevronDown,
  Sparkles
} from 'lucide-react'
import Logo from '@/public/images/logo.png'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0D0D0D]/90 backdrop-blur-lg border-b border-white/5' : ''
        }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EE8923] to-[#FF6B00] flex items-center justify-center">
              {/* <Sparkles className="w-5 h-5 text-white" /> */}
              <Image
                src={Logo}
                alt="Baby Crepe Logo"
                width={48}
                height={48}
                priority
              />
            </div>
            <span className="text-xl font-bold">BABYCREPE</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How it Works</a>
            <a href="#stats" className="text-gray-400 hover:text-white transition-colors">Stats</a>
          </div>
          <Link
            href="/dashboard/on-chain"
            className="px-5 py-2.5 bg-gradient-to-r from-[#EE8923] to-[#FF6B00] rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#EE8923]/20 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[128px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300">Live on BSC Mainnet</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Know Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#EE8923] via-[#FF8C00] to-[#FFB347] bg-clip-text text-transparent">
              Wallet Story
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Analyze any BSC wallet. Discover paper hands, celebrate diamond hands,
            and uncover the truth behind every trade with beautiful insights.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/dashboard/on-chain"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#EE8923] to-[#FF6B00] rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105"
            >
              Analyze Wallet
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              Learn More
            </a>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">10K+</div>
              <div className="text-sm text-gray-500">Wallets Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">$2M+</div>
              <div className="text-sm text-gray-500">Trades Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">99%</div>
              <div className="text-sm text-gray-500">Accuracy</div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#EE8923] text-sm font-semibold tracking-wider uppercase mb-4 block">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-[#EE8923] to-[#FFB347] bg-clip-text text-transparent">
                Understand Your Portfolio
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 - Analyze Wallet */}
            <div className="group p-10 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-[#EE8923]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EE8923]/20 to-orange-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Wallet className="w-8 h-8 text-[#EE8923]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Analyze Wallet</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Deep dive into any BSC wallet. Track all token transfers, discover paper hands, celebrate diamond hands, and uncover your complete trading history with beautiful insights.
              </p>
              <div className="mt-8 flex items-center gap-2 text-[#EE8923] font-medium group-hover:gap-3 transition-all">
                <span>Try it now</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 2 - Prediction Market */}
            <div className="group p-10 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">BabyCrepe Market</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Put your crypto knowledge to the test. Predict market movements, bet on outcomes, and win big in our decentralized prediction market. Will you be right?
              </p>
              <div className="mt-8 flex items-center gap-2 text-purple-400 font-medium">
                <span>Coming Soon</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 3 - Convert Dust */}
            <div className="group p-10 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Convert Dust</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Turn those worthless dust balances into real value. Consolidate all your tiny token amounts into BNB or your favorite token with one click. Clean wallet, happy life.
              </p>
              <div className="mt-8 flex items-center gap-2 text-green-400 font-medium">
                <span>Coming Soon</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EE8923]/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#EE8923] text-sm font-semibold tracking-wider uppercase mb-4 block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Three Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-8xl font-bold text-white/5 absolute -top-8 -left-4">1</div>
              <div className="relative z-10 pt-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EE8923] to-[#FF6B00] flex items-center justify-center mb-6 shadow-lg shadow-orange-500/25">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Paste Wallet</h3>
                <p className="text-gray-400 leading-relaxed">
                  Enter any BSC wallet address. Could be yours, a friend&apos;s, or that whale you&apos;ve been watching.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-8xl font-bold text-white/5 absolute -top-8 -left-4">2</div>
              <div className="relative z-10 pt-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Get Insights</h3>
                <p className="text-gray-400 leading-relaxed">
                  We analyze all transactions, calculate PnL, and identify paper hand / diamond hand moments.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="text-8xl font-bold text-white/5 absolute -top-8 -left-4">3</div>
              <div className="relative z-10 pt-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 shadow-lg shadow-green-500/25">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Share & Roast</h3>
                <p className="text-gray-400 leading-relaxed">
                  Generate beautiful cards to share your results. Roast paper hands or celebrate diamond hands!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[40px] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-12 md:p-20 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#EE8923]/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px]" />

            <div className="relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Trusted by Traders
                </h2>
                <p className="text-gray-400 text-lg">
                  Join thousands of users analyzing their portfolios
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center p-6">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#EE8923] to-[#FFB347] bg-clip-text text-transparent mb-2">
                    10K+
                  </div>
                  <div className="text-gray-400">Wallets Analyzed</div>
                </div>
                <div className="text-center p-6">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    $50M+
                  </div>
                  <div className="text-gray-400">Volume Tracked</div>
                </div>
                <div className="text-center p-6">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                    100K+
                  </div>
                  <div className="text-gray-400">Transactions</div>
                </div>
                <div className="text-center p-6">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    24/7
                  </div>
                  <div className="text-gray-400">Real-time Data</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Discover
            <br />
            <span className="bg-gradient-to-r from-[#EE8923] to-[#FFB347] bg-clip-text text-transparent">
              Your Trading Truth?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Stop guessing. Start knowing. Analyze your wallet and uncover insights you never knew existed.
          </p>
          <Link
            href="/dashboard/on-chain"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#EE8923] to-[#FF6B00] rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105"
          >
            Start Analyzing Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#EE8923] to-[#FF6B00] flex items-center justify-center">
                <Image
                  src={Logo}
                  alt="Baby Crepe Logo"
                  width={48}
                  height={48}
                  priority
                />
              </div>
              <span className="font-semibold">BABYCREPE</span>
            </div>
            <div className="text-gray-500 text-sm">
              Built with love for the BSC community
            </div>
            <div className="flex items-center gap-6">
              <a href="https://x.com/babycrepebnb" target='_blank' className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a>
              <a href="https://t.me/BABYCREPE" target='_blank' className="text-gray-400 hover:text-white transition-colors text-sm">Telegram</a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Discord</a> */}
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
