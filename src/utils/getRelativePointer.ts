import type { Vector } from '../types'

export const getRelativePointer = ({ x, y }: Vector, { top, left }: DOMRect): Vector => ({
  x: x - left,
  y: y - top,
})
