import React from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { colors } from '../design/colors'

const _Button: StyledFC<{
  onClick: () => Promise<void> | void
  disabled?: boolean
  primary?: boolean
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
  background: ${(props) =>
    props.primary ? colors.primaryButtonColor : colors.secondaryButtonColor};
  border: 2px solid
    ${(props) =>
      props.primary
        ? colors.primaryButtonTextColor
        : colors.secondaryButtonTextColor};
  color: ${(props) =>
    props.primary
      ? colors.primaryButtonTextColor
      : colors.secondaryButtonTextColor};
  padding: 8px;
  cursor: pointer;
  font-size: 25px;
  :disabled {
    //background-color: transparent;
    color: ${colors.disabledButtonTextColor};
    border-color: ${colors.disabledButtonTextColor};
    cursor: default;
  }
  @media (min-width: 415px) {
    font-size: 17px;
    padding: 4px;
  }
`
export default Button
