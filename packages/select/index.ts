import Select from './src/select.vue'
import { App } from 'vue'

Select.name = 'h-select'

Select.install = (app: App): void => {
  // 注册组件
  app.component(Select.name, Select)
}

export default Select
