import React from 'react'

// Component Imports
import Chart from './Chart'
import { CheckInData } from '../../../containers/MoodCheckIn'

// Style Imports
import './Header.scss'

// Types & Interfaces
interface HeaderProps {
  checkIns: CheckInData[]
}

// Private Methods
const _calculateAvg = (arr: CheckInData[]) => {
  let count: number = 0
  arr.forEach((element: CheckInData) => {
    count = count + element.mood
  })
  return count / arr.length
}

const _calculateCounts = (arr: CheckInData[]) => {
  let counts = { sad: 0, okay: 0, happy: 0 }
  arr.forEach((element: CheckInData) => {
    if (element.mood < 4) counts.sad++
    else if (element.mood > 4) counts.happy++
    else counts.okay++
  })
  return counts
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="headerContainer">
      <Chart
        avg={_calculateAvg(props.checkIns)}
        propertyCounts={_calculateCounts(props.checkIns)}
        count={props.checkIns.length}
      ></Chart>
    </div>
  )
}

export default Header
