<template>
  <div
    ref="carouselRef"
    class="ho-carousel"
    :class="carouselClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- Main content wrapper -->
    <div
      class="ho-carousel__container"
      :style="containerStyle"
    >
      <div
        class="ho-carousel__track"
        :style="trackStyle"
        @transitionend="handleTransitionEnd"
      >
        <!-- Clone items for infinite loop -->
        <div
          v-if="loop && items.length > 0"
          class="ho-carousel__item ho-carousel__item--clone"
          :style="itemStyle"
        >
          <slot :item="items[items.length - 1]" :index="-1">
            <HoCarouselItem>
              <img v-if="items[items.length - 1]?.image" :src="items[items.length - 1].image" />
            </HoCarouselItem>
          </slot>
        </div>

        <!-- Main items -->
        <div
          v-for="(item, index) in items"
          :key="item.id || index"
          class="ho-carousel__item"
          :class="{ 'ho-carousel__item--active': index === activeIndex }"
          :style="getItemStyle(index)"
        >
          <slot :item="item" :index="index">
            <HoCarouselItem>
              <img v-if="item.image" :src="item.image" :alt="item.alt || ''" />
            </HoCarouselItem>
          </slot>
        </div>

        <!-- Clone items for infinite loop -->
        <div
          v-if="loop && items.length > 0"
          class="ho-carousel__item ho-carousel__item--clone"
          :style="itemStyle"
        >
          <slot :item="items[0]" :index="items.length">
            <HoCarouselItem>
              <img v-if="items[0]?.image" :src="items[0].image" />
            </HoCarouselItem>
          </slot>
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div
      v-if="indicatorPosition !== 'none'"
      class="ho-carousel__indicators"
      :class="indicatorClasses"
    >
      <button
        v-for="(item, index) in items"
        :key="index"
        class="ho-carousel__indicator"
        :class="{ 'ho-carousel__indicator--active': index === activeIndex }"
        :style="getIndicatorStyle(index)"
        @click="handleIndicatorClick(index)"
        @mouseenter="handleIndicatorHover(index)"
      />
    </div>

    <!-- Navigation arrows -->
    <button
      v-if="showArrow"
      class="ho-carousel__arrow ho-carousel__arrow--left"
      @click="prev"
    >
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
    </button>
    <button
      v-if="showArrow"
      class="ho-carousel__arrow ho-carousel__arrow--right"
      @click="next"
    >
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted, onUnmounted, provide, nextTick, h } from 'vue'
import type { CSSProperties, PropType } from 'vue'

export interface CarouselItem {
  id?: string | number
  image?: string
  alt?: string
  [key: string]: unknown
}

export type CarouselEffect = 'slide' | '3d' | 'fade'
export type CarouselIndicatorPosition = 'bottom' | 'top' | 'none'
export type CarouselIndicatorType = 'dot' | 'bar'

// CarouselItem sub-component
export const HoCarouselItem = defineComponent({
  name: 'HoCarouselItem',
  setup(_, { slots }) {
    return () => h('div', { class: 'ho-carousel__item-content' }, slots.default?.())
  }
})

