import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { login, registration } from '../http/userAPI'
import { fetchPersons } from '../http/personAPI'
import { PersonType } from '../App'

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
  setPersons: Dispatch<SetStateAction<PersonType[]>>
}> = ({
  className,
  isAuth,
  setIsAuth,
  startAuthState,
  setStartAuthState,
  setPersons,
}) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [warnings, setWarnings] = useState('')
  const email = startAuthState.email
  useMemo(() => {
    if (email) setCredentials({ email, password: '' })
  }, [email])

  const regMe = async () => {
    try {
      await registration(credentials.email, credentials.password)
      await setIsAuth(true)
    } catch (e) {
      if (e.message.includes(409)) {
        setWarnings('Email already exists')
      } else if (e.message.includes(401)) {
        setWarnings('Empty credentials')
      }
    }
  }
  const { userId } = startAuthState
  console.log({ userId })
  useMemo(() => {
    if (isAuth && userId) {
      fetchPersons(userId, 4, 1).then(({ rows }) => setPersons(rows))
    }
  }, [isAuth, userId, setPersons])
  const signIn = async () => {
    try {
      const { id, email } = await login(credentials.email, credentials.password)
      await setIsAuth(true)
      await setStartAuthState({ userId: id, email })
      //await fetchPersons(id, 4, 1)
      //setPersons(p)
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
    setPersons([])
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
        <Button
          onClick={() => signIn()}
          disabled={!(credentials.email && credentials.password)}
        >
          {'sign in'}
        </Button>
        <Button
          onClick={() => regMe()}
          disabled={!(credentials.email && credentials.password)}
        >
          {'reg me'}
        </Button>
        <div style={{ color: 'pink', textAlign: 'center' }}>{warnings}</div>
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
  background-color: #78244c;
  //height: 10%;
  color: #fff;
  padding: 8px;
  @media (min-width: 415px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const Input = styled.input`
  width: 99%;
  //max-width: 356px;
  background: #895061;
  border: 2px solid #2d4159;
  color: #fff;
  padding: 10px 0;
  font-size: 20px;
  @media (min-width: 415px) {
    font-size: 15px;
    padding: 4px 0;
  }
`

const Button = styled.button`
  width: 50%;
  //max-width: 180px;
  background: #0677a1;
  border: 2px solid #2d4159;
  color: #fff;
  padding: 8px;
  cursor: pointer;
  font-size: 25px;
  :disabled {
    background-color: #2d4159;
    color: #0677a1;
  }
  @media (min-width: 415px) {
    font-size: 17px;
    padding: 4px;
  }
`

export default Header
