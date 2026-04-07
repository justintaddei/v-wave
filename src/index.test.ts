import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import VWave from './index'
import type { IVWaveDirectiveOptions } from './options'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal Vue app mock sufficient for install(). */
function createMockApp() {
  const directives: Record<string, unknown> = {}
  return {
    directive: vi.fn((name: string, def: unknown) => {
      directives[name] = def
    }),
    directives,
    // Enough surface area for isVue3() to recognize this as a Vue 3 app
    version: '3.0.0',
    config: {},
  }
}

/**
 * Invoke the `mounted` hook on a directive definition as Vue would,
 * returning the element so callers can query it.
 */
function mount(
  directive: Record<string, (...args: unknown[]) => unknown>,
  el: HTMLElement,
  value: Partial<IVWaveDirectiveOptions> = {},
  arg?: string
) {
  directive.mounted?.(el, { value, arg })
  return el
}

function update(
  directive: Record<string, (...args: unknown[]) => unknown>,
  el: HTMLElement,
  value: Partial<IVWaveDirectiveOptions> = {},
  arg?: string
) {
  directive.updated?.(el, { value, arg })
  return el
}

/** Creates a button attached to document.body with a stubbed bounding rect. */
function createElement(rect: Partial<DOMRect> = {}): HTMLButtonElement {
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
    ...rect,
  } as DOMRect)
  document.body.appendChild(el)
  return el
}

function getWaveContainer(el: HTMLElement) {
  return el.querySelector('[data-v-wave-container-internal]')
}

function firePointerDown(el: HTMLElement, x = 50, y = 50) {
  el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: x, clientY: y }))
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    cb(0)
    return 0
  })
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  )

  // Reset the installed flag so each test gets a clean install
  VWave.installed = false
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  document.body.innerHTML = ''
  VWave.installed = false
})

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('VWave plugin', () => {
  // -------------------------------------------------------------------------
  // install()
  // -------------------------------------------------------------------------

  describe('install()', () => {
    test('registers the "wave" and "wave-trigger" directives on the app', () => {
      const app = createMockApp()
      VWave.install(app, {})

      expect(app.directive).toHaveBeenCalledWith('wave', expect.anything())
      expect(app.directive).toHaveBeenCalledWith('wave-trigger', expect.anything())
    })

    test('uses the `directive` option to customize the directive name', () => {
      const app = createMockApp()
      VWave.install(app, { directive: 'ripple' })

      expect(app.directive).toHaveBeenCalledWith('ripple', expect.anything())
      expect(app.directive).toHaveBeenCalledWith('ripple-trigger', expect.anything())
    })

    test('does not register directives a second time when called twice', () => {
      const app = createMockApp()
      VWave.install(app, {})
      VWave.install(app, {})

      expect(app.directive).toHaveBeenCalledTimes(2)
    })
  })

  // -------------------------------------------------------------------------
  // createLocalWaveDirective
  // -------------------------------------------------------------------------

  describe('createLocalWaveDirective()', () => {
    test('returns wave, vWave, waveTrigger, vWaveTrigger directives', () => {
      const result = VWave.createLocalWaveDirective({}, 'vue3')

      expect(result).toHaveProperty('wave')
      expect(result).toHaveProperty('vWave')
      expect(result).toHaveProperty('waveTrigger')
      expect(result).toHaveProperty('vWaveTrigger')
    })

    test('wave and vWave are the same object', () => {
      const { wave, vWave } = VWave.createLocalWaveDirective({}, 'vue3')
      expect(wave).toBe(vWave)
    })

    test('waveTrigger and vWaveTrigger are the same object', () => {
      const { waveTrigger, vWaveTrigger } = VWave.createLocalWaveDirective({}, 'vue3')
      expect(waveTrigger).toBe(vWaveTrigger)
    })
  })
})

