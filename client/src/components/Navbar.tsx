import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { login, registration } from '../http/userAPI'

const _Navbar: StyledFC = ({ className }) => {
  const isLogin = false
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const click = async () => {
    if (isLogin) {
      const res = await login(email, password)
      console.log({ res })
    } else {
      const res = await registration(email, password)
      console.log({ res })
    }
  }
  //console.log(registration(email, password))
  //console.log(login(email, password))
  return (
    <div className={className}>
      <input
        type={'text'}
        placeholder={'email'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type={'password'}
        placeholder={'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={click}>reg me</button>
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
