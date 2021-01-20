import VWave from 'v-wave'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(VWave)

app.mount('#app')
