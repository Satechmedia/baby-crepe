'use client'

import React from 'react'
import { FiTwitter, FiCopy } from 'react-icons/fi'
import { transactionsData } from '@/app/data/transactionsData'
import OnChainCard from '@/app/components/OnChainCard'
import { onChainCardsData } from '@/app/data/onChainCardsData'

const OnChainPage = () => {
  return (
    <div className="min-h-screen pb-12">
      {/* Input Field */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Paste Wallet Address"
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-[#F3E4D4] border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-14">
        {onChainCardsData.map((item) => (
          <OnChainCard key={item.id} data={item} />
        ))}
      </div>

      {/* Transaction History */}
      <div className="overflow-x-auto">
        <h3 className="text-sm md:text-base font-semibold text-[#3B2B1D] mb-3">
          Transaction History
        </h3>

        <table className="min-w-full bg-[bg-[#F3E4D4]] border border-gray-400 text-xs md:text-sm overflow-auto ">
          <thead className=''>
            <tr className="bg-[#FCEEE0] text-[#3B2B1D]">
              <th className="p-3">S/N</th>
              <th className="p-3">Name of Coin</th>
              <th className="p-3">Purchase Date</th>
              <th className="p-3">Initial worth</th>
              <th className="p-3">Sold worth</th>
              <th className="p-3">Current worth</th>
            </tr>
          </thead>
          <tbody className=''>
            {transactionsData.map((t) => (
              <tr
                key={t.id}
                className="text-center hover:bg-[#FFF3E6] transition"
              >
                <td className="p-3 border-b border-gray-400">{t.id}.</td>
                <td className="p-3 border-b border-gray-400">{t.name}</td>
                <td className="p-3 border-b border-gray-400">{t.date}</td>
                <td className="p-3 border-b border-gray-400">{t.initial}</td>
                <td className="p-3 border-b border-gray-400">{t.sold}</td>
                <td className="p-3 border-b border-gray-400">{t.current}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OnChainPage
