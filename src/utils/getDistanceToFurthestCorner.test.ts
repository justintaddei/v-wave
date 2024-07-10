import { expect, test } from 'vitest'
import { getDistanceToFurthestCorner } from './getDistanceToFurthestCorner'

test('getDistanceToFurthestCorner', () => {
  expect(getDistanceToFurthestCorner({ x: 25, y: 25 }, { width: 100, height: 100 } as DOMRect)).toBe(106.06601717798213)
  expect(getDistanceToFurthestCorner({ x: 25, y: 25 }, { width: 30, height: 30 } as DOMRect)).toBe(35.35533905932738)
})
