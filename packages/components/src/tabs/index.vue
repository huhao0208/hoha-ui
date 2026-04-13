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
        <!-- 标签项 -->
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
          <!-- 数字徽标 -->
          <span
            v-if="tab.badge !== undefined && tab.badge !== null"
            class="ho-tabs__badge"
          >
            {{ tab.badge > 99 ? '99+' : tab.badge }}
          </span>
          <!-- 红点徽标 -->
          <span
            v-else-if="tab.dot"
            class="ho-tabs__dot"
          />
        </div>
        <!-- 滑动指示器 -->
        <div
          v-if="animated"
          class="ho-tabs__indicator"
          :style="indicatorStyle"
        />
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
        <slot :name="tab.id || index" :tab="tab" :index="index">
          {{ tab.content }}
        </slot>
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
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      default: 0
    },
    tabs: {
      type: Array as PropType<TabItem[]>,
      required: true,
      default: () => []
    },
    sticky: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    },
    swipeable: {
      type: Boolean,
      default: false
    },
    threshold: {
      type: Number,
      default: 0.3
    }
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
    
    // 手势状态
    const touchState = ref({
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0,
      direction: '' as '' | 'horizontal' | 'vertical',
      startTime: 0
    })
    
    // 计算指示器样式
    const indicatorStyle = computed(() => ({
      width: `${indicatorWidth.value}px`,
      transform: `translateX(${indicatorLeft.value}px)`
    }))
    
    // 更新指示器位置
    const updateIndicator = async () => {
      await nextTick()
      if (!navWrapRef.value) return
      
      const activeTab = navWrapRef.value.querySelectorAll('.ho-tabs__tab')[activeIndex.value]
      if (activeTab) {
        indicatorWidth.value = activeTab.offsetWidth
        indicatorLeft.value = (activeTab as HTMLElement).offsetLeft
      }
    }
    
    // 检查是否需要滚动
    const checkScrollable = () => {
      if (!navRef.value || !navWrapRef.value) return
      scrollable.value = navWrapRef.value.scrollWidth > navRef.value.offsetWidth
    }
    
    // 滚动到活动标签
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
    
    // 初始化活动索引
    const initActiveIndex = () => {
      if (typeof props.modelValue === 'number') {
        activeIndex.value = props.modelValue
      } else if (typeof props.modelValue === 'string') {
        const index = props.tabs.findIndex(tab => tab.id === props.modelValue)
        activeIndex.value = index >= 0 ? index : 0
      }
    }
    
    // 切换标签
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
    
    // 点击标签
    const handleTabClick = (index: number, tab: TabItem) => {
      if (tab.disabled) {
        emit('disabled-click', index)
        return
      }
      switchTab(index)
    }
    
    // 触摸开始
    const onTouchStart = (e: TouchEvent) => {
      if (!props.swipeable) return
      touchState.value = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        offsetX: 0,
        offsetY: 0,
        direction: '',
        startTime: Date.now()
      }
    }
    
    // 触摸移动
    const onTouchMove = (e: TouchEvent) => {
      if (!props.swipeable || !touchState.value.startX) return
      
      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const offsetX = currentX - touchState.value.startX
      const offsetY = currentY - touchState.value.startY
      
      // 判断滑动方向
      if (!touchState.value.direction) {
        touchState.value.direction = Math.abs(offsetX) > Math.abs(offsetY) ? 'horizontal' : 'vertical'
      }
      
      // 阻止垂直滚动
      if (touchState.value.direction === 'horizontal') {
        e.preventDefault()
      }
      
      touchState.value.offsetX = offsetX
      touchState.value.offsetY = offsetY
    }
    
    // 触摸结束
    const onTouchEnd = () => {
      if (!props.swipeable || !touchState.value.startX) return
      
      const { offsetX, startTime } = touchState.value
      const duration = Date.now() - startTime
      const velocity = Math.abs(offsetX) / duration
      const threshold = props.threshold * (navRef.value?.offsetWidth || 0)
      
      // 判断是否触发切换
      if (touchState.value.direction === 'horizontal') {
        if (Math.abs(offsetX) > threshold || velocity > 0.3) {
          if (offsetX > 0 && activeIndex.value > 0) {
            // 向右滑动，切换到上一个
            switchTab(activeIndex.value - 1, 'right')
          } else if (offsetX < 0 && activeIndex.value < props.tabs.length - 1) {
            // 向左滑动，切换到下一个
            switchTab(activeIndex.value + 1, 'left')
          }
        }
      }
      
      // 重置状态
      touchState.value = {
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0,
        direction: '',
        startTime: 0
      }
    }
    
    // 内容区域触摸事件
    const onContentTouchStart = (e: TouchEvent) => onTouchStart(e)
    const onContentTouchMove = (e: TouchEvent) => onTouchMove(e)
    const onContentTouchEnd = () => onTouchEnd()
    
    // 监听 modelValue 变化
    watch(() => props.modelValue, () => {
      initActiveIndex()
      updateIndicator()
      scrollIntoView()
    })
    
    // 监听 tabs 变化
    watch(() => props.tabs, () => {
      checkScrollable()
      updateIndicator()
    }, { deep: true })
    
    onMounted(() => {
      initActiveIndex()
      checkScrollable()
      updateIndicator()
      
      // 监听窗口大小变化
      window.addEventListener('resize', () => {
        checkScrollable()
        updateIndicator()
      })
    })
    
    // 提供给子组件
    provide('tabs', {
      activeIndex,
      switchTab
    })
    
    return {
      navRef,
      navWrapRef,
      contentRef,
      activeIndex,
      scrollable,
      indicatorStyle,
      handleTabClick,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onContentTouchStart,
      onContentTouchMove,
      onContentTouchEnd
    }
  }
})
</script>