describe('wave directive', () => {
  function makeDirective(globalOpts: Partial<IVWaveDirectiveOptions> = {}) {
    return VWave.createLocalWaveDirective(globalOpts, 'vue3').wave as Record<string, (...args: unknown[]) => unknown>
  }

  // -------------------------------------------------------------------------
  // mounted hook
  // -------------------------------------------------------------------------

  describe('mounted', () => {
    test('marks the wave boundary on the element', () => {
      const d = makeDirective()
      const el = createElement()
      mount(d, el)

      expect(el.dataset.vWaveBoundary).toBe('true')
    })

    test('uses an ID trigger to mark the boundary when trigger option is a string ID', () => {
      const d = makeDirective()
      const el = createElement()
      mount(d, el, { trigger: 'my-id' })

      expect(el.dataset.vWaveBoundary).toBe('my-id')
    })

    test('pointerdown on the element creates a wave container', () => {
      const d = makeDirective({ cancellationPeriod: 0 })
      const el = createElement()
      mount(d, el)
      firePointerDown(el)

      expect(getWaveContainer(el)).not.toBeNull()
    })

    test('synthetic click (detail === 0) triggers a wave from the center of the element', () => {
      // The click handler computes the element's center and passes it as the wave origin.
      // el rect: top:0, left:0, width:100, height:100 → center: { x: 50, y: 50 }
      const d = makeDirective({ cancellationPeriod: 0 })
      const el = createElement()
      mount(d, el)

      el.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }))

      // Wave element position is relative to el (top:0, left:0), so should be at (50, 50)
      const waveEl = getWaveContainer(el)?.firstElementChild as HTMLElement
      expect(waveEl.style.left).toBe('50px')
      expect(waveEl.style.top).toBe('50px')
    })

    test('real click (detail > 0) does NOT trigger a wave', () => {
      const d = makeDirective({ cancellationPeriod: 0 })
      const el = createElement()
      mount(d, el)

      el.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }))

      expect(getWaveContainer(el)).toBeNull()
    })
  })

  // -------------------------------------------------------------------------
  // updated hook
  // -------------------------------------------------------------------------

  describe('updated', () => {
    test('updating with a new trigger option re-marks the boundary', () => {
      const d = makeDirective()
      const el = createElement()
      mount(d, el, { trigger: 'auto' })
      expect(el.dataset.vWaveBoundary).toBe('true')

      update(d, el, { trigger: 'new-id' })
      expect(el.dataset.vWaveBoundary).toBe('new-id')
    })

    test('falls back to globalOptions.trigger when updated value has no trigger', () => {
      // value?.trigger is undefined → falls back to globalOptions.trigger ('my-global-id')
      const d = makeDirective({ trigger: 'my-global-id' })
      const el = createElement()
      mount(d, el, { trigger: 'old-id' })
      expect(el.dataset.vWaveBoundary).toBe('old-id')

      update(d, el, {}) // no trigger in value
      expect(el.dataset.vWaveBoundary).toBe('my-global-id')
    })
  })

  // -------------------------------------------------------------------------
  // stopPropagation option
  // -------------------------------------------------------------------------

  describe('stopPropagation', () => {
    test('does not stop propagation by default', () => {
      const d = makeDirective({ cancellationPeriod: 0 })
      const el = createElement()
      mount(d, el)

      const parent = document.createElement('div')
      const parentHandler = vi.fn()
      parent.addEventListener('pointerdown', parentHandler)
      parent.appendChild(el)
      document.body.appendChild(parent)

      firePointerDown(el)
      expect(parentHandler).toHaveBeenCalledTimes(1)
    })

    test('stops propagation when `stopPropagation: true`', () => {
      const d = makeDirective({ cancellationPeriod: 0 })
      const el = createElement()
      mount(d, el, { stopPropagation: true })

      const parent = document.createElement('div')
      const parentHandler = vi.fn()
      parent.addEventListener('pointerdown', parentHandler)
      parent.appendChild(el)
      document.body.appendChild(parent)

      firePointerDown(el)
      expect(parentHandler).not.toHaveBeenCalled()
    })
  })

  // -------------------------------------------------------------------------
  // trigger option — non-ID modes
  // -------------------------------------------------------------------------

  describe('trigger option', () => {
    test('trigger: false — wave fires even when a v-wave-trigger descendant is present', () => {
      const d = makeDirective({ cancellationPeriod: 0 })
      const el = createElement()
      mount(d, el, { trigger: false })

      const trigger = document.createElement('span')
      trigger.dataset.vWaveTrigger = 'true'
      el.appendChild(trigger)

      firePointerDown(el)
      expect(getWaveContainer(el)).not.toBeNull()
    })

    test('trigger: true — wave does NOT fire when clicking outside the trigger', () => {
      const d = makeDirective({ cancellationPeriod: 0 })
      const el = createElement()

      const trigger = document.createElement('span')
      trigger.dataset.vWaveTrigger = 'true'
      el.appendChild(trigger)

      mount(d, el, { trigger: true })

      // Dispatch on el, not on the trigger — composedPath won't include trigger
      firePointerDown(el)
      expect(getWaveContainer(el)).toBeNull()
    })

    test('trigger: true — wave fires when clicking directly on the trigger', () => {
      const d = makeDirective({ cancellationPeriod: 0 })
      const el = createElement()

      const trigger = document.createElement('span')
      trigger.dataset.vWaveTrigger = 'true'
      el.appendChild(trigger)
      vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
        top: 0,
        left: 0,
        right: 20,
        bottom: 20,
        width: 20,
        height: 20,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect)

      mount(d, el, { trigger: true })

      trigger.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          clientX: 10,
          clientY: 10,
        })
      )
      expect(getWaveContainer(el)).not.toBeNull()
    })

    test('trigger: string ID — direct pointerdown on the wave element does NOT fire a wave', () => {
      // When trigger is an ID, waves are fired exclusively by the trigger directive.
      // A direct pointerdown on the wave element itself must be ignored.
      const d = makeDirective({ cancellationPeriod: 0 })
      const el = createElement()
      mount(d, el, { trigger: 'my-id' })

      firePointerDown(el)
      expect(getWaveContainer(el)).toBeNull()
    })

    test('trigger: true — wave does NOT fire when no trigger descendant exists', () => {
      // trigger: true requires a trigger element; if none is present no wave should appear.
      const d = makeDirective({ cancellationPeriod: 0 })
      const el = createElement()
      mount(d, el, { trigger: true })

      firePointerDown(el)
      expect(getWaveContainer(el)).toBeNull()
    })

    test('trigger: "auto" — wave fires normally when no trigger element is present', () => {
      const d = makeDirective({ cancellationPeriod: 0 })
      const el = createElement()
      mount(d, el, { trigger: 'auto' })

      firePointerDown(el)
      expect(getWaveContainer(el)).not.toBeNull()
    })

    test('trigger: "auto" — wave requires trigger click when a trigger element is present', () => {
      const d = makeDirective({ cancellationPeriod: 0 })
      const el = createElement()

      const trigger = document.createElement('span')
      trigger.dataset.vWaveTrigger = 'true'
      el.appendChild(trigger)

      mount(d, el, { trigger: 'auto' })

      // Click on el body (not the trigger)
      firePointerDown(el)
      expect(getWaveContainer(el)).toBeNull()
    })
  })
})

