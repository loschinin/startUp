import React from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'

const _Button: StyledFC<{
  onClick: () => Promise<void> | void
  disabled?: boolean
}> = ({ className, onClick, disabled, children }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

const Button = styled(_Button)`
  width: 100%;
  //max-width: 180px;
  background: #0677a1;
  border: 2px solid #2d4159;
  color: #fff;
  padding: 8px;
  cursor: pointer;
  font-size: 25px;
  :disabled {
    background-color: #2d4159;
    color: #0677a1;
  }
  @media (min-width: 415px) {
    font-size: 17px;
    padding: 4px;
  }
`
export default Button
