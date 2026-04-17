<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="ho-button__loading"
    />
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

type ButtonType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
type ButtonSize = 'small' | 'medium' | 'large'

/**
 * Button 按钮
 * @description 常用的操作按钮组件
 */
export default defineComponent({
  name: 'HoButton',
  props: {
    /** 按钮类型 */
    type: {
      type: String as PropType<ButtonType>,
      default: 'primary'
    },
    /** 按钮尺寸 */
    size: {
      type: String as PropType<ButtonSize>,
      default: 'medium'
    },
    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 是否加载中 */
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
  font-weight: 500;
  transition: 0.25s ease;
  font-family: inherit;
  box-sizing: border-box;
  white-space: nowrap;

  &--small {
    /* 32px */
    padding: 0 0.625rem;
    font-size: 0.8125rem;
    border-radius: 0.25rem;
    height: 2rem;
    min-width: 2rem;
  }

  &--medium {
    /* 44px */
    padding: 0 0.9375rem;
    font-size: 0.9375rem;
    border-radius: 0.375rem;
    height: 2.75rem;
  }

  &--large {
    /* 52px */
    padding: 0 1.25rem;
    font-size: 1.0625rem;
    border-radius: 0.5rem;
    height: 3.25rem;
  }

  &--primary {
    background: var(--hoho-color-primary, #3b82f6);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-primary, #3b82f6) 85%, black);
    }
  }

  &--secondary {
    background: var(--hoho-color-secondary, #6b7280);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-secondary, #6b7280) 85%, black);
    }
  }

  &--success {
    background: var(--hoho-color-success, #10b981);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-success, #10b981) 85%, black);
    }
  }

  &--warning {
    background: var(--hoho-color-warning, #f59e0b);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-warning, #f59e0b) 85%, black);
    }
  }

  &--danger {
    background: var(--hoho-color-danger, #ef4444);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-danger, #ef4444) 85%, black);
    }
  }

  &--info {
    background: var(--hoho-color-info, #06b6d4);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-info, #06b6d4) 85%, black);
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--loading {
    cursor: wait;
  }

  &__loading {
    width: 1em;
    height: 1em;
    border: 0.125rem solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: ho-button-loading 0.8s linear infinite;
    margin-right: 0.375rem; /* 6px */
  }
}

@keyframes ho-button-loading {
  to { transform: rotate(360deg); }
}
</style>
