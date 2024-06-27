import type { IVWaveDirectiveOptions } from './options'
import { createContainer } from './utils/createContainerElement'
import { createWaveElement } from './utils/createWaveElement'
import { getDistanceToFurthestCorner } from './utils/getDistanceToFurthestCorner'
import { getRelativePointer } from './utils/getRelativePointer'
import { decrementWaveCount, deleteWaveCount, getWaveCount, incrementWaveCount } from './utils/wave-count'

const wave = (event: PointerEvent, el: HTMLElement, options: IVWaveDirectiveOptions) => {
  const rect = el.getBoundingClientRect()
  const computedStyles = window.getComputedStyle(el)

  const { x, y } = getRelativePointer(event, rect)
  const size = 2.05 * getDistanceToFurthestCorner(x, y, rect) // 2.05 is magic, deal with it.

  // We're creating a container for the "wave" with `overflow: hidden`
  // because if we were to set `overflow: hidden` on `el` we
  // risk altering its appearance.
  const waveContainer = createContainer(computedStyles, options.tagName)
  const waveEl = createWaveElement(x, y, size, options)

  // Keep track of how many waves are active on this element.
  incrementWaveCount(el)

  // We reply on absolute positioning, so we need to make sure `el`'s position is non-static
  let originalPositionValue = ''
  if (computedStyles.position === 'static') {
    if (el.style.position) originalPositionValue = el.style.position
    el.style.position = 'relative'
  }

  waveContainer.appendChild(waveEl)
  el.appendChild(waveContainer)

  let shouldDissolveWave = false
  const releaseWave = (e?: PointerEvent) => {
    if (typeof e !== 'undefined') {
      document.removeEventListener('pointerup', releaseWave)
      document.removeEventListener('pointercancel', releaseWave)
    }

    if (shouldDissolveWave) dissolveWave()
    else shouldDissolveWave = true
  }

  const dissolveWave = () => {
    waveEl.style.transition = `opacity ${options.dissolveDuration}s linear`
    waveEl.style.opacity = '0'

    setTimeout(() => {
      waveContainer.remove()

      decrementWaveCount(el)

      if (getWaveCount(el) === 0) {
        deleteWaveCount(el)
        // Only reset the style after all active waves have been removed
        el.style.position = originalPositionValue
      }
    }, options.dissolveDuration * 1000)
  }

  document.addEventListener('pointerup', releaseWave)
  document.addEventListener('pointercancel', releaseWave)

  const token = setTimeout(() => {
    document.removeEventListener('pointercancel', cancelWave)

    requestAnimationFrame(() => {
      waveEl.style.transform = 'translate(-50%,-50%) scale(1)'
      waveEl.style.opacity = `${options.finalOpacity}`

      setTimeout(() => releaseWave(), options.duration * 1000)
    })
  }, options.cancellationPeriod)

  const cancelWave = () => {
    clearTimeout(token)

    waveContainer.remove()
    document.removeEventListener('pointerup', releaseWave)
    document.removeEventListener('pointercancel', releaseWave)
    document.removeEventListener('pointercancel', cancelWave)
  }

  document.addEventListener('pointercancel', cancelWave)
}

export { wave }
