'use client'

import { useState } from 'react'
import { ProcessedTransaction } from '@/app/types/wallet'
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react'

interface TransactionHistoryTableProps {
  transactions: ProcessedTransaction[]
}

type SortField = 'date' | 'amount' | 'tokenSymbol' | 'type' | 'initialWorth' | 'currentWorth'
type SortDirection = 'asc' | 'desc'

export default function TransactionHistoryTable({ transactions }: TransactionHistoryTableProps) {
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate worth values
  const getInitialWorth = (tx: ProcessedTransaction): number => {
    return tx.amount * tx.priceAtTime
  }

  const getCurrentWorth = (tx: ProcessedTransaction): number => {
    return tx.amount * tx.currentPrice
  }

  // Sort transactions
  const sortedTransactions = [...transactions].sort((a, b) => {
    let comparison = 0

    switch (sortField) {
      case 'date':
        comparison = a.date.getTime() - b.date.getTime()
        break
      case 'amount':
        comparison = a.amount - b.amount
        break
      case 'tokenSymbol':
        comparison = a.tokenSymbol.localeCompare(b.tokenSymbol)
        break
      case 'type':
        comparison = a.type.localeCompare(b.type)
        break
      case 'initialWorth':
        comparison = getInitialWorth(a) - getInitialWorth(b)
        break
      case 'currentWorth':
        comparison = getCurrentWorth(a) - getCurrentWorth(b)
        break
    }

    return sortDirection === 'asc' ? comparison : -comparison
  })

  // Paginate
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  // Format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Format amount
  const formatAmount = (amount: number): string => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}M`
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)}K`
    }
    return amount.toFixed(4)
  }

  // Format USD value
  const formatUsd = (value: number): string => {
    if (value === 0) return '-'
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`
    }
    if (value < 0.01) {
      return `$${value.toFixed(4)}`
    }
    return `$${value.toFixed(2)}`
  }

  // Truncate hash
  const truncateHash = (hash: string): string => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-[#F3E4D4] rounded-xl p-8 text-center">
        <p className="text-gray-600">No transactions found for this wallet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">Transaction History</h3>

      <div className="overflow-x-auto rounded-xl border border-gray-300">
        <table className="min-w-full bg-[#F3E4D4]">
          <thead className="bg-[#FCEEE0]">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                #
              </th>
              <th
                className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-[#f5e6d6]"
                onClick={() => handleSort('type')}
              >
                Type {sortField === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-[#f5e6d6]"
                onClick={() => handleSort('tokenSymbol')}
              >
                Token {sortField === 'tokenSymbol' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-[#f5e6d6]"
                onClick={() => handleSort('amount')}
              >
                Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-[#f5e6d6]"
                onClick={() => handleSort('initialWorth')}
              >
                Initial Worth {sortField === 'initialWorth' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-[#f5e6d6]"
                onClick={() => handleSort('currentWorth')}
              >
                Current Worth {sortField === 'currentWorth' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-[#f5e6d6]"
                onClick={() => handleSort('date')}
              >
                Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Tx
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {paginatedTransactions.map((tx, index) => {
              const initialWorth = getInitialWorth(tx)
              const currentWorth = getCurrentWorth(tx)
              const pnlPercent = initialWorth > 0 ? ((currentWorth - initialWorth) / initialWorth) * 100 : 0

              return (
                <tr key={tx.id} className="hover:bg-[#FFF3E6] transition-colors">
                  <td className="px-3 py-3 text-sm text-gray-600">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        tx.type === 'BUY'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {tx.type === 'BUY' ? (
                        <ArrowDownRight size={12} />
                      ) : (
                        <ArrowUpRight size={12} />
                      )}
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{tx.tokenSymbol}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[100px]">{tx.tokenName}</p>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-800 font-mono">
                    {formatAmount(tx.amount)}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-800 font-mono">
                    {formatUsd(initialWorth)}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-800 font-mono">{formatUsd(currentWorth)}</span>
                      {initialWorth > 0 && currentWorth > 0 && (
                        <span
                          className={`text-xs font-medium ${
                            pnlPercent >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-600">
                    {formatDate(tx.date)}
                  </td>
                  <td className="px-3 py-3">
                    <a
                      href={`https://bscscan.com/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#EE8923] hover:underline font-mono"
                    >
                      {truncateHash(tx.hash)}
                      <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-[#F3E4D4] rounded-lg">
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, transactions.length)} of {transactions.length}{' '}
            transactions
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
