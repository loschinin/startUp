import React from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'

const _Page: StyledFC = ({ className, children }) => {
  return <div className={className}>{children}</div>
}
const Page = styled(_Page)`
  grid-area: content;
  position: relative;
  display: grid;
  grid-auto-rows: min-content;
  gap: 8px;
  background-color: #895061;
  color: aliceblue;
  padding: 10px;
  font-size: 20px;
`
export default Page
