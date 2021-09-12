import { createApp } from 'vue'
import Apps from './App.vue'

import { registerApp } from './global'

import 'element-plus/dist/index.css'

import router from './router'
import store from './store'

const app = createApp(Apps)
app.use(router).use(store).mount('#app')
registerApp(app)
