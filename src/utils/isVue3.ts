import * as _vue from 'vue'

interface Vue2 {
  default: {
    version: string
  }
}

// Make copy to prevent import warning in Vue 2
const vue = { ..._vue } as Vue2 | typeof _vue

const { version } = 'version' in vue ? vue : vue.default

const isVue3 = version[0] === '3'

export { isVue3 }
