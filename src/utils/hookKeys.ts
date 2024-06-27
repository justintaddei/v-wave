import type { App } from 'vue'
import { isVue3 } from './isVue3'

type v3Hooks = {
  mounted: 'mounted'
  updated: 'updated'
}

const getHooks = (app: App | 'vue2' | 'vue3'): v3Hooks => {
  let vue3: boolean

  if (app === 'vue2') vue3 = false
  else if (app === 'vue3') vue3 = true
  else vue3 = isVue3(app)

  return vue3
    ? {
        mounted: 'mounted',
        updated: 'updated',
      }
    : ({
        mounted: 'inserted',
        updated: 'componentUpdated',
      } as unknown as v3Hooks)
}

export { getHooks }
