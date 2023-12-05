import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import pkg from '../package.json'
import { isNuxt2 } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'v-wave',
    version: pkg.version,
    configKey: 'vWave',
    compatibility: {
      nuxt: '^3.0.0 || ^2.16.0',
      bridge: true
    }
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    if (isNuxt2()) {
      nuxt.options.publicRuntimeConfig.vWave = options
    } else {

      nuxt.options.runtimeConfig.public.vWave = options
    }

    addPlugin(resolve('./plugin.js'))
  }
})
