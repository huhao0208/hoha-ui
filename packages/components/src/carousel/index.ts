import HoCarousel from './index.vue'
import type { App } from 'vue'
import type { CarouselItem, CarouselEffect, CarouselIndicatorPosition, CarouselIndicatorType } from './index.vue'

// Export component
export { HoCarousel }
export * from './index.vue'

// Export types
export type { CarouselItem, CarouselEffect, CarouselIndicatorPosition, CarouselIndicatorType }

// Placeholder for backward compatibility
export const HoCarouselItem = HoCarousel

// Install function
export default {
  install(app: App) {
    app.component('HoCarousel', HoCarousel)
  }
}
