import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { PersonType } from '../App'
import { fetchPersons } from '../http/personAPI'
import { BASE_URL, LIMIT, NEXT_PAGE } from '../constants'
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
      setPersons({ count, rows: [...persons.rows, ...rows] })
      console.log('loadmre:', persons, { nextPage })
      console.log('rows:', rows)
    }
  }
  /*  const loadMore2 = () => {
    setCurrentPage((prev) => prev + 1)
  }
  const [currentPage, setCurrentPage] = useState(1)

  const [personsPerPage] = useState(3)*/
  /*
  useEffect(() => {
    const retrievePersons = async () => {
      const { rows, count } = await fetchPersons(
        userId,
        personsPerPage,
        currentPage
      )
      setPersons({ count, rows: [...persons.rows, ...rows] })
    }
    retrievePersons()
  }, [currentPage])*/
  /*  const lastPersonIndex = currentPage * personsPerPage
  const firstPersonIndex = lastPersonIndex - personsPerPage
  const currentPerson = persons.rows.slice(firstPersonIndex, lastPersonIndex)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  console.log(currentPerson)*/
  //const [deletedId, setDeletedId] = useState(0)
  /*const deletePersonHandler = async (personId: number) => {
    const { id } = await deletePerson(personId)
    //const { rows, count } = await fetchPersons(userId, LIMIT, FIRST_PAGE)
    //setPersons({ count, rows })
    const minusOnePersons = persons.rows.filter((p) => p.id !== id)

    console.log({ minusOnePersons })
    console.log({ persons })
    //console.log({ e })
    //setDeletedId(id)
    setPersons({ count: persons.count - 1, rows: minusOnePersons })
    setNextPage(FIRST_PAGE)
  }*/

  return (
    <Page className={className}>
      <Button onClick={() => history.push('/new')}>New Person</Button>
      <div>
        All: {persons.count} <hr />
      </div>

      {persons.rows.map((p) => (
        <div key={p.id} className={'person-card'}>
          <div className={'image'}>
            <Link to={`/${p.id}`}>
              <img src={`${BASE_URL}${p.image}`} alt={''} />
            </Link>
          </div>
          <div className={'person-text'}>
            <div className={'name'}>
              ID: {p.id}. {p.name}
            </div>
            <div className={'description'}>{p.description}</div>
          </div>
          {/*          <Button
            className={'del'}
            //disabled={p.id === deletedId}
            onClick={() => deletePersonHandler(p.id)}
          >
            x
          </Button>*/}
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
    grid-template-columns: 1fr 6fr;
    /*grid-template-areas:
      'image name name name'
      'image description description description';
    */
    //grid-auto-columns: min-content;
  }
  .person-text {
    align-self: center;
  }
  .name {
    //grid-area: name;
  }
  .description {
    //grid-area: description;
    color: ${colors.secondaryTextColor};
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 300px;
    white-space: nowrap;
  }
  .image {
    //grid-area: image;
    overflow: hidden;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    img {
      width: 55px;
      height: 55px;
    }
    /*.del {
      grid-area: del;
    }*/
  }
`

export default MyPersons
