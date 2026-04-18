<template>
  <div class="ho-carousel-v2" :class="carouselClasses">
    <!-- 容器 -->
    <div 
      ref="containerRef"
      class="ho-carousel-v2__container"
      :style="containerStyle"
    >
      <div
        class="ho-carousel-v2__track"
        :style="trackStyle"
        @transitionend="onTransitionEnd"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <!-- 幻灯片 -->
        <div
          v-for="(slide, index) in displaySlides"
          :key="index"
          class="ho-carousel-v2__slide"
          :style="getSlideStyle(index)"
          @click="onSlideClick(index)"
        >
          <img
            v-if="slide.image"
            :src="slide.image"
            :alt="slide.alt || ''"
            :style="imageStyle"
            loading="lazy"
          >
        </div>
      </div>
    </div>

    <!-- 指示器 -->
    <div v-if="showIndicator" class="ho-carousel-v2__indicators">
      <button
        v-for="i in items.length"
        :key="i"
        class="ho-carousel-v2__dot"
        :class="{ 'is-active': i - 1 === currentIndex }"
        @click="goTo(i - 1)"
      />
    </div>

    <!-- 箭头 -->
    <button
      v-if="showArrow"
      class="ho-carousel-v2__arrow ho-carousel-v2__arrow--prev"
      @click="prev"
    >
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </svg>
    </button>
    <button
      v-if="showArrow"
      class="ho-carousel-v2__arrow ho-carousel-v2__arrow--next"
      @click="next"
    >
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  ref, 
  computed, 
  watch, 
  onMounted, 
  onUnmounted,
  nextTick
} from 'vue'
import type { PropType, CSSProperties } from 'vue'

interface SlideItem {
  id?: string | number
  image?: string
  alt?: string
  [key: string]: any
}

