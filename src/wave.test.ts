import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { IVWaveDirectiveOptions } from './options'
import { wave } from './wave'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns a fully-populated options object, with easy overrides. */
function opts(overrides: Partial<IVWaveDirectiveOptions> = {}): IVWaveDirectiveOptions {
  return {
    color: 'currentColor',
    initialOpacity: 0.2,
    finalOpacity: 0.1,
    duration: 0.4,
    dissolveDuration: 0.15,
    waitForRelease: false,
    easing: 'ease-out',
    cancellationPeriod: 0,
    trigger: 'auto',
    tagName: 'div',
    disabled: false,
    respectDisabledAttribute: true,
    respectPrefersReducedMotion: true,
    stopPropagation: false,
    ...overrides,
  }
}

/** Creates a button element attached to document.body with a stubbed rect. */
function createElement(): HTMLButtonElement {
  const el = document.createElement('button')
  vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    top: 0,
    left: 0,
    right: 100,
    bottom: 100,
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect)
  document.body.appendChild(el)
  return el
}

/** Finds the wave container inside an element (or null). */
function getWaveContainer(el: HTMLElement): HTMLElement | null {
  return el.querySelector('[data-v-wave-container-internal]')
}

/** A center-of-element pointer position (relative to viewport). */
const CENTER = { x: 50, y: 50 }

// Timing helpers — uses the cancellationPeriod stored in the options arg.
function advancePastCancellationPeriod(o: IVWaveDirectiveOptions) {
  vi.advanceTimersByTime(o.cancellationPeriod + 1)
}

function advancePastDuration(o: IVWaveDirectiveOptions) {
  vi.advanceTimersByTime(o.cancellationPeriod + 1 + o.duration * 1000 + 1)
}

