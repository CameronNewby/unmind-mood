import React from 'react'

// Types & Interfaces
interface StatsProps {
  x: number
  y: number
  count: number
  percent: string
  fill: string
}

export const Stats: React.FC<StatsProps> = (props: StatsProps) => {
  return (
    <svg x={props.x} y={props.y} width={600} height={400} viewBox="0 0 500 300">
      <text x={120} y={20} fill={props.fill} textAnchor="middle" fontSize="36" fontWeight="bold">
        {`${props.percent}%`}
      </text>
      <text x={50} y={50} fill="#999">{`Based on ${props.count} entires`}</text>
    </svg>
  )
}

export default Stats
