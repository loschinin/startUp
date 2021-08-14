import React from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import Page from '../components/Page'

const _Persons: StyledFC = ({ className }) => {
  return <Page className={className}>persons</Page>
}

const Persons = styled(_Persons)``

export default Persons
