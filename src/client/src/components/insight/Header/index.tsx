import React from 'react'

import AveragePie from './AveragePie'
import { CheckInData } from '../../../containers/MoodCheckIn'

import './Header.scss'

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
      <AveragePie avg={_calculateAvg(props.checkIns)} propertyCounts={_calculateCounts(props.checkIns)} count={props.checkIns.length}></AveragePie>
    </div>
  )
}

export default Header
