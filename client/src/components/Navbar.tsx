import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { login, registration } from '../http/userAPI'

const _Navbar: StyledFC<{
  startAuthState: { isAuth: boolean; emailFromToken: string | null }
  setStartAuthState: Dispatch<
    SetStateAction<{ isAuth: boolean; emailFromToken: string | null }>
  >
}> = ({ className, startAuthState, setStartAuthState }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const email = startAuthState.emailFromToken
  useMemo(() => {
    if (email) setCredentials({ email, password: '' })
  }, [email])

  //console.log(startAuthState.emailFromToken)
  //console.log(registration(email, password))
  const signIn = async () => {
    try {
      await login(credentials.email, credentials.password)
      await setStartAuthState({ ...startAuthState, isAuth: true })
    } catch (e) {
      console.log('login or password incorrect:', e.message)
    }
  }
  const signOut = () => {
    localStorage.removeItem('token')
    setStartAuthState({ isAuth: false, emailFromToken: null })
  }
  return startAuthState.isAuth ? (
    <div className={className}>
      {credentials.email}
      <br />
      <button onClick={() => signOut()}>{'sign out'}</button>
    </div>
  ) : (
    <div className={className}>
      <input
        type={'text'}
        placeholder={'email'}
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <input
        type={'password'}
        placeholder={'password'}
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button onClick={() => signIn()}>{'sign in'}</button>
    </div>
  )
}

const Navbar = styled(_Navbar)`
  background-color: lightslategray;
  height: 70px;
  color: aliceblue;
  padding: 10px;
`
export default Navbar
