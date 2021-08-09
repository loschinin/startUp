import React from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'

const _Person: StyledFC = ({ className }) => {
  return <div className={className}>person</div>
}

const Person = styled(_Person)`
  background-color: rosybrown;
  color: aliceblue;
  padding: 10px;
`

export default Person
