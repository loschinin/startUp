import { authHost } from './index'

export const createPerson = async (person: FormData) => {
  const { data } = await authHost.post('api/person', person)
  return data
}

export const fetchPersons = async (
  userId: number,
  limit: number,
  page: number
) => {
  const { data } = await authHost.get(
    `api/person?userId=${userId}&limit=${limit}&page=${page}`
  )
  return data
}

export const fetchPerson = async (id: number) => {
  const { data } = await authHost.get(`api/person/${id}`)
  return data
}

export const deletePerson = async (id: number) => {
  const { data } = await authHost.delete(`api/person/${id}`)
  return data
}
