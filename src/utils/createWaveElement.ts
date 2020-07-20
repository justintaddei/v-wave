import { IVWaveDirectiveOptions } from '../options'

export const createWaveElement = (x: number, y: number, size: number, options: IVWaveDirectiveOptions) => {
  const waveElement = document.createElement('div')

  waveElement.style.position = 'absolute'
  waveElement.style.width = `${size}px`
  waveElement.style.height = `${size}px`
  waveElement.style.top = `${y}px`
  waveElement.style.left = `${x}px`
  waveElement.style.backgroundColor = options.color
  waveElement.style.borderRadius = '50%'
  waveElement.style.opacity = '0.2'
  waveElement.style.transform = `translate(-50%,-50%) scale(0)`
  waveElement.style.transition = `transform ${options.duration}s ease-out, opacity ${options.duration}s ease-out`

  return waveElement
}
