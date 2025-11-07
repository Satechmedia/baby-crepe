'use client'

import { useState } from 'react'
import { marketData } from '@/app/data/marketData'
import { useParams, useRouter } from 'next/navigation'
import { FaChevronLeft } from 'react-icons/fa'

export default function MarketDetailsPage() {
  const router = useRouter()
  const { slug } = useParams()
  const item = marketData.find((m) => m.slug === slug)
  const [activeTab, setActiveTab] = useState<'Buy' | 'Sell'>('Buy')

  if (!item) {
    return (
      <div className="p-6">
        <button
          onClick={() => router.back()}
          className="text-orange-500 font-medium mb-4"
        >
          <FaChevronLeft />
        </button>
        <p>Market not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-3 items-center mb-3 text-sm md:text-base relative">
          <button
            onClick={() => router.back()}
            className="cursor-pointer md:absolute -left-7"
          >
            <FaChevronLeft />
          </button>
          <h1 className="font-bold">{item.title}</h1>
        </div>

        <p className="text-[10px] md:text-xs mb-6">{item.volume}</p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT SECTION */}
          <div className="md:col-span-2">
            {/* Table */}
            <div className="w-full">
              <div className="flex justify-between text-base py-2 font-bold border-b border-gray-500">
                <span>OUTCOME</span>
                <span>CHANGE</span>
                <span className="w-1/3 text-center"></span>
              </div>

              {item.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3 border-b border-gray-500"
                >
                  <span className="text-xs md:text-sm">{outcome.date}</span>
                  <span className="text-xs md:text-sm">{outcome.change}</span>
                  <div className="flex w-1/3 gap-4">
                    <button className="bg-[#C2EAC7] text-green-800 px-4 py-2.5 rounded-md text-xs w-1/2 cursor-pointer">
                      Yes
                    </button>
                    <button className="bg-[#F6ADA1] text-red-700 px-4 py-2.5 rounded-md text-xs w-1/2 cursor-pointer">
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col bg-[#F3E4D4] rounded-2xl p-6 shadow-sm">
            {/* Buy/Sell Tabs */}
            <div className="flex items-center gap-2 mb-6 bg-[#4C2A0B] rounded-md py-1 px-1 w-fit">
              <button
                onClick={() => setActiveTab('Buy')}
                className={`text-xs px-4 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeTab === 'Buy'
                    ? 'bg-button-bg text-white'
                    : 'text-white hover:bg-[#5e3511]'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setActiveTab('Sell')}
                className={`text-xs px-4 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeTab === 'Sell'
                    ? 'bg-button-bg text-white'
                    : 'text-white hover:bg-[#5e3511]'
                }`}
              >
                Sell
              </button>
            </div>

            {/* Yes/No Buttons */}
            <div className="flex gap-2 mb-6">
              <button className="flex-1 bg-[#C2EAC7] text-green-700 px-4 py-2.5 rounded-md text-xs w-1/2 cursor-pointer">
                Yes
              </button>
              <button className="flex-1 bg-[#F6ADA1] text-red-700 px-4 py-2.5 rounded-md text-xs w-1/2 cursor-pointer">
                No
              </button>
            </div>

            {/* Amount */}
            <div className="flex justify-between mb-6">
              <h4 className="font-bold text-sm md:text-base mb-2">Amount</h4>
              <p className="text-3xl font-bold text-gray-500 mt-6">$0</p>
            </div>

            {/* Trade Button */}
            <button className="w-full mt-auto bg-button-bg text-white font-semibold py-3 rounded-full shadow-md hover:bg-button-bg/60 transition-all cursor-pointer">
              Trade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
