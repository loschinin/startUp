import * as React from 'react'
import { Dispatch, SetStateAction } from 'react'
import Label from './Label'
import { Types } from './types'

const uuid = require('uuid')

export default class Labels extends React.PureComponent<ILabelsProps> {
  render() {
    const labels = this.props.nodes.map((node: Types.node) => {
      return (
        <Label
          key={`label-${uuid.v4()}`}
          node={node}
          onNodeSelected={this.props.onNodeSelected}
        />
      )
    })
    return <g className="labels">{labels}</g>
  }
}

interface ILabelsProps {
  nodes: Types.node[]
  onNodeSelected: Dispatch<SetStateAction<number>>
}
