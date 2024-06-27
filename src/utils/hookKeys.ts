import type { App } from 'vue'
import { isVue3 } from './isVue3'

const getHooks = (app: App | 'vue2' | 'vue3') => {
  let vue3: boolean

  if (app === 'vue2') vue3 = false
  else if (app === 'vue3') vue3 = true
  else vue3 = isVue3(app)

  return vue3
    ? {
        mounted: 'mounted',
        updated: 'updated',
      }
    : {
        mounted: 'inserted',
        updated: 'componentUpdated',
      }
}

export { getHooks }
