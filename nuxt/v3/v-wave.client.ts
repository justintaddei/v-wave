import vWave, { type IVWavePluginOptions } from 'v-wave'

export const options: Partial<IVWavePluginOptions> = {
    // Place any global v-wave options here
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vWave, options)
})
