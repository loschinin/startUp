import React from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'
import Page from '../components/Page'

const _Person: StyledFC<{ userId: number }> = ({ className }) => {
  const history = useHistory()
  return (
    <Page className={className}>
      <Button onClick={() => history.goBack()}>Go back</Button>
      <div>
        <hr />
      </div>
      person
    </Page>
  )
}

const Person = styled(_Person)``

export default Person
