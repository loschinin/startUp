import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { colors } from '../design'
import { StyledFC } from '../types'

const _TextArea: StyledFC<{
  rows: number
  placeholder?: string
  value?: string | number
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}> = ({ className, children, placeholder, value, onChange, rows }) => {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    >
      {children}
    </textarea>
  )
}
const TextArea = styled(_TextArea)`
  width: 99%;
  //max-width: 356px;
  background: ${colors.backgroundColor};
  border: 2px solid ${colors.backgroundColor};
  color: ${colors.primaryTextColor};
  padding: 4px 0;
  font-size: 20px;
  @media (max-width: 415px) {
    font-size: 25px;
    padding: 8px 0;
  }
`
export default TextArea
