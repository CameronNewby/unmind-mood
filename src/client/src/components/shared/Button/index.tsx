import React, { useState } from 'react'

// Style Imports
import './Button.scss'

// Types & Interfaces
interface ButtonProps {
  text: string
  toggle?: boolean
  disabled?: boolean
  onClick?(event: React.MouseEvent<HTMLButtonElement>, text: string): void
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const [active, setActive] = useState(false)

  return (
    <button
      className={active ? 'button selected' : 'button'}
      disabled={props.disabled}
      onClick={(event): void => {
        if (props.toggle) setActive(!active)
        if (props.onClick) props.onClick(event, props.text)
      }}
    >
      {props.text}
    </button>
  )
}

export default Button
