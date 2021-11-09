import { DEFAULT_PLUGIN_OPTIONS, IVWaveDirectiveOptions, IVWavePluginOptions } from 'src/options'
import { getHooks } from 'src/utils/hookKeys'
import { wave } from 'src/wave'
import { App } from 'vue'

const optionMap = new WeakMap<HTMLElement, Partial<IVWaveDirectiveOptions> | false>()

interface VWaveInstallObject {
  install: (app: any, globalUserOptions: Partial<IVWavePluginOptions>) => void
  installed: boolean
}

const VWave: VWaveInstallObject = {
  install(app: App, globalUserOptions = {}) {
    if (this.installed) return
    this.installed = true

    const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS, ...globalUserOptions }

    const hooks = getHooks(app)

    app.directive(globalOptions.directive, {
      [hooks.mounted](el: HTMLElement, { value }: any) {
        optionMap.set(el, value ?? {})

        el.addEventListener('pointerdown', (event) => {
          const options = optionMap.get(el)!

          if (options === false) return

          wave(event, el, {
            ...globalOptions,
            ...options
          })
        })
      },
      [hooks.updated](el: HTMLElement, { value }: any) {
        optionMap.set(el, value ?? {})
      }
    })
  },
  installed: false
}

export default VWave
