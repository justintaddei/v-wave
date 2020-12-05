import { Plugin } from 'vue'
import { DEFAULT_PLUGIN_OPTIONS, IVWaveDirectiveOptions, IVWavePluginOptions } from './options'
import { wave } from './v-wave'

const optionMap = new WeakMap<HTMLElement, Partial<IVWaveDirectiveOptions>>()

const VWave = {
  install(app, globalUserOptions: Partial<IVWavePluginOptions> = {}) {
    if (this.installed) return
    this.installed = true

    const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS, ...globalUserOptions }

    app.directive(globalOptions.directive, {
      mounted(el, { value }) {
        optionMap.set(el, value ?? {})

        el.addEventListener('pointerdown', (event) => {
          wave(event, el, {
            ...globalOptions,
            ...optionMap.get(el)!
          })
        })
      },
      updated(el, { value }) {
        optionMap.set(el, value ?? {})
      }
    })
  }
} as Plugin & { installed: boolean }

if (typeof window !== 'undefined' && (window as any).Vue) {
  ;(window as any).Vue.use(VWave)
}

export default VWave
