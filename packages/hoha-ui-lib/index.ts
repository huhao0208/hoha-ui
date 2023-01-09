import { App } from 'vue'
import Foo from '@hoha-ui-lib/foo'
import Select from '@hoha-ui-lib/select'
import SearchForm from '@hoha-ui-lib/search-form'
// import component end
import '../scss/index.scss'

const components = [
  Foo,
  Select, SearchForm
] // components

// 全局动态添加组件
const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  install
}
