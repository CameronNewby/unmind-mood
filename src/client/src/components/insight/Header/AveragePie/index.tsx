import React, { useState } from 'react'
import { PieChart, Pie, Sector, Cell } from 'recharts'

import Moody from '../../../shared/Moody'

export interface ChartProps {
  avg: number
  count: number
  propertyCounts: any
}

const renderActiveShape = (props) => {
	const RADIAN = Math.PI / 180;
	const {
		cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
		fill, payload, percent, value,
	} = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
      <Moody cx={163} cy={170} moodRange={payload.mood}/>
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
			<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
				{`(${(percent * 100).toFixed(0)}%)`}
			</text>
		</g>
	);
};

const _calculatePercentage = (count: number, total: number) => {
  return (count / total) * 100
}

export const AveragePie: React.FC<ChartProps> = (props) => {
  const [active, setActive] = useState(0)
  const data = [
    { name: 'Sad', value: _calculatePercentage(props.propertyCounts.sad, props.count), mood: 1, fill: "#3e4040"},
    { name: 'Okay', value: _calculatePercentage(props.propertyCounts.okay, props.count), mood: 4, fill: "#97bab8"},
    { name: 'Happy', value: _calculatePercentage(props.propertyCounts.happy, props.count), mood: 7, fill: "#04c2b5"},
  ]

  const onPieEnter = (data, index) => {
		setActive(index);
	};

  return (
    <PieChart width={400} height={400}>
      <Pie
        activeIndex={active}
        activeShape={renderActiveShape}
        data={data}
        dataKey="value"
        cx={200}
        cy={200}
        innerRadius={70}
        outerRadius={90}
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  )
}

export default AveragePie
