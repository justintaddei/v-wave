import VWave from 'v-wave'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((app) => {
  const options = useRuntimeConfig().public.vWave
  
  const directive = options.directive || 'wave'

  const { vWave, vWaveTrigger } = VWave.createLocalWaveDirective(options, app.vueApp)

  app.vueApp.directive(directive, {
    ...vWave,
    getSSRProps() {
      return {}
    }
  })

  app.vueApp.directive(`${directive}-trigger`, {
    ...vWaveTrigger,
    getSSRProps() {
      return {}
    }
  })
})
