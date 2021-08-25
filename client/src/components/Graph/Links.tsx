import * as React from 'react'
import Link from './Link'
import { Types } from './types'

import * as uuid from 'uuid'

export default class Links extends React.PureComponent<{
  links: Types.link[]
}> {
  render() {
    const links = this.props.links.map((link: Types.link) => {
      return <Link key={`links-${uuid.v4()}`} link={link} />
    })
    return <g className="links">{links}</g>
  }
}
