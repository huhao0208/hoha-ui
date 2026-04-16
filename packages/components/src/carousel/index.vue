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
          @click="handleItemClick(index, item)"
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
      v-if="showIndicator && indicatorPosition !== 'none'"
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
      >
        <span v-if="indicatorType === 'numbers'" class="ho-carousel__indicator-number">{{ index + 1 }}</span>
      </button>
    </div>

    <!-- Navigation arrows -->
    <button
      v-if="showArrow"
      class="ho-carousel__arrow ho-carousel__arrow--left"
      @click="prev"
    >
      <svg viewBox="0 0 24 24" class="ho-carousel__arrow-icon">
        <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
    </button>
    <button
      v-if="showArrow"
      class="ho-carousel__arrow ho-carousel__arrow--right"
      @click="next"
    >
      <svg viewBox="0 0 24 24" class="ho-carousel__arrow-icon">
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
export type CarouselDirection = 'horizontal' | 'vertical'
export type CarouselIndicatorPosition = 'bottom' | 'top' | 'left' | 'right' | 'none'
export type CarouselIndicatorType = 'dots' | 'lines' | 'numbers'

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
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 3000
    },
    duration: {
      type: Number,
      default: 500
    },
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String as PropType<CarouselDirection>,
      default: 'horizontal',
      validator: (v: string) => ['horizontal', 'vertical'].includes(v)
    },
    effect: {
      type: String as PropType<CarouselEffect>,
      default: 'slide',
      validator: (v: string) => ['slide', '3d', 'fade'].includes(v)
    },
    indicatorPosition: {
      type: String as PropType<CarouselIndicatorPosition>,
      default: 'bottom',
      validator: (v: string) => ['bottom', 'top', 'left', 'right', 'none'].includes(v)
    },
    indicatorType: {
      type: String as PropType<CarouselIndicatorType>,
      default: 'dots',
      validator: (v: string) => ['dots', 'lines', 'numbers'].includes(v)
    },
    indicatorColor: {
      type: String,
      default: '#fff'
    },
    showIndicator: {
      type: Boolean,
      default: true
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
      default: 0.3
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },
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
      default: 0.3
    }
  },
  emits: ['update:modelValue', 'change', 'click'],
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

    const isVertical = computed(() => props.direction === 'vertical')

    const carouselClasses = computed(() => ({
      'ho-carousel--vertical': isVertical.value,
      'ho-carousel--3d': props.effect === '3d',
      'ho-carousel--fade': props.effect === 'fade',
      'ho-carousel--dragging': isDragging.value
    }))

    const indicatorClasses = computed(() => ({
      'ho-carousel__indicators--top': props.indicatorPosition === 'top',
      'ho-carousel__indicators--left': props.indicatorPosition === 'left',
      'ho-carousel__indicators--right': props.indicatorPosition === 'right',
      'ho-carousel__indicators--lines': props.indicatorType === 'lines',
      'ho-carousel__indicators--numbers': props.indicatorType === 'numbers'
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

    const transitionDuration = computed(() => `${props.duration}ms`)

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
      
      if (isVertical.value) {
        return {
          transform: `translateY(${translateValue.value + dragOffset.value}px)`,
          transition: isTransitioning.value ? `transform ${transitionDuration.value} ease` : 'none',
          flexDirection: 'column',
          height: `${totalItems * 100}%`
        }
      }
      
      return {
        transform: `translateX(${translateValue.value + dragOffset.value}px)`,
        transition: isTransitioning.value ? `transform ${transitionDuration.value} ease` : 'none',
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
          transition: `opacity ${transitionDuration.value} ease`
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
        
        let normalizedOffset = offset
        if (props.loop) {
          if (normalizedOffset > totalItems / 2) {
            normalizedOffset -= totalItems
          } else if (normalizedOffset < -totalItems / 2) {
            normalizedOffset += totalItems
          }
        }
        
        const rotateY = normalizedOffset * 45
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
      
      if (props.indicatorType === 'lines') {
        return {
          backgroundColor: baseColor,
          opacity: isActive ? 1 : 0.4,
          transform: isActive ? 'scaleX(1)' : 'scaleX(0.5)'
        }
      }
      
      return {
        backgroundColor: baseColor,
        opacity: isActive ? 1 : 0.4
      }
    }

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
      emit('change', targetIndex, props.items[targetIndex])
    }

    const next = () => {
      goTo(activeIndex.value + 1)
    }

    const prev = () => {
      goTo(activeIndex.value - 1)
    }

    const updateTranslate = (index: number, _direction: 'next' | 'prev') => {
      if (props.effect === 'fade' || props.effect === '3d') return
      
      const containerSize = isVertical.value ? containerHeight.value : containerWidth.value
      let offset = index
      
      if (props.loop) {
        offset = index + 1
      }
      
      translateValue.value = -offset * containerSize
    }

    const startAutoplay = () => {
      if (!props.autoplay || props.items.length <= 1) return
      
      stopAutoplay()
      autoplayTimer = setTimeout(() => {
        if (!isPaused.value) {
          next()
        }
        startAutoplay()
      }, props.interval)
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

    // Alias for API compatibility
    const start = resume

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

    const handleIndicatorHover = (_index: number) => {
      if (props.pauseOnHover) {
        pause()
      }
    }

    const handleItemClick = (index: number, item: CarouselItem) => {
      emit('click', index, item)
    }

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
      const diff = isVertical.value
        ? touch.clientY - dragStart.value.y
        : touch.clientX - dragStart.value.x
      
      const containerSize = isVertical.value ? containerHeight.value : containerWidth.value
      const maxOffset = 0
      const minOffset = -(props.items.length - 1) * containerSize
      
      let newOffset = dragStart.value.translate + diff
      
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
      // 使用 dragOffset 作为滑动距离（已经在 handleTouchMove 中正确计算）
      const diff = dragOffset.value
      
      const velocity = Math.abs(diff) / touchDuration
      
      let targetIndex = activeIndex.value
      
      if (Math.abs(diff) > props.touchThreshold || velocity > props.swipeThreshold) {
        if (diff > 0) {
          targetIndex = activeIndex.value - 1
        } else {
          targetIndex = activeIndex.value + 1
        }
      }
      
      dragOffset.value = 0
      goTo(targetIndex)
      
      if (!isPaused.value) {
        startAutoplay()
      }
    }

    const handleTransitionEnd = () => {
      isTransitioning.value = false
    }

    const updateContainerSize = () => {
      if (carouselRef.value) {
        containerWidth.value = carouselRef.value.offsetWidth
        containerHeight.value = carouselRef.value.offsetHeight
        updateTranslate(activeIndex.value, 'next')
      }
    }

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

    onMounted(() => {
      updateContainerSize()
      window.addEventListener('resize', updateContainerSize)
      
      if (props.autoplay) {
        startAutoplay()
      }
      
      if (props.loop && props.effect === 'slide') {
        translateValue.value = -containerWidth.value
      }
    })

    onUnmounted(() => {
      stopAutoplay()
      window.removeEventListener('resize', updateContainerSize)
    })

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
      handleItemClick,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      handleTransitionEnd,
      prev,
      next,
      goTo,
      pause,
      resume,
      start
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
    height: 100%;
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
    height: 100%;
    
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
      
      &[loading="lazy"] {
        background: var(--hoho-bg-tertiary, #f3f4f6);
      }
    }
  }
  
  &__indicators {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    z-index: 10;
    padding: 0.5rem 0.75rem;
    
    &--top {
      top: 1rem;
    }
    
    &:not(&--top):not(&--left):not(&--right) {
      bottom: 1rem;
    }
    
    &--left {
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      flex-direction: column;
    }
    
    &--right {
      right: 1rem;
      left: auto;
      top: 50%;
      transform: translateY(-50%);
      flex-direction: column;
    }
    
    &--lines {
      gap: 0.25rem;
    }
    
    &--numbers {
      gap: 0.375rem;
    }
  }
  
  &__indicator {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      opacity: 0.8;
    }
    
    &--active {
      transform: scale(1.2);
    }
    
    .ho-carousel__indicators--lines & {
      width: 1.25rem;
      height: 0.1875rem;
      border-radius: 0.125rem;
      transform: scaleX(0.5);
      
      &--active {
        transform: scaleX(1);
      }
    }
    
    .ho-carousel__indicators--numbers & {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3) !important;
      font-size: 0.75rem;
      color: #fff;
    }
  }
  
  &__indicator-number {
    font-size: 0.75rem;
    color: inherit;
  }
  
  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 2.5rem;
    height: 2.5rem;
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
      left: 1rem;
    }
    
    &--right {
      right: 1rem;
    }
  }
  
  &__arrow-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
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
  
  &--dragging {
    .ho-carousel__track {
      transition: none !important;
    }
  }
}

@media screen and (max-width: 48rem) {
  .ho-carousel {
    &__container {
      -webkit-overflow-scrolling: touch;
    }
    
    &__indicators {
      padding: 0.375rem 0.625rem;
      gap: 0.375rem;
      
      &:not(&--top):not(&--left):not(&--right) {
        bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
      }
    }
    
    &__indicator {
      width: 0.625rem;
      height: 0.625rem;
      min-width: 1.5rem;
      min-height: 1.5rem;
      
      .ho-carousel__indicators--lines & {
        width: 1.5rem;
        height: 0.25rem;
      }
      
      .ho-carousel__indicators--numbers & {
        width: 1.75rem;
        height: 1.75rem;
        font-size: 0.875rem;
      }
    }
    
    &__arrow {
      width: 2.75rem;
      height: 2.75rem;
      
      &--left {
        left: 0.75rem;
      }
      
      &--right {
        right: 0.75rem;
      }
    }
    
    &__arrow-icon {
      width: 1.75rem;
      height: 1.75rem;
    }
  }
}

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

@media screen and (max-width: 48rem) {
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
