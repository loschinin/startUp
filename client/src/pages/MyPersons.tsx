import React from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { PersonType } from '../App'

const _MyPersons: StyledFC<{ userId: number; persons: PersonType[] }> = ({
  className,
  userId,
  persons,
}) => {
  //console.log(fetchPersons(userId, 4, 1))
  /*const [persons, setPersons] = useState({})

  useEffect(() => {
    const getPersons = async () => {
      const p = await fetchPersons(userId, 4, 1)
      await setPersons(p)
    }
    getPersons()
  }, [userId])

  console.log(persons)*/

  return (
    <div className={className}>
      {persons.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  )
}

const MyPersons = styled(_MyPersons)`
  grid-area: content;
  position: relative;
  background-color: #895061;
  color: aliceblue;
  padding: 10px;
`

export default MyPersons
