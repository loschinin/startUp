import React, { useEffect, useMemo, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Header from './components/Header'
import { check } from './http/userAPI'
import { StyledFC } from './types'
import styled from 'styled-components'
import Footer from './components/Footer'
import jwtDecode from 'jwt-decode'

const tokenFromLocalStorage = localStorage.getItem('token')

const _App: StyledFC = ({ className }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [startAuthState, setStartAuthState] = useState<{
    userId: number | null
    email: string | null
  }>({ userId: null, email: null })
  /** Checking if is token in localStorage */
  useMemo(() => {
    if (tokenFromLocalStorage) {
      const decodedToken = jwtDecode<{
        id: number
        email: string
        exp: number
      }>(tokenFromLocalStorage)
      console.log(decodedToken)
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

  /** Checking if token expired */
  useEffect(() => {
    if (tokenFromLocalStorage) {
      check()
    }
  }, [])
  /* useEffect(() => {
    if (tokenFromLocalStorage) {
      check().then((decodedToken) => {
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
      })
    }
  }, [])*/
  //console.log(startAuthState.isAuth)
  return (
    <BrowserRouter>
      <div className={className}>
        <Header
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          startAuthState={startAuthState}
          setStartAuthState={setStartAuthState}
        />
        <AppRouter isAuth={isAuth} />
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
