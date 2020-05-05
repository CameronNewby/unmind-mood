import React from 'react'

// Style Imports
import './Moody.scss'

// Types & Interfaces
interface MoodyProps {
  moodRange: number
  cx?: number
  cy?: number
}

interface FaceSVGStructure {
  mouth: string
  eyebrows: {
    r: string
    l: string
  }
  color: string
}

const neutralFace: FaceSVGStructure = {
  mouth: 'M23 60 L64 60',
  eyebrows: {
    r: 'M70 5 L55 5',
    l: 'M15 5 L30 5',
  },
  color: 'rgb(151, 186, 184)',
}
const happyFace: FaceSVGStructure = {
  mouth: 'M23 60 Q 43 70 64 60',
  eyebrows: {
    r: 'M70 5 Q 70 3 55 2',
    l: 'M15 5 Q 15 3 30 2',
  },
  color: 'rgb(4, 194, 181)',
}
const sadFace: FaceSVGStructure = {
  mouth: 'M23 65 Q 45 50 64 65',
  eyebrows: {
    r: 'M70 5 Q 70 3 55 2',
    l: 'M15 5 Q 15 3 30 2',
  },
  color: 'rgb(62, 64, 64)',
}

export const Moody: React.FC<MoodyProps> = (props: MoodyProps) => {
  const currentFace: FaceSVGStructure = props.moodRange <= 3 ? sadFace : props.moodRange > 4 ? happyFace : neutralFace

  return (
    <svg x={props.cx} y={props.cy} dy={8} viewBox={props.cy && props.cx ? null : '0 0 88 72'}>
      <path d={currentFace.eyebrows.l} fill="none" strokeLinecap="round" stroke="rgb(223, 223, 223)" strokeWidth="5" />
      <path d={currentFace.eyebrows.r} fill="none" strokeLinecap="round" stroke="rgb(223, 223, 223)" strokeWidth="5" />
      <circle cx="25" cy="20" r="5" fill={currentFace.color} />
      <circle cx="60" cy="20" r="5" fill={currentFace.color} />
      <rect x="40" y="35" rx="2" ry="2" width="10" height="10" fill="rgb(223, 223, 223)" transform="rotate(45 45 37)" />
      <path d={currentFace.mouth} fill="none" stroke={currentFace.color} strokeLinecap="round" strokeWidth="5" />
    </svg>
  )
}

export default Moody
