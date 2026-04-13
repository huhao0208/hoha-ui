import TabBarItem from './index.vue'
import type { App } from 'vue'

TabBarItem.install = (app: App) => {
  app.component(TabBarItem.name, TabBarItem)
}

export default TabBarItem
export { TabBarItem }
