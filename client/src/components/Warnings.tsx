import React from 'react'
import { colors } from '../design'
import { StyledFC } from '../types'
import styled from 'styled-components'

const _Warnings: StyledFC<{ warnings: string }> = ({ className, warnings }) => {
  return <div className={className}>{warnings}</div>
}

const Warnings = styled(_Warnings)`
  grid-area: warnings;
  color: ${colors.warningTextColor};
  text-align: center;
`

export default Warnings
