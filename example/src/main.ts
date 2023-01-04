import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import DemoUiLib from '@hoha-ui-lib/hoha-ui-lib'

const env = import.meta.env
console.log(env)

const app = createApp(App)
app.use(ElementPlus)
app.use(DemoUiLib)
app.mount('#app')
