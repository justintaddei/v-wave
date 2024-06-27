import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { IVWavePluginOptions } from '../src/options'

type ModuleOptions = Partial<IVWavePluginOptions>

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'v-wave',
    configKey: 'vWave',
    compatibility: {
      nuxt: '>=3.0.0',
      bridge: true
    }
  },
  defaults: {
    directive: "wave"
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.vWave = options

    addPlugin(resolve('./runtime/plugin.ts'))
  }
})
