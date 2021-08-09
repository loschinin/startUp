import { host } from './index'
import jwt_decode from 'jwt-decode'
export const registration = async (email: string, password: string) => {
  const { data } = await host.post('api/user/registration', { email, password })
  return jwt_decode(data.token)
}

export const login = async (email: string, password: string) => {
  const { data } = await host.post('api/user/login', { email, password })
  return jwt_decode(data.token)
}

export const check = async () => {
  return await host.post('api/auth/check')
}