export default defineComponent({
  name: 'HoCarousel',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    items: {
      type: Array as PropType<CarouselItem[]>,
      default: () => []
    },
    autoplay: {
      type: [Number, Boolean],
      default: 3000
    },
    loop: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: false
    },
    effect: {
      type: String as PropType<CarouselEffect>,
      default: 'slide',
      validator: (v: string) => ['slide', '3d', 'fade'].includes(v)
    },
    indicatorPosition: {
      type: String as PropType<CarouselIndicatorPosition>,
      default: 'bottom',
      validator: (v: string) => ['bottom', 'top', 'none'].includes(v)
    },
    indicatorType: {
      type: String as PropType<CarouselIndicatorType>,
      default: 'dot',
      validator: (v: string) => ['dot', 'bar'].includes(v)
    },
    indicatorColor: {
      type: String,
      default: '#fff'
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    pauseOnHover: {
      type: Boolean,
      default: true
    },
    touchable: {
      type: Boolean,
      default: true
    },
    touchThreshold: {
      type: Number,
      default: 50
    },
    swipeThreshold: {
      type: Number,
      default: 0.3 // velocity threshold
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },
    // 3D effect specific
    perspective: {
      type: Number,
      default: 1000
    },
    scale3d: {
      type: Number,
      default: 0.85
    },
    space3d: {
      type: Number,
      default: 0.3 // percentage
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const carouselRef = ref<HTMLElement | null>(null)
    const activeIndex = ref(props.modelValue)
    const translateValue = ref(0)
    const isTransitioning = ref(false)
    const isPaused = ref(false)
    const isDragging = ref(false)
    const dragStart = ref({ x: 0, y: 0, translate: 0 })
    const dragOffset = ref(0)
    const containerWidth = ref(0)
    const containerHeight = ref(0)
    
    let autoplayTimer: ReturnType<typeof setTimeout> | null = null
    let touchStartTime = 0

    // Computed styles
    const carouselClasses = computed(() => ({
      'ho-carousel--vertical': props.vertical,
      'ho-carousel--3d': props.effect === '3d',
      'ho-carousel--fade': props.effect === 'fade',
      'ho-carousel--dragging': isDragging.value
    }))

    const indicatorClasses = computed(() => ({
      'ho-carousel__indicators--top': props.indicatorPosition === 'top',
      'ho-carousel__indicators--bar': props.indicatorType === 'bar'
    }))

    const containerStyle = computed<CSSProperties>(() => {
      const width = typeof props.width === 'number' ? `${props.width}px` : props.width
      const height = typeof props.height === 'number' ? `${props.height}px` : props.height
      
      const style: CSSProperties = {
        width,
        height: height === 'auto' ? undefined : height
      }
      
      if (props.effect === '3d') {
        style.perspective = `${props.perspective}px`
      }
      
      return style
    })

    const trackStyle = computed<CSSProperties>(() => {
      const totalItems = props.items.length + (props.loop ? 2 : 0)
      
      if (props.effect === 'fade') {
        return {
          position: 'relative',
          width: '100%',
          height: '100%'
        }
      }
      
      if (props.effect === '3d') {
        return {
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d'
        }
      }
      
      // Slide effect
      if (props.vertical) {
        return {
          transform: `translateY(${translateValue.value + dragOffset.value}px)`,
          transition: isTransitioning.value ? 'transform 0.5s ease' : 'none',
          flexDirection: 'column',
          height: `${totalItems * 100}%`
        }
      }
      
      return {
        transform: `translateX(${translateValue.value + dragOffset.value}px)`,
        transition: isTransitioning.value ? 'transform 0.5s ease' : 'none',
        width: `${totalItems * 100}%`
      }
    })

    const itemStyle = computed<CSSProperties>(() => {
      if (props.effect === 'fade') {
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          transition: 'opacity 0.5s ease'
        }
      }
      
      if (props.effect === '3d') {
        return {
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden' as const
        }
      }
      
      return {
        flex: '0 0 100%',
        width: '100%'
      }
    })

    // Get item style for 3D effect and fade
    const getItemStyle = (index: number): CSSProperties => {
      if (props.effect === 'fade') {
        return {
          ...itemStyle.value,
          opacity: index === activeIndex.value ? 1 : 0,
          zIndex: index === activeIndex.value ? 1 : 0
        }
      }
      
      if (props.effect === '3d') {
        const totalItems = props.items.length
        const offset = index - activeIndex.value
        
        // Handle wrap around for loop
        let normalizedOffset = offset
        if (props.loop) {
          if (normalizedOffset > totalItems / 2) {
            normalizedOffset -= totalItems
          } else if (normalizedOffset < -totalItems / 2) {
            normalizedOffset += totalItems
          }
        }
        
        const rotateY = normalizedOffset * 45 // degrees
        const translateZ = -Math.abs(normalizedOffset) * props.perspective * props.space3d
        const scale = Math.pow(props.scale3d, Math.abs(normalizedOffset))
        const opacity = 1 - Math.abs(normalizedOffset) * 0.3
        const zIndex = totalItems - Math.abs(normalizedOffset)
        
        return {
          ...itemStyle.value,
          transform: `translateX(-50%) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
          left: '50%',
          opacity: Math.max(opacity, 0.3),
          zIndex,
          pointerEvents: normalizedOffset === 0 ? 'auto' : 'none'
        }
      }
      
      return itemStyle.value
    }

    const getIndicatorStyle = (index: number): CSSProperties => {
      const isActive = index === activeIndex.value
      const baseColor = props.indicatorColor
      
      return {
        backgroundColor: baseColor,
        opacity: isActive ? 1 : 0.4,
        transform: isActive && props.indicatorType === 'bar' ? 'scaleX(1)' : 'scaleX(0.5)'
      }
    }

    // Navigation
    const goTo = (index: number) => {
      if (isTransitioning.value || props.items.length === 0) return
      
      const totalItems = props.items.length
      let targetIndex = index
      
      if (props.loop) {
        if (index < 0) {
          targetIndex = totalItems - 1
        } else if (index >= totalItems) {
          targetIndex = 0
        }
      } else {
        targetIndex = Math.max(0, Math.min(index, totalItems - 1))
      }
      
      if (targetIndex === activeIndex.value && index !== activeIndex.value) return
      
      isTransitioning.value = true
      const prevIndex = activeIndex.value
      activeIndex.value = targetIndex
      
      updateTranslate(targetIndex, prevIndex < targetIndex ? 'next' : 'prev')
      
      emit('update:modelValue', targetIndex)
      emit('change', targetIndex, prevIndex)
    }

    const next = () => {
      goTo(activeIndex.value + 1)
    }

    const prev = () => {
      goTo(activeIndex.value - 1)
    }

    const updateTranslate = (index: number, _direction: 'next' | 'prev') => {
      if (props.effect === 'fade' || props.effect === '3d') return
      
      const containerSize = props.vertical ? containerHeight.value : containerWidth.value
      let offset = index
      
      if (props.loop) {
        offset = index + 1 // Account for cloned item
      }
      
      translateValue.value = -offset * containerSize
    }

    // Autoplay
    const startAutoplay = () => {
      if (!props.autoplay || props.items.length <= 1) return
      
      const interval = typeof props.autoplay === 'number' ? props.autoplay : 3000
      
      stopAutoplay()
      autoplayTimer = setTimeout(() => {
        if (!isPaused.value) {
          next()
        }
        startAutoplay()
      }, interval)
    }

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearTimeout(autoplayTimer)
        autoplayTimer = null
      }
    }

    const pause = () => {
      isPaused.value = true
    }

    const resume = () => {
      isPaused.value = false
    }

    // Event handlers
    const handleMouseEnter = () => {
      if (props.pauseOnHover) {
        pause()
      }
    }

    const handleMouseLeave = () => {
      if (props.pauseOnHover) {
        resume()
      }
    }

    const handleIndicatorClick = (index: number) => {
      goTo(index)
    }

    const handleIndicatorHover = (index: number) => {
      if (props.pauseOnHover) {
        pause()
      }
    }

    // Touch handling
    const handleTouchStart = (e: TouchEvent) => {
      if (!props.touchable || props.effect === '3d') return
      
      const touch = e.touches[0]
      isDragging.value = true
      touchStartTime = Date.now()
      dragStart.value = {
        x: touch.clientX,
        y: touch.clientY,
        translate: translateValue.value
      }
      
      stopAutoplay()
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.value || !props.touchable) return
      
      e.preventDefault()
      
      const touch = e.touches[0]
      const diff = props.vertical
        ? touch.clientY - dragStart.value.y
        : touch.clientX - dragStart.value.x
      
      // Apply damping at boundaries
      const containerSize = props.vertical ? containerHeight.value : containerWidth.value
      const maxOffset = props.loop ? 0 : 0
      const minOffset = -(props.items.length - 1) * containerSize
      
      let newOffset = dragStart.value.translate + diff
      
      // Damping effect at boundaries
      if (!props.loop) {
        if (newOffset > maxOffset) {
          newOffset = maxOffset + (newOffset - maxOffset) * 0.3
        } else if (newOffset < minOffset) {
          newOffset = minOffset + (newOffset - minOffset) * 0.3
        }
      }
      
      dragOffset.value = newOffset - dragStart.value.translate
    }

    const handleTouchEnd = () => {
      if (!isDragging.value) return
      
      isDragging.value = false
      
      const touchDuration = Date.now() - touchStartTime
      const diff = props.vertical
        ? dragStart.value.y - (dragStart.value.x as any) // simplified
        : dragOffset.value
      
      const containerSize = props.vertical ? containerHeight.value : containerWidth.value
      const velocity = Math.abs(diff) / touchDuration
      
      let targetIndex = activeIndex.value
      
      // Determine direction and target
      if (Math.abs(diff) > props.touchThreshold || velocity > props.swipeThreshold) {
        if (diff > 0) {
          targetIndex = activeIndex.value - 1
        } else {
          targetIndex = activeIndex.value + 1
        }
      }
      
      dragOffset.value = 0
      goTo(targetIndex)
      
      // Resume autoplay after touch
      if (!isPaused.value) {
        startAutoplay()
      }
    }

    const handleTransitionEnd = () => {
      isTransitioning.value = false
    }

    // Resize handling
    const updateContainerSize = () => {
      if (carouselRef.value) {
        containerWidth.value = carouselRef.value.offsetWidth
        containerHeight.value = carouselRef.value.offsetHeight
        updateTranslate(activeIndex.value, 'next')
      }
    }

    // Watch for model changes
    watch(() => props.modelValue, (val) => {
      if (val !== activeIndex.value) {
        goTo(val)
      }
    })

    watch(() => props.items, () => {
      nextTick(() => {
        updateContainerSize()
      })
    }, { deep: true })

    // Lifecycle
    onMounted(() => {
      updateContainerSize()
      window.addEventListener('resize', updateContainerSize)
      
      if (props.autoplay) {
        startAutoplay()
      }
      
      // Initial position for loop mode
      if (props.loop && props.effect === 'slide') {
        translateValue.value = -containerWidth.value
      }
    })

    onUnmounted(() => {
      stopAutoplay()
      window.removeEventListener('resize', updateContainerSize)
    })

    // Provide for CarouselItem
    provide('carousel', {
      activeIndex,
      effect: computed(() => props.effect)
    })

    return {
      carouselRef,
      activeIndex,
      carouselClasses,
      indicatorClasses,
      containerStyle,
      trackStyle,
      itemStyle,
      getItemStyle,
      getIndicatorStyle,
      handleMouseEnter,
      handleMouseLeave,
      handleIndicatorClick,
      handleIndicatorHover,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      handleTransitionEnd,
      prev,
      next,
      pause,
      resume
    }
  }
})
</script>

<style lang="less">
.ho-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  user-select: none;
  
  &__container {
    position: relative;
    width: 100%;
    height: 12.5rem; /* 200px / 16 = 12.5rem */
    overflow: hidden;
    border-radius: var(--hoho-radius-lg, 0.5rem);
  }
  
  &__track {
    display: flex;
    width: 100%;
    will-change: transform;
    
    .ho-carousel--vertical & {
      flex-direction: column;
    }
    
    .ho-carousel--3d & {
      position: relative;
      transform-style: preserve-3d;
    }
  }
  
  &__item {
    flex-shrink: 0;
    width: 100%;
    
    .ho-carousel--3d & {
      position: absolute;
      top: 0;
      left: 50%;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      backface-visibility: hidden;
    }
    
    &--clone {
      visibility: visible;
    }
  }
  
  &__item-content {
    width: 100%;
    height: 100%;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      
      // Lazy loading support
      &[loading="lazy"] {
        background: var(--hoho-bg-tertiary, #f3f4f6);
      }
    }
  }
  
  // Indicators
  &__indicators {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem; /* 8px */
    z-index: 10;
    padding: 0.5rem 0.75rem; /* 8px 12px */
    
    &--top {
      top: 16px;
    }
    
    &:not(&--top) {
      bottom: 16px;
    }
    
    &--bar {
      gap: 4px;
    }
  }
  
  &__indicator {
    width: 0.5rem; /* 8px */
    height: 0.5rem; /* 8px */
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
    
    &:hover {
      opacity: 0.8;
    }
    
    &--active {
      width: 8px;
    }
    
    .ho-carousel__indicators--bar & {
      width: 20px;
      height: 3px;
      border-radius: 2px;
      transform: scaleX(0.5);
      transition: transform 0.3s ease, opacity 0.3s ease;
      
      &--active {
        transform: scaleX(1);
      }
    }
  }
  
  // Navigation arrows
  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 2.5rem; /* 40px */
    height: 2.5rem; /* 40px */
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10;
    
    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }
    
    &--left {
      left: 1rem; /* 16px */
    }
    
    &--right {
      right: 1rem; /* 16px */
    }
  }
  
  // Fade effect
  &--fade {
    .ho-carousel__item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.5s ease;
      
      &--active {
        opacity: 1;
        z-index: 1;
      }
    }
  }
  
  // Dragging state
  &--dragging {
    .ho-carousel__track {
      transition: none !important;
    }
  }
}

// Mobile adaptations
@media screen and (max-width: 768px) {
  .ho-carousel {
    &__container {
      -webkit-overflow-scrolling: touch;
    }
    
    &__indicators {
      padding: 0.375rem 0.625rem; /* 6px 10px */
      gap: 0.375rem; /* 6px */
      
      &:not(&--top) {
        bottom: calc(16px + var(--hoho-safe-area-bottom));
      }
    }
    
    &__indicator {
      width: 0.625rem; /* 10px */
      height: 0.625rem; /* 10px */
      min-width: 1.5rem; /* 24px */
      min-height: 1.5rem; /* 24px */
      display: flex;
      align-items: center;
      justify-content: center;
      
      &::after {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: inherit;
      }
      
      .ho-carousel__indicators--bar & {
        width: 24px;
        height: 24px;
        min-width: 24px;
        
        &::after {
          width: 20px;
          height: 3px;
          border-radius: 2px;
        }
      }
    }
    
    &__arrow {
      width: 2.75rem; /* 44px */
      height: 2.75rem; /* 44px */
      
      &--left {
        left: 0.75rem; /* 12px */
      }
      
      &--right {
        right: 0.75rem; /* 12px */
      }
      
      svg {
        width: 28px;
        height: 28px;
      }
    }
  }
}

// Dark mode
html.dark {
  .ho-carousel {
    &__arrow {
      background: rgba(0, 0, 0, 0.6);
      
      &:hover {
        background: rgba(0, 0, 0, 0.8);
      }
    }
    
    &__item-content {
      img[loading="lazy"] {
        background: var(--hoho-bg-tertiary);
      }
    }
  }
}

// Touch feedback for mobile
@media screen and (max-width: 768px) {
  .ho-carousel {
    &__indicator:active {
      transform: scale(0.9);
    }
    
    &__arrow:active {
      transform: translateY(-50%) scale(0.95);
    }
  }
  
  html.dark .ho-carousel {
    &__arrow:active {
      background: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>
