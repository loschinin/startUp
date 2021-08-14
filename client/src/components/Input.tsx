import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'

const _Input: StyledFC<{
  type: string
  placeholder: string
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
  background: #895061;
  border: 2px solid #2d4159;
  color: #fff;
  padding: 10px 0;
  font-size: 20px;
  @media (min-width: 415px) {
    font-size: 15px;
    padding: 4px 0;
  }
`
export default Input
