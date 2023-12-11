import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import config from './meta.json'

export default defineNuxtModule({
  meta: config,
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.vWave = options

    addPlugin(resolve('./runtime/plugin.js'))
  }
})
