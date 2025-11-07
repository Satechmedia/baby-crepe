import React from 'react'

interface ChanceGaugeProps {
  percentage: number
}

const ChanceGauge: React.FC<ChanceGaugeProps> = ({ percentage }) => {
  const radius = 32
  const circumference = Math.PI * radius
  const greenLength = (percentage / 100) * circumference
  const redLength = circumference - greenLength

  return (
    <svg width="60" height="35" viewBox="0 0 80 1" className="overflow-visible">
      {/* Base arc */}
      <path
        d="M10 10 A30 30 0 0 1 70 10"
        fill="transparent"
        stroke="#e5e7eb"
        strokeWidth="6"
      />
      {/* Green arc */}
      <path
        d="M10 10 A30 30 0 0 1 70 10"
        fill="transparent"
        stroke="#16a34a"
        strokeWidth="6"
        strokeDasharray={`${greenLength} ${circumference}`}
        strokeLinecap="round"
      />
      {/* Red arc */}
      <path
        d="M10 10 A30 30 0 0 1 70 10"
        fill="transparent"
        stroke="#ef4444"
        strokeWidth="6"
        strokeDasharray={`${redLength} ${circumference}`}
        strokeDashoffset={-greenLength}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default ChanceGauge
