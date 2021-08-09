import { FC } from 'react'

export type StyledFC<Props = {}> = FC<Props & { className?: string }>
