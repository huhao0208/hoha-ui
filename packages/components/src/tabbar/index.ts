import TabBar from './index.vue'
import type { App } from 'vue'

TabBar.install = (app: App) => {
  app.component(TabBar.name, TabBar)
}

export default TabBar
export { TabBar }
export * from './index.vue'
