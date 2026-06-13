import HoModal from './index.vue'
import type { App } from 'vue'

// Export component
export { HoModal }

// Install function
export default {
  install(app: App) {
    app.component('HoModal', HoModal)
  }
}
