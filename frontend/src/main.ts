import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'flowbite'

import { createPinia } from 'pinia'
import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'
import { createI18n } from 'vue-i18n'

import messages from './messages.json'

const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n({
    messages: messages,
    locale: 'de',
    fallbackLocale: 'en',
})

setConfig('resourceFetcher', frappeRequest)

app.use(i18n)
app.use(pinia)
app.use(router)
app.use(resourcesPlugin)

app.component('Button', Button)
app.mount('#app')
