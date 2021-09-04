import React from 'react'
import styled from 'styled-components'
import { colors } from '../design'
import { StyledFC } from '../types'

const _Page: StyledFC<{ gap?: number }> = ({ className, children }) => {
  return <div className={className}>{children}</div>
}
const Page = styled(_Page)`
  grid-area: content;
  display: grid;
  grid-auto-rows: min-content;
  gap: ${(props) => props.gap || 8}px;
  min-height: 70vh;
  background-color: ${colors.paperColor};
  color: ${colors.primaryTextColor};
  padding: 10px;
  font-size: 20px;
`
export default Page
