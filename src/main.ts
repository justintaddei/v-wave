import 'prismjs/themes/prism-tomorrow.css'
import VWave from 'v-wave'
import { createApp } from 'vue'
import VueLive from 'vue-live'
import 'vue-live/lib/vue-live.esm.css'
import App from './App.vue'

const app = createApp(App)

app.use(VueLive).use(VWave)

app.mount('#app')
