import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar'
import { check } from './http/userAPI'

const tokenFromLocalStorage = localStorage.getItem('token')

const App = () => {
  const [startAuthState, setStartAuthState] = useState<{
    isAuth: boolean
    emailFromToken: string | null
  }>({ isAuth: false, emailFromToken: null })
  //const [emailFromToken, setEmailFromToken] = useState<string | null>(null)
  //console.log('render app')
  useEffect(() => {
    if (tokenFromLocalStorage) {
      check().then((decodedToken) => {
        if (decodedToken.exp && Date.now() <= decodedToken.exp * 1000) {
          setStartAuthState({
            isAuth: true,
            emailFromToken: decodedToken.email,
          })
        } else {
          setStartAuthState({ isAuth: false, emailFromToken: null })
        }
      })
    }
  }, [])

  return (
    <BrowserRouter>
      <Navbar
        startAuthState={startAuthState}
        setStartAuthState={setStartAuthState}
      />
      <AppRouter isAuth={startAuthState.isAuth} />
    </BrowserRouter>
  )
}

export default App
