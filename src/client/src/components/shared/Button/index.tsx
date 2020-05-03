import React, { useState } from 'react'

import './Button.scss'

interface ButtonProps {
  text: string
  toggle?: boolean
  disabled?: boolean
  onClick(event: React.MouseEvent<HTMLButtonElement>, text: string): void
}

export const Button: React.FC<ButtonProps> = (props) => {
  const [active, setActive] = useState(false)

  return (
    <button
      className={active ? 'button selected' : 'button'}
      disabled={props.disabled}
      onClick={(event) => {
        if (props.toggle) setActive(!active)
        props.onClick(event, props.text)
      }}
    >
      {props.text}
    </button>
  )
}

export default Button