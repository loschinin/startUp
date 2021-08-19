import React from 'react'
import { StyledFC } from '../types'
import styled from 'styled-components'
import { colors } from '../design'

const _Footer: StyledFC = ({ className }) => {
  return <div className={className}>Footer</div>
}
const Footer = styled(_Footer)`
  grid-area: footer;
  padding: 8px;
  background-color: ${colors.paperColor};
  color: ${colors.secondaryTextColor};
  min-height: 10vh;
`
export default Footer
