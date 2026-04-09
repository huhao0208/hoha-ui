// Components entry point
export { default as HoButton } from './button/index.vue'
export { default as HoInput } from './input/index.vue'
export { default as HoIcon } from './icon/index.vue'
export { default as HoModal } from './modal/index.vue'

// Functional components
export { message, default as HoMessage } from './message'
export { toast, default as HoToast } from './toast'

// Types
export type { MessageType, MessageOptions, MessageInstance } from './message'
export type { ToastType, ToastPosition, ToastOptions, ToastInstance } from './toast'

// Install function for Vue.use()
import type { App } from 'vue'
import HoButton from './button/index.vue'
import HoInput from './input/index.vue'
import HoIcon from './icon/index.vue'
import HoModal from './modal/index.vue'
import { message as messageApi } from './message'
import { toast as toastApi } from './toast'

const components = [HoButton, HoInput, HoIcon, HoModal]

export default {
  install(app: App) {
    // Register components
    components.forEach((component) => {
      if (component && component.name) {
        app.component(component.name, component)
      }
    })
    
    // Register global APIs
    app.config.globalProperties.$message = messageApi
    app.config.globalProperties.$toast = toastApi
    
    // Provide for Composition API
    app.provide('$message', messageApi)
    app.provide('$toast', toastApi)
  }
}