export default defineComponent({
  name: 'HoCarouselV2',
  
  props: {
    items: { 
      type: Array as PropType<SlideItem[]>, 
      default: () => [] 
    },
    modelValue: { 
      type: Number, 
      default: 0 
    },
    // 自动播放
    autoplay: { 
      type: Boolean, 
      default: false 
    },
    interval: { 
      type: Number, 
      default: 3000 
    },
    // 动画
    duration: { 
      type: Number, 
      default: 500 
    },
    // 特效
    effect: {
      type: String as PropType<'slide' | 'fade' | '3d'>,
      default: 'slide'
    },
    // 3D 参数
    perspective: {
      type: Number,
      default: 1000
    },
    loop: { 
      type: Boolean, 
      default: true 
    },
    // 尺寸
    width: { 
      type: [String, Number], 
      default: '100%' 
    },
    height: { 
      type: [String, Number], 
      default: 'auto' 
    },
    // 指示器
    showIndicator: { 
      type: Boolean, 
      default: true 
    },
    // 箭头
    showArrow: { 
      type: Boolean, 
      default: false 
    },
    // 图片缩放
    fit: { 
      type: String as PropType<'cover' | 'contain' | 'fill' | 'none' | 'scale-down'>,
      default: 'cover'
    }
  },

  emits: ['update:modelValue', 'change', 'click'],

  setup(props, { emit }) {
    // === 状态 ===
    const containerRef = ref<HTMLElement | null>(null)
    const currentIndex = ref(props.modelValue)
    const translateX = ref(0)
    const containerWidth = ref(0)
    const isPlaying = ref(false)
    const isDragging = ref(false)
    const dragOffset = ref(0)
    
    let timer: number | null = null
    let startX = 0
    let startY = 0

    // === 计算属性 ===
    
    const isFade = computed(() => props.effect === 'fade')
    const is3D = computed(() => props.effect === '3d')

    // 循环模式需要克隆首尾
    const displaySlides = computed(() => {
      if (!props.loop || !props.items.length) {
        return props.items
      }
      
      const first = props.items[0]
      const last = props.items[props.items.length - 1]
      
      return [
        { ...last, _clone: true },
        ...props.items,
        { ...first, _clone: true }
      ]
    })

    // 当前显示索引（考虑克隆）
    const displayIndex = computed(() => {
      if (!props.loop) return currentIndex.value
      return currentIndex.value + 1
    })

    const carouselClasses = computed(() => ({
      'is-fade': isFade.value,
      'is-3d': is3D.value
    }))

    const containerStyle = computed<CSSProperties>(() => ({
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
      height: typeof props.height === 'number' ? `${props.height}px` : props.height,
      perspective: is3D.value ? `${props.perspective}px` : undefined,
      transformStyle: is3D.value ? 'preserve-3d' : undefined
    }))

    const trackStyle = computed<CSSProperties>(() => {
      if (isFade.value || is3D.value) {
        return {
          position: 'relative',
          width: '100%',
          height: '100%'
        }
      }
      
      return {
        transform: `translateX(${translateX.value + dragOffset.value}px)`,
        transition: isDragging.value 
          ? 'none' 
          : isPlaying.value 
            ? `transform ${props.duration}ms ease` 
            : 'none',
        width: `${displaySlides.value.length * 100}%`
      }
    })

    const imageStyle = computed<CSSProperties>(() => ({
      objectFit: props.fit
    }))

    const getSlideStyle = (index: number): CSSProperties => {
      // Fade 模式
      if (isFade.value) {
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: index === displayIndex.value ? 1 : 0,
          transition: `opacity ${props.duration}ms ease`,
          zIndex: index === displayIndex.value ? 1 : 0
        }
      }

      // 3D 模式
      if (is3D.value) {
        const offset = index - displayIndex.value
        const absOffset = Math.abs(offset)
        
        // 显示前后各2张
        if (absOffset > 2) {
          return { opacity: 0, pointerEvents: 'none' as const }
        }

        const rotateY = offset * 45
        const translateZ = -absOffset * 200
        const scale = 1 - absOffset * 0.15
        const opacity = Math.max(1 - absOffset * 0.25, 0.5)

        return {
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '100%',
          height: '100%',
          transform: `translateX(-50%) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
          opacity,
          zIndex: displaySlides.value.length - absOffset,
          transition: `transform ${props.duration}ms ease, opacity ${props.duration}ms ease`,
          cursor: offset !== 0 ? 'pointer' : 'default',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }
      }

      // Slide 模式
      return {
        flex: '0 0 100%',
        width: '100%',
        height: '100%'
      }
    }

    // === 方法 ===
    
    const updateWidth = () => {
      if (containerRef.value) {
        containerWidth.value = containerRef.value.offsetWidth
        updateTranslate()
      }
    }

    const updateTranslate = () => {
      translateX.value = -displayIndex.value * containerWidth.value
    }

    const goTo = (index: number) => {
      if (!props.items.length) return

      let target = index
      
      if (props.loop) {
        if (index < 0) target = props.items.length - 1
        else if (index >= props.items.length) target = 0
      } else {
        target = Math.max(0, Math.min(index, props.items.length - 1))
      }

      if (target === currentIndex.value) return
      
      currentIndex.value = target
      isPlaying.value = true
      updateTranslate()
      
      emit('update:modelValue', target)
      emit('change', target, props.items[target])
    }

    const next = () => goTo(currentIndex.value + 1)
    const prev = () => goTo(currentIndex.value - 1)

    const updateTranslate = () => {
      if (isFade.value || is3D.value) return
      
      let index = currentIndex.value
      if (props.loop) index += 1
      
      translateX.value = -index * containerWidth.value
    }

    // 处理循环边界跳转
    const handleLoopBoundary = () => {
      if (!props.loop || isFade.value || is3D.value) return
      
      // 从最后一张跳到第一张
      if (currentIndex.value === 0 && translateX.value > -containerWidth.value) {
        isPlaying.value = false
        translateX.value = -props.items.length * containerWidth.value
      }
      // 从第一张跳到最后一张
      else if (currentIndex.value === props.items.length - 1 && translateX.value < -(props.items.length) * containerWidth.value) {
        isPlaying.value = false
        translateX.value = -containerWidth.value
      }
    }

    // === 自动播放 ===
    
    const startAutoplay = () => {
      if (!props.autoplay || props.items.length <= 1) return
      stopAutoplay()
      
      timer = window.setInterval(() => {
        next()
      }, props.interval)
    }

    const stopAutoplay = () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }

    // === 事件处理 ===
    
    const onTransitionEnd = () => {
      isPlaying.value = false
      handleLoopBoundary()
    }

    // 触摸事件
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      startX = touch.clientX
      startY = touch.clientY
      isDragging.value = true
      stopAutoplay()
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.value) return
      
      const touch = e.touches[0]
      const diffX = touch.clientX - startX
      const diffY = touch.clientY - startY
      
      // 水平滑动优先
      if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault()
        dragOffset.value = diffX
      }
    }

    const onTouchEnd = () => {
      if (!isDragging.value) return
      
      const threshold = containerWidth.value * 0.2
      const diff = dragOffset.value
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) prev()
        else next()
      }
      
      dragOffset.value = 0
      isDragging.value = false
      
      if (props.autoplay) startAutoplay()
    }

    // 幻灯片点击
    const onSlideClick = (index: number) => {
      if (is3D.value && index !== displayIndex.value) {
        const targetIndex = props.loop ? index - 1 : index
        if (targetIndex >= 0 && targetIndex < props.items.length) {
          goTo(targetIndex)
        }
      }
      emit('click', index, displaySlides.value[index])
    }

    // === 生命周期 ===
    
    watch(() => props.modelValue, (val) => {
      if (val !== currentIndex.value) {
        goTo(val)
      }
    })

    watch(() => props.autoplay, (val) => {
      if (val) startAutoplay()
      else stopAutoplay()
    })

    onMounted(() => {
      nextTick(() => {
        updateWidth()
        if (props.autoplay) startAutoplay()
      })
      
      window.addEventListener('resize', updateWidth)
    })

    onUnmounted(() => {
      stopAutoplay()
      window.removeEventListener('resize', updateWidth)
    })

    return {
      containerRef,
      currentIndex,
      displaySlides,
      carouselClasses,
      containerStyle,
      trackStyle,
      imageStyle,
      getSlideStyle,
      goTo,
      next,
      prev,
      onTransitionEnd,
      handleLoopBoundary,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onSlideClick
    }
  }
})
</script>

<style lang="less">
.ho-carousel-v2 {
  position: relative;
  width: 100%;
  overflow: hidden;

  &__container {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    
    .is-3d & {
      transform-style: preserve-3d;
    }
  }

  &__track {
    display: flex;
    height: 100%;
    will-change: transform;
    
    .is-fade &,
    .is-3d & {
      position: relative;
    }
  }

  &__slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    
    .is-fade &,
    .is-3d & {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &__indicators {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 12px;
    display: flex;
    gap: 8px;
    z-index: 10;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.7);
    }

    &.is-active {
      width: 20px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.95);
    }
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
    z-index: 10;

    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }

    &--prev {
      left: 12px;
    }

    &--next {
      right: 12px;
    }
  }
}
</style>
