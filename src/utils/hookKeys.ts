import { isVue3 } from './isVue3'

const hooks = {
  mounted: isVue3 ? 'mounted' : 'inserted',
  updated: isVue3 ? 'updated' : 'componentUpdated'
}

export { hooks }
