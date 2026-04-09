// Components entry point
export { default as HoButton } from './button/index.vue'
export { default as HoInput } from './input/index.vue'
export { default as HoIcon } from './icon/index.vue'
export { default as HoModal } from './modal/index.vue'

// Functional components
export { message, default as HoMessage } from './message'
export { toast, default as HoToast } from './toast'

// Compat layer - Vue 2/3 compatibility utilities
export * from './compat'

// Types
export type { MessageType, MessageOptions, MessageInstance } from './message'
export type { ToastType, ToastPosition, ToastOptions, ToastInstance } from './toast'

// Install function for Vue.use()
import HoButton from './button/index.vue'
import HoInput from './input/index.vue'
import HoIcon from './icon/index.vue'
import HoModal from './modal/index.vue'
import { message as messageApi } from './message'
import { toast as toastApi } from './toast'
import { isVue2, registerGlobalProperty, registerComponent } from './compat'

const components = [HoButton, HoInput, HoIcon, HoModal]

export default {
  install(app: any) {
    // Register components (Vue 2/3 compatible)
    components.forEach((component) => {
      if (component && component.name) {
        registerComponent(app, component.name, component)
      }
    })
    
    // Register global APIs (Vue 2/3 compatible)
    registerGlobalProperty(app, '$message', messageApi)
    registerGlobalProperty(app, '$toast', toastApi)
    
    // Provide for Composition API (Vue 3 only, Vue 2 uses inject differently)
    if (!isVue2 && app.provide) {
      app.provide('$message', messageApi)
      app.provide('$toast', toastApi)
    }
  }
}
