import React from 'react'
import ChanceGauge from './ChanceGauge'
import { MarketItem } from '@/app/types/market'
import Link from 'next/link'

interface MarketCardProps {
  item: MarketItem
}

const MarketCard: React.FC<MarketCardProps> = ({ item }) => {
  return (
    <Link
      href={`/dashboard/market/${item.slug}`}
      className="border border-neutral-200 bg-[#F3E4D4] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex gap-2">
        <div>
          <h3 className="font-bold text-xs md:text-sm mb-1">{item.title}</h3>
          <p className="text-[10px] md:text-xs mb-3">{item.description}</p>
        </div>

        {/* Gauge */}
        <div className="flex flex-col items-center relative w-16">
          <div className="absolute top-3 left-0">
            <ChanceGauge percentage={item.chance} />
            <span className="text-[10px] md:text-xs font-semibold absolute top-4 left-4 md:left-3 flex flex-col items-center">
              {item.chance}%{' '}
              <span className="font-normal text-[8px] md:text-[10px]">
                Chance
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-3 mt-2">
        <button className="flex-1 bg-[#C2EAC7] text-green-700 py-1.5 rounded-md text-[10px] md:text-xs font-medium">
          Yes
        </button>

        <button className="flex-1 bg-[#F6ADA1] text-red-700 py-1.5 rounded-md text-[10px] md:text-xs font-medium">
          No
        </button>
      </div>

      <div className="flex justify-between text-[10px] md:text-xs">
        <span>{item.volume}</span>
        <span>{item.votes} chance</span>
      </div>
    </Link>
  )
}

export default MarketCard
