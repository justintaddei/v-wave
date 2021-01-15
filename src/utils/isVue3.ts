import { version } from 'vue'

const [vueMajorVersion] = version.split('.')

const isVue3 = vueMajorVersion === '3'

export { isVue3 }
