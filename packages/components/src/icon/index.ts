import Icon from './index.vue'
import type { App } from 'vue'

Icon.install = (app: App) => {
  app.component(Icon.name, Icon)
}

export default Icon
export { Icon as HoIcon }
