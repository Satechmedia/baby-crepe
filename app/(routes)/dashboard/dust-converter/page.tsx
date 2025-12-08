'use client'

import { FaExchangeAlt } from 'react-icons/fa'

const DustConverterPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="bg-[#F3E4D4] rounded-2xl p-8 md:p-12 text-center max-w-md">
        <div className="w-20 h-20 bg-button-bg/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaExchangeAlt size={36} className="text-button-bg" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-button-bg mb-4">
          Coming Soon
        </h1>
        <p className="text-sm md:text-base text-[#4F361C] mb-6">
          The Dust Converter feature is currently under development. Soon you&apos;ll be able to convert all your small token balances into BNB.
        </p>
        <div className="inline-block bg-button-bg/10 text-button-bg text-xs md:text-sm px-4 py-2 rounded-full font-medium">
          Stay tuned for updates
        </div>
      </div>
    </div>
  )
}

export default DustConverterPage
