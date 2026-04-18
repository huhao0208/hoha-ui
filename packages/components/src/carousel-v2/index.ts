import HoCarouselV2 from './index.vue'
import type { App } from 'vue'

export { HoCarouselV2 }
export default HoCarouselV2

export function install(app: App) {
  app.component('HoCarouselV2', HoCarouselV2)
}

export type CarouselV2Item = {
  id?: string | number
  image?: string
  alt?: string
  [key: string]: any
}
