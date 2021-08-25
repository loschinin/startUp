import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import { PersonType } from '../App'
import { fetchPersons } from '../http/personAPI'
import { BASE_URL, NEXT_PAGE, PAGES_LIMIT } from '../constants'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'
import Page from '../components/Page'
import { colors } from '../design'
import ReactHtmlParser from 'react-html-parser'
import { dateConvert } from '../utils'
import Graph from '../components/Graph'
import { Types } from '../components/Graph/types'
import { useRecoilValue } from 'recoil'
import { getPowerChartData } from '../components/Graph/powerChartSelectors'

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
  /*
  const nodeHoverTooltip = useCallback<{
    (node: { name: string }): string
    (arg0: any): string
  }>((node) => `${node.name}`, [])
*/
  const forceData: Types.DataObject = useRecoilValue(
    getPowerChartData
  ) as Types.DataObject
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Page className={className} gap={24}>
      {selectedIndex}
      {forceData ? (
        <Graph
          width={450}
          height={350}
          data={forceData}
          onNodeSelected={setSelectedIndex}
          linkDistance={70}
          linkStrength={1}
          chargeStrength={-20}
          centerWidth={450 / 2}
          centerHeight={350 / 2}
        />
      ) : (
        'LOADING...'
      )}

      {/*<ForceGraph
        linksData={data.links}
        nodesData={data.nodes}
        nodeHoverTooltip={nodeHoverTooltip}
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
