<template>
  <div class="ho-tabs" :class="{ 'ho-tabs--sticky': sticky }">
    <!-- 标签导航 -->
    <div
      ref="navRef"
      class="ho-tabs__nav"
      :class="{ 'ho-tabs__nav--scrollable': scrollable }"
    >
      <div
        ref="navWrapRef"
        class="ho-tabs__nav-wrap"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div
          v-for="(tab, index) in tabs"
          :key="tab.id || index"
          class="ho-tabs__tab"
          :class="{
            'ho-tabs__tab--active': activeIndex === index,
            'ho-tabs__tab--disabled': tab.disabled
          }"
          @click="handleTabClick(index, tab)"
        >
          <span class="ho-tabs__tab-title">{{ tab.title }}</span>
          <span v-if="tab.badge !== undefined && tab.badge !== null" class="ho-tabs__badge">
            {{ tab.badge > 99 ? '99+' : tab.badge }}
          </span>
          <span v-else-if="tab.dot" class="ho-tabs__dot" />
        </div>
        <div v-if="animated" class="ho-tabs__indicator" :style="indicatorStyle" />
      </div>
    </div>

    <!-- 内容区域 -->
    <div
      ref="contentRef"
      class="ho-tabs__content"
      :class="{ 'ho-tabs__content--animated': animated }"
      @touchstart="onContentTouchStart"
      @touchmove="onContentTouchMove"
      @touchend="onContentTouchEnd"
    >
      <div
        v-for="(tab, index) in tabs"
        :key="tab.id || `content-${index}`"
        class="ho-tabs__pane"
        :class="{ 'ho-tabs__pane--active': activeIndex === index }"
      >
        <slot :name="tab.id || index" :tab="tab" :index="index">{{ tab.content }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, provide, onMounted, nextTick } from 'vue'
import type { PropType } from 'vue'

interface TabItem {
  id?: string | number
  title: string
  badge?: number | string
  dot?: boolean
  disabled?: boolean
  content?: string
}

export default defineComponent({
  name: 'HoTabs',
  props: {
    modelValue: { type: [String, Number] as PropType<string | number>, default: 0 },
    tabs: { type: Array as PropType<TabItem[]>, required: true, default: () => [] },
    sticky: { type: Boolean, default: false },
    animated: { type: Boolean, default: true },
    swipeable: { type: Boolean, default: false },
    threshold: { type: Number, default: 0.3 }
  },
  emits: ['update:modelValue', 'change', 'disabled-click'],
  setup(props, { emit }) {
    const navRef = ref<HTMLElement | null>(null)
    const navWrapRef = ref<HTMLElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)
    
    const activeIndex = ref<number>(0)
    const scrollable = ref<boolean>(false)
    const indicatorWidth = ref<number>(0)
    const indicatorLeft = ref<number>(0)
    
    const touchState = ref({
      startX: 0, startY: 0, offsetX: 0, offsetY: 0,
      direction: '' as '' | 'horizontal' | 'vertical', startTime: 0
    })
    
    const indicatorStyle = computed(() => ({
      width: `${indicatorWidth.value}px`,
      transform: `translateX(${indicatorLeft.value}px)`
    }))
    
    const updateIndicator = async () => {
      await nextTick()
      if (!navWrapRef.value) return
      const activeTab = navWrapRef.value.querySelectorAll('.ho-tabs__tab')[activeIndex.value]
      if (activeTab) {
        indicatorWidth.value = activeTab.offsetWidth
        indicatorLeft.value = (activeTab as HTMLElement).offsetLeft
      }
    }
    
    const checkScrollable = () => {
      if (!navRef.value || !navWrapRef.value) return
      scrollable.value = navWrapRef.value.scrollWidth > navRef.value.offsetWidth
    }
    
    const scrollIntoView = async () => {
      await nextTick()
      if (!navRef.value || !navWrapRef.value) return
      const activeTab = navWrapRef.value.querySelectorAll('.ho-tabs__tab')[activeIndex.value]
      if (activeTab) {
        const navRect = navRef.value.getBoundingClientRect()
        const tabRect = (activeTab as HTMLElement).getBoundingClientRect()
        if (tabRect.left < navRect.left) {
          navRef.value.scrollLeft -= navRect.left - tabRect.left
        } else if (tabRect.right > navRect.right) {
          navRef.value.scrollLeft += tabRect.right - navRect.right
        }
      }
    }
    
    const initActiveIndex = () => {
      if (typeof props.modelValue === 'number') {
        activeIndex.value = props.modelValue
      } else if (typeof props.modelValue === 'string') {
        const index = props.tabs.findIndex(tab => tab.id === props.modelValue)
        activeIndex.value = index >= 0 ? index : 0
      }
    }
    
    const switchTab = (index: number, direction?: 'left' | 'right') => {
      if (index < 0 || index >= props.tabs.length) return
      if (props.tabs[index].disabled) {
        emit('disabled-click', index)
        return
      }
      activeIndex.value = index
      const tab = props.tabs[index]
      const value = tab.id !== undefined ? tab.id : index
      emit('update:modelValue', value)
      emit('change', { index, tab, direction })
      updateIndicator()
      scrollIntoView()
    }
    
    const handleTabClick = (index: number, tab: TabItem) => {
      if (tab.disabled) {
        emit('disabled-click', index)
        return
      }
      switchTab(index)
    }
    
    const onTouchStart = (e: TouchEvent) => {
      if (!props.swipeable) return
      touchState.value = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        offsetX: 0, offsetY: 0, direction: '', startTime: Date.now()
      }
    }
    
    const onTouchMove = (e: TouchEvent) => {
      if (!props.swipeable || !touchState.value.startX) return
      const offsetX = e.touches[0].clientX - touchState.value.startX
      const offsetY = e.touches[0].clientY - touchState.value.startY
      if (!touchState.value.direction) {
        touchState.value.direction = Math.abs(offsetX) > Math.abs(offsetY) ? 'horizontal' : 'vertical'
      }
      if (touchState.value.direction === 'horizontal') e.preventDefault()
      touchState.value.offsetX = offsetX
      touchState.value.offsetY = offsetY
    }
    
    const onTouchEnd = () => {
      if (!props.swipeable || !touchState.value.startX) return
      const { offsetX, startTime } = touchState.value
      const duration = Date.now() - startTime
      const velocity = Math.abs(offsetX) / duration
      const threshold = props.threshold * (navRef.value?.offsetWidth || 0)
      
      if (touchState.value.direction === 'horizontal') {
        if (Math.abs(offsetX) > threshold || velocity > 0.3) {
          if (offsetX > 0 && activeIndex.value > 0) {
            switchTab(activeIndex.value - 1, 'right')
          } else if (offsetX < 0 && activeIndex.value < props.tabs.length - 1) {
            switchTab(activeIndex.value + 1, 'left')
          }
        }
      }
      touchState.value = { startX: 0, startY: 0, offsetX: 0, offsetY: 0, direction: '', startTime: 0 }
    }
    
    const onContentTouchStart = (e: TouchEvent) => onTouchStart(e)
    const onContentTouchMove = (e: TouchEvent) => onTouchMove(e)
    const onContentTouchEnd = () => onTouchEnd()
    
    watch(() => props.modelValue, () => { initActiveIndex(); updateIndicator(); scrollIntoView() })
    watch(() => props.tabs, () => { checkScrollable(); updateIndicator() }, { deep: true })
    
    onMounted(() => {
      initActiveIndex()
      checkScrollable()
      updateIndicator()
      window.addEventListener('resize', () => { checkScrollable(); updateIndicator() })
    })
    
    provide('tabs', { activeIndex, switchTab })
    
    return {
      navRef, navWrapRef, contentRef, activeIndex, scrollable, indicatorStyle,
      handleTabClick, onTouchStart, onTouchMove, onTouchEnd,
      onContentTouchStart, onContentTouchMove, onContentTouchEnd
    }
  }
})
</script>

