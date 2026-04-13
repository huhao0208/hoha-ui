<template>
  <div
    ref="imageRef"
    :class="imageClasses"
    :style="imageStyle"
  >
    <!-- 加载中占位 -->
    <div
      v-if="showLoading && (loading || !imageLoaded)"
      class="ho-image__placeholder"
    >
      <slot name="loading">
        <div class="ho-image__loading">
          <div class="ho-image__loading-spinner" />
        </div>
      </slot>
    </div>

    <!-- 错误状态 -->
    <div
      v-if="showError && hasError"
      class="ho-image__error"
    >
      <slot name="error">
        <div class="ho-image__error-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 8l8 8M16 8l-8 8" />
          </svg>
        </div>
        <span class="ho-image__error-text">加载失败</span>
      </slot>
    </div>

    <!-- 图片 -->
    <img
      v-if="shouldRender && !hasError"
      ref="imgRef"
      :src="currentSrc"
      :alt="alt"
      :class="imgClasses"
      :style="imgStyle"
      @load="handleLoad"
      @error="handleError"
    >

    <!-- 预览遮罩 -->
    <div
      v-if="preview && isPreviewVisible"
      class="ho-image__preview-mask"
      @click="handlePreviewClose"
      @touchstart="handlePreviewTouchStart"
    >
      <!-- 关闭按钮 -->
      <div
        class="ho-image__preview-close"
        @click.stop="handlePreviewClose"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </div>

      <!-- 预览图片容器 -->
      <div
        ref="previewContainerRef"
        class="ho-image__preview-container"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <img
          :src="currentSrc"
          :alt="alt"
          class="ho-image__preview-img"
          :style="previewImgStyle"
          @load="handlePreviewLoad"
        >
      </div>

      <!-- 缩放控制 -->
      <div
        v-if="showZoomControls"
        class="ho-image__preview-controls"
      >
        <button
          class="ho-image__preview-btn"
          @click.stop="handleZoomOut"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35M8 11h6" />
          </svg>
        </button>
        <span class="ho-image__preview-scale">{{ Math.round(previewScale * 100) }}%</span>
        <button
          class="ho-image__preview-btn"
          @click.stop="handleZoomIn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { PropType, CSSProperties } from 'vue'

