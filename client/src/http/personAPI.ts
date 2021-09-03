import { authHost, host } from './index'

export const createPerson = async (person: FormData) => {
  const { data } = await authHost.post('api/person', person)
  return data
}

export const updatePerson = async (person: FormData, id: number) => {
  const { data } = await authHost.patch(`api/person/${id}`, person)
  return data
}

export const fetchAllPersons = async (limit: number, page: number) => {
  const { data } = await host.get(`api/person?limit=${limit}&page=${page}`)
  return data
}

export const fetchPerson = async (id: number) => {
  const { data } = await authHost.get(`api/person/${id}`)
  return data
}

export const deletePerson = async (id: number, userId: number) => {
  const { data } = await authHost.delete(`api/person/${id}`, {
    data: { userId },
  })
  return data
}
