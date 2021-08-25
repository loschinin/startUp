//import {link, node, Types} from './types'
//import dataObject = Types.DataObject

import { Types } from './types'

const nodes = [
  {
    name: 'JavaScript / TypeScript',
    radiusSize: 30,
    fillColor: '#fa6502',
    group: 3,
  },
]

const links = [
  {
    source: 'Erase a character',
    target: 'JavaScript / TypeScript',
    value: 'How would you erase a character from a string?',
  },
]

export const data: Types.DataObject = { nodes, links }
