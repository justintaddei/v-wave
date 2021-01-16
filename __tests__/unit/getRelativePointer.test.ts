import { getRelativePointer } from '../../src/utils/getRelativePointer'

test('getRelativePointer', () => {
  expect(getRelativePointer({ x: 125, y: 150 } as PointerEvent, { top: 50, left: 100 } as DOMRect)).toEqual({
    x: 25,
    y: 100
  })
  expect(getRelativePointer({ x: 25, y: 25 } as PointerEvent, { top: 30, left: 30 } as DOMRect)).toEqual({
    x: -5,
    y: -5
  })
})
