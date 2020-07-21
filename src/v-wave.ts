import { IVWaveDirectiveOptions } from './options'
import { createContainer } from './utils/createContainerElement'
import { createWaveElement } from './utils/createWaveElement'
import { getDistanceToFurthestCorner } from './utils/getDistanceToFurthestCorner'
import { getPointerLocation } from './utils/getPointerLocation'

const wave = (event: PointerEvent, el: HTMLElement, options: IVWaveDirectiveOptions) => {
  const { top, left, width, height } = el.getBoundingClientRect()
  const computedStyles = window.getComputedStyle(el)

  const { x, y } = getPointerLocation(event, top, left)
  const size = 2.05 * getDistanceToFurthestCorner(x, y, width, height) // 2.05 is magic, deal with it.

  // We're creating a container for the "wave" with `overflow: hidden`
  // because if we were to set `overflow: hidden` on `el` we
  // risk altering its appearance.
  const waveContainer = createContainer(computedStyles)
  const waveEl = createWaveElement(x, y, size, options)

  // We reply on absolute positioning, so we need to make sure `el`'s position is non-static
  if (computedStyles.position === 'static') el.style.position = 'relative'

  waveContainer.appendChild(waveEl)
  el.appendChild(waveContainer)

  let shouldDissolveWave = false
  const releaseWave = (e?: any) => {
    if (typeof e !== 'undefined') {
      document.removeEventListener('pointerup', releaseWave)
      document.removeEventListener('pointercancel', releaseWave)
    }

    if (shouldDissolveWave) dissolveWave()
    else shouldDissolveWave = true
  }

  const dissolveWave = () => {
    waveEl.style.transition = 'opacity 150ms linear'
    waveEl.style.opacity = '0'

    setTimeout(() => waveContainer.remove(), 150)
  }

  document.addEventListener('pointerup', releaseWave)
  document.addEventListener('pointercancel', releaseWave)

  requestAnimationFrame(() => {
    waveEl.style.transform = `translate(-50%,-50%) scale(1)`
    waveEl.style.opacity = `${options.finalOpacity}`

    setTimeout(() => releaseWave(), options.duration * 1000)
  })
}

export { wave }