function advancePastDissolve(o: IVWaveDirectiveOptions) {
  vi.advanceTimersByTime(o.cancellationPeriod + 1 + o.duration * 1000 + 1 + o.dissolveDuration * 1000 + 1)
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.useFakeTimers()

  // Make requestAnimationFrame synchronous so animation callbacks fire
  // immediately without needing to advance a separate frame queue.
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    cb(0)
    return 0
  })

  // jsdom does not implement matchMedia; provide a default stub (no reduced motion).
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  )
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  document.body.innerHTML = ''
})

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('wave()', () => {
  // -------------------------------------------------------------------------
  // Disabled / guard conditions
  // -------------------------------------------------------------------------

  describe('does nothing when disabled', () => {
    test('`disabled: true` → no wave container is added', () => {
      const el = createElement()
      wave(CENTER, el, opts({ disabled: true }))
      expect(getWaveContainer(el)).toBeNull()
    })

    test('`disabled` HTML attribute + `respectDisabledAttribute: true` → no wave container', () => {
      const el = createElement()
      el.setAttribute('disabled', '')
      wave(CENTER, el, opts({ respectDisabledAttribute: true }))
      expect(getWaveContainer(el)).toBeNull()
    })

    test('`disabled` HTML attribute + `respectDisabledAttribute: false` → wave container IS added', () => {
      const el = createElement()
      el.setAttribute('disabled', '')
      wave(CENTER, el, opts({ respectDisabledAttribute: false }))
      expect(getWaveContainer(el)).not.toBeNull()
    })

    test('`prefers-reduced-motion: reduce` + `respectPrefersReducedMotion: true` → no wave container', () => {
      vi.stubGlobal(
        'matchMedia',
        vi.fn(() => ({
          matches: true,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }))
      )
      const el = createElement()
      wave(CENTER, el, opts({ respectPrefersReducedMotion: true }))
      expect(getWaveContainer(el)).toBeNull()
    })

    test('`prefers-reduced-motion: reduce` + `respectPrefersReducedMotion: false` → wave container IS added', () => {
      vi.stubGlobal(
        'matchMedia',
        vi.fn(() => ({
          matches: true,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }))
      )
      const el = createElement()
      wave(CENTER, el, opts({ respectPrefersReducedMotion: false }))
      expect(getWaveContainer(el)).not.toBeNull()
    })
  })

  // -------------------------------------------------------------------------
  // DOM structure (synchronous checks — no timer advancement needed)
  // -------------------------------------------------------------------------

  describe('DOM structure', () => {
    test('appends a wave container to the element immediately', () => {
      const el = createElement()
      wave(CENTER, el, opts())
      expect(getWaveContainer(el)).not.toBeNull()
    })

    test('wave container is identified by `data-v-wave-container-internal`', () => {
      const el = createElement()
      wave(CENTER, el, opts())
      const container = getWaveContainer(el) as HTMLElement
      expect(container.dataset.vWaveContainerInternal).toBe('true')
    })

    test('`tagName` option controls the tag of the wave container', () => {
      const el = createElement()
      wave(CENTER, el, opts({ tagName: 'span' }))
      const container = getWaveContainer(el) as HTMLElement
      expect(container.tagName).toBe('SPAN')
    })

    test('wave element is placed inside the wave container', () => {
      const el = createElement()
      wave(CENTER, el, opts())
      const container = getWaveContainer(el) as HTMLElement
      expect(container.children.length).toBeGreaterThan(0)
    })

    test('reuses an existing container for a second wave instead of creating a new one', () => {
      const el = createElement()
      wave(CENTER, el, opts())
      wave(CENTER, el, opts())
      expect(el.querySelectorAll('[data-v-wave-container-internal]').length).toBe(1)
    })

    test("sets the parent element's position to `relative` when it is statically positioned", () => {
      const el = createElement()
      el.style.position = 'static'
      wave(CENTER, el, opts())
      expect(el.style.position).toBe('relative')
    })
  })

  // -------------------------------------------------------------------------
  // Initial wave element state (synchronous)
  // -------------------------------------------------------------------------

  describe('initial wave element state', () => {
    test('wave element starts with a scale(0) transform (invisible until animation runs)', () => {
      const el = createElement()
      wave(CENTER, el, opts())
      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement
      expect(waveEl.style.transform).toContain('scale(0)')
    })

    test('wave element starts with `initialOpacity`', () => {
      const el = createElement()
      wave(CENTER, el, opts({ initialOpacity: 0.42 }))
      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement
      expect(waveEl.style.opacity).toBe('0.42')
    })

    test('wave element background is set to `color` option', () => {
      const el = createElement()
      wave(CENTER, el, opts({ color: 'red' }))
      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement
      expect(waveEl.style.background).toBe('red')
    })
  })

  // -------------------------------------------------------------------------
  // cancellationPeriod behavior
  // -------------------------------------------------------------------------

  describe('cancellationPeriod', () => {
    test('`pointercancel` during the cancellation period removes the wave element', () => {
      const el = createElement()
      const o = opts({ cancellationPeriod: 75 })
      wave(CENTER, el, o)

      // Dispatch before the cancellation period elapses
      document.dispatchEvent(new PointerEvent('pointercancel'))

      expect(getWaveContainer(el)).toBeNull()
    })

    test('`pointercancel` during the cancellation period clears the pending timeout (no late animation)', () => {
      const el = createElement()
      const o = opts({ cancellationPeriod: 75 })
      wave(CENTER, el, o)

      document.dispatchEvent(new PointerEvent('pointercancel'))

      // Even after the cancellation period would have elapsed, no container appears
      vi.advanceTimersByTime(200)
      expect(getWaveContainer(el)).toBeNull()
    })

    test('wave proceeds and animates after the cancellation period elapses without interruption', () => {
      const el = createElement()
      const o = opts({ cancellationPeriod: 75, finalOpacity: 0.1 })
      wave(CENTER, el, o)

      advancePastCancellationPeriod(o)

      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement
      expect(waveEl.style.transform).toContain('scale(1)')
    })
  })

  // -------------------------------------------------------------------------
  // Animation state after cancellation period
  // -------------------------------------------------------------------------

  describe('wave animation after cancellation period', () => {
    test('wave element transitions to scale(1) after cancellation period', () => {
      const el = createElement()
      const o = opts()
      wave(CENTER, el, o)
      advancePastCancellationPeriod(o)

      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement
      expect(waveEl.style.transform).toBe('translate(-50%,-50%) scale(1)')
    })

    test('wave element opacity becomes `finalOpacity` after cancellation period', () => {
      const el = createElement()
      const o = opts({ finalOpacity: 0.07 })
      wave(CENTER, el, o)
      advancePastCancellationPeriod(o)

      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement
      expect(waveEl.style.opacity).toBe('0.07')
    })

    test('wave element transition uses `easing` and `duration` options', () => {
      const el = createElement()
      const o = opts({ duration: 0.4, easing: 'ease-in' })
      wave(CENTER, el, o)

      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement
      expect(waveEl.style.transition).toContain('0.4s')
      expect(waveEl.style.transition).toContain('ease-in')
    })
  })

  // -------------------------------------------------------------------------
  // waitForRelease behavior
  // -------------------------------------------------------------------------

  describe('waitForRelease: false', () => {
    test('wave dissolves (opacity → 0) after `duration` without needing a pointer release', () => {
      const el = createElement()
      const o = opts({ waitForRelease: false })
      wave(CENTER, el, o)
      advancePastDuration(o)

      const container = getWaveContainer(el) as HTMLElement
      // The wave element should now have opacity 0 (dissolving)
      const waveEl = container.firstElementChild as HTMLElement
      expect(waveEl.style.opacity).toBe('0')
    })

    test('wave element is removed from the DOM after `duration + dissolveDuration`', () => {
      const el = createElement()
      const o = opts({ waitForRelease: false })
      wave(CENTER, el, o)
      advancePastDissolve(o)

      expect(getWaveContainer(el)).toBeNull()
    })
  })

  describe('waitForRelease: true', () => {
    test('wave does NOT dissolve after `duration` without a pointer release', () => {
      const el = createElement()
      const o = opts({ waitForRelease: true })
      wave(CENTER, el, o)
      advancePastDuration(o)

      // Container still present; wave element still has non-zero opacity
      const container = getWaveContainer(el)
      expect(container).not.toBeNull()
      const waveEl = container?.firstElementChild as HTMLElement
      expect(waveEl.style.opacity).not.toBe('0')
    })

    test('wave dissolves after `duration` IF pointer is released before duration ends', () => {
      const el = createElement()
      const o = opts({ waitForRelease: true })
      wave(CENTER, el, o)

      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement

      // Release the pointer before the duration elapses
      advancePastCancellationPeriod(o)
      document.dispatchEvent(new PointerEvent('pointerup'))
      advancePastDuration(o)

      expect(waveEl.style.opacity).toBe('0')
    })

    test('`pointerup` after duration triggers dissolve', () => {
      const el = createElement()
      const o = opts({ waitForRelease: true })
      wave(CENTER, el, o)

      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement

      // Let the animation run through duration first
      advancePastDuration(o)

      // Now release
      document.dispatchEvent(new PointerEvent('pointerup'))

      expect(waveEl.style.opacity).toBe('0')
    })

    test('`pointercancel` (post-animation) also triggers dissolve', () => {
      const el = createElement()
      const o = opts({ waitForRelease: true })
      wave(CENTER, el, o)

      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement

      advancePastDuration(o)
      document.dispatchEvent(new PointerEvent('pointercancel'))

      expect(waveEl.style.opacity).toBe('0')
    })
  })

  // -------------------------------------------------------------------------
  // Dissolve animation
  // -------------------------------------------------------------------------

  describe('dissolve animation', () => {
    test('dissolve transition duration is governed by `dissolveDuration`', () => {
      const el = createElement()
      const o = opts({ waitForRelease: false, dissolveDuration: 0.3 })
      wave(CENTER, el, o)
      advancePastDuration(o)

      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement
      expect(waveEl.style.transition).toContain('0.3s')
      expect(waveEl.style.transition).toContain('linear')
    })

    test('wave element opacity transitions to 0 during dissolve', () => {
      const el = createElement()
      const o = opts({ waitForRelease: false })
      wave(CENTER, el, o)
      advancePastDuration(o)

      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement
      expect(waveEl.style.opacity).toBe('0')
    })
  })

  // -------------------------------------------------------------------------
  // Cleanup / teardown
  // -------------------------------------------------------------------------

  describe('cleanup after wave completes', () => {
    test('wave element is removed from the DOM once dissolve finishes', () => {
      const el = createElement()
      const o = opts({ waitForRelease: false })
      wave(CENTER, el, o)

      const container = getWaveContainer(el) as HTMLElement
      advancePastDissolve(o)

      expect(container.children.length).toBe(0)
    })

    test('wave container is removed from element once all waves have finished', () => {
      const el = createElement()
      const o = opts({ waitForRelease: false })
      wave(CENTER, el, o)
      advancePastDissolve(o)

      expect(getWaveContainer(el)).toBeNull()
    })

    test("parent element's position is restored after the wave finishes", () => {
      const el = createElement()
      el.style.position = 'static'
      const o = opts({ waitForRelease: false })
      wave(CENTER, el, o)

      expect(el.style.position).toBe('relative') // changed during wave

      advancePastDissolve(o)

      expect(el.style.position).toBe('static') // restored
    })
  })

  // -------------------------------------------------------------------------
  // Multiple simultaneous waves
  // -------------------------------------------------------------------------

  describe('multiple simultaneous waves', () => {
    test('two waves on the same element share a single container', () => {
      const el = createElement()
      wave(CENTER, el, opts())
      wave(CENTER, el, opts())

      expect(el.querySelectorAll('[data-v-wave-container-internal]').length).toBe(1)
    })

    test('container stays in the DOM until ALL waves have finished dissolving', () => {
      const el = createElement()
      const short = opts({ waitForRelease: false, duration: 0.1 })
      const long = opts({ waitForRelease: false, duration: 0.5 })

      wave(CENTER, el, short)
      wave(CENTER, el, long)

      const container = getWaveContainer(el) as HTMLElement

      expect(container.children.length).toBe(2)

      // Advance past the short wave's full lifecycle (duration + dissolveDuration)
      advancePastDissolve(short)

      // Short wave has finished, but the long wave is still active — container must remain
      expect(getWaveContainer(el)).not.toBeNull()
      expect(container.children.length).toBe(1)

      // Advance the remaining time for the long wave to also complete
      vi.advanceTimersByTime((long.duration - short.duration) * 1000)
      expect(getWaveContainer(el)).toBeNull()
    })
  })
})
