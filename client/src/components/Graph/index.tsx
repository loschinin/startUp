import * as React from 'react'
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import * as d3 from 'd3'
import './styles.css'
import { Simulation, SimulationNodeDatum } from 'd3-force'
import Links from './Links'
import Circles from './Circles'
import Labels from './Labels'
import { Types } from './types'

const SimpleForceGraph: FC<ITopContentPowerChartProps> = (props) => {
  //const simulation: Simulation<SimulationNodeDatum, undefined> | undefined
  const [state, setState] = useState(props.data)
  useMemo(() => {
    //simulatePositions()
    //drawTicks()
    //addZoomCapabilities()
    //simulation()
    const ticked = () => {
      d3.select('svg')
        .selectAll('circle')
        .data(state.nodes)
        .join('circle')
        .attr('r', 5)
        .attr('cx', function (d) {
          // @ts-ignore
          return d.x
        })
        .attr('cy', function (d) {
          // @ts-ignore
          return d.y
        })
    }

    const simulation = d3
      .forceSimulation()
      .nodes([{}, {}, {}, {}, {}])
      .force('charge', d3.forceManyBody().strength(-20))
      .force('center', d3.forceCenter(props.width / 2, props.height / 2))
      .on('tick', ticked)
  }, [])
  console.log({ state })
  console.log('propsData:', props.data)

  /*
  componentDidUpdate(
    prevProps: ITopContentPowerChartProps,
    prevState: ITopContentPowerChartState
  ) {
    simulatePositions()
    drawTicks()
  }*/

  /*  const simulation: Simulation<SimulationNodeDatum, undefined> | undefined = d3
    .forceSimulation()
    .nodes(state.clonedData?.nodes as SimulationNodeDatum[])
    .force(
      'link',
      d3
        .forceLink()
        .id((d) => {
          return (d as Types.node).name
        })
        .distance(props.linkDistance)
        .strength(props.linkStrength)
    )
    .force('charge', d3.forceManyBody().strength(props.chargeStrength))
    .force('center', d3.forceCenter(props.centerWidth, props.centerHeight))*/

  /*const simulatePositions = () => {
    const simulationForceLink = d3
      .forceSimulation()
      .nodes(state.clonedData?.nodes)
      .force(
        'link',
        d3
          .forceLink()
          .id((d) => (d as Types.node).name)
          .distance(props.linkDistance)
          .strength(props.linkStrength)
      )
      .force('charge', d3.forceManyBody().strength(props.chargeStrength))
      .force('center', d3.forceCenter(props.centerWidth, props.centerHeight))
    console.log(simulationForceLink)
    // @ts-ignore
    //simulationForceLink.force('link')?.links(state.clonedData?.links)
    console.log(simulationForceLink)
  }*/

  /*  const drawTicks = () => {
    const nodes = d3.selectAll('.node')
    const links = d3.selectAll('.link')
    const labels = d3.selectAll('.label')

    d3.forceSimulation()
      .nodes(state.clonedData?.nodes as SimulationNodeDatum[])
      .on('tick', onTickHandler)

    function onTickHandler() {
      links
        .attr('x1', (d) => {
          return (d as { source: Types.point }).source.x
        })
        .attr('y1', (d) => {
          return (d as { source: Types.point }).source.y
        })
        .attr('x2', (d) => {
          return (d as { target: Types.point }).target.x
        })
        .attr('y2', (d) => {
          return (d as { target: Types.point }).target.y
        })
      nodes
        .attr('cx', (d) => {
          return (d as Types.point).x
        })
        .attr('cy', (d) => {
          return (d as Types.point).y
        })
      labels
        .attr('x', (d) => {
          return (d as Types.point).x + 5
        })
        .attr('y', (d) => {
          return (d as Types.point).y + 5
        })
    }
  }*/

  /*  const addZoomCapabilities = () => {
    const container = d3.select('.container')
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .translateExtent([
        [100, 100],
        [300, 300],
      ])
      .extent([
        [100, 100],
        [200, 200],
      ])
      .on('zoom', (event) => {
        let { x, y, k } = event.transform
        x = 0
        y = 0
        k *= 1
        container
          .attr('transform', `translate(${x}, ${y})scale(${k})`)
          .attr('width', props.width)
          .attr('height', props.height)
      })

    // @ts-ignore
    container.call(zoom)
  }*/

  const restartDrag = () => {
    //d3.forceSimulation().alphaTarget(0.2).restart()
  }

  const stopDrag = () => {
    //d3.forceSimulation().alphaTarget(0)
  }

  if (JSON.stringify(props.data) !== JSON.stringify(state)) setState(props.data)

  const initialScale = 1
  const initialTranslate = [0, 0]
  const { width, height } = props
  return (
    <svg
      className="container"
      //x={0}
      //y={0}
      width={width}
      height={height}
      //transform={`translate(${initialTranslate[0]}, ${initialTranslate[1]})scale(${initialScale})`}
    >
      <g>
        <Links links={state.links as Types.link[]} />
        <Circles
          nodes={state.nodes as Types.node[]}
          restartDrag={restartDrag}
          stopDrag={stopDrag}
        />
        <Labels
          nodes={state.nodes as Types.node[]}
          onNodeSelected={props.onNodeSelected}
        />
      </g>
    </svg>
  )
}

interface ITopContentPowerChartProps {
  width: number
  height: number
  data: Types.DataObject
  onNodeSelected: Dispatch<SetStateAction<number>>
  linkDistance: number
  linkStrength: number
  chargeStrength: number
  centerWidth: number
  centerHeight: number
}

interface ITopContentPowerChartState {
  clonedData: Types.DataObject
}

export default SimpleForceGraph
