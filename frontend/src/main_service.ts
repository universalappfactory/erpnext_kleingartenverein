import './index.css'

import { createApp } from 'vue'
import router from './router_service'
import App from './AppService.vue'
import 'flowbite'
import { createPinia } from 'pinia'

import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'

const pinia = createPinia()
const app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(pinia)
app.use(router)
app.use(resourcesPlugin)

app.component('Button', Button)
app.mount('#app')
