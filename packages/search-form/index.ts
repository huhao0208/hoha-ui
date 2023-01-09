import SearchForm from './src/search-form.vue'
import { App } from 'vue'

SearchForm.name = 'h-search-form'

SearchForm.install = (app: App): void => {
  // 注册组件
  app.component(SearchForm.name, SearchForm)
}

export default SearchForm
