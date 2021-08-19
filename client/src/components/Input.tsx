import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { colors } from '../design/colors'

const _Input: StyledFC<{
  type: string
  placeholder?: string
  value?: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}> = ({ className, children, type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
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
  padding: 10px 0;
  font-size: 20px;
  @media (min-width: 415px) {
    font-size: 15px;
    padding: 4px 0;
  }
`
export default Input
