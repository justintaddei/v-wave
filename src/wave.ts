import type { IVWaveDirectiveOptions } from './options'
import type { Vector } from './types'
import { createContainer } from './utils/createContainerElement'
import { createWaveElement } from './utils/createWaveElement'
import { getDistanceToFurthestCorner } from './utils/getDistanceToFurthestCorner'
import { getRelativePointer } from './utils/getRelativePointer'
import { restoreParentElementStyles, saveParentElementStyles } from './utils/parentElementStyles'
import { decrementWaveCount, deleteWaveCount, getWaveCount, incrementWaveCount } from './utils/wave-count'

// 2.05 is magic.
// Values smaller than this seem to cause the wave to stop
// just short of the edge of the element sometimes.
// (probably due to floating point precision)
const SCALE_FACTOR = 2.05

const wave = (screenPos: Vector, el: HTMLElement, options: IVWaveDirectiveOptions) => {
  if (options.disabled) return
  if (options.respectDisabledAttribute && el.hasAttribute('disabled')) return
  if (options.respectPrefersReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const rect = el.getBoundingClientRect()
  const computedStyles = window.getComputedStyle(el)

  const relativePos = getRelativePointer(screenPos, rect)
  const size = SCALE_FACTOR * getDistanceToFurthestCorner(relativePos, rect)

  // We're creating a container for the "wave" with `overflow: hidden`
  // because if we were to set `overflow: hidden` on `el` we
  // risk altering its appearance.
  const existingWaveContainer = el.querySelector('[data-v-wave-container-internal]')
  const waveContainer = existingWaveContainer ?? createContainer(computedStyles, options.tagName)
  const waveEl = createWaveElement(relativePos, size, options)

  // Keep track of how many waves are active on this element.
  // We use this to know when it's safe to remove the wave container.
  incrementWaveCount(el)

  // We rely on absolute positioning, so we need to make sure `el`'s position is non-static
  saveParentElementStyles(el, computedStyles)

  waveContainer.appendChild(waveEl)

  if (!existingWaveContainer) el.appendChild(waveContainer)

  let shouldDissolveWave = !options.waitForRelease
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
      waveEl.remove()
      decrementWaveCount(el)

      if (getWaveCount(el) === 0) {
        deleteWaveCount(el)
        waveContainer.remove()
        restoreParentElementStyles(el)
      }
    }, options.dissolveDuration * 1000)
  }

  if (options.waitForRelease) {
    document.addEventListener('pointerup', releaseWave)
    document.addEventListener('pointercancel', releaseWave)
  }

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

    waveEl.remove()
    decrementWaveCount(el)

    if (getWaveCount(el) === 0) {
      deleteWaveCount(el)
      // Only reset the style after all active waves have been removed
      waveContainer.remove()
      restoreParentElementStyles(el)
    }

    document.removeEventListener('pointerup', releaseWave)
    document.removeEventListener('pointercancel', releaseWave)
    document.removeEventListener('pointercancel', cancelWave)
  }

  document.addEventListener('pointercancel', cancelWave)
}

export { wave }
