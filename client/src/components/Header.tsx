import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { login, registration } from '../http/userAPI'
import { fetchPersons } from '../http/personAPI'
import { PersonType } from '../App'
import { FIRST_PAGE, PAGES_LIMIT } from '../constants'
import Button from './Button'
import Input from './Input'
import { colors } from '../design'

const _Header: StyledFC<{
  isAuth: boolean
  setIsAuth: Dispatch<SetStateAction<boolean>>
  startAuthState: {
    userId: number | null
    email: string | null
  }
  setStartAuthState: Dispatch<
    SetStateAction<{
      userId: number | null
      email: string | null
    }>
  >
  setPersons: Dispatch<SetStateAction<{ count: number; rows: PersonType[] }>>
  setWarnings: Dispatch<SetStateAction<string>>
}> = ({
  className,
  isAuth,
  setIsAuth,
  startAuthState,
  setStartAuthState,
  setPersons,
  setWarnings,
}) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const email = startAuthState.email
  useMemo(() => {
    if (email) setCredentials({ email, password: '' })
  }, [email])

  const regMe = async () => {
    try {
      const { id, email } = await registration(
        credentials.email,
        credentials.password
      )
      setIsAuth(true)
      setWarnings('')
      await setStartAuthState({ userId: id, email })
    } catch (e) {
      if (e.message.includes(409)) {
        setWarnings('Email already exists')
      } else if (e.message.includes(401)) {
        setWarnings('Empty credentials')
      }
    }
  }
  const { userId } = startAuthState

  useMemo(() => {
    if (isAuth && userId) {
      fetchPersons(userId, PAGES_LIMIT, FIRST_PAGE).then((res) =>
        setPersons(res)
      )
    }
  }, [isAuth, userId, setPersons])
  const signIn = async () => {
    try {
      const { id, email } = await login(credentials.email, credentials.password)
      await setIsAuth(true)
      await setStartAuthState({ userId: id, email })
      //await fetchPersons(id, 4, 1)
      //setPersons(p)
      setWarnings('')
    } catch (e) {
      if (e.message.includes(401)) {
        setWarnings('Email or pwd incorrect')
      }
    }
  }
  const signOut = () => {
    localStorage.removeItem('token')
    setIsAuth(false)
    setStartAuthState({ userId: null, email: null })
    //setCredentials({ email: '', password: '' })
    setWarnings('')
    setPersons({ count: 0, rows: [] })
  }
  const signBtns: { [k: string]: () => Promise<void> } = {
    'sign in': () => signIn(),
    'reg me': () => regMe(),
  }
  return isAuth ? (
    <div className={className}>
      <div />
      <div />
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '25px' }}>{credentials.email}</div>
        <Button onClick={() => signOut()}>{'sign out'}</Button>
      </div>
    </div>
  ) : (
    <div className={className}>
      <Input
        type={'text'}
        placeholder={'email'}
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />

      <Input
        type={'password'}
        placeholder={'password'}
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <div>
        {Object.keys(signBtns).map((s) => (
          <Button
            key={s}
            onClick={signBtns[s]}
            disabled={!(credentials.email && credentials.password)}
          >
            {s}
          </Button>
        ))}
      </div>
    </div>
  )
}

const Header = styled(_Header)`
  grid-area: header;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr;
  align-items: center;
  //grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  background-color: ${colors.paperColor};
  //height: 10%;
  color: ${colors.primaryTextColor};
  padding: 8px;
  @media (min-width: 415px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export default Header
