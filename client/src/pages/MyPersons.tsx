import React, { Dispatch, SetStateAction, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { PersonType } from '../App'
import Button from '../components/Button'
import Page from '../components/Page'
import { BASE_URL, NEXT_PAGE, PAGES_LIMIT } from '../constants'
import { colors } from '../design'
import { fetchPersons } from '../http/personAPI'
import { StyledFC } from '../types'
import { dateConvert } from '../utils'

const _MyPersons: StyledFC<{
  userId: number
  persons: { count: number; rows: PersonType[] }
  setPersons: Dispatch<SetStateAction<{ count: number; rows: PersonType[] }>>
}> = ({ className, userId, persons, setPersons }) => {
  const history = useHistory()
  const [nextPage, setNextPage] = useState(NEXT_PAGE)
  const isMorePages =
    persons.count > persons.rows.length &&
    Math.ceil(persons.count / PAGES_LIMIT) >= nextPage - 1

  const loadMore = async () => {
    setNextPage((prev) => prev + 1)
    if (isMorePages) {
      const { rows, count } = await fetchPersons(userId, PAGES_LIMIT, nextPage)
      setPersons({ count, rows: [...persons.rows, ...rows] })
      //console.log('loadmre:', persons, { nextPage })
      //console.log('rows:', rows)
    }
  }

  // @ts-ignore
  /*const nodeHoverTooltip = useCallback<{
    (node: { name: string }): string
    (arg0: any): string
  }>((node) => `${node.name}`, [])
  const forceData: Types.DataObject = useRecoilValue(
    getPowerChartData
  ) as Types.DataObject*/
  //const [selectedIndex, setSelectedIndex] = useState(0)
  /*const [d, setD] = useState([10, 20, 30, 40, 50, 60, 70, 80])
  const updateData = useCallback(() => {
    const count = 5 + Math.round(Math.random() * 15)
    const values = []
    for (let i = 0; i < count; i++) {
      values[i] = 10 + Math.round(Math.random() * 70)
    }
    setD(values)
  }, [])

  const rand = Math.floor(Math.random() * 100)
  const rand2 = Math.floor(Math.random() * 100 + 10)
  console.log(rand)*/
  return (
    <Page className={className} gap={24}>
      {/*<>
        <button onClick={updateData}>Update Data</button>
        <Graph data={d} />
      </>*/}

      {/*<Graph
        data={forceData}
        width={300}
        height={400}
        linkDistance={30}
        centerHeight={30}
        linkStrength={40}
        centerWidth={30}
        chargeStrength={7}
      />*/}
      <Button primary onClick={() => history.push('/new')}>
        New Person
      </Button>
      <div>
        All: {persons.count} <hr />
      </div>

      {persons.rows.map((p) => (
        <div key={p.id} className={'person-card'}>
          <div
            className={'image'}
            style={{ backgroundImage: `url(${BASE_URL}${p.image})` }}
          />

          <div className={'name'}>{p.name}</div>

          <div className={'info'}>
            ID: {p.id}.
            <br />
            Created: {p.createdAt && dateConvert(p.createdAt)}
            <br />
            Updated: {p.updatedAt && dateConvert(p.updatedAt)}
            <br />
            {p.momId !== 0 && `MomId: ${p.momId}`}
            <br />
            {p.dadId !== 0 && `DadId: ${p.dadId}`}
          </div>
          <div className={'description'}>{ReactHtmlParser(p.description)}</div>

          <Button className={'edit'} onClick={() => history.push(`/${p.id}`)}>
            &#9998;
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
    grid-template-columns: 1fr 5fr 1fr;
    grid-template-areas:
      'image name edit'
      'image info edit'
      'description description description';

    //grid-auto-columns: min-content;
  }
  .info {
    grid-area: info;
    color: ${colors.secondaryTextColor};
    font-size: 15px;
  }
  .name {
    grid-area: name;
    font-size: 25px;
    text-overflow: ellipsis;
    overflow: hidden;
    //max-width: 750px;
    white-space: nowrap;
  }
  .description {
    grid-area: description;
    color: ${colors.secondaryTextColor};
  }
  .image {
    grid-area: image;
    overflow: hidden;
    min-width: 75px;
    min-height: 110px;
    max-width: 140px;
    background-size: cover;
    background-position: 50% 30%;
  }
  .edit {
    grid-area: edit;
  }
`

export default MyPersons
