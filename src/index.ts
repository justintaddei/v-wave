import { DEFAULT_PLUGIN_OPTIONS, IVWaveDirectiveOptions, IVWavePluginOptions } from 'src/options'
import { hooks } from 'src/utils/hookKeys'
import { wave } from 'src/v-wave'
import { Plugin } from 'vue'

const optionMap = new WeakMap<HTMLElement, Partial<IVWaveDirectiveOptions>>()

const VWave = {
  install(app, globalUserOptions: Partial<IVWavePluginOptions> = {}) {
    if (this.installed) return
    this.installed = true

    const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS, ...globalUserOptions }

    app.directive(globalOptions.directive, {
      [hooks.mounted](el: HTMLElement, { value }: any) {
        optionMap.set(el, value ?? {})

        el.addEventListener('pointerdown', (event) => {
          wave(event, el, {
            ...globalOptions,
            ...optionMap.get(el)!
          })
        })
      },
      [hooks.updated](el: HTMLElement, { value }: any) {
        optionMap.set(el, value ?? {})
      }
    })
  }
} as Plugin & { installed: boolean }

export default VWave
