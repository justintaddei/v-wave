import VWave from 'v-wave'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((app) => {
  const options = useRuntimeConfig().public.vWave

  const { vWave, vWaveTrigger } = VWave.createLocalWaveDirective(options, app.vueApp)

  app.vueApp.directive(options.directive, {
    ...vWave,
    getSSRProps() {
      return {}
    },
  })

  app.vueApp.directive(`${options.directive}-trigger`, {
    ...vWaveTrigger,
    getSSRProps() {
      return {}
    },
  })
})
