import React from 'react'
import styled from 'styled-components'
import { colors } from '../design'
import { StyledFC } from '../types'

const _Button: StyledFC<{
  onClick: (e: React.MouseEvent<HTMLElement>) => Promise<void> | void
  disabled?: boolean
  primary?: boolean
  secondary?: boolean
  danger?: boolean
  w?: number
}> = ({ className, onClick, disabled, children }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

const Button = styled(_Button)`
  width: ${(props) => (props.w ? `${props.w}px` : `100%`)};
  min-width: 70px;
  background: ${(props) =>
    props.primary ? colors.primaryButtonColor : colors.secondaryButtonColor};
  border: 2px solid
    ${(props) =>
      props.primary
        ? colors.primaryButtonTextColor
        : props.danger
        ? colors.dangerButtonTextColor
        : colors.secondaryButtonTextColor};
  color: ${(props) =>
    props.primary
      ? colors.primaryButtonTextColor
      : props.danger
      ? colors.dangerButtonTextColor
      : colors.secondaryButtonTextColor};
  padding: 4px;
  cursor: pointer;

  :hover {
    color: ${colors.hoverButtonTextColor};
    border-color: ${colors.hoverButtonTextColor};
  }
  :disabled {
    //background-color: transparent;
    color: ${colors.disabledButtonTextColor};
    border-color: ${colors.disabledButtonTextColor};
    cursor: default;
  }
  font-size: 17px;
  @media (max-width: 415px) {
    font-size: 25px;
    padding: 8px 0;
  }
`
export default Button
