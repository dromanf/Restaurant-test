// src/main.ts (Verifica que Pinia esté configurado)

import { createApp } from 'vue'
import { createPinia } from 'pinia' // 👈 Importar
import App from './App.vue'
import './style.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
const pinia = createPinia() // 👈 Crear instancia

const vuetify = createVuetify({
  components,
  directives,
})

app.use(pinia) // 👈 Usar Pinia
app.use(vuetify)
app.mount('#app')