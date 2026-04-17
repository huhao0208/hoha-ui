<template>
  <div
    ref="carouselRef"
    class="ho-carousel"
    :class="carouselClasses"
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
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <!-- Main items -->
        <div
          v-for="(item, index) in displayItems"
          :key="item._id"
          class="ho-carousel__item"
          :class="{ 'ho-carousel__item--active': index === displayActiveIndex }"
          :style="getItemStyle(index)"
          @click="handleItemClick(index, item)"
        >
          <div class="ho-carousel__item-content">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.alt || ''"
              :style="{ objectFit: fit }"
              loading="lazy"
            >
          </div>
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
        v-for="index in items.length"
        :key="index"
        class="ho-carousel__indicator"
        :class="{ 'ho-carousel__indicator--active': index - 1 === activeIndex }"
        @click="handleIndicatorClick(index - 1)"
      >
        <span v-if="indicatorType === 'numbers'">{{ index }}</span>
      </button>
    </div>

    <!-- Navigation arrows -->
    <button
      v-if="showArrow"
      class="ho-carousel__arrow ho-carousel__arrow--left"
      @click.stop="prev"
    >
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
    </button>
    <button
      v-if="showArrow"
      class="ho-carousel__arrow ho-carousel__arrow--right"
      @click.stop="next"
    >
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
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

