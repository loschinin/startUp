export namespace Types {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export type node = {
    name: string
    group: number
    radiusSize: number
    fillColor: string
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export type link = {
    source: string
    target: string
    value: string
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export type DataObject = {
    nodes: node[]
    links: link[]
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export type point = {
    x: number
    y: number
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export type datum = {
    x: number
    y: number
    fx: number | null
    fy: number | null
  }
}
