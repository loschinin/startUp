import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { PersonType } from '../App'
import { deletePerson, fetchPersons } from '../http/personAPI'
import { BASE_URL, FIRST_PAGE, LIMIT, NEXT_PAGE } from '../constants'
import Button from '../components/Button'
import { Link, useHistory } from 'react-router-dom'
import Page from '../components/Page'
import { colors } from '../design/colors'

const _MyPersons: StyledFC<{
  userId: number
  persons: { count: number; rows: PersonType[] }
  setPersons: Dispatch<SetStateAction<{ count: number; rows: PersonType[] }>>
}> = ({ className, userId, persons, setPersons }) => {
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
  const [nextPage, setNextPage] = useState(NEXT_PAGE)
  //const isMorePages = persons.count % LIMIT >= nextPage - 1
  const isMorePages =
    persons.count > persons.rows.length &&
    Math.ceil(persons.count / LIMIT) >= nextPage - 1
  const loadMore = async () => {
    await setNextPage((prev) => prev + 1)
    if (isMorePages) {
      const { rows, count } = await fetchPersons(userId, LIMIT, nextPage)
      await setPersons({ count, rows: [...persons.rows, ...rows] })
      console.log('loadmre:', persons, { nextPage })
      console.log('rows:', rows)
    }
  }

  const deletePersonHandler = async (personId: number) => {
    const res = await deletePerson(personId)
    const { rows, count } = await fetchPersons(userId, LIMIT, FIRST_PAGE)
    await setPersons({ count, rows })
    console.log(res)
  }

  return (
    <Page className={className}>
      <Button onClick={() => history.push('/new')}>New Person</Button>
      <div>
        All: {persons.count} <hr />
      </div>

      {persons.rows.map((p) => (
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
          <Button className={'del'} onClick={() => deletePersonHandler(p.id)}>
            x
          </Button>
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
      'image name del'
      'image description del';
    grid-auto-columns: min-content;
  }
  .name {
    grid-area: name;
  }
  .description {
    grid-area: description;
    color: ${colors.secondaryTextColor};
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
    .del {
      grid-area: del;
    }
  }
`

export default MyPersons
