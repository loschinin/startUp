import { authHost, host } from './index'
import jwt_decode from 'jwt-decode'
export const registration = async (
  email: string,
  password: string
): Promise<{
  id: number
  email: string
  iat?: number
  exp?: number
}> => {
  const { data } = await host.post('api/user/registration', { email, password })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const login = async (
  email: string,
  password: string
): Promise<{
  id: number
  email: string
  iat?: number
  exp?: number
}> => {
  const { data } = await host.post('api/user/login', { email, password })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const check = async (): Promise<{
  id: number
  email: string
  iat?: number
  exp?: number
}> => {
  const { data } = await authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
