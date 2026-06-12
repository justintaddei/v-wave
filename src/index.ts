import type { App, Directive } from 'vue'
import {
  DEFAULT_PLUGIN_OPTIONS,
  type IVWaveDirectiveOptions,
  type IVWavePluginOptions,
  type VWaveTrigger,
} from './options'
import type { Vector } from './types'
import { getHooks } from './utils/hookKeys'
import { markWaveBoundary } from './utils/markWaveBoundary'
import { triggerIsController } from './utils/triggerIsController'
import { triggerIsID } from './utils/triggerIsID'
import { wave } from './wave'

const optionMap = new WeakMap<HTMLElement, Partial<IVWaveDirectiveOptions>>()

interface VWaveInstallObject {
  install: (app: any, globalUserOptions: Partial<IVWavePluginOptions>) => void
  installed: boolean
}

interface DirectiveList {
  wave: Directive
  vWave: Directive
  waveTrigger: Directive
  vWaveTrigger: Directive
}

const createWaveActivationHandler =
  (globalOptions: IVWaveDirectiveOptions, el: HTMLElement) =>
  (event: PointerEvent | MouseEvent | Vector, position?: Vector) => {
    if (!optionMap.has(el)) return

    const options = { ...globalOptions, ...optionMap.get(el) }

    const activate = () =>
      wave(position ?? event, el, { ...options, waitForRelease: position ? false : options.waitForRelease })

    if (options.stopPropagation && 'stopPropagation' in event) event.stopPropagation()

    if (options.trigger === false) return activate()

    if (triggerIsID(options.trigger)) return
    const trigger = el.querySelector('[data-v-wave-trigger="true"]')
    if (!trigger && options.trigger === true) return
    if (trigger && 'composedPath' in event && !event.composedPath().includes(trigger)) return

    activate()
  }

/**
 * Returns a `VWaveTrigger` object that can be passed as the `trigger` option.
 * When a programmatic trigger is used, v-wave stops listening for pointer events entirely.
 * Use this if you need a wave to trigger as the result of some other action,
 * or an event other than `pointerdown`.
 *
 * Because `MouseEvent`s and `PointerEvent`s have `x` and `y` properties, you can
 * pass the event directly to `trigger.press()`.
 *
 * @example
 * ```js
 * import wave from 'v-wave'
 *
 * const trigger = wave.createTrigger()
 * // <button v-wave="{ trigger }">
 *
 * trigger.press(event) // wave from the event's position
 * trigger.press()      // wave from the center of the element
 * trigger.release()    // dissolve the wave (when waitForRelease: true)
 * trigger.cancel()     // cancel the wave immediately
 * ```
 *
 * @remarks
 * You must call `createTrigger()` once per element. A single trigger cannot be
 * shared across multiple elements.
 *
 * @see [createTrigger documentation](https://github.com/justintaddei/v-wave#programmatic-control)
 */
const createTrigger = (): VWaveTrigger => {
  let pressCb: VWaveTrigger['press'] = () => {}
  let cancelCb: VWaveTrigger['cancel'] = () => {}
  let releaseCb: VWaveTrigger['release'] = () => {}

  return {
    _set_press: (cb: (position?: Vector) => void) => (pressCb = cb),
    _set_cancel: (cb: () => void) => (cancelCb = cb),
    _set_release: (cb: () => void) => (releaseCb = cb),
    press: (position: Vector) => pressCb(position),
    cancel: () => cancelCb(),
    release: () => releaseCb(),
  } as VWaveTrigger
}

const createDirective = (
  globalUserOptions: Partial<IVWaveDirectiveOptions> = {},
  app: App | 'vue2' | 'vue3' = 'vue3'
): DirectiveList => {
  const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS, ...globalUserOptions }

  const hooks = getHooks(app)

  const handleTrigger = (event: PointerEvent | MouseEvent) => {
    if (event.detail !== 0) return

    const triggerEl = event.currentTarget as HTMLElement
    const trigger = triggerEl.dataset.vWaveTrigger

    const associatedElements = document.querySelectorAll(
      `[data-v-wave-boundary="${trigger}"]`
    ) as NodeListOf<HTMLElement>

    associatedElements.forEach((el) => {
      const isSyntheticClick = event.type === 'click'

      let origin: Vector

      if (isSyntheticClick) {
        const rect = triggerEl.getBoundingClientRect()

        origin = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      } else {
        origin = event
      }

      const options = { ...globalOptions, ...optionMap.get(el) }
      wave(origin, el, { ...options, waitForRelease: isSyntheticClick ? false : options.waitForRelease })
    })
  }

  const waveDirective: Directive<HTMLElement, Partial<IVWaveDirectiveOptions>> = {
    [hooks.mounted](el, { value = {} }) {
      optionMap.set(el, value)

      const trigger = value?.trigger ?? globalOptions.trigger

      const activationHandler = createWaveActivationHandler(globalOptions, el)

      if (triggerIsController(trigger)) {
        return trigger._set_press((position) => {
          if (position) return activationHandler(position)

          const rect = el.getBoundingClientRect()

          const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          }

          activationHandler(center)
        })
      }

      markWaveBoundary(el, trigger)

      el.addEventListener('pointerdown', activationHandler)
      el.addEventListener('click', (event) => {
        if (event.detail !== 0) return

        const rect = el.getBoundingClientRect()

        const center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }

        activationHandler(event, center)
      })
    },
    [hooks.updated](el, { value = {} }) {
      optionMap.set(el, value)
      markWaveBoundary(el, value?.trigger ?? globalOptions.trigger)
    },
  }

  const triggerDirective: Directive<HTMLElement> = {
    [hooks.mounted](el, { arg: trigger = 'true' }) {
      el.dataset.vWaveTrigger = trigger

      if (trigger !== 'true') {
        el.addEventListener('pointerdown', handleTrigger)
        el.addEventListener('click', handleTrigger)
      }
    },

    [hooks.updated](el, { arg: trigger = 'true' }) {
      el.dataset.vWaveTrigger = trigger

      if (trigger === 'true') {
        el.removeEventListener('pointerdown', handleTrigger)
        el.removeEventListener('click', handleTrigger)
      } else {
        el.addEventListener('pointerdown', handleTrigger)
        el.addEventListener('click', handleTrigger)
      }
    },
  }

  return {
    wave: waveDirective,
    vWave: waveDirective,
    waveTrigger: triggerDirective,
    vWaveTrigger: triggerDirective,
  }
}

const VWave: VWaveInstallObject & {
  createLocalWaveDirective: typeof createDirective
  createTrigger: typeof createTrigger
} = {
  install(app: App, globalUserOptions = {}) {
    if (this.installed) return
    this.installed = true

    const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS, ...globalUserOptions }

    const { vWave, vWaveTrigger } = createDirective(globalOptions, app)

    app.directive(globalOptions.directive, vWave)

    app.directive(`${globalOptions.directive}-trigger`, vWaveTrigger)
  },
  installed: false,
  createLocalWaveDirective: createDirective,
  createTrigger: createTrigger,
}

export default VWave
export type { IVWaveDirectiveOptions, IVWavePluginOptions }
