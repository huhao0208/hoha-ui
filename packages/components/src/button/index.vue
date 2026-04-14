<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="ho-button__loading" />
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

type ButtonType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
type ButtonSize = 'small' | 'medium' | 'large'

export default defineComponent({
  name: 'HoButton',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: 'primary'
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const buttonClasses = computed(() => [
      'ho-button',
      `ho-button--${props.type}`,
      `ho-button--${props.size}`,
      {
        'ho-button--disabled': props.disabled,
        'ho-button--loading': props.loading
      }
    ])

    const handleClick = (e: MouseEvent) => {
      if (!props.disabled && !props.loading) {
        emit('click', e)
      }
    }

    return {
      buttonClasses,
      handleClick
    }
  }
})
</script>

<style lang="less">
.ho-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-weight: var(--hoho-font-medium, 500);
  transition: var(--hoho-duration-normal, 0.25s) var(--hoho-ease, ease);
  font-family: inherit;
  
  /* 最小点击区域 - iOS 标准 */
  min-height: var(--hoho-touch-target, 44px);
  min-width: var(--hoho-touch-target, 44px);

  /* 小号 */
  &--small {
    padding: var(--hoho-spacing-xs, 5px) var(--hoho-spacing-sm, 10px);
    font-size: var(--hoho-font-sm, 13px);
    border-radius: var(--hoho-radius-sm, 4px);
    min-height: 32px;
    min-width: 32px;
  }

  /* 中号 */
  &--medium {
    padding: var(--hoho-spacing-sm, 10px) var(--hoho-spacing-md, 15px);
    font-size: var(--hoho-font-md, 15px);
    border-radius: var(--hoho-radius-md, 6px);
    min-height: var(--hoho-touch-target, 44px);
  }

  /* 大号 */
  &--large {
    padding: var(--hoho-spacing-md, 15px) var(--hoho-spacing-lg, 20px);
    font-size: var(--hoho-font-lg, 17px);
    border-radius: var(--hoho-radius-lg, 8px);
    min-height: 52px;
  }

  /* 类型颜色 - 使用设计规范变量 */
  &--primary {
    background: var(--hoho-color-primary);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-primary) 85%, black);
    }
  }

  &--secondary {
    background: var(--hoho-color-secondary);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-secondary) 85%, black);
    }
  }

  &--success {
    background: var(--hoho-color-success);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-success) 85%, black);
    }
  }

  &--warning {
    background: var(--hoho-color-warning);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-warning) 85%, black);
    }
  }

  &--danger {
    background: var(--hoho-color-danger);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-danger) 85%, black);
    }
  }

  &--info {
    background: var(--hoho-color-info);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-info) 85%, black);
    }
  }

  /* 状态 */
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--loading {
    cursor: wait;
  }

  /* loading 动画 */
  &__loading {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: ho-button-loading 0.8s linear infinite;
    margin-right: 6px;
  }
}

/* 移动端适配 */
@media screen and (max-width: 767px) {
  .ho-button {
    min-height: 48px;
    min-width: 48px;
    
    &--small {
      min-height: 36px;
      min-width: 36px;
      padding: 8px 16px;
      font-size: var(--hoho-font-sm, 14px);
    }
    
    &--medium {
      min-height: 48px;
      padding: 12px 20px;
      font-size: var(--hoho-font-md, 16px);
    }
    
    &--large {
      min-height: 56px;
      padding: 16px 32px;
      font-size: var(--hoho-font-lg, 18px);
    }
  }
}

@keyframes ho-button-loading {
  to {
    transform: rotate(360deg);
  }
}
</style>
