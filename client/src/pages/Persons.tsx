import React from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'

const _Persons: StyledFC = ({ className }) => {
  return <div className={className}>persons</div>
}

const Persons = styled(_Persons)`
  background-color: rosybrown;
  color: aliceblue;
  padding: 10px;
`

export default Persons