<style lang="less">
.ho-tabs {
  position: relative;
  
  &--sticky {
    .ho-tabs__nav {
      position: sticky;
      top: 0;
      z-index: var(--hoho-z-sticky, 20);
    }
  }
  
  &__nav {
    background: var(--hoho-bg-primary, #fff);
    position: relative;
    
    &--scrollable {
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  
  &__nav-wrap {
    display: flex;
    position: relative;
    min-width: 100%;
  }
  
  &__tab {
    flex: 1;
    min-width: 0;
    padding: var(--hoho-spacing-3, 0.75rem) var(--hoho-spacing-2, 0.5rem);
    font-size: var(--hoho-font-md, 0.875rem);
    color: var(--hoho-text-secondary, #4b5563);
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: color var(--hoho-duration-fast, 150ms) var(--hoho-ease, ease);
    white-space: nowrap;
    
    &--active {
      color: var(--hoho-color-primary, #3b82f6);
      font-weight: var(--hoho-font-medium, 500);
    }
    
    &--disabled {
      color: var(--hoho-text-disabled, #d1d5db);
      cursor: not-allowed;
    }
  }
  
  &__tab-title {
    display: inline-block;
    position: relative;
  }
  
  &__badge {
    position: absolute;
    top: 0;
    right: -0.625rem;
    min-width: var(--hoho-badge-sm, 1rem);
    height: var(--hoho-badge-sm, 1rem);
    padding: 0 0.25rem;
    font-size: 11px;
    font-weight: var(--hoho-font-medium, 500);
    line-height: var(--hoho-badge-sm, 1rem);
    color: #fff;
    background: var(--hoho-color-danger, #ef4444);
    border-radius: var(--hoho-radius-full, 0.5rem);
    box-sizing: border-box;
  }
  
  &__dot {
    position: absolute;
    top: 0.125rem;
    right: -0.25rem;
    width: var(--hoho-badge-dot, 0.5rem);
    height: var(--hoho-badge-dot, 0.5rem);
    background: var(--hoho-color-danger, #ef4444);
    border-radius: 50%;
  }
  
  &__indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0.125rem;
    background: var(--hoho-color-primary, #3b82f6);
    transition: transform var(--hoho-duration-normal, 250ms) var(--hoho-ease, ease);
  }
  
  &__content {
    overflow: hidden;
    
    &--animated {
      display: flex;
      transition: transform var(--hoho-duration-normal, 250ms) var(--hoho-ease, ease);
    }
  }
  
  &__pane {
    flex-shrink: 0;
    width: 100%;
    
    &--active {
      display: block;
    }
  }
}

/* 暗色模式 */
html.dark .ho-tabs__nav {
  background: var(--hoho-bg-primary, #1f2937);
}

/* 移动端适配 */
@media screen and (max-width: 47.9375rem) {
  .ho-tabs__tab {
    padding: var(--hoho-spacing-3, 0.75rem) var(--hoho-spacing-1, 0.25rem);
    font-size: var(--hoho-font-sm, 0.875rem);
  }
}
</style>
