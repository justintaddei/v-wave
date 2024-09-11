import type { App, Directive } from 'vue'
import { DEFAULT_PLUGIN_OPTIONS, IVWaveDirectiveOptions, IVWavePluginOptions } from './options'
import type { Vector } from './types'
import { getHooks } from './utils/hookKeys'
import { markWaveBoundary } from './utils/markWaveBoundary'
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
  (globalOptions: IVWaveDirectiveOptions, el: HTMLElement) => (event: PointerEvent | MouseEvent, position?: Vector) => {
    if (!optionMap.has(el)) return

    const options = { ...globalOptions, ...optionMap.get(el) }

    if (options.stopPropagation) event.stopPropagation()

    if (options.trigger === false) return wave(event, el, options)

    if (triggerIsID(options.trigger)) return
    const trigger = el.querySelector('[data-v-wave-trigger="true"]')
    if (!trigger && options.trigger === true) return
    if (trigger && !event.composedPath().includes(trigger)) return

    wave(position ?? event, el, { ...options, waitForRelease: position ? false : options.waitForRelease })
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

      markWaveBoundary(el, value?.trigger ?? globalOptions.trigger)

      const activationHandler = createWaveActivationHandler(globalOptions, el)

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

const VWave: VWaveInstallObject & { createLocalWaveDirective: typeof createDirective } = {
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
}

export default VWave
export { IVWaveDirectiveOptions, IVWavePluginOptions }
