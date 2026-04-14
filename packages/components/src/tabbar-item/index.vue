<template>
  <component
    :is="componentTag"
    :class="tabBarItemClasses"
    :to="to"
    :style="itemStyle"
    @click="handleClick"
  >
    <!-- 徽标 -->
    <div v-if="showBadge" class="ho-tabbar-item__badge" :class="badgeClasses">
      {{ badgeContent }}
    </div>

    <!-- 图标区域 -->
    <div class="ho-tabbar-item__icon">
      <slot v-if="$slots.icon" name="icon" :active="isActive" />
      <ho-icon
        v-else-if="icon"
        :name="icon"
        :size="24"
        :color="currentColor"
      />
      <slot v-else />

      <!-- 红点徽标 -->
      <div v-if="dot && !badge" class="ho-tabbar-item__dot" />
    </div>

    <!-- 文字 -->
    <div class="ho-tabbar-item__text">
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref, type PropType, type Component } from 'vue'
import HoIcon from '../icon/index.vue'
import { TABBAR_KEY, type TabBarProvider } from '../tabbar/index.vue'

// 动态导入 RouterLink
let RouterLink: Component | null = null
try {
  RouterLink = require('vue-router').RouterLink
} catch { /* ignore */ }

export default defineComponent({
  name: 'HoTabBarItem',
  components: { HoIcon },
  props: {
    name: { type: [Number, String] as PropType<number | string>, default: undefined },
    icon: { type: String, default: '' },
    dot: { type: Boolean, default: false },
    badge: { type: [Number, String] as PropType<number | string>, default: '' },
    to: { type: [String, Object] as PropType<string | Record<string, unknown>>, default: '' },
    url: { type: String, default: '' },
    replace: { type: Boolean, default: false }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const tabbar = inject<TabBarProvider>(TABBAR_KEY)
    
    // 获取自动分配的索引
    const autoIndex = ref(tabbar?.getNextIndex() ?? 0)
    
    // name 未设置时使用自动索引
    const itemName = computed(() => {
      if (props.name !== undefined) return props.name
      return autoIndex.value
    })

    const isActive = computed(() => tabbar?.active.value === itemName.value)
    
    const currentColor = computed(() => 
      isActive.value 
        ? 'var(--hoho-color-primary, #3b82f6)' 
        : 'var(--hoho-text-tertiary, #6b7280)'
    )

    const showBadge = computed(() => !!props.badge && props.badge !== 0)
    
    const badgeContent = computed(() => {
      if (!props.badge) return ''
      const num = Number(props.badge)
      return isNaN(num) ? String(props.badge) : (num > 99 ? '99+' : num.toString())
    })

    const badgeClasses = computed(() => ({
      'ho-tabbar-item__badge--large': badgeContent.value.length > 1
    }))

    const componentTag = computed(() => {
      if (props.to && RouterLink) return RouterLink
      if (props.url) return 'a'
      return 'div'
    })

    const itemStyle = computed(() => ({
      color: isActive.value 
        ? 'var(--hoho-color-primary, #3b82f6)' 
        : 'var(--hoho-text-secondary, #4b5563)'
    }))

    const tabBarItemClasses = computed(() => [
      'ho-tabbar-item',
      { 'ho-tabbar-item--active': isActive.value }
    ])

    const handleClick = (event: MouseEvent) => {
      if (!props.to && !props.url) {
        event.preventDefault()
        tabbar?.setActive(itemName.value)
      }
      emit('click', event)
      if (props.url) {
        props.replace ? window.location.replace(props.url) : (window.location.href = props.url)
      }
    }

    return {
      isActive, currentColor, showBadge, badgeContent, badgeClasses,
      componentTag, itemStyle, tabBarItemClasses, handleClick
    }
  }
})
</script>

<style lang="less">
.ho-tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  color: var(--hoho-text-secondary, #4b5563);
  transition: var(--hoho-duration-fast, 0.15s) var(--hoho-ease, ease);
  position: relative;
  /* 移动端最小点击区域 */
  min-height: var(--hoho-touch-target, 44px);
  padding: var(--hoho-spacing-xs, 6px) 0;

  &--active {
    color: var(--hoho-color-primary, #3b82f6);
  }

  &__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--hoho-spacing-xs, 4px);
    font-size: var(--hoho-font-xl, 22px);
  }

  &__text {
    font-size: var(--hoho-font-xs, 10px);
    line-height: var(--hoho-line-height-tight, 1.2);
    text-align: center;
    white-space: nowrap;
  }

  &__badge {
    position: absolute;
    top: -4px;
    right: -8px;
    min-width: 14px;
    height: 14px;
    padding: 0 3px;
    font-size: 10px;
    font-weight: var(--hoho-font-medium, 500);
    line-height: 14px;
    text-align: center;
    color: #fff;
    background: var(--hoho-color-danger, #ef4444);
    border-radius: var(--hoho-radius-full, 7px);
    box-sizing: border-box;
    z-index: 1;

    &--large {
      padding: 0 4px;
      min-width: 16px;
    }
  }

  &__dot {
    position: absolute;
    top: -1px;
    right: 0;
    width: 6px;
    height: 6px;
    background: var(--hoho-color-danger, #ef4444);
    border-radius: 50%;
    z-index: 1;
  }
}

/* 触摸反馈 */
.ho-tabbar-item:active {
  opacity: 0.7;
  background: var(--hoho-bg-tertiary, #f3f4f6);
}

/* 移动端适配 */
@media screen and (max-width: 767px) {
  .ho-tabbar-item {
    padding: 6px 0;
    min-height: 50px;

    &__icon {
      margin-bottom: 2px;
      font-size: var(--hoho-font-2xl, 24px);
    }

    &__text {
      font-size: var(--hoho-font-xs, 10px);
    }
  }
}

/* 暗色模式 */
html.dark .ho-tabbar-item {
  color: var(--hoho-text-secondary, #e5e7eb);

  &--active {
    color: var(--hoho-color-primary, #60a5fa);
  }
  
  &:active {
    background: var(--hoho-bg-tertiary, #374151);
  }
}
</style>
