'use client'

import React, { useState } from 'react'
import { dustData } from '@/app/data/dustData'
import { Checkbox } from '@mantine/core'
import clsx from 'clsx'
import '@mantine/core/styles.css'

const DustConverterPage = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const allSelected = selectedIds.length === dustData.length
  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : dustData.map((d) => d.id))
  }

  const selectedCoins = dustData.filter((d) => selectedIds.includes(d.id))
  const totalBNB = selectedCoins.reduce((sum, d) => sum + d.bnbValue, 0)
  const fee = selectedCoins.length > 0 ? 0.001 : 0
  const finalBNB = totalBNB - fee

  return (
    <div className="min-h-screen">
      <h1 className="text-sm md:text-base font-bold text-button-bg mb-2">
        Convert Small Balance to BNB
      </h1>
      <p className="text-xs md:text-sm text-[#4F361C] mb-8">
        You can convert all your balances into BNB
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3 text-sm md:text-base">
          <thead className="text-xs md:text-sm">
            <tr className="bg-[#F3E4D4] text-center">
              <th className="p-3 w-[50px]">
                <Checkbox
                  color="orange"
                  checked={allSelected}
                  onChange={toggleAll}
                  classNames={{
                    input:
                      '!bg-transparent border !border-black data-[checked]:!bg-[#EE8923] data-[checked]:!border-[#EE8923]',
                    icon: 'text-white', // white checkmark when active
                  }}
                />
              </th>
              <th className="p-3 font-semibold">Coin</th>
              <th className="p-3 font-semibold">Available Balance</th>
              <th className="p-3 font-semibold">Approx BNB Value</th>
              <th className="p-3 font-semibold">USD Value</th>
            </tr>
          </thead>
          <tbody>
            {dustData.map((item) => (
              <tr
                key={item.id}
                className={clsx(
                  'text-xs md:text-sm text-center',
                  selectedIds.includes(item.id) && 'bg-[#FFF3E6]'
                )}
              >
                <td className="p-3 text-center border-b border-gray-400">
                  <Checkbox
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    classNames={{
                      input:
                        'data-[checked]:!bg-[#EE8923] data-[checked]:!border-[#EE8923] [&[data-checked]]:!bg-[#EE8923] [&[data-checked]]:!border-[#EE8923]',
                      icon: '!text-white',
                    }}
                    styles={{
                      input: {
                        '--checkbox-color': '#EE8923',
                      },
                    }}
                  />
                </td>

                <td className="p-3 border-b border-gray-400">{item.coin}</td>
                <td className="p-3 border-b border-gray-400">
                  {item.balance.toLocaleString()}
                </td>
                <td className="p-3 border-b border-gray-400">
                  {item.bnbValue.toFixed(2)}
                </td>
                <td className="p-3 border-b border-gray-400">
                  {item.usdValue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
        <div className="w-full md:w-1/2 text-xs md:text-sm">
          {selectedIds.length} coin{selectedIds.length === 1 ? '' : '(s)'}{' '}
          Selected
        </div>

        {selectedIds.length > 0 && (
          <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex gap-4 ">
              <span className="text-xs md:text-sm mt-1.5">You will get:</span>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold">
                  {finalBNB.toFixed(2)} BNB
                </span>
                <span className="text-[10px] md:text-xs">
                  Fee: {fee} BNB (2% fee rate)
                </span>
              </div>
            </div>

            <button
              className="bg-button-bg hover:bg-button-bg/60 text-white text-sm md:text-base px-12 py-2 rounded-full font-semibold shadow-md transition-all"
              disabled={selectedIds.length === 0}
            >
              Convert
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DustConverterPage
