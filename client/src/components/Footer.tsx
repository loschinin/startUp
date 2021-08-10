import React from 'react'
import { StyledFC } from '../types'
import styled from 'styled-components'

const _Footer: StyledFC = ({ className }) => {
  return <div className={className}>Footer</div>
}
const Footer = styled(_Footer)`
  grid-area: footer;
  padding: 8px;
  background-color: #78244c;
  color: #895061;
`
export default Footer
