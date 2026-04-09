<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="ho-button__loading"></span>
    <slot></slot>
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
  font-weight: 500;
  transition: all 0.2s ease;

  &--small {
    padding: 4px 12px;
    font-size: 12px;
    border-radius: 4px;
  }

  &--medium {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 6px;
  }

  &--large {
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 8px;
  }

  &--primary {
    background: #3b82f6;
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: #2563eb;
    }
  }

  &--secondary {
    background: #6b7280;
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: #4b5563;
    }
  }

  &--success {
    background: #10b981;
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: #059669;
    }
  }

  &--warning {
    background: #f59e0b;
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: #d97706;
    }
  }

  &--danger {
    background: #ef4444;
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: #dc2626;
    }
  }

  &--info {
    background: #06b6d4;
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: #0891b2;
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
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: ho-button-loading 0.8s linear infinite;
    margin-right: 6px;
  }
}

@keyframes ho-button-loading {
  to {
    transform: rotate(360deg);
  }
}
</style>
