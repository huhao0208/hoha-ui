<template>
  <component
    :is="componentTag"
    :class="tabBarItemClasses"
    :to="to"
    :style="itemStyle"
    @click="handleClick"
  >
    <!-- 徽标 -->
    <div
      v-if="showBadge"
      class="ho-tabbar-item__badge"
      :class="badgeClasses"
    >
      {{ badgeContent }}
    </div>

    <!-- 图标区域 -->
    <div class="ho-tabbar-item__icon">
      <!-- 自定义图标 slot -->
      <slot
        v-if="$slots.icon"
        name="icon"
        :active="isActive"
      />
      <!-- 默认使用 emoji 图标 -->
      <span v-else-if="icon" class="ho-tabbar-item__emoji">{{ emojiIcon }}</span>
      <!-- 默认 slot（图标） -->
      <slot v-else />

      <!-- 红点徽标（在图标上） -->
      <div
        v-if="dot && !badge"
        class="ho-tabbar-item__dot"
      />
    </div>

    <!-- 文字 -->
    <div class="ho-tabbar-item__text">
      <slot name="text">
        {{ title }}
      </slot>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, inject, type PropType, type Component } from 'vue'
// 动态导入 RouterLink（如果 vue-router 可用）
let RouterLink: Component | null = null
try {
  RouterLink = require('vue-router').RouterLink
} catch {
  RouterLink = null
}
import HoIcon from '../icon/index.vue'
import { TABBAR_KEY, type TabBarProvider } from '../tabbar/index.vue'

export default defineComponent({
  name: 'HoTabBarItem',
  components: {
    HoIcon
  },
  props: {
    name: {
      type: [Number, String] as PropType<number | string>,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconPrefix: {
      type: String,
      default: ''
    },
    dot: {
      type: Boolean,
      default: false
    },
    badge: {
      type: [Number, String] as PropType<number | string>,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    to: {
      type: [String, Object] as PropType<string | Record<string, unknown>>,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    replace: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    iconSize: {
      type: [String, Number] as PropType<string | number>,
      default: 22
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    // 注入父组件提供的数据
    const tabbar = inject<TabBarProvider>(TABBAR_KEY)

    if (!tabbar) {
      console.warn('[HoTabBarItem] must be a child of HoTabBar')
    }

    // 计算当前项的唯一标识
    const itemName = computed(() => {
      if (props.name !== '') {
        return props.name
      }
      // 如果没有提供 name，使用索引（这里需要优化）
      return props.name
    })

    // 是否选中
    const isActive = computed(() => {
      return tabbar?.active.value === itemName.value
    })

    // 当前颜色
    const currentColor = computed(() => {
      if (isActive.value) {
        return props.activeColor || ''
      }
      return props.inactiveColor || ''
    })

    const currentIconColor = computed(() => {
      if (isActive.value) {
        return props.activeColor || 'var(--hoho-color-primary)'
      }
      return props.inactiveColor || 'var(--hoho-text-tertiary)'
    })

    // 徽标显示
    const showBadge = computed(() => {
      return !!props.badge && props.badge !== 0
    })

    const badgeContent = computed(() => {
      if (!props.badge) return ''
      const num = Number(props.badge)
      if (isNaN(num)) return props.badge
      return num > 99 ? '99+' : num.toString()
    })

    const badgeClasses = computed(() => ({
      'ho-tabbar-item__badge--large': badgeContent.value.length > 1
    }))

    // 组件标签
    const componentTag = computed(() => {
      if (props.to && RouterLink) {
        return RouterLink
      }
      if (props.url) {
        return 'a'
      }
      return 'div'
    })

    // Emoji 图标映射
    const emojiIconMap: Record<string, string> = {
      home: '🏠',
      search: '🔍',
      user: '👤',
      message: '💬',
      notification: '🔔',
      category: '📁',
      cart: '🛒',
      settings: '⚙️',
      profile: '👤',
      favorite: '❤️'
    }
    
    const emojiIcon = computed(() => emojiIconMap[props.icon] || props.icon)

    // 样式
    const itemStyle = computed(() => ({
      color: currentColor.value
    }))

    const tabBarItemClasses = computed(() => [
      'ho-tabbar-item',
      {
        'ho-tabbar-item--active': isActive.value
      }
    ])

    // 点击事件
    const handleClick = (event: MouseEvent) => {
      if (!props.to && !props.url) {
        event.preventDefault()
        tabbar?.setActive(itemName.value)
      }
      emit('click', event)

      // URL 跳转
      if (props.url) {
        if (props.replace) {
          window.location.replace(props.url)
        } else {
          window.location.href = props.url
        }
      }
    }

    return {
      isActive,
      currentColor,
      currentIconColor,
      showBadge,
      badgeContent,
      badgeClasses,
      componentTag,
      itemStyle,
      tabBarItemClasses,
      emojiIcon,
      handleClick
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
  color: var(--hoho-text-secondary);
  transition: all 0.2s ease;
  position: relative;
  /* 移动端最小点击区域 44px */
  min-height: 44px;
  padding: 6px 0;

  &--active {
    color: var(--hoho-color-primary);
  }

  &__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
    font-size: 22px;
  }

  &__text {
    font-size: 12px;
    line-height: 1.2;
    text-align: center;
    white-space: nowrap;
  }

  &__badge {
    position: absolute;
    top: -8px;
    right: -12px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    font-size: 11px;
    font-weight: 500;
    line-height: 16px;
    text-align: center;
    color: #fff;
    background: var(--hoho-color-danger);
    border-radius: 8px;
    box-sizing: border-box;
    z-index: 1;

    &--large {
      padding: 0 5px;
      min-width: 18px;
    }
  }

  &__dot {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background: var(--hoho-color-danger);
    border-radius: 50%;
    z-index: 1;
  }
  
  &__emoji {
    font-size: 24px;
    line-height: 1;
  }
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .ho-tabbar-item {
    padding: 6px 0;
    min-height: 50px;

    &__icon {
      margin-bottom: 2px;
      font-size: 24px;
    }

    &__text {
      font-size: 10px;
    }

    &__badge {
      min-width: 18px;
      height: 18px;
      font-size: 12px;
      line-height: 18px;
      border-radius: 9px;

      &--large {
        padding: 0 6px;
        min-width: 20px;
      }
    }

    &__dot {
      width: 8px;
      height: 8px;
      top: -1px;
      right: -1px;
    }
  }
}

/* 暗色模式 */
html.dark .ho-tabbar-item {
  color: var(--hoho-text-secondary);

  &--active {
    color: var(--hoho-color-primary);
  }
}

/* 触摸反馈 */
.ho-tabbar-item:active {
  opacity: 0.7;
  background: var(--hoho-bg-tertiary);
}

@media (hover: hover) {
  .ho-tabbar-item:hover {
    opacity: 0.8;
  }
}
</style>
