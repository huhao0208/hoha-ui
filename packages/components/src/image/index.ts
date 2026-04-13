import HoImage from './index.vue'
import type { App } from 'vue'

HoImage.install = (app: App) => {
  app.component(HoImage.name, HoImage)
  return app
}

export default HoImage
export { HoImage }
