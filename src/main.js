// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import router from './router'

// Styles
import 'unfonts.css'
import './styles/settings.scss'

const app = createApp(App)
app.use(router)  

registerPlugins(app)

app.mount('#app')
