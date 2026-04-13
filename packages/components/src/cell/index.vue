<template>
  <div
    :class="cellClasses"
    @click="handleClick"
  >
    <!-- 左侧图标 -->
    <div
      v-if="icon || $slots.icon"
      class="ho-cell__icon"
    >
      <slot name="icon">
        <HoIcon
          :icon="icon"
          :size="iconSize"
        />
      </slot>
    </div>

    <!-- 主内容区域 -->
    <div class="ho-cell__content">
      <!-- 标题 -->
      <div
        v-if="title || $slots.title"
        class="ho-cell__title"
      >
        <slot name="title">{{ title }}</slot>
      </div>

      <!-- 标签/描述 -->
      <div
        v-if="label || $slots.label"
        class="ho-cell__label"
      >
        <slot name="label">{{ label }}</slot>
      </div>
    </div>

    <!-- 右侧内容 -->
    <div
      v-if="hasValue"
      class="ho-cell__value"
    >
      <slot name="value">{{ value }}</slot>
    </div>

    <!-- 右侧箭头 -->
    <div
      v-if="isLink || arrowDirection"
      class="ho-cell__arrow"
    >
      <HoIcon
        :icon="arrowIcon"
        :size="14"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import HoIcon from '../icon/index.vue'

type CellArrowDirection = 'left' | 'right' | 'up' | 'down'

export default defineComponent({
  name: 'HoCell',
  components: {
    HoIcon
  },
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 描述/标签
    label: {
      type: String,
      default: ''
    },
    // 右侧值
    value: {
      type: [String, Number],
      default: ''
    },
    // 图标名称
    icon: {
      type: String,
      default: ''
    },
    // 图标大小
    iconSize: {
      type: [String, Number],
      default: 18
    },
    // 是否显示箭头
    isLink: {
      type: Boolean,
      default: false
    },
    // 箭头方向
    arrowDirection: {
      type: String as PropType<CellArrowDirection>,
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true
    },
    // 点击态
    clickable: {
      type: Boolean,
      default: null
    },
    // 标题宽度
    titleWidth: {
      type: [String, Number],
      default: ''
    },
    // 标题样式
    titleStyle: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const cellClasses = computed(() => [
      'ho-cell',
      {
        'ho-cell--clickable': props.clickable !== null ? props.clickable : (props.isLink || !!props.arrowDirection),
        'ho-cell--disabled': props.disabled,
        'ho-cell--border': props.border,
        'ho-cell--link': props.isLink || props.arrowDirection
      }
    ])

    const hasValue = computed(() => {
      return props.value !== '' || slots.value
    })

    const arrowIcon = computed(() => {
      if (!props.arrowDirection && !props.isLink) return ''
      const direction = props.arrowDirection || 'right'
      const iconMap = {
        left: 'arrow-left',
        right: 'arrow-right',
        up: 'arrow-up',
        down: 'arrow-down'
      }
      return iconMap[direction] || 'arrow-right'
    })

    const handleClick = (e: MouseEvent) => {
      if (!props.disabled) {
        emit('click', e)
      }
    }

    return {
      cellClasses,
      hasValue,
      arrowIcon,
      handleClick
    }
  }
})
</script>
