import axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL } from '../constants'

const host = axios.create({
  baseURL: BASE_URL,
})

const authHost = axios.create({
  baseURL: BASE_URL,
})

const authInterceptor = (config: AxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(`token`)}`
  return config
}

authHost.interceptors.request.use(authInterceptor)

export { host, authHost }