export default defineComponent({
  name: 'HoCarousel',
  props: {
    modelValue: { type: Number, default: 0 },
    items: { type: Array as PropType<CarouselItem[]>, default: () => [] },
    autoplay: { type: Boolean, default: false },
    interval: { type: Number, default: 3000 },
    duration: { type: Number, default: 500 },
    loop: { type: Boolean, default: true },
    direction: { type: String as PropType<CarouselDirection>, default: 'horizontal' },
    effect: { type: String as PropType<CarouselEffect>, default: 'slide' },
    indicatorPosition: { type: String as PropType<CarouselIndicatorPosition>, default: 'bottom' },
    indicatorType: { type: String as PropType<CarouselIndicatorType>, default: 'dots' },
    indicatorColor: { type: String, default: '#fff' },
    showIndicator: { type: Boolean, default: true },
    showArrow: { type: Boolean, default: false },
    pauseOnHover: { type: Boolean, default: true },
    touchable: { type: Boolean, default: true },
    touchThreshold: { type: Number, default: 50 },
    width: { type: [String, Number], default: '100%' },
    height: { type: [String, Number], default: 'auto' },
    perspective: { type: Number, default: 1000 },
    scale3d: { type: Number, default: 0.85 },
    space3d: { type: Number, default: 0.3 },
    fit: { 
      type: String as PropType<'cover' | 'contain' | 'fill' | 'none' | 'scale-down'>,
      default: 'cover'
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
    const dragStartValue = ref(0)
    const dragOffset = ref(0)
    const containerSize = ref(0)
    
    let autoplayTimer: ReturnType<typeof setInterval> | null = null
    let touchStartX = 0
    let touchStartY = 0
    let touchStartTime = 0

    const isVertical = computed(() => props.direction === 'vertical')
    const is3D = computed(() => props.effect === '3d')
    const isFade = computed(() => props.effect === 'fade')

    // 为循环模式添加克隆项
    const displayItems = computed(() => {
      if (!props.loop || props.items.length === 0) {
        return props.items.map((item, i) => ({ ...item, _id: i, original: item, originalIndex: i }))
      }
      
      const items = props.items.map((item, i) => ({ ...item, _id: i, original: item, originalIndex: i }))
      const lastItem = { ...props.items[props.items.length - 1], _id: 'clone-last', original: props.items[props.items.length - 1], originalIndex: props.items.length - 1 }
      const firstItem = { ...props.items[0], _id: 'clone-first', original: props.items[0], originalIndex: 0 }
      
      return [lastItem, ...items, firstItem]
    })

    const displayActiveIndex = computed(() => {
      if (!props.loop || props.items.length === 0) return activeIndex.value
      return activeIndex.value + 1
    })

    const carouselClasses = computed(() => ({
      'ho-carousel--vertical': isVertical.value,
      'ho-carousel--3d': is3D.value,
      'ho-carousel--fade': isFade.value,
      'ho-carousel--dragging': isDragging.value
    }))

    const indicatorClasses = computed(() => ({
      'ho-carousel__indicators--top': props.indicatorPosition === 'top',
      'ho-carousel__indicators--left': props.indicatorPosition === 'left',
      'ho-carousel__indicators--right': props.indicatorPosition === 'right',
      'ho-carousel__indicators--lines': props.indicatorType === 'lines',
      'ho-carousel__indicators--numbers': props.indicatorType === 'numbers'
    }))

    const containerStyle = computed<CSSProperties>(() => ({
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
      height: typeof props.height === 'number' ? `${props.height}px` : props.height,
      perspective: is3D.value ? `${props.perspective}px` : undefined
    }))

    const trackStyle = computed<CSSProperties>(() => {
      if (isFade.value) {
        return { position: 'relative', width: '100%', height: '100%' }
      }
      
      if (is3D.value) {
        return { position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }
      }

      const translate = translateValue.value + dragOffset.value
      return {
        transform: `translate${isVertical.value ? 'Y' : 'X'}(${translate}px)`,
        transition: isTransitioning.value ? `transform ${props.duration}ms ease` : 'none'
      }
    })

    const getItemStyle = (index: number): CSSProperties => {
      if (isFade.value) {
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: index === displayActiveIndex.value ? 1 : 0,
          zIndex: index === displayActiveIndex.value ? 1 : 0,
          transition: `opacity ${props.duration}ms ease`
        }
      }

      if (is3D.value) {
        const offset = index - displayActiveIndex.value
        const totalItems = displayItems.value.length
        const maxOffset = Math.floor(totalItems / 2)
        
        // 限制可见范围
        const absOffset = Math.abs(offset)
        if (absOffset > maxOffset) {
          return { opacity: 0, pointerEvents: 'none' }
        }

        const rotateY = offset * 45
        const translateZ = -absOffset * props.perspective * props.space3d
        const scale = Math.pow(props.scale3d, absOffset)
        const opacity = Math.max(1 - absOffset * 0.3, 0.3)
        const zIndex = totalItems - absOffset

        return {
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '100%',
          height: '100%',
          transform: `translateX(-50%) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
          opacity,
          zIndex,
          transition: `transform ${props.duration}ms ease, opacity ${props.duration}ms ease`,
          cursor: offset !== 0 ? 'pointer' : 'default'
        }
      }

      return {
        flex: '0 0 100%',
        width: '100%',
        height: '100%'
      }
    }

    const goTo = (index: number) => {
      if (isTransitioning.value || props.items.length === 0) return

      const totalItems = props.items.length
      let targetIndex = index

      if (props.loop) {
        if (index < 0) targetIndex = totalItems - 1
        else if (index >= totalItems) targetIndex = 0
      } else {
        targetIndex = Math.max(0, Math.min(index, totalItems - 1))
      }

      if (targetIndex === activeIndex.value) return

      if (!is3D.value && !isFade.value) {
        isTransitioning.value = true
      }

      const prevIndex = activeIndex.value
      activeIndex.value = targetIndex
      updateTranslate(targetIndex)

      emit('update:modelValue', targetIndex)
      emit('change', targetIndex, props.items[targetIndex])
    }

    const next = () => goTo(activeIndex.value + 1)
    const prev = () => goTo(activeIndex.value - 1)

    const updateTranslate = (index: number) => {
      if (is3D.value || isFade.value) return
      
      let offset = index
      if (props.loop) offset = index + 1
      translateValue.value = -offset * containerSize.value
    }

    const startAutoplay = () => {
      if (!props.autoplay || props.items.length <= 1) return
      stopAutoplay()
      autoplayTimer = setInterval(() => {
        if (!isPaused.value && !isDragging.value) next()
      }, props.interval)
    }

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
      }
    }

    const handleMouseEnter = () => {
      if (props.pauseOnHover) isPaused.value = true
    }

    const handleMouseLeave = () => {
      if (props.pauseOnHover) isPaused.value = false
    }

    const handleIndicatorClick = (index: number) => goTo(index)

    const handleItemClick = (index: number, item: any) => {
      if (is3D.value && index !== displayActiveIndex.value) {
        // 点击非当前项时切换
        const targetIndex = props.loop ? index - 1 : index
        if (targetIndex >= 0 && targetIndex < props.items.length) {
          goTo(targetIndex)
        }
      }
      emit('click', item.originalIndex ?? index, item.original ?? item)
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!props.touchable || is3D.value || isFade.value) return
      
      const touch = e.touches[0]
      isDragging.value = true
      touchStartX = touch.clientX
      touchStartY = touch.clientY
      touchStartTime = Date.now()
      dragStartValue.value = translateValue.value
      stopAutoplay()
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.value) return
      
      const touch = e.touches[0]
      const diff = isVertical.value
        ? touch.clientY - touchStartY
        : touch.clientX - touchStartX

      // 检测滑动方向
      const absDiff = Math.abs(diff)
      const otherDiff = Math.abs(isVertical.value ? touch.clientX - touchStartX : touch.clientY - touchStartY)
      
      // 如果不是主要滑动方向，忽略
      if (absDiff < otherDiff) return

      e.preventDefault()
      dragOffset.value = diff
    }

    const handleTouchEnd = () => {
      if (!isDragging.value) return

      const duration = Date.now() - touchStartTime
      const diff = dragOffset.value
      const velocity = Math.abs(diff) / duration

      let targetIndex = activeIndex.value

      if (Math.abs(diff) > props.touchThreshold || velocity > 0.3) {
        targetIndex = diff > 0 ? activeIndex.value - 1 : activeIndex.value + 1
      }

      dragOffset.value = 0
      isDragging.value = false
      
      goTo(targetIndex)
      
      if (!isPaused.value && props.autoplay) {
        startAutoplay()
      }
    }

    const handleTransitionEnd = () => {
      isTransitioning.value = false
    }

    const updateContainerSize = () => {
      if (carouselRef.value) {
        containerSize.value = isVertical.value 
          ? carouselRef.value.offsetHeight 
          : carouselRef.value.offsetWidth
        updateTranslate(activeIndex.value)
      }
    }

    watch(() => props.modelValue, (val) => {
      if (val !== activeIndex.value) goTo(val)
    })

    watch(() => props.items, () => {
      nextTick(updateContainerSize)
    }, { deep: true })

    watch(() => props.autoplay, (val) => {
      if (val) startAutoplay()
      else stopAutoplay()
    })

    onMounted(() => {
      updateContainerSize()
      window.addEventListener('resize', updateContainerSize)
      if (props.autoplay) startAutoplay()
    })

    onUnmounted(() => {
      stopAutoplay()
      window.removeEventListener('resize', updateContainerSize)
    })

    return {
      carouselRef,
      activeIndex,
      displayActiveIndex,
      displayItems,
      carouselClasses,
      indicatorClasses,
      containerStyle,
      trackStyle,
      getItemStyle,
      handleMouseEnter,
      handleMouseLeave,
      handleIndicatorClick,
      handleItemClick,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      handleTransitionEnd,
      prev,
      next
    }
  }
})
</script>

<style lang="less">
.ho-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  
  &__container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
  }
  
  &__track {
    display: flex;
    width: 100%;
    height: 100%;
    will-change: transform;
    
    .ho-carousel--vertical & {
      flex-direction: column;
    }
    
    .ho-carousel--3d &,
    .ho-carousel--fade & {
      position: relative;
    }
  }
  
  &__item {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    
    .ho-carousel--3d &,
    .ho-carousel--fade & {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  
  &__item-content {
    width: 100%;
    height: 100%;
    
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  
  &__indicators {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
    padding: 12px;
    
    &--top { top: 0; }
    &:not(&--top):not(&--left):not(&--right) { bottom: 0; }
    
    &--left {
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      flex-direction: column;
    }
    
    &--right {
      right: 0;
      left: auto;
      top: 50%;
      transform: translateY(-50%);
      flex-direction: column;
    }
  }
  
  &__indicator {
    width: 8px;
    height: 8px;
    min-width: 8px;
    min-height: 8px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    
    &:hover {
      background: rgba(255, 255, 255, 0.7);
    }
    
    &--active {
      width: 24px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.95);
    }
    
    .ho-carousel__indicators--lines & {
      width: 16px;
      height: 3px;
      border-radius: 2px;
      
      &--active { width: 24px; }
    }
    
    .ho-carousel__indicators--numbers & {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      
      &--active {
        background: rgba(255, 255, 255, 0.9);
        color: #333;
      }
    }
  }
  
  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
    z-index: 10;
    
    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }
    
    &--left { left: 16px; }
    &--right { right: 16px; }
  }
  
  &--dragging {
    .ho-carousel__track {
      transition: none !important;
    }
  }
}
</style>
