import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { PersonType } from '../App'
import { fetchPersons } from '../http/personAPI'
import { BASE_URL, LIMIT } from '../constants'
import Button from '../components/Button'

const _MyPersons: StyledFC<{
  userId: number
  persons: { count: number; rows: PersonType[] }
  setPersons: Dispatch<SetStateAction<{ count: number; rows: PersonType[] }>>
  nextPage: number
  setNextPage: Dispatch<SetStateAction<number>>
  isMorePages: boolean
}> = ({
  className,
  userId,
  persons,
  setPersons,
  nextPage,
  setNextPage,
  isMorePages,
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
  //console.log('!!!!', persons.count)
  //console.log({ userId })

  //console.log('left', persons.count % LIMIT)
  //console.log('right', nextPage - 1)
  const loadMore = () => {
    setNextPage((prev) => prev + 1)
    if (isMorePages) {
      fetchPersons(userId, LIMIT, nextPage).then(({ rows, count }) => {
        setPersons({ count, rows: [...persons.rows, ...rows] })
      })
    }
  }

  return (
    <div className={className}>
      <div>
        All: {persons.count} <hr />
      </div>
      {persons.rows.map((p, i) => (
        <div key={p.id} className={'person-card'}>
          <div className={'name'}>
            {i + 1}. {p.name}
          </div>
          <div className={'description'}>{p.description}</div>
          <div className={'image'}>
            <img src={`${BASE_URL}${p.image}`} alt={''} />
          </div>
        </div>
      ))}
      {isMorePages && <Button onClick={() => loadMore()}>load more</Button>}
    </div>
  )
}

const MyPersons = styled(_MyPersons)`
  grid-area: content;
  position: relative;
  display: grid;
  grid-auto-rows: min-content;
  gap: 8px;
  background-color: #895061;
  color: aliceblue;
  padding: 10px;
  font-size: 20px;
  .person-card {
    display: grid;
    grid-gap: 8px;
    grid-template-areas:
      'image name'
      'image description';
  }
  .name {
    grid-area: name;
  }
  .description {
    grid-area: description;
    color: #b3b2b2;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 300px;
    white-space: nowrap;
  }
  .image {
    grid-area: image;
    overflow: hidden;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    img {
      width: 55px;
      height: 55px;
    }
  }
`

export default MyPersons
