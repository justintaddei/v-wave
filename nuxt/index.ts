import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { DEFAULT_PLUGIN_OPTIONS, type IVWavePluginOptions } from '../src/options'

type ModuleOptions = Partial<IVWavePluginOptions>

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'v-wave',
    configKey: 'vWave',
    compatibility: {
      nuxt: '>=3.0.0',
      bridge: true,
    },
  },
  defaults: {
    ...DEFAULT_PLUGIN_OPTIONS,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.vWave = options as unknown as typeof nuxt.options.runtimeConfig.public.vWave

    addPlugin(resolve('./runtime/plugin.ts'))
  },
})
