import { authHost, host } from './index'

export const createPerson = async (person: {
  name: string
  description: string
  image: string
}) => {
  const { data } = await authHost.post('api/person', person)
  return data
}

export const fetchPersons = async () => {
  const { data } = await host.get('api/person')
  return data
}

export const fetchPerson = async (id: number) => {
  const { data } = await authHost.get(`api/person/${id}`)
  return data
}