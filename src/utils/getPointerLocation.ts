export const getPointerLocation = ({ x, y }: PointerEvent, top: number, left: number) => ({
  x: x - left,
  y: y - top
})
