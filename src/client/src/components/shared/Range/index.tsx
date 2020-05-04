import React from 'react'

// Style Imports
import './Range.scss'

// Types & Interfaces
interface RangeProps {
  min: number
  max: number
  value: number
  step?: number
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
}

export const Range: React.FC<RangeProps> = (props) => {
  return (
    <div className="rangeContainer">
      <input
        id="range"
        type="range"
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step || 1}
        onChange={props.onChange}
      />
    </div>
  )
}

export default Range
