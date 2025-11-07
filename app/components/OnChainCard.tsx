'use client'

import { FiTwitter, FiCopy } from 'react-icons/fi'
import { OnChainProps } from '@/app/types/onChainCard'

interface Props {
  data: OnChainProps
}

export default function OnChainCard({ data }: Props) {
  return (
    <div className="bg-gradient-to-b from-[#4B3C2E] pb-5 to-[#EE8923] text-white rounded-2xl w-full md:w-[254px] shadow-md">
      <h2 className="font-medium md:text-sm mb-3 py-3 text-center rounded-t-2xl bg-gradient-to-r from-[#746A60] to-[#B9864F]">
        {data.title}
      </h2>
      <p className="text-xs font-medium leading-relaxed mb-12 px-5">
        {data.description}
      </p>
      <p className="text-[11px] md:text-xs mb-8 text-[#FFE6C7] px-5">
        {data.hashtags}
      </p>

      <div className="flex gap-4 px-5">
        <button className="flex items-center gap-2 rounded-full px-4 py-2 !text-[10px] cursor-pointer transition w-1/2 justify-center bg-[#A86C31] hover:bg-[#A86C31]/60">
          {/* <FiTwitter size={14} />  */}Tweet
        </button>
        <button className="flex items-center gap-2 border border-[#e6aa6d]/80 hover:bg-[#ec9a48] rounded-full px-4 py-2 !text-[10px]  transition w-1/2 justify-center cursor-pointer">
          {/* <FiCopy size={14} /> */} Copy
        </button>
      </div>
    </div>
  )
}