describe('wave-trigger directive', () => {
  function makeDirectives(globalOpts: Partial<IVWaveDirectiveOptions> = {}) {
    const result = VWave.createLocalWaveDirective(globalOpts, 'vue3')
    return {
      wave: result.wave as Record<string, (...args: unknown[]) => unknown>,
      trigger: result.waveTrigger as Record<string, (...args: unknown[]) => unknown>,
    }
  }

  // -------------------------------------------------------------------------
  // mounted hook
  // -------------------------------------------------------------------------

  describe('mounted', () => {
    test('sets dataset.vWaveTrigger to "true" by default', () => {
      const { trigger } = makeDirectives()
      const el = createElement()
      el.dataset.vWaveTrigger = undefined as unknown as string
      trigger.mounted?.(el, { arg: undefined })

      expect(el.dataset.vWaveTrigger).toBe('true')
    })

    test('sets dataset.vWaveTrigger to the given arg', () => {
      const { trigger } = makeDirectives()
      const el = createElement()
      trigger.mounted?.(el, { arg: 'my-id' })

      expect(el.dataset.vWaveTrigger).toBe('my-id')
    })

    test('trigger with an ID fires wave on associated v-wave element', () => {
      const { wave: waveDir, trigger: triggerDir } = makeDirectives({
        cancellationPeriod: 0,
      })

      // Set up the v-wave element with a boundary matching the trigger ID
      const waveEl = createElement()
      mount(waveDir, waveEl, { trigger: 'btn-id' })

      // Set up the trigger element
      const triggerEl = document.createElement('button')
      document.body.appendChild(triggerEl)
      triggerDir.mounted?.(triggerEl, { arg: 'btn-id' })

      triggerEl.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          clientX: 50,
          clientY: 50,
        })
      )

      expect(getWaveContainer(waveEl)).not.toBeNull()
    })

    test('trigger with ID: synthetic click uses center of trigger as wave origin', () => {
      const { wave: waveDir, trigger: triggerDir } = makeDirectives({
        cancellationPeriod: 0,
      })

      // waveEl rect top: 0, left: 0 (from createElement default)
      const waveEl = createElement()
      mount(waveDir, waveEl, { trigger: 'btn-id' })

      const triggerEl = document.createElement('button')
      // Trigger center = { x: 10 + 20/2, y: 10 + 20/2 } = { x: 20, y: 20 }
      vi.spyOn(triggerEl, 'getBoundingClientRect').mockReturnValue({
        top: 10,
        left: 10,
        right: 30,
        bottom: 30,
        width: 20,
        height: 20,
        x: 10,
        y: 10,
        toJSON: () => ({}),
      } as DOMRect)
      document.body.appendChild(triggerEl)
      triggerDir.mounted?.(triggerEl, { arg: 'btn-id' })

      // detail === 0 → synthetic click; origin should be center of triggerEl
      triggerEl.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }))

      // relative to waveEl (top:0, left:0): x=20, y=20
      const waveElChild = getWaveContainer(waveEl)?.firstElementChild as HTMLElement
      expect(waveElChild.style.left).toBe('20px')
      expect(waveElChild.style.top).toBe('20px')
    })

    test('trigger with ID: real click (detail > 0) does NOT fire wave', () => {
      const { wave: waveDir, trigger: triggerDir } = makeDirectives({
        cancellationPeriod: 0,
      })

      const waveEl = createElement()
      mount(waveDir, waveEl, { trigger: 'btn-id' })

      const triggerEl = document.createElement('button')
      document.body.appendChild(triggerEl)
      triggerDir.mounted?.(triggerEl, { arg: 'btn-id' })

      triggerEl.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }))

      expect(getWaveContainer(waveEl)).toBeNull()
    })
  })

  // -------------------------------------------------------------------------
  // updated hook
  // -------------------------------------------------------------------------

  describe('updated', () => {
    test('updated to a non-"true" arg registers event listeners', () => {
      const { wave: waveDir, trigger: triggerDir } = makeDirectives({
        cancellationPeriod: 0,
      })

      const waveEl = createElement()
      mount(waveDir, waveEl, { trigger: 'dyn-id' })

      const triggerEl = document.createElement('button')
      document.body.appendChild(triggerEl)
      // Mount with no ID first, then update to an ID
      triggerDir.mounted?.(triggerEl, { arg: undefined })
      triggerDir.updated?.(triggerEl, { arg: 'dyn-id' })

      triggerEl.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          clientX: 50,
          clientY: 50,
        })
      )
      expect(getWaveContainer(waveEl)).not.toBeNull()
    })

    test('updated back to "true" removes event listeners', () => {
      const { wave: waveDir, trigger: triggerDir } = makeDirectives({
        cancellationPeriod: 0,
      })

      const waveEl = createElement()
      mount(waveDir, waveEl, { trigger: 'dyn-id' })

      const triggerEl = document.createElement('button')
      document.body.appendChild(triggerEl)
      triggerDir.mounted?.(triggerEl, { arg: 'dyn-id' })
      // Update back to no-ID — listeners should be removed
      triggerDir.updated?.(triggerEl, { arg: undefined })

      triggerEl.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          clientX: 50,
          clientY: 50,
        })
      )
      expect(getWaveContainer(waveEl)).toBeNull()
    })
  })
})
