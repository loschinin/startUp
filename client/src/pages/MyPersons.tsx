import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { PersonType } from '../App'
import { fetchPersons } from '../http/personAPI'
import { BASE_URL, LIMIT } from '../constants'
import Button from '../components/Button'
import { Link, useHistory } from 'react-router-dom'
import Page from '../components/Page'

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
  const history = useHistory()
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
    <Page className={className}>
      <Button onClick={() => history.push('/new')}>New Person</Button>
      <div>
        All: {persons.count} <hr />
      </div>

      {persons.rows.reverse().map((p) => (
        <div key={p.id} className={'person-card'}>
          <div className={'name'}>
            ID: {p.id}. {p.name}
          </div>
          <div className={'description'}>{p.description}</div>
          <div className={'image'}>
            <Link to={`/${p.id}`}>
              <img src={`${BASE_URL}${p.image}`} alt={''} />
            </Link>
          </div>
        </div>
      ))}
      {isMorePages && <Button onClick={() => loadMore()}>show more</Button>}
    </Page>
  )
}

const MyPersons = styled(_MyPersons)`
  .person-card {
    display: grid;
    grid-gap: 8px;
    grid-template-areas:
      'image name'
      'image description';
    grid-auto-columns: min-content;
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
