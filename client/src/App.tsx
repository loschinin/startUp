import React, { useEffect, useMemo, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Header from './components/Header'
import { check } from './http/userAPI'
import { StyledFC } from './types'
import styled from 'styled-components'
import Footer from './components/Footer'
import jwtDecode from 'jwt-decode'
import { LIMIT } from './constants'

export type PersonType = {
  id: number
  name: string
  description: string
  image: string
  momId: number | null
  dadId: number | null
  createdAt: Date
  updatedAt: Date
  userId: number
}
export type DecodedToken = {
  id: number
  email: string
  iat?: string
  exp?: number
}

const tokenFromLocalStorage = localStorage.getItem('token')

const _App: StyledFC = ({ className }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [startAuthState, setStartAuthState] = useState<{
    userId: number | null
    email: string | null
  }>({ userId: null, email: null })
  /** Put into memory isAuth, userId and email from localStorage */
  useMemo(() => {
    if (tokenFromLocalStorage) {
      const decodedToken = jwtDecode<DecodedToken>(tokenFromLocalStorage)
      //console.log(decodedToken)
      if (decodedToken.exp && Date.now() <= decodedToken.exp * 1000) {
        setStartAuthState({
          userId: decodedToken.id,
          email: decodedToken.email,
        })
        setIsAuth(true)
      } else {
        setStartAuthState({ userId: null, email: null })
        setIsAuth(false)
        localStorage.removeItem('token')
      }
      //setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [])

  /** Checking token and refresh it after reload page*/
  useEffect(() => {
    if (tokenFromLocalStorage) {
      check().catch((e) => console.log(e.message))
    }
  }, [])
  /** Init persons state */
  const [persons, setPersons] = useState<{ count: number; rows: PersonType[] }>(
    { count: 0, rows: [] }
  )
  const [nextPage, setNextPage] = useState(2)
  //const isMorePages = persons.count % LIMIT >= nextPage - 1
  const isMorePages =
    persons.count > persons.rows.length &&
    Math.ceil(persons.count / LIMIT) >= nextPage - 1
  //console.log(persons)
  return (
    <BrowserRouter>
      <div className={className}>
        <Header
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          startAuthState={startAuthState}
          setStartAuthState={setStartAuthState}
          setPersons={setPersons}
          setNextPage={setNextPage}
        />
        <AppRouter
          isAuth={isAuth}
          userId={startAuthState.userId}
          persons={persons}
          setPersons={setPersons}
          nextPage={nextPage}
          setNextPage={setNextPage}
          isMorePages={isMorePages}
        />
        <Footer />
      </div>
    </BrowserRouter>
  )
}
const App = styled(_App)`
  display: grid;
  grid-gap: 8px;
  grid-template-rows: 1fr 10fr 2fr;
  grid-template-areas:
    'header'
    'content'
    'footer';
  //background-color: #262525;
  background-color: #59253a;
  //padding: 4px;
`

export default App
