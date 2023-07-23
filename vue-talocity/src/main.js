import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './index.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import Vue3TouchEvents from 'vue3-touch-events'
import * as labs from 'vuetify/labs/components'
import axios from 'axios'
import VueAxios from 'vue-axios'

const vuetify = createVuetify({
  ssr: true,
  components: {
    ...labs,
    ...components
  },
  directives,
  defaults: {
    VDataTable: {
      fixedHeader: true,
      noDataText: 'Results not found'
    }
  }
})

const pinia = createPinia()

const app = createApp(App)

app.use(pinia).use(router).use(vuetify).use(Vue3TouchEvents).use(VueAxios, axios)

app.mount('#app')