type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export default defineComponent({
  name: 'HoImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: false
    },
    fit: {
      type: String as PropType<ImageFit>,
      default: 'cover'
    },
    width: {
      type: [String, Number],
      default: undefined
    },
    height: {
      type: [String, Number],
      default: undefined
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    radius: {
      type: [String, Number],
      default: undefined
    },
    preview: {
      type: Boolean,
      default: false
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    showError: {
      type: Boolean,
      default: true
    },
    showZoomControls: {
      type: Boolean,
      default: true
    },
    minZoom: {
      type: Number,
      default: 0.5
    },
    maxZoom: {
      type: Number,
      default: 3
    }
  },
  emits: ['load', 'error', 'preview-open', 'preview-close'],
  setup(props, { emit }) {
    const imageRef = ref<HTMLDivElement>()
    const imgRef = ref<HTMLImageElement>()
    const previewContainerRef = ref<HTMLDivElement>()

    const loading = ref(false)
    const imageLoaded = ref(false)
    const hasError = ref(false)
    const isPreviewVisible = ref(false)
    const shouldRender = ref(!props.lazy)
    const currentSrc = ref(props.lazy ? '' : props.src)

    // 预览缩放状态
    const previewScale = ref(1)
    const translateX = ref(0)
    const translateY = ref(0)

    // 触摸状态
    const touchStartX = ref(0)
    const touchStartY = ref(0)
    const lastTouchDistance = ref(0)
    const isPinching = ref(false)

    // IntersectionObserver 实例
    let observer: IntersectionObserver | null = null

    // 计算样式
    const imageClasses = computed(() => [
      'ho-image',
      {
        'ho-image--round': props.round && !props.circle,
        'ho-image--circle': props.circle,
        'ho-image--loading': loading.value,
        'ho-image--error': hasError.value
      }
    ])

    const imageStyle = computed<CSSProperties>(() => {
      const style: CSSProperties = {}

      if (props.width !== undefined) {
        style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
      }
      if (props.height !== undefined) {
        style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
      }

      if (props.radius !== undefined) {
        style.borderRadius = typeof props.radius === 'number' ? `${props.radius}px` : props.radius
      }

      return style
    })

    const imgClasses = computed(() => [
      'ho-image__img',
      `ho-image__img--${props.fit}`
    ])

    const imgStyle = computed<CSSProperties>(() => ({}))

    const previewImgStyle = computed<CSSProperties>(() => ({
      transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${previewScale.value})`,
      transformOrigin: 'center center'
    }))

    // 处理加载
    const handleLoad = (e: Event) => {
      loading.value = false
      imageLoaded.value = true
      hasError.value = false
      emit('load', e)
    }

    // 处理错误
    const handleError = (e: Event) => {
      loading.value = false
      hasError.value = true
      emit('error', e)
    }

    // 打开预览
    const openPreview = () => {
      if (!props.preview) return
      
      isPreviewVisible.value = true
      previewScale.value = 1
      translateX.value = 0
      translateY.value = 0

      // 禁止页面滚动
      document.body.style.overflow = 'hidden'
      emit('preview-open')
    }

    // 关闭预览
    const handlePreviewClose = () => {
      isPreviewVisible.value = false
      // 恢复页面滚动
      document.body.style.overflow = ''
      emit('preview-close')
    }

    // 预览图片加载
    const handlePreviewLoad = () => {
      // 预览图片加载完成
    }

    // 缩放功能
    const handleZoomIn = () => {
      previewScale.value = Math.min(props.maxZoom, previewScale.value + 0.25)
    }

    const handleZoomOut = () => {
      previewScale.value = Math.max(props.minZoom, previewScale.value - 0.25)
    }

    // 触摸开始
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX.value = e.touches[0].clientX
        touchStartY.value = e.touches[0].clientY
      } else if (e.touches.length === 2) {
        isPinching.value = true
        lastTouchDistance.value = getTouchDistance(e.touches)
      }
    }

    // 触摸移动
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()

      if (e.touches.length === 1 && !isPinching.value) {
        // 单指拖动
        const deltaX = e.touches[0].clientX - touchStartX.value
        const deltaY = e.touches[0].clientY - touchStartY.value

        translateX.value += deltaX
        translateY.value += deltaY

        touchStartX.value = e.touches[0].clientX
        touchStartY.value = e.touches[0].clientY
      } else if (e.touches.length === 2) {
        // 双指缩放
        const distance = getTouchDistance(e.touches)
        const scale = distance / lastTouchDistance.value

        previewScale.value = Math.max(props.minZoom, Math.min(props.maxZoom, previewScale.value * scale))
        lastTouchDistance.value = distance
      }
    }

    // 触摸结束
    const handleTouchEnd = () => {
      isPinching.value = false
    }

    // 计算两指距离
    const getTouchDistance = (touches: TouchList): number => {
      return Math.hypot(
        touches[1].clientX - touches[0].clientX,
        touches[1].clientY - touches[0].clientY
      )
    }

    // 预览遮罩触摸（用于滑动关闭）
    const handlePreviewTouchStart = (e: TouchEvent) => {
      // 如果触摸在图片容器外，允许滑动关闭
      const target = e.target as HTMLElement
      if (target.classList.contains('ho-image__preview-mask')) {
        // 可以在这里实现滑动关闭功能
      }
    }

    // 初始化懒加载
    const initLazyLoad = () => {
      if (!props.lazy || !imageRef.value) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              shouldRender.value = true
              currentSrc.value = props.src
              loading.value = true

              // 停止观察
              observer?.disconnect()
            }
          })
        },
        {
          rootMargin: '50px'
        }
      )

      observer.observe(imageRef.value)
    }

    // 监听 src 变化
    watch(() => props.src, (newSrc) => {
      hasError.value = false
      imageLoaded.value = false
      if (!props.lazy) {
        currentSrc.value = newSrc
        loading.value = true
      }
    })

    // 生命周期
    onMounted(() => {
      if (props.lazy) {
        initLazyLoad()
      } else {
        loading.value = true
      }

      // 点击图片打开预览
      if (props.preview && imgRef.value) {
        imgRef.value.addEventListener('click', openPreview)
      }
    })

    onUnmounted(() => {
      observer?.disconnect()
      document.body.style.overflow = ''

      if (imgRef.value) {
        imgRef.value.removeEventListener('click', openPreview)
      }
    })

    // 监听 imgRef 变化，添加点击事件
    watch(imgRef, (newImgRef, oldImgRef) => {
      if (oldImgRef) {
        oldImgRef.removeEventListener('click', openPreview)
      }
      if (newImgRef && props.preview) {
        newImgRef.addEventListener('click', openPreview)
      }
    })

    return {
      imageRef,
      imgRef,
      previewContainerRef,
      loading,
      imageLoaded,
      hasError,
      isPreviewVisible,
      shouldRender,
      currentSrc,
      previewScale,
      imageClasses,
      imageStyle,
      imgClasses,
      imgStyle,
      previewImgStyle,
      handleLoad,
      handleError,
      handlePreviewClose,
      handlePreviewLoad,
      handleZoomIn,
      handleZoomOut,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      handlePreviewTouchStart
    }
  }
})
</script>

<style lang="less">
.ho-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;

  &--round {
    border-radius: var(--hoho-radius-lg);
  }

  &--circle {
    border-radius: 50%;
  }
}

.ho-image__img {
  display: block;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;

  &--contain {
    object-fit: contain;
  }

  &--cover {
    object-fit: cover;
  }

  &--fill {
    object-fit: fill;
  }

  &--none {
    object-fit: none;
  }

  &--scale-down {
    object-fit: scale-down;
  }
}

.ho-image__placeholder,
.ho-image__error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--hoho-bg-secondary);
}

.ho-image__loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ho-image__loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--hoho-border-secondary);
  border-top-color: var(--hoho-color-primary);
  border-radius: 50%;
  animation: hoho-image-spin 0.8s linear infinite;
}

@keyframes hoho-image-spin {
  to { transform: rotate(360deg); }
}

.ho-image__error {
  flex-direction: column;
  gap: 8px;
}

.ho-image__error-icon {
  width: 48px;
  height: 48px;
  color: var(--hoho-text-placeholder);
}

.ho-image__error-icon svg {
  width: 100%;
  height: 100%;
}

.ho-image__error-text {
  font-size: 14px;
  color: var(--hoho-text-placeholder);
}

/* 预览样式 */
.ho-image__preview-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background: var(--hoho-bg-mask);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: hoho-image-preview-in 0.3s ease;
}

@keyframes hoho-image-preview-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.ho-image__preview-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.ho-image__preview-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.ho-image__preview-close svg {
  width: 24px;
  height: 24px;
  color: white;
}

.ho-image__preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ho-image__preview-img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  transition: transform 0.1s ease;
  cursor: grab;
}

.ho-image__preview-img:active {
  cursor: grabbing;
}

.ho-image__preview-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.ho-image__preview-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
  border-radius: 50%;
}

.ho-image__preview-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.ho-image__preview-btn:active {
  background: rgba(255, 255, 255, 0.2);
}

.ho-image__preview-btn svg {
  width: 20px;
  height: 20px;
}

.ho-image__preview-scale {
  font-size: 14px;
  color: white;
  min-width: 48px;
  text-align: center;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .ho-image__loading-spinner {
    width: 40px;
    height: 40px;
    border-width: 4px;
  }

  .ho-image__error-icon {
    width: 56px;
    height: 56px;
  }

  .ho-image__error-text {
    font-size: 16px;
  }

  .ho-image__preview-close {
    top: calc(16px + var(--hoho-safe-area-top));
    right: 16px;
    width: 48px;
    height: 48px;
  }

  .ho-image__preview-close svg {
    width: 28px;
    height: 28px;
  }

  .ho-image__preview-img {
    max-width: 95%;
    max-height: 85%;
  }

  .ho-image__preview-controls {
    bottom: calc(20px + var(--hoho-safe-area-bottom));
    padding: 12px 20px;
    gap: 20px;
  }

  .ho-image__preview-btn {
    width: 44px;
    height: 44px;
  }

  .ho-image__preview-btn svg {
    width: 24px;
    height: 24px;
  }

  .ho-image__preview-scale {
    font-size: 16px;
    min-width: 56px;
  }
}

/* 暗色模式 */
html.dark {
  .ho-image__placeholder,
  .ho-image__error {
    background: var(--hoho-bg-tertiary);
  }

  .ho-image__loading-spinner {
    border-color: var(--hoho-border-primary);
    border-top-color: var(--hoho-color-primary);
  }

  .ho-image__error-icon {
    color: var(--hoho-text-tertiary);
  }

  .ho-image__error-text {
    color: var(--hoho-text-tertiary);
  }
}
</style>
