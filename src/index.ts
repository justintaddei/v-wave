import { PluginObject } from 'vue/types/plugin'
import { DEFAULT_PLUGIN_OPTIONS, IVWaveDirectiveOptions, IVWavePluginOptions } from './options'
import { wave } from './v-wave'

const optionMap = new WeakMap<HTMLElement, Partial<IVWaveDirectiveOptions>>()

const VWave = {
  install(Vue, globalUserOptions = {}) {
    if (this.installed) return
    this.installed = true

    const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS, ...globalUserOptions }

    Vue.directive(globalOptions.directive, {
      inserted(el, { value }) {
        optionMap.set(el, value ?? {})

        el.addEventListener('pointerdown', (event) => {
          wave(event, el, {
            ...globalOptions,
            ...optionMap.get(el)!
          })
        })
      },
      update(el, { value }) {
        optionMap.set(el, value ?? {})
      }
    })
  }
} as PluginObject<Partial<IVWavePluginOptions>>

if (typeof window !== 'undefined' && (window as any).Vue) {
  ;(window as any).Vue.use(VWave)
}

export default VWave
