import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { colors } from '../design'
import { StyledFC } from '../types'

const _Input: StyledFC<{
  type: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  id?: string
  none?: boolean
  placeholder?: string
  value?: string | number
  fz?: number
}> = ({ className, children, type, id, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    >
      {children}
    </input>
  )
}
const Input = styled(_Input)`
  width: 99%;
  //max-width: 356px;
  background: ${colors.backgroundColor};
  border: 2px solid ${colors.backgroundColor};
  color: ${colors.primaryTextColor};
  padding: 4px 0;
  font-size: ${(props) => props.fz || 20}px;
  display: ${(props) => (props.none ? 'none' : 'grid')};
  @media (max-width: 415px) {
    font-size: ${(props) => props.fz || 25}px;
    padding: 8px 0;
  }
`
export default Input
