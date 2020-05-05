import React, { useState } from 'react'
import { PieChart, Pie, Sector, PieProps } from 'recharts'

// Component Imports
import Moody from '../../../shared/Moody'
import Stats from '../Stats'
import { MoodCounts } from '../../Header'

// Types & Interfaces
export interface ChartProps {
  avg: number
  count: number
  propertyCounts: MoodCounts
}

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props
  return (
    <g>
      <Moody cx={163} cy={170} moodRange={payload.mood} />
      <Stats x={300} y={155} percent={(percent * 100).toFixed(0)} count={payload.count} fill={fill} />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  )
}

const _calculatePercentage = (count: number, total: number) => {
  return (count / total) * 100
}

export const Chart: React.FC<ChartProps> = (props: ChartProps) => {
  const [active, setActive] = useState(0)
  const data = [
    {
      name: 'Sad',
      value: _calculatePercentage(props.propertyCounts.sad, props.count),
      mood: 1,
      count: props.count,
      fill: '#3e4040',
    },
    {
      name: 'Okay',
      value: _calculatePercentage(props.propertyCounts.okay, props.count),
      mood: 4,
      count: props.count,
      fill: '#97bab8',
    },
    {
      name: 'Happy',
      value: _calculatePercentage(props.propertyCounts.happy, props.count),
      mood: 7,
      count: props.count,
      fill: '#04c2b5',
    },
  ]

  const _onPieEnter = (data, index) => {
    setActive(index)
  }

  return (
    <PieChart width={600} height={400}>
      <Pie
        activeIndex={active}
        activeShape={renderActiveShape}
        data={data}
        dataKey="value"
        cx={200}
        cy={200}
        innerRadius={70}
        outerRadius={90}
        onMouseEnter={_onPieEnter}
      />
    </PieChart>
  )
}

export default Chart
