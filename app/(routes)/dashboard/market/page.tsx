'use client'
import React, { useState } from 'react'
import { marketData } from '@/app/data/marketData'
import MarketCard from '@/app/components/MarketCard'

const categories = ['All', 'Crypto', 'Politics', 'Stock', 'Technology']

const MarketPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = marketData.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-20 mb-6 items-center">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-[#F3E4D4] border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="w-full md:w-1/2 flex gap-2 md:flex-wrap overflow-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-1 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-orange-400 text-white'
                  : 'text-gray-700 hover:bg-button-bg/30 border border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
        {filteredData.map((item) => (
          <MarketCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default MarketPage
