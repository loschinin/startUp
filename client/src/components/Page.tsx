import React from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { colors } from '../design'

const _Page: StyledFC = ({ className, children }) => {
  return <div className={className}>{children}</div>
}
const Page = styled(_Page)`
  grid-area: content;
  position: relative;
  display: grid;
  grid-auto-rows: min-content;
  gap: 8px;
  min-height: 70vh;
  background-color: ${colors.paperColor};
  color: ${colors.primaryTextColor};
  padding: 10px;
  font-size: 20px;
`
export default Page
