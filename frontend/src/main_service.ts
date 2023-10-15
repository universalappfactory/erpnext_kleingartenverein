import './index.css'

import { createApp } from 'vue'
import router from './router_service'
import App from './AppService.vue'
import 'flowbite'
import { createPinia } from 'pinia'
import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'
import { createI18n } from 'vue-i18n'
import messages from './messages_service.json'

const i18n = createI18n({
    messages: messages,
    locale: 'de',
    fallbackLocale: 'en',
})

const pinia = createPinia()
const app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(pinia)
app.use(router)
app.use(resourcesPlugin)
app.use(i18n)

app.component('Button', Button)
app.mount('#app')
